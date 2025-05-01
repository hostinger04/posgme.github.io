// Simulasi API untuk integrasi backend di masa depan
class LayananApi {
    static async dapatkanFitur() {
        const response = await fetch('assets/data/database.json');
        const data = await response.json();
        return data.fitur;
    }
    
    static async dapatkanGame() {
        const response = await fetch('assets/data/database.json');
        const data = await response.json();
        return data.game;
    }
    
    static async dapatkanAkun() {
        const response = await fetch('assets/data/database.json');
        const data = await response.json();
        return data.akun;
    }
    
    static async kirimTopUp(pesanan) {
        // Simulasi panggilan API
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({
                    sukses: true,
                    idPesanan: `ORD-${Math.floor(Math.random() * 1000000)}`,
                    pesan: 'Permintaan top-up berhasil dikirim'
                });
            }, 1000);
        });
    }
    
    static async kirimPembelianAkun(akunId) {
        // Simulasi panggilan API
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({
                    sukses: true,
                    idTransaksi: `TXN-${Math.floor(Math.random() * 1000000)}`,
                    pesan: 'Permintaan pembelian berhasil dikirim'
                });
            }, 1000);
        });
    }
    
    static async kirimPenyewaanAkun(akunId) {
        // Simulasi panggilan API
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({
                    sukses: true,
                    idTransaksi: `TXN-${Math.floor(Math.random() * 1000000)}`,
                    pesan: 'Permintaan penyewaan berhasil dikirim'
                });
            }, 1000);
        });
    }
}
