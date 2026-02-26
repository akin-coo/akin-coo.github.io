const marineData = {
    botlar: [
        { name: "Axis 3.1", desc: "Lüks yat tender çözümü.", img: "https://via.placeholder.com/400x300/111/fff?text=Axis+3.1" },
        { name: "Axis 4.8", desc: "Aile tipi konforlu RIB.", img: "https://via.placeholder.com/400x300/111/fff?text=Axis+4.8" },
        { name: "Orion 6", desc: "Sportif sürüş ve hız odaklı.", img: "https://via.placeholder.com/400x300/111/fff?text=Orion+6" },
        // ... Buraya 10-15 tane bot objesi ekleyebilirsin
    ],
    motorlar: [
        { name: "V8 450HP Racing", desc: "Maksimum itki ve performans.", img: "https://via.placeholder.com/400x300/111/fff?text=V8+450HP" },
        { name: "V6 250HP Pro", desc: "Ticari kullanım için dayanıklı.", img: "https://via.placeholder.com/400x300/111/fff?text=V6+250HP" },
        // ... Buraya 10 tane motor objesi eklenebilir
    ],
    ekipman: [
        { name: "Garmin Radar", desc: "Gece görüşü ve navigasyon.", img: "https://via.placeholder.com/400x300/111/fff?text=Radar" },
        { name: "Şok Emici Koltuk", desc: "Yüksek hızda konforlu sürüş.", img: "https://via.placeholder.com/400x300/111/fff?text=Seat" },
    ]
};

// Sayfa yüklendiğinde varsayılan botları göster
window.onload = () => {
    // Örnek olarak Botlar kategorisine 10 ürün dolduralım
    for(let i=1; i<=10; i++) {
        if(i > 3) marineData.botlar.push({ name: `Model X-${i}`, desc: "Profesyonel denizci ekipmanı.", img: "https://via.placeholder.com/400x300/111/fff?text=Pro+Bot" });
    }
    showCategory('botlar');
};

function showCategory(cat) {
    const container = document.getElementById('product-container');
    const title = document.getElementById('category-title');
    const info = document.getElementById('category-info');

    title.innerText = cat.toUpperCase();
    info.innerText = `${cat} kategorisinde en iyi çözümleri sunuyoruz.`;
    container.innerHTML = "";

    marineData[cat].forEach(item => {
        container.innerHTML += `
            <div class="card">
                <div class="card-img"><img src="${item.img}"></div>
                <div class="card-content">
                    <h4>${item.name}</h4>
                    <p>${item.desc}</p>
                </div>
            </div>
        `;
    });
}
