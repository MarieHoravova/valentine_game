document.addEventListener("DOMContentLoaded",()=>{
  const title=document.getElementById("title");
  const subtitle=document.getElementById("subtitle");
  const mainEmoji=document.getElementById("mainEmoji");
  const actions=document.getElementById("actions");
  const mainBtn=document.getElementById("mainBtn");
  const floaters=document.querySelector(".floaters");

  let noCount=0;

  const stages=[
    { big:"Budeš můj Valentýn? 🥹", small:"", emoji:"😘" },
    { big:"Fakt ne? 💔", small:"", emoji:"🥺" },
    { big:"To fakt? 🙄", small:"", emoji:"🥲" },
    { big:"Ale já budu smutná 🥲", small:"", emoji:"😥" },
    { big:"Ještě ti dám šanci ❤️‍🩹", small:"", emoji:"🥺" },
    { big:"AHA!!", small:"", emoji:"🙄", run:true }
  ];

  function spawnHearts(){
    if(!floaters){return;}
    const icons=["💗","💖","✨","🌸","🐾","💘"];
    for(let i=0;i<34;i++){
      const el=document.createElement("div");
      el.className="floater";
      el.textContent=icons[Math.floor(Math.random()*icons.length)];
      el.style.left=(Math.random()*100)+"vw";
      el.style.top="-6vh";
      el.style.fontSize=(18+Math.random()*26)+"px";
      el.style.animationDuration=(2.2+Math.random()*2.6)+"s";
      floaters.appendChild(el);
      setTimeout(()=>el.remove(),4200);
    }
  }

  function setStage(big,small,emoji){
    title.classList.remove("fade-in");
    void title.offsetWidth;
    title.classList.add("fade-in");
    title.textContent=big;
    subtitle.textContent=small || "";
    if(emoji){mainEmoji.textContent=emoji;}
  }

  function renderButtons(isRunaway){
    actions.innerHTML="";

    const yesBtn=document.createElement("button");
    yesBtn.className="btn btn-primary";
    yesBtn.textContent="ANO";
    yesBtn.addEventListener("click",handleYes);

    const noBtn=document.createElement("button");
    noBtn.className="btn btn-secondary";
    noBtn.textContent="NE";

    actions.appendChild(yesBtn);
    
    if(isRunaway){
      // Změna: Přidáme tlačítko přímo do karty, ne do actions, 
      // aby mohlo létat přes celou bílou plochu
      const card = document.getElementById("card");
      card.appendChild(noBtn);
      
      noBtn.classList.add("btn-runaway");
      placeNoInside(noBtn,true);

      const dodge=(e)=>{
        e.preventDefault();
        placeNoInside(noBtn,false);
      };

      noBtn.addEventListener("pointerdown",dodge,{passive:false});
      noBtn.addEventListener("pointerenter",()=>placeNoInside(noBtn,false));
      noBtn.addEventListener("click",dodge);
    } else {
      actions.appendChild(noBtn);
      noBtn.addEventListener("click",handleNo);
    }
  }

  function placeNoInside(noBtn, isFirst) {
    const card = document.getElementById("card");
    const cw = card.clientWidth;
    const ch = card.clientHeight;
    const bw = noBtn.offsetWidth || 120;
    const bh = noBtn.offsetHeight || 50;

    const pad = 20; // Odsazení od okrajů karty

    let x, y;

    if (isFirst) {
      // Na začátku ho dáme doprostřed spodní části
      x = (cw - bw) / 2;
      y = ch - bh - 60;
    } else {
      // Pak už lítá náhodně po CELÉ bílé ploše karty
      x = pad + Math.random() * (cw - bw - 2 * pad);
      y = pad + Math.random() * (ch - bh - 2 * pad);
      
      // Malý trik: Pokud by mělo tlačítko skočit přímo pod prst/kurzor, 
      // přičteme kousek navíc, aby to vypadalo, že opravdu uhýbá
      const yesBtn = document.querySelector(".btn-primary");
      const rect = yesBtn.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();
      
      // Kontrola, aby neskočilo přesně na tlačítko ANO (nepovinné, ale UX přívětivé)
      const yesX = rect.left - cardRect.left;
      const yesY = rect.top - cardRect.top;
      
      if (x > yesX - 20 && x < yesX + rect.width + 20 && y > yesY - 20 && y < yesY + rect.height + 20) {
          y = pad; // Pokud by se krylo s ANO, hodíme ho nahoru
      }
    }

    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
  }

  function handleNo(){
    noCount++;
    const nextIdx=Math.min(noCount, stages.length-1);
    const st=stages[nextIdx];
    setStage(st.big, st.small, st.emoji);
    renderButtons(!!st.run);
  }

  function handleYes() {
    const card = document.getElementById("card");
    card.classList.add("card--centered");
    
    // TATO ČÁST: Zmenšíme prostor pod textem, aby nebyl tak prázdný
    actions.classList.add("actions--final");

    subtitle.classList.add("final-subtitle");
    setStage("", "Až ti bude líp, zajdeme na randíčko 😇", "😚");
    
    actions.innerHTML = '<div class="final-message" id="thanks">Milískuju tě! 💗</div>';
      // Odstraníme NE tlačítko, pokud by náhodou zůstalo viset v kartě
      const runBtn = card.querySelector(".btn-runaway");
      if(runBtn) runBtn.remove();

      // Efekty srdíček
      spawnHearts();
      document.getElementById("thanks").addEventListener("click", spawnHearts);
      
      setTimeout(spawnHearts, 500);
      setTimeout(spawnHearts, 1000);
  }

  mainBtn.addEventListener("click",()=>{
    noCount=0;
    const firstStage=stages[0];
    setStage(firstStage.big, firstStage.small, firstStage.emoji);
    renderButtons(false);
  });
});
