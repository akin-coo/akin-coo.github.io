const kategoriler = [
    {
        baslik: "Tahrik Motorları",
        ikon: "fa-engine",
        aciklama: "Dizel ve yüksek performanslı dıştan takma sistemlerde tam revizyon.",
        detaylar: ["Yanmar/Volvo Penta Uzmanlığı", "Enjektör Kalibrasyonu", "Turbo Optimizasyonu"]
    },
    {
        baslik: "Pervane Analizi",
        ikon: "fa-fan",
        aciklama: "Teknenizin gövde formuna göre en verimli itki konfigürasyonu.",
        detaylar: ["Slip (Kayma) Oranı Analizi", "Pitch/Diameter Hesaplama", "Titreşim Sönümleme"]
    },
    {
        baslik: "Smart Diagnostics",
        ikon: "fa-microchip",
        aciklama: "Yapay zeka modelleriyle motor ömrü ve yakıt tüketimi kestirimi.",
        detaylar: ["Hata Logu Analitiği", "Gerçek Zamanlı Veri Akışı", "Tahminleme Algoritmaları"]
    },
    {
        baslik: "Hidrolik & Donanım",
        ikon: "fa-anchor",
        aciklama: "Dümen sistemleri, şanzıman ve kritik mekanik aksam mühendisliği.",
        detaylar: ["Sızdırmazlık Testleri", "Şaft Alignment (Hizalama)", "Korozyon Mühendisliği"]
    }
];

function initializeSite() {
    const container = document.getElementById('category-container');
    if (!container) return;

    container.innerHTML = kategoriler.map((kat, i) => `
        <div class="category-card animate__animated animate__fadeInUp" style="animation-delay: ${i * 0.1}s">
            <i class="fa-solid ${kat.ikon} text-orange-600 text-4xl mb-8"></i>
            <h3 class="text-2xl font-bold text-white mb-3 tracking-tight">${kat.baslik}</h3>
            <p class="text-xs text-slate-500 mb-8 leading-relaxed">${kat.aciklama}</p>
            <ul class="text-[13px] space-y-3 text-slate-400 font-medium">
                ${kat.detaylar.map(d => `
                    <li class="flex items-center gap-3">
                        <div class="w-1 h-1 bg-orange-600 rounded-full"></div>
                        ${d}
                    </li>
                `).join('')}
            </ul>
        </div>
    `).join('');
}

document.addEventListener('DOMContentLoaded', initializeSite);
