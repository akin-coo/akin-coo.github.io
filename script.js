const products = [
    {
        title: "Tactical RIB Serisi",
        icon: "fa-ship",
        desc: "Yüksek hızlı devriye ve özel operasyonlar için tasarlanmış derin V gövde RIB botlar.",
        specs: ["Hypalon Tüp Yapısı", "7-12 Metre Seçenekleri", "Şok Emici Koltuklar"]
    },
    {
        title: "Dıştan Takma Güç",
        icon: "fa-engine",
        desc: "Pro-RIB modelleri için optimize edilmiş çift ve üçlü motor kurulum çözümleri.",
        specs: ["300HP - 600HP Seçenekleri", "Dijital Gaz & Vites", "Joystick Kontrolü"]
    },
    {
        title: "Marin Navigasyon",
        icon: "fa-compass",
        desc: "Ağır hizmet tipi sonar, radar ve termal kamera entegre sistemleri.",
        specs: ["Dokunmatik Chartplotter", "Gece Görüş Analizi", "Otomatik Pilot"]
    },
    {
        title: "AI Verim Paketi",
        icon: "fa-microchip",
        desc: "Gövde direncini minimize eden ve yakıt tüketimini anlık optimize eden yazılım.",
        specs: ["Trim Optimizasyonu", "Anlık Yakıt Takibi", "Motor Sağlık İzleme"]
    }
];

function loadProducts() {
    const container = document.getElementById('category-container');
    if (!container) return;

    container.innerHTML = products.map((p, i) => `
        <div class="category-card animate__animated animate__fadeInUp" style="animation-delay: ${i * 0.15}s">
            <i class="fa-solid ${p.icon}"></i>
            <h3 class="text-2xl italic">${p.title}</h3>
            <p>${p.desc}</p>
            <ul class="space-y-3">
                ${p.specs.map(s => `
                    <li class="flex items-center gap-3 text-[10px] font-bold text-white uppercase tracking-widest">
                        <div class="w-1.5 h-1.5 bg-orange-600"></div>
                        ${s}
                    </li>
                `).join('')}
            </ul>
        </div>
    `).join('');
}

document.addEventListener('DOMContentLoaded', loadProducts);
