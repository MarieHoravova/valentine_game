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
    actions.appendChild(noBtn);

    if(isRunaway){
      noBtn.classList.add("btn-runaway");
      placeNoInside(noBtn,true);

      const dodge=(e)=>{
        e.preventDefault();
        placeNoInside(noBtn,false);
      };

      noBtn.addEventListener("pointerdown",dodge,{passive:false});
      noBtn.addEventListener("pointerenter",()=>placeNoInside(noBtn,false));
      noBtn.addEventListener("click",dodge);
    }else{
      noBtn.addEventListener("click",handleNo);
    }
  }

  function placeNoInside(noBtn,isFirst){
    const cw=actions.clientWidth;
    const ch=actions.clientHeight;
    const bw=noBtn.offsetWidth || 120;
    const bh=noBtn.offsetHeight || 50;

    const pad=10;
    const topSafe=90;

    
    const minX=pad;
    const maxX=Math.max(pad, cw - bw - pad);
    const minY=topSafe;
    const maxY=Math.max(topSafe, ch - bh - pad);

    let x,y;
    if(isFirst){
      x=(cw - bw)/2;
      y=Math.min(ch - bh - pad, topSafe + 40);
    }else{
      x=minX + Math.random()*(maxX - minX);
      y=minY + Math.random()*(maxY - minY);
    }

    x=Math.max(minX,Math.min(maxX,x));
    y=Math.max(minY,Math.min(maxY,y));

    noBtn.style.left=`${x}px`;
    noBtn.style.top=`${y}px`;
  }

  function handleNo(){
    noCount++;
    const nextIdx=Math.min(noCount, stages.length-1);
    const st=stages[nextIdx];
    setStage(st.big, st.small, st.emoji);
    renderButtons(!!st.run);
  }

    function handleYes(){
    // 1. Přidáme kartě třídu pro vycentrování
    const card = document.getElementById("card");
    card.classList.add("card--centered");

    // 2. Nastavíme texty a emoji
    setStage("","Až ti bude líp, zajdeme na randíčko 😇","😚");
    
    // 3. Vložíme finální vzkaz
    actions.innerHTML = '<div class="final-message" id="thanks">Milískuju tě! 💗</div>';
    
    // Efekty zůstávají
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
