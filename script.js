const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTh9yxv6g0Hz0prdHSICMZnQ8O_-2tMz6FLg3Qe-ixdNGsnXjXjtN7dsNRh5VC3JMhP3kp8nnz6MgY3/pub?output=csv';

let items = [];
const sliderImages = [
    'https://northstar.boats/assets/img/about-us-banner.webp',
    'https://northstar.boats/assets/img/orion-8.webp',
    'https://northstar.boats/assets/img/ion-12.webp'
];

async function startApp() {
    // 1. Hero Slider Kurulumu
    const track = document.getElementById('heroTrack');
    track.innerHTML = sliderImages.map(img => `<div class="slide" style="background-image:url('${img}')"></div>`).join('');
    
    let slideIdx = 0;
    setInterval(() => {
        slideIdx = (slideIdx + 1) % sliderImages.length;
        track.style.transform = `translateX(-${slideIdx * 100}%)`;
    }, 5000);

    // 2. Excel Verilerini Çekme
    try {
        const res = await fetch(csvUrl);
        const data = await res.text();
        const rows = data.split(/\r?\n/).map(row => row.split(','));
        
        items = rows.slice(1).map((r, i) => ({
            id: i,
            name: r[1],
            cat: r[2] ? r[2].toUpperCase().trim() : '',
            desc: r[3],
            img: r[4] ? r[4].trim() : 'https://via.placeholder.com/800',
            specs: r[5] // Excel'deki 6. sütun: Detaylar (Boy: 7m | En: 2m)
        })).filter(x => x.name);

        renderList(items);
    } catch (err) { console.error("Hata:", err); }
}

function renderList(data) {
    document.getElementById('productGrid').innerHTML = data.map(p => `
        <div class="p-card" onclick="openProduct(${p.id})">
            <div class="p-img-box"><img src="${p.img}"></div>
            <span>${p.cat}</span>
            <h3>${p.name}</h3>
        </div>
    `).join('');
}

function openProduct(id) {
    const p = items.find(x => x.id == id);
    const modal = document.getElementById('productModal');
    
    // Teknik Tablo Oluşturucu
    const specsHTML = p.specs ? p.specs.split('|').map(s => {
        const parts = s.split(':');
        return `<div class="spec-row">
            <span class="s-label">${parts[0] || ''}</span>
            <span class="s-value">${parts[1] || ''}</span>
        </div>`;
    }).join('') : '';

    document.getElementById('modalContent').innerHTML = `
        <div class="modal-visual">
            <img src="${p.img}">
            <p style="margin-top:50px; font-size:18px; line-height:1.8; color:#555;">${p.desc}</p>
        </div>
        <div class="modal-sticky-info">
            <span style="color:#f97316; font-weight:800; letter-spacing:4px; font-size:11px;">NORTHSTAR MARINE</span>
            <h2>${p.name}</h2>
            <div class="spec-table">${specsHTML}</div>
            <div class="modal-btns">
                <a href="https://wa.me/905XXXXXXXXX?text=${p.name} modeli hakkında fiyat teklifi almak istiyorum." class="btn-detail btn-wa">WHATSAPP</a>
                <a href="mailto:info@prorib.com.tr" class="btn-detail btn-dark">E-POSTA</a>
            </div>
        </div>
    `;
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
}

function closeProduct() {
    document.getElementById('productModal').style.display = "none";
    document.body.style.overflow = "auto";
}

function filterData(cat) {
    document.querySelectorAll('.f-btn').forEach(btn => {
        btn.classList.toggle('active', btn.innerText.includes(cat) || (cat === 'HEPSİ' && btn.innerText.includes('TÜM')));
    });
    renderList(cat === 'HEPSİ' ? items : items.filter(x => x.cat === cat));
}

window.onscroll = () => {
    document.getElementById('mainNav').classList.toggle('scrolled', window.scrollY > 80);
};

startApp();
