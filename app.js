document.addEventListener("DOMContentLoaded", () => {
    const title = document.getElementById("title");
    const subtitle = document.getElementById("subtitle");
    const mainEmoji = document.getElementById("mainEmoji");
    const actions = document.getElementById("actions");
    const mainBtn = document.getElementById("mainBtn");
    const floaters = document.querySelector(".floaters");

    let noCount = 0;
    let yesScale = 1;

    const noTexts = [
        { t: "Fakt ne? 🥺", s: "Zkus to znovu..." },
        { t: "Jsi si jistý…? 😿", s: "Možná ses jen uklikl." },
        { t: "Já budu smutná… 🥲", s: "Prosím, přemýšlej o tom." },
        { t: "Poslední šance! 💗", s: "Tlačítko NE se začíná bát." },
        { t: "Aha! Tak teď ho zkus chytit! 😼", s: "Hodně štěstí..." }
    ];

    function spawnHearts() {
        const icons = ["💗", "💖", "✨", "🌸", "🐾"];
        for (let i = 0; i < 30; i++) {
            const heart = document.createElement("div");
            heart.className = "floater";
            heart.textContent = icons[Math.floor(Math.random() * icons.length)];
            heart.style.left = Math.random() * 100 + "vw";
            heart.style.fontSize = (15 + Math.random() * 20) + "px";
            heart.style.animationDuration = (2 + Math.random() * 3) + "s";
            heart.style.opacity = Math.random();
            floaters.appendChild(heart);
            setTimeout(() => heart.remove(), 4000);
        }
    }

    function updateStage(t, s, emoji) {
        title.textContent = t;
        subtitle.textContent = s;
        if(emoji) mainEmoji.textContent = emoji;
    }

    function handleNo() {
        noCount++;
        yesScale += 0.2; // Zvětší ANO tlačítko
        
        if (noCount <= noTexts.length) {
            const info = noTexts[noCount - 1];
            updateStage(info.t, info.s);
            renderButtons(noCount >= noTexts.length);
        }
    }

    function handleYes() {
        updateStage("Jupííí! 😽💘", "Děkuju moc! Až bude líp, zajdeme na randíčko. (Platí!) 😇", "😽");
        actions.innerHTML = `<button class="btn btn-primary">💗 Miluju! 💗</button>`;
        spawnHearts();
    }

    function renderButtons(isRunaway = false) {
        actions.innerHTML = '';
        
        const yesBtn = document.createElement("button");
        yesBtn.className = "btn btn-primary";
        yesBtn.textContent = "ANO";
        yesBtn.style.transform = `scale(${yesScale})`;
        yesBtn.onclick = handleYes;

        const noBtn = document.createElement("button");
        noBtn.className = "btn btn-secondary";
        noBtn.textContent = "NE";

        if (isRunaway) {
            noBtn.classList.add("btn-runaway");
            const moveNo = () => {
                const x = Math.random() * (window.innerWidth - 100);
                const y = Math.random() * (window.innerHeight - 50);
                noBtn.style.left = `${x}px`;
                noBtn.style.top = `${y}px`;
            };
            noBtn.onmouseover = moveNo;
            noBtn.ontouchstart = moveNo;
        } else {
            noBtn.onclick = handleNo;
        }

        actions.appendChild(yesBtn);
        actions.appendChild(noBtn);
    }

    mainBtn.onclick = () => {
        updateStage("Budeš můj Valentýn?", "Mám na tebe jednu důležitou otázku... 😳", "😺");
        renderButtons();
    };
});