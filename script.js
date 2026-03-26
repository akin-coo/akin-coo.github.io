const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTh9yxv6g0Hz0prdHSICMZnQ8O_-2tMz6FLg3Qe-ixdNGsnXjXjtN7dsNRh5VC3JMhP3kp8nnz6MgY3/pub?output=csv';
const whatsappNumber = "905XXXXXXXXX"; // Buraya amcanın numarasını yaz!

let items = [];
const sliderImages = ['https://northstar.boats/assets/img/about-us-banner.webp', 'https://northstar.boats/assets/img/orion-8.webp', 'https://northstar.boats/assets/img/ion-12.webp'];

window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => loader.style.display = 'none', 600);
    }, 1200);
});

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
            const clean = (str) => str ? str.replace(/^"|"$/g, "").trim() : "";
            let specs = [];
            for (let j = 11; j <= 40; j += 2) {
                if(r[j] && r[j+1] && clean(r[j]) !== "") specs.push({ k: clean(r[j]), v: clean(r[j+1]) });
            }
            return {
                id: i,
                brand: clean(r[1]) || "MARINE",
                name: clean(r[2]),
                cat: clean(r[3]).toUpperCase(),
                desc: clean(r[4]),
                images: [r[5], r[6], r[7], r[8], r[9], r[10]].map(u => clean(u)).filter(u => u && u.length > 5),
                specs: specs,
                slug: clean(r[2]).toLowerCase().replace(/[^a-z0-9]/g, '-') // Daha temiz slug oluşturma
            };
        }).filter(x => x.name);

        createCategoryMenu();
        renderList(items);

        // SAYFA YÜKLENDİĞİNDE URL KONTROLÜ
        const params = new URLSearchParams(window.location.search);
        const productSlug = params.get('urun');
        if (productSlug) {
            const product = items.find(p => p.slug === productSlug);
            if (product) openProduct(product.id, false);
        }

    } catch (err) { console.error("CSV Hatası:", err); }
}

// Geri Tuşu Desteği
window.onpopstate = (e) => {
    if (document.getElementById('productModal').style.display === "block") {
        closeProduct(false);
    }
};

function createCategoryMenu() {
    const menu = document.getElementById('categoryMenu');
    if(!menu) return;
    const categories = ['HEPSİ', ...new Set(items.map(item => item.cat))];
    menu.innerHTML = categories.map(cat => `<button class="f-btn ${cat === 'HEPSİ' ? 'active' : ''}" onclick="filterData('${cat}')">${cat}</button>`).join('');
}

function renderList(data) {
    const grid = document.getElementById('productGrid');
    if(!grid) return;
    grid.innerHTML = data.map(p => `
        <div class="p-card" onclick="openProduct(${p.id})">
            <div class="p-img-box"><img src="${p.images[0]}" onerror="this.src='https://via.placeholder.com/400x300'"></div>
            <div style="padding: 0 10px;">
                <span style="color:var(--primary); font-size:10px; font-weight:800; letter-spacing:1px; display:block; text-transform:uppercase;">${p.brand} | ${p.cat}</span>
                <h3 style="font-size: 16px; margin-top:5px;">${p.name}</h3>
            </div>
        </div>
    `).join('');
}

function addDragSupport() {
    const track = document.getElementById('galleryTrack');
    if(!track) return;
    let isDown = false; let startX; let scrollLeft;
    track.addEventListener('mousedown', (e) => { isDown = true; track.style.scrollBehavior = 'auto'; startX = e.pageX - track.offsetLeft; scrollLeft = track.scrollLeft; track.style.cursor = 'grabbing'; });
    track.addEventListener('mouseleave', () => { isDown = false; });
    track.addEventListener('mouseup', () => { isDown = false; track.style.scrollBehavior = 'smooth'; track.style.cursor = 'grab'; const idx = Math.round(track.scrollLeft / track.offsetWidth); track.scrollTo({ left: track.offsetWidth * idx, behavior: 'smooth' }); });
    track.addEventListener('mousemove', (e) => { if(!isDown) return; e.preventDefault(); const x = e.pageX - track.offsetLeft; const walk = (x - startX) * 2; track.scrollLeft = scrollLeft - walk; });
}

window.openProduct = function(id, updateHistory = true) {
    const p = items.find(x => x.id == id);
    if(!p) return;

    // URL'Yİ GÜNCELLE (Deep Link & SEO)
    if (updateHistory) {
        const newUrl = window.location.origin + window.location.pathname + "?urun=" + p.slug;
        window.history.pushState({ urun: p.slug }, p.name, newUrl);
    }

    const modal = document.getElementById('productModal');
    const content = document.getElementById('modalContent');

    const galleryHTML = p.images.map((img, index) => `<img src="${img}" draggable="false" onclick="window.nextImage(${index}, ${p.images.length})">`).join('');
    const dotsHTML = p.images.map((_, i) => `<div class="dot ${i===0?'active':''}" onclick="scrollGallery(${i})"></div>`).join('');
    const specsHTML = p.specs.map(s => `<div class="spec-item"><span>${s.k}</span><strong>${s.v}</strong></div>`).join('');
    const waLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(p.brand + ' ' + p.name + ' hakkında bilgi almak istiyorum.')}`;

    content.innerHTML = `
        <div class="modal-gallery-side"><div class="gallery-track" id="galleryTrack" onscroll="updateDots()">${galleryHTML}</div><div class="gallery-dots">${dotsHTML}</div></div>
        <div class="modal-info-side">
            <div class="info-header">
                <span style="color:var(--primary); font-size:10px; font-weight:800; text-transform:uppercase;">${p.brand}</span>
                <h2 style="font-size:2.2rem; margin:10px 0; line-height:1.1;">${p.name}</h2>
                <p style="color:#666; font-size:14px; line-height:1.6;">${p.desc}</p>
                <div class="spec-list">${specsHTML}</div>
            </div>
            <div class="offer-box">
                <p style="font-size:11px; font-weight:800; color:var(--gray); margin-bottom:12px;">BİLGİ ALIN:</p>
                <div class="offer-btns">
                    <a href="${waLink}" target="_blank" class="btn-cta wa-btn"><i class="fab fa-whatsapp"></i> WHATSAPP</a>
                    <a href="mailto:info@prorib.com.tr?subject=${p.brand} ${p.name}" class="btn-cta mail-btn"><i class="fa-solid fa-envelope"></i> E-POSTA</a>
                </div>
            </div>
        </div>
    `;
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
    addDragSupport();
}

window.closeProduct = function(updateHistory = true) {
    document.getElementById('productModal').style.display = "none";
    document.body.style.overflow = "auto";
    if (updateHistory) {
        const homeUrl = window.location.origin + window.location.pathname;
        window.history.pushState({}, '', homeUrl);
    }
}

window.nextImage = function(currentIndex, totalImages) {
    const nextIndex = (currentIndex + 1) % totalImages;
    const track = document.getElementById('galleryTrack');
    if(track) track.scrollTo({ left: track.offsetWidth * nextIndex, behavior: 'smooth' });
}

window.scrollGallery = function(idx) { const track = document.getElementById('galleryTrack'); if(track) track.scrollTo({ left: track.offsetWidth * idx, behavior: 'smooth' }); }
window.updateDots = function() { const track = document.getElementById('galleryTrack'); const dots = document.querySelectorAll('.dot'); if(!track || dots.length === 0) return; const idx = Math.round(track.scrollLeft / track.offsetWidth); dots.forEach((d, i) => d.classList.toggle('active', i === idx)); }
window.filterData = function(cat) { document.querySelectorAll('.f-btn').forEach(btn => btn.classList.toggle('active', btn.innerText === cat)); renderList(cat === 'HEPSİ' ? items : items.filter(x => x.cat === cat)); };
window.onscroll = () => { const nav = document.getElementById('mainNav'); if(window.scrollY > 50) nav.classList.add('scrolled'); else nav.classList.remove('scrolled'); };

init();
