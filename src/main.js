// Translation Data
const translations = {
    en: {
        nav_home: "Home",
        nav_about: "About",
        nav_expertise: "Expertise",
        nav_testimonials: "Testimonials",
        nav_book: "Book Appointment",
        hero_badge: "Pediatric Care Specialist",
        hero_title_1: "Caring for Your",
        hero_title_2: "Little Ones",
        hero_title_3: "with Expertise",
        hero_desc: "Dr. Mina Samir brings 24 years of dedicated pediatric expertise, providing compassionate care that nurtures healthy futures for your children.",
        hero_cta_1: "Schedule Consultation",
        hero_cta_2: "Learn More",
        about_badge: "About Dr. Mina Samir",
        about_title_1: "Dedicated to",
        about_title_2: "Children's Health",
        about_title_3: "& Well-being",
        about_desc_1: "With nearly quarter a century of medical excellence, Dr. Mina Samir has dedicated his life to providing exceptional pediatric care. His approach combines cutting-edge medical knowledge with a warm, compassionate touch that puts both children and parents at ease.",
        about_desc_2: "Specializing in comprehensive pediatric consultation, Dr. Samir has treated thousands of young patients, from newborns to adolescents, ensuring each child receives personalized attention and the highest standard of medical care.",
        about_stat_1_t: "Expert Diagnosis",
        about_stat_1_d: "Accurate assessments",
        about_stat_2_t: "Compassionate Care",
        about_stat_2_d: "Patient-centered approach",
        about_stat_3_t: "Continuous Learning",
        about_stat_3_d: "Latest treatments",
        about_stat_4_t: "24/7 Availability",
        about_stat_4_d: "Emergency support",
        about_cta: "Get in Touch",
        expertise_badge: "Areas of Expertise",
        expertise_title_1: "Comprehensive",
        expertise_title_2: "Pediatric Services",
        expertise_subtitle: "Offering a wide range of specialized pediatric services tailored to meet the unique needs of every child.",
        service_1_t: "Newborn Care",
        service_1_d: "Specialized care for infants including routine check-ups, vaccinations, and developmental monitoring.",
        service_1_i1: "Routine examinations",
        service_1_i2: "Growth monitoring",
        service_1_i3: "Vaccination schedules",
        stat_1: "Years Experience",
        stat_2: "Patients Treated",
        stat_3: "% Success Rate",
        stat_4: "Hour Support",
        test_badge: "Testimonials",
        test_title_1: "What",
        test_title_2: "Parents Say",
        test_subtitle: "Real stories from families who have experienced Dr. Samir's exceptional care.",
        test_add_here: "Add your testimonial here...",
        test_parent_name: "Parent Name",
        test_child_cond: "Child's Condition",
        test_add: "Add Testimonial",
        contact_badge: "Get in Touch",
        contact_title_1: "Book Your",
        contact_title_2: "Consultation",
        contact_subtitle: "Ready to provide your child with the best pediatric care? Schedule an appointment with Dr. Mina Samir today.",
        contact_info_1_t: "Clinic Address",
        contact_info_1_d: "Beside El Mohammadi Restaurant, Hasib, Qism Minya, Minya, Minya Governorate, Egypt",
        contact_info_2_t: "Phone",
        contact_info_2_d: "01006763805",
        contact_info_3_t: "Email",
        contact_info_3_d: "minasamirfarag4@gmail.com<br>minasamirfarag@yahoo.com",
        contact_info_4_t: "Working Hours",
        contact_info_4_d: "Mon - Sat: 8:00 AM - 7:00 PM",
        form_parent_name: "Name",
        form_child_name: "Patient Name (Full Name)",
        form_birth_date: "Birth Date",
        form_clinic: "Choose Clinic",
        form_doctor: "Choose Specialist",
        service_selection: "Choose Service",
        form_name_placeholder: "Enter full name",
        form_email: "Email",
        form_email_placeholder: "john@example.com",
        form_phone: "Phone",
        form_phone_placeholder: "01XXXXXXXXX",
        form_message: "Message",
        form_message_placeholder: "Describe your child's condition...",
        form_day: "Appointment Day",
        form_time: "Appointment Time",
        select_day: "Select Day",
        select_time: "Select Time",
        clinic_1_title: "Minya Clinic",
        clinic_1_address: "Hussaini St, East of El Mohammadi, Minya",
        clinic_1_hours: "Mon-Sat: 12:00 PM - 2:30 PM",
        clinic_2_title: "Bani Ahmed Clinic",
        clinic_2_address: "Bani Ahmed El Sharkia",
        clinic_2_hours: "Mon-Sat: 5:00 PM - 7:00 PM",
        contact_info_4_t: "Consultation Days",
        contact_info_4_d: "Mon - Sat (Sundays Off)",
        form_btn: "Request Appointment",
        success_title: "Success!",
        success_msg: "Your appointment has been booked. We will contact you shortly.",
        test_modal_title: "Share Your Experience",
        test_modal_rating: "Your Rating",
        test_modal_content: "Your Testimonial",
        test_modal_submit: "Submit Review",
        test_modal_success: "Thank you! Your testimonial has been submitted for approval.",
        test_empty: "No testimonials yet. Be the first to share your experience!",
        hero_badge_1: "Board Certified",
        hero_badge_2: "Pediatric Consultant",
        about_exp_badge: "Years of Excellence",
        footer_desc: "Providing exceptional pediatric care for 24 years. Dedicated to the health and well-being of your children with compassion and expertise.",
        footer_quick_links: "Quick Links",
        footer_services: "Services",
        footer_copy: "© 2026 Dr. Mina Samir. All rights reserved.",
        footer_privacy: "Privacy Policy",
        footer_terms: "Terms of Service",
        nav_contact: "Contact",
        service_1_t: "Newborn Care",
        service_2_t: "General Pediatrics",
        service_3_t: "Developmental Assessment",
        service_4_t: "Nutritional Counseling",
        service_5_t: "Chronic Condition Management",
        service_6_t: "Immunization",
        service_2_d: "Comprehensive health care for children of all ages, from toddlers to teenagers.",
        service_2_i1: "Annual physicals",
        service_2_i2: "Illness treatment",
        service_2_i3: "Preventive care",
        service_3_d: "Monitoring and evaluating children's developmental milestones and cognitive growth.",
        service_3_i1: "Milestone tracking",
        service_3_i2: "Behavioral evaluation",
        service_3_i3: "Early intervention",
        service_4_d: "Expert guidance on child nutrition, feeding practices, and dietary planning.",
        service_4_i1: "Diet planning",
        service_4_i2: "Growth nutrition",
        service_4_i3: "Allergy management",
        service_5_d: "Ongoing care and management for children with chronic health conditions.",
        service_5_i1: "Asthma care",
        service_5_i2: "Diabetes management",
        service_5_i3: "Regular monitoring",
        service_6_d: "Complete vaccination services following international standards and schedules.",
        service_6_i1: "Routine vaccines",
        service_6_i2: "Travel immunizations",
        service_6_i3: "Catch-up schedules",
        success_close: "Close",
        doctor_name: "Dr. Mina Samir",
        // Services from database
        "General Consultation": "General Consultation",
        "Newborn Checkup": "Newborn Checkup",
        "Vaccination": "Vaccination",
        "Emergency Visit": "Emergency Visit",
        // Clinics from database
        "Minya Clinic (عيادة المنيا)": "Minya Clinic",
        "Bani Ahmed Clinic (عيادة بني أحمد)": "Bani Ahmed Clinic",
        lang_btn: "العربية"
    },
    ar: {
        nav_home: "الرئيسية",
        nav_about: "من نحن",
        nav_expertise: "خبراتنا",
        nav_testimonials: "قالوا عنا",
        nav_book: "حجز موعد",
        hero_badge: "أخصائي رعاية الأطفال",
        hero_title_1: "نهتم بـ",
        hero_title_2: "أطفالكم",
        hero_title_3: "بكل خبرة واحترافية",
        hero_desc: "يقدم الدكتور مينا سمير 24 عاماً من الخبرة المتخصصة في طب الأطفال، موفراً رعاية حانية تضمن مستقبلاً صحياً لأبنائكم.",
        hero_cta_1: "حجز استشارة",
        hero_cta_2: "تعرف أكثر",
        about_badge: "عن الدكتور مينا سمير",
        about_title_1: "متخصصون في",
        about_title_2: "صحة الأطفال",
        about_title_3: "ورعايتهم",
        about_desc_1: "مع ما يقرب من ربع قرن من التميز الطبي، كرس الدكتور مينا سمير حياته لتقديم رعاية استثنائية للأطفال. يجمع نهجه بين المعرفة الطبية الحديثة واللمسة الدافئة والحنونة التي تريح الأطفال والآباء على حد سواء.",
        about_desc_2: "متخصص في الاستشارات الشاملة لطب الأطفال، عالج الدكتور سمير آلاف المرضى الصغار، من حديثي الولادة إلى المراهقين، مما يضمن حصول كل طفل على اهتمام شخصي وأعلى معايير الرعاية الطبية.",
        about_stat_1_t: "تشخيص خبير",
        about_stat_1_d: "تقييمات دقيقة",
        about_stat_2_t: "رعاية حانية",
        about_stat_2_d: "نهج متمحور حول المريض",
        about_stat_3_t: "تعلم مستمر",
        about_stat_3_d: "أحدث العلاجات",
        about_stat_4_t: "متاح 24/7",
        about_stat_4_d: "دعم الطوارئ",
        about_cta: "تواصل معنا",
        expertise_badge: "مجالات الخبرة",
        expertise_title_1: "خدمات",
        expertise_title_2: "طب الأطفال الشاملة",
        expertise_subtitle: "نقدم مجموعة واسعة من خدمات طب الأطفال المتخصصة المصممة لتلبية الاحتياجات الفريدة لكل طفل.",
        service_1_t: "رعاية حديثي الولادة",
        service_1_d: "رعاية متخصصة للرضع تشمل الفحوصات الروتينية والتطعيمات ومراقبة التطور.",
        service_1_i1: "فحوصات روتينية",
        service_1_i2: "مراقبة النمو",
        service_1_i3: "جداول التطعيم",
        stat_1: "عاماً من الخبرة",
        stat_2: "مريض تم علاجهم",
        stat_3: "نسبة النجاح",
        stat_4: "ساعة دعم",
        test_badge: "آراء أولياء الأمور",
        test_title_1: "ماذا يقول",
        test_title_2: "الآباء عنا",
        test_subtitle: "قصص حقيقية من عائلات جربت رعاية الدكتور سمير الاستثنائية.",
        test_add_here: "أضف رأيك هنا...",
        test_parent_name: "الأسم",
        test_child_cond: "حالة الطفل",
        test_add: "أضف رأيك",
        contact_badge: "تواصل معنا",
        contact_title_1: "احجز",
        contact_title_2: "استشارتك",
        contact_subtitle: "هل أنت مستعد لتزويد طفلك بأفضل رعاية طبية؟ حدد موعداً مع الدكتور مينا سمير اليوم.",
        contact_info_1_t: "عنوان العيادة",
        contact_info_1_d: "بجوار مطعم المحمدي، حسيب، قسم المنيا، المنيا، محافظة المنيا، مصر",
        contact_info_2_t: "الهاتف",
        contact_info_2_d: "01006763805",
        contact_info_3_t: "البريد الإلكتروني",
        contact_info_3_d: "minasamirfarag4@gmail.com<br>minasamirfarag@yahoo.com",
        contact_info_4_t: "ساعات العمل",
        contact_info_4_d: "الاثنين - السبت: 8:00 ص - 7:00 م",
        form_parent_name: "الأسم",
        form_child_name: "اسم المريض (الاسم ثلاثي)",
        form_birth_date: "تاريخ الميلاد",
        form_clinic: "اختر العيادة",
        form_doctor: "اختر التخصص/الطريقة",
        service_selection: "اختر الخدمة",
        form_name_placeholder: "أدخل الاسم (ثلاثي)",
        form_email: "البريد الإلكتروني",
        form_email_placeholder: "example@mail.com",
        form_phone: "الهاتف",
        form_phone_placeholder: "01XXXXXXXXX",
        form_message: "الرسالة",
        form_message_placeholder: "صف حالة طفلك أو سبب الزيارة...",
        form_day: "يوم الموعد",
        form_time: "وقت الموعد",
        select_day: "اختر اليوم",
        select_time: "اختر الوقت",
        clinic_1_title: "عيادة المنيا",
        clinic_1_address: "المنيا شارع الحسيني شرق المحمدي",
        clinic_1_hours: "الاثنين - السبت: 12:00 م - 2:30 م",
        clinic_2_title: "عيادة بني أحمد",
        clinic_2_address: "بني احمد الشرقية",
        clinic_2_hours: "الاثنين - السبت: 5:00 م - 7:00 م",
        contact_info_4_t: "أيام الاستشارة",
        contact_info_4_d: "الاثنين - السبت (الأحد إجازة)",
        form_btn: "طلب موعد",
        success_title: "تم بنجاح!",
        success_msg: "تم حجز موعدك بنجاح. سنتواصل معك في أقرب وقت ممكن.",
        test_modal_title: "شاركنا تجربتك",
        test_modal_rating: "تقييمك",
        test_modal_content: "رأيك",
        test_modal_submit: "إرسال التقييم",
        test_modal_success: "شكراً لك! تم إرسال رأيك للمراجعة.",
        test_empty: "لا توجد آراء بعد. كن أول من يشاركنا تجربته!",
        hero_badge_1: "معتمد من المجلس الطبي",
        hero_badge_2: "استشاري طب الأطفال",
        about_exp_badge: "سنوات من التميز",
        footer_desc: "نقدم رعاية استثنائية للأطفال منذ 24 عاماً. مكرسون لصحة ورفاهية أطفالكم بكل مودة وخبرة.",
        footer_quick_links: "روابط سريعة",
        footer_services: "الخدمات",
        footer_copy: "© 2026 د. مينا سمير. جميع الحقوق محفوظة.",
        footer_privacy: "سياسة الخصوصية",
        footer_terms: "شروط الخدمة",
        nav_contact: "اتصل بنا",
        service_1_t: "رعاية حديثي الولادة",
        service_2_t: "طب الأطفال العام",
        service_3_t: "تقييم التطور",
        service_4_t: "الاستشارات الغذائية",
        service_5_t: "إدارة الأمراض المزمنة",
        service_6_t: "التطعيمات",
        service_2_d: "رعاية صحية شاملة للأطفال من جميع الأعمار، من الرضع إلى المراهقين.",
        service_2_i1: "الفحوصات السنوية",
        service_2_i2: "علاج الأمراض والوعكات الصحية",
        service_2_i3: "الرعاية الوقائية المتكاملة",
        service_3_d: "مراقبة وتقييم مراحل تطور الأطفال ونموهم المعرفي والحركي والسلوكي.",
        service_3_i1: "تتبع مراحل النمو المختلفة",
        service_3_i2: "التقييم السلوكي للطفل",
        service_3_i3: "برامج التدخل المبكر",
        service_4_d: "توجيهات متخصصة في تغذية الأطفال وممارسات التغذية السليمة والتخطيط الغذائي الصحي.",
        service_4_i1: "تخطيط الوجبات الغذائية الصحية",
        service_4_i2: "التغذية لتنمية العقل والجسد",
        service_4_i3: "إدارة وعلاج الحساسية الغذائية",
        service_5_d: "رعاية مستمرة وإدارة متكاملة للأطفال المصابين بحالات صحية وأمراض مزمنة.",
        service_5_i1: "رعاية حالات الربو وحساسية الصدر",
        service_5_i2: "إدارة ومتابعة مرض السكري للأطفال",
        service_5_i3: "الفحوصات والمتابعة الدورية",
        service_6_d: "خدمات التطعيم الكاملة والمتابعة وفقاً لأعلى المعايير والجداول الدولية والمحلية.",
        service_6_i1: "اللقاحات والتطعيمات الروتينية",
        service_6_i2: "تطعيمات ولقاحات السفر الضرورية",
        service_6_i3: "جداول التطعيمات الاستدراكية",
        success_close: "إغلاق",
        doctor_name: "د. مينا سمير",
        // Services from database
        "General Consultation": "استشارة عامة",
        "Newborn Checkup": "فحص حديثي الولادة",
        "Vaccination": "تطعيم واقي مسبق",
        "Emergency Visit": "زيارة طوارئ عاجلة",
        // Clinics from database
        "Minya Clinic (عيادة المنيا)": "عيادة المنيا",
        "Bani Ahmed Clinic (عيادة بني أحمد)": "عيادة بني أحمد",
        lang_btn: "English"
    }
};

let currentLang = 'en';

function updateLanguage() {
    const html = document.documentElement;
    html.setAttribute('lang', currentLang);
    html.setAttribute('dir', currentLang === 'ar' ? 'rtl' : 'ltr');
    
    if (currentLang === 'ar') {
        document.body.classList.add('font-arabic');
    } else {
        document.body.classList.remove('font-arabic');
    }

    document.querySelectorAll('[data-t]').forEach(el => {
        const key = el.getAttribute('data-t');
        if (key && translations[currentLang][key]) {
            // Special handling for elements that shouldn't have their content completely replaced
            // like selects with dynamic options
            if (el.tagName === 'SELECT') return; 
            
            el.textContent = translations[currentLang][key];
        }
    });

    document.querySelectorAll('[data-p]').forEach(el => {
        const key = el.getAttribute('data-p');
        if (key && translations[currentLang][key]) {
            el.setAttribute('placeholder', translations[currentLang][key]);
        }
    });

    const langText = document.getElementById('lang-text');
    if (langText) langText.textContent = translations[currentLang].lang_btn;

    // Update dynamic options if they've been loaded
    if (allServices.length > 0 || allClinics.length > 0) {
        if (allServices.length > 0) updateServiceOptions();
        if (allClinics.length > 0) {
            updateDayOptions();
            updateTimeOptions();
        }
        
        // and update clinic select options with language translation
        const clinicSelect = document.getElementById('clinicSelect');
        if (clinicSelect && allClinics.length > 0) {
            const selectedVal = clinicSelect.value;
            clinicSelect.innerHTML = `<option value="" data-t="form_clinic">${translations[currentLang].form_clinic}</option>` + 
                allClinics.map((c) => `<option value="${String(c._id)}">${translations[currentLang][c.name] || c.name}</option>`).join('');
            clinicSelect.value = selectedVal;
        } else if (clinicSelect && clinicSelect.options[0]) {
            clinicSelect.options[0].textContent = translations[currentLang].form_clinic;
        }
    }
}

// Window functions
window.toggleLanguage = () => {
    currentLang = currentLang === 'en' ? 'ar' : 'en';
    updateLanguage();
};

window.toggleMobileMenu = () => {
    const menu = document.getElementById('mobile-menu');
    if (menu) menu.classList.toggle('hidden');
};

window.scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Modal functions
const modal = document.getElementById('testimonialModal');
window.openTestimonialModal = () => {
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }
};

window.closeTestimonialModal = () => {
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
};

// Success Popup Functions
window.openSuccessPopup = () => {
    const popup = document.getElementById('successPopup');
    if (popup) {
        popup.classList.remove('hidden');
        popup.classList.add('flex');
        setTimeout(() => {
            popup.classList.remove('opacity-0');
            popup.querySelector('div').classList.remove('scale-90');
        }, 10);
    }
};

window.closeSuccessPopup = () => {
    const popup = document.getElementById('successPopup');
    if (popup) {
        popup.classList.add('opacity-0');
        popup.querySelector('div').classList.add('scale-90');
        setTimeout(() => {
            popup.classList.add('hidden');
            popup.classList.remove('flex');
        }, 300);
    }
};

window.showToast = (message, type = 'success') => {
    const toast = document.getElementById('toastNotification');
    const toastIcon = document.getElementById('toastIcon');
    const toastText = document.getElementById('toastText');
    if (!toast || !toastIcon || !toastText) return;

    toastText.textContent = message;
    
    if (type === 'success') {
        toastIcon.innerHTML = '<i class="fas fa-check"></i>';
        toastIcon.className = 'w-8 h-8 rounded-full flex items-center justify-center text-lg bg-green-100 text-green-600 shrink-0';
    } else if (type === 'error') {
        toastIcon.innerHTML = '<i class="fas fa-exclamation-triangle"></i>';
        toastIcon.className = 'w-8 h-8 rounded-full flex items-center justify-center text-lg bg-red-100 text-red-600 shrink-0';
    } else {
        toastIcon.innerHTML = '<i class="fas fa-info-circle"></i>';
        toastIcon.className = 'w-8 h-8 rounded-full flex items-center justify-center text-lg bg-blue-100 text-blue-600 shrink-0';
    }

    toast.classList.remove('translate-y-24', 'opacity-0', 'pointer-events-none');
    toast.classList.add('translate-y-0', 'opacity-100');
    
    setTimeout(() => {
        toast.classList.add('translate-y-24', 'opacity-0', 'pointer-events-none');
        toast.classList.remove('translate-y-0', 'opacity-100');
    }, 4000);
};

// Rating logic
let currentRating = 5;
const stars = document.querySelectorAll('#ratingStars i');
stars.forEach(star => {
    star.addEventListener('click', () => {
        const rating = parseInt(star.getAttribute('data-rating') || '5');
        currentRating = rating;
        document.getElementById('testRating').value = rating.toString();
        
        stars.forEach((s, i) => {
            if (i < rating) {
                s.classList.add('text-yellow-400');
                s.classList.remove('text-gray-300');
            } else {
                s.classList.remove('text-yellow-400');
                s.classList.add('text-gray-300');
            }
        });
    });
});

// Load Testimonials
async function loadTestimonials() {
    const container = document.getElementById('testimonials-container');
    const emptyMsg = document.getElementById('testimonials-empty');
    if (!container) return;

    try {
        const res = await fetch('/api/testimonials');
        const testimonials = await res.json();
        
        if (testimonials.length === 0) {
            if (emptyMsg) emptyMsg.style.display = 'block';
            container.innerHTML = '';
            return;
        }
        if (emptyMsg) emptyMsg.style.display = 'none';

        container.innerHTML = testimonials.map((t) => `
            <div class="testimonial-card rounded-2xl p-8 scroll-reveal active group hover:bg-white/10 transition-all duration-300 border border-white/10">
                <div class="flex items-center space-x-1 mb-4 text-yellow-400 rtl:space-x-reverse">
                    ${Array(5).fill(0).map((_, i) => `<i class="${i < t.rating ? 'fas' : 'far'} fa-star"></i>`).join('')}
                </div>
                <p class="text-gray-300 italic mb-6">"${t.content}"</p>
                <div class="flex items-center space-x-4 rtl:space-x-reverse">
                    <div class="w-12 h-12 rounded-full bg-gradient-to-br from-medical-400 to-healing-400 flex items-center justify-center text-white font-bold">
                        ${t.name.charAt(0)}
                    </div>
                    <div>
                        <div class="text-white font-semibold">${t.name}</div>
                        <div class="text-gray-500 text-sm">${t.condition}</div>
                    </div>
                </div>
            </div>
        `).join('');
    } catch (e) {
        console.error(e);
    }
}

let allServices = [];
let allClinics = [];

// Load Clinics and Services
async function loadFormData() {
    const clinicSelect = document.getElementById('clinicSelect');
    const serviceSelect = document.getElementById('serviceSelect');
    const daySelect = document.getElementById('daySelect');
    if (!clinicSelect || !serviceSelect) return;

    try {
        const [clinicsRes, servicesRes] = await Promise.all([
            fetch('/api/clinics'),
            fetch('/api/services')
        ]);
        
        allClinics = await clinicsRes.json();
        allServices = await servicesRes.json();

        clinicSelect.innerHTML = `<option value="" data-t="form_clinic">${translations[currentLang].form_clinic}</option>` + 
            allClinics.map((c) => `<option value="${String(c._id)}">${translations[currentLang][c.name] || c.name}</option>`).join('');
            
        // Initial service select state
        updateServiceOptions();

        clinicSelect.addEventListener('change', () => {
            updateServiceOptions();
            updateDayOptions();
        });

        if (daySelect) {
            daySelect.addEventListener('change', () => {
                updateTimeOptions();
            });
        }
    } catch (e) {
        console.error(e);
    }
}

function updateDayOptions() {
    const clinicSelect = document.getElementById('clinicSelect');
    const daySelect = document.getElementById('daySelect');
    const timeSelect = document.getElementById('timeSelect');
    
    if (!clinicSelect || !daySelect) return;

    const selectedClinicId = clinicSelect.value;
    const clinic = allClinics.find(c => String(c._id) === String(selectedClinicId));

    if (clinic && clinic.schedule) {
        daySelect.disabled = false;
        let options = `<option value="">${translations[currentLang].select_day}</option>`;
        
        // Generate next 14 days
        const today = new Date();
        for (let i = 1; i <= 14; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            
            // Check if day is allowed in schedule (0=Sun, 1=Mon, etc)
            const dayOfWeek = date.getDay();
            if (clinic.schedule.days.includes(dayOfWeek)) {
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const dayVal = String(date.getDate()).padStart(2, '0');
                const dateStr = `${year}-${month}-${dayVal}`;
                const displayDate = date.toLocaleDateString(currentLang === 'ar' ? 'ar-EG' : 'en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                });
                options += `<option value="${dateStr}">${displayDate}</option>`;
            }
        }
        daySelect.innerHTML = options;
    } else {
        daySelect.innerHTML = `<option value="">${translations[currentLang].select_day}</option>`;
        daySelect.disabled = true;
    }
    
    // Reset time options
    if (timeSelect) {
        timeSelect.innerHTML = `<option value="">${translations[currentLang].select_time}</option>`;
        timeSelect.disabled = true;
    }
}

function updateTimeOptions() {
    const clinicSelect = document.getElementById('clinicSelect');
    const daySelect = document.getElementById('daySelect');
    const timeSelect = document.getElementById('timeSelect');
    
    if (!clinicSelect || !daySelect || !timeSelect) return;

    const selectedClinicId = clinicSelect.value;
    const clinic = allClinics.find(c => String(c._id) === String(selectedClinicId));

    if (clinic && clinic.schedule && daySelect.value) {
        timeSelect.disabled = false;
        let options = `<option value="">${translations[currentLang].select_time}</option>`;
        
        const startTime = clinic.schedule.hours.start; // e.g. "12:00"
        const endTime = clinic.schedule.hours.end;     // e.g. "14:30"
        
        let [startH, startM] = startTime.split(':').map(Number);
        let [endH, endM] = endTime.split(':').map(Number);
        
        let currentH = startH;
        let currentM = startM;
        
        while (currentH < endH || (currentH === endH && currentM <= endM)) {
            const timeStr = `${currentH.toString().padStart(2, '0')}:${currentM.toString().padStart(2, '0')}`;
            
            // Format for display
            let displayH = currentH % 12 || 12;
            let ampm = currentH >= 12 ? (currentLang === 'ar' ? 'م' : 'PM') : (currentLang === 'ar' ? 'ص' : 'AM');
            const displayTime = `${displayH}:${currentM.toString().padStart(2, '0')} ${ampm}`;
            
            options += `<option value="${timeStr}">${displayTime}</option>`;
            
            currentM += 15;
            if (currentM >= 60) {
                currentM = 0;
                currentH++;
            }
        }
        
        timeSelect.innerHTML = options;
    } else {
        timeSelect.innerHTML = `<option value="">${translations[currentLang].select_time}</option>`;
        timeSelect.disabled = true;
    }
}

function updateServiceOptions() {
    const clinicSelect = document.getElementById('clinicSelect');
    const serviceSelect = document.getElementById('serviceSelect');
    if (!clinicSelect || !serviceSelect) return;

    const selectedClinicId = clinicSelect.value;
    
    // Filter services that belong to the selected clinic
    let filteredServices = [];
    if (selectedClinicId) {
        filteredServices = allServices.filter(s => {
            return String(s.clinic_id) === String(selectedClinicId);
        });
    }

    if (selectedClinicId && filteredServices.length > 0) {
        serviceSelect.innerHTML = `<option value="">${translations[currentLang].service_selection}</option>` + 
            filteredServices.map((s) => {
                const trName = translations[currentLang][s.name] || s.name;
                const priceText = currentLang === 'en' ? `${s.price} EGP (Assistant: ${s.assistant_fees} EGP)` : `${s.price} ج.م (المساعد: ${s.assistant_fees} ج.م)`;
                return `<option value="${String(s._id)}">${trName} - ${priceText}</option>`;
            }).join('');
        serviceSelect.disabled = false;
    } else if (selectedClinicId) {
        serviceSelect.innerHTML = `<option value="">${currentLang === 'en' ? 'No services found for this clinic' : 'لا توجد خدمات متاحة لهذه العيادة'}</option>`;
        serviceSelect.disabled = true;
    } else {
        serviceSelect.innerHTML = `<option value="">${currentLang === 'en' ? 'Please choose a clinic first' : 'يرجى اختيار العيادة أولاً'}</option>`;
        serviceSelect.disabled = true;
    }
}

// Form Handlers
const testimonialForm = document.getElementById('testimonialForm');
if (testimonialForm) {
    testimonialForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = {
            name: document.getElementById('testName').value,
            condition: document.getElementById('testCondition').value,
            rating: currentRating,
            content: document.getElementById('testContent').value,
        };

        try {
            await fetch('/api/testimonials', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            window.showToast(translations[currentLang].test_modal_success, 'success');
            testimonialForm.reset();
            window.closeTestimonialModal();
            loadTestimonials();
        } catch (error) {
            window.showToast(currentLang === 'en' ? "Error submitting testimonial. Please try again." : "عذراً، حدث خطأ أثناء إرسال رأيك. يرجى المحاولة مرة أخرى.", 'error');
        }
    });
}

const appointmentForm = document.getElementById('appointmentProcessForm');
if (appointmentForm) {
    appointmentForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Kite Animation
        const kite = appointmentForm.querySelector('.kite-icon');
        const submitBtn = document.getElementById('submitBtn');
        if (kite) kite.classList.add('kite-fly');
        if (submitBtn) submitBtn.disabled = true;

        const data = {
            patientName: document.getElementById('patientName').value,
            birthDate: document.getElementById('birthDate').value,
            phone: document.getElementById('appointmentPhone').value,
            clinicId: document.getElementById('clinicSelect').value,
            serviceId: document.getElementById('serviceSelect').value,
            appointmentDay: document.getElementById('daySelect').value,
            appointmentTime: document.getElementById('timeSelect').value,
        };

        try {
            const res = await fetch('/api/appointments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            
            if (res.ok) {
                setTimeout(() => {
                    window.openSuccessPopup();
                    appointmentForm.reset();
                    if (kite) kite.classList.remove('kite-fly');
                    if (submitBtn) submitBtn.disabled = false;
                }, 1000);
            } else {
                throw new Error("Failed to book");
            }
        } catch (error) {
            window.showToast(currentLang === 'en' ? "Error booking appointment. Please try again." : "عذراً، حدث خطأ أثناء حجز الموعد. يرجى المحاولة مرة أخرى.", 'error');
            if (kite) kite.classList.remove('kite-fly');
            if (submitBtn) submitBtn.disabled = false;
        }
    });
}

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    updateLanguage();
    loadTestimonials();
    loadFormData();
    
    // Performance optimizations for scroll/parallax
    let lastScrollY = 0;
    let ticking = false;

    window.addEventListener('scroll', () => {
        lastScrollY = window.scrollY;
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const navbar = document.getElementById('navbar');
                const backToTop = document.getElementById('backToTop');
                
                if (navbar) {
                    if (lastScrollY > 50) navbar.classList.add('shadow-lg');
                    else navbar.classList.remove('shadow-lg');
                }

                if (backToTop) {
                    if (lastScrollY > 500) {
                        backToTop.classList.remove('opacity-0', 'invisible');
                        backToTop.classList.add('opacity-100', 'visible');
                    } else {
                        backToTop.classList.add('opacity-0', 'invisible');
                        backToTop.classList.remove('opacity-100', 'visible');
                    }
                }
                ticking = false;
            });
            ticking = true;
        }
    });

    // Observer for reveal animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.scroll-reveal').forEach((el) => observer.observe(el));

    // Parallax effect for hero blobs
    let mouseX = 0, mouseY = 0;
    let isMoving = false;
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX / window.innerWidth;
        mouseY = e.clientY / window.innerHeight;
        
        if (!isMoving) {
            window.requestAnimationFrame(() => {
                const blobs = document.querySelectorAll('.hero-blob');
                blobs.forEach((blob, index) => {
                    const speed = (index + 1) * 20;
                    blob.style.transform = `translate(${mouseX * speed}px, ${mouseY * speed}px)`;
                });
                isMoving = false;
            });
            isMoving = true;
        }
    });
});
