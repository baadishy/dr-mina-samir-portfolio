// Global administrative variables
let auth = null;
let provider = null;
let signInWithPopup = null;
let signOut = null;
let GoogleAuthProvider = null;
let adminAuthDetails = null;
let adminAppointments = [];
let allClinics = [];
let allServices = [];
let currentLang = localStorage.getItem('admin_lang') || 'en';
let toastTimeout = null;

// Admin Portal translations
const translations = {
    en: {
        nav_brand: "Dr. Mina Samir",
        nav_back: "Back to Site",
        nav_logout: "Logout",
        login_title: "Physician Access Portal",
        login_desc: "Please supply authorization credentials to enter the administrative clinic metrics and schedule sync module.",
        label_user: "Username",
        label_pass: "Password",
        btn_login: "Authenticate",
        dashboard_title: "Dr. Mina Samir - Clinic Management",
        dashboard_subtitle: "Secure dashboard for managing clinic appointments and Google Calendar synchronization.",
        status_secure: "Session Secured",
        loading_text: "Loading secure scheduler info...",
        gcal_badge: "Google Calendar Link",
        gcal_desc_unconnected: "Authorize GCal connection to post clinical slots directly to Google Agenda.",
        btn_login_gcal: "Link Google Account",
        gcal_connected_doc: "Doctor Connected",
        gcal_disconnect: "Disconnect Google Account",
        dest_badge: "Calendar Sync Hub",
        dest_primary: "Primary Calendar (Main)",
        dest_custom: "Dedicated Clinic Calendar",
        sync_status: "Synchronizing Real-Time",
        bulk_badge: "Registry Actions",
        pending_syncs: "unsynced appointments",
        bulk_desc: "Updates clinical dates instantly.",
        btn_sync_all: "Sync Pending",
        bookings_title: "Clinic Booking Log",
        search_placeholder: "Search patient name or phone...",
        filter_all: "All Clinics",
        filter_minya: "Minya Clinic",
        filter_bani: "Bani Ahmed Clinic",
        filter_unsynced: "Unsynced only",
        th_patient: "Patient",
        th_clinic: "Clinic & Service",
        th_datetime: "Date & Time",
        th_status: "Calendar Status",
        th_actions: "Actions",
        empty_title: "No bookings matched filters",
        empty_desc: "Refine search criteria or clinic selections to locate details.",
        session_expired: "Session expired, please login again.",
        invalid_login: "Invalid username or password.",
        login_success: "Successfully authenticated!",
        sync_success: "Appointment synchronized successfully!",
        sync_all_success: "All pending appointments synchronized!",
        delete_success: "Appointment record removed.",
        delete_confirm: "Are you sure you want to delete this appointment?",
        gcal_ready: "Connected & Synced",
        gcal_expired: "Session Expired (Click Google Account to update)",
        unsynced: "Not Synced",
        synced: "Synced",
        reauth_needed: "Access expired. Please reconnect your Google clinical profile.",
        th_dob: "Birth",
        th_phone: "Phone",
        action_delete: "Delete Record"
    },
    ar: {
        nav_brand: "د. مينا سمير",
        nav_back: "العودة للموقع",
        nav_logout: "تسجيل الخروج",
        login_title: "بوابة دخول الطبيب",
        login_desc: "يرجى إدخال بيانات الاعتماد للدخول إلى إدارة الحجوزات ومزامنة تقويم Google.",
        label_user: "اسم المستخدم",
        label_pass: "كلمة المرور",
        btn_login: "دخول آمن",
        dashboard_title: "د. مينا سمير - إدارة العيادة",
        dashboard_subtitle: "لوحة تحكم آمنة لإدارة حجوزات العيادة ومزامنة تقويم Google تلقائياً.",
        status_secure: "اتصال آمن ومحمي",
        loading_text: "جاري تحميل بيانات الجدول الآمن...",
        gcal_badge: "ربط تقويم Google",
        gcal_desc_unconnected: "قم بتفويض الاتصال لنشر المواعيد مباشرة على تقويم Google الخاص بك.",
        btn_login_gcal: "ربط حساب Google",
        gcal_connected_doc: "تم ربط الطبيب",
        gcal_disconnect: "إلغاء ربط تقويم Google",
        dest_badge: "مركز مزامنة التقويم",
        dest_primary: "التقويم الرئيسي (العام)",
        dest_custom: "تقويم العيادة مخصص (خاص)",
        sync_status: "مزامنة نشطة وتلقائية",
        bulk_badge: "الإجراءات الجماعية",
        pending_syncs: "حجوزات غير متزامنة",
        bulk_desc: "مزامنة جميع الحجوزات بضغطة واحدة.",
        btn_sync_all: "مزامنة المعلق",
        bookings_title: "سجل حجوزات العيادة",
        search_placeholder: "ابحث باسم المريض أو هاتف...",
        filter_all: "جميع العيادات",
        filter_minya: "عيادة المنيا",
        filter_bani: "عيادة بني أحمد",
        filter_unsynced: "غير المتزامن فقط",
        th_patient: "المريض",
        th_clinic: "العيادة والخدمة",
        th_datetime: "التاريخ والوقت",
        th_status: "حالة التقويم",
        th_actions: "إجراءات",
        empty_title: "لا توجد حجوزات تطابق البحث",
        empty_desc: "يرجى تعديل معايير البحث أو اختيار عيادة أخرى للعثور على النتائج.",
        session_expired: "انتهت الجلسة، يرجى تسجيل الدخول مرة أخرى.",
        invalid_login: "خطأ في اسم المستخدم أو كلمة المرور.",
        login_success: "تم تسجيل الدخول بنجاح!",
        sync_success: "تمت مزامنة الموعد بنجاح!",
        sync_all_success: "تمت مزامنة جميع الحجوزات المعلقة!",
        delete_success: "تم حذف سجل الحجز بنجاح.",
        delete_confirm: "هل أنت متأكد من رغبتك في حذف هذا الحجز؟",
        gcal_ready: "متصل ومتزامن تلقائياً",
        gcal_expired: "انتهت جلسة المزامنة (اضغط على حساب Google للتحديث)",
        unsynced: "غير متزامن",
        synced: "متزامن",
        reauth_needed: "انتهت صلاحية الوصول. يرجى إعادة توصيل حساب Google.",
        th_dob: "الميلاد",
        th_phone: "الهاتف",
        action_delete: "حذف السجل"
    }
};

// Initialize Admin Portal Language
function updateUIStrings() {
    const t = translations[currentLang];
    
    // Header/Brand labels
    document.getElementById('nav-brand-text').textContent = t.nav_brand;
    document.getElementById('nav-back-home').lastElementChild ? document.getElementById('nav-back-home').lastElementChild.textContent = t.nav_back : document.getElementById('nav-back-home').textContent = t.nav_back;
    document.getElementById('nav-logout-label').textContent = t.nav_logout;

    // Login screen texts
    document.getElementById('login-title').textContent = t.login_title;
    document.getElementById('login-desc').textContent = t.login_desc;
    document.getElementById('label-user').textContent = t.label_user;
    document.getElementById('label-pass').textContent = t.label_pass;
    document.getElementById('login-btn-text').textContent = t.btn_login;

    // Dashboard core texts
    document.getElementById('dashboard-title').textContent = t.dashboard_title;
    document.getElementById('dashboard-subtitle').textContent = t.dashboard_subtitle;
    document.getElementById('status-secure').textContent = t.status_secure;
    document.getElementById('loading-text').textContent = t.loading_text;

    // Card details
    document.getElementById('gcal-badge-auth').textContent = t.gcal_badge;
    document.getElementById('gcal-desc-unconnected').textContent = t.gcal_desc_unconnected;
    document.getElementById('btn-login-gcal').textContent = t.btn_login_gcal;
    if (document.getElementById('gcal-disconnect-link')) {
        document.getElementById('gcal-disconnect-link').textContent = t.gcal_disconnect;
    }

    document.getElementById('destination-gcal-badge').textContent = t.dest_badge;
    document.getElementById('dest-primary').textContent = t.dest_primary;
    document.getElementById('dest-custom').textContent = t.dest_custom;

    document.getElementById('bulk-actions-badge').textContent = t.bulk_badge;
    document.getElementById('bulk-action-detail-text').textContent = t.bulk_desc;
    document.getElementById('bulk-sync-btn-label').textContent = t.btn_sync_all;

    // Filter controls
    document.getElementById('bookings-log-title').textContent = t.bookings_title;
    document.getElementById('adminSearchInput').placeholder = t.search_placeholder;
    document.getElementById('filter-all-clinics').textContent = t.filter_all;
    document.getElementById('filter-minya-clinic').textContent = t.filter_minya;
    document.getElementById('filter-bani-ahmed-clinic').textContent = t.filter_bani;
    document.getElementById('filter-unsynced-only').textContent = t.filter_unsynced;

    // Table labels
    document.getElementById('th-patient-label').textContent = t.th_patient;
    document.getElementById('th-clinic-label').textContent = t.th_clinic;
    document.getElementById('th-datetime-label').textContent = t.th_datetime;
    document.getElementById('th-calendar-status-label').textContent = t.th_status;
    document.getElementById('th-actions-label').textContent = t.th_actions;

    // Empty state labels
    document.getElementById('empty-title').textContent = t.empty_title;
    document.getElementById('empty-desc').textContent = t.empty_desc;

    // Document styling based on direction
    if (currentLang === 'ar') {
        document.body.classList.add('rtl');
        document.body.style.direction = 'rtl';
        document.getElementById('lang-toggle-text').textContent = 'English';
    } else {
        document.body.classList.remove('rtl');
        document.body.style.direction = 'ltr';
        document.getElementById('lang-toggle-text').textContent = 'العربية';
    }
}

window.toggleAdminLanguage = function() {
    currentLang = currentLang === 'en' ? 'ar' : 'en';
    localStorage.setItem('admin_lang', currentLang);
    updateUIStrings();
    if (adminAppointments.length > 0) {
        renderAdminAppointments();
    }
};

// Hides Toast immediately
window.hideToastNow = function() {
    const toast = document.getElementById('toastNotification');
    if (!toast) return;
    toast.classList.remove('translate-y-0', 'opacity-100', 'pointer-events-auto');
    toast.classList.add('translate-y-24', 'opacity-0', 'pointer-events-none');
    if (toastTimeout) {
        clearTimeout(toastTimeout);
        toastTimeout = null;
    }
};

// Toast notification helper
function showToast(message, type = 'success') {
    const toast = document.getElementById('toastNotification');
    const icon = document.getElementById('toastIcon');
    const text = document.getElementById('toastText');
    if (!toast || !icon || !text) return;

    if (toastTimeout) {
        clearTimeout(toastTimeout);
        toastTimeout = null;
    }

    text.textContent = message;

    // Reset styles
    icon.className = 'w-9 h-9 rounded-xl flex items-center justify-center text-lg shrink-0';
    toast.classList.remove('border-green-500', 'border-red-500', 'border-sky-500');

    // Icon & Color styling
    if (type === 'success') {
        icon.innerHTML = '<i class="fas fa-check-circle"></i>';
        icon.classList.add('bg-green-500/10', 'text-green-600');
        toast.classList.add('border-green-500');
    } else if (type === 'error') {
        icon.innerHTML = '<i class="fas fa-exclamation-circle"></i>';
        icon.classList.add('bg-red-500/10', 'text-red-600');
        toast.classList.add('border-red-500');
    } else {
        icon.innerHTML = '<i class="fas fa-info-circle"></i>';
        icon.classList.add('bg-sky-500/10', 'text-sky-600');
        toast.classList.add('border-sky-500');
    }

    // Toggle styling visibility
    toast.classList.remove('translate-y-24', 'opacity-0', 'pointer-events-none');
    toast.classList.add('translate-y-0', 'opacity-100', 'pointer-events-auto');

    toastTimeout = setTimeout(() => {
        window.hideToastNow();
    }, 4500);
}

// Secure Fetch with Authorization Headers
async function secureFetch(url, options = {}) {
    const token = localStorage.getItem('dr_mina_admin_token');
    if (!options.headers) {
        options.headers = {};
    }
    if (token) {
        options.headers['Authorization'] = `Bearer ${token}`;
    }
    const res = await fetch(url, options);
    
    // Handle auth failure redirection
    if (res.status === 401) {
        localStorage.removeItem('dr_mina_admin_token');
        showToast(translations[currentLang].session_expired, 'error');
        checkAuthenticationState();
    }
    return res;
}

// Authenticate via clinic administrative password
window.handlePortalLogInSubmit = async function(e) {
    if (e) e.preventDefault();
    
    const usernameInput = document.getElementById('adminUsername');
    const passwordInput = document.getElementById('adminPassword');
    const errorBox = document.getElementById('login-error-toast');
    const submitBtn = document.querySelector('#portalLoginForm button[type="submit"]');
    const btnText = document.getElementById('login-btn-text');
    
    if (!usernameInput || !passwordInput) return;

    const uVal = usernameInput.value.trim();
    const pVal = passwordInput.value.trim();
    let originalBtnHtml = '';
    if (submitBtn) {
        originalBtnHtml = submitBtn.innerHTML;
    }

    // Reset error visuals
    usernameInput.classList.remove('border-red-500', 'focus:ring-red-500');
    passwordInput.classList.remove('border-red-500', 'focus:ring-red-500');
    if (errorBox) errorBox.classList.add('hidden');

    // Loading State Visual feedback
    if (submitBtn && btnText) {
        submitBtn.disabled = true;
        btnText.textContent = currentLang === 'en' ? "Verifying..." : "جاري التحقق...";
        const iconEl = submitBtn.querySelector('i');
        if (iconEl) {
            iconEl.className = 'fas fa-spinner animate-spin';
        }
    }

    try {
        const res = await fetch('/api/admin/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: uVal, password: pVal })
        });

        if (res.ok) {
            const data = await res.json();
            localStorage.setItem('dr_mina_admin_token', data.token);
            
            // Designed Success Notification Popup
            showToast(translations[currentLang].login_success, 'success');
            
            // Clean up fields
            usernameInput.value = '';
            passwordInput.value = '';
            
            // Transition immediately to the secured section
            // Do NOT await background sub-calls so the credential validation is instant
            checkAuthenticationState().catch(err => console.error("Error booting admin state:", err));
        } else {
            // Shake container layout on failure
            const loginCard = document.querySelector('#portal-login-section > div');
            if (loginCard) {
                loginCard.classList.remove('animate-shake');
                void loginCard.offsetWidth; // Trigger reflow to restart animation
                loginCard.classList.add('animate-shake');
            }

            // Design-highlight inputs in red
            usernameInput.classList.add('border-red-500', 'focus:ring-red-500');
            passwordInput.classList.add('border-red-500', 'focus:ring-red-500');

            // Designed failure Toast popup
            showToast(translations[currentLang].invalid_login, 'error');
            
            if (errorBox) {
                errorBox.textContent = translations[currentLang].invalid_login;
                errorBox.classList.remove('hidden');
            }
        }
    } catch (err) {
        console.error("Login attempt network error:", err);
        showToast(translations[currentLang].invalid_login, 'error');
        if (errorBox) {
            errorBox.textContent = translations[currentLang].invalid_login;
            errorBox.classList.remove('hidden');
        }
    } finally {
        // Restore login button state
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnHtml;
        }
    }
};

window.handlePortalLogOut = function() {
    localStorage.removeItem('dr_mina_admin_token');
    checkAuthenticationState();
};

// Dynamic Boot and State Check
async function checkAuthenticationState() {
    const token = localStorage.getItem('dr_mina_admin_token');
    const loginSec = document.getElementById('portal-login-section');
    const dashSec = document.getElementById('portal-dashboard-section');
    const logoutBtn = document.getElementById('nav-logout-btn');

    if (!token) {
        if (loginSec) loginSec.classList.remove('hidden');
        if (dashSec) dashSec.classList.add('hidden');
        if (logoutBtn) logoutBtn.classList.add('hidden');
    } else {
        if (loginSec) loginSec.classList.add('hidden');
        if (dashSec) dashSec.classList.remove('hidden');
        if (logoutBtn) logoutBtn.classList.remove('hidden');
        
        // Populate system resources and load dashboard concurrently to login instantly
        Promise.all([
            initFirebase().catch(e => console.error("Firebase auth initialization failed:", e)),
            loadClinicsAndServices().catch(e => console.error("Loading clinics/services failed:", e)),
            loadAdminDashboard().catch(e => console.error("Loading admin dashboard failed:", e))
        ]);
    }
}

// Fetch Clinics & Services definitions
async function loadClinicsAndServices() {
    try {
        const [clinicsRes, servicesRes] = await Promise.all([
            fetch('/api/clinics'),
            fetch('/api/services')
        ]);
        if (clinicsRes.ok) allClinics = await clinicsRes.json();
        if (servicesRes.ok) allServices = await servicesRes.json();
    } catch (e) {
        console.error("Failed to fetch clinics or services metadata:", e);
    }
}

// ==================== Firebase & GCal Logic ====================

async function initFirebase() {
    if (auth && provider) return;
    try {
        const { initializeApp } = await import('https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js');
        const firebaseAuthModule = await import('https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js');
        
        const response = await fetch('/firebase-applet-config.json');
        const firebaseConfig = await response.json();
        const app = initializeApp(firebaseConfig);
        auth = firebaseAuthModule.getAuth(app);
        provider = new firebaseAuthModule.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/calendar');
        provider.addScope('https://www.googleapis.com/auth/calendar.events');
        
        signInWithPopup = firebaseAuthModule.signInWithPopup;
        signOut = firebaseAuthModule.signOut;
        GoogleAuthProvider = firebaseAuthModule.GoogleAuthProvider;
    } catch (e) {
        console.error("Firebase auth initialization failed", e);
    }
}

async function loadAdminDashboard() {
    const loadingEl = document.getElementById('admin-loading');
    const mainContainer = document.getElementById('admin-main-container');
    
    if (loadingEl) loadingEl.classList.remove('hidden');
    if (mainContainer) mainContainer.classList.add('hidden');
    
    try {
        // Retrieve backend administrative Google Auth status
        const authRes = await secureFetch('/api/admin/google-auth');
        if (!authRes.ok) throw new Error("Backend query rejected");
        
        const authData = await authRes.json();
        
        const unconnectedCard = document.getElementById('gcal-auth-unconnected');
        const connectedCard = document.getElementById('gcal-auth-connected');
        const calendarSelectEl = document.getElementById('adminCalendarSelect');
        const calendarStatusTextEl = document.getElementById('calendar-status-text');

        if (authData.connected) {
            adminAuthDetails = authData;
            
            if (unconnectedCard) unconnectedCard.classList.add('hidden');
            if (connectedCard) connectedCard.classList.remove('hidden');
            
            document.getElementById('admin-name').textContent = authData.name || "Doctor / Assistant";
            document.getElementById('admin-email').textContent = authData.email || "";
            
            if (calendarSelectEl) {
                calendarSelectEl.value = (authData.calendarId === 'primary') ? 'primary' : 'clinic';
            }
            if (calendarStatusTextEl) {
                if (authData.isExpired) {
                    calendarStatusTextEl.textContent = translations[currentLang].gcal_expired;
                    calendarStatusTextEl.classList.add('text-amber-500');
                    calendarStatusTextEl.classList.remove('text-green-600');
                } else {
                    calendarStatusTextEl.textContent = translations[currentLang].gcal_ready;
                    calendarStatusTextEl.classList.add('text-green-600');
                    calendarStatusTextEl.classList.remove('text-amber-500');
                }
            }
        } else {
            adminAuthDetails = null;
            if (unconnectedCard) unconnectedCard.classList.remove('hidden');
            if (connectedCard) connectedCard.classList.add('hidden');
        }

        // Retrieve appointments List
        await fetchAppointments();

        if (loadingEl) loadingEl.classList.add('hidden');
        if (mainContainer) mainContainer.classList.remove('hidden');

    } catch (err) {
        console.error("Dashboard fetching failure:", err);
        if (loadingEl) loadingEl.classList.add('hidden');
        if (mainContainer) mainContainer.classList.remove('hidden');
    }
}

window.handleAdminSignIn = async function() {
    if (!auth) await initFirebase();
    
    try {
        const result = await signInWithPopup(auth, provider);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (credential && credential.accessToken) {
            const token = credential.accessToken;
            const user = result.user;
            
            // Query google calendarList configuration
            const listRes = await fetch('https://www.googleapis.com/calendar/v3/users/me/calendarList', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const listData = await listRes.json();
            
            let clinicCalendar = listData.items?.find(c => c.summary === "Dr. Mina Samir Clinic");
            let calendarId = clinicCalendar ? clinicCalendar.id : null;
            
            if (!calendarId) {
                const createRes = await fetch('https://www.googleapis.com/calendar/v3/calendars', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        summary: "Dr. Mina Samir Clinic",
                        description: "Appointments booked via Dr. Mina Samir Pediatric website."
                    })
                });
                
                if (createRes.ok) {
                    const newCalendar = await createRes.json();
                    calendarId = newCalendar.id;
                    showToast(currentLang === 'en' ? "Created dedicated 'Dr. Mina Samir Clinic' Calendar!" : "تم إنشاء تقويم 'Dr. Mina Samir Clinic' مخصص!", 'success');
                } else {
                    calendarId = 'primary';
                }
            }
            
            // Post authorization keys safely to administrative DB
            await secureFetch('/api/admin/google-auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    accessToken: token,
                    email: user.email,
                    name: user.displayName || "Doctor",
                    calendarId: calendarId
                })
            });
            
            showToast(translations[currentLang].gcal_ready, 'success');
            await loadAdminDashboard();
        }
    } catch (err) {
        console.error("OAuth verification rejected:", err);
        let errMsg = translations[currentLang].reauth_needed;
        if (err && (err.code === 'auth/unauthorized-domain' || (err.message && err.message.includes('unauthorized-domain')))) {
            errMsg = currentLang === 'en' 
                ? "Unauthorized Domain: Please authorize this Vercel domain in your Firebase console ('Authentication -> Settings -> Authorized Domains')."
                : "النطاق غير مصرح به: يرجى إضافة رابط Vercel هذا في لوحة تحكم Firebase ضمن 'Authorized Domains'.";
        } else if (err && (err.code === 'auth/popup-blocked' || (err.message && err.message.includes('popup-blocked')))) {
            errMsg = currentLang === 'en'
                ? "Popup Blocked! Please enable popups in your browser settings to authorize Google Account."
                : "تم حظر النافذة المنبثقة! يرجى تمكين النوافذ المنبثقة في متصفحك لربط حساب Google.";
        }
        showToast(errMsg, 'error');
    }
};

window.handleAdminSignOut = async function() {
    try {
        await secureFetch('/api/admin/google-auth', { method: 'DELETE' });
        if (auth) {
            await signOut(auth);
        }
    } catch(e) {}
    adminAuthDetails = null;
    showToast(translations[currentLang].gcal_disconnect, 'info');
    await loadAdminDashboard();
};

window.updateCalendarDestination = async function(value) {
    if (!adminAuthDetails) return;
    
    const loadingEl = document.getElementById('admin-loading');
    if (loadingEl) loadingEl.classList.remove('hidden');
    
    try {
        let calendarId = 'primary';
        
        if (value === 'clinic') {
            const listRes = await fetch('https://www.googleapis.com/calendar/v3/users/me/calendarList', {
                headers: { 'Authorization': `Bearer ${adminAuthDetails.accessToken}` }
            });
            
            if (listRes.status === 401) {
                showToast(translations[currentLang].reauth_needed, 'error');
                if (loadingEl) loadingEl.classList.add('hidden');
                return;
            }
            
            const listData = await listRes.json();
            let clinicCalendar = listData.items?.find(c => c.summary === "Dr. Mina Samir Clinic");
            
            if (clinicCalendar) {
                calendarId = clinicCalendar.id;
            } else {
                const createRes = await fetch('https://www.googleapis.com/calendar/v3/calendars', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${adminAuthDetails.accessToken}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        summary: "Dr. Mina Samir Clinic",
                        description: "Appointments booked via Dr. Mina Samir Pediatric website."
                    })
                });
                
                if (createRes.ok) {
                    const newCalendar = await createRes.json();
                    calendarId = newCalendar.id;
                    showToast(currentLang === 'en' ? "Created dedicated 'Dr. Mina Samir Clinic' Calendar!" : "تم إنشاء تقويم 'Dr. Mina Samir Clinic' مخصص!", 'success');
                } else {
                    calendarId = 'primary';
                    showToast(currentLang === 'en' ? "Failed to create custom calendar. Defaulted to Primary." : "فشل إنشاء تقويم مخصص. تم التعيين للرئيسي.", 'warning');
                }
            }
        }
        
        const updateRes = await secureFetch('/api/admin/google-auth', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                accessToken: adminAuthDetails.accessToken,
                email: adminAuthDetails.email,
                name: adminAuthDetails.name,
                calendarId: calendarId
            })
        });
        
        if (updateRes.ok) {
            adminAuthDetails.calendarId = calendarId;
            showToast(currentLang === 'en' ? "Calendar sync destination updated!" : "تم تحديث جهة مزامنة التقويم!", 'success');
        }
    } catch (err) {
        console.error("Calendar transfer failure:", err);
    } finally {
        if (loadingEl) loadingEl.classList.add('hidden');
    }
};

async function fetchAppointments() {
    try {
        const res = await secureFetch('/api/appointments');
        if (res.ok) {
            adminAppointments = await res.json();
            renderAdminAppointments();
        }
    } catch (e) {
        console.error("Retrieve bookings failure:", e);
    }
}

window.renderAdminAppointments = function() {
    const body = document.getElementById('adminBookingsTableBody');
    const cardsContainer = document.getElementById('adminBookingsCardsContainer');
    const totalBadge = document.getElementById('admin-total-badge');
    const unsyncedCountEl = document.getElementById('admin-count-unsynced');
    const emptyState = document.getElementById('admin-empty-state');
    
    if (!body) return;
    
    const searchText = (document.getElementById('adminSearchInput')?.value || '').toLowerCase().trim();
    const clinicFilter = document.getElementById('adminClinicFilter')?.value || '';
    const unsyncedOnly = document.getElementById('adminUnsyncedOnly')?.checked || false;
    
    // Filtering logic
    const filtered = adminAppointments.filter(app => {
        const nameMatch = (app.patientName || '').toLowerCase().includes(searchText);
        const phoneMatch = (app.phone || '').includes(searchText);
        if (searchText && !nameMatch && !phoneMatch) return false;
        
        if (clinicFilter) {
            const matchedClinic = allClinics.find(c => String(c._id) === String(app.clinicId));
            const normFilter = clinicFilter.toLowerCase();
            const clinicName = (matchedClinic?.name || app.clinicId || '').toLowerCase();
            if (!clinicName.includes(normFilter)) return false;
        }
        
        if (unsyncedOnly && app.gcalSynced) return false;
        
        return true;
    });
    
    // Sort and calculate totals
    const unsyncedCount = adminAppointments.filter(app => !app.gcalSynced).length;
    if (unsyncedCountEl) unsyncedCountEl.textContent = unsyncedCount;
    if (totalBadge) totalBadge.textContent = `${adminAppointments.length} ${translations[currentLang].pending_syncs}`;
    
    if (filtered.length === 0) {
        body.innerHTML = '';
        if (cardsContainer) cardsContainer.innerHTML = '';
        if (emptyState) emptyState.classList.remove('hidden');
        return;
    }
    
    if (emptyState) emptyState.classList.add('hidden');
    
    // 1. Render Table (Desktop)
    body.innerHTML = filtered.map(app => {
        const clinicObj = allClinics.find(c => String(c._id) === String(app.clinicId));
        const clinicName = clinicObj ? clinicObj.name : "Clinic";
        const serviceObj = allServices.find(s => String(s._id) === String(app.serviceId));
        const serviceName = serviceObj ? serviceObj.name : "Pediatric Consultation";
        
        // Formatted dates
        const formattedDate = app.appointmentDay;
        const displayTime = app.appointmentTime;
        
        let syncBadgeHtml = '';
        if (app.gcalSynced) {
            syncBadgeHtml = `
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <i class="fas fa-check-circle mr-1 rtl:ml-1 rtl:mr-0 inline-block"></i> ${translations[currentLang].synced}
                </span>
            `;
        } else {
            const btnClass = adminAuthDetails 
                ? "bg-medical-50 hover:bg-medical-100 text-medical-600 border-medical-200" 
                : "bg-gray-100 text-gray-400 cursor-not-allowed";
                
            const titleTooltip = adminAuthDetails 
                ? "Sync now" 
                : "Activate Google Account first";
                
            syncBadgeHtml = `
                <div class="flex items-center space-x-2 rtl:space-x-reverse">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 shrink-0">
                        <i class="fas fa-exclamation-triangle mr-1 rtl:ml-1 rtl:mr-0 inline-block"></i> ${translations[currentLang].unsynced}
                    </span>
                    <button onclick="syncSingleAppointment('${app._id}')" ${!adminAuthDetails ? 'disabled' : ''} class="px-2.5 py-1 text-xs border rounded-lg transition-all font-bold ${btnClass}" title="${titleTooltip}">
                        <i class="fas fa-sync-alt text-[10px] mr-1 rtl:ml-1 rtl:mr-0"></i> Sync
                    </button>
                </div>
            `;
        }
        
        return `
            <tr class="hover:bg-gray-50/50 transition-colors">
                <td class="px-6 py-4 border-b border-gray-100">
                    <div class="font-bold text-gray-800 text-sm">${app.patientName}</div>
                    <div class="text-[10px] text-gray-400 font-medium mt-0.5">${translations[currentLang].th_dob}: ${app.birthDate} · ${translations[currentLang].th_phone}: ${app.phone}</div>
                </td>
                <td class="px-6 py-4 border-b border-gray-100">
                    <span class="text-xs font-semibold text-gray-600 bg-gray-100 px-2.5 py-1 rounded-md inline-block max-w-[150px] truncate" title="${clinicName}">${clinicName}</span>
                    <div class="text-[11px] text-gray-400 mt-1 font-medium">${serviceName}</div>
                </td>
                <td class="px-6 py-4 text-xs font-bold text-gray-700 border-b border-gray-100">
                    <div>${formattedDate}</div>
                    <div class="text-[11px] text-medical-600 mt-1 font-mono">${displayTime}</div>
                </td>
                <td class="px-6 py-4 border-b border-gray-100 font-medium">${syncBadgeHtml}</td>
                <td class="px-6 py-4 text-center border-b border-gray-100">
                    <button onclick="deleteAppointment('${app._id}')" class="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl transition-colors" title="${translations[currentLang].action_delete}">
                        <i class="far fa-trash-alt text-base"></i>
                    </button>
                </td>
            </tr>
        `;
    }).join('');
    
    // 2. Render Cards (Mobile-first responsive list layout)
    if (cardsContainer) {
        cardsContainer.innerHTML = filtered.map(app => {
            const clinicObj = allClinics.find(c => String(c._id) === String(app.clinicId));
            const clinicName = clinicObj ? clinicObj.name : "Clinic";
            const serviceObj = allServices.find(s => String(s._id) === String(app.serviceId));
            const serviceName = serviceObj ? serviceObj.name : "Pediatric Consultation";
            
            const formattedDate = app.appointmentDay;
            const displayTime = app.appointmentTime;
            
            let syncBadgeHtmlMobile = '';
            if (app.gcalSynced) {
                syncBadgeHtmlMobile = `
                    <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-150">
                        <i class="fas fa-check-circle mr-1.5 google-sync-check inline-block"></i> ${translations[currentLang].synced}
                    </span>
                `;
            } else {
                const btnClass = adminAuthDetails 
                    ? "bg-medical-50 hover:bg-medical-100 text-medical-600 border-medical-200" 
                    : "bg-gray-100 text-gray-400 cursor-not-allowed";
                syncBadgeHtmlMobile = `
                    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-2 mt-2">
                        <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-150">
                            <i class="fas fa-exclamation-triangle mr-1.5 inline-block"></i> ${translations[currentLang].unsynced}
                        </span>
                        <button onclick="syncSingleAppointment('${app._id}')" ${!adminAuthDetails ? 'disabled' : ''} class="px-3 py-1.5 text-xs font-bold border rounded-xl transition-all ${btnClass}">
                            <i class="fas fa-sync-alt text-[10px] mr-1"></i> Sync To Google
                        </button>
                    </div>
                `;
            }
            
            return `
                <div class="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm space-y-3 hover:border-medical-200 transition-colors">
                    <div class="flex justify-between items-start gap-2">
                        <div class="min-w-0">
                            <div class="font-bold text-gray-800 text-sm truncate">${app.patientName}</div>
                            <div class="text-[11px] text-gray-500 mt-1 space-y-0.5">
                                <div><span class="text-gray-400">${translations[currentLang].th_dob}:</span> ${app.birthDate}</div>
                                <div><span class="text-gray-400">${translations[currentLang].th_phone}:</span> ${app.phone}</div>
                            </div>
                        </div>
                        <button onclick="deleteAppointment('${app._id}')" class="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl transition-colors shrink-0" title="${translations[currentLang].action_delete}">
                            <i class="far fa-trash-alt text-sm"></i>
                        </button>
                    </div>
                    
                    <div class="p-3 bg-gray-50/50 rounded-2xl text-xs space-y-1.5">
                        <div class="flex justify-between gap-2">
                            <span class="text-gray-400">Clinic:</span>
                            <span class="font-semibold text-gray-700 truncate max-w-[170px]">${clinicName}</span>
                        </div>
                        <div class="flex justify-between gap-2">
                            <span class="text-gray-400">Service:</span>
                            <span class="font-semibold text-gray-600 truncate max-w-[170px]">${serviceName}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-400">Date:</span>
                            <span class="font-bold text-gray-800">${formattedDate}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-400">Time:</span>
                            <span class="font-bold text-medical-600 font-mono">${displayTime}</span>
                        </div>
                    </div>
                    
                    <div class="pt-2 border-t border-gray-100 flex items-center justify-between">
                        ${syncBadgeHtmlMobile}
                    </div>
                </div>
            `;
        }).join('');
    }
};

window.syncSingleAppointment = async function(id) {
    const app = adminAppointments.find(a => String(a._id) === String(id));
    if (!app || !adminAuthDetails) return;
    
    try {
        const clinicObj = allClinics.find(c => String(c._id) === String(app.clinicId));
        const clinicName = clinicObj ? clinicObj.name : "Clinic";
        const serviceObj = allServices.find(s => String(s._id) === String(app.serviceId));
        const serviceName = serviceObj ? serviceObj.name : "Pediatric Consultation";
        
        const startDateTimeStr = `${app.appointmentDay}T${app.appointmentTime}:00`;
        let [h, m] = app.appointmentTime.split(':').map(Number);
        m += 30;
        if (m >= 60) {
            m -= 60;
            h += 1;
        }
        const endH = String(h).padStart(2, '0');
        const endM = String(m).padStart(2, '0');
        const endDateTimeStr = `${app.appointmentDay}T${endH}:${endM}:00`;
        
        const eventData = {
            summary: `Dr. Mina Samir Appointment - ${app.patientName}`,
            description: `Appointment details:\n- Patient: ${app.patientName}\n- Service: ${serviceName}\n- Contact: ${app.phone}\n\nThank you for booking! See you soon.`,
            start: {
                dateTime: startDateTimeStr,
                timeZone: 'Africa/Cairo'
            },
            end: {
                dateTime: endDateTimeStr,
                timeZone: 'Africa/Cairo'
            },
            reminders: {
                useDefault: true
            }
        };
        
        const response = await fetch(`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(adminAuthDetails.calendarId)}/events`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${adminAuthDetails.accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(eventData)
        });
        
        if (response.ok) {
            const resultData = await response.json();
            
            // Post backend database flag update
            const saveRes = await secureFetch(`/api/appointments/${app._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    gcalSynced: true,
                    gcalEventId: resultData.id
                })
            });
            
            if (saveRes.ok) {
                app.gcalSynced = true;
                app.gcalEventId = resultData.id;
                showToast(translations[currentLang].sync_success, 'success');
                renderAdminAppointments();
            }
        } else {
            showToast(translations[currentLang].reauth_needed, 'error');
        }
    } catch (err) {
        console.error("GCal matching sync failure:", err);
    }
};

window.syncAllPendingAppointments = async function() {
    const unsynced = adminAppointments.filter(a => !a.gcalSynced);
    if (unsynced.length === 0 || !adminAuthDetails) return;
    
    const icon = document.getElementById('adminSyncIcon');
    if (icon) icon.classList.add('animate-spin');
    
    let ok = 0;
    for (const app of unsynced) {
        try {
            const clinicObj = allClinics.find(c => String(c._id) === String(app.clinicId));
            const clinicName = clinicObj ? clinicObj.name : "Clinic";
            const serviceObj = allServices.find(s => String(s._id) === String(app.serviceId));
            const serviceName = serviceObj ? serviceObj.name : "Pediatric Consultation";
            
            const startDateTimeStr = `${app.appointmentDay}T${app.appointmentTime}:00`;
            let [h, m] = app.appointmentTime.split(':').map(Number);
            m += 30;
            if (m >= 60) {
                m -= 60;
                h += 1;
            }
            const endH = String(h).padStart(2, '0');
            const endM = String(m).padStart(2, '0');
            const endDateTimeStr = `${app.appointmentDay}T${endH}:${endM}:00`;
            
            const eventData = {
                summary: `Dr. Mina Samir Appointment - ${app.patientName}`,
                description: `Appointment details:\n- Patient: ${app.patientName}\n- Service: ${serviceName}\n- Contact: ${app.phone}\n\nThank you for booking! See you soon.`,
                start: {
                    dateTime: startDateTimeStr,
                    timeZone: 'Africa/Cairo'
                },
                end: {
                    dateTime: endDateTimeStr,
                    timeZone: 'Africa/Cairo'
                },
                reminders: {
                    useDefault: true
                }
            };
            
            const response = await fetch(`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(adminAuthDetails.calendarId)}/events`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${adminAuthDetails.accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(eventData)
            });
            
            if (response.ok) {
                const resultData = await response.json();
                
                const saveRes = await secureFetch(`/api/appointments/${app._id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        gcalSynced: true,
                        gcalEventId: resultData.id
                    })
                });
                
                if (saveRes.ok) {
                    app.gcalSynced = true;
                    app.gcalEventId = resultData.id;
                    ok++;
                }
            }
        } catch (e) {
            console.error("Failed to sync app:", app._id, e);
        }
    }
    
    if (icon) icon.classList.remove('animate-spin');
    
    if (ok > 0) {
        showToast(`${translations[currentLang].sync_all_success} (${ok}/${unsynced.length})`, 'success');
        renderAdminAppointments();
    } else {
        showToast(translations[currentLang].reauth_needed, 'error');
    }
};

window.deleteAppointment = async function(id) {
    if (!confirm(translations[currentLang].delete_confirm)) return;
    
    try {
        const res = await secureFetch(`/api/appointments/${id}`, { method: 'DELETE' });
        if (res.ok) {
            adminAppointments = adminAppointments.filter(app => String(app._id) !== String(id));
            showToast(translations[currentLang].delete_success, 'success');
            renderAdminAppointments();
        }
    } catch (e) {
        console.error("Delete record failed:", e);
    }
};

// Start Setup Execution on Load
function setupPortal() {
    updateUIStrings();
    checkAuthenticationState();

    // Wire up Close button on toast
    const toastCloseBtn = document.getElementById('toastCloseBtn');
    if (toastCloseBtn) {
        toastCloseBtn.addEventListener('click', () => {
            window.hideToastNow();
        });
    }

    // Wire up programmatic login submit hook to bypass inline timing bugs
    const loginForm = document.getElementById('portalLoginForm');
    if (loginForm) {
        loginForm.onsubmit = null;
        loginForm.removeAttribute('onsubmit'); // Remove old inline handler to prevent dual triggering
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            await window.handlePortalLogInSubmit(e);
        });
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupPortal);
} else {
    setupPortal();
}
