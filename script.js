/* =========================================================================
   1. KONFIGURASI GAMBAR (EDIT DI SINI UNTUK MENGGANTI NAMA FILE GAMBAR)
   ========================================================================= */
const CONFIG_IMAGES = {
    // --- Diagram UML ---
    use_case: 'assets/use-case/use case.png',
    class_diagram: 'assets/class-diagram/class diagram.png',
    
    activity_login: 'assets/activity-diagram/Activity_Diagram_Login.drawio.png',
    activity_penjualan: 'assets/activity-diagram/Activity_Diagram_Penjualan.png',
    activity_laporan: 'assets/activity-diagram/Activity_Diagram_Laporan.png',
    
    sequence_login: 'assets/sequence-diagram/Sequence Diagram Login.drawio.png',
    sequence_penjualan: 'assets/sequence-diagram/Sequence Diagram Pembayaran.png', // Menggunakan file Sequence Diagram Pembayaran
    sequence_laporan: 'assets/sequence-diagram/Sequence Diagram Laporan.png',
    
    collaboration_login: 'assets/collaboratiion-diagram/collaboration_login.png',
    collaboration_penjualan: 'assets/collaboratiion-diagram/collaboration_penjualan.png',
    collaboration_laporan: 'assets/collaboratiion-diagram/collaboration_laporan.png',
    
    state_login: 'assets/statechart-diagram/state_login.png',
    state_penjualan: 'assets/statechart-diagram/state_penjualan.png',
    state_laporan: 'assets/statechart-diagram/state_laporan.png',
    
    // --- Struktur & Source Code ---
    struktur_project: 'assets/application-screenshots/struktur_project_pos.png', // Tambahkan screenshot struktur folder Anda ke file ini
    source_code: 'assets/application-screenshots/app.png',           // Tambahkan screenshot source code Anda ke file ini
    
    // --- Screenshot Aplikasi POS ---
    login_kasir: 'assets/application-screenshots/login kasir.png',
    login_owner: 'assets/application-screenshots/login owner.png',
    login_gagal: 'assets/application-screenshots/login_gagal.png',
    dashboard: 'assets/application-screenshots/dashboard.png',
    transaksi: 'assets/application-screenshots/transaksi.png',
    mtd_bayar: 'assets/application-screenshots/mtd_bayar.png',
    qris: 'assets/application-screenshots/qris.png',
    transfer: 'assets/application-screenshots/transfer.png',
    bayar_gagal: 'assets/application-screenshots/bayar_gagal.png',
    hasil_bayar: 'assets/application-screenshots/hasil_bayar.png',
    cetak_struk: 'assets/application-screenshots/cetak_struk.png',
    stok: 'assets/application-screenshots/stok.png',
    laporan: 'assets/application-screenshots/laporan.png',
    laporanowner: 'assets/application-screenshots/laporanowner.png'
};

/* =========================================================================
   2. MOCK SOURCE CODE FOR CODE SLIDE (IF NEEDED FOR HTML VIEW)
   ========================================================================= */
const mockCodes = {
    'app-py': `<span class="keyword">from</span> flask <span class="keyword">import</span> Flask, render_template, request, redirect, session, jsonify
<span class="keyword">import</span> sqlite3

app = Flask(__name__)
app.secret_key = <span class="string">'kedaidafo_secret'</span>

<span class="keyword">def</span> <span class="function">get_db_connection</span>():
    conn = sqlite3.connect(<span class="string">'database.db'</span>)
    conn.row_factory = sqlite3.Row
    <span class="keyword">return</span> conn

<span class="comment"># --- ROUTES: AUTHENTICATION ---</span>
@app.route(<span class="string">'/login'</span>, methods=[<span class="string">'POST'</span>])
<span class="keyword">def</span> <span class="function">login</span>():
    username = request.form[<span class="string">'username'</span>]
    password = request.form[<span class="string">'password'</span>]
    
    conn = get_db_connection()
    user = conn.execute(<span class="string">'SELECT * FROM user WHERE username = ?'</span>, (username,)).fetchone()
    conn.close()
    
    <span class="keyword">if</span> user <span class="keyword">and</span> user[<span class="string">'password'</span>] == password:
        session[<span class="string">'user_id'</span>] = user[<span class="string">'id'</span>]
        session[<span class="string">'role'</span>] = user[<span class="string">'role'</span>]
        <span class="keyword">return</span> redirect(<span class="string">'/dashboard'</span>)
    <span class="keyword">return</span> render_template(<span class="string">'login.html'</span>, error=<span class="string">'Username/Password Salah!'</span>)

<span class="comment"># --- ROUTES: TRANSACTION ---</span>
@app.route(<span class="string">'/transaksi/tambah'</span>, methods=[<span class="string">'POST'</span>])
<span class="keyword">def</span> <span class="function">tambah_transaksi</span>():
    <span class="keyword">if</span> <span class="string">'user_id'</span> <span class="keyword">not in</span> session:
        <span class="keyword">return</span> jsonify({<span class="string">'status'</span>: <span class="string">'unauthorized'</span>}), <span class="number">401</span>
        
    data = request.json
    items = data[<span class="string">'items'</span>]
    
    conn = get_db_connection()
    <span class="keyword">try</span>:
        cursor = conn.cursor()
        cursor.execute(<span class="string">'INSERT INTO transaksi (total, status_bayar) VALUES (?, ?)'</span>, (data[<span class="string">'total'</span>], <span class="string">'Lunas'</span>))
        transaksi_id = cursor.lastrowid
        
        <span class="keyword">for</span> item <span class="keyword">in</span> items:
            cursor.execute(<span class="string">'INSERT INTO detail_transaksi VALUES (?, ?, ?)'</span>, (transaksi_id, item[<span class="string">'kode'</span>], item[<span class="string">'qty'</span>]))
            cursor.execute(<span class="string">'UPDATE barang SET stok = stok - ? WHERE kode_barang = ?'</span>, (item[<span class="string">'qty'</span>], item[<span class="string">'kode'</span>]))
            
        conn.commit()
        <span class="keyword">return</span> jsonify({<span class="string">'status'</span>: <span class="string">'success'</span>, <span class="string">'id'</span>: transaksi_id})
    <span class="keyword">except</span> Exception <span class="keyword">as</span> e:
        conn.rollback()
        <span class="keyword">return</span> jsonify({<span class="string">'status'</span>: <span class="string">'error'</span>, <span class="string">'message'</span>: str(e)}), <span class="number">500</span>
    <span class="keyword">finally</span>:
        conn.close()`,

    'init-db': `<span class="keyword">import</span> sqlite3

conn = sqlite3.connect(<span class="string">"database.db"</span>)

cursor = conn.cursor()

cursor.execute(<span class="string">"""
CREATE TABLE IF NOT EXISTS transaksi (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tanggal TEXT,
    kasir TEXT,
    total INTEGER
)
"""</span>)

conn.commit()
conn.close()

<span class="keyword">print</span>(<span class="string">"Database berhasil dibuat"</span>)`
};

/* =========================================================================
   3. CONFIGURATION FOR INTERACTIVE POS SIMULATOR
   ========================================================================= */
const SIMULATOR_STEPS = [
    // --- Autentikasi ---
    { section: 'auth', name: 'Login Gagal', key: 'login_gagal', desc: 'Simulasi login kasir/owner gagal karena kesalahan username atau password.' },
    { section: 'auth', name: 'Login Kasir', key: 'login_kasir', desc: 'Kasir berhasil login menggunakan username & password Kasir untuk membuka modul penjualan.' },
    { section: 'auth', name: 'Login Owner', key: 'login_owner', desc: 'Owner login menggunakan akun Owner untuk membuka akses penuh ke kontrol manajerial.' },
    
    // --- Manajemen Stok ---
    { section: 'stok', name: 'Dashboard Owner', key: 'dashboard', desc: 'Dashboard utama owner yang merangkum total produk, stok, dan profit harian.' },
    { section: 'stok', name: 'Tabel Kelola Stok', key: 'stok', desc: 'Modul tabel kelola stok produk lengkap dengan fitur Edit, Hapus, dan Tambah produk baru.' },

    // --- Transaksi ---
    { section: 'transaksi', name: 'Input Belanjaan', key: 'transaksi', desc: 'Kasir memasukkan barang belanjaan ke keranjang belanja melalui daftar menu atau scan barcode.' },
    { section: 'transaksi', name: 'Pilih Metode Bayar', key: 'mtd_bayar', desc: 'Sistem menampilkan pop-up pilihan metode pembayaran (Tunai, QRIS, Bank Transfer).' },
    { section: 'transaksi', name: 'Metode QRIS', key: 'qris', desc: 'Sistem memunculkan kode QRIS dinamis yang siap dipindai oleh pelanggan.' },
    { section: 'transaksi', name: 'Metode Transfer', key: 'transfer', desc: 'Sistem menampilkan nomor rekening bank tujuan transfer kepada pelanggan.' },
    { section: 'transaksi', name: 'Pembayaran Gagal', key: 'bayar_gagal', desc: 'Simulasi kegagalan pembayaran karena saldo tidak cukup atau kendala jaringan.' },
    { section: 'transaksi', name: 'Pembayaran Sukses', key: 'hasil_bayar', desc: 'Notifikasi konfirmasi bahwa transaksi sukses terverifikasi oleh database.' },
    { section: 'transaksi', name: 'Cetak Struk', key: 'cetak_struk', desc: 'Koneksi ke printer thermal kasir untuk mencetak struk bukti pembayaran fisik.' },

    // --- Laporan ---
    { section: 'laporan', name: 'Laporan Kasir', key: 'laporan', desc: 'Halaman peninjauan rekapan transaksi harian oleh kasir yang bertugas.' },
    { section: 'laporan', name: 'Grafik Laporan Owner', key: 'laporanowner', desc: 'Modul laporan keuangan komprehensif milik Owner dengan filter range tanggal dan grafik tren penjualan.' }
];

const SECTION_TITLES = {
    'auth': 'Autentikasi User (Multi-Role)',
    'stok': 'Manajemen Stok',
    'transaksi': 'Modul Transaksi POS',
    'laporan': 'Modul Laporan Keuangan'
};

/* =========================================================================
   4. PRESENTATION CORE & NAVIGATION CONTROLLER
   ========================================================================= */
document.addEventListener('DOMContentLoaded', () => {
    // FADE OUT LOADING SCREEN
    const loader = document.getElementById('loading-screen');
    setTimeout(() => {
        loader.classList.add('fade-out');
    }, 600);

    // INJECT IMAGES FROM JS CONFIGURATION
    document.querySelectorAll('[data-image-key]').forEach(el => {
        const key = el.getAttribute('data-image-key');
        if (CONFIG_IMAGES[key]) {
            el.src = CONFIG_IMAGES[key];
            
            // Sync triggers data-img-src for zoomable modal
            const trigger = el.closest('.zoomable-trigger');
            if (trigger) {
                trigger.setAttribute('data-img-src', CONFIG_IMAGES[key]);
            }
        }
    });

    // SELECTORS
    const slides = Array.from(document.querySelectorAll('.slide'));
    const menuItems = Array.from(document.querySelectorAll('.menu-item'));
    const subMenuItems = Array.from(document.querySelectorAll('.submenu-item'));
    const prevBtn = document.getElementById('prev-slide-btn');
    const nextBtn = document.getElementById('next-slide-btn');
    const slideCounter = document.getElementById('slide-number');
    const breadcrumbCurrent = document.getElementById('breadcrumb-current');
    const progressBar = document.getElementById('progress-bar-fill');

    let currentSlideIndex = 0;

    // UPDATE ACTIVE SLIDE STATE
    function updateSlide(index, direction = 'next') {
        if (index < 0 || index >= slides.length) return;

        // Apply slide animation class direction to body
        if (direction === 'prev') {
            document.body.classList.add('nav-prev');
        } else {
            document.body.classList.remove('nav-prev');
        }

        // Change Slide Visibility
        slides[currentSlideIndex].classList.remove('active');
        currentSlideIndex = index;
        slides[currentSlideIndex].classList.add('active');

        // Reset scroll position on active slide
        slides[currentSlideIndex].scrollTop = 0;

        const activeSlideId = slides[currentSlideIndex].id;

        // Update active class on Sidebar main menu
        menuItems.forEach(item => {
            const targetSlide = item.getAttribute('data-slide');
            const submenuId = item.getAttribute('data-submenu');

            if (targetSlide === activeSlideId || (submenuId && activeSlideId.startsWith(targetSlide.replace('-login', '')))) {
                item.classList.add('active');
                if (submenuId) {
                    document.getElementById(submenuId).style.display = 'flex';
                }
            } else {
                item.classList.remove('active');
                if (submenuId && !activeSlideId.includes(submenuId.replace('sub-', ''))) {
                    document.getElementById(submenuId).style.display = 'none';
                }
            }
        });

        // Update active class on Sidebar submenus
        subMenuItems.forEach(item => {
            const targetSlide = item.getAttribute('data-slide');
            if (targetSlide === activeSlideId) {
                item.classList.add('active');
                item.parentElement.style.display = 'flex';
            } else {
                item.classList.remove('active');
            }
        });

        // Update Header Controls & Counter
        prevBtn.disabled = currentSlideIndex === 0;
        nextBtn.disabled = currentSlideIndex === slides.length - 1;
        slideCounter.innerText = `${currentSlideIndex + 1} / ${slides.length}`;

        // Update Progress Bar
        const percentage = ((currentSlideIndex + 1) / slides.length) * 100;
        progressBar.style.width = `${percentage}%`;

        // Update Breadcrumb Current Title
        const menuTextElement = document.querySelector(`.menu-item[data-slide="${activeSlideId}"], .submenu-item[data-slide="${activeSlideId}"]`);
        if (menuTextElement) {
            // Strip emoji characters from text label
            breadcrumbCurrent.innerText = menuTextElement.innerText.replace(/[\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]/g, '').trim();
        } else {
            breadcrumbCurrent.innerText = "Diagram";
        }

        // Sync slide in URL hash
        window.location.hash = activeSlideId;
    }

    // INITIALIZE & READ HASH
    function initSlideshow() {
        const hash = window.location.hash.replace('#', '');
        let startIndex = 0;
        if (hash) {
            const foundIndex = slides.findIndex(s => s.id === hash);
            if (foundIndex !== -1) startIndex = foundIndex;
        }
        updateSlide(startIndex);
    }

    // SIDEBAR CLICKS
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetSlideId = item.getAttribute('data-slide');
            const slideIdx = slides.findIndex(s => s.id === targetSlideId);
            if (slideIdx !== -1) {
                const dir = slideIdx < currentSlideIndex ? 'prev' : 'next';
                updateSlide(slideIdx, dir);
            }
            if (window.innerWidth <= 768) {
                document.body.classList.remove('sidebar-open');
            }
        });
    });

    subMenuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            const targetSlideId = item.getAttribute('data-slide');
            const slideIdx = slides.findIndex(s => s.id === targetSlideId);
            if (slideIdx !== -1) {
                const dir = slideIdx < currentSlideIndex ? 'prev' : 'next';
                updateSlide(slideIdx, dir);
            }
            if (window.innerWidth <= 768) {
                document.body.classList.remove('sidebar-open');
            }
        });
    });

    // INLINE PREV / NEXT CLICKS ON EACH SLIDE
    document.querySelectorAll('.slide-btn-prev').forEach(btn => {
        btn.addEventListener('click', () => updateSlide(currentSlideIndex - 1, 'prev'));
    });
    document.querySelectorAll('.slide-btn-next').forEach(btn => {
        btn.addEventListener('click', () => updateSlide(currentSlideIndex + 1, 'next'));
    });

    // TOP BAR CONTROLS
    prevBtn.addEventListener('click', () => updateSlide(currentSlideIndex - 1, 'prev'));
    nextBtn.addEventListener('click', () => updateSlide(currentSlideIndex + 1, 'next'));

    // KEYBOARD NAVIGATION SETUP
    document.addEventListener('keydown', (e) => {
        // Stop if image lightbox is open
        if (document.getElementById('lightbox').classList.contains('active')) return;

        if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
            e.preventDefault();
            updateSlide(currentSlideIndex + 1, 'next');
        } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
            e.preventDefault();
            updateSlide(currentSlideIndex - 1, 'prev');
        } else if (e.key.toLowerCase() === 't') {
            toggleSidebar();
        }
    });

    // SIDEBAR COLLAPSE TOGGLE
    const toggleSidebarBtn = document.getElementById('toggle-sidebar');
    function toggleSidebar() {
        if (window.innerWidth <= 768) {
            document.body.classList.toggle('sidebar-open');
        } else {
            document.body.classList.toggle('sidebar-collapsed');
            const isCollapsed = document.body.classList.contains('sidebar-collapsed');
            toggleSidebarBtn.style.transform = isCollapsed ? 'rotate(180deg)' : 'rotate(0deg)';
        }
    }
    toggleSidebarBtn.addEventListener('click', toggleSidebar);

    // Create mobile menu button dynamically
    const breadcrumbs = document.querySelector('.slide-breadcrumbs');
    if (breadcrumbs) {
        const mobileMenuBtn = document.createElement('span');
        mobileMenuBtn.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" style="vertical-align: middle; stroke: currentColor; fill: none; stroke-width: 2.5; margin-right: 5px;"><path d="M3 12h18M3 6h18M3 18h18"/></svg>';
        mobileMenuBtn.style.cursor = 'pointer';
        mobileMenuBtn.style.display = 'none'; // Hidden by default, shown by CSS
        mobileMenuBtn.classList.add('mobile-menu-btn');
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleSidebar();
        });
        breadcrumbs.prepend(mobileMenuBtn);
    }

    // BROWSER HASH SYNC
    window.addEventListener('hashchange', () => {
        const hash = window.location.hash.replace('#', '');
        if (hash) {
            const foundIndex = slides.findIndex(s => s.id === hash);
            if (foundIndex !== -1 && foundIndex !== currentSlideIndex) {
                const dir = foundIndex < currentSlideIndex ? 'prev' : 'next';
                updateSlide(foundIndex, dir);
            }
        }
    });

    // START BUTTON ON HOME SLIDE
    const startPresentationBtn = document.getElementById('start-btn');
    if (startPresentationBtn) {
        startPresentationBtn.addEventListener('click', () => {
            updateSlide(1, 'next');
        });
    }

    /* =========================================================================
       5. INTERACTIVE SOURCE CODE PREVIEWER
       ========================================================================= */
    const codeTabs = document.querySelectorAll('.code-tab');
    const codeDisplay = document.getElementById('code-display');

    function loadCode(filename) {
        if (mockCodes[filename]) {
            codeDisplay.innerHTML = mockCodes[filename];
        }
    }

    codeTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            codeTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const target = tab.getAttribute('data-code-target');
            loadCode(target);

            // Update screenshot image on the right side
            const sourceCodeImg = document.querySelector('[data-image-key="source_code"]');
            if (sourceCodeImg) {
                let imgPath = CONFIG_IMAGES.source_code; // Default for app-py
                if (target === 'init-db') {
                    imgPath = 'assets/application-screenshots/init_db.png';
                }
                sourceCodeImg.src = imgPath;
                const trigger = sourceCodeImg.closest('.zoomable-trigger');
                if (trigger) {
                    trigger.setAttribute('data-img-src', imgPath);
                }
            }
        });
    });

    // Load app.py code on start
    loadCode('app-py');

    /* =========================================================================
       6. INTERACTIVE POS WALKTHROUGH SIMULATOR
       ========================================================================= */
    const flowBtns = document.querySelectorAll('.flow-btn');
    const simStepsTitle = document.getElementById('sim-steps-title');
    const simStepsContainer = document.getElementById('sim-steps-container');
    const simScreenImg = document.getElementById('sim-screen-img');
    const simScreenContainer = document.getElementById('sim-screen-container');
    const screenCurrentName = document.getElementById('screen-current-name');
    const simPrevBtn = document.getElementById('sim-prev-btn');
    const simNextBtn = document.getElementById('sim-next-btn');

    let currentStepIdx = 0;

    function initSimulator() {
        simStepsContainer.innerHTML = '';
        
        SIMULATOR_STEPS.forEach((step, idx) => {
            const item = document.createElement('div');
            item.className = `simulator-step-item ${idx === 0 ? 'active' : ''}`;
            item.innerHTML = `
                <div class="step-number">${idx + 1}</div>
                <div>
                    <div style="font-weight:600; color:white; margin-bottom:2px;">${step.name}</div>
                    <div style="font-size:11.5px; line-height:1.4;">${step.desc}</div>
                </div>
            `;
            item.addEventListener('click', () => selectSimulatorStep(idx));
            simStepsContainer.appendChild(item);
        });

        renderSimulatorStep();
    }

    function renderSimulatorStep() {
        const currentStep = SIMULATOR_STEPS[currentStepIdx];

        const stepItems = simStepsContainer.querySelectorAll('.simulator-step-item');
        stepItems.forEach((item, idx) => {
            if (idx === currentStepIdx) {
                item.classList.add('active');
                item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } else {
                item.classList.remove('active');
            }
        });

        // Set screen image dynamically from CONFIG_IMAGES
        const imagePath = CONFIG_IMAGES[currentStep.key] || '';
        simScreenImg.src = imagePath;
        simScreenContainer.setAttribute('data-img-src', imagePath);
        screenCurrentName.innerHTML = `${SECTION_TITLES[currentStep.section]} &bull; <span>${currentStep.name}</span>`;

        simPrevBtn.disabled = currentStepIdx === 0;
        simNextBtn.disabled = currentStepIdx === SIMULATOR_STEPS.length - 1;

        // Sync active flow selector button on the left
        flowBtns.forEach(btn => {
            if (btn.getAttribute('data-flow') === currentStep.section) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        simStepsTitle.innerText = SECTION_TITLES[currentStep.section];
    }

    function selectSimulatorStep(idx) {
        if (idx >= 0 && idx < SIMULATOR_STEPS.length) {
            currentStepIdx = idx;
            renderSimulatorStep();
        }
    }

    flowBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const flow = btn.getAttribute('data-flow');
            // Find first step in this section
            const firstStepIdx = SIMULATOR_STEPS.findIndex(s => s.section === flow);
            if (firstStepIdx !== -1) {
                selectSimulatorStep(firstStepIdx);
            }
        });
    });

    simPrevBtn.addEventListener('click', () => selectSimulatorStep(currentStepIdx - 1));
    simNextBtn.addEventListener('click', () => selectSimulatorStep(currentStepIdx + 1));

    // Load default walkthrough flow
    initSimulator();

    /* =========================================================================
       7. DIAGRAM & SCREENSHOT CLICK-TO-ZOOM LIGHTBOX
       ========================================================================= */
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxFilename = document.getElementById('lightbox-filename');
    const zoomValue = document.getElementById('zoom-value');
    const zoomInBtn = document.getElementById('zoom-in');
    const zoomOutBtn = document.getElementById('zoom-out');
    const zoomResetBtn = document.getElementById('zoom-reset');

    let zoomScale = 1;
    let isDragging = false;
    let startX, startY;
    let translateX = 0, translateY = 0;

    function openLightbox(src) {
        if (!src) return;
        lightboxImg.src = src;
        lightboxFilename.innerText = src.split('/').pop();
        lightbox.classList.add('active');
        resetZoom();
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
    }

    // Set trigger listener on body to capture zoomable clicks dynamically
    document.body.addEventListener('click', (e) => {
        const trigger = e.target.closest('.zoomable-trigger');
        if (trigger) {
            const src = trigger.getAttribute('data-img-src');
            openLightbox(src);
        }
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target === document.getElementById('lightbox-container')) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    // ZOOM TRANSFORMS
    function setZoom(scale) {
        zoomScale = Math.max(0.3, Math.min(5, scale));
        zoomValue.innerText = `${Math.round(zoomScale * 100)}%`;
        applyTransform();
    }

    function resetZoom() {
        zoomScale = 1;
        translateX = 0;
        translateY = 0;
        zoomValue.innerText = '100%';
        applyTransform();
    }

    function applyTransform() {
        lightboxImg.style.transform = `translate(${translateX}px, ${translateY}px) scale(${zoomScale})`;
    }

    zoomInBtn.addEventListener('click', () => setZoom(zoomScale + 0.25));
    zoomOutBtn.addEventListener('click', () => setZoom(zoomScale - 0.25));
    zoomResetBtn.addEventListener('click', resetZoom);

    lightbox.addEventListener('wheel', (e) => {
        if (!lightbox.classList.contains('active')) return;
        e.preventDefault();
        const delta = e.deltaY > 0 ? -0.1 : 0.1;
        setZoom(zoomScale + delta);
    }, { passive: false });

    // DRAG TO PAN
    lightboxImg.addEventListener('mousedown', (e) => {
        e.preventDefault();
        isDragging = true;
        lightboxImg.classList.add('dragging');
        startX = e.clientX - translateX;
        startY = e.clientY - translateY;
    });

    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        translateX = e.clientX - startX;
        translateY = e.clientY - startY;
        applyTransform();
    });

    window.addEventListener('mouseup', () => {
        isDragging = false;
        lightboxImg.classList.remove('dragging');
    });

    lightboxImg.addEventListener('dblclick', resetZoom);

    // RUN PAGE INITIALIZER
    initSlideshow();
});
