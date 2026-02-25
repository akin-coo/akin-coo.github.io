const services = [
    {
        title: "Lüks Yat Satış",
        icon: "fa-ship",
        desc: "Sıfır ve ikinci el premium yat portföyü için teknik ekspertiz ve danışmanlık.",
        points: ["Ekspertiz Raporu", "Pazar Analizi", "Gövde Kondisyon Takibi"]
    },
    {
        title: "Yüksek Güçlü Motorlar",
        icon: "fa-engine",
        desc: "MTU, Caterpillar ve Cummins motor gruplarında yüksek performans çözümleri.",
        points: ["Ağır Bakım (W6)", "Turbo Değişim", "Emisyon Optimizasyonu"]
    },
    {
        title: "İtki Teknolojileri",
        icon: "fa-fan",
        desc: "Yüksek hızlı tekneler için karbon fiber şaft ve özel pervane tasarımları.",
        points: ["Kavite Analizi", "Sessiz Sürüş Ayarları", "Yüksek Hız Kararlılığı"]
    },
    {
        title: "AI Yat Otomasyonu",
        icon: "fa-microchip",
        desc: "Yatınızın tüm sistemlerini tek bir akıllı merkezden yöneten RPA çözümleri.",
        points: ["Otonom İzleme", "Yakıt Verimliliği", "Akıllı Güvenlik"]
    }
];

function loadServices() {
    const container = document.getElementById('category-container');
    if (!container) return;

    container.innerHTML = services.map((item, i) => `
        <div class="category-card group animate__animated animate__fadeInUp" style="animation-delay: ${i * 0.1}s">
            <div class="mb-10 text-orange-600 text-4xl transition-transform duration-700 group-hover:scale-110">
                <i class="fa-solid ${item.icon}"></i>
            </div>
            <h3 class="text-2xl font-bold text-white mb-4 serif-font uppercase tracking-tighter">${item.title}</h3>
            <p class="text-sm text-slate-500 mb-8 leading-relaxed font-light">${item.desc}</p>
            <ul class="space-y-4">
                ${item.points.map(p => `
                    <li class="flex items-center gap-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                        <span class="w-1 h-1 bg-orange-600"></span>
                        ${p}
                    </li>
                `).join('')}
            </ul>
        </div>
    `).join('');
}

document.addEventListener('DOMContentLoaded', loadServices);
