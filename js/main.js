document.addEventListener('DOMContentLoaded', function() {
    // Inisialisasi aplikasi
    initAplikasi();
});

function initAplikasi() {
    // Muat semua data dan inisialisasi komponen
    muatFitur();
    muatFormTopUp();
    muatAkun();
    setupEventListeners();
    initPartikel();
}

function muatFitur() {
    fetch('assets/data/database.json')
        .then(response => response.json())
        .then(data => {
            const kontainerFitur = document.getElementById('kontainer-fitur');
            kontainerFitur.innerHTML = '';
            
            data.fitur.forEach((fitur, index) => {
                const kartuFitur = document.createElement('div');
                kartuFitur.className = `kartu-fitur naik delay-${index + 1}`;
                kartuFitur.innerHTML = `
                    <div class="icon-fitur">
                        <i class="${fitur.icon}"></i>
                    </div>
                    <h4>${fitur.judul}</h4>
                    <p>${fitur.deskripsi}</p>
                `;
                kontainerFitur.appendChild(kartuFitur);
            });
        })
        .catch(error => console.error('Gagal memuat fitur:', error));
}

function muatFormTopUp() {
    fetch('assets/data/database.json')
        .then(response => response.json())
        .then(data => {
            const form = document.getElementById('formTopup');
            form.innerHTML = '';
            
            // Pilihan game
            const grupGame = document.createElement('div');
            grupGame.className = 'form-group';
            grupGame.innerHTML = `
                <label for="game" class="label-form">Pilih Game</label>
                <select id="game" class="kontrol-form" required>
                    <option value="">-- Pilih Game --</option>
                    ${data.game.map(game => `<option value="${game.id}">${game.nama}</option>`).join('')}
                </select>
            `;
            form.appendChild(grupGame);
            
            // Input UID
            const grupUID = document.createElement('div');
            grupUID.className = 'form-group';
            grupUID.innerHTML = `
                <label for="uid" class="label-form">UID Player</label>
                <input type="text" id="uid" class="kontrol-form" placeholder="Masukkan UID game Anda" required>
            `;
            form.appendChild(grupUID);
            
            // Pilihan server
            const grupServer = document.createElement('div');
            grupServer.className = 'form-group';
            grupServer.innerHTML = `
                <label for="server" class="label-form">Server</label>
                <select id="server" class="kontrol-form" required>
                    <option value="">-- Pilih Server --</option>
                    ${data.server.map(server => `<option value="${server.id}">${server.nama}</option>`).join('')}
                </select>
            `;
            form.appendChild(grupServer);
            
            // Pilihan nominal (akan diisi berdasarkan pilihan game)
            const grupNominal = document.createElement('div');
            grupNominal.className = 'form-group';
            grupNominal.innerHTML = `
                <label for="nominal" class="label-form">Nominal Top-Up</label>
                <select id="nominal" class="kontrol-form" required>
                    <option value="">-- Pilih Nominal --</option>
                </select>
            `;
            form.appendChild(grupNominal);
            
            // Metode pembayaran
            const grupPembayaran = document.createElement('div');
            grupPembayaran.className = 'form-group';
            grupPembayaran.innerHTML = `
                <label class="label-form">Metode Pembayaran</label>
                <div class="grup-radio">
                    ${data.metodePembayaran.map(metode => `
                        <label class="opsi-radio">
                            <input type="radio" name="pembayaran" value="${metode.id}" required>
                            ${metode.nama}
                        </label>
                    `).join('')}
                </div>
            `;
            form.appendChild(grupPembayaran);
            
            // Tombol submit
            const grupSubmit = document.createElement('div');
            grupSubmit.className = 'form-group submit-form';
            grupSubmit.innerHTML = `
                <button type="submit" class="btn btn-primary btn-lg">Proses Top-Up</button>
            `;
            form.appendChild(grupSubmit);
            
            // Event listener untuk perubahan pilihan game
            document.getElementById('game').addEventListener('change', function() {
                updatePilihanNominal(this.value);
            });
            
            // Submit form
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                tampilkanNotifikasi('Permintaan top-up berhasil dikirim!');
            });
        })
        .catch(error => console.error('Gagal memuat form top-up:', error));
}

function updatePilihanNominal(gameId) {
    fetch('assets/data/database.json')
        .then(response => response.json())
        .then(data => {
            const game = data.game.find(g => g.id === gameId);
            const selectNominal = document.getElementById('nominal');
            
            if (game) {
                selectNominal.innerHTML = `
                    <option value="">-- Pilih Nominal --</option>
                    ${game.nominal.map(nominal => `
                        <option value="${nominal.id}">${nominal.nilai} ${game.mataUang} - ${nominal.harga}</option>
                    `).join('')}
                `;
            } else {
                selectNominal.innerHTML = '<option value="">-- Pilih Nominal --</option>';
            }
        });
}

function muatAkun() {
    fetch('assets/data/database.json')
        .then(response => response.json())
        .then(data => {
            const kontainerAkun = document.getElementById('kontainer-akun');
            kontainerAkun.innerHTML = '';
            
            data.akun.forEach((akun, index) => {
                const kartuAkun = document.createElement('div');
                kartuAkun.className = `kartu-akun naik delay-${index % 3 + 1}`;
                kartuAkun.innerHTML = `
                    <img src="assets/gambar/akun/${akun.gambar}" alt="Akun ${akun.game}" class="gambar-akun">
                    <div class="konten-akun">
                        <h4 class="judul-akun">${akun.game} ${akun.judul}</h4>
                        <div class="detail-akun">
                            <div class="detail">
                                <strong>Karakter:</strong> ${akun.karakter.join(', ')}
                            </div>
                            <div class="detail">
                                <strong>5★:</strong> ${akun.bintangLima}
                            </div>
                        </div>
                        <div class="harga-akun">${akun.harga}</div>
                        <span class="status-akun status-${akun.status}">${akun.statusTeks}</span>
                        <div class="tombol-akun">
                            <button class="btn btn-primary btn-beli" ${akun.status !== 'tersedia' ? 'disabled' : ''}>
                                Beli
                            </button>
                            <button class="btn btn-outline btn-sewa" ${akun.status !== 'tersedia' ? 'disabled' : ''}>
                                Sewa
                            </button>
                        </div>
                    </div>
                `;
                kontainerAkun.appendChild(kartuAkun);
                
                // Tambahkan event listener ke tombol
                const tombolBeli = kartuAkun.querySelector('.btn-beli');
                const tombolSewa = kartuAkun.querySelector('.btn-sewa');
                
                if (tombolBeli && !tombolBeli.disabled) {
                    tombolBeli.addEventListener('click', () => handleAksiAkun('beli', akun.id));
                }
                
                if (tombolSewa && !tombolSewa.disabled) {
                    tombolSewa.addEventListener('click', () => handleAksiAkun('sewa', akun.id));
                }
            });
            
            // Update tabel admin dengan data awal
            updateTabelAdmin(data.transaksiPending);
        })
        .catch(error => console.error('Gagal memuat akun:', error));
}

function handleAksiAkun(aksi, akunId) {
    fetch('assets/data/database.json')
        .then(response => response.json())
        .then(data => {
            const akun = data.akun.find(a => a.id === akunId);
            if (!akun) return;
            
            let pesan = '';
            
            if (aksi === 'beli') {
                pesan = `Permintaan pembelian akun ${akun.game} (${akun.judul}) dikirim ke admin`;
                // Tambahkan ke tabel admin
                tambahKeTabelAdmin({
                    akun: `${akun.game} ${akun.judul}`,
                    aksi: 'Pembelian',
                    status: 'Pending'
                });
            } else if (aksi === 'sewa') {
                pesan = `Permintaan penyewaan akun ${akun.game} (${akun.judul}) dikirim ke admin`;
                // Tambahkan ke tabel admin
                tambahKeTabelAdmin({
                    akun: `${akun.game} ${akun.judul}`,
                    aksi: 'Penyewaan',
                    status: 'Pending'
                });
            }
            
            tampilkanNotifikasi(pesan);
        })
        .catch(error => console.error('Gagal menangani aksi akun:', error));
}

function updateTabelAdmin(transaksi) {
    const tabelBody = document.querySelector('#tabel-admin tbody');
    tabelBody.innerHTML = '';
    
    transaksi.forEach(txn => {
        const baris = document.createElement('tr');
        baris.innerHTML = `
            <td>${txn.akun}</td>
            <td>${txn.status}</td>
        `;
        tabelBody.appendChild(baris);
    });
}

function tambahKeTabelAdmin(transaksi) {
    const tabelBody = document.querySelector('#tabel-admin tbody');
    const baris = document.createElement('tr');
    baris.innerHTML = `
        <td>${transaksi.akun}</td>
        <td>${transaksi.status}</td>
    `;
    tabelBody.appendChild(baris);
}

function tampilkanNotifikasi(pesan, isError = false) {
    const notifikasi = document.getElementById('notifikasi');
    const pesanNotifikasi = document.getElementById('pesan-notifikasi');
    
    pesanNotifikasi.textContent = pesan;
    
    if (isError) {
        notifikasi.classList.add('error');
    } else {
        notifikasi.classList.remove('error');
    }
    
    notifikasi.classList.add('show');
    
    setTimeout(() => {
        notifikasi.classList.remove('show');
    }, 3000);
}

function setupEventListeners() {
    // Toggle menu mobile
    const tombolMenuMobile = document.querySelector('.tombol-menu-mobile');
    if (tombolMenuMobile) {
        tombolMenuMobile.addEventListener('click', toggleMenuMobile);
    }
    
    // Klik link navigasi mobile
    const navLinksMobile = document.querySelectorAll('.nav-mobile-link');
    navLinksMobile.forEach(link => {
        link.addEventListener('click', function() {
            navLinksMobile.forEach(l => l.classList.remove('aktif'));
            this.classList.add('aktif');
            toggleMenuMobile();
        });
    });
    
    // Smooth scrolling untuk link anchor
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Efek scroll header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

function toggleMenuMobile() {
    const tombolMenuMobile = document.querySelector('.tombol-menu-mobile');
    tombolMenuMobile.innerHTML = tombolMenuMobile.innerHTML.includes('bars') ? 
        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
}

function initPartikel() {
    particlesJS('partikel-js', {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#e53935"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                }
            },
            "opacity": {
                "value": 0.3,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#e53935",
                "opacity": 0.2,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 2,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 140,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });
}
