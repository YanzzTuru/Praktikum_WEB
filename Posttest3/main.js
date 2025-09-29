window.addEventListener("load", () => {
    const loader = document.createElement("div");
    loader.id = "loader";
    loader.innerHTML = `<div class="spinner"></div>`;
    document.body.appendChild(loader);

    setTimeout(() => {
        loader.classList.add("fade-out");
        setTimeout(() => loader.remove(), 600);
    }, 1500);
});

const hiddenElements = document.querySelectorAll('.hidden');
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('show');
            }, i * 150);
        }
    });
}, { threshold: 0.2 });

hiddenElements.forEach(el => observer.observe(el));


document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', function(e) {
        if (this.getAttribute('href').startsWith("#")) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href'))
                .scrollIntoView({ behavior: 'smooth' });
        }
    });
});


const backToTop = document.createElement('button');
backToTop.id = 'backToTop';
backToTop.innerHTML = '⬆';
document.body.appendChild(backToTop);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});


document.querySelector('.simulasi-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const hargaMotor = {
        vario160: 26000000,
        pcx160: 32000000,
        cbr150r: 36000000,
        beat: 18000000,
        scoopy: 21500000,
        supra: 20000000,
        revo: 16000000,
        adv160: 36000000,
        crf150l: 34500000,
        cb150r: 30000000
    };

    const model = document.getElementById('model').value;
    const dp = parseInt(document.getElementById('dp').value);
    const tenor = parseInt(document.getElementById('tenor').value);

    if (!model || isNaN(dp) || !tenor) {
        alert('⚠️ Mohon isi semua form!');
        return;
    }

    const harga = hargaMotor[model];
    if (dp >= harga) {
        alert("DP tidak boleh lebih besar atau sama dengan harga motor!");
        return;
    }

    const sisa = harga - dp;
    const cicilan = Math.ceil(sisa / tenor);

    let hasil = document.querySelector('#hasilSimulasi');
    if (!hasil) {
        hasil = document.createElement('div');
        hasil.id = 'hasilSimulasi';
        hasil.className = 'hasil-box';
        this.appendChild(hasil);
    }

    hasil.innerHTML = `
    📌 Harga Motor: <b>Rp ${harga.toLocaleString()}</b> <br>
    💰 Uang Muka (DP): Rp ${dp.toLocaleString()} <br>
    📆 Tenor: ${tenor} bulan <br>
    ➡️ Cicilan per Bulan: <span class="cicilan">Rp ${cicilan.toLocaleString()}</span>
  `;

    showToast("✅ Simulasi kredit berhasil dihitung!");
});


document.querySelectorAll('.produk-item img').forEach(img => {
    img.style.transition = "transform 0.5s ease, box-shadow 0.3s ease";

    img.addEventListener('mouseenter', () => {
        img.style.transform = "scale(1.1)";
        img.style.boxShadow = "0 10px 25px rgba(0,0,0,0.3)";
    });

    img.addEventListener('mouseleave', () => {
        img.style.transform = "scale(1)";
        img.style.boxShadow = "none";
    });
});


const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
});

const toggleBtn = document.createElement("button");
toggleBtn.id = "darkModeBtn";
toggleBtn.innerHTML = "🌙";
document.body.appendChild(toggleBtn);

toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    toggleBtn.innerHTML = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
});

function showToast(message) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerText = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add("show");
    }, 100);

    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}