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
    struktur_project: 'assets/object-dokumentation/struktur_project.png', // Tambahkan screenshot struktur folder Anda ke file ini
    source_code: 'assets/object-dokumentation/source_code.png',           // Tambahkan screenshot source code Anda ke file ini
    
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

    'schema-sql': `<span class="keyword">CREATE TABLE</span> <span class="class">user</span> (
    id <span class="keyword">INTEGER PRIMARY KEY AUTOINCREMENT</span>,
    username <span class="keyword">TEXT NOT NULL UNIQUE</span>,
    password <span class="keyword">TEXT NOT NULL</span>,
    role <span class="keyword">TEXT CHECK</span>(role <span class="keyword">IN</span> (<span class="string">'Kasir'</span>, <span class="string">'Owner'</span>))
);

<span class="keyword">CREATE TABLE</span> <span class="class">barang</span> (
    kode_barang <span class="keyword">TEXT PRIMARY KEY</span>,
    nama <span class="keyword">TEXT NOT NULL</span>,
    harga <span class="keyword">INTEGER NOT NULL</span>,
    stok <span class="keyword">INTEGER NOT NULL CHECK</span>(stok &gt;= <span class="number">0</span>)
);

<span class="keyword">CREATE TABLE</span> <span class="class">transaksi</span> (
    id_transaksi <span class="keyword">INTEGER PRIMARY KEY AUTOINCREMENT</span>,
    total <span class="keyword">INTEGER NOT NULL</span>,
    tanggal <span class="keyword">TIMESTAMP DEFAULT CURRENT_TIMESTAMP</span>,
    status_bayar <span class="keyword">TEXT NOT NULL</span>
);

<span class="keyword">CREATE TABLE</span> <span class="class">detail_transaksi</span> (
    id_transaksi <span class="keyword">INTEGER</span>,
    kode_barang <span class="keyword">TEXT</span>,
    qty <span class="keyword">INTEGER NOT NULL</span>,
    <span class="keyword">PRIMARY KEY</span> (id_transaksi, kode_barang),
    <span class="keyword">FOREIGN KEY</span> (id_transaksi) <span class="keyword">REFERENCES</span> transaksi(id_transaksi),
    <span class="keyword">FOREIGN KEY</span> (kode_barang) <span class="keyword">REFERENCES</span> barang(kode_barang)
);`,

    'checkout-js': `<span class="comment">// --- LOGIC SCAN BARCODE & INPUT KERANJANG ---</span>
<span class="keyword">let</span> keranjang = [];

<span class="keyword">function</span> <span class="function">scanBarang</span>(kodeBarang) {
    fetch(<span class="string">\`/api/barang/\${kodeBarang}\`</span>)
        .then(res =&gt; res.json())
        .then(barang =&gt; {
            <span class="keyword">if</span> (barang.stok &lt;= <span class="number">0</span>) {
                alert(<span class="string">'Stok barang habis!'</span>);
                <span class="keyword">return</span>;
            }
            
            <span class="keyword">let</span> item = keranjang.find(i =&gt; i.kode === kodeBarang);
            <span class="keyword">if</span> (item) {
                item.qty++;
            } <span class="keyword">else</span> {
                keranjang.push({
                    kode: barang.kode_barang,
                    nama: barang.nama,
                    harga: barang.harga,
                    qty: <span class="number">1</span>
                });
            }
            renderKeranjang();
        });
}

<span class="keyword">function</span> <span class="function">renderKeranjang</span>() {
    <span class="keyword">const</span> list = document.getElementById(<span class="string">'cart-list'</span>);
    list.innerHTML = <span class="string">''</span>;
    <span class="keyword">let</span> total = <span class="number">0</span>;
    
    keranjang.forEach(item =&gt; {
        total += item.harga * item.qty;
        list.innerHTML += <span class="string">\`
            &lt;div class="cart-item"&gt;
                &lt;span&gt;\${item.nama} (x\${item.qty})&lt;/span&gt;
                &lt;span&gt;Rp \${(item.harga * item.qty).toLocaleString()}&lt;/span&gt;
            &lt;/div&gt;
        \`</span>;
    });
    
    document.getElementById(<span class="string">'total-price'</span>).innerText = <span class="string">\`Rp \${total.toLocaleString()}\`</span>;
}`
};

/* =========================================================================
   3. CONFIGURATION FOR INTERACTIVE POS SIMULATOR
   ========================================================================= */
const simulatorFlows = {
    'auth': {
        title: 'Autentikasi User (Multi-Role)',
        steps: [
            { name: 'Login Kasir', key: 'login_kasir', desc: 'Kasir masuk menggunakan username & password kasir untuk membuka akses modul penjualan.' },
            { name: 'Login Owner', key: 'login_owner', desc: 'Owner masuk untuk membuka dashboard laporan statistik dan pengelolaan stok.' },
            { name: 'Login Gagal', key: 'login_gagal', desc: 'Form login mendeteksi input salah dan menampilkan pesan pop-up error secara real-time.' }
        ]
    },
    'transaksi': {
        title: 'Modul Transaksi POS',
        steps: [
            { name: 'Input Belanjaan', key: 'transaksi', desc: 'Kasir memasukkan barang ke keranjang belanja melalui daftar menu atau scan barcode.' },
            { name: 'Pilih Metode Bayar', key: 'mtd_bayar', desc: 'Sistem memunculkan pilihan metode pembayaran (Tunai, QRIS, Bank Transfer).' },
            { name: 'Metode QRIS', key: 'qris', desc: 'Sistem memunculkan kode QRIS dinamis yang siap dipindai oleh pembeli.' },
            { name: 'Metode Transfer', key: 'transfer', desc: 'Sistem menampilkan nomor rekening bank tujuan transfer kepada pelanggan.' },
            { name: 'Pembayaran Gagal', key: 'bayar_gagal', desc: 'Simulasi jika pembayaran mengalami kegagalan/timeout.' },
            { name: 'Pembayaran Sukses', key: 'hasil_bayar', desc: 'Notifikasi konfirmasi bahwa transaksi sukses terverifikasi oleh database.' },
            { name: 'Cetak Struk', key: 'cetak_struk', desc: 'Koneksi ke printer thermal kasir untuk mencetak struk bukti pembayaran fisik.' }
        ]
    },
    'stok': {
        title: 'Manajemen Stok',
        steps: [
            { name: 'Dashboard Owner', key: 'dashboard', desc: 'Dashboard utama owner yang memuat rangkuman total produk, stok, dan profit harian.' },
            { name: 'Tabel Kelola Stok', key: 'stok', desc: 'Modul tabel inventori produk lengkap dengan fitur Edit, Hapus, dan Tambah produk baru.' }
        ]
    },
    'laporan': {
        title: 'Modul Laporan Keuangan',
        steps: [
            { name: 'Laporan Kasir', key: 'laporan', desc: 'Halaman peninjauan rekapan transaksi kasir yang bertugas pada shift aktif.' },
            { name: 'Grafik Laporan Owner', key: 'laporanowner', desc: 'Modul laporan komprehensif milik Owner dengan filter range tanggal dan grafik tren penjualan.' }
        ]
    }
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
        document.body.classList.toggle('sidebar-collapsed');
        const isCollapsed = document.body.classList.contains('sidebar-collapsed');
        toggleSidebarBtn.style.transform = isCollapsed ? 'rotate(180deg)' : 'rotate(0deg)';
    }
    toggleSidebarBtn.addEventListener('click', toggleSidebar);

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
            loadCode(tab.getAttribute('data-code-target'));
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

    let activeFlowKey = 'auth';
    let activeStepIdx = 0;

    function loadSimulatorFlow(flowKey) {
        activeFlowKey = flowKey;
        activeStepIdx = 0;
        const flowData = simulatorFlows[flowKey];

        simStepsTitle.innerText = flowData.title;
        simStepsContainer.innerHTML = '';
        
        flowData.steps.forEach((step, idx) => {
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
        const steps = simulatorFlows[activeFlowKey].steps;
        const currentStep = steps[activeStepIdx];

        const stepItems = simStepsContainer.querySelectorAll('.simulator-step-item');
        stepItems.forEach((item, idx) => {
            if (idx === activeStepIdx) {
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
        screenCurrentName.innerHTML = `${simulatorFlows[activeFlowKey].title} &bull; <span>${currentStep.name}</span>`;

        simPrevBtn.disabled = activeStepIdx === 0;
        simNextBtn.disabled = activeStepIdx === steps.length - 1;
    }

    function selectSimulatorStep(idx) {
        const steps = simulatorFlows[activeFlowKey].steps;
        if (idx >= 0 && idx < steps.length) {
            activeStepIdx = idx;
            renderSimulatorStep();
        }
    }

    flowBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            flowBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            loadSimulatorFlow(btn.getAttribute('data-flow'));
        });
    });

    simPrevBtn.addEventListener('click', () => selectSimulatorStep(activeStepIdx - 1));
    simNextBtn.addEventListener('click', () => selectSimulatorStep(activeStepIdx + 1));

    // Load default walkthrough flow
    loadSimulatorFlow('auth');

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
