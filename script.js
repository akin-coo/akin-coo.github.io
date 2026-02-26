// Slider Verileri (Northstar Tarzı Görseller)
const slides = [
    { title: "AXIS 4.8", sub: "YENİ NESİL TENDER", img: "https://images.unsplash.com/photo-1544413647-ad348270543e?q=80&w=1920" },
    { title: "ORION 7", sub: "DENİZLERİN YENİ HAKİMİ", img: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=1920" },
    { title: "ION 12", sub: "SINIRSIZ GÜÇ VE LÜKS", img: "https://images.unsplash.com/photo-1605281317010-fe5ffe798166?q=80&w=1920" }
];

// Kapsamlı Ürün Kataloğu
const catalog = {
    axis: [
        { ad: "Axis 3.1", specs: "L: 3.10m | 20-30 HP", img: "https://images.unsplash.com/photo-1517055727180-d1a978355448?q=80&w=800" },
        { ad: "Axis 3.4", specs: "L: 3.40m | 25-40 HP", img: "https://images.unsplash.com/photo-1517055727180-d1a978355448?q=80&w=800" },
        { ad: "Axis 4.8", specs: "L: 4.80m | 60-90 HP", img: "https://images.unsplash.com/photo-1517055727180-d1a978355448?q=80&w=800" },
        { ad: "Axis 5.3", specs: "L: 5.30m | 90-115 HP", img: "https://images.unsplash.com/photo-1517055727180-d1a978355448?q=80&w=800" }
    ],
    ion: [
        { ad: "Ion 10", specs: "L: 10.10m | 2x300 HP", img: "https://images.unsplash.com/photo-1605281317010-fe5ffe798166?q=80&w=800" },
        { ad: "Ion 12", specs: "L: 12.50m | 3x450 HP", img: "https://images.unsplash.com/photo-1605281317010-fe5ffe798166?q=80&w=800" }
    ],
    orion: [
        { ad: "Orion 6", specs: "L: 6.20m | 150-200 HP", img: "https://images.unsplash.com/photo-1544413647-ad348270543e?q=80&w=800" },
        { ad: "Orion 7", specs: "L: 7.20m | 200-300 HP", img: "https://images.unsplash.com/photo-1544413647-ad348270543e?q=80&w=800" },
        { ad: "Orion 8", specs: "L: 8.40m | 300-450 HP", img: "https://images.unsplash.com/photo-1544413647-ad348270543e?q=80&w=800" }
    ],
    motorlar: [
        { ad: "V8 450HP Pro", specs: "Heavy Duty Outboard", img: "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?q=80&w=800" },
        { ad: "V6 250HP Marine", specs: "Fuel Efficient AI", img: "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?q=80&w=800" }
    ]
};

// Fonksiyonlar
function initMainSlider() {
    const swiperWrapper = document.getElementById('hero-slider');
    swiperWrapper.innerHTML = slides.map(s => `
        <div class="swiper-slide relative">
            <img src="${s.img}" class="w-full h-full object-cover">
            <div class="absolute inset-0 bg-black/40"></div>
            <div class="absolute left-12 bottom-32 max-w-2xl text-left">
                <span class="text-orange-600 font-bold tracking-[0.6em] text-xs mb-4 block">${s.sub}</span>
                <h2 class="text-8xl font-black italic tracking-tighter leading-none">${s.title}</h2>
            </div>
        </div>
    `).join('');

    new Swiper(".mainSlider", {
        loop: true,
        effect: "fade",
        autoplay: { delay: 5000 },
        pagination: { el: ".swiper-pagination", clickable: true }
    });
}

function filterProducts(cat) {
    const grid = document.getElementById('product-grid');
    const btns = document.querySelectorAll('.filter-btn');
    
    btns.forEach(b => b.classList.remove('active'));
    event?.target?.classList?.add('active');

    grid.innerHTML = catalog[cat].map(p => `
        <div class="product-card group">
            <div class="product-img-box">
                <img src="${p.img}" alt="${p.ad}">
                <div class="absolute top-4 right-4 text-[10px] font-bold bg-white text-black px-3 py-1 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition">İncele</div>
            </div>
            <h4>${p.ad}</h4>
            <p class="text-[10px] tracking-[0.3em] text-zinc-600 uppercase mt-2 font-bold">${p.specs}</p>
        </div>
    `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
    initMainSlider();
    filterProducts('axis');
});
