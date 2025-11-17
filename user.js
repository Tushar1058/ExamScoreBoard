import { database, ref, get, onValue } from './app.js';

const batchSelect = document.getElementById('batchSelect');
const semesterSelect = document.getElementById('semesterSelect');
const scoreboard = document.getElementById('scoreboard');
const scoreboardTitle = document.getElementById('scoreboardTitle');
const scoreboardContent = document.getElementById('scoreboardContent');
const noData = document.getElementById('noData');
const calculateSGPABtn = document.getElementById('calculateSGPA');
const sgpaResult = document.getElementById('sgpaResult');

// User's roll number
const USER_ROLL_NO = '231030044';

// All subjects with their display names
const allSubjects = [
    { key: 'FORMAL_LANGUAGE_AUTOMATA_THEORY', name: 'FORMAL LANGUAGE & AUTOMATA THEORY' },
    { key: 'COMPUTER_ORGANIZATION_ARCHITECTURE', name: 'COMPUTER ORGANIZATION AND ARCHITECTURE' },
    { key: 'COMPUTER_GRAPHICS', name: 'COMPUTER GRAPHICS' },
    { key: 'PROJECT_MANAGEMENT_ENTREPRENEURSHIP', name: 'PROJECT MANAGEMENT AND ENTREPRENEURSHIP' },
    { key: 'INDIAN_CONSTITUTION', name: 'INDIAN CONSTITUTION' },
    { key: 'APPLIED_MATERIALS_SCIENCE', name: 'APPLIED MATERIALS SCIENCE' },
    { key: 'CLOUD_COMPUTING', name: 'CLOUD COMPUTING: CONCEPTS, TECHNOLOGY & ARCHITECTURE' },
    { key: 'LOGICAL_QUANTITATIVE_TECHNIQUES_I', name: 'LOGICAL AND QUANTITATIVE TECHNIQUES-I' },
    { key: 'COMPUTER_ORGANIZATION_ARCHITECTURE_LAB', name: 'COMPUTER ORGANIZATION AND ARCHITECTURE LAB' },
    { key: 'COMPUTER_GRAPHICS_LAB', name: 'COMPUTER GRAPHICS LAB' },
    { key: 'MULTIMEDIA_LAB', name: 'MULTIMEDIA LAB' },
    { key: 'CLOUD_COMPUTING_LAB', name: 'CLOUD COMPUTING: CONCEPTS, TECHNOLOGY & ARCHITECTURE LAB' },
    { key: 'PROGRAMMING_PRACTICES_I', name: 'PROGRAMMING PRACTICES-I' }
];

// Lab subjects (only P1, P2, P3)
const labSubjects = [
    'COMPUTER_ORGANIZATION_ARCHITECTURE_LAB',
    'COMPUTER_GRAPHICS_LAB',
    'MULTIMEDIA_LAB',
    'CLOUD_COMPUTING_LAB',
    'PROGRAMMING_PRACTICES_I'
];

let allSubjectsData = {};

// Load data when batch or semester changes
batchSelect.addEventListener('change', loadScoreboard);
semesterSelect.addEventListener('change', loadScoreboard);

function loadScoreboard() {
    const batch = batchSelect.value;
    const semester = semesterSelect.value;
    
    if (!batch || !semester) {
        scoreboard.classList.add('hidden');
        noData.classList.add('hidden');
        return;
    }
    
    // Show loading state
    scoreboard.classList.remove('hidden');
    noData.classList.add('hidden');
    scoreboardContent.innerHTML = '<p style="text-align: center; color: #888; padding: 20px;">Loading data...</p>';
    
    scoreboardTitle.textContent = `Batch: ${batch} | Semester: ${semester}`;
    
    // Load all subjects data and filter by roll number
    allSubjectsData = {};
    const loadPromises = allSubjects.map(subject => {
        const dataRef = ref(database, `scores/${batch}/${semester}/${subject.key}`);
        return get(dataRef).then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                // Filter by roll number
                const studentData = Object.entries(data).find(([id, student]) => 
                    student.rollNo === USER_ROLL_NO
                );
                
                if (studentData) {
                    allSubjectsData[subject.key] = {
                        name: subject.name,
                        data: { id: studentData[0], ...studentData[1] }
                    };
                }
            }
        }).catch((error) => {
            console.error(`Error loading ${subject.key}:`, error);
        });
    });
    
    Promise.all(loadPromises).then(() => {
        displayScoreboard();
    });
}

function displayScoreboard() {
    const batch = batchSelect.value;
    const semester = semesterSelect.value;
    
    scoreboard.classList.remove('hidden');
    noData.classList.add('hidden');
    sgpaResult.classList.add('hidden');
    calculateSGPABtn.style.display = 'block';
    
    // Separate theory and lab subjects
    const theorySubjects = [];
    const labSubjectsList = [];
    
    allSubjects.forEach(subject => {
        const subjectData = allSubjectsData[subject.key];
        if (subjectData && subjectData.data) {
            if (labSubjects.includes(subject.key)) {
                labSubjectsList.push({ key: subject.key, name: subject.name, data: subjectData.data });
            } else {
                theorySubjects.push({ key: subject.key, name: subject.name, data: subjectData.data });
            }
        }
    });
    
    if (theorySubjects.length === 0 && labSubjectsList.length === 0) {
        scoreboardContent.innerHTML = '<p style="text-align: center; color: #888; padding: 40px;">No data available for the selected batch and semester. Please contact admin to add data.</p>';
        return;
    }
    
    let html = '';
    
    // Theory Subjects Table
    if (theorySubjects.length > 0) {
        html += `
            <h3 class="table-section-title">Theory Subjects</h3>
            <table class="scoreboard-table">
                <thead>
                    <tr>
                        <th>Subject</th>
                        <th>T1</th>
                        <th>T2</th>
                        <th>T3</th>
                        <th>TA</th>
                    </tr>
                </thead>
                <tbody>
        `;
        
        theorySubjects.forEach(subject => {
            html += `
                <tr>
                    <td>${subject.name}</td>
                    <td>${subject.data.T1 || '-'}</td>
                    <td>${subject.data.T2 || '-'}</td>
                    <td>${subject.data.T3 || '-'}</td>
                    <td>${subject.data.TA || '-'}</td>
                </tr>
            `;
        });
        
        html += `
                </tbody>
            </table>
        `;
    }
    
    // Lab Subjects Table
    if (labSubjectsList.length > 0) {
        html += `
            <h3 class="table-section-title">Lab Subjects</h3>
            <table class="scoreboard-table">
                <thead>
                    <tr>
                        <th>Subject</th>
                        <th>P1</th>
                        <th>P2</th>
                        <th>P3</th>
                    </tr>
                </thead>
                <tbody>
        `;
        
        labSubjectsList.forEach(subject => {
            html += `
                <tr>
                    <td>${subject.name}</td>
                    <td>${subject.data.P1 || '-'}</td>
                    <td>${subject.data.P2 || '-'}</td>
                    <td>${subject.data.P3 || '-'}</td>
                </tr>
            `;
        });
        
        html += `
                </tbody>
            </table>
        `;
    }
    
    scoreboardContent.innerHTML = html;
}

calculateSGPABtn.addEventListener('click', () => {
    let allResults = [];
    
    // Calculate SGPA for each subject
    Object.keys(allSubjectsData).forEach(subjectKey => {
        const subjectData = allSubjectsData[subjectKey];
        const isLab = labSubjects.includes(subjectKey);
        
        if (!subjectData || !subjectData.data) return;
        
        let sgpa = null;
        
        if (isLab) {
            const p1 = parseFloat(subjectData.data.P1) || 0;
            const p2 = parseFloat(subjectData.data.P2) || 0;
            const p3 = parseFloat(subjectData.data.P3) || 0;
            const practicalAvg = (p1 + p2 + p3) / 3;
            sgpa = (practicalAvg / 10);
            if (sgpa <= 0) sgpa = null;
        } else {
            const t1 = parseFloat(subjectData.data.T1) || 0;
            const t2 = parseFloat(subjectData.data.T2) || 0;
            const t3 = parseFloat(subjectData.data.T3) || 0;
            const ta = parseFloat(subjectData.data.TA) || 0;
            const testAvg = (t1 + t2 + t3) / 3;
            const finalScore = (testAvg * 0.6) + (ta * 0.4);
            sgpa = (finalScore / 10);
            if (sgpa <= 0) sgpa = null;
        }
        
        if (sgpa !== null) {
            allResults.push({
                subject: subjectData.name,
                sgpa: sgpa
            });
        }
    });
    
    if (allResults.length === 0) {
        alert('No data available to calculate SGPA');
        return;
    }
    
    let resultHTML = '<h3>SGPA Results</h3>';
    let totalAverage = 0;
    let count = 0;
    
    allResults.forEach(result => {
        totalAverage += result.sgpa;
        count++;
        resultHTML += `<p><strong>${result.subject}:</strong> ${result.sgpa.toFixed(2)}</p>`;
    });
    
    const overallAverage = count > 0 ? (totalAverage / count).toFixed(2) : 'N/A';
    resultHTML += `<p style="margin-top: 15px; font-size: 18px;"><strong>Overall Average SGPA: ${overallAverage}</strong></p>`;
    
    sgpaResult.innerHTML = resultHTML;
    sgpaResult.classList.remove('hidden');
});
