import { database, ref, get, set, push } from './app.js';

const loginPage = document.getElementById('loginPage');
const adminDashboard = document.getElementById('adminDashboard');
const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginError = document.getElementById('loginError');
const logoutBtn = document.getElementById('logoutBtn');
const adminBatchSelect = document.getElementById('adminBatchSelect');
const adminSemesterSelect = document.getElementById('adminSemesterSelect');
const adminSubjectSelect = document.getElementById('adminSubjectSelect');
const loadDataBtn = document.getElementById('loadDataBtn');
const addStudentBtn = document.getElementById('addStudentBtn');
const adminScoreboard = document.getElementById('adminScoreboard');
const adminScoreboardTitle = document.getElementById('adminScoreboardTitle');
const adminScoreboardContent = document.getElementById('adminScoreboardContent');
const addStudentForm = document.getElementById('addStudentForm');
const studentForm = document.getElementById('studentForm');
const cancelAddBtn = document.getElementById('cancelAddBtn');
const regularSubjectFields = document.getElementById('regularSubjectFields');
const labSubjectFields = document.getElementById('labSubjectFields');

const ADMIN_USERNAME = '234';
const ADMIN_PASSWORD = 'admin';

// Lab subjects (only P1, P2, P3)
const labSubjects = [
    'COMPUTER_ORGANIZATION_ARCHITECTURE_LAB',
    'COMPUTER_GRAPHICS_LAB',
    'MULTIMEDIA_LAB',
    'CLOUD_COMPUTING_LAB',
    'PROGRAMMING_PRACTICES_I'
];

let currentBatch = '';
let currentSemester = '';
let currentSubject = '';
let currentData = [];

// Check if already logged in
if (sessionStorage.getItem('adminLoggedIn') === 'true') {
    showDashboard();
}

// Update form fields based on subject type
adminSubjectSelect.addEventListener('change', () => {
    updateFormFields();
});

function updateFormFields() {
    const subject = adminSubjectSelect.value;
    const isLab = labSubjects.includes(subject);
    
    if (isLab) {
        regularSubjectFields.classList.add('hidden');
        labSubjectFields.classList.remove('hidden');
    } else {
        regularSubjectFields.classList.remove('hidden');
        labSubjectFields.classList.add('hidden');
    }
}

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        sessionStorage.setItem('adminLoggedIn', 'true');
        showDashboard();
        loginError.classList.add('hidden');
    } else {
        loginError.textContent = 'Invalid username or password';
        loginError.classList.remove('hidden');
    }
});

logoutBtn.addEventListener('click', () => {
    sessionStorage.removeItem('adminLoggedIn');
    showLogin();
    adminBatchSelect.value = '';
    adminSemesterSelect.value = '';
    adminSubjectSelect.value = '';
    adminScoreboard.classList.add('hidden');
});

loadDataBtn.addEventListener('click', () => {
    const batch = adminBatchSelect.value;
    const semester = adminSemesterSelect.value;
    const subject = adminSubjectSelect.value;
    
    if (!batch || !semester || !subject) {
        alert('Please select batch, semester, and subject');
        return;
    }
    
    currentBatch = batch;
    currentSemester = semester;
    currentSubject = subject;
    loadAdminData();
});

addStudentBtn.addEventListener('click', () => {
    const batch = adminBatchSelect.value;
    const semester = adminSemesterSelect.value;
    const subject = adminSubjectSelect.value;
    
    if (!batch || !semester || !subject) {
        alert('Please select batch, semester, and subject first');
        return;
    }
    
    // Show the form
    addStudentForm.classList.remove('hidden');
    adminScoreboard.classList.add('hidden');
    
    // Reset form
    studentForm.reset();
    updateFormFields();
    
    // Scroll to form
    addStudentForm.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

cancelAddBtn.addEventListener('click', () => {
    addStudentForm.classList.add('hidden');
    studentForm.reset();
    if (currentBatch && currentSemester && currentSubject) {
        adminScoreboard.classList.remove('hidden');
    }
});

studentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const batch = adminBatchSelect.value;
    const semester = adminSemesterSelect.value;
    const subject = adminSubjectSelect.value;
    
    if (!batch || !semester || !subject) {
        alert('Please select batch, semester, and subject first');
        return;
    }
    
    const isLab = labSubjects.includes(subject);
    const rollNo = document.getElementById('studentRollNo').value.trim();
    
    if (!rollNo) {
        alert('Please enter roll number');
        return;
    }
    
    const newStudent = {
        rollNo: rollNo
    };
    
    if (isLab) {
        newStudent.P1 = document.getElementById('studentP1').value || '';
        newStudent.P2 = document.getElementById('studentP2').value || '';
        newStudent.P3 = document.getElementById('studentP3').value || '';
    } else {
        newStudent.T1 = document.getElementById('studentT1').value || '';
        newStudent.T2 = document.getElementById('studentT2').value || '';
        newStudent.T3 = document.getElementById('studentT3').value || '';
        newStudent.TA = document.getElementById('studentTA').value || '';
    }
    
    const dataRef = ref(database, `scores/${batch}/${semester}/${subject}`);
    push(dataRef, newStudent).then(() => {
        alert('Student added successfully!');
        addStudentForm.classList.add('hidden');
        studentForm.reset();
        currentBatch = batch;
        currentSemester = semester;
        currentSubject = subject;
        loadAdminData();
    }).catch((error) => {
        console.error('Error adding student:', error);
        alert('Error adding student');
    });
});

function showDashboard() {
    loginPage.classList.add('hidden');
    loginPage.style.display = 'none';
    adminDashboard.classList.remove('hidden');
    addStudentForm.classList.add('hidden');
}

function showLogin() {
    loginPage.classList.remove('hidden');
    loginPage.style.display = 'flex';
    adminDashboard.classList.add('hidden');
    addStudentForm.classList.add('hidden');
    usernameInput.value = '';
    passwordInput.value = '';
}

function loadAdminData() {
    const dataRef = ref(database, `scores/${currentBatch}/${currentSemester}/${currentSubject}`);
    
    // Hide add form when loading data
    addStudentForm.classList.add('hidden');
    
    // Get roll number filter from URL or prompt
    const rollNoFilter = prompt('Enter Roll Number to filter (leave empty to show all):') || '';
    
    get(dataRef).then((snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            let students = Object.entries(data).map(([id, student]) => ({
                id,
                ...student
            }));
            
            // Filter by roll number if provided
            if (rollNoFilter.trim()) {
                students = students.filter(student => student.rollNo === rollNoFilter.trim());
            }
            
            currentData = students;
            displayAdminScoreboard();
        } else {
            const subjectName = adminSubjectSelect.options[adminSubjectSelect.selectedIndex].text;
            adminScoreboardTitle.textContent = `Batch: ${currentBatch} | Semester: ${currentSemester} | Subject: ${subjectName}`;
            adminScoreboardContent.innerHTML = '<p style="text-align: center; color: #888; padding: 40px;">No data available. Click "Add New Student" to add students.</p>';
            adminScoreboard.classList.remove('hidden');
        }
    }).catch((error) => {
        console.error('Error loading data:', error);
        alert('Error loading data');
    });
}

function displayAdminScoreboard() {
    const subjectName = adminSubjectSelect.options[adminSubjectSelect.selectedIndex].text;
    const isLab = labSubjects.includes(currentSubject);
    
    adminScoreboardTitle.textContent = `Batch: ${currentBatch} | Semester: ${currentSemester} | Subject: ${subjectName}`;
    adminScoreboard.classList.remove('hidden');
    
    if (currentData.length === 0) {
        adminScoreboardContent.innerHTML = '<p style="text-align: center; color: #888; padding: 40px;">No students found for the selected criteria.</p>';
        return;
    }
    
    let html = `
        <table class="scoreboard-table">
            <thead>
                <tr>
                    <th>Roll No</th>
    `;
    
    if (isLab) {
        html += `
                    <th>P1</th>
                    <th>P2</th>
                    <th>P3</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
        `;
        
        currentData.forEach(student => {
            html += `
                <tr>
                    <td>${student.rollNo || 'N/A'}</td>
                    <td><input type="number" value="${student.P1 || ''}" data-field="P1" data-id="${student.id}" min="0" max="100"></td>
                    <td><input type="number" value="${student.P2 || ''}" data-field="P2" data-id="${student.id}" min="0" max="100"></td>
                    <td><input type="number" value="${student.P3 || ''}" data-field="P3" data-id="${student.id}" min="0" max="100"></td>
                    <td>
                        <button class="btn btn-primary btn-save" data-id="${student.id}">Save</button>
                        <button class="btn btn-danger btn-delete" data-id="${student.id}">Delete</button>
                    </td>
                </tr>
            `;
        });
    } else {
        html += `
                    <th>T1</th>
                    <th>T2</th>
                    <th>T3</th>
                    <th>TA</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
        `;
        
        currentData.forEach(student => {
            html += `
                <tr>
                    <td>${student.rollNo || 'N/A'}</td>
                    <td><input type="number" value="${student.T1 || ''}" data-field="T1" data-id="${student.id}" min="0" max="100"></td>
                    <td><input type="number" value="${student.T2 || ''}" data-field="T2" data-id="${student.id}" min="0" max="100"></td>
                    <td><input type="number" value="${student.T3 || ''}" data-field="T3" data-id="${student.id}" min="0" max="100"></td>
                    <td><input type="number" value="${student.TA || ''}" data-field="TA" data-id="${student.id}" min="0" max="100"></td>
                    <td>
                        <button class="btn btn-primary btn-save" data-id="${student.id}">Save</button>
                        <button class="btn btn-danger btn-delete" data-id="${student.id}">Delete</button>
                    </td>
                </tr>
            `;
        });
    }
    
    html += `
            </tbody>
        </table>
    `;
    
    adminScoreboardContent.innerHTML = html;
    
    // Add event listeners for save buttons
    document.querySelectorAll('.btn-save').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const studentId = e.target.getAttribute('data-id');
            saveStudentData(studentId);
        });
    });
    
    // Add event listeners for delete buttons
    document.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const studentId = e.target.getAttribute('data-id');
            if (confirm('Are you sure you want to delete this student?')) {
                deleteStudent(studentId);
            }
        });
    });
}

function saveStudentData(studentId) {
    const student = currentData.find(s => s.id === studentId);
    if (!student) return;
    
    const row = document.querySelector(`[data-id="${studentId}"]`).closest('tr');
    const isLab = labSubjects.includes(currentSubject);
    
    const updatedData = {
        rollNo: student.rollNo
    };
    
    if (isLab) {
        updatedData.P1 = row.querySelector('[data-field="P1"]').value || '';
        updatedData.P2 = row.querySelector('[data-field="P2"]').value || '';
        updatedData.P3 = row.querySelector('[data-field="P3"]').value || '';
    } else {
        updatedData.T1 = row.querySelector('[data-field="T1"]').value || '';
        updatedData.T2 = row.querySelector('[data-field="T2"]').value || '';
        updatedData.T3 = row.querySelector('[data-field="T3"]').value || '';
        updatedData.TA = row.querySelector('[data-field="TA"]').value || '';
    }
    
    const dataRef = ref(database, `scores/${currentBatch}/${currentSemester}/${currentSubject}/${studentId}`);
    set(dataRef, updatedData).then(() => {
        alert('Data saved successfully!');
        loadAdminData();
    }).catch((error) => {
        console.error('Error saving data:', error);
        alert('Error saving data');
    });
}

function deleteStudent(studentId) {
    const dataRef = ref(database, `scores/${currentBatch}/${currentSemester}/${currentSubject}/${studentId}`);
    set(dataRef, null).then(() => {
        alert('Student deleted successfully!');
        loadAdminData();
    }).catch((error) => {
        console.error('Error deleting student:', error);
        alert('Error deleting student');
    });
}
