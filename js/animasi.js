// Inisialisasi semua animasi
document.addEventListener('DOMContentLoaded', function() {
    // Tambahkan kelas animasi ke elemen saat muncul di viewport
    const animasiSaatScroll = function() {
        const elements = document.querySelectorAll('.naik, .muncul');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate');
            }
        });
    };
    
    // Jalankan sekali saat load
    animasiSaatScroll();
    
    // Jalankan saat scroll
    window.addEventListener('scroll', animasiSaatScroll);
    
    // Efek parallax gambar hero
    const gambarHero = document.querySelector('.img-hero');
    if (gambarHero) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            gambarHero.style.transform = `perspective(1000px) rotateY(-15deg) translateY(${scrollPosition * 0.2}px)`;
        });
    }
    
    // Animasi elemen mengambang
    const elemenMengambang = document.querySelectorAll('.elemen');
    elemenMengambang.forEach(el => {
        // Acak posisi awal
        el.style.left = `${Math.random() * 80 + 10}%`;
        el.style.top = `${Math.random() * 80 + 10}%`;
        
        // Acak durasi animasi
        const duration = Math.random() * 10 + 10;
        el.style.animationDuration = `${duration}s`;
    });
});
