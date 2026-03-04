const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTh9yxv6g0Hz0prdHSICMZnQ8O_-2tMz6FLg3Qe-ixdNGsnXjXjtN7dsNRh5VC3JMhP3kp8nnz6MgY3/pub?output=csv';

let items = [];
const sliderImages = ['https://northstar.boats/assets/img/about-us-banner.webp', 'https://northstar.boats/assets/img/orion-8.webp', 'https://northstar.boats/assets/img/ion-12.webp'];

async function init() {
    const track = document.getElementById('heroTrack');
    if(track) {
        track.innerHTML = sliderImages.map(img => `<div class="slide" style="background-image:url('${img}')"></div>`).join('');
        let slideIdx = 0;
        setInterval(() => { slideIdx = (slideIdx + 1) % sliderImages.length; track.style.transform = `translateX(-${slideIdx * 100}%)`; }, 5000);
    }

    try {
        const res = await fetch(csvUrl);
        const data = await res.text();
        const rows = data.split(/\r?\n/).filter(row => row.trim() !== "");
        
        items = rows.slice(1).map((row, i) => {
            const r = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
            let dynamicSpecs = [];
            for (let j = 7; j <= 17; j += 2) {
                if(r[j] && r[j+1] && r[j].trim() !== "") {
                    dynamicSpecs.push({ key: r[j].replace(/"/g, "").trim(), val: r[j+1].replace(/"/g, "").trim() });
                }
            }
            return {
                id: i,
                name: r[1]?.replace(/"/g, ""),
                cat: r[2]?.replace(/"/g, "").toUpperCase().trim() || 'DİĞER',
                desc: r[3]?.replace(/"/g, ""),
                images: [r[4], r[5], r[6]].map(u => u?.replace(/"/g, "").trim()).filter(u => u && u.length > 5),
                specs: dynamicSpecs
            };
        }).filter(x => x.name);

        createCategoryMenu();
        renderList(items);
    } catch (err) { console.error("Data error:", err); }
}

function createCategoryMenu() {
    const menu = document.getElementById('categoryMenu');
    if(!menu) return;
    const categories = ['HEPSİ', ...new Set(items.map(item => item.cat))];
    menu.innerHTML = categories.map(cat => `
        <button class="f-btn ${cat === 'HEPSİ' ? 'active' : ''}" onclick="filterData('${cat}')">${cat}</button>
    `).join('');
}

function renderList(data) {
    const grid = document.getElementById('productGrid');
    if(!grid) return;
    grid.innerHTML = data.map(p => `
        <div class="p-card" onclick="openProduct(${p.id})">
            <div class="p-img-box"><img src="${p.images[0]}" onerror="this.src='https://via.placeholder.com/400x300'"></div>
            <span style="color:var(--primary); font-size:10px; font-weight:800; letter-spacing:1px; display:block; padding: 0 10px;">${p.cat}</span>
            <h3 style="padding: 0 10px; font-size: 16px;">${p.name}</h3>
        </div>
    `).join('');
}

window.moveGallery = function(idx) {
    const track = document.getElementById('modalTrack');
    const dots = document.querySelectorAll('.dot');
    if(track) track.style.transform = `translateX(-${idx * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === idx));
};

function openProduct(id) {
    const p = items.find(x => x.id == id);
    const modal = document.getElementById('productModal');
    const content = document.getElementById('modalContent');
    if(!p) return;

    const galleryImgs = p.images.map((img, i) => `<img src="${img}" onclick="moveGallery(${(i + 1) % p.images.length})">`).join('');
    const galleryDots = p.images.map((_, i) => `<div class="dot ${i===0?'active':''}" onclick="event.stopPropagation(); moveGallery(${i})"></div>`).join('');
    const specsHTML = p.specs.map(s => `<div class="spec-item"><span>${s.key}</span><strong>${s.val}</strong></div>`).join('');

    content.innerHTML = `
        <div class="modal-gallery-side">
            <div class="gallery-track" id="modalTrack">${galleryImgs}</div>
            <div class="gallery-dots">${galleryDots}</div>
        </div>
        <div class="modal-info-side">
            <div>
                <span style="color:var(--primary); font-size:10px; font-weight:800; letter-spacing:2px;">NORTHSTAR</span>
                <h2 style="font-size:2rem; margin:10px 0; line-height:1.1;">${p.name}</h2>
                <p style="color:#666; font-size:14px; line-height:1.5; margin-bottom:15px;">${p.desc}</p>
                <div class="spec-list">${specsHTML}</div>
            </div>
            <div class="offer-box">
                <p style="font-size:11px; color:#666; font-weight:700;">TEKLİF ALMAK İÇİN ULAŞIN:</p>
                <div class="offer-btns">
                    <a href="https://wa.me/905XXXXXXXXX?text=${p.name} hakkında bilgi istiyorum." class="btn-cta wa-btn" target="_blank">WHATSAPP</a>
                    <a href="mailto:info@prorib.com.tr" class="btn-cta mail-btn">E-POSTA</a>
                </div>
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

window.filterData = function(cat) {
    document.querySelectorAll('.f-btn').forEach(btn => btn.classList.toggle('active', btn.innerText === cat));
    renderList(cat === 'HEPSİ' ? items : items.filter(x => x.cat === cat));
};

window.onscroll = () => { document.getElementById('mainNav')?.classList.toggle('scrolled', window.scrollY > 50); };
init();
