import { useState, useEffect, useRef } from "react";

const C = {
  bg: "#FDFCFA", white: "#FFF", warm: "#F5F2ED", dark: "#1C1C1C",
  text: "#2E2E2E", text2: "#6B6B6B", text3: "#9A9A9A",
  gold: "#A68B5B", goldL: "#C4AA7A",
  line: "rgba(0,0,0,0.07)",
};

/* visual placeholders — each with unique mood */
const V = {
  hero: "linear-gradient(135deg, #2C3E50 0%, #1a1a2e 40%, #16213e 100%)",
  clinic: "linear-gradient(160deg, #e8e0d4 0%, #d4c5b0 50%, #c9b896 100%)",
  chair: "linear-gradient(145deg, #dce3e8 0%, #b8c6d0 50%, #a3b5c4 100%)",
  doc: "linear-gradient(170deg, #e0ddd8 0%, #c4bfb6 60%, #b0a999 100%)",
  implant: "linear-gradient(155deg, #d6dee4 0%, #adbfcc 50%, #8ea8bc 100%)",
  ortho: "linear-gradient(140deg, #e2e8ec 0%, #c0d0dc 50%, #9fb8ca 100%)",
  gen: "linear-gradient(165deg, #e8e4de 0%, #d0c8bc 50%, #bfb3a2 100%)",
  wait: "linear-gradient(150deg, #ece8e0 0%, #ddd5c8 50%, #d0c4b0 100%)",
  surg: "linear-gradient(145deg, #dce0e4 0%, #c0c8d0 50%, #a8b4c0 100%)",
  consult: "linear-gradient(160deg, #e4e0dc 0%, #ccc4b8 50%, #b8ac9c 100%)",
  equip: "linear-gradient(135deg, #dee2e6 0%, #b8c4cc 50%, #98aab8 100%)",
  scan: "linear-gradient(155deg, #e0e4e8 0%, #c4ccd4 50%, #aab8c4 100%)",
  city: "linear-gradient(145deg, #2c3e50 0%, #34495e 40%, #1a2530 100%)",
  white: "linear-gradient(160deg, #f0ece4 0%, #e0d8cc 50%, #d4c8b4 100%)",
};

function useR(th=0.1){const r=useRef(null);const[v,s]=useState(false);useEffect(()=>{const e=r.current;if(!e)return;const o=new IntersectionObserver(([x])=>{if(x.isIntersecting){s(true);o.unobserve(e)}},{threshold:th});o.observe(e);return()=>o.disconnect()},[th]);return[r,v]}

function A({children,d=0,t="0.8s",from="translateY(36px)",style={}}){
  const[r,v]=useR();
  return <div ref={r} style={{opacity:v?1:0,transform:v?"none":from,transition:`opacity ${t} cubic-bezier(.16,1,.3,1) ${d}s, transform ${t} cubic-bezier(.16,1,.3,1) ${d}s`,...style}}>{children}</div>
}

/* Photo placeholder with mood gradient + subtle pattern + label */
function Photo({bg,label,style={},labelStyle={}}){
  return(
    <div style={{width:"100%",height:"100%",background:bg,position:"relative",overflow:"hidden",...style}}>
      <div style={{position:"absolute",inset:0,backgroundImage:`url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.04'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2l4 3.25-4 3.25zM0 20h2v20H0V20zm4 0h2v20H4V20z'/%3E%3C/g%3E%3C/svg%3E")`,opacity:0.5}} />
      {label && <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"40px 20px 16px",background:"linear-gradient(0deg, rgba(0,0,0,0.35) 0%, transparent 100%)",display:"flex",alignItems:"flex-end",...labelStyle}}>
        <span style={{fontFamily:"'Pretendard Variable',sans-serif",fontSize:11,color:"rgba(255,255,255,0.7)",letterSpacing:1}}>{label}</span>
      </div>}
    </div>
  )
}

/* ===== NAV ===== */
function Nav({page,go,sc}){
  const items=[{id:"home",l:"Home"},{id:"about",l:"의원소개"},{id:"doctor",l:"의료진"},{id:"treatments",l:"진료과목"},{id:"facility",l:"시설"},{id:"location",l:"오시는길"}];
  const show=sc||page!=="home";
  return(
    <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:999,background:show?"rgba(253,252,250,0.96)":"transparent",backdropFilter:show?"blur(16px)":"none",borderBottom:show?`1px solid ${C.line}`:"none",transition:"all 0.4s"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",maxWidth:1200,margin:"0 auto",height:64,padding:"0 clamp(20px,3.5vw,40px)"}}>
        <div onClick={()=>go("home")} style={{cursor:"pointer"}}>
          <span style={{fontFamily:"'DM Serif Display',serif",fontSize:22,color:show?C.dark:"#fff",letterSpacing:1,transition:"color 0.4s"}}>Art H</span>
        </div>
        <div className="nm" style={{display:"flex",alignItems:"center",gap:24}}>
          {items.map(m=>(
            <span key={m.id} onClick={()=>go(m.id)} style={{cursor:"pointer",fontSize:13,fontFamily:"'Pretendard Variable',sans-serif",color:page===m.id?C.gold:(show?C.text2:"rgba(255,255,255,0.75)"),fontWeight:page===m.id?600:400,transition:"color 0.3s"}}
              onMouseEnter={e=>e.target.style.color=C.gold} onMouseLeave={e=>{if(page!==m.id)e.target.style.color=show?C.text2:"rgba(255,255,255,0.75)"}}
            >{m.l}</span>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:800px){.nm{display:none!important}}`}</style>
    </nav>
  )
}

/* ===== SUB PAGE HEADER ===== */
function PH({title,bg}){
  const[ld,s]=useState(false);
  useEffect(()=>{s(false);setTimeout(()=>s(true),80)},[title]);
  return(
    <section style={{position:"relative",height:360,overflow:"hidden"}}>
      <Photo bg={bg} style={{position:"absolute",inset:0}} />
      <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.25)"}}/>
      <div style={{position:"relative",zIndex:2,height:"100%",display:"flex",alignItems:"flex-end",padding:"0 clamp(24px,5vw,80px) 56px"}}>
        <h1 style={{fontFamily:"'DM Serif Display',serif",fontSize:"clamp(36px,5vw,56px)",fontWeight:400,color:"#fff",margin:0,opacity:ld?1:0,transform:ld?"none":"translateY(24px)",transition:"all 0.9s cubic-bezier(.16,1,.3,1) 0.2s"}}>{title}</h1>
      </div>
    </section>
  )
}

/* ========== HOME ========== */
function Home({go}){
  const[ld,s]=useState(false);
  const[off,setOff]=useState(0);
  useEffect(()=>{setTimeout(()=>s(true),150);const f=()=>setOff(window.scrollY);window.addEventListener("scroll",f,{passive:true});return()=>window.removeEventListener("scroll",f)},[]);
  const[hov,setH]=useState(null);

  return(<>
    {/* HERO */}
    <section style={{position:"relative",height:"100vh",minHeight:600,overflow:"hidden"}}>
      <div style={{position:"absolute",inset:0,transform:`translateY(${off*0.1}px)`}}><Photo bg={V.hero} style={{height:"115%"}}/></div>
      <div style={{position:"absolute",inset:0,background:"linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 100%)"}}/> 
      <div style={{position:"relative",zIndex:2,height:"100%",display:"flex",flexDirection:"column",justifyContent:"flex-end",padding:"0 clamp(32px,6vw,100px) clamp(60px,10vh,120px)",maxWidth:1300,margin:"0 auto"}}>
        <p style={{opacity:ld?1:0,transition:"opacity 0.6s ease 0.4s",fontFamily:"'Pretendard Variable',sans-serif",fontSize:13,color:C.goldL,letterSpacing:4,marginBottom:20}}>송도 국제도시</p>
        <h1 style={{opacity:ld?1:0,transform:ld?"none":"translateY(30px)",transition:"all 1.2s cubic-bezier(.16,1,.3,1) 0.6s",fontFamily:"'DM Serif Display',serif",fontSize:"clamp(40px,7vw,80px)",fontWeight:400,color:"#fff",lineHeight:1.1,margin:"0 0 24px",maxWidth:600}}>
          치료가 예술이<br/>되는 곳.
        </h1>
        <p style={{opacity:ld?1:0,transform:ld?"none":"translateY(16px)",transition:"all 0.9s ease 1s",fontFamily:"'Pretendard Variable',sans-serif",fontSize:15,color:"rgba(255,255,255,0.55)",fontWeight:300,lineHeight:1.8,margin:"0 0 36px",maxWidth:360}}>
          아트에이치치과는 당신의 미소에<br/>시간과 정성을 들입니다.
        </p>
        <div style={{opacity:ld?1:0,transition:"opacity 0.8s ease 1.3s",display:"flex",gap:12}}>
          {[["의원소개","about"],["진료과목","treatments"],["오시는길","location"]].map(([l,id])=>(
            <span key={id} onClick={()=>go(id)} style={{cursor:"pointer",fontFamily:"'Pretendard Variable',sans-serif",fontSize:13,color:"#fff",borderBottom:"1px solid rgba(255,255,255,0.3)",paddingBottom:4,letterSpacing:0.5}}>{l}</span>
          ))}
        </div>
      </div>
    </section>

    {/* STORY — asymmetric 5:4 */}
    <section style={{background:C.bg,padding:"clamp(80px,10vw,140px) clamp(24px,5vw,80px)"}}>
      <div style={{maxWidth:1100,margin:"0 auto",display:"grid",gridTemplateColumns:"5fr 4fr",gap:"clamp(40px,5vw,80px)",alignItems:"center"}}>
        <div>
          <A t="0.7s"><h2 style={{fontFamily:"'DM Serif Display',serif",fontSize:"clamp(26px,3vw,38px)",fontWeight:400,color:C.dark,lineHeight:1.4,margin:"0 0 28px"}}>
            치과는 항상 꺼려졌는데,<br/>이제는 마음 편하게<br/>방문할 수 있어요.
          </h2></A>
          <A d={0.15} t="0.9s"><p style={{fontFamily:"'Pretendard Variable',sans-serif",fontSize:15,color:C.text2,lineHeight:2,fontWeight:300,margin:"0 0 32px"}}>
            좋은 치과는 치료를 잘하는 곳이 아니라, 다시 가고 싶은 곳이라고 생각합니다. 아트에이치치과는 처음 문을 여는 순간부터 치료가 끝난 뒤 일상으로 돌아가는 순간까지, 모든 경험을 설계합니다.
          </p></A>
          <A d={0.25} t="0.6s"><span onClick={()=>go("about")} style={{cursor:"pointer",fontFamily:"'Pretendard Variable',sans-serif",fontSize:13,color:C.text2,borderBottom:`1px solid ${C.text3}`,paddingBottom:3}}>더 알아보기</span></A>
        </div>
        <A d={0.2} t="1.2s" from="translateX(40px)">
          <div style={{borderRadius:2,overflow:"hidden",aspectRatio:"4/5"}}><Photo bg={V.clinic} label="의원 내부"/></div>
        </A>
      </div>
      <style>{`@media(max-width:768px){section:nth-of-type(2)>div{grid-template-columns:1fr!important}}`}</style>
    </section>

    {/* TREATMENTS — 3 col image cards */}
    <section style={{background:C.warm,padding:"clamp(60px,8vw,100px) 0"}}>
      <div style={{padding:"0 clamp(24px,5vw,80px)",maxWidth:1100,margin:"0 auto"}}>
        <A><div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:36}}>
          <h2 style={{fontFamily:"'DM Serif Display',serif",fontSize:"clamp(24px,3vw,34px)",fontWeight:400,color:C.dark,margin:0}}>진료과목</h2>
          <span onClick={()=>go("treatments")} style={{cursor:"pointer",fontFamily:"'Pretendard Variable',sans-serif",fontSize:13,color:C.text3,borderBottom:`1px solid ${C.line}`,paddingBottom:2}}>전체보기</span>
        </div></A>
      </div>
      <div style={{padding:"0 clamp(24px,5vw,80px)",maxWidth:1100,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:2}}>
        {[{en:"Implant",ko:"임플란트",bg:V.implant},{en:"Orthodontics",ko:"교정치료",bg:V.ortho},{en:"Aesthetics",ko:"심미보철",bg:V.chair}].map((t,i)=>(
          <A key={i} d={0.1+i*0.12} t="1s" from="scale(0.96)">
            <div onClick={()=>go("treatments")} onMouseEnter={()=>setH(i)} onMouseLeave={()=>setH(null)}
              style={{cursor:"pointer",position:"relative",overflow:"hidden",aspectRatio:"3/4"}}>
              <Photo bg={t.bg}/>
              <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.25)",transition:"background 0.4s"}}/>
              <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"0 24px 28px",zIndex:2}}>
                <span style={{fontFamily:"'DM Serif Display',serif",fontSize:13,color:"rgba(255,255,255,0.5)",letterSpacing:2,display:"block",marginBottom:6}}>{t.en}</span>
                <span style={{fontFamily:"'Pretendard Variable',sans-serif",fontSize:20,color:"#fff",fontWeight:500}}>{t.ko}</span>
              </div>
            </div>
          </A>
        ))}
      </div>
    </section>

    {/* DOCTOR — full bleed split */}
    <section style={{background:C.bg,display:"grid",gridTemplateColumns:"1fr 1fr",minHeight:520}}>
      <A t="1.3s" from="scale(1.03)" style={{overflow:"hidden"}}><Photo bg={V.doc} label="원장님 프로필"/></A>
      <div style={{padding:"clamp(48px,6vw,80px) clamp(32px,4vw,60px)",display:"flex",flexDirection:"column",justifyContent:"center"}}>
        <A d={0.2} t="0.6s"><p style={{fontFamily:"'Pretendard Variable',sans-serif",fontSize:12,color:C.text3,letterSpacing:3,marginBottom:16}}>DOCTOR</p></A>
        <A d={0.3} t="0.7s"><h2 style={{fontFamily:"'DM Serif Display',serif",fontSize:"clamp(24px,2.5vw,32px)",fontWeight:400,color:C.dark,margin:"0 0 16px",lineHeight:1.4}}>
          환자분의 치아가<br/>제 작품이라는 마음으로.
        </h2></A>
        <A d={0.4} t="0.8s"><p style={{fontFamily:"'Pretendard Variable',sans-serif",fontSize:14,color:C.text2,lineHeight:1.9,fontWeight:300,margin:"0 0 28px",maxWidth:340}}>
          OOO 원장은 하나의 치료에도 충분한 시간을 들이고, 그 결과가 자연스럽고 오래가도록 끝까지 책임집니다.
        </p></A>
        <A d={0.5} t="0.5s"><span onClick={()=>go("doctor")} style={{cursor:"pointer",fontFamily:"'Pretendard Variable',sans-serif",fontSize:13,color:C.text2,borderBottom:`1px solid ${C.text3}`,paddingBottom:3,alignSelf:"flex-start"}}>의료진 소개</span></A>
      </div>
      <style>{`@media(max-width:768px){section:nth-of-type(4){grid-template-columns:1fr!important}}`}</style>
    </section>

    {/* FACILITY — 2:1 masonry */}
    <section style={{background:C.warm,padding:"clamp(60px,8vw,100px) clamp(24px,5vw,80px)"}}>
      <div style={{maxWidth:1100,margin:"0 auto"}}>
        <A><div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:28}}>
          <h2 style={{fontFamily:"'DM Serif Display',serif",fontSize:"clamp(24px,3vw,34px)",fontWeight:400,color:C.dark,margin:0}}>시설안내</h2>
          <span onClick={()=>go("facility")} style={{cursor:"pointer",fontFamily:"'Pretendard Variable',sans-serif",fontSize:13,color:C.text3,borderBottom:`1px solid ${C.line}`,paddingBottom:2}}>전체보기</span>
        </div></A>
        <div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gridTemplateRows:"1fr 1fr",gap:3,height:480}}>
          <A t="1.1s" from="scale(0.97)" style={{gridRow:"1/3",overflow:"hidden",borderRadius:2}}><Photo bg={V.wait} label="대기실 Waiting Lounge"/></A>
          <A d={0.15} t="1s" from="translateX(30px)" style={{overflow:"hidden",borderRadius:2}}><Photo bg={V.surg} label="수술실 Operation Room"/></A>
          <A d={0.25} t="1s" from="translateX(30px)" style={{overflow:"hidden",borderRadius:2}}><Photo bg={V.consult} label="상담실 Consultation"/></A>
        </div>
      </div>
    </section>

    {/* LOCATION — minimal */}
    <section style={{background:C.bg,padding:"clamp(60px,8vw,100px) clamp(24px,5vw,80px)"}}>
      <div style={{maxWidth:1100,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"flex-end",flexWrap:"wrap",gap:24}}>
        <div>
          <A t="0.6s"><p style={{fontFamily:"'Pretendard Variable',sans-serif",fontSize:12,color:C.text3,letterSpacing:3,marginBottom:12}}>LOCATION</p></A>
          <A d={0.1} t="0.7s"><h2 style={{fontFamily:"'DM Serif Display',serif",fontSize:"clamp(20px,2.5vw,28px)",fontWeight:400,color:C.dark,margin:"0 0 8px"}}>송도국제업무단지 C8-2블럭</h2></A>
          <A d={0.15} t="0.7s"><p style={{fontFamily:"'Pretendard Variable',sans-serif",fontSize:14,color:C.text2,fontWeight:300,margin:0}}>인천광역시 연수구 송도동</p></A>
        </div>
        <A d={0.2} t="0.5s"><span onClick={()=>go("location")} style={{cursor:"pointer",fontFamily:"'Pretendard Variable',sans-serif",fontSize:13,color:C.text2,borderBottom:`1px solid ${C.text3}`,paddingBottom:3}}>오시는길 안내</span></A>
      </div>
    </section>
  </>)
}

/* ========== ABOUT ========== */
function About(){
  return(<>
    <PH title="의원소개" bg={V.clinic}/>
    <section style={{background:C.bg,padding:"clamp(80px,12vw,160px) clamp(24px,5vw,80px)"}}>
      <div style={{maxWidth:720,margin:"0 auto"}}>
        <A t="1s"><h2 style={{fontFamily:"'DM Serif Display',serif",fontSize:"clamp(26px,3.5vw,40px)",fontWeight:400,color:C.dark,lineHeight:1.5,margin:"0 0 32px"}}>
          좋은 치과는<br/>다시 가고 싶은 곳입니다.
        </h2></A>
        <A d={0.15} t="0.9s"><p style={{fontFamily:"'Pretendard Variable',sans-serif",fontSize:16,color:C.text2,lineHeight:2.1,fontWeight:300,margin:"0 0 20px"}}>
          아트에이치치과는 빠른 치료보다 정확한 치료를, 많은 환자보다 한 분 한 분에 충분한 시간을 드리는 것을 선택했습니다. 치료의 결과가 자연스럽고, 오래 가고, 환자분의 일상을 더 좋게 만드는 것. 그것이 저희가 생각하는 좋은 치과의 기준입니다.
        </p></A>
        <A d={0.25} t="0.9s"><p style={{fontFamily:"'Pretendard Variable',sans-serif",fontSize:16,color:C.text2,lineHeight:2.1,fontWeight:300,margin:0}}>
          송도 국제도시의 중심에서, 세계적 수준의 진료 환경과 첨단 장비를 갖추고 여러분을 기다립니다.
        </p></A>
      </div>
    </section>
    <section style={{background:C.warm,padding:"clamp(60px,8vw,100px) clamp(24px,5vw,80px)"}}>
      <div style={{maxWidth:1100,margin:"0 auto"}}>
        {[{t:"멸균 시스템",d:"9단계 감염 관리 프로토콜. 기구 세척부터 멸균, 진료수 관리까지 눈에 보이지 않는 곳까지 철저하게."},{t:"독립 수술실",d:"임플란트 수술은 완전히 분리된 1인 수술실에서 진행합니다. 외부 소음 차단, 감염 위험 최소화."},{t:"원데이 보철",d:"독일 CEREC 시스템으로 본 뜨는 불편함 없이, 하루 만에 보철물을 완성합니다."},{t:"치료 보증제",d:"진료 보증서를 발급하고, 정기 검진을 통해 치료받은 치아를 오래 유지할 수 있도록 끝까지 책임집니다."}].map((item,i)=>(
          <A key={i} d={0.05+i*0.08} t="0.7s">
            <div style={{display:"grid",gridTemplateColumns:"180px 1fr",gap:20,padding:"28px 0",borderBottom:`1px solid ${C.line}`}}>
              <h4 style={{fontFamily:"'Pretendard Variable',sans-serif",fontSize:15,color:C.dark,fontWeight:600,margin:0}}>{item.t}</h4>
              <p style={{fontFamily:"'Pretendard Variable',sans-serif",fontSize:14,color:C.text2,lineHeight:1.8,fontWeight:300,margin:0}}>{item.d}</p>
            </div>
          </A>
        ))}
      </div>
    </section>
    <A t="1.4s" from="scale(1.02)"><div style={{height:400,overflow:"hidden"}}><Photo bg={V.wait} label="대기실 전경"/></div></A>
  </>)
}

/* ========== DOCTOR ========== */
function Doctor(){
  const career=["OO대학교 치의학과 졸업","OO대학교 대학원 석사","OO대학병원 인턴 · 레지던트 수료","대한치과의사협회 정회원","대한구강악안면외과학회 정회원","전) OO치과의원 진료원장"];
  return(<>
    <PH title="의료진" bg={V.doc}/>
    <section style={{background:C.bg,padding:"clamp(80px,10vw,140px) clamp(24px,5vw,80px)"}}>
      <div style={{maxWidth:1000,margin:"0 auto",display:"grid",gridTemplateColumns:"2fr 3fr",gap:"clamp(40px,5vw,72px)",alignItems:"start"}}>
        <A t="1.2s" from="translateY(20px)"><div style={{position:"sticky",top:90,borderRadius:2,overflow:"hidden",aspectRatio:"3/4"}}><Photo bg={V.doc} label="원장님 프로필 사진"/></div></A>
        <div>
          <A d={0.1} t="0.6s"><p style={{fontFamily:"'Pretendard Variable',sans-serif",fontSize:12,color:C.text3,letterSpacing:3,marginBottom:12}}>REPRESENTATIVE</p></A>
          <A d={0.15} t="0.7s"><h2 style={{fontFamily:"'Pretendard Variable',sans-serif",fontSize:26,color:C.dark,fontWeight:600,margin:"0 0 4px"}}>OOO 원장</h2></A>
          <A d={0.2} t="0.7s"><p style={{fontFamily:"'Pretendard Variable',sans-serif",fontSize:14,color:C.text3,fontWeight:300,margin:"0 0 32px"}}>OO과 전문의</p></A>
          <A d={0.25} t="0.9s"><div style={{background:C.warm,padding:"24px 28px",borderRadius:2,marginBottom:36}}>
            <p style={{fontFamily:"'Pretendard Variable',sans-serif",fontSize:15,color:C.text2,lineHeight:2,fontWeight:300,margin:0}}>
              "빠르게 많은 환자를 보는 것보다,<br/>한 분에게 충분한 시간을 드리는 것이<br/>더 좋은 결과를 만든다고 믿습니다."
            </p>
          </div></A>
          <A d={0.3} t="0.5s"><div style={{width:24,height:1,background:C.text3,marginBottom:24}}/></A>
          {career.map((c,i)=>(
            <A key={i} d={0.35+i*0.05} t="0.5s">
              <p style={{fontFamily:"'Pretendard Variable',sans-serif",fontSize:14,color:C.text2,fontWeight:300,margin:"0 0 10px",paddingLeft:14,borderLeft:i===0?`2px solid ${C.gold}`:`2px solid ${C.line}`}}>{c}</p>
            </A>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:768px){section:nth-of-type(2)>div{grid-template-columns:1fr!important}}`}</style>
    </section>
  </>)
}

/* ========== TREATMENTS ========== */
function Treatments({go}){
  const items=[
    {en:"Implant",ko:"임플란트",d:"디지털 가이드를 활용한 정밀 식립. 뼈이식이 필요한 고난도 케이스도 안전하게.",bg:V.implant},
    {en:"Aesthetics",ko:"심미보철",d:"라미네이트, 올세라믹. 원데이 CEREC 시스템으로 당일 완성 가능.",bg:V.chair},
    {en:"Orthodontics",ko:"교정치료",d:"인비절라인, 클리피씨 등 라이프스타일에 맞는 최적의 교정.",bg:V.ortho},
    {en:"General",ko:"충치 · 신경치료",d:"미세현미경 정밀 치료. 자연치아 최대 보존이 원칙.",bg:V.gen},
    {en:"Periodontics",ko:"잇몸 · 스케일링",d:"에어플로우 스케일링과 체계적 치주 관리.",bg:V.white},
    {en:"Whitening",ko:"치아미백",d:"전문가 오피스 미백으로 밝은 미소를 되찾아 드립니다.",bg:V.consult},
    {en:"TMJ",ko:"턱관절치료",d:"정확한 원인 진단, 물리치료와 보존적 치료로 근본 개선.",bg:V.scan},
    {en:"Oral Surgery",ko:"사랑니 발치",d:"3D CT 기반 정밀 진단. 매복 사랑니도 안전하게.",bg:V.equip},
  ];
  const[hov,setH]=useState(null);
  return(<>
    <PH title="진료과목" bg={V.chair}/>
    <section style={{background:C.bg,padding:"clamp(48px,6vw,80px) clamp(24px,5vw,80px)"}}>
      <div style={{maxWidth:1000,margin:"0 auto"}}>
        {items.map((t,i)=>(
          <A key={i} d={0.03+i*0.04} t="0.6s">
            <div onMouseEnter={()=>setH(i)} onMouseLeave={()=>setH(null)}
              style={{display:"grid",gridTemplateColumns:"200px 1fr",borderBottom:`1px solid ${C.line}`,cursor:"pointer",transition:"background 0.3s",background:hov===i?C.warm:"transparent"}}>
              <div style={{overflow:"hidden",height:140}}><Photo bg={t.bg}/></div>
              <div style={{padding:"24px 32px",display:"flex",flexDirection:"column",justifyContent:"center"}}>
                <div style={{display:"flex",alignItems:"baseline",gap:10,marginBottom:6}}>
                  <span style={{fontFamily:"'DM Serif Display',serif",fontSize:18,color:hov===i?C.gold:C.dark,transition:"color 0.3s"}}>{t.en}</span>
                  <span style={{fontFamily:"'Pretendard Variable',sans-serif",fontSize:14,color:C.text3}}>{t.ko}</span>
                </div>
                <p style={{fontFamily:"'Pretendard Variable',sans-serif",fontSize:13,color:C.text2,lineHeight:1.7,fontWeight:300,margin:0}}>{t.d}</p>
              </div>
            </div>
          </A>
        ))}
      </div>
      <style>{`@media(max-width:600px){section:nth-of-type(2) [style*="200px 1fr"]{grid-template-columns:1fr!important}}`}</style>
    </section>
  </>)
}

/* ========== FACILITY ========== */
function Facility(){
  return(<>
    <PH title="시설 · 장비" bg={V.wait}/>
    <section style={{background:C.bg,padding:"clamp(60px,8vw,100px) clamp(24px,5vw,80px)"}}>
      <div style={{maxWidth:1100,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1fr",gap:3}}>
        {[{k:"대기실",e:"Lounge",bg:V.wait},{k:"진료실",e:"Treatment",bg:V.clinic},{k:"수술실",e:"OR",bg:V.surg},{k:"상담실",e:"Consult",bg:V.consult}].map((s,i)=>(
          <A key={i} d={0.1+i*0.1} t="1s" from="scale(0.97)">
            <div style={{position:"relative",overflow:"hidden",aspectRatio:"16/10"}}>
              <Photo bg={s.bg}/>
              <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.15)"}}/>
              <div style={{position:"absolute",bottom:0,left:0,padding:"0 24px 20px",zIndex:2}}>
                <span style={{fontFamily:"'Pretendard Variable',sans-serif",fontSize:11,color:"rgba(255,255,255,0.55)",letterSpacing:2,display:"block",marginBottom:4}}>{s.e}</span>
                <span style={{fontFamily:"'Pretendard Variable',sans-serif",fontSize:18,color:"#fff",fontWeight:500}}>{s.k}</span>
              </div>
            </div>
          </A>
        ))}
      </div>
    </section>
    <section style={{background:C.warm,padding:"clamp(60px,8vw,100px) clamp(24px,5vw,80px)"}}>
      <div style={{maxWidth:1100,margin:"0 auto"}}>
        <A><h2 style={{fontFamily:"'DM Serif Display',serif",fontSize:"clamp(22px,2.5vw,30px)",fontWeight:400,color:C.dark,margin:"0 0 36px"}}>보유 장비</h2></A>
        {[{n:"3D CT · 구강 스캐너",d:"본 뜨는 불편함 없이 3D 스캔으로 정밀한 데이터를 확보합니다.",bg:V.equip},{n:"CAD/CAM CEREC",d:"디지털 설계와 밀링으로 당일 보철물 제작이 가능합니다.",bg:V.scan},{n:"디지털 엑스레이",d:"낮은 방사선량의 선명한 영상으로 정확한 진단을 돕습니다.",bg:V.clinic},{n:"미세 현미경",d:"20배 이상 확대로 미세한 치아 구조까지 정밀하게 확인합니다.",bg:V.gen}].map((eq,i)=>(
          <A key={i} d={0.05+i*0.06} t="0.6s">
            <div style={{display:"grid",gridTemplateColumns:"120px 1fr",gap:20,padding:"20px 0",borderBottom:`1px solid ${C.line}`,alignItems:"center"}}>
              <div style={{borderRadius:2,overflow:"hidden",aspectRatio:"4/3"}}><Photo bg={eq.bg}/></div>
              <div>
                <h4 style={{fontFamily:"'Pretendard Variable',sans-serif",fontSize:15,color:C.dark,fontWeight:600,margin:"0 0 4px"}}>{eq.n}</h4>
                <p style={{fontFamily:"'Pretendard Variable',sans-serif",fontSize:13,color:C.text2,fontWeight:300,margin:0}}>{eq.d}</p>
              </div>
            </div>
          </A>
        ))}
      </div>
    </section>
  </>)
}

/* ========== LOCATION ========== */
function Location(){
  return(<>
    <PH title="오시는길" bg={V.city}/>
    <section style={{background:C.bg,padding:"clamp(80px,10vw,140px) clamp(24px,5vw,80px)"}}>
      <div style={{maxWidth:900,margin:"0 auto",display:"grid",gridTemplateColumns:"5fr 4fr",gap:"clamp(40px,5vw,72px)"}}>
        <div>
          <A t="0.7s"><div style={{marginBottom:36}}>
            <p style={{fontFamily:"'Pretendard Variable',sans-serif",fontSize:12,color:C.text3,letterSpacing:3,marginBottom:10}}>ADDRESS</p>
            <p style={{fontFamily:"'Pretendard Variable',sans-serif",fontSize:16,color:C.text,fontWeight:400,margin:0,lineHeight:1.8}}>인천광역시 연수구 송도동<br/>송도국제업무단지 C8-2블럭<br/>업무복합시설</p>
          </div></A>
          <A d={0.1} t="0.7s"><div style={{marginBottom:36}}>
            <p style={{fontFamily:"'Pretendard Variable',sans-serif",fontSize:12,color:C.text3,letterSpacing:3,marginBottom:10}}>CONTACT</p>
            <p style={{fontFamily:"'DM Serif Display',serif",fontSize:28,color:C.dark,fontWeight:400,margin:"0 0 4px"}}>032-000-0000</p>
            <p style={{fontFamily:"'Pretendard Variable',sans-serif",fontSize:12,color:C.text3,margin:0}}>* 개원 시 확정</p>
          </div></A>
          <A d={0.2} t="0.7s"><div>
            <p style={{fontFamily:"'Pretendard Variable',sans-serif",fontSize:12,color:C.text3,letterSpacing:3,marginBottom:10}}>PARKING · TRANSIT</p>
            <p style={{fontFamily:"'Pretendard Variable',sans-serif",fontSize:14,color:C.text2,fontWeight:300,margin:0,lineHeight:1.8}}>건물 내 지하주차장 무료<br/>1호선 국제업무지구역<br/>버스 203, 205, 223, 304번</p>
          </div></A>
        </div>
        <div>
          <A d={0.1} t="0.7s"><div style={{marginBottom:32}}>
            <p style={{fontFamily:"'Pretendard Variable',sans-serif",fontSize:12,color:C.text3,letterSpacing:3,marginBottom:12}}>HOURS</p>
            {[["월·수·목","09:30 — 18:30",false],["화·금","09:30 — 20:30",true],["토","09:30 — 14:00",false],["점심","13:00 — 14:00",false],["일·공휴일","휴진",false]].map(([d,t,hl],i)=>(
              <A key={i} d={0.15+i*0.04} t="0.5s">
                <div style={{display:"flex",justifyContent:"space-between",padding:"10px 0",borderBottom:`1px solid ${C.line}`,fontFamily:"'Pretendard Variable',sans-serif",fontSize:14}}>
                  <span style={{color:C.text}}>{d}</span>
                  <span style={{color:hl?C.gold:C.text,fontWeight:hl?600:300}}>{t}</span>
                </div>
              </A>
            ))}
            <A d={0.4} t="0.5s"><p style={{fontFamily:"'Pretendard Variable',sans-serif",fontSize:12,color:C.text3,marginTop:8}}>* 개원 시 확정</p></A>
          </div></A>
          <A d={0.45} t="1s" from="scale(0.97)">
            <div style={{borderRadius:2,overflow:"hidden",aspectRatio:"16/10"}}><Photo bg={V.city} label="송도 센트럴파크 일대"/></div>
          </A>
        </div>
      </div>
      <style>{`@media(max-width:768px){section:nth-of-type(2)>div{grid-template-columns:1fr!important}}`}</style>
    </section>
  </>)
}

/* ===== FOOTER ===== */
function Ft(){
  return(
    <footer style={{background:C.dark,padding:"44px clamp(24px,5vw,80px) 28px"}}>
      <div style={{maxWidth:1100,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:20}}>
        <div style={{display:"flex",alignItems:"center",gap:20}}>
          <span style={{fontFamily:"'DM Serif Display',serif",fontSize:16,color:"#fff"}}>Art H</span>
          <span style={{fontFamily:"'Pretendard Variable',sans-serif",fontSize:11,color:"rgba(255,255,255,0.25)"}}>인천 연수구 송도동 C8-2블럭 · 032-000-0000</span>
        </div>
        <div style={{display:"flex",gap:20,fontFamily:"'Pretendard Variable',sans-serif",fontSize:11,color:"rgba(255,255,255,0.25)"}}>
          <span>Blog</span><span>Instagram</span><span>Booking</span>
        </div>
      </div>
      <div style={{maxWidth:1100,margin:"20px auto 0",borderTop:"1px solid rgba(255,255,255,0.05)",paddingTop:14,fontFamily:"'Pretendard Variable',sans-serif",fontSize:10,color:"rgba(255,255,255,0.12)",textAlign:"center"}}>&copy; 2026 아트에이치치과의원</div>
    </footer>
  )
}

/* ===== APP ===== */
export default function ArtHV5(){
  const[page,setP]=useState("home");
  const[sc,setSc]=useState(false);
  const go=(p)=>{setP(p);window.scrollTo({top:0,behavior:"instant"})};
  useEffect(()=>{
    const l1=document.createElement("link");l1.href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&display=swap";l1.rel="stylesheet";document.head.appendChild(l1);
    const l2=document.createElement("link");l2.href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";l2.rel="stylesheet";document.head.appendChild(l2);
  },[]);
  useEffect(()=>{const f=()=>setSc(window.scrollY>30);window.addEventListener("scroll",f,{passive:true});return()=>window.removeEventListener("scroll",f)},[]);
  const P={home:<Home go={go}/>,about:<About/>,doctor:<Doctor/>,treatments:<Treatments go={go}/>,facility:<Facility/>,location:<Location/>};
  return(<div style={{background:C.bg,color:C.text,minHeight:"100vh",overflowX:"hidden"}}><Nav page={page} go={go} sc={sc}/>{P[page]}<Ft/></div>)
}
