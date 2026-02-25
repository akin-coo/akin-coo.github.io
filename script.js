// Kategoriler Veri Seti
const kategoriler = [
    {
        baslik: "Marin Motorlar",
        ikon: "fa-engine",
        aciklama: "Ağır hizmet dizel ve benzinli tahrik ünitelerinin revizyon ve optimizasyon süreçleri.",
        detaylar: ["Dizel Motor Revizyonu", "Dıştan Takma Servis", "Tork & Güç Analizi"]
    },
    {
        baslik: "Pervane & İtki",
        ikon: "fa-fan",
        aciklama: "Gövde yapısına uygun pervane hatve hesaplamaları ve sürat optimizasyonu.",
        detaylar: ["Pitch (Hatve) Analizi", "Şaft Hizalama", "Vibration Kontrolü"]
    },
    {
        baslik: "AI Diagnostik",
        ikon: "fa-microchip",
        aciklama: "Sensör verileri ve yapay zeka algoritmaları ile önleyici mekanik bakım çözümleri.",
        detaylar: ["Hata Kodu Analizi", "Yakıt Tasarruf Botu", "Uzaktan Veri Takibi"]
    },
    {
        baslik: "Teknik Donanım",
        ikon: "fa-tools",
        aciklama: "Kritik sistem parçaları, hidrolik üniteler ve korozyon önleyici mühendislik çözümleri.",
        detaylar: ["Orijinal Yedek Parça", "Anod & Katot Bakımı", "Hidrolik Sistemler"]
    }
];

// Kategorileri Ekrana Basan Fonksiyon
function kategorileriYukle() {
    const container = document.getElementById('category-container');
    
    if (!container) return;

    container.innerHTML = kategoriler.map((kat, index) => `
        <div class="category-card animate__animated animate__fadeInUp" style="animation-delay: ${index * 0.2}s">
            <i class="fa-solid ${kat.ikon} text-orange-500 text-4xl mb-6 block"></i>
            <h3 class="text-xl font-bold text-white mb-2">${kat.baslik}</h3>
            <p class="text-xs text-slate-500 mb-6 leading-relaxed">${kat.aciklama}</p>
            <ul class="text-sm space-y-3 text-slate-400">
                ${kat.detaylar.map(d => `
                    <li class="flex items-center">
                        <span class="w-1.5 h-1.5 bg-orange-500 rounded-full mr-3 opacity-60"></span>
                        ${d}
                    </li>
                `).join('')}
            </ul>
        </div>
    `).join('');
}

// Sayfa yüklendiğinde başlat
document.addEventListener('DOMContentLoaded', kategorileriYukle);