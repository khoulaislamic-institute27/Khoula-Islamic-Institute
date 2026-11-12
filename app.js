/**
 * Khoula Islamic Institute - Master Application Logic
 * Tagline: "Connect with Quran, be near to Rehman"
 */

// ---------------------------------------------------------------------------
// 1. GLOBAL STATE & CURRENCY CONVERSION ENGINE
// ---------------------------------------------------------------------------
const APP_STATE = {
  currentCurrency: 'USD',
  exchangeRates: {
    USD: 1.0,
    PKR: 280.0,
    GBP: 0.78,
    AED: 3.67,
    EUR: 0.92,
    CAD: 1.36
  },
  currencySymbols: {
    USD: '$',
    PKR: '₨ ',
    GBP: '£',
    AED: 'AED ',
    EUR: '€',
    CAD: 'CA$'
  },
  cart: [],
  courses: [],
  teachers: [],
  products: [],
  trialBookings: [],
  orders: []
};

// Default Initial Data
const DEFAULT_COURSES = [
  {
    id: 'c1',
    title: 'Noorani Qaida & Yassarnal Quran',
    category: 'basics',
    level: 'Beginner (Kids 4+ & Adults)',
    duration: '30 Mins / Class',
    description: 'Master Arabic alphabet pronunciation, Makharij from throat and tongue, compound letters, Harakaat, Tanween, and basic Tajweed rules to begin reading directly.',
    badge: 'Fundamental',
    topics: ['Makharij of 29 Arabic Letters', 'Huroof-e-Murakkabat', 'Harakaat, Sukoon & Tanween', 'Rules of Noon Saakin & Tanween']
  },
  {
    id: 'c2',
    title: 'Monthly Tajweed & Quran Course',
    category: 'tajweed',
    level: 'All Ages (Kids & Adults)',
    duration: '30-45 Mins / Class',
    description: 'Learn to recite the Holy Quran fluently with precise Tajweed rules including Ahkam al-Noon & Meem, Ghunnah, Qalqalah, Rules of Raa, and Waqf (stopping signs).',
    badge: 'Most Popular',
    popular: true,
    topics: ['Ahkam-e-Noon Saakin & Tanween', 'Ahkam-e-Meem Saakin', 'Qalqalah & Ghunnah Perfection', 'Madd Rules & Waqf Signs']
  },
  {
    id: 'c3',
    title: 'Hifz-ul-Quran (Full & Partial)',
    category: 'hifz',
    level: 'Dedicated Students',
    duration: '45-60 Mins / Class',
    description: 'Structured memorization of the Holy Quran with daily Sabaq (new lesson), Sabqi (recent revision), and Muraja\'ah / Manzil (cumulative retention) under certified Huffaz.',
    badge: 'Intensive',
    topics: ['Daily New Lesson (Sabaq)', 'Weekly Revision (Sabqi)', 'Cumulative Retention (Muraja\'ah)', 'Ijazah Preparation']
  },
  {
    id: 'c4',
    title: 'Tafseer-o-Tarjuma (Word-by-Word)',
    category: 'advanced',
    level: 'Youth & Adults',
    duration: '45 Mins / Class',
    description: 'Understand the divine message of Allah with in-depth word-by-word translation, contextual Shan-e-Nuzool, linguistic miracles, and modern life applications.',
    badge: 'Scholarly',
    topics: ['Linguistic Word-by-Word Analysis', 'Shan-e-Nuzool (Context of Revelation)', 'Rulings & Wisdom from Ayahs', 'Authentic Hadith Cross-Reference']
  },
  {
    id: 'c5',
    title: 'Islamic Studies & Daily Duas for Kids',
    category: 'basics',
    level: 'Kids (5 - 14 Years)',
    duration: '30 Mins / Class',
    description: 'A nurturing curriculum covering Salah with meanings, 40 Masnoon Duas, Six Kalimahs, Stories of the Prophets, Islamic Akhlaq, manners, and daily etiquettes.',
    badge: 'Kids Favorite',
    topics: ['Practical Salah & Wudu Steps', 'Daily Masnoon Morning & Evening Duas', 'Seerah of Prophet Muhammad ﷺ', 'Islamic Morals & Etiquettes']
  },
  {
    id: 'c6',
    title: 'Dedicated Sisters & Daughters Program',
    category: 'sisters',
    level: 'Female Students Only',
    duration: '30-45 Mins / Class',
    description: '100% private 1-on-1 classes taught exclusively by certified female scholars (Alimahs & Qariahs) covering Nazra, Tajweed, Fiqh of Taharah, and Quranic reflections.',
    badge: '100% Female Faculty',
    topics: ['Complete Privacy Guaranteed', 'Tajweed & Nazra Recitation', 'Fiqh-un-Nisa (Women\'s Fiqh)', 'Spiritual Tarbiyah']
  }
];

const DEFAULT_TEACHERS = [
  {
    id: 't1',
    name: 'Qari Abdul Rehman Al-Azhari',
    title: 'Senior Qari & Tajweed Master',
    gender: 'Male',
    experience: '9+ Years Experience',
    qualification: 'Sanad & Ijazah in Hafs \'an Asim (Al-Azhar University)',
    languages: 'English, Urdu, Arabic',
    rating: 5.0,
    photo: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=400&q=80',
    audioSurah: 'Surah Al-Fatiha',
    audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/001001.mp3'
  },
  {
    id: 't2',
    name: 'Ustadha Fatima Zahra',
    title: 'Certified Alimah & Child Pedagogy Specialist',
    gender: 'Female',
    experience: '7+ Years Experience',
    qualification: 'Shahadat-ul-Alimiyyah (Wifaq-ul-Madaris), M.A Islamic Studies',
    languages: 'English & Urdu',
    rating: 5.0,
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    audioSurah: 'Surah Al-Ikhlas',
    audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/112001.mp3'
  },
  {
    id: 't3',
    name: 'Mufti Muhammad Zeeshan',
    title: 'Scholarly Advisor & Tafseer Faculty',
    gender: 'Male',
    experience: '12+ Years Experience',
    qualification: 'Dars-e-Nizami Graduate & Takhassus fi al-Ifta (Mufti)',
    languages: 'Urdu, English, Arabic',
    rating: 4.9,
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    audioSurah: 'Surah Ar-Rahman',
    audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/055001.mp3'
  },
  {
    id: 't4',
    name: 'Ustadha Maryam Siddiqa',
    title: 'Hafiza & Sisters Tajweed Tutor',
    gender: 'Female',
    experience: '6+ Years Experience',
    qualification: 'Hafizah-ul-Quran with Ijazah in 7 Qira\'at, B.S. Education',
    languages: 'English, Urdu, Punjabi',
    rating: 5.0,
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    audioSurah: 'Surah Al-Mulk',
    audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/067001.mp3'
  }
];

const DEFAULT_PRODUCTS = [
  {
    id: 'p1',
    title: 'Tajweed Deluxe Holy Quran (Embossed Leather)',
    category: 'Quran Copies',
    basePriceUSD: 24.0,
    rating: 5,
    image: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=500&q=80',
    description: 'Color-coded Tajweed rules with Uthmani script. Durable gold-embossed leather cover with ribbon marker.'
  },
  {
    id: 'p2',
    title: 'Orthopedic Turkish Velvet Janamaz (Prayer Rug)',
    category: 'Prayer Mats',
    basePriceUSD: 28.0,
    rating: 5,
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=500&q=80',
    description: 'High-density memory foam padding relieves joint & knee pain during Sujood. Elegant Ottoman floral pattern.'
  },
  {
    id: 'p3',
    title: 'Smart Digital Ring Tasbeeh & Bluetooth Counter',
    category: 'Accessories',
    basePriceUSD: 14.0,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=500&q=80',
    description: 'OLED screen, vibration notifications at 33, 66, and 99 counts, water-resistant, USB rechargeable.'
  },
  {
    id: 'p4',
    title: 'Noorani Qaida Master Guide & Workbook Set',
    category: 'Books',
    basePriceUSD: 12.0,
    rating: 5,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=500&q=80',
    description: 'Glossy laminated pages with bilingual Urdu and English pronunciation guides for kids and beginners.'
  },
  {
    id: 'p5',
    title: 'Daily Masnoon Duas Flashcard Gift Box',
    category: 'Duas & Gifts',
    basePriceUSD: 15.0,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=500&q=80',
    description: '50 essential daily supplications with Arabic text, transliteration, English translation, and benefits.'
  },
  {
    id: 'p6',
    title: 'Hisnul Muslim (Fortress of the Muslim) Deluxe',
    category: 'Books',
    basePriceUSD: 9.0,
    rating: 5,
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=500&q=80',
    description: 'Compact pocket edition with authentic supplications from the Quran and Sunnah, gold-foiled edge.'
  }
];

// ---------------------------------------------------------------------------
// 2. INITIALIZATION & LOCALSTORAGE SYNC
// ---------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  loadStoredData();
  initNavigation();
  initHeroCarousel();
  initCurrencySelector();
  renderCourses();
  renderTeachers();
  renderShop();
  renderPricing();
  initTrialForm();
  initCart();
  initAdminModal();
  initWhatsAppWidget();
  initTestimonialsCarousel();
});

function loadStoredData() {
  const savedCourses = localStorage.getItem('khoula_courses');
  APP_STATE.courses = savedCourses ? JSON.parse(savedCourses) : DEFAULT_COURSES;
  const c2 = APP_STATE.courses.find(c => c.id === 'c2');
  if (c2) {
    c2.popular = true;
    c2.badge = 'Most Popular';
    if (!c2.title.includes('Monthly')) c2.title = 'Monthly Tajweed & Quran Course';
  }

  const savedTeachers = localStorage.getItem('khoula_teachers');
  APP_STATE.teachers = savedTeachers ? JSON.parse(savedTeachers) : DEFAULT_TEACHERS;

  const savedProducts = localStorage.getItem('khoula_products');
  APP_STATE.products = savedProducts ? JSON.parse(savedProducts) : DEFAULT_PRODUCTS;

  const savedCart = localStorage.getItem('khoula_cart');
  APP_STATE.cart = savedCart ? JSON.parse(savedCart) : [];

  const savedBookings = localStorage.getItem('khoula_trial_bookings');
  APP_STATE.trialBookings = savedBookings ? JSON.parse(savedBookings) : [
    {
      id: 'TR-1001',
      studentName: 'Zayd Khan',
      parentName: 'Imran Khan',
      email: 'imran.khan@example.com',
      phone: '+92 300 5551234',
      course: 'Quran Reading & Nazra with Tajweed',
      timeSlot: 'Evening (5:00 PM - 8:00 PM)',
      timezone: 'PKT (UTC+5)',
      tutorPref: 'Male Tutor',
      status: 'Trial Scheduled',
      date: '2026-10-18'
    },
    {
      id: 'TR-1002',
      studentName: 'Amina Farooq',
      parentName: 'Mrs. Farooq',
      email: 'amina.f@example.co.uk',
      phone: '+44 7911 123456',
      course: 'Dedicated Sisters & Daughters Program',
      timeSlot: 'Afternoon (2:00 PM - 5:00 PM)',
      timezone: 'GMT/BST (UTC+1)',
      tutorPref: 'Female Tutor',
      status: 'New Booking',
      date: '2026-10-19'
    }
  ];

  const savedOrders = localStorage.getItem('khoula_orders');
  APP_STATE.orders = savedOrders ? JSON.parse(savedOrders) : [
    {
      id: 'ORD-9021',
      customer: 'Tariq Mehmood',
      items: 'Tajweed Deluxe Holy Quran (x1)',
      total: '₨ 6,720',
      status: 'Processing',
      date: '2026-10-18'
    }
  ];
}

// ---------------------------------------------------------------------------
// 3. CURRENCY CONVERTER HELPERS
// ---------------------------------------------------------------------------
function formatPrice(amountInUSD) {
  const rate = APP_STATE.exchangeRates[APP_STATE.currentCurrency] || 1.0;
  const symbol = APP_STATE.currencySymbols[APP_STATE.currentCurrency] || '$';
  const converted = amountInUSD * rate;
  
  if (APP_STATE.currentCurrency === 'PKR') {
    return `${symbol}${Math.round(converted).toLocaleString()}`;
  }
  return `${symbol}${converted.toFixed(2)}`;
}

function initCurrencySelector() {
  const selectors = document.querySelectorAll('.currency-select');
  selectors.forEach(select => {
    select.value = APP_STATE.currentCurrency;
    select.addEventListener('change', (e) => {
      APP_STATE.currentCurrency = e.target.value;
      // Sync all dropdowns
      selectors.forEach(s => s.value = APP_STATE.currentCurrency);
      // Re-render price-dependent components
      renderPricing();
      renderShop();
      renderCartUI();
      showToast(`Currency updated to ${APP_STATE.currentCurrency}`);
    });
  });
}

// ---------------------------------------------------------------------------
// 4. NAVIGATION & HAMBURGER DRAWER MENU (Tadeebul Quran Style)
// ---------------------------------------------------------------------------
function initNavigation() {
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const navDrawer = document.getElementById('navMenu');
  const overlay = document.getElementById('navDrawerOverlay');
  const closeBtn = document.getElementById('navDrawerClose');

  function openMenu() {
    if (navDrawer) navDrawer.classList.add('active');
    if (overlay) overlay.classList.add('active');
    if (toggleBtn) {
      toggleBtn.classList.add('active');
      toggleBtn.setAttribute('aria-expanded', 'true');
    }
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    if (navDrawer) navDrawer.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    if (toggleBtn) {
      toggleBtn.classList.remove('active');
      toggleBtn.setAttribute('aria-expanded', 'false');
    }
    document.body.style.overflow = '';
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (navDrawer && navDrawer.classList.contains('active')) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeMenu);
  }

  if (overlay) {
    overlay.addEventListener('click', closeMenu);
  }

  // Close when pressing Esc key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navDrawer && navDrawer.classList.contains('active')) {
      closeMenu();
    }
  });

  // Close menu and smooth scroll when clicking any nav link
  document.querySelectorAll('.nav-drawer .nav-link, .nav-drawer a').forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ---------------------------------------------------------------------------
// 5. COURSES RENDERING & FILTERING
// ---------------------------------------------------------------------------
function renderCourses(filterCategory = 'all') {
  const grid = document.getElementById('coursesGrid');
  if (!grid) return;

  const filtered = filterCategory === 'all' 
    ? APP_STATE.courses 
    : APP_STATE.courses.filter(c => c.category === filterCategory);

  grid.innerHTML = filtered.map(course => {
    const isPopular = course.id === 'c2' || course.popular || course.title.toLowerCase().includes('tajweed');
    return `
    <div class="course-card ${isPopular ? 'popular-gold-border' : ''}">
      ${isPopular ? '<div class="popular-ribbon"><i class="fas fa-crown"></i> Most Popular Course</div>' : ''}
      <div class="course-card-banner">
        <span class="course-badge-level">${course.level}</span>
        <div class="course-card-icon-wrap">
          <i class="fas fa-quran"></i>
        </div>
      </div>
      <div class="course-card-body">
        <div class="course-meta-tags">
          <span class="course-meta-pill"><i class="far fa-clock"></i> ${course.duration}</span>
          <span class="course-meta-pill"><i class="fas fa-tag"></i> ${isPopular ? 'Top Enrolled' : course.badge}</span>
        </div>
        <h3 class="course-title">${course.title}</h3>
        <p class="course-description">${course.description}</p>
        <div class="course-card-footer">
          <button class="btn btn-outline-gold btn-sm" onclick="openCourseDetails('${course.id}')">
            View Syllabus
          </button>
          <button class="btn ${isPopular ? 'btn-gold' : 'btn-primary'} btn-sm" onclick="quickEnrollCourse('${course.title.replace(/'/g, "\\'")}')">
            <i class="fas fa-calendar-check"></i> Book Trial
          </button>
        </div>
      </div>
    </div>
  `;
  }).join('');

  // Tab button active states
  document.querySelectorAll('.course-tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.category === filterCategory);
  });
}

window.filterCourses = function(category) {
  renderCourses(category);
};

window.openCourseDetails = function(courseId) {
  const course = APP_STATE.courses.find(c => c.id === courseId);
  if (!course) return;

  const modalHtml = `
    <div class="modal-header">
      <h3 class="modal-title">${course.title}</h3>
      <button class="modal-close-btn" onclick="closeModal()">&times;</button>
    </div>
    <div class="modal-body">
      <div style="display:flex; gap:0.6rem; margin-bottom:1.2rem;">
        <span class="badge-gold">${course.level}</span>
        <span class="badge-teal">${course.duration}</span>
      </div>
      <p style="margin-bottom:1.5rem; color:#475569; font-size:1rem; line-height:1.6;">${course.description}</p>
      
      <h4 style="font-family:var(--font-heading); margin-bottom:0.8rem; color:var(--color-primary-dark);">Key Curriculum Modules</h4>
      <ul style="list-style:none; display:flex; flex-direction:column; gap:0.6rem; margin-bottom:2rem;">
        ${course.topics.map(t => `
          <li style="display:flex; align-items:center; gap:0.6rem; color:#334155; font-size:0.94rem;">
            <i class="fas fa-check-circle" style="color:var(--color-gold);"></i> ${t}
          </li>
        `).join('')}
      </ul>

      <div style="display:flex; gap:1rem; justify-content:flex-end;">
        <button class="btn btn-outline-gold" onclick="closeModal()">Close</button>
        <button class="btn btn-gold" onclick="closeModal(); quickEnrollCourse('${course.title}')">Enroll in this Course</button>
      </div>
    </div>
  `;
  showModal(modalHtml);
};

window.quickEnrollCourse = function(courseTitle) {
  const courseSelect = document.getElementById('trialCourseSelect');
  if (courseSelect) {
    courseSelect.value = courseTitle;
  }
  const trialSection = document.getElementById('free-trial');
  if (trialSection) {
    trialSection.scrollIntoView({ behavior: 'smooth' });
  } else {
    openTrialModal(courseTitle);
  }
};

// ---------------------------------------------------------------------------
// 6. EXPERT TEACHERS DIRECTORY & AUDIO RECITATION
// ---------------------------------------------------------------------------
let currentPlayingAudio = null;

function renderTeachers(filterGender = 'all') {
  const grid = document.getElementById('teachersGrid');
  if (!grid) return;

  const filtered = filterGender === 'all'
    ? APP_STATE.teachers
    : APP_STATE.teachers.filter(t => t.gender.toLowerCase() === filterGender.toLowerCase());

  grid.innerHTML = filtered.map(teacher => `
    <div class="teacher-card">
      <div class="teacher-photo-wrap">
        <img src="${teacher.photo}" alt="${teacher.name}" loading="lazy">
        <span class="teacher-gender-badge">${teacher.gender === 'Female' ? '🧕 Female Faculty' : '👳 Certified Qari'}</span>
      </div>
      <div class="teacher-body">
        <h3 class="teacher-name">${teacher.name}</h3>
        <span class="teacher-title">${teacher.title}</span>
        <p class="teacher-qualifications">
          <strong>Credentials:</strong> ${teacher.qualification}<br>
          <strong>Languages:</strong> ${teacher.languages}
        </p>

        <div class="teacher-audio-player">
          <div style="display:flex; align-items:center; gap:0.6rem;">
            <button class="play-recitation-btn" id="playBtn-${teacher.id}" onclick="playTeacherAudio('${teacher.id}', '${teacher.audioUrl}')">
              <i class="fas fa-play" id="icon-${teacher.id}"></i>
            </button>
            <div style="display:flex; flex-direction:column;">
              <span style="font-size:0.78rem; font-weight:700; color:var(--color-primary-dark);">${teacher.audioSurah}</span>
              <span style="font-size:0.7rem; color:var(--text-muted);">Click to listen</span>
            </div>
          </div>
          <span style="font-size:0.8rem; color:var(--color-gold); font-weight:700;">★ ${teacher.rating}</span>
        </div>

        <button class="btn btn-outline-gold btn-sm btn-block" onclick="bookWithTeacher('${teacher.name}', '${teacher.gender}')">
          Request as Tutor
        </button>
      </div>
    </div>
  `).join('');
}

window.filterTeachers = function(gender) {
  renderTeachers(gender);
  document.querySelectorAll('.teacher-tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.gender === gender);
  });
};

window.playTeacherAudio = function(teacherId, url) {
  const icon = document.getElementById(`icon-${teacherId}`);
  
  if (currentPlayingAudio && currentPlayingAudio.teacherId === teacherId) {
    if (!currentPlayingAudio.audio.paused) {
      currentPlayingAudio.audio.pause();
      if (icon) icon.className = 'fas fa-play';
      return;
    } else {
      currentPlayingAudio.audio.play();
      if (icon) icon.className = 'fas fa-pause';
      return;
    }
  }

  // Reset any other playing audio
  if (currentPlayingAudio && currentPlayingAudio.audio) {
    currentPlayingAudio.audio.pause();
    const prevIcon = document.getElementById(`icon-${currentPlayingAudio.teacherId}`);
    if (prevIcon) prevIcon.className = 'fas fa-play';
  }

  const audio = new Audio(url);
  currentPlayingAudio = { teacherId, audio };
  
  if (icon) icon.className = 'fas fa-spinner fa-spin';

  audio.play().then(() => {
    if (icon) icon.className = 'fas fa-pause';
  }).catch(() => {
    // Fallback if network blocked audio CDN
    if (icon) icon.className = 'fas fa-play';
    showToast('Playing sample audio preview...');
    simulateWebAudioRecitation();
  });

  audio.onended = () => {
    if (icon) icon.className = 'fas fa-play';
  };
};

function simulateWebAudioRecitation() {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(330, audioCtx.currentTime + 1.2);
    gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.2);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 1.2);
  } catch(e) {}
}

window.bookWithTeacher = function(teacherName, gender) {
  const trialSection = document.getElementById('free-trial');
  const tutorPrefSelect = document.getElementById('tutorPrefSelect');
  if (tutorPrefSelect) {
    tutorPrefSelect.value = gender === 'Female' ? 'Female Tutor' : 'Male Tutor';
  }
  const notesField = document.getElementById('trialNotes');
  if (notesField) {
    notesField.value = `Requested Teacher: ${teacherName}`;
  }
  if (trialSection) {
    trialSection.scrollIntoView({ behavior: 'smooth' });
    showToast(`Teacher preference set to ${teacherName}`);
  }
};

// ---------------------------------------------------------------------------
// 7. FEE PLANS & PRICING MATRIX
// ---------------------------------------------------------------------------
const BASE_PLANS = [
  {
    id: 'starter',
    name: 'Starter Plan',
    frequency: '2 Days / Week',
    classesCount: '8 Classes / Month (30 min ea)',
    baseUSD: 35.0,
    features: [
      'Dedicated 1-on-1 Certified Tutor',
      'Flexible Rescheduling (24h Notice)',
      'Free Tajweed Assessment Worksheets',
      'Basic Monthly Progress Report',
      'Zoom / Google Meet Live Access'
    ],
    featured: false
  },
  {
    id: 'regular',
    name: 'Monthly Tajweed & Quran Course',
    frequency: '3 Days / Week',
    classesCount: '12 Classes / Month (30 min ea)',
    baseUSD: 48.0,
    features: [
      'Dedicated 1-on-1 Certified Tutor',
      'Male or Female Tutor of Choice',
      'Full Tajweed & Nazra Curriculum',
      'Comprehensive Monthly Parent Card',
      'Daily Masnoon Duas Inclusion',
      'Make-up Classes for Missed Sessions'
    ],
    featured: true
  },
  {
    id: 'intensive',
    name: 'Hifz & Intensive Plan',
    frequency: '5 Days / Week',
    classesCount: '20 Classes / Month (45 min ea)',
    baseUSD: 75.0,
    features: [
      'Accelerated Memorization (Hifz)',
      'Daily Sabaq, Sabqi & Muraja\'ah',
      'Senior Certified Hafiz/Qari',
      'Audio Recording of Each Session',
      'Weekly Sanad & Evaluation Reports',
      'Priority 24/7 WhatsApp Support'
    ],
    featured: false
  }
];

function renderPricing() {
  const grid = document.getElementById('pricingGrid');
  if (!grid) return;

  grid.innerHTML = BASE_PLANS.map(plan => `
    <div class="pricing-card ${plan.featured ? 'featured' : ''}">
      ${plan.featured ? '<div class="featured-ribbon">Most Popular Choice</div>' : ''}
      <h3 class="pricing-plan-name">${plan.name}</h3>
      <p class="pricing-plan-desc">${plan.frequency} • ${plan.classesCount}</p>
      
      <div class="pricing-price-box">
        <span class="pricing-amount">${formatPrice(plan.baseUSD)}</span>
        <span class="pricing-cycle">/ month</span>
      </div>

      <ul class="pricing-features-list">
        ${plan.features.map(f => `
          <li class="pricing-feature-item">
            <i class="fas fa-check-circle pricing-check-icon"></i>
            <span>${f}</span>
          </li>
        `).join('')}
      </ul>

      <button class="btn ${plan.featured ? 'btn-gold' : 'btn-primary'} btn-block" onclick="selectPricingPlan('${plan.name}')">
        Start 3-Day Free Trial
      </button>
    </div>
  `).join('');
}

window.selectPricingPlan = function(planName) {
  const notesField = document.getElementById('trialNotes');
  if (notesField) {
    notesField.value = `Selected Fee Plan: ${planName}`;
  }
  const trialSection = document.getElementById('free-trial');
  if (trialSection) {
    trialSection.scrollIntoView({ behavior: 'smooth' });
    showToast(`Selected ${planName}. Please complete trial registration.`);
  }
};

// ---------------------------------------------------------------------------
// 8. FREE TRIAL REGISTRATION FORM
// ---------------------------------------------------------------------------
function initTrialForm() {
  const form = document.getElementById('trialRegistrationForm');
  if (!form) return;

  // Auto-detect user timezone
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const tzSelect = document.getElementById('trialTimezone');
    if (tzSelect && tz) {
      let optionExists = Array.from(tzSelect.options).some(o => o.value === tz);
      if (!optionExists) {
        const newOpt = new Option(`${tz} (Detected)`, tz, true, true);
        tzSelect.add(newOpt);
      } else {
        tzSelect.value = tz;
      }
    }
  } catch (e) {}

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const booking = {
      id: 'TR-' + Math.floor(1000 + Math.random() * 9000),
      studentName: document.getElementById('studentName')?.value.trim(),
      parentName: document.getElementById('parentName')?.value.trim(),
      email: document.getElementById('studentEmail')?.value.trim(),
      phone: document.getElementById('studentPhone')?.value.trim(),
      course: document.getElementById('trialCourseSelect')?.value,
      timeSlot: document.getElementById('trialTimeSlot')?.value,
      timezone: document.getElementById('trialTimezone')?.value,
      tutorPref: document.getElementById('tutorPrefSelect')?.value,
      notes: document.getElementById('trialNotes')?.value.trim() || 'None',
      status: 'New Booking',
      date: new Date().toISOString().split('T')[0]
    };

    if (!booking.studentName || !booking.phone || !booking.email) {
      showToast('Please fill all required fields.', 'error');
      return;
    }

    // Save to state and storage
    APP_STATE.trialBookings.unshift(booking);
    localStorage.setItem('khoula_trial_bookings', JSON.stringify(APP_STATE.trialBookings));

    // Automatically sync to Google Firebase Cloud Firestore
    if (typeof window.saveBookingToFirebase === 'function') {
      window.saveBookingToFirebase(booking);
    }

    // Construct pre-filled WhatsApp message
    const waText = encodeURIComponent(
      `*Assalamu Alaikum Khoula Islamic Institute!*\n\n` +
      `I would like to confirm my 3-Day Free Trial Class booking:\n` +
      `• *Student Name:* ${booking.studentName}\n` +
      `• *Parent Name:* ${booking.parentName}\n` +
      `• *Course:* ${booking.course}\n` +
      `• *Preferred Time:* ${booking.timeSlot}\n` +
      `• *Timezone:* ${booking.timezone}\n` +
      `• *Tutor Preference:* ${booking.tutorPref}\n` +
      `• *Booking ID:* ${booking.id}\n\n` +
      `Please assign our qualified Qari/Aalima.`
    );
    const waUrl = `https://wa.me/923001234567?text=${waText}`;

    // Success Modal Dialog
    const successHtml = `
      <div class="modal-header">
        <h3 class="modal-title"><i class="fas fa-check-circle" style="color:var(--color-gold);"></i> Free Trial Confirmed!</h3>
        <button class="modal-close-btn" onclick="closeModal()">&times;</button>
      </div>
      <div class="modal-body" style="text-align:center;">
        <div style="font-size:3.5rem; color:var(--color-success); margin-bottom:1rem;">
          <i class="fas fa-award"></i>
        </div>
        <h3 style="font-family:var(--font-heading); color:var(--color-primary-dark); margin-bottom:0.6rem;">
          JazakAllah Khair, ${booking.studentName}!
        </h3>
        <p style="color:var(--text-muted); font-size:1rem; margin-bottom:1.5rem; line-height:1.6;">
          Your 3-Day Free Trial registration for <strong>${booking.course}</strong> has been logged under Booking ID <strong>#${booking.id}</strong>.
          Our academic coordinator will reach out to schedule your 15-minute evaluation session.
        </p>
        
        <div style="background:var(--color-gold-pale); padding:1rem; border-radius:var(--radius-md); border:1px solid var(--color-gold-border); margin-bottom:1.8rem; text-align:left;">
          <p style="font-size:0.88rem; color:#856404; margin-bottom:0.3rem;"><strong>Speed up coordination:</strong></p>
          <p style="font-size:0.85rem; color:#6b5207;">Send your details straight to our Admissions WhatsApp desk to get your class link within 2 hours!</p>
        </div>

        <div style="display:flex; gap:1rem; justify-content:center; flex-wrap:wrap;">
          <a href="${waUrl}" target="_blank" class="btn btn-gold" style="background:#25d366; color:#fff; border-color:#25d366;">
            <i class="fab fa-whatsapp"></i> Confirm on WhatsApp
          </a>
          <button class="btn btn-primary" onclick="closeModal()">Done</button>
        </div>
      </div>
    `;

    form.reset();
    showModal(successHtml);
  });
}

// ---------------------------------------------------------------------------
// 9. ISLAMIC E-COMMERCE SHOP & CART ENGINE
// ---------------------------------------------------------------------------
function renderShop() {
  const grid = document.getElementById('shopGrid');
  if (!grid) return;

  grid.innerHTML = APP_STATE.products.map(prod => `
    <div class="product-card">
      <div class="product-image-wrap">
        <span class="product-category-tag">${prod.category}</span>
        <img src="${prod.image}" alt="${prod.title}" loading="lazy">
      </div>
      <div class="product-body">
        <h3 class="product-title">${prod.title}</h3>
        <div class="product-rating">
          ${'★'.repeat(Math.floor(prod.rating))} <span style="color:#64748b; font-size:0.75rem;">(${prod.rating})</span>
        </div>
        <p style="font-size:0.84rem; color:var(--text-muted); margin-bottom:1rem; line-height:1.5;">${prod.description}</p>
        
        <div class="product-price-row">
          <span class="product-price">${formatPrice(prod.basePriceUSD)}</span>
          <button class="btn btn-gold btn-sm" onclick="addToCart('${prod.id}')">
            <i class="fas fa-shopping-cart"></i> Add to Cart
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

function initCart() {
  const trigger = document.getElementById('cartTrigger');
  const overlay = document.getElementById('cartOverlay');
  const closeBtn = document.getElementById('cartCloseBtn');

  if (trigger) trigger.addEventListener('click', openCart);
  if (overlay) overlay.addEventListener('click', closeCart);
  if (closeBtn) closeBtn.addEventListener('click', closeCart);

  renderCartUI();
}

function openCart() {
  document.getElementById('cartOverlay')?.classList.add('open');
  document.getElementById('cartDrawer')?.classList.add('open');
  renderCartUI();
}

function closeCart() {
  document.getElementById('cartOverlay')?.classList.remove('open');
  document.getElementById('cartDrawer')?.classList.remove('open');
}

window.addToCart = function(productId) {
  const product = APP_STATE.products.find(p => p.id === productId);
  if (!product) return;

  const existing = APP_STATE.cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    APP_STATE.cart.push({ ...product, qty: 1 });
  }

  saveCart();
  renderCartUI();
  showToast(`Added "${product.title}" to cart!`);
  openCart();
};

function saveCart() {
  localStorage.setItem('khoula_cart', JSON.stringify(APP_STATE.cart));
}

function renderCartUI() {
  const countBadge = document.getElementById('cartCountBadge');
  const itemsContainer = document.getElementById('cartItemsList');
  const subtotalEl = document.getElementById('cartSubtotalAmount');

  const totalItems = APP_STATE.cart.reduce((sum, item) => sum + item.qty, 0);
  if (countBadge) countBadge.textContent = totalItems;

  if (!itemsContainer) return;

  if (APP_STATE.cart.length === 0) {
    itemsContainer.innerHTML = `
      <div style="text-align:center; padding:3rem 1rem; color:var(--text-muted);">
        <i class="fas fa-shopping-basket" style="font-size:3rem; color:#cbd5e1; margin-bottom:1rem;"></i>
        <p style="font-size:1rem; font-weight:600;">Your cart is currently empty.</p>
        <p style="font-size:0.85rem;">Explore our Islamic store to add sacred essentials.</p>
      </div>
    `;
    if (subtotalEl) subtotalEl.textContent = formatPrice(0);
    return;
  }

  let subtotalUSD = 0;
  itemsContainer.innerHTML = APP_STATE.cart.map(item => {
    subtotalUSD += item.basePriceUSD * item.qty;
    return `
      <div class="cart-item-row">
        <div class="cart-item-img">
          <img src="${item.image}" alt="${item.title}" style="max-height:100%; object-fit:contain;">
        </div>
        <div class="cart-item-details">
          <h4 class="cart-item-name">${item.title}</h4>
          <span class="cart-item-price">${formatPrice(item.basePriceUSD)}</span>
          <div class="cart-qty-ctrl">
            <button class="qty-btn" onclick="updateCartQty('${item.id}', -1)">-</button>
            <span style="font-size:0.85rem; font-weight:700; width:20px; text-align:center;">${item.qty}</span>
            <button class="qty-btn" onclick="updateCartQty('${item.id}', 1)">+</button>
            <button style="background:none; border:none; color:#ef4444; font-size:0.8rem; margin-left:auto; cursor:pointer;" onclick="removeFromCart('${item.id}')">
              <i class="fas fa-trash-alt"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  if (subtotalEl) {
    subtotalEl.textContent = formatPrice(subtotalUSD);
  }
}

window.updateCartQty = function(productId, delta) {
  const item = APP_STATE.cart.find(i => i.id === productId);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    APP_STATE.cart = APP_STATE.cart.filter(i => i.id !== productId);
  }
  saveCart();
  renderCartUI();
};

window.removeFromCart = function(productId) {
  APP_STATE.cart = APP_STATE.cart.filter(i => i.id !== productId);
  saveCart();
  renderCartUI();
};

window.proceedToCheckout = function() {
  if (APP_STATE.cart.length === 0) {
    showToast('Your cart is empty!', 'error');
    return;
  }

  closeCart();

  const totalUSD = APP_STATE.cart.reduce((s, i) => s + (i.basePriceUSD * i.qty), 0);
  const checkoutHtml = `
    <div class="modal-header">
      <h3 class="modal-title">Checkout - Khoula Islamic Store</h3>
      <button class="modal-close-btn" onclick="closeModal()">&times;</button>
    </div>
    <div class="modal-body">
      <form id="checkoutForm" onsubmit="handlePlaceOrder(event, ${totalUSD})">
        <h4 style="margin-bottom:0.8rem; color:var(--color-primary-dark);">1. Delivery Information</h4>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Full Name *</label>
            <input type="text" id="orderName" class="form-control" required placeholder="Brother / Sister Name">
          </div>
          <div class="form-group">
            <label class="form-label">WhatsApp / Phone *</label>
            <input type="tel" id="orderPhone" class="form-control" required placeholder="+92 300 0000000">
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Complete Shipping Address *</label>
          <textarea id="orderAddress" class="form-control" rows="2" required placeholder="House/Street, Area, City, Postal Code, Country"></textarea>
        </div>

        <h4 style="margin:1.4rem 0 0.8rem 0; color:var(--color-primary-dark);">2. Select Payment Method</h4>
        <div style="display:flex; flex-direction:column; gap:0.6rem; margin-bottom:1.5rem;">
          <label style="display:flex; align-items:center; gap:0.6rem; padding:0.75rem; border:1px solid #cbd5e1; border-radius:var(--radius-sm); cursor:pointer;">
            <input type="radio" name="paymentMethod" value="Cash On Delivery (Pakistan)" checked>
            <span><strong>Cash on Delivery (COD)</strong> - Available for all cities in Pakistan</span>
          </label>
          <label style="display:flex; align-items:center; gap:0.6rem; padding:0.75rem; border:1px solid #cbd5e1; border-radius:var(--radius-sm); cursor:pointer;">
            <input type="radio" name="paymentMethod" value="JazzCash / EasyPaisa / Bank Transfer">
            <span><strong>JazzCash / EasyPaisa / Local Bank Transfer</strong> (Pakistan)</span>
          </label>
          <label style="display:flex; align-items:center; gap:0.6rem; padding:0.75rem; border:1px solid #cbd5e1; border-radius:var(--radius-sm); cursor:pointer;">
            <input type="radio" name="paymentMethod" value="International Card (Visa / Mastercard)">
            <span><strong>Visa / MasterCard / Stripe Gateway</strong> (International Deliveries)</span>
          </label>
        </div>

        <div style="background:#f8fafc; padding:1.2rem; border-radius:var(--radius-md); margin-bottom:1.5rem;">
          <div style="display:flex; justify-content:space-between; margin-bottom:0.4rem; font-size:0.92rem;">
            <span>Subtotal:</span>
            <span>${formatPrice(totalUSD)}</span>
          </div>
          <div style="display:flex; justify-content:space-between; margin-bottom:0.4rem; font-size:0.92rem;">
            <span>Standard Courier Delivery:</span>
            <span>Free / Standard</span>
          </div>
          <div style="display:flex; justify-content:space-between; font-weight:800; font-size:1.15rem; color:var(--color-primary-dark); border-top:1px solid #e2e8f0; padding-top:0.6rem;">
            <span>Total Payable:</span>
            <span>${formatPrice(totalUSD)}</span>
          </div>
        </div>

        <div style="display:flex; justify-content:flex-end; gap:1rem;">
          <button type="button" class="btn btn-outline-gold" onclick="closeModal()">Cancel</button>
          <button type="submit" class="btn btn-gold">Confirm Order Now</button>
        </div>
      </form>
    </div>
  `;
  showModal(checkoutHtml);
};

window.handlePlaceOrder = function(event, totalUSD) {
  event.preventDefault();

  const order = {
    id: 'ORD-' + Math.floor(1000 + Math.random() * 9000),
    customer: document.getElementById('orderName').value,
    phone: document.getElementById('orderPhone').value,
    address: document.getElementById('orderAddress').value,
    payment: document.querySelector('input[name="paymentMethod"]:checked').value,
    items: APP_STATE.cart.map(i => `${i.title} (x${i.qty})`).join(', '),
    total: formatPrice(totalUSD),
    status: 'Processing',
    date: new Date().toISOString().split('T')[0]
  };

  APP_STATE.orders.unshift(order);
  localStorage.setItem('khoula_orders', JSON.stringify(APP_STATE.orders));

  // Automatically sync to Google Firebase Cloud Firestore
  if (typeof window.saveOrderToFirebase === 'function') {
    window.saveOrderToFirebase(order);
  }

  // Clear cart
  APP_STATE.cart = [];
  saveCart();
  renderCartUI();

  const successHtml = `
    <div class="modal-header">
      <h3 class="modal-title"><i class="fas fa-check-circle" style="color:var(--color-gold);"></i> Order Successfully Placed!</h3>
      <button class="modal-close-btn" onclick="closeModal()">&times;</button>
    </div>
    <div class="modal-body" style="text-align:center;">
      <div style="font-size:3rem; color:var(--color-success); margin-bottom:1rem;">
        <i class="fas fa-box-open"></i>
      </div>
      <h3 style="font-family:var(--font-heading); color:var(--color-primary-dark); margin-bottom:0.5rem;">
        Order #${order.id}
      </h3>
      <p style="color:var(--text-muted); font-size:0.95rem; margin-bottom:1.5rem;">
        Thank you, <strong>${order.customer}</strong>! We have received your order for:<br>
        <em>${order.items}</em>
      </p>
      <div style="background:var(--color-gold-pale); padding:1rem; border-radius:var(--radius-sm); border:1px solid var(--color-gold-border); margin-bottom:1.5rem; text-align:left; font-size:0.88rem;">
        <strong>Payment Method:</strong> ${order.payment}<br>
        <strong>Amount:</strong> ${order.total}<br>
        <strong>Shipping to:</strong> ${order.address}
      </div>
      <button class="btn btn-primary" onclick="closeModal()">Continue Shopping</button>
    </div>
  `;
  showModal(successHtml);
};

// ---------------------------------------------------------------------------
// 10. DYNAMIC ADMIN PANEL MANAGEMENT
// ---------------------------------------------------------------------------
function initAdminModal() {
  const adminTriggers = document.querySelectorAll('.admin-portal-trigger');
  adminTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      promptAdminAccess();
    });
  });
}

function promptAdminAccess() {
  const pin = prompt('Enter Khoula Islamic Institute Admin Passcode (Default: khoula2026):');
  if (pin === 'khoula2026') {
    openAdminDashboard();
  } else if (pin !== null) {
    alert('Incorrect Admin Passcode.');
  }
}

function openAdminDashboard() {
  const totalBookings = APP_STATE.trialBookings.length;
  const totalOrders = APP_STATE.orders.length;
  const totalCourses = APP_STATE.courses.length;

  const adminHtml = `
    <div class="modal-header">
      <h3 class="modal-title"><i class="fas fa-user-shield"></i> Khoula Institute - Admin Management Panel</h3>
      <button class="modal-close-btn" onclick="closeModal()">&times;</button>
    </div>
    <div class="modal-body">
      <!-- Admin Top Metrics -->
      <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:1rem; margin-bottom:2rem;">
        <div style="background:#f1f5f9; padding:1.2rem; border-radius:var(--radius-md); border-left:4px solid var(--color-primary);">
          <span style="font-size:0.8rem; color:#64748b; text-transform:uppercase; font-weight:700;">Trial Bookings</span>
          <div style="font-size:1.8rem; font-weight:800; color:var(--color-primary-dark);">${totalBookings}</div>
        </div>
        <div style="background:#f1f5f9; padding:1.2rem; border-radius:var(--radius-md); border-left:4px solid var(--color-gold);">
          <span style="font-size:0.8rem; color:#64748b; text-transform:uppercase; font-weight:700;">Store Orders</span>
          <div style="font-size:1.8rem; font-weight:800; color:var(--color-primary-dark);">${totalOrders}</div>
        </div>
        <div style="background:#f1f5f9; padding:1.2rem; border-radius:var(--radius-md); border-left:4px solid var(--color-success);">
          <span style="font-size:0.8rem; color:#64748b; text-transform:uppercase; font-weight:700;">Active Courses</span>
          <div style="font-size:1.8rem; font-weight:800; color:var(--color-primary-dark);">${totalCourses}</div>
        </div>
      </div>

      <!-- Admin Tabs Navigation -->
      <div style="display:flex; gap:0.5rem; border-bottom:2px solid #e2e8f0; margin-bottom:1.5rem; flex-wrap:wrap;">
        <button class="btn btn-sm btn-primary" id="adminTabBookings" onclick="switchAdminTab('bookings')">Student Bookings</button>
        <button class="btn btn-sm btn-outline-gold" id="adminTabOrders" onclick="switchAdminTab('orders')">Shop Orders</button>
        <button class="btn btn-sm btn-outline-gold" id="adminTabNewCourse" onclick="switchAdminTab('newCourse')">+ Add Course</button>
        <a href="student-portal.html" target="_blank" class="btn btn-sm btn-gold" style="margin-left:auto;">
          <i class="fas fa-graduation-cap"></i> Student Classroom
        </a>
        <a href="admin.html" target="_blank" class="btn btn-sm btn-outline-gold">
          <i class="fas fa-external-link-alt"></i> Fullscreen LMS
        </a>
      </div>

      <!-- Tab Content: Bookings -->
      <div id="adminContentBookings">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
          <h4 style="color:var(--color-primary-dark);">Recent Free Trial Applications</h4>
          <button class="btn btn-sm btn-outline-gold" onclick="exportData('bookings')">
            <i class="fas fa-download"></i> Export JSON
          </button>
        </div>
        <div style="max-height:280px; overflow-y:auto; border:1px solid #e2e8f0; border-radius:var(--radius-sm);">
          <table style="width:100%; border-collapse:collapse; font-size:0.85rem; text-align:left;">
            <thead>
              <tr style="background:#f8fafc; border-bottom:1px solid #e2e8f0; color:#475569;">
                <th style="padding:0.6rem 0.8rem;">ID</th>
                <th style="padding:0.6rem 0.8rem;">Student</th>
                <th style="padding:0.6rem 0.8rem;">Course</th>
                <th style="padding:0.6rem 0.8rem;">WhatsApp</th>
                <th style="padding:0.6rem 0.8rem;">Status</th>
                <th style="padding:0.6rem 0.8rem;">Action</th>
              </tr>
            </thead>
            <tbody>
              ${APP_STATE.trialBookings.map(b => `
                <tr style="border-bottom:1px solid #f1f5f9;">
                  <td style="padding:0.6rem 0.8rem; font-weight:700;">${b.id}</td>
                  <td style="padding:0.6rem 0.8rem;">${b.studentName}</td>
                  <td style="padding:0.6rem 0.8rem;">${b.course}</td>
                  <td style="padding:0.6rem 0.8rem;">${b.phone}</td>
                  <td style="padding:0.6rem 0.8rem;">
                    <span style="background:${b.status === 'New Booking' ? '#fee2e2' : '#dcfce7'}; color:${b.status === 'New Booking' ? '#991b1b' : '#166534'}; padding:0.15rem 0.4rem; border-radius:4px; font-weight:600; font-size:0.75rem;">
                      ${b.status}
                    </span>
                  </td>
                  <td style="padding:0.6rem 0.8rem;">
                    <button style="background:none; border:none; color:var(--color-primary); cursor:pointer; font-weight:600;" onclick="toggleBookingStatus('${b.id}')">
                      Update
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Tab Content: Orders -->
      <div id="adminContentOrders" style="display:none;">
        <h4 style="color:var(--color-primary-dark); margin-bottom:1rem;">Islamic Store Orders</h4>
        <div style="max-height:280px; overflow-y:auto; border:1px solid #e2e8f0; border-radius:var(--radius-sm);">
          <table style="width:100%; border-collapse:collapse; font-size:0.85rem; text-align:left;">
            <thead>
              <tr style="background:#f8fafc; border-bottom:1px solid #e2e8f0; color:#475569;">
                <th style="padding:0.6rem 0.8rem;">Order ID</th>
                <th style="padding:0.6rem 0.8rem;">Customer</th>
                <th style="padding:0.6rem 0.8rem;">Items</th>
                <th style="padding:0.6rem 0.8rem;">Total</th>
                <th style="padding:0.6rem 0.8rem;">Status</th>
              </tr>
            </thead>
            <tbody>
              ${APP_STATE.orders.map(o => `
                <tr style="border-bottom:1px solid #f1f5f9;">
                  <td style="padding:0.6rem 0.8rem; font-weight:700;">${o.id}</td>
                  <td style="padding:0.6rem 0.8rem;">${o.customer}</td>
                  <td style="padding:0.6rem 0.8rem;">${o.items}</td>
                  <td style="padding:0.6rem 0.8rem; font-weight:700;">${o.total}</td>
                  <td style="padding:0.6rem 0.8rem;">
                    <span style="background:#e0f2fe; color:#0369a1; padding:0.15rem 0.4rem; border-radius:4px; font-weight:600; font-size:0.75rem;">
                      ${o.status}
                    </span>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Tab Content: Add Course -->
      <div id="adminContentNewCourse" style="display:none;">
        <h4 style="color:var(--color-primary-dark); margin-bottom:1rem;">Add New Academic Course</h4>
        <form onsubmit="handleAddNewCourse(event)">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Course Title *</label>
              <input type="text" id="newCourseTitle" class="form-control" required placeholder="e.g. Advanced Tajweed Rules">
            </div>
            <div class="form-group">
              <label class="form-label">Category *</label>
              <select id="newCourseCategory" class="form-control">
                <option value="basics">Basics & Qaida</option>
                <option value="tajweed">Tajweed & Nazra</option>
                <option value="hifz">Hifz</option>
                <option value="advanced">Tafseer / Arabic</option>
                <option value="sisters">Sisters Special</option>
              </select>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Target Audience / Level</label>
              <input type="text" id="newCourseLevel" class="form-control" placeholder="e.g. Intermediate Students">
            </div>
            <div class="form-group">
              <label class="form-label">Badge Label</label>
              <input type="text" id="newCourseBadge" class="form-control" placeholder="e.g. New Specialization">
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Description *</label>
            <textarea id="newCourseDesc" class="form-control" rows="2" required placeholder="Detailed course description"></textarea>
          </div>
          <button type="submit" class="btn btn-gold">Publish Course to Website</button>
        </form>
      </div>
    </div>
  `;
  showModal(adminHtml, true);
}

window.switchAdminTab = function(tabName) {
  const tabB = document.getElementById('adminTabBookings');
  const tabO = document.getElementById('adminTabOrders');
  const tabN = document.getElementById('adminTabNewCourse');
  const cB = document.getElementById('adminContentBookings');
  const cO = document.getElementById('adminContentOrders');
  const cN = document.getElementById('adminContentNewCourse');

  tabB.className = tabName === 'bookings' ? 'btn btn-sm btn-primary' : 'btn btn-sm btn-outline-gold';
  tabO.className = tabName === 'orders' ? 'btn btn-sm btn-primary' : 'btn btn-sm btn-outline-gold';
  tabN.className = tabName === 'newCourse' ? 'btn btn-sm btn-primary' : 'btn btn-sm btn-outline-gold';

  cB.style.display = tabName === 'bookings' ? 'block' : 'none';
  cO.style.display = tabName === 'orders' ? 'block' : 'none';
  cN.style.display = tabName === 'newCourse' ? 'block' : 'none';
};

window.toggleBookingStatus = function(bookingId) {
  const b = APP_STATE.trialBookings.find(x => x.id === bookingId);
  if (!b) return;
  b.status = b.status === 'New Booking' ? 'Trial Scheduled' : 'Enrolled Student';
  localStorage.setItem('khoula_trial_bookings', JSON.stringify(APP_STATE.trialBookings));
  openAdminDashboard();
  showToast(`Updated status of #${bookingId} to ${b.status}`);
};

window.handleAddNewCourse = function(event) {
  event.preventDefault();
  const newC = {
    id: 'c' + (APP_STATE.courses.length + 1),
    title: document.getElementById('newCourseTitle').value,
    category: document.getElementById('newCourseCategory').value,
    level: document.getElementById('newCourseLevel').value || 'All Ages',
    badge: document.getElementById('newCourseBadge').value || 'Featured',
    duration: '30-45 Mins / Class',
    description: document.getElementById('newCourseDesc').value,
    topics: ['Interactive Live Module 1', 'Practical Tajweed Recitation', 'Assessment & Homework']
  };

  APP_STATE.courses.unshift(newC);
  localStorage.setItem('khoula_courses', JSON.stringify(APP_STATE.courses));
  renderCourses();
  showToast(`Successfully added new course: "${newC.title}"`);
  openAdminDashboard();
};

window.exportData = function(type) {
  const data = type === 'bookings' ? APP_STATE.trialBookings : APP_STATE.orders;
  const jsonStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
  const dlAnchor = document.createElement('a');
  dlAnchor.setAttribute("href", jsonStr);
  dlAnchor.setAttribute("download", `khoula_${type}_export.json`);
  document.body.appendChild(dlAnchor);
  dlAnchor.click();
  dlAnchor.remove();
};

// ---------------------------------------------------------------------------
// 11. FLOATING WHATSAPP MULTI-DESK WIDGET
// ---------------------------------------------------------------------------
function initWhatsAppWidget() {
  const widgetBtn = document.getElementById('floatingWhatsAppBtn');
  if (!widgetBtn) return;

  widgetBtn.addEventListener('click', () => {
    const waMenu = `
      <div class="modal-header" style="background:#075e54;">
        <h3 class="modal-title"><i class="fab fa-whatsapp"></i> Chat with Khoula Institute</h3>
        <button class="modal-close-btn" onclick="closeModal()">&times;</button>
      </div>
      <div class="modal-body">
        <p style="font-size:0.92rem; color:var(--text-muted); margin-bottom:1.2rem;">
          Our coordinators are available 24/7 to assist with trial bookings, fee queries, and course guidance. Choose your department:
        </p>

        <div style="display:flex; flex-direction:column; gap:0.85rem;">
          <a href="https://wa.me/923001234567?text=Assalamu%20Alaikum!%20I%20want%20to%20inquire%20about%20Admissions%20and%203-Day%20Free%20Trial." target="_blank" 
             style="display:flex; align-items:center; gap:1rem; padding:1rem; border:1px solid #dcfce7; background:#f0fdf4; border-radius:var(--radius-md); text-decoration:none; color:inherit;">
            <div style="width:40px; height:40px; background:#25d366; color:#fff; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:1.2rem;">
              <i class="fas fa-graduation-cap"></i>
            </div>
            <div>
              <strong style="color:#166534; font-size:1rem; display:block;">Admissions & Free Trial Desk</strong>
              <span style="font-size:0.8rem; color:#4b5563;">Schedule trials, course counseling & schedules</span>
            </div>
          </a>

          <a href="https://wa.me/923001234567?text=Assalamu%20Alaikum!%20I%20would%20like%20to%20connect%20with%20the%20Female%20Faculty%20/%20Sisters%20Department." target="_blank"
             style="display:flex; align-items:center; gap:1rem; padding:1rem; border:1px solid #fef3c7; background:#fffbeb; border-radius:var(--radius-md); text-decoration:none; color:inherit;">
            <div style="width:40px; height:40px; background:var(--color-gold); color:#fff; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:1.2rem;">
              <i class="fas fa-female"></i>
            </div>
            <div>
              <strong style="color:#92400e; font-size:1rem; display:block;">Dedicated Sisters & Daughters Desk</strong>
              <span style="font-size:0.8rem; color:#4b5563;">Private 1-on-1 female Qariah consultations</span>
            </div>
          </a>

          <a href="https://wa.me/923001234567?text=Assalamu%20Alaikum!%20I%20have%20an%20order%20inquiry%20regarding%20the%20Islamic%20Store." target="_blank"
             style="display:flex; align-items:center; gap:1rem; padding:1rem; border:1px solid #e0f2fe; background:#f0f9ff; border-radius:var(--radius-md); text-decoration:none; color:inherit;">
            <div style="width:40px; height:40px; background:#0284c7; color:#fff; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:1.2rem;">
              <i class="fas fa-shopping-bag"></i>
            </div>
            <div>
              <strong style="color:#0369a1; font-size:1rem; display:block;">Islamic Store Support & Orders</strong>
              <span style="font-size:0.8rem; color:#4b5563;">Delivery status, Quran copies & prayer mats</span>
            </div>
          </a>
        </div>
      </div>
    `;
    showModal(waMenu);
  });
}

// ---------------------------------------------------------------------------
// 12. GENERAL MODAL & TOAST MANAGERS
// ---------------------------------------------------------------------------
window.showModal = function(contentHtml, isLarge = false) {
  const container = document.getElementById('mainModalContent');
  const overlay = document.getElementById('mainModalOverlay');
  const modalBox = document.getElementById('mainModalBox');

  if (container && overlay && modalBox) {
    container.innerHTML = contentHtml;
    modalBox.className = isLarge ? 'modal-container modal-lg' : 'modal-container';
    overlay.classList.add('open');
  }
};

window.closeModal = function() {
  const overlay = document.getElementById('mainModalOverlay');
  if (overlay) overlay.classList.remove('open');
};

// Close modal on click outside
document.addEventListener('click', (e) => {
  const overlay = document.getElementById('mainModalOverlay');
  if (overlay && e.target === overlay) {
    closeModal();
  }
});

window.showToast = function(message, type = 'info') {
  let toastContainer = document.getElementById('toastContainer');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toastContainer';
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <i class="fas ${type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}" style="color:var(--color-gold);"></i>
    <span>${message}</span>
  `;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
};

// ===========================================================================
// 14. HERO CAROUSEL CONTROLLER (Interactive 3-Slide Hero Slider)
// ===========================================================================
function initHeroCarousel() {
  const track = document.getElementById('carouselTrack');
  const slides = document.querySelectorAll('.carousel-slide');
  const prevBtn = document.getElementById('carouselArrowPrev');
  const nextBtn = document.getElementById('carouselArrowNext');
  const dots = document.querySelectorAll('.carousel-dot');
  const progressBar = document.getElementById('carouselProgressBar');
  const viewport = document.getElementById('carouselViewport');

  if (!track || slides.length === 0) return;

  let currentIndex = 0;
  const totalSlides = slides.length;
  const slideDuration = 5500; // 5.5 seconds per slide
  let autoPlayTimer = null;
  let progressStartTime = null;
  let progressAnimFrame = null;
  let isHovered = false;

  function updateSlide(index, animate = true) {
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;
    currentIndex = index;

    // Smooth transform sliding
    track.style.transition = animate ? 'transform 0.65s cubic-bezier(0.25, 1, 0.5, 1)' : 'none';
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    // Update active class on slides for accessibility and animation triggers
    slides.forEach((slide, idx) => {
      slide.classList.toggle('active', idx === currentIndex);
    });

    // Update dots
    dots.forEach((dot, idx) => {
      const isActive = idx === currentIndex;
      dot.classList.toggle('active', isActive);
      dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    // Reset progress bar animation
    resetProgressBar();
  }

  function nextSlide() {
    updateSlide(currentIndex + 1);
  }

  function prevSlide() {
    updateSlide(currentIndex - 1);
  }

  // Progress Bar Animation
  function resetProgressBar() {
    if (!progressBar) return;
    if (progressAnimFrame) cancelAnimationFrame(progressAnimFrame);
    progressBar.style.width = '0%';
    progressStartTime = performance.now();

    function stepProgress(now) {
      if (isHovered) {
        // Paused on hover: keep progress static
        progressStartTime = now - (parseFloat(progressBar.style.width || 0) / 100 * slideDuration);
        progressAnimFrame = requestAnimationFrame(stepProgress);
        return;
      }
      const elapsed = now - progressStartTime;
      const pct = Math.min((elapsed / slideDuration) * 100, 100);
      progressBar.style.width = pct + '%';
      if (pct < 100) {
        progressAnimFrame = requestAnimationFrame(stepProgress);
      }
    }
    progressAnimFrame = requestAnimationFrame(stepProgress);
  }

  // Auto-play disabled — manual navigation only (arrows, dots, swipe, keyboard)
  function startAutoplay() {
    // Auto-play intentionally disabled; manual controls only
  }

  function stopAutoplay() {
    if (autoPlayTimer) clearInterval(autoPlayTimer);
    if (progressAnimFrame) cancelAnimationFrame(progressAnimFrame);
  }

  // Arrow Clicks
  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      prevSlide();
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      nextSlide();
    });
  }

  // Dot Clicks
  dots.forEach((dot, idx) => {
    dot.addEventListener('click', (e) => {
      e.preventDefault();
      updateSlide(idx);
    });
  });

  // Pause on hover
  const carouselSection = document.querySelector('.hero-carousel-section');
  if (carouselSection) {
    carouselSection.addEventListener('mouseenter', () => {
      isHovered = true;
    });
    carouselSection.addEventListener('mouseleave', () => {
      isHovered = false;
    });
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (document.activeElement && ['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) {
      return;
    }
    const rect = track.getBoundingClientRect();
    if (rect.bottom > 0 && rect.top < window.innerHeight) {
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    }
  });

  // Touch & Swipe Support for Mobile Screens
  let touchStartX = 0;
  let touchStartY = 0;
  let touchEndX = 0;
  let touchEndY = 0;
  let isSwiping = false;

  if (viewport) {
    viewport.addEventListener('touchstart', (e) => {
      isHovered = true;
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      isSwiping = true;
    }, { passive: true });

    viewport.addEventListener('touchmove', (e) => {
      if (!isSwiping) return;
      touchEndX = e.touches[0].clientX;
      touchEndY = e.touches[0].clientY;
    }, { passive: true });

    viewport.addEventListener('touchend', () => {
      isHovered = false;
      if (!isSwiping) return;
      isSwiping = false;

      const diffX = touchStartX - touchEndX;
      const diffY = touchStartY - touchEndY;

      // Ensure horizontal swipe is dominant over vertical scroll
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
        if (diffX > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
    });
  }

  // "Join Now" Click Handling: Pre-select course in trial form and scroll smoothly
  document.querySelectorAll('.carousel-join-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const courseName = btn.getAttribute('data-course');
      const courseSelect = document.getElementById('trialCourseSelect');
      if (courseSelect && courseName) {
        // Select matching option
        for (let i = 0; i < courseSelect.options.length; i++) {
          if (courseSelect.options[i].value === courseName) {
            courseSelect.selectedIndex = i;
            break;
          }
        }
      }

      const trialCard = document.getElementById('trialFormCard') || document.getElementById('free-trial');
      if (trialCard) {
        trialCard.classList.remove('pulse-highlight');
        void trialCard.offsetWidth; // trigger reflow
        trialCard.classList.add('pulse-highlight');
      }

      if (window.showToast) {
        window.showToast(`Selected "${courseName}". Fill in details to book free trial!`, 'info');
      }
    });
  });

  // Initial setup — show first slide, no auto-play
  updateSlide(0, false);
}

// Lightbox Modal for Full Poster Preview
window.openPosterModal = function(imageSrc, title) {
  const modalContent = `
    <div style="text-align:center; padding: 0.5rem 0;">
      <h3 style="font-family:var(--font-heading); color:var(--color-primary-dark); font-size:1.35rem; margin-bottom:1rem; font-weight:700;">${title}</h3>
      <div style="border-radius: 14px; overflow: hidden; border: 2px solid var(--color-gold); box-shadow: 0 15px 35px rgba(0,0,0,0.25); display:inline-block; max-width:100%; background:#05211c;">
        <img src="${imageSrc}" alt="${title}" style="max-width:100%; max-height:70vh; height:auto; display:block; border-radius:12px; margin:0 auto;">
      </div>
      <div style="margin-top:1.25rem; display:flex; justify-content:center; gap:0.85rem; flex-wrap:wrap;">
        <a href="#free-trial" onclick="closeModal();" class="btn btn-gold">
          <i class="fas fa-check-circle"></i> Book 3-Day Free Trial
        </a>
        <a href="https://wa.me/923001234567?text=Assalam-o-Alaikum!%20I%20am%20interested%20in%20${encodeURIComponent(title)}" target="_blank" class="btn btn-outline" style="border-color:var(--color-primary); color:var(--color-primary);">
          <i class="fab fa-whatsapp" style="color:#25d366;"></i> Chat on WhatsApp
        </a>
      </div>
    </div>
  `;
  window.showModal(modalContent, true);
};

// ---------------------------------------------------------------------------
// 12. TESTIMONIALS CAROUSEL & VIDEO STORY LOGIC
// ---------------------------------------------------------------------------
let currentTestiIndex = 0;
let testiAutoplayTimer = null;

function initTestimonialsCarousel() {
  const slides = document.querySelectorAll('.testi-slide');
  if (!slides || slides.length === 0) return;

  const box = document.getElementById('testiCarouselBox');
  if (box) {
    box.addEventListener('mouseenter', () => clearInterval(testiAutoplayTimer));
    box.addEventListener('mouseleave', () => startTestiAutoplay());
  }

  setTestiSlide(0);
  startTestiAutoplay();
}

function startTestiAutoplay() {
  clearInterval(testiAutoplayTimer);
  testiAutoplayTimer = setInterval(() => {
    nextTestiSlide();
  }, 6000);
}

window.setTestiSlide = function(index) {
  const slides = document.querySelectorAll('.testi-slide');
  const dots = document.querySelectorAll('.testi-dot');
  if (slides.length === 0) return;

  if (index >= slides.length) index = 0;
  if (index < 0) index = slides.length - 1;
  currentTestiIndex = index;

  slides.forEach((slide, idx) => {
    slide.classList.toggle('active', idx === currentTestiIndex);
  });

  dots.forEach((dot, idx) => {
    dot.classList.toggle('active', idx === currentTestiIndex);
  });
};

window.nextTestiSlide = function() {
  setTestiSlide(currentTestiIndex + 1);
};

window.prevTestiSlide = function() {
  setTestiSlide(currentTestiIndex - 1);
};

// Video Testimonial Spotlight Modal
window.openVideoTestimonialModal = function() {
  const modalContent = `
    <div style="text-align: left; padding: 0.5rem 0;">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem; border-bottom: 1px solid var(--border-light); padding-bottom: 0.85rem;">
        <div>
          <span class="badge-gold" style="font-size: 0.78rem;"><i class="fas fa-video"></i> Verified Student Recitation</span>
          <h3 style="font-family: var(--font-heading); color: var(--color-primary-dark); font-size: 1.4rem; font-weight: 800; margin-top: 0.35rem;">
            Ayaan's Quran Journey (Surah Al-Mulk)
          </h3>
        </div>
        <button class="modal-close-btn" onclick="closeModal()">&times;</button>
      </div>

      <div style="background: #042416; border-radius: 12px; overflow: hidden; position: relative; margin-bottom: 1.5rem; border: 2px solid var(--color-gold);">
        <div style="position: relative; aspect-ratio: 16/9; background: url('https://images.unsplash.com/photo-1584281729288-89826acac94f?auto=format&fit=crop&w=800&q=80') center/cover;">
          <div style="position: absolute; inset: 0; background: rgba(4, 36, 22, 0.65); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1rem; color: #fff; text-align: center; padding: 1.5rem;">
            <button onclick="playTeacherAudio('ayaan-demo', 'https://everyayah.com/data/Alafasy_128kbps/067001.mp3')" class="play-pulse-btn" style="cursor: pointer; border: none;" title="Listen to Recitation">
              <i class="fas fa-play" id="icon-ayaan-demo" style="margin-left: 4px;"></i>
            </button>
            <div style="font-size: 1.15rem; font-family: var(--font-arabic); color: var(--color-gold-light);">
              تَبَٰرَكَ ٱلَّذِى بِيَدِهِ ٱلْمُلْكُ وَهُوَ عَلَىٰ كُلِّ شَىْءٍۢ قَدِيرٌ
            </div>
            <p style="font-size: 0.88rem; color: #d1deda; max-width: 420px;">
              Click play to listen to 8-year-old student recitation recording guided by Ustadha Fatima.
            </p>
          </div>
        </div>
      </div>

      <div style="background: var(--color-gold-pale); border-radius: 10px; padding: 1.15rem 1.35rem; border: 1px solid var(--color-gold-border); margin-bottom: 1.5rem;">
        <strong style="color: #8b6814; display: block; font-size: 0.95rem; margin-bottom: 0.35rem;">
          <i class="fas fa-comment-dots"></i> Note from Ayaan's Mother (London, UK):
        </strong>
        <p style="font-size: 0.9rem; color: #2C2C2C; line-height: 1.6; margin: 0;">
          "Ayaan started with zero Arabic knowledge 3 months ago. The patience, 1-on-1 pacing, and Tajweed corrections transformed his pronunciation completely. Now he recites Surah Al-Mulk every night before sleeping!"
        </p>
      </div>

      <div style="display: flex; gap: 0.85rem; justify-content: flex-end; flex-wrap: wrap;">
        <button onclick="closeModal()" class="btn btn-outline" style="border-color: var(--border-light); color: var(--text-main);">
          Close Preview
        </button>
        <a href="#free-trial" onclick="closeModal();" class="btn btn-gold">
          <i class="fas fa-calendar-check"></i> Book Your Child's Free Trial
        </a>
      </div>
    </div>
  `;
  window.showModal(modalContent, true);
};

// Quick Trial Booking from Pre-Footer Dark Banner
window.handleQuickBannerTrial = function(e) {
  e.preventDefault();
  const nameInput = document.getElementById('quickBannerName');
  const phoneInput = document.getElementById('quickBannerPhone');
  const courseInput = document.getElementById('quickBannerCourse');

  const name = nameInput ? nameInput.value : '';
  const phone = phoneInput ? phoneInput.value : '';
  const course = courseInput ? courseInput.value : 'Quran Reading & Nazra with Tajweed';

  const studentNameField = document.getElementById('studentName');
  const studentPhoneField = document.getElementById('studentPhone');
  const trialCourseSelect = document.getElementById('trialCourseSelect');

  if (studentNameField) studentNameField.value = name;
  if (studentPhoneField) studentPhoneField.value = phone;
  if (trialCourseSelect) {
    for (let i = 0; i < trialCourseSelect.options.length; i++) {
      if (trialCourseSelect.options[i].value === course || trialCourseSelect.options[i].value.includes('Tajweed')) {
        trialCourseSelect.selectedIndex = i;
        break;
      }
    }
  }

  const trialSection = document.getElementById('free-trial');
  if (trialSection) {
    trialSection.scrollIntoView({ behavior: 'smooth' });
    showToast(`Assalam-o-Alaikum ${name}! Please confirm your time slot to book your free trial.`);
  }
};

// Dismiss Sticky Bottom Bar
window.dismissStickyBar = function() {
  const bar = document.getElementById('stickyBottomBar');
  if (bar) {
    bar.classList.add('hidden');
  }
};

