// 1. Slider Verileri
const sliderData = [
    { baslik: "PRO-SERIES 750", alt: "Ağır Hizmet Taktik Bot", img: "https://images.unsplash.com/photo-1544413647-ad348270543e?q=80&w=1920" },
    { baslik: "TWIN POWER ENGINE", alt: "Çift Motorlu İtki Sistemleri", img: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=1920" },
    { baslik: "SMART DIAGNOSTICS", alt: "AI Destekli Marin Yazılımları", img: "https://images.unsplash.com/photo-1605281317010-fe5ffe798166?q=80&w=1920" }
];

// 2. Ürün Kataloğu Verileri (15 Ürünlük Liste Örneği)
const products = {
    botlar: [
        { ad: "Patrol-X 450", detay: "Hypalon / Derin V", fiyat: "Teklif Al" },
        { ad: "Patrol-X 550", detay: "Askeri Gri / 1670 Dtex", fiyat: "Teklif Al" },
        { ad: "Storm-RIB 620", detay: "Profesyonel Dalgıç Tipi", fiyat: "Teklif Al" },
        { ad: "Storm-RIB 750", detay: "Arama Kurtarma Özel", fiyat: "Teklif Al" },
        { ad: "Master-RIB 850", detay: "Yat Tender / Lüks Seri", fiyat: "Teklif Al" },
        { ad: "Master-RIB 1100", detay: "Çift Motor Uyumlu Cabin", fiyat: "Teklif Al" },
        { ad: "Commando 500", detay: "Katlanabilir Taban / Ağır Hizmet", fiyat: "Teklif Al" }
        // Buraya 15'e kadar bot eklenebilir...
    ],
    motorlar: [
        { ad: "V6 250HP Outboard", detay: "Dijital Gaz / Vites", fiyat: "Teklif Al" },
        { ad: "V8 450HP Racing", detay: "Yüksek Performans / Tork", fiyat: "Teklif Al" },
        { ad: "115HP Pro-Line", detay: "Ekonomik Ticari Seri", fiyat: "Teklif Al" },
        { ad: "150HP Sea-Drive", detay: "AI Yakıt Tasarruflu", fiyat: "Teklif Al" }
        // Buraya 15'e kadar motor eklenebilir...
    ],
    aksesuar: [
        { ad: "Smart Trim AI", detay: "Otomatik Denge Sistemi", fiyat: "Teklif Al" },
        { ad: "Diagnostic HUB", detay: "Mobil Takip Arıza Tespit", fiyat: "Teklif Al" }
    ]
};

// Fonksiyon: Slider'ı Yükle
function initSlider() {
    const wrapper = document.getElementById('slider-wrapper');
    wrapper.innerHTML = sliderData.map(s => `
        <div class="swiper-slide" style="background-image: url('${s.img}')">
            <div class="slide-overlay"></div>
            <div class="relative z-10 text-center">
                <h2 class="text-6xl md:text-8xl font-black text-white italic tracking-tighter">${s.baslik}</h2>
                <p class="text-orange-500 font-bold tracking-[0.4em] mt-4 uppercase text-xs">${s.alt}</p>
            </div>
        </div>
    `).join('');

    new Swiper(".mySwiper", {
        loop: true,
        autoplay: { delay: 4000 },
        navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
        pagination: { el: ".swiper-pagination", clickable: true }
    });
}

// Fonksiyon: Ürünleri Filtrele ve Bas
function filterProducts(category) {
    const grid = document.getElementById('product-grid');
    const btns = document.querySelectorAll('.filter-btn');
    
    // Aktif Buton Efekti
    btns.forEach(btn => btn.classList.remove('active'));
    event?.target?.classList?.add('active');

    grid.innerHTML = products[category].map(p => `
        <div class="product-card animate__animated animate__fadeIn">
            <div class="product-img-placeholder"><i class="fa-solid fa-ship fa-2xl opacity-10"></i></div>
            <h4 class="text-white font-bold uppercase tracking-tighter text-lg">${p.ad}</h4>
            <p class="text-slate-600 text-[10px] mt-1 tracking-widest uppercase">${p.detay}</p>
            <div class="mt-6 flex justify-between items-center">
                <span class="text-orange-600 font-black text-xs uppercase">${p.fiyat}</span>
                <i class="fa-solid fa-arrow-right text-slate-800"></i>
            </div>
        </div>
    `).join('');
}

// Başlat
document.addEventListener('DOMContentLoaded', () => {
    initSlider();
    filterProducts('botlar'); // İlk açılışta botları göster
});
