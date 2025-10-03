// GAT Certificate Management System - Main Application JavaScript

// Application Data and State
class CertificateApp {
    constructor() {
        this.currentUser = null;
        this.currentView = 'dashboard';
        this.data = this.loadApplicationData();
        this.init();
    }

    loadApplicationData() {
        // Check for stored data first, otherwise use default data
        const storedData = localStorage.getItem('gatCertificateData');
        if (storedData) {
            return JSON.parse(storedData);
        }

        // Default application data
        return {
            users: [
                {
                    id: "1",
                    type: "student",
                    name: "Rajesh Kumar",
                    email: "rajesh.kumar@gat.ac.in",
                    password: "student123",
                    studentId: "4NM20CS001",
                    department: "Computer Science Engineering",
                    year: "3rd Year",
                    section: "A",
                    phone: "+91-9876543210",
                    address: "123, MG Road, Bangalore, Karnataka - 560001"
                },
                {
                    id: "2",
                    type: "student",
                    name: "Priya Sharma",
                    email: "priya.sharma@gat.ac.in",
                    password: "student123",
                    studentId: "4NM20CS025",
                    department: "Computer Science Engineering",
                    year: "3rd Year",
                    section: "B",
                    phone: "+91-9876543211",
                    address: "456, Brigade Road, Bangalore, Karnataka - 560025"
                },
                {
                    id: "3",
                    type: "admin",
                    name: "Dr. Suresh Reddy",
                    email: "suresh.reddy@gat.ac.in",
                    password: "admin123",
                    role: "HOD",
                    department: "Computer Science Engineering",
                    phone: "+91-9876543212"
                },
                {
                    id: "4",
                    type: "admin",
                    name: "Ms. Anitha Rao",
                    email: "anitha.rao@gat.ac.in",
                    password: "admin123",
                    role: "Academic Officer",
                    department: "Academic Administration",
                    phone: "+91-9876543213"
                }
            ],
            certificateRequests: [
                {
                    id: "CR001",
                    studentId: "4NM20CS001",
                    studentName: "Rajesh Kumar",
                    certificateType: "bonafide",
                    purpose: "Bank Loan Application",
                    requestDate: "2024-10-01",
                    status: "approved",
                    approvedBy: "Dr. Suresh Reddy",
                    approvedDate: "2024-10-02",
                    issuedDate: "2024-10-02",
                    certificateId: "GAT/BF/2024/001",
                    qrCode: "GAT-CSE-BF-2024-001",
                    trackingId: "TRK001",
                    urgency: "normal",
                    comments: "For education loan processing"
                },
                {
                    id: "CR002",
                    studentId: "4NM20CS025",
                    studentName: "Priya Sharma",
                    certificateType: "internship_completion",
                    purpose: "Job Application",
                    requestDate: "2024-10-03",
                    status: "pending",
                    urgency: "high",
                    comments: "Required for upcoming interview on Oct 10th",
                    internshipDetails: {
                        company: "TechCorp Solutions",
                        duration: "6 months",
                        startDate: "2024-01-15",
                        endDate: "2024-07-15",
                        supervisor: "Mr. Vikram Gupta"
                    }
                },
                {
                    id: "CR003",
                    studentId: "4NM20CS001",
                    studentName: "Rajesh Kumar",
                    certificateType: "transcript",
                    purpose: "Higher Education",
                    requestDate: "2024-09-28",
                    status: "issued",
                    approvedBy: "Ms. Anitha Rao",
                    approvedDate: "2024-09-29",
                    issuedDate: "2024-09-30",
                    certificateId: "GAT/TR/2024/001",
                    qrCode: "GAT-CSE-TR-2024-001",
                    trackingId: "TRK002",
                    urgency: "normal",
                    comments: "Official transcript for MS admission"
                },
                {
                    id: "CR004",
                    studentId: "4NM20CS001",
                    studentName: "Rajesh Kumar",
                    certificateType: "bonafide",
                    purpose: "Passport Application", 
                    requestDate: "2024-09-25",
                    status: "pending",
                    urgency: "normal",
                    comments: "Required for passport renewal process",
                    trackingId: "TRK003"
                }
            ],
            certificateTemplates: [
                {
                    type: "bonafide",
                    name: "Bonafide Certificate",
                    description: "Certificate confirming student enrollment",
                    template: "This is to certify that {studentName}, bearing Registration Number {studentId}, is a bonafide student of {department}, {year} studying in our institution during the academic year {academicYear}.",
                    validityPeriod: "6 months",
                    signatoryRole: "HOD"
                },
                {
                    type: "internship_completion",
                    name: "Internship Completion Certificate",
                    description: "Certificate of internship completion",
                    template: "This is to certify that {studentName}, Registration Number {studentId}, has successfully completed internship at {company} from {startDate} to {endDate} under the supervision of {supervisor}.",
                    validityPeriod: "Permanent",
                    signatoryRole: "Academic Officer"
                },
                {
                    type: "transcript",
                    name: "Official Transcript",
                    description: "Complete academic record",
                    template: "Official Academic Transcript for {studentName}, Registration Number {studentId}, Department of {department}. This transcript contains complete academic records.",
                    validityPeriod: "Permanent",
                    signatoryRole: "Registrar"
                }
            ],
            auditLogs: [
                {
                    id: "AL001",
                    timestamp: new Date().toISOString(),
                    userId: "3",
                    userName: "Dr. Suresh Reddy",
                    action: "certificate_approved",
                    resourceId: "CR001",
                    description: "Approved bonafide certificate request for Rajesh Kumar"
                },
                {
                    id: "AL002",
                    timestamp: new Date().toISOString(),
                    userId: "system",
                    userName: "System",
                    action: "certificate_generated",
                    resourceId: "CR001",
                    description: "Generated certificate with ID GAT/BF/2024/001"
                }
            ],
            verificationDatabase: [
                {
                    certificateId: "GAT/BF/2024/001",
                    qrCode: "GAT-CSE-BF-2024-001",
                    studentName: "Rajesh Kumar",
                    studentId: "4NM20CS001",
                    certificateType: "Bonafide Certificate",
                    issuedDate: "2024-10-02",
                    validUntil: "2025-04-02",
                    status: "valid",
                    issuer: "Dr. Suresh Reddy",
                    department: "Computer Science Engineering"
                },
                {
                    certificateId: "GAT/TR/2024/001",
                    qrCode: "GAT-CSE-TR-2024-001",
                    studentName: "Rajesh Kumar",
                    studentId: "4NM20CS001",
                    certificateType: "Official Transcript",
                    issuedDate: "2024-09-30",
                    validUntil: "Permanent",
                    status: "valid",
                    issuer: "Ms. Anitha Rao",
                    department: "Academic Administration"
                }
            ],
            systemSettings: {
                instituteName: "Global Academy of Technology",
                instituteCode: "GAT",
                address: "Ideal Homes Township, Rajarajeshwari Nagar, Bangalore - 560098",
                phone: "+91-80-28483232",
                email: "info@gat.ac.in",
                website: "www.gat.ac.in",
                currentAcademicYear: "2024-2025"
            }
        };
    }

    saveData() {
        localStorage.setItem('gatCertificateData', JSON.stringify(this.data));
    }

    init() {
        this.registerServiceWorker();
        this.setupEventListeners();
        this.checkAuthState();
    }

    registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('./sw.js')
                .then(() => console.log('Service Worker registered'))
                .catch(err => console.log('Service Worker registration failed'));
        }
    }

    setupEventListeners() {
        // Login form
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', this.handleLogin.bind(this));
        }

        // Certificate request form
        const requestForm = document.getElementById('certificateRequestForm');
        if (requestForm) {
            requestForm.addEventListener('submit', this.handleCertificateRequest.bind(this));
        }

        // Search and filter functionality
        const requestsSearch = document.getElementById('requestsSearch');
        if (requestsSearch) {
            requestsSearch.addEventListener('input', this.filterRequests.bind(this));
        }

        const statusFilter = document.getElementById('statusFilter');
        if (statusFilter) {
            statusFilter.addEventListener('change', this.filterRequests.bind(this));
        }

        const auditSearch = document.getElementById('auditSearch');
        if (auditSearch) {
            auditSearch.addEventListener('input', this.filterAuditLogs.bind(this));
        }

        const actionFilter = document.getElementById('actionFilter');
        if (actionFilter) {
            actionFilter.addEventListener('change', this.filterAuditLogs.bind(this));
        }

        // Modal close on outside click
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.closeModal(e.target.id);
            }
        });

        // Verification input
        const verificationInput = document.getElementById('verificationInput');
        if (verificationInput) {
            verificationInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.verifyCertificate();
                }
            });
        }
    }

    checkAuthState() {
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
            this.currentUser = JSON.parse(storedUser);
            this.showMainApp();
        } else {
            this.showLoginScreen();
        }
    }

    handleLogin(e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        const user = this.data.users.find(u => u.email === email && u.password === password);
        
        if (user) {
            this.currentUser = user;
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.logActivity(user.id, user.name, 'user_login', null, 'User logged in successfully');
            this.showMainApp();
            this.showToast('success', `Welcome ${user.name}!`);
        } else {
            this.showToast('error', 'Invalid email or password');
        }
    }

    showLoginScreen() {
        document.getElementById('loginScreen').classList.remove('hidden');
        document.getElementById('mainApp').classList.add('hidden');
        // Clear login form
        const loginForm = document.getElementById('loginForm');
        if (loginForm) loginForm.reset();
    }

    showMainApp() {
        document.getElementById('loginScreen').classList.add('hidden');
        document.getElementById('mainApp').classList.remove('hidden');
        this.setupNavigation();
        this.loadDashboard();
    }

    setupNavigation() {
        const navMenu = document.getElementById('navMenu');
        
        // Update user profile
        document.getElementById('userName').textContent = this.currentUser.name;
        document.getElementById('userRole').textContent = this.currentUser.type === 'student' ? 
            `Student - ${this.currentUser.year}` : this.currentUser.role;

        // Create navigation items based on user type
        const navItems = this.currentUser.type === 'student' ? [
            { id: 'dashboard', icon: '🏠', text: 'Dashboard' },
            { id: 'requests', icon: '📄', text: 'My Requests' },
            { id: 'verification', icon: '🔍', text: 'Verify Certificate' }
        ] : [
            { id: 'dashboard', icon: '🏠', text: 'Dashboard' },
            { id: 'requests', icon: '📋', text: 'All Requests' },
            { id: 'verification', icon: '🔍', text: 'Verify Certificate' },
            { id: 'audit', icon: '📊', text: 'Audit Logs' }
        ];

        navMenu.innerHTML = navItems.map(item => `
            <a href="#" class="nav-item ${item.id === 'dashboard' ? 'active' : ''}" 
               onclick="app.navigateTo('${item.id}')">
                <span class="nav-item-icon">${item.icon}</span>
                <span>${item.text}</span>
            </a>
        `).join('');
    }

    navigateTo(view) {
        // Update navigation active state
        document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
        const targetNav = document.querySelector(`[onclick="app.navigateTo('${view}')"]`);
        if (targetNav) targetNav.classList.add('active');

        // Hide all content sections
        document.querySelectorAll('.content-section').forEach(section => section.classList.add('hidden'));
        document.getElementById('dashboardContent').classList.add('hidden');

        // Show selected content
        this.currentView = view;
        
        switch(view) {
            case 'dashboard':
                this.loadDashboard();
                break;
            case 'requests':
                this.loadRequests();
                break;
            case 'verification':
                this.loadVerification();
                break;
            case 'audit':
                this.loadAuditLogs();
                break;
        }

        // Update page title
        const titles = {
            dashboard: 'Dashboard',
            requests: this.currentUser.type === 'student' ? 'My Requests' : 'All Requests',
            verification: 'Certificate Verification',
            audit: 'Audit Logs'
        };
        document.getElementById('pageTitle').textContent = titles[view];
    }

    loadDashboard() {
        document.getElementById('dashboardContent').classList.remove('hidden');
        
        if (this.currentUser.type === 'student') {
            this.loadStudentDashboard();
        } else {
            this.loadAdminDashboard();
        }
    }

    loadStudentDashboard() {
        document.getElementById('studentDashboard').classList.remove('hidden');
        document.getElementById('adminDashboard').classList.add('hidden');

        // Filter requests for current student
        const studentRequests = this.data.certificateRequests.filter(r => r.studentId === this.currentUser.studentId);
        
        // Update statistics
        document.getElementById('totalRequests').textContent = studentRequests.length;
        document.getElementById('pendingRequests').textContent = studentRequests.filter(r => r.status === 'pending').length;
        document.getElementById('approvedRequests').textContent = studentRequests.filter(r => r.status === 'approved').length;
        document.getElementById('issuedRequests').textContent = studentRequests.filter(r => r.status === 'issued').length;

        // Load recent requests
        this.renderRequestsList('studentRequestsList', studentRequests.slice(0, 5));
    }

    loadAdminDashboard() {
        document.getElementById('adminDashboard').classList.remove('hidden');
        document.getElementById('studentDashboard').classList.add('hidden');

        const allRequests = this.data.certificateRequests;
        const today = new Date().toISOString().split('T')[0];
        const thisMonth = new Date().toISOString().substring(0, 7);

        // Update statistics
        document.getElementById('adminPendingRequests').textContent = allRequests.filter(r => r.status === 'pending').length;
        document.getElementById('adminApprovedToday').textContent = allRequests.filter(r => r.approvedDate === today).length;
        document.getElementById('adminIssuedThisMonth').textContent = allRequests.filter(r => r.issuedDate && r.issuedDate.startsWith(thisMonth)).length;
        document.getElementById('totalStudents').textContent = this.data.users.filter(u => u.type === 'student').length;

        // Load pending requests
        const pendingRequests = allRequests.filter(r => r.status === 'pending');
        this.renderRequestsList('adminRequestsList', pendingRequests);
    }

    loadRequests() {
        document.getElementById('requestsContent').classList.remove('hidden');
        
        const requests = this.currentUser.type === 'student' ? 
            this.data.certificateRequests.filter(r => r.studentId === this.currentUser.studentId) :
            this.data.certificateRequests;

        this.renderRequestsTable(requests);
    }

    renderRequestsList(containerId, requests) {
        const container = document.getElementById(containerId);
        if (!container) return;

        if (requests.length === 0) {
            container.innerHTML = '<p class="text-center" style="color: var(--color-text-secondary); padding: 2rem;">No requests found</p>';
            return;
        }

        container.innerHTML = requests.map(request => `
            <div class="request-card" onclick="app.showRequestDetails('${request.id}')">
                <div class="request-header">
                    <h3 class="request-title">${this.getCertificateTypeName(request.certificateType)}</h3>
                    <span class="request-status status-${request.status}">${request.status.toUpperCase()}</span>
                </div>
                <div class="request-meta">
                    <span>📅 ${this.formatDate(request.requestDate)}</span>
                    <span>🎯 ${request.purpose}</span>
                    ${request.urgency === 'high' || request.urgency === 'urgent' ? 
                        `<span style="color: #ef4444;">⚡ ${request.urgency.toUpperCase()}</span>` : ''}
                </div>
            </div>
        `).join('');
    }

    renderRequestsTable(requests) {
        const container = document.getElementById('allRequestsList');
        if (!container) return;

        if (requests.length === 0) {
            container.innerHTML = '<div class="text-center" style="padding: 3rem; color: var(--color-text-secondary);">No certificate requests found</div>';
            return;
        }

        container.innerHTML = `
            <div class="table-header">
                <div>Student & Certificate</div>
                <div>Request Date</div>
                <div>Status</div>
                <div>Urgency</div>
                <div>Purpose</div>
                <div>Actions</div>
            </div>
            ${requests.map(request => `
                <div class="table-row" onclick="app.showRequestDetails('${request.id}')">
                    <div>
                        <strong>${request.studentName}</strong><br>
                        <small style="color: var(--color-text-secondary);">${this.getCertificateTypeName(request.certificateType)}</small>
                    </div>
                    <div>${this.formatDate(request.requestDate)}</div>
                    <div><span class="request-status status-${request.status}">${request.status.toUpperCase()}</span></div>
                    <div>${request.urgency.toUpperCase()}</div>
                    <div>${request.purpose}</div>
                    <div>
                        <button class="btn btn--sm btn--outline" onclick="event.stopPropagation(); app.showRequestDetails('${request.id}')">
                            View
                        </button>
                    </div>
                </div>
            `).join('')}
        `;
    }

    showRequestDetails(requestId) {
        const request = this.data.certificateRequests.find(r => r.id === requestId);
        if (!request) return;

        const student = this.data.users.find(u => u.studentId === request.studentId);
        
        const modalContent = document.getElementById('detailModalContent');
        modalContent.innerHTML = `
            <div class="request-details">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-bottom: 2rem;">
                    <div>
                        <h4>Request Information</h4>
                        <p><strong>Request ID:</strong> ${request.id}</p>
                        <p><strong>Certificate Type:</strong> ${this.getCertificateTypeName(request.certificateType)}</p>
                        <p><strong>Purpose:</strong> ${request.purpose}</p>
                        <p><strong>Urgency:</strong> ${request.urgency.toUpperCase()}</p>
                        <p><strong>Status:</strong> <span class="request-status status-${request.status}">${request.status.toUpperCase()}</span></p>
                        <p><strong>Request Date:</strong> ${this.formatDate(request.requestDate)}</p>
                        ${request.approvedDate ? `<p><strong>Approved Date:</strong> ${this.formatDate(request.approvedDate)}</p>` : ''}
                        ${request.issuedDate ? `<p><strong>Issued Date:</strong> ${this.formatDate(request.issuedDate)}</p>` : ''}
                    </div>
                    <div>
                        <h4>Student Information</h4>
                        <p><strong>Name:</strong> ${request.studentName}</p>
                        <p><strong>Student ID:</strong> ${request.studentId}</p>
                        ${student ? `
                            <p><strong>Department:</strong> ${student.department}</p>
                            <p><strong>Year:</strong> ${student.year}</p>
                            <p><strong>Section:</strong> ${student.section}</p>
                            <p><strong>Phone:</strong> ${student.phone}</p>
                        ` : ''}
                    </div>
                </div>
                
                ${request.comments ? `
                    <div style="margin-bottom: 2rem;">
                        <h4>Comments</h4>
                        <p style="background: var(--color-secondary); padding: 1rem; border-radius: var(--radius-base);">
                            ${request.comments}
                        </p>
                    </div>
                ` : ''}

                ${request.certificateId && request.status === 'issued' ? `
                    <div class="certificate-preview">
                        ${this.generateCertificateHTML(request)}
                    </div>
                ` : ''}
            </div>
        `;

        // Setup action buttons based on status and user role
        const actionsContainer = document.getElementById('detailModalActions');
        actionsContainer.innerHTML = this.getActionButtons(request);

        this.showModal('detailModal');
    }

    getActionButtons(request) {
        if (this.currentUser.type === 'student') {
            if (request.status === 'issued') {
                return `<button class="btn btn--primary" onclick="app.downloadCertificate('${request.id}')">Download PDF</button>`;
            }
            return '';
        }

        // Admin actions
        switch(request.status) {
            case 'pending':
                return `
                    <button class="btn btn--secondary" onclick="app.rejectRequest('${request.id}')">Reject</button>
                    <button class="btn btn--primary" onclick="app.approveRequest('${request.id}')">Approve</button>
                `;
            case 'approved':
                return `<button class="btn btn--primary" onclick="app.generateCertificate('${request.id}')">Generate Certificate</button>`;
            case 'issued':
                return `<button class="btn btn--primary" onclick="app.downloadCertificate('${request.id}')">Download PDF</button>`;
            default:
                return '';
        }
    }

    approveRequest(requestId) {
        const request = this.data.certificateRequests.find(r => r.id === requestId);
        if (!request) return;

        request.status = 'approved';
        request.approvedBy = this.currentUser.name;
        request.approvedDate = new Date().toISOString().split('T')[0];

        this.logActivity(this.currentUser.id, this.currentUser.name, 'certificate_approved', requestId, 
            `Approved ${this.getCertificateTypeName(request.certificateType)} for ${request.studentName}`);

        this.saveData();
        this.showToast('success', 'Request approved successfully!');
        this.closeModal('detailModal');
        this.refreshCurrentView();
    }

    rejectRequest(requestId) {
        const reason = prompt('Please provide a reason for rejection:');
        if (!reason) return;

        const request = this.data.certificateRequests.find(r => r.id === requestId);
        if (!request) return;

        request.status = 'rejected';
        request.rejectedBy = this.currentUser.name;
        request.rejectedDate = new Date().toISOString().split('T')[0];
        request.rejectionReason = reason;

        this.logActivity(this.currentUser.id, this.currentUser.name, 'certificate_rejected', requestId, 
            `Rejected ${this.getCertificateTypeName(request.certificateType)} for ${request.studentName}: ${reason}`);

        this.saveData();
        this.showToast('info', 'Request rejected');
        this.closeModal('detailModal');
        this.refreshCurrentView();
    }

    generateCertificate(requestId) {
        const request = this.data.certificateRequests.find(r => r.id === requestId);
        if (!request) return;

        this.showLoadingOverlay();

        // Simulate certificate generation process
        setTimeout(() => {
            // Generate certificate ID and QR code
            const certId = this.generateCertificateId(request);
            const qrCode = this.generateQRCode(certId);

            request.status = 'issued';
            request.issuedDate = new Date().toISOString().split('T')[0];
            request.certificateId = certId;
            request.qrCode = qrCode;

            // Add to verification database
            this.data.verificationDatabase.push({
                certificateId: certId,
                qrCode: qrCode,
                studentName: request.studentName,
                studentId: request.studentId,
                certificateType: this.getCertificateTypeName(request.certificateType),
                issuedDate: request.issuedDate,
                validUntil: request.certificateType === 'bonafide' ? this.calculateValidUntil(6) : 'Permanent',
                status: 'valid',
                issuer: this.currentUser.name,
                department: this.currentUser.department || 'Academic Administration'
            });

            this.logActivity(this.currentUser.id, this.currentUser.name, 'certificate_generated', requestId, 
                `Generated certificate ${certId} for ${request.studentName}`);

            this.saveData();
            this.hideLoadingOverlay();
            this.showToast('success', 'Certificate generated successfully!');
            this.closeModal('detailModal');
            this.refreshCurrentView();
        }, 2000);
    }

    calculateValidUntil(months) {
        const date = new Date();
        date.setMonth(date.getMonth() + months);
        return date.toISOString().split('T')[0];
    }

    generateCertificateId(request) {
        const prefix = this.data.systemSettings.instituteCode;
        const dept = request.certificateType === 'bonafide' ? 'BF' : 
                   request.certificateType === 'transcript' ? 'TR' : 'IC';
        const year = new Date().getFullYear();
        const sequence = String(this.data.certificateRequests.filter(r => r.certificateId).length + 1).padStart(3, '0');
        
        return `${prefix}/${dept}/${year}/${sequence}`;
    }

    generateQRCode(certId) {
        return `https://verify.gat.ac.in/certificate/${certId.replace(/\//g, '-')}`;
    }

    generateCertificateHTML(request) {
        const template = this.data.certificateTemplates.find(t => t.type === request.certificateType);
        if (!template) return '';

        const student = this.data.users.find(u => u.studentId === request.studentId);
        
        let certificateText = template.template
            .replace('{studentName}', request.studentName)
            .replace('{studentId}', request.studentId)
            .replace('{department}', student?.department || '')
            .replace('{year}', student?.year || '')
            .replace('{academicYear}', this.data.systemSettings.currentAcademicYear);

        // Handle internship specific replacements
        if (request.internshipDetails) {
            certificateText = certificateText
                .replace('{company}', request.internshipDetails.company)
                .replace('{startDate}', request.internshipDetails.startDate)
                .replace('{endDate}', request.internshipDetails.endDate)
                .replace('{supervisor}', request.internshipDetails.supervisor);
        }

        return `
            <div class="certificate-header">
                <h1>${this.data.systemSettings.instituteName}</h1>
                <h2 class="certificate-title">${template.name}</h2>
                <p>Certificate ID: ${request.certificateId}</p>
            </div>
            <div class="certificate-body">
                <p>${certificateText}</p>
            </div>
            <div class="certificate-footer">
                <div class="qr-code-container">
                    <div style="width: 120px; height: 120px; border: 2px solid #6366f1; border-radius: 8px; display: flex; align-items: center; justify-content: center; margin: 0 auto; background: white; color: #6366f1; font-size: 12px; text-align: center;">
                        QR Code<br>${request.qrCode.split('/').pop()}
                    </div>
                    <p style="font-size: 12px; margin-top: 8px;">Scan to verify</p>
                </div>
                <div class="signature-section">
                    <div class="signature-line"></div>
                    <p class="signature-name">${request.approvedBy}</p>
                    <p class="signature-title">${template.signatoryRole}</p>
                    <p style="font-size: 12px;">Date: ${this.formatDate(request.issuedDate)}</p>
                </div>
            </div>
        `;
    }

    downloadCertificate(requestId) {
        const request = this.data.certificateRequests.find(r => r.id === requestId);
        if (!request || request.status !== 'issued') return;

        this.showLoadingOverlay();
        
        // Simulate PDF generation delay
        setTimeout(() => {
            try {
                const { jsPDF } = window.jspdf;
                const doc = new jsPDF();
                
                // Add certificate content
                doc.setFontSize(20);
                doc.text(this.data.systemSettings.instituteName, 105, 30, { align: 'center' });
                
                doc.setFontSize(16);
                const template = this.data.certificateTemplates.find(t => t.type === request.certificateType);
                doc.text(template.name, 105, 50, { align: 'center' });
                
                doc.setFontSize(12);
                doc.text(`Certificate ID: ${request.certificateId}`, 105, 70, { align: 'center' });
                
                // Add certificate text (simplified for demo)
                const text = `This is to certify that ${request.studentName} (${request.studentId}) has been issued this certificate for ${request.purpose}.`;
                const splitText = doc.splitTextToSize(text, 160);
                doc.text(splitText, 25, 100);
                
                // Add signature and date
                doc.text(`Approved by: ${request.approvedBy}`, 25, 200);
                doc.text(`Date: ${this.formatDate(request.issuedDate)}`, 25, 220);
                
                // Save the PDF
                doc.save(`${request.certificateId.replace(/\//g, '_')}.pdf`);
                
                this.hideLoadingOverlay();
                this.showToast('success', 'Certificate downloaded successfully!');
            } catch (error) {
                this.hideLoadingOverlay();
                this.showToast('error', 'Failed to generate PDF. Please try again.');
            }
        }, 2000);
    }

    handleCertificateRequest(e) {
        e.preventDefault();
        
        const newRequest = {
            id: `CR${String(this.data.certificateRequests.length + 1).padStart(3, '0')}`,
            studentId: this.currentUser.studentId,
            studentName: this.currentUser.name,
            certificateType: document.getElementById('certificateType').value,
            purpose: document.getElementById('purpose').value,
            urgency: document.getElementById('urgency').value,
            comments: document.getElementById('comments').value,
            requestDate: new Date().toISOString().split('T')[0],
            status: 'pending',
            trackingId: `TRK${String(this.data.certificateRequests.length + 1).padStart(3, '0')}`
        };

        this.data.certificateRequests.push(newRequest);

        this.logActivity(this.currentUser.id, this.currentUser.name, 'certificate_requested', newRequest.id, 
            `Submitted new ${this.getCertificateTypeName(newRequest.certificateType)} request`);

        this.saveData();
        this.closeModal('requestModal');
        this.showToast('success', 'Certificate request submitted successfully!');
        this.refreshCurrentView();
        
        // Reset form
        e.target.reset();
    }

    loadVerification() {
        document.getElementById('verificationContent').classList.remove('hidden');
        // Clear previous results
        const resultContainer = document.getElementById('verificationResult');
        if (resultContainer) {
            resultContainer.classList.add('hidden');
            resultContainer.innerHTML = '';
        }
        const inputField = document.getElementById('verificationInput');
        if (inputField) {
            inputField.value = '';
        }
    }

    verifyCertificate() {
        const input = document.getElementById('verificationInput');
        if (!input) return;
        
        const inputValue = input.value.trim();
        if (!inputValue) {
            this.showToast('error', 'Please enter a certificate ID or QR code');
            return;
        }

        // Show loading state
        const verifyBtn = document.querySelector('[onclick="verifyCertificate()"]');
        if (verifyBtn) {
            verifyBtn.textContent = 'Verifying...';
            verifyBtn.disabled = true;
        }

        // Simulate verification delay
        setTimeout(() => {
            // Reset button
            if (verifyBtn) {
                verifyBtn.textContent = 'Verify Certificate';
                verifyBtn.disabled = false;
            }

            // Find certificate in multiple ways
            let certificate = null;
            
            // Check certificate requests first
            certificate = this.data.certificateRequests.find(r => 
                r.certificateId === inputValue || 
                r.qrCode === inputValue ||
                r.qrCode === `https://verify.gat.ac.in/certificate/${inputValue}` ||
                (r.qrCode && r.qrCode.endsWith(inputValue))
            );

            // Also check verification database
            if (!certificate) {
                const verificationEntry = this.data.verificationDatabase.find(v =>
                    v.certificateId === inputValue ||
                    v.qrCode === inputValue ||
                    v.qrCode === `https://verify.gat.ac.in/certificate/${inputValue}` ||
                    (v.qrCode && v.qrCode.endsWith(inputValue))
                );
                
                if (verificationEntry) {
                    certificate = verificationEntry;
                }
            }

            const resultContainer = document.getElementById('verificationResult');
            if (!resultContainer) return;
            
            if (certificate && (certificate.status === 'issued' || certificate.status === 'valid')) {
                const student = this.data.users.find(u => u.studentId === certificate.studentId);
                resultContainer.innerHTML = `
                    <div style="border: 2px solid #22c55e; border-radius: var(--radius-lg); padding: 2rem; background: rgba(34, 197, 94, 0.1);">
                        <h3 style="color: #22c55e; margin-bottom: 1rem;">✅ Certificate Verified</h3>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
                            <div>
                                <p><strong>Certificate ID:</strong> ${certificate.certificateId}</p>
                                <p><strong>Student Name:</strong> ${certificate.studentName}</p>
                                <p><strong>Student ID:</strong> ${certificate.studentId}</p>
                                <p><strong>Certificate Type:</strong> ${certificate.certificateType || this.getCertificateTypeName(certificate.certificateType)}</p>
                            </div>
                            <div>
                                <p><strong>Issue Date:</strong> ${this.formatDate(certificate.issuedDate)}</p>
                                <p><strong>Issued By:</strong> ${certificate.approvedBy || certificate.issuer}</p>
                                <p><strong>Department:</strong> ${certificate.department || student?.department || 'N/A'}</p>
                                <p><strong>Status:</strong> <span style="color: #22c55e; font-weight: bold;">VALID</span></p>
                                ${certificate.validUntil && certificate.validUntil !== 'Permanent' ? 
                                    `<p><strong>Valid Until:</strong> ${this.formatDate(certificate.validUntil)}</p>` : 
                                    `<p><strong>Validity:</strong> Permanent</p>`}
                            </div>
                        </div>
                        <div style="margin-top: 1rem; padding: 1rem; background: rgba(255, 255, 255, 0.8); border-radius: var(--radius-base);">
                            <p style="margin: 0; color: #16a34a; font-size: 14px;">
                                ✓ This certificate has been verified as authentic and was issued by ${this.data.systemSettings.instituteName}.
                            </p>
                        </div>
                    </div>
                `;
                this.logActivity('system', 'Verification System', 'certificate_verified', certificate.id || 'unknown', 
                    `Certificate ${certificate.certificateId} verified successfully`);
                this.showToast('success', 'Certificate verified successfully!');
            } else {
                resultContainer.innerHTML = `
                    <div style="border: 2px solid #ef4444; border-radius: var(--radius-lg); padding: 2rem; background: rgba(239, 68, 68, 0.1);">
                        <h3 style="color: #ef4444; margin-bottom: 1rem;">❌ Certificate Not Found</h3>
                        <p style="color: var(--color-text);">The certificate ID or QR code you entered is not valid or the certificate has not been issued yet.</p>
                        <div style="margin-top: 1rem; padding: 1rem; background: rgba(255, 255, 255, 0.8); border-radius: var(--radius-base);">
                            <p style="margin: 0; color: #dc2626; font-size: 14px;">
                                <strong>Possible reasons:</strong><br>
                                • Certificate ID is incorrect<br>
                                • Certificate is still pending approval<br>
                                • Certificate has been revoked<br>
                                • QR code is damaged or incomplete
                            </p>
                        </div>
                        <div style="margin-top: 1rem; padding: 1rem; background: var(--color-bg-1); border-radius: var(--radius-base);">
                            <p style="margin: 0; color: var(--color-text-secondary); font-size: 14px;">
                                <strong>Test with these sample IDs:</strong><br>
                                • GAT/BF/2024/001 (Bonafide Certificate)<br>
                                • GAT/TR/2024/001 (Transcript)<br>
                                • GAT-CSE-BF-2024-001 (QR Code format)
                            </p>
                        </div>
                    </div>
                `;
                this.showToast('error', 'Certificate not found or invalid');
            }
            
            resultContainer.classList.remove('hidden');
            this.saveData();
        }, 1000);
    }

    startQRScan() {
        this.showToast('info', 'QR Scanner would access device camera in production. For demo, try these test IDs: GAT/BF/2024/001, GAT/TR/2024/001, or GAT-CSE-BF-2024-001');
        
        // Auto-fill with a test certificate ID for demo
        const input = document.getElementById('verificationInput');
        if (input && !input.value) {
            input.value = 'GAT/BF/2024/001';
        }
    }

    loadAuditLogs() {
        document.getElementById('auditContent').classList.remove('hidden');
        this.renderAuditLogs();
    }

    renderAuditLogs(filteredLogs = null) {
        const container = document.getElementById('auditLogsList');
        if (!container) return;
        
        const logs = filteredLogs || this.data.auditLogs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        if (logs.length === 0) {
            container.innerHTML = '<div class="text-center" style="padding: 3rem; color: var(--color-text-secondary);">No audit logs found</div>';
            return;
        }

        container.innerHTML = logs.map(log => `
            <div class="audit-log-item">
                <div class="audit-timestamp">${this.formatDateTime(log.timestamp)}</div>
                <div class="audit-details">
                    <div class="audit-action">${log.action.replace(/_/g, ' ').toUpperCase()}</div>
                    <div class="audit-user">by ${log.userName}</div>
                    <div style="margin-top: 0.5rem; color: var(--color-text-secondary);">${log.description}</div>
                </div>
                <div class="audit-user">${log.resourceId || ''}</div>
            </div>
        `).join('');
    }

    filterRequests() {
        const searchTerm = document.getElementById('requestsSearch')?.value.toLowerCase() || '';
        const statusFilter = document.getElementById('statusFilter')?.value || '';
        
        let requests = this.currentUser.type === 'student' ? 
            this.data.certificateRequests.filter(r => r.studentId === this.currentUser.studentId) :
            this.data.certificateRequests;

        if (searchTerm) {
            requests = requests.filter(r => 
                r.studentName.toLowerCase().includes(searchTerm) ||
                r.certificateType.toLowerCase().includes(searchTerm) ||
                r.purpose.toLowerCase().includes(searchTerm)
            );
        }

        if (statusFilter) {
            requests = requests.filter(r => r.status === statusFilter);
        }

        this.renderRequestsTable(requests);
    }

    filterAuditLogs() {
        const searchTerm = document.getElementById('auditSearch')?.value.toLowerCase() || '';
        const actionFilter = document.getElementById('actionFilter')?.value || '';
        
        let logs = [...this.data.auditLogs];

        if (searchTerm) {
            logs = logs.filter(log => 
                log.description.toLowerCase().includes(searchTerm) ||
                log.userName.toLowerCase().includes(searchTerm) ||
                log.action.toLowerCase().includes(searchTerm)
            );
        }

        if (actionFilter) {
            logs = logs.filter(log => log.action === actionFilter);
        }

        this.renderAuditLogs(logs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
    }

    refreshCurrentView() {
        this.navigateTo(this.currentView);
    }

    logActivity(userId, userName, action, resourceId, description) {
        const logEntry = {
            id: `AL${String(this.data.auditLogs.length + 1).padStart(3, '0')}`,
            timestamp: new Date().toISOString(),
            userId,
            userName,
            action,
            resourceId,
            description
        };

        this.data.auditLogs.push(logEntry);
        this.saveData();
    }

    getCertificateTypeName(type) {
        const names = {
            bonafide: 'Bonafide Certificate',
            internship_completion: 'Internship Completion',
            transcript: 'Official Transcript'
        };
        return names[type] || type;
    }

    formatDate(dateString) {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-IN');
    }

    formatDateTime(dateString) {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleString('en-IN');
    }

    showModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    }

    showToast(type, message) {
        const toast = document.getElementById('toast');
        const icon = document.getElementById('toastIcon');
        const messageEl = document.getElementById('toastMessage');

        if (!toast || !icon || !messageEl) return;

        const icons = {
            success: '✅',
            error: '❌',
            info: 'ℹ️',
            warning: '⚠️'
        };

        icon.textContent = icons[type] || 'ℹ️';
        messageEl.textContent = message;
        
        toast.className = `toast toast--${type}`;
        toast.classList.remove('hidden');

        setTimeout(() => {
            toast.classList.add('hidden');
        }, 4000);
    }

    showLoadingOverlay() {
        const overlay = document.getElementById('loadingOverlay');
        if (overlay) overlay.classList.remove('hidden');
    }

    hideLoadingOverlay() {
        const overlay = document.getElementById('loadingOverlay');
        if (overlay) overlay.classList.add('hidden');
    }

    toggleNotifications() {
        this.showToast('info', 'You have 3 pending notifications: 2 certificate approvals and 1 status update');
    }

    logout() {
        if (confirm('Are you sure you want to logout?')) {
            this.logActivity(this.currentUser.id, this.currentUser.name, 'user_logout', null, 'User logged out');
            localStorage.removeItem('currentUser');
            this.currentUser = null;
            this.showLoginScreen();
            this.showToast('success', 'Logged out successfully');
        }
    }
}

// Utility Functions
function fillDemoLogin(type) {
    const demoAccounts = {
        student: { email: 'rajesh.kumar@gat.ac.in', password: 'student123' },
        admin: { email: 'suresh.reddy@gat.ac.in', password: 'admin123' }
    };

    const account = demoAccounts[type];
    const emailField = document.getElementById('loginEmail');
    const passwordField = document.getElementById('loginPassword');
    
    if (emailField && passwordField) {
        emailField.value = account.email;
        passwordField.value = account.password;
    }
}

function showRequestForm() {
    if (window.app) {
        app.showModal('requestModal');
    }
}

function closeModal(modalId) {
    if (window.app) {
        app.closeModal(modalId);
    }
}

function toggleNotifications() {
    if (window.app) {
        app.toggleNotifications();
    }
}

function logout() {
    if (window.app) {
        app.logout();
    }
}

function verifyCertificate() {
    if (window.app) {
        app.verifyCertificate();
    }
}

// Initialize the application
const app = new CertificateApp();
window.app = app; // Make app globally accessible

// Register service worker for PWA functionality
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}