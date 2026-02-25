// Kategorilerimizi bir liste (array) olarak tanımlıyoruz
const kategoriler = [
    {
        baslik: "Marin Motorlar",
        ikon: "fa-engine",
        detaylar: ["Dizel Revizyon", "Dıştan Takma Bakım", "Performans Testi"]
    },
    {
        baslik: "Tahrik Sistemleri",
        ikon: "fa-fan",
        detaylar: ["Pervane Seçimi", "Şaft Hizalama", "Şanzıman Bakımı"]
    },
    {
        baslik: "AI Diagnostik",
        ikon: "fa-microchip",
        detaylar: ["Arıza Tespit", "Yakıt Analizi", "Uzaktan İzleme"]
    },
    {
        baslik: "Donanım",
        ikon: "fa-tools",
        detaylar: ["Yedek Parça", "Anod Değişimi", "Hidrolik Sistemler"]
    }
];

// Bu fonksiyon kategorileri HTML'e otomatik olarak basar
function kategorileriYukle() {
    const container = document.getElementById('category-container');
    
    container.innerHTML = kategoriler.map(kat => `
        <div class="category-card">
            <i class="fa-solid ${kat.ikon} text-orange-500 text-3xl mb-6"></i>
            <h3 class="text-xl font-bold text-white mb-4">${kat.baslik}</h3>
            <ul class="text-sm space-y-2 text-slate-400">
                ${kat.detaylar.map(d => `<li>• ${d}</li>`).join('')}
            </ul>
        </div>
    `).join('');
}

// Sayfa yüklendiğinde çalıştır
window.onload = kategorileriYukle;