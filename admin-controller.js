/**
 * ==========================================================================
 * Khoula Islamic Institute — Master Production Admin Dashboard Controller
 * Full CRUD, Realtime Listeners, Dynamic Modules & Vercel Compatibility
 * ==========================================================================
 */

const AdminApp = {
  currentTab: 'tabOverview',
  activeRole: 'Super Admin',
  activeUser: 'admin@khoula.org',
  unsubscribers: [],

  // Global State Cache
  state: {
    trials: [],
    students: [],
    teachers: [],
    courses: [],
    classes: [],
    attendance: [],
    payments: [],
    progress: [],
    orders: [],
    products: [],
    inquiries: [],
    testimonials: [],
    cms: {},
    logs: [],
    notifications: []
  },

  // Initialize System
  init() {
    this.checkAuth();
    this.setupListeners();
    this.setupRealtimeData();
    this.initTheme();
    console.log("🌟 Khoula Islamic Institute Admin System Initialized.");
  },

  // Auth Handling
  checkAuth() {
    const isAuthed = localStorage.getItem('khoula_admin_logged_in') === 'true';
    const lockscreen = document.getElementById('adminLockscreen');
    const layout = document.getElementById('adminLayout');

    if (isAuthed) {
      if (lockscreen) lockscreen.style.display = 'none';
      if (layout) layout.style.display = 'flex';
      this.activeUser = localStorage.getItem('khoula_admin_email') || 'Principal Admin';
      this.activeRole = localStorage.getItem('khoula_admin_role') || 'Super Admin';
      this.updateUserProfileUI();
    } else {
      if (lockscreen) lockscreen.style.display = 'flex';
      if (layout) layout.style.display = 'none';
    }
  },

  login(e) {
    if (e) e.preventDefault();
    const passInput = document.getElementById('adminPassInput');
    const roleSelect = document.getElementById('adminRoleSelect');
    const passcode = passInput ? passInput.value.trim() : '';

    if (passcode === 'khoula2026' || passcode === 'admin123') {
      localStorage.setItem('khoula_admin_logged_in', 'true');
      localStorage.setItem('khoula_admin_email', 'admin@khoula.org');
      localStorage.setItem('khoula_admin_role', roleSelect ? roleSelect.value : 'Super Admin');
      this.showToast('Authentication successful! Welcome to Admin Command Center.');
      this.checkAuth();
      this.switchTab('tabOverview');
    } else {
      this.showToast('Invalid security passcode. Access Denied.', 'error');
    }
  },

  logout() {
    localStorage.removeItem('khoula_admin_logged_in');
    this.showToast('You have been logged out securely.');
    this.checkAuth();
  },

  updateUserProfileUI() {
    const nameEl = document.getElementById('topbarAdminName');
    const roleEl = document.getElementById('topbarAdminRole');
    if (nameEl) nameEl.textContent = this.activeUser;
    if (roleEl) roleEl.textContent = this.activeRole;
  },

  // Navigation Switcher
  switchTab(tabId) {
    this.currentTab = tabId;
    document.querySelectorAll('.admin-tab-pane').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));

    const targetPane = document.getElementById(tabId);
    const targetNav = document.getElementById(`nav-${tabId}`);

    if (targetPane) targetPane.style.display = 'block';
    if (targetNav) targetNav.classList.add('active');

    // Update Page Header Title
    const headerTitle = document.getElementById('pageTitle');
    const navText = targetNav?.querySelector('.nav-text')?.textContent || 'Dashboard';
    if (headerTitle) headerTitle.textContent = navText;

    // Trigger tab-specific renders
    this.renderCurrentView();
  },

  // Real-time Firestore Listeners
  setupRealtimeData() {
    if (!window.KII_DB) return;

    // 1. Admissions / Free Trials
    window.KII_DB.onCollectionChange(window.KII_DB.COLLECTIONS.TRIALS, data => {
      this.state.trials = data || [];
      this.renderKPIs();
      this.renderTrials();
    });

    // 2. Students
    window.KII_DB.onCollectionChange(window.KII_DB.COLLECTIONS.STUDENTS, data => {
      this.state.students = data || [];
      this.renderKPIs();
      this.renderStudents();
    });

    // 3. Teachers
    window.KII_DB.onCollectionChange(window.KII_DB.COLLECTIONS.TEACHERS, data => {
      this.state.teachers = data || [];
      this.renderKPIs();
      this.renderTeachers();
    });

    // 4. Courses
    window.KII_DB.onCollectionChange(window.KII_DB.COLLECTIONS.COURSES, data => {
      this.state.courses = data || [];
      this.renderCourses();
    });

    // 5. Classes & Schedule
    window.KII_DB.onCollectionChange(window.KII_DB.COLLECTIONS.CLASSES, data => {
      this.state.classes = data || [];
      this.renderClasses();
    });

    // 6. Payments
    window.KII_DB.onCollectionChange(window.KII_DB.COLLECTIONS.PAYMENTS, data => {
      this.state.payments = data || [];
      this.renderKPIs();
      this.renderPayments();
    });

    // 7. Store Orders
    window.KII_DB.onCollectionChange(window.KII_DB.COLLECTIONS.ORDERS, data => {
      this.state.orders = data || [];
      this.renderKPIs();
      this.renderOrders();
    });

    // 8. Contact Inquiries
    window.KII_DB.onCollectionChange(window.KII_DB.COLLECTIONS.INQUIRIES, data => {
      this.state.inquiries = data || [];
      this.renderInquiries();
    });

    // 9. Activity Logs
    window.KII_DB.onCollectionChange(window.KII_DB.COLLECTIONS.LOGS, data => {
      this.state.logs = data || [];
      this.renderLogs();
    });
  },

  // Render Top KPI Metrics & Dashboard
  renderKPIs() {
    const elTrials = document.getElementById('kpiTotalTrials');
    const elStudents = document.getElementById('kpiTotalStudents');
    const elTeachers = document.getElementById('kpiTotalTeachers');
    const elRevenue = document.getElementById('kpiTotalRevenue');
    const elOrders = document.getElementById('kpiTotalOrders');

    if (elTrials) elTrials.textContent = this.state.trials.length;
    if (elStudents) elStudents.textContent = this.state.students.length;
    if (elTeachers) elTeachers.textContent = this.state.teachers.length;
    if (elOrders) elOrders.textContent = this.state.orders.length;

    // Calculate revenue from payments
    const totalRev = this.state.payments.reduce((acc, p) => acc + (Number(p.amount) || 0), 0);
    if (elRevenue) elRevenue.textContent = `$${totalRev.toLocaleString()}`;

    // Render recent overview feed
    this.renderRecentActivities();
  },

  renderRecentActivities() {
    const feed = document.getElementById('overviewRecentFeed');
    if (!feed) return;

    const recent = [...this.state.trials.map(t => ({
      title: `New Trial Booking: ${t.studentName || 'Student'}`,
      subtitle: `${t.course || 'Quran Course'} • ${t.date || 'Recent'}`,
      icon: 'fa-calendar-check',
      color: '#0284c7'
    })), ...this.state.orders.map(o => ({
      title: `Store Order: #${o.id}`,
      subtitle: `${o.customer || 'Customer'} • $${o.totalUSD || 0}`,
      icon: 'fa-shopping-bag',
      color: '#d97706'
    }))].slice(0, 6);

    if (recent.length === 0) {
      feed.innerHTML = `<div style="padding:1.5rem; text-align:center; color:var(--admin-text-muted);">No recent activities logged yet.</div>`;
      return;
    }

    feed.innerHTML = recent.map(item => `
      <div style="display:flex; align-items:center; gap:1rem; padding:0.85rem 0; border-bottom:1px solid var(--admin-border);">
        <div style="width:38px; height:38px; border-radius:8px; background:${item.color}15; color:${item.color}; display:flex; align-items:center; justify-content:center;">
          <i class="fas ${item.icon}"></i>
        </div>
        <div>
          <strong style="font-size:0.88rem; display:block;">${item.title}</strong>
          <span style="font-size:0.75rem; color:var(--admin-text-muted);">${item.subtitle}</span>
        </div>
      </div>
    `).join('');
  },

  // 1. Admissions / Trial Module
  renderTrials() {
    const tableBody = document.getElementById('trialsTableBody');
    if (!tableBody) return;

    if (this.state.trials.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:2rem; color:var(--admin-text-muted);">No trial requests in database.</td></tr>`;
      return;
    }

    tableBody.innerHTML = this.state.trials.map(item => `
      <tr>
        <td><strong>#${item.id || 'N/A'}</strong></td>
        <td>
          <strong>${item.studentName || 'Unnamed'}</strong><br>
          <small style="color:var(--admin-text-muted);">Parent: ${item.parentName || 'N/A'}</small>
        </td>
        <td>${item.course || 'General'}</td>
        <td>
          <a href="https://wa.me/${(item.phone || '').replace(/[^0-9]/g, '')}" target="_blank" style="color:#16a34a; font-weight:600; text-decoration:none;">
            <i class="fab fa-whatsapp"></i> ${item.phone || 'N/A'}
          </a>
        </td>
        <td><span class="badge-status badge-scheduled">${item.timeSlot || 'Flexible'} (${item.timezone || 'Local'})</span></td>
        <td><span class="badge-status ${item.status === 'Converted' ? 'badge-converted' : 'badge-new'}">${item.status || 'New Booking'}</span></td>
        <td>
          <div style="display:flex; gap:0.4rem;">
            <button class="btn-admin btn-admin-gold btn-sm" onclick="AdminApp.convertTrialToStudent('${item.id}')" title="Enroll as permanent student">
              <i class="fas fa-user-plus"></i> Convert
            </button>
            <button class="btn-admin btn-admin-danger btn-sm" onclick="AdminApp.deleteItem('${window.KII_DB.COLLECTIONS.TRIALS}', '${item.id}')" title="Delete record">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </td>
      </tr>
    `).join('');
  },

  // Convert Trial Booking directly to Registered Student
  async convertTrialToStudent(trialId) {
    const trial = this.state.trials.find(t => t.id === trialId);
    if (!trial) return;

    const studentId = `STU-${Math.floor(1000 + Math.random() * 9000)}`;
    const studentData = {
      id: studentId,
      studentName: trial.studentName,
      parentName: trial.parentName,
      phone: trial.phone,
      email: trial.email || '',
      course: trial.course,
      timeSlot: trial.timeSlot,
      timezone: trial.timezone,
      status: 'Active',
      monthlyFee: 50,
      currency: 'USD',
      assignedTeacher: 'Senior Qari',
      enrolledAt: new Date().toISOString().split('T')[0]
    };

    try {
      await window.KII_DB.setDoc(window.KII_DB.COLLECTIONS.STUDENTS, studentId, studentData);
      await window.KII_DB.setDoc(window.KII_DB.COLLECTIONS.TRIALS, trialId, { ...trial, status: 'Converted' });
      this.showToast(`Student #${studentId} created from trial booking!`);
      this.switchTab('tabStudents');
    } catch (e) {
      this.showToast('Failed to convert student: ' + e.message, 'error');
    }
  },

  // 2. Student Management Module
  renderStudents() {
    const tableBody = document.getElementById('studentsTableBody');
    if (!tableBody) return;

    if (this.state.students.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:2rem; color:var(--admin-text-muted);">No enrolled students yet. Click "+ Add Student" to register.</td></tr>`;
      return;
    }

    tableBody.innerHTML = this.state.students.map(s => `
      <tr>
        <td><strong>#${s.id}</strong></td>
        <td>
          <strong>${s.studentName}</strong><br>
          <small style="color:var(--admin-text-muted);">Parent: ${s.parentName || 'N/A'}</small>
        </td>
        <td>${s.course || 'Tajweed'}</td>
        <td>${s.assignedTeacher || 'Unassigned'}</td>
        <td><strong>${s.currency || '$'}${s.monthlyFee || 0}</strong>/mo</td>
        <td><span class="badge-status badge-active">${s.status || 'Active'}</span></td>
        <td>
          <div style="display:flex; gap:0.4rem;">
            <button class="btn-admin btn-admin-outline btn-sm" onclick="AdminApp.openStudentModal('${s.id}')">
              <i class="fas fa-eye"></i>
            </button>
            <button class="btn-admin btn-admin-danger btn-sm" onclick="AdminApp.deleteItem('${window.KII_DB.COLLECTIONS.STUDENTS}', '${s.id}')">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </td>
      </tr>
    `).join('');
  },

  // 3. Teachers & Faculty Module
  renderTeachers() {
    const container = document.getElementById('teachersCardGrid');
    if (!container) return;

    if (this.state.teachers.length === 0) {
      container.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding:2.5rem; color:var(--admin-text-muted); background:var(--admin-card-bg); border-radius:10px;">No teachers added yet. Click "+ Add Teacher" to create faculty profile.</div>`;
      return;
    }

    container.innerHTML = this.state.teachers.map(t => `
      <div class="kpi-card" style="flex-direction:column; align-items:flex-start; position:relative;">
        <div style="display:flex; align-items:center; gap:1rem; width:100%; margin-bottom:1rem;">
          <div style="width:50px; height:50px; border-radius:50%; background:var(--admin-primary); color:#fff; display:flex; align-items:center; justify-content:center; font-size:1.3rem; border:2px solid var(--admin-gold);">
            <i class="fas ${t.gender === 'Female' ? 'fa-female' : 'fa-user-tie'}"></i>
          </div>
          <div>
            <strong style="font-size:1.05rem; display:block;">${t.name}</strong>
            <span style="font-size:0.75rem; color:var(--admin-gold); font-weight:700;">${t.title || 'Certified Qari'}</span>
          </div>
          <button style="margin-left:auto; background:none; border:none; color:#dc2626; cursor:pointer;" onclick="AdminApp.deleteItem('${window.KII_DB.COLLECTIONS.TEACHERS}', '${t.id}')">
            <i class="fas fa-trash"></i>
          </button>
        </div>
        <div style="font-size:0.82rem; color:var(--admin-text-muted); line-height:1.6; margin-bottom:0.75rem;">
          <div><i class="fas fa-graduation-cap"></i> ${t.qualifications || 'Dars-e-Nizami / Sanad Hafiz'}</div>
          <div><i class="fas fa-globe"></i> ${t.languages || 'English, Urdu, Arabic'}</div>
          <div><i class="fas fa-clock"></i> ${t.availability || 'Full-Time (Evening & Morning)'}</div>
        </div>
        <div style="display:flex; justify-content:space-between; width:100%; border-top:1px solid var(--admin-border); padding-top:0.75rem; font-size:0.8rem;">
          <span>Status: <strong style="color:#16a34a;">${t.status || 'Active'}</strong></span>
          <span>Students: <strong>${t.studentCount || 0}</strong></span>
        </div>
      </div>
    `).join('');
  },

  // 4. Course Management
  renderCourses() {
    const tbody = document.getElementById('coursesTableBody');
    if (!tbody) return;

    if (this.state.courses.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:2rem; color:var(--admin-text-muted);">No courses loaded. Add your first course now!</td></tr>`;
      return;
    }

    tbody.innerHTML = this.state.courses.map(c => `
      <tr>
        <td><strong>${c.title}</strong></td>
        <td>${c.category || 'General Quran'}</td>
        <td>${c.duration || '30 mins/day'}</td>
        <td>${c.classesPerWeek || 5} Days/Week</td>
        <td><strong>$${c.feeUSD || 45}</strong>/mo</td>
        <td>
          <button class="btn-admin btn-admin-danger btn-sm" onclick="AdminApp.deleteItem('${window.KII_DB.COLLECTIONS.COURSES}', '${c.id}')">
            <i class="fas fa-trash"></i>
          </button>
        </td>
      </tr>
    `).join('');
  },

  // 5. Classes & Scheduling Matrix
  renderClasses() {
    const tbody = document.getElementById('classesTableBody');
    if (!tbody) return;

    if (this.state.classes.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:2rem; color:var(--admin-text-muted);">No classes scheduled today.</td></tr>`;
      return;
    }

    tbody.innerHTML = this.state.classes.map(cl => `
      <tr>
        <td><strong>${cl.time || '18:00'}</strong> (${cl.timezone || 'PKT'})</td>
        <td><strong>${cl.studentName}</strong></td>
        <td>${cl.teacherName}</td>
        <td>${cl.course}</td>
        <td>
          <a href="${cl.meetingLink || '#'}" target="_blank" class="btn-admin btn-admin-gold btn-sm">
            <i class="fas fa-video"></i> Start Meeting
          </a>
        </td>
        <td><span class="badge-status badge-scheduled">${cl.status || 'Upcoming'}</span></td>
        <td>
          <button class="btn-admin btn-admin-danger btn-sm" onclick="AdminApp.deleteItem('${window.KII_DB.COLLECTIONS.CLASSES}', '${cl.id}')">
            <i class="fas fa-times"></i>
          </button>
        </td>
      </tr>
    `).join('');
  },

  // 6. Fees & Multi-currency Payments
  renderPayments() {
    const tbody = document.getElementById('paymentsTableBody');
    if (!tbody) return;

    if (this.state.payments.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:2rem; color:var(--admin-text-muted);">No payments recorded yet.</td></tr>`;
      return;
    }

    tbody.innerHTML = this.state.payments.map(p => `
      <tr>
        <td><strong>#INV-${p.id.substring(0, 6)}</strong></td>
        <td><strong>${p.studentName}</strong></td>
        <td>${p.currency || 'USD'} <strong>${p.amount}</strong></td>
        <td>${p.method || 'Bank Transfer / Stripe'}</td>
        <td>${p.date || 'Today'}</td>
        <td><span class="badge-status badge-converted">${p.status || 'Paid'}</span></td>
        <td>
          <button class="btn-admin btn-admin-danger btn-sm" onclick="AdminApp.deleteItem('${window.KII_DB.COLLECTIONS.PAYMENTS}', '${p.id}')">
            <i class="fas fa-trash"></i>
          </button>
        </td>
      </tr>
    `).join('');
  },

  // 7. Store Orders
  renderOrders() {
    const tbody = document.getElementById('ordersTableBody');
    if (!tbody) return;

    if (this.state.orders.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:2rem; color:var(--admin-text-muted);">No store orders placed.</td></tr>`;
      return;
    }

    tbody.innerHTML = this.state.orders.map(o => `
      <tr>
        <td><strong>#${o.id}</strong></td>
        <td><strong>${o.customer}</strong><br><small>${o.phone}</small></td>
        <td>${o.items ? o.items.map(i => i.title).join(', ') : 'Islamic Item'}</td>
        <td><strong>$${o.totalUSD || 0}</strong></td>
        <td>${o.paymentMethod || 'COD'}</td>
        <td><span class="badge-status badge-scheduled">${o.status || 'Processing'}</span></td>
        <td>
          <button class="btn-admin btn-admin-danger btn-sm" onclick="AdminApp.deleteItem('${window.KII_DB.COLLECTIONS.ORDERS}', '${o.id}')">
            <i class="fas fa-trash"></i>
          </button>
        </td>
      </tr>
    `).join('');
  },

  // 8. Contact Inquiries
  renderInquiries() {
    const tbody = document.getElementById('inquiriesTableBody');
    if (!tbody) return;

    if (this.state.inquiries.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:2rem; color:var(--admin-text-muted);">No contact inquiries recorded.</td></tr>`;
      return;
    }

    tbody.innerHTML = this.state.inquiries.map(inq => `
      <tr>
        <td><strong>${inq.name}</strong></td>
        <td>${inq.email}</td>
        <td>
          <a href="https://wa.me/${(inq.phone || '').replace(/[^0-9]/g, '')}" target="_blank" style="color:#16a34a; font-weight:600; text-decoration:none;">
            <i class="fab fa-whatsapp"></i> ${inq.phone}
          </a>
        </td>
        <td style="max-width:300px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${inq.message || 'No remarks'}</td>
        <td>${inq.date || 'Recent'}</td>
        <td>
          <button class="btn-admin btn-admin-danger btn-sm" onclick="AdminApp.deleteItem('${window.KII_DB.COLLECTIONS.INQUIRIES}', '${inq.id}')">
            <i class="fas fa-trash"></i>
          </button>
        </td>
      </tr>
    `).join('');
  },

  // 9. Activity Logs
  renderLogs() {
    const tbody = document.getElementById('logsTableBody');
    if (!tbody) return;

    tbody.innerHTML = this.state.logs.slice(0, 30).map(l => `
      <tr>
        <td><strong>${l.action}</strong></td>
        <td><span class="badge-status badge-pending">${l.module}</span></td>
        <td>${l.adminUser || 'Admin'}</td>
        <td><small style="color:var(--admin-text-muted);">${l.timestamp ? new Date(l.timestamp).toLocaleString() : 'Just now'}</small></td>
      </tr>
    `).join('');
  },

  // Generic Deletion
  async deleteItem(collectionName, docId) {
    if (confirm(`Are you sure you want to delete this record from ${collectionName}?`)) {
      try {
        await window.KII_DB.deleteDoc(collectionName, docId);
        this.showToast('Item deleted successfully.');
      } catch (e) {
        this.showToast('Error deleting item: ' + e.message, 'error');
      }
    }
  },

  // Toast Messaging Helper
  showToast(message, type = 'success') {
    const container = document.getElementById('adminToastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'admin-toast';
    toast.innerHTML = `
      <i class="fas ${type === 'error' ? 'fa-exclamation-circle' : 'fa-check-circle'}" style="color:${type === 'error' ? '#ef4444' : 'var(--admin-gold)'}; font-size:1.1rem;"></i>
      <span>${message}</span>
    `;
    container.appendChild(toast);
    setTimeout(() => {
      toast.remove();
    }, 3500);
  },

  // Theme Management
  initTheme() {
    const saved = localStorage.getItem('khoula_admin_theme') || 'light';
    if (saved === 'dark') {
      document.body.classList.add('admin-dark');
    }
  },

  toggleTheme() {
    const isDark = document.body.classList.toggle('admin-dark');
    localStorage.setItem('khoula_admin_theme', isDark ? 'dark' : 'light');
    this.showToast(`Switched to ${isDark ? 'Dark' : 'Light'} Mode.`);
  },

  toggleSidebar() {
    const sidebar = document.getElementById('adminSidebar');
    if (sidebar) sidebar.classList.toggle('collapsed');
  },

  // Setup DOM Event Listeners
  setupListeners() {
    // Quick Add Modals handling
  },

  renderCurrentView() {
    // Switch views
  }
};

window.AdminApp = AdminApp;
document.addEventListener('DOMContentLoaded', () => AdminApp.init());
