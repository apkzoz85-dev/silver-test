"use client";
import{useState,useEffect,useRef,FormEvent}from"react";
import{useRouter}from"next/navigation";

const P="01009260259",PD="0100 926 0259",PI="+201009260259",WN="201009260259";
const WK="325afe41-583c-4a59-83c5-17939346616e";
const DEADLINE=new Date("2026-06-29T23:59:59");

function trackCall(l="call"){if(typeof window!=="undefined"&&(window as any).gtag)(window as any).gtag("event","click_call",{event_category:"contact",event_label:l});}
function trackWA(l="wa"){if(typeof window!=="undefined"&&(window as any).gtag)(window as any).gtag("event","click_whatsapp",{event_category:"contact",event_label:l});}
function trackLead(l="form"){if(typeof window!=="undefined"&&(window as any).gtag)(window as any).gtag("event","generate_lead",{event_category:"lead",event_label:l});}

const IMG={
  hero:"https://ora.properties-eg.com/hero-luxury.webp",logo:"https://ora.properties-eg.com/ora-logo-new.png",
  ssLagoon:"https://ora.properties-eg.com/silversands-lagoon.png",ssLogo:"https://ora.properties-eg.com/silversands-logo-new.png",
  ssPool:"https://ora.properties-eg.com/ss-pool.webp",ssLag:"https://ora.properties-eg.com/ss-lagoon.png",
  ssVilla:"https://ora.properties-eg.com/ss-villa.jpg",ssAerial:"https://ora.properties-eg.com/ss-aerial.jpg",
  zedVilla:"https://ora.properties-eg.com/zedeast-villa.jpg",zedLogo:"https://ora.properties-eg.com/zedeast-logo-new.png",
  zedHero:"https://ora.properties-eg.com/zed-hero.jpg",zedBalcony:"https://ora.properties-eg.com/zed-balcony.png",
  zedAerial:"https://ora.properties-eg.com/zed-aerial.jpg",zedVilla2:"https://ora.properties-eg.com/zed-villa.jpg",
  founder:"https://ora.properties-eg.com/naguib-sawiris.jpg",
};

/* ═══ CONTENT ═══ */
const T={
  ar:{
    dir:"rtl"as const,font:"'IBM Plex Sans Arabic',sans-serif",
    nav_wa:"💬 واتساب",hero_tag:"سيلفر ساندس · أورا للتطوير",
    hero_h1:"سيلفر ساندس",hero_h2:"الساحل الشمالي",
    hero_p:"سيلفر ساندس من أورا للتطوير العقاري — شاليهات وفيلات فاخرة بتشطيب كامل في سيدي حنيش، كيلو ٢٢٢. إطلاق The Cove Lagoon الجديد. سيلفر ساندس أورا — استثمر في التميز.",
    stat1:"يبدأ من",stat2:"سنوات تقسيط",stat3:"تشطيب كامل",
    cd_label:"⏰ التسجيل ينتهي يوم ٢٩ يونيو",
    form_title:"سجّل اهتمامك الآن",form_sub:"سجّل للحصول على الأسعار الحصرية",
    f_name:"الاسم الكامل *",f_name_ph:"أدخل اسمك",f_phone:"رقم الموبايل *",f_email:"البريد الإلكتروني",
    f_project:"المشروع",f_ss:"سيلفر ساندس — The Cove",f_zed:"ZED East",f_both:"الاثنين",
    f_submit:"سجّل الآن",f_sending:"جاري الإرسال...",f_sent:"تم الاستلام — جاري التحويل",
    f_disc:"بإرسال النموذج توافق على سياسة الخصوصية. الأسعار استرشادية وقابلة للتغيير.",
    ss_badge:"إطلاق جديد · The Cove",ss_title:"سيلفر ساندس — The Cove Lagoon",
    ss_desc:"سيلفر ساندس من أورا — إطلاق The Cove Lagoon. وحدات فاخرة بتشطيب كامل بإطلالة على بحيرة كريستالية في سيدي حنيش، كيلو ٢٢٢ الساحل الشمالي. سيلفر ساندس أورا — أسلوب حياة متوسطي فاخر.",
    ss_price_l:"يبدأ من",ss_price:"٩,٧٠٠,٠٠٠ جنيه",ss_plan_l:"التقسيط",ss_plan:"حتى ٨ سنوات",
    ss_hl:["بحيرة كريستالية","تشطيب كامل","١ كم شاطئ","فنادق بوتيك","كيلو ٢٢٢","نجيب ساويرس"],
    ss_wa:"💬 استفسر عن سيلفر ساندس",
    zed_badge:"القاهرة الجديدة",zed_title:"ZED East — حياة عصرية متكاملة",
    zed_desc:"ZED East من أورا — وحدات بتشطيب كامل وسط مرافق عالمية في القاهرة الجديدة. نادي ZED الرياضي ومساحات خضراء واسعة.",
    zed_price:"٩,٠٠٠,٠٠٠ جنيه",zed_plan:"حتى ٩ سنوات",
    zed_hl:["تشطيب كامل","نادي ZED الرياضي","لاندسكيب فاخر","مركز أعمال"],
    zed_wa:"💬 استفسر عن ZED East",
    founder_tag:"المؤسس",founder_name:"نجيب ساويرس",founder_role:"رئيس مجلس الإدارة",
    founder_quote:"رجل أعمال مصري بارز ومالك شركة أورا الرائدة في التطوير العقاري الفاخر في مصر والعالم.",
    founder_text:"تحت قيادته، تقدم أورا مشاريع أيقونية مثل سيلفر ساندس وZED بتصميمات عالمية وتشطيبات فاخرة. الاستثمار مع أورا يضمن جودة استثنائية وقيمة قوية.",
    founder_s1:"عالمي",founder_s1l:"خبرة",founder_s2:"فاخر",founder_s2l:"جودة",founder_s3:"موثوق",founder_s3l:"استثمار",
    why_tag:"شريكك الاستراتيجي",why_h:"لماذا أورا؟",
    why1_h:"استشارة محايدة ١٠٠٪",why1_p:"نقدم استشارات محايدة لضمان أن أورا هي الخيار الأفضل لأهدافك الاستثمارية.",
    why2_h:"إرشاد خطوة بخطوة",why2_p:"خبراؤنا يرشدوك لحجز أفضل الوحدات في سيلفر ساندس أورا مع خطة سداد تناسبك.",
    why_wa:"💬 تحدث مع خبير",
    ft_disc:"هذا الموقع يقدم معلومات عن مشاريع أورا — سيلفر ساندس الساحل الشمالي وZED East. الأسعار استرشادية وقابلة للتغيير.",
    privacy:"سياسة الخصوصية",mob_wa:"💬 واتساب",contact_wa:"💬 تواصل معنا",
    pop_title:"سجّل قبل ٢٩ يونيو",pop_sub:"احصل على أسعار حصرية لسيلفر ساندس أورا",
    cd_day:"يوم",cd_hr:"ساعة",cd_min:"دقيقة",cd_sec:"ثانية",
    prv_title:"سياسة الخصوصية",prv_text:"نجمع الاسم والهاتف والإيميل فقط عند تعبئة النموذج — للتواصل بخصوص سيلفر ساندس وZED East من أورا. بياناتك مشفرة ومحمية. لا نبيع أو نشارك بياناتك.",
    ck_text:"نستخدم cookies لتحسين تجربتك.",ck_ok:"موافق",ck_no:"رفض",
  },
  en:{
    dir:"ltr"as const,font:"'Inter',sans-serif",
    nav_wa:"💬 WhatsApp",hero_tag:"Silver Sands · ORA Developers",
    hero_h1:"Silver Sands",hero_h2:"North Coast",
    hero_p:"Silver Sands by ORA Developers — fully finished luxury chalets and villas at Sidi Heneish, Km 222. The Cove Lagoon Launch. Silver Sands ORA — invest in excellence.",
    stat1:"Starting From",stat2:"Year Plan",stat3:"Fully Finished",
    cd_label:"⏰ Registration closes June 29",
    form_title:"Register Your Interest",form_sub:"Get exclusive Silver Sands pricing",
    f_name:"Full Name *",f_name_ph:"Your full name",f_phone:"Phone Number *",f_email:"Email",
    f_project:"Project",f_ss:"Silver Sands — The Cove",f_zed:"ZED East",f_both:"Both Projects",
    f_submit:"Register Now",f_sending:"Submitting...",f_sent:"Thank you! Redirecting...",
    f_disc:"By submitting you agree to our Privacy Policy. Prices subject to change.",
    ss_badge:"New Launch · The Cove",ss_title:"Silver Sands — The Cove Lagoon",
    ss_desc:"Silver Sands by ORA Developers — The Cove Lagoon launch. Fully finished lagoon-front residences at Sidi Heneish, Km 222 North Coast. Silver Sands ORA — Mediterranean luxury redefined.",
    ss_price_l:"Starting From",ss_price:"9,700,000 EGP",ss_plan_l:"Installments",ss_plan:"Up to 8 Years",
    ss_hl:["Crystal Lagoon","Fully Finished","1km Beach","Boutique Hotels","Km 222","Naguib Sawiris"],
    ss_wa:"💬 Inquire — Silver Sands",
    zed_badge:"New Cairo",zed_title:"ZED East — Modern Living Redefined",
    zed_desc:"ZED East by ORA — fully finished contemporary residences in New Cairo with world-class amenities and ZED Sports Club.",
    zed_price:"9,000,000 EGP",zed_plan:"Up to 9 Years",
    zed_hl:["Fully Finished","ZED Sports Club","Lush Landscaping","Business Hub"],
    zed_wa:"💬 Inquire — ZED East",
    founder_tag:"The Founder",founder_name:"Naguib Sawiris",founder_role:"Chairman & Visionary",
    founder_quote:"A world-renowned billionaire and visionary owner of ORA Developers, a leader in luxury real estate across Egypt and the globe.",
    founder_text:"Under his leadership, ORA delivers landmark projects like Silver Sands and ZED, defined by world-class architecture and fully finished premium units.",
    founder_s1:"Global",founder_s1l:"Expertise",founder_s2:"Premium",founder_s2l:"Quality",founder_s3:"Trusted",founder_s3l:"Investment",
    why_tag:"Your Strategic Partner",why_h:"Why ORA?",
    why1_h:"100% Unbiased Consultation",why1_p:"We provide unbiased consultations to ensure ORA is the best match for your investment goals.",
    why2_h:"Expert Step-by-Step Guidance",why2_p:"Our experts guide you to secure prime Silver Sands ORA units with flexible payment plans.",
    why_wa:"💬 Talk to an Expert",
    ft_disc:"Information about ORA projects — Silver Sands North Coast & ZED East. Prices subject to change. Contracts directly with ORA Developers.",
    privacy:"Privacy Policy",mob_wa:"💬 WhatsApp",contact_wa:"💬 Contact Us",
    pop_title:"Register by June 29",pop_sub:"Get exclusive Silver Sands ORA pricing",
    cd_day:"Days",cd_hr:"Hours",cd_min:"Min",cd_sec:"Sec",
    prv_title:"Privacy Policy",prv_text:"We collect name, phone, and email only via the form — to contact you about Silver Sands and ZED East by ORA. Your data is encrypted and protected. We never sell or share your data.",
    ck_text:"We use cookies to improve your experience.",ck_ok:"Accept",ck_no:"Decline",
  },
};

const PhI=()=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>;

export default function Home(){
  const router=useRouter();
  const[lang,setLang]=useState<"ar"|"en">("ar");
  const[fs,sFs]=useState<"idle"|"sending"|"sent"|"error">("idle");
  const[pop,sPop]=useState(false);const[ps,sPs]=useState<"idle"|"sending"|"sent"|"error">("idle");
  const[ck,sCk]=useState(false);const[prv,sPrv]=useState(false);
  const[cd,sCd]=useState({d:0,h:0,m:0,s:0});
  const pr=useRef(false);const fr=useRef<HTMLFormElement>(null);const pfr=useRef<HTMLFormElement>(null);
  const t=T[lang];
  const WM=lang==="ar"?"مرحباً، محتاج تفاصيل سيلفر ساندس أورا":"Hi, I'm interested in Silver Sands ORA — please share details";
  const WU=`https://wa.me/${WN}?text=${encodeURIComponent(WM)}`;

  useEffect(()=>{
    document.querySelectorAll(".fin").forEach(el=>{new IntersectionObserver(([e])=>{if(e.isIntersecting)e.target.classList.add("vis")},{threshold:.1}).observe(el)});
    try{if(!localStorage.getItem("ssv2"))sCk(true)}catch{sCk(true)}
    const ci=setInterval(()=>{const diff=DEADLINE.getTime()-Date.now();if(diff<=0)return clearInterval(ci);sCd({d:Math.floor(diff/864e5),h:Math.floor(diff%864e5/36e5),m:Math.floor(diff%36e5/6e4),s:Math.floor(diff%6e4/1e3)})},1000);
    return()=>clearInterval(ci);
  },[]);
  useEffect(()=>{if(pr.current)return;const os=()=>{if(window.scrollY/(document.documentElement.scrollHeight-window.innerHeight)>=.5)go()};const ti=setTimeout(()=>go(),15000);window.addEventListener("scroll",os,{passive:true});function go(){if(pr.current)return;pr.current=true;sPop(true);document.body.classList.add("p-on");window.removeEventListener("scroll",os);clearTimeout(ti)}return()=>{window.removeEventListener("scroll",os);clearTimeout(ti)}},[]);
  function cp(){sPop(false);document.body.classList.remove("p-on")}
  async function sub(r:React.RefObject<HTMLFormElement|null>,ss:(s:any)=>void,src:string){if(!r.current)return;ss("sending");const fd=new FormData(r.current);const pl:Record<string,string>={};fd.forEach((v,k)=>pl[k]=v.toString());try{const res=await fetch("https://api.web3forms.com/submit",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(pl)});const d=await res.json();if(d.success){ss("sent");trackLead(src);r.current.reset();if(src==="hero_form")setTimeout(()=>router.push("/thank-you"),800)}else throw 0}catch{ss("error")}}

  return(<div dir={t.dir} style={{fontFamily:t.font}}>
    {/* LANG SWITCH */}
    <div className="lang-btn">
      <button className={`lang-opt ${lang==="ar"?"on":""}`} onClick={()=>setLang("ar")}>عربي</button>
      <button className={`lang-opt ${lang==="en"?"on":""}`} onClick={()=>setLang("en")}>EN</button>
    </div>

    <nav className="nav"><div className="nav-in">
      <a className="nav-logo" href="#"><img src={IMG.logo} alt="ORA Developers أورا"/></a>
      <div className="nav-ctas"><a className="nav-call" href={`tel:${PI}`} onClick={()=>trackCall("nav")}><PhI/><span>{PD}</span></a><a className="nav-wa" href={WU} target="_blank" rel="noopener" onClick={()=>trackWA("nav")}>{t.nav_wa}</a></div>
    </div></nav>

    <section className="hero" id="hero"><div className="hero-bg"><img src={IMG.hero} alt="سيلفر ساندس أورا Silver Sands ORA North Coast"/></div>
    <div className="hero-in">
      <div className="hero-left">
        <img src={IMG.logo} alt="ORA أورا" className="hero-logo"/>
        <p className="hero-tag">{t.hero_tag}</p>
        <h1 className="hero-h">{t.hero_h1}<br/><em>{t.hero_h2}</em></h1>
        <p className="hero-p">{t.hero_p}</p>
        <div className="hero-stats">
          <div className="hero-stat"><strong>9.7M</strong><span>{t.stat1}</span></div>
          <div className="hero-stat"><strong>8</strong><span>{t.stat2}</span></div>
          <div className="hero-stat"><strong>100%</strong><span>{t.stat3}</span></div>
        </div>
      </div>
      <div className="hero-form">
        <p className="cd-label">{t.cd_label}</p>
        <div className="cd-bar">
          <div className="cd-box"><strong>{cd.d}</strong><span>{t.cd_day}</span></div>
          <div className="cd-box"><strong>{cd.h}</strong><span>{t.cd_hr}</span></div>
          <div className="cd-box"><strong>{cd.m}</strong><span>{t.cd_min}</span></div>
          <div className="cd-box"><strong>{cd.s}</strong><span>{t.cd_sec}</span></div>
        </div>
        <h2 className="hf-title">{t.form_title}</h2><p className="hf-sub">{t.form_sub}</p>
        <form ref={fr} onSubmit={(e:FormEvent)=>{e.preventDefault();sub(fr,sFs,"hero_form")}}>
          <input type="hidden" name="access_key" value={WK}/><input type="hidden" name="subject" value="Lead — سيلفر ساندس Silver Sands ORA"/><input type="hidden" name="from_name" value="Silver Sands Landing"/><input type="checkbox" name="botcheck" style={{display:"none"}}/>
          <div className="hf-field"><label>{t.f_name}</label><input name="name" placeholder={t.f_name_ph} required/></div>
          <div className="hf-field"><label>{t.f_phone}</label><input name="phone" type="tel" placeholder="+20 1XX XXX XXXX" required/></div>
          <div className="hf-field"><label>{t.f_email}</label><input name="email" type="email" placeholder="email@example.com"/></div>
          <div className="hf-field"><label>{t.f_project}</label><select name="project"><option value="Silver Sands">{t.f_ss}</option><option value="ZED East">{t.f_zed}</option><option value="Both">{t.f_both}</option></select></div>
          {fs==="sent"?<div style={{textAlign:"center",padding:"14px 0"}}><div style={{fontSize:36}}>✓</div><p style={{color:"var(--color-gold)",fontWeight:700,marginTop:4}}>{t.f_sent}</p></div>
          :<button type="submit" className="hf-submit" disabled={fs==="sending"}>{fs==="sending"?t.f_sending:t.f_submit}</button>}
          {fs==="error"&&<p style={{color:"#ef4444",fontSize:11,textAlign:"center",marginTop:8}}>Error — <a href={WU} target="_blank" style={{color:"var(--color-gold)"}}>WhatsApp</a></p>}
          <p className="hf-disc">{t.f_disc} <a href="#" onClick={(e)=>{e.preventDefault();sPrv(true)}}>{t.privacy}</a></p>
        </form>
      </div>
    </div></section>

    <section className="proj fin" id="silversands"><div className="proj-in">
      <div className="proj-head"><div className="proj-hero-img"><img src={IMG.ssLagoon} alt="سيلفر ساندس Silver Sands The Cove Lagoon أورا ORA"/></div>
        <div className="proj-info"><div className="proj-logos"><img src={IMG.ssLogo} alt="Silver Sands"/><img src={IMG.logo} alt="ORA" style={{height:28}}/></div>
          <span className="proj-badge">{t.ss_badge}</span><h2 className="proj-title">{t.ss_title}</h2><p className="proj-desc">{t.ss_desc}</p>
          <div className="proj-price"><div className="proj-pr-item"><span>{t.ss_price_l}</span><strong>{t.ss_price}</strong></div><div className="proj-pr-item"><span>{t.ss_plan_l}</span><strong>{t.ss_plan}</strong></div></div>
          <div className="proj-highlights">{t.ss_hl.map((h,i)=><div key={i} className="proj-hl">{h}</div>)}</div>
        </div>
      </div>
      <div className="proj-gallery">{[{s:IMG.ssPool,a:"Silver Sands Pool"},{s:IMG.ssLag,a:"Silver Sands Lagoon"},{s:IMG.ssVilla,a:"Silver Sands Villa"},{s:IMG.ssAerial,a:"Silver Sands Aerial"}].map((g,i)=><div key={i} className="proj-gal-item"><img src={g.s} alt={g.a}/></div>)}</div>
      <a className="proj-wa" href={WU} target="_blank" rel="noopener" onClick={()=>trackWA("ss")}>{t.ss_wa}</a>
    </div></section>

    <section className="proj fin" id="zedeast"><div className="proj-in">
      <div className="proj-head"><div className="proj-hero-img"><img src={IMG.zedVilla} alt="ZED East ORA أورا"/></div>
        <div className="proj-info"><div className="proj-logos"><img src={IMG.zedLogo} alt="ZED East"/><img src={IMG.logo} alt="ORA" style={{height:28}}/></div>
          <span className="proj-badge">{t.zed_badge}</span><h2 className="proj-title">{t.zed_title}</h2><p className="proj-desc">{t.zed_desc}</p>
          <div className="proj-price"><div className="proj-pr-item"><span>{t.ss_price_l}</span><strong>{t.zed_price}</strong></div><div className="proj-pr-item"><span>{t.ss_plan_l}</span><strong>{t.zed_plan}</strong></div></div>
          <div className="proj-highlights">{t.zed_hl.map((h,i)=><div key={i} className="proj-hl">{h}</div>)}</div>
        </div>
      </div>
      <div className="proj-gallery">{[{s:IMG.zedHero,a:"ZED East"},{s:IMG.zedBalcony,a:"ZED Balcony"},{s:IMG.zedAerial,a:"ZED Aerial"},{s:IMG.zedVilla2,a:"ZED Villa"}].map((g,i)=><div key={i} className="proj-gal-item"><img src={g.s} alt={g.a}/></div>)}</div>
      <a className="proj-wa" href={WU} target="_blank" rel="noopener" onClick={()=>trackWA("zed")}>{t.zed_wa}</a>
    </div></section>

    <section className="founder fin"><div className="founder-in">
      <div className="founder-img"><img src={IMG.founder} alt="نجيب ساويرس Naguib Sawiris ORA أورا"/></div>
      <div className="founder-info">
        <p style={{fontSize:10,letterSpacing:3,textTransform:"uppercase",color:"var(--color-gold)",marginBottom:8}}>{t.founder_tag}</p>
        <h3 className="founder-name">{t.founder_name}</h3><p className="founder-role">{t.founder_role}</p>
        <blockquote className="founder-quote">{t.founder_quote}</blockquote>
        <p className="founder-text">{t.founder_text}</p>
        <div className="founder-stats"><div className="founder-stat"><strong>{t.founder_s1}</strong><span>{t.founder_s1l}</span></div><div className="founder-stat"><strong>{t.founder_s2}</strong><span>{t.founder_s2l}</span></div><div className="founder-stat"><strong>{t.founder_s3}</strong><span>{t.founder_s3l}</span></div></div>
        <a className="proj-wa" href={WU} target="_blank" rel="noopener" onClick={()=>trackWA("founder")}>{t.contact_wa}</a>
      </div>
    </div></section>

    <section className="why fin"><div className="why-in">
      <p className="why-tag">{t.why_tag}</p><h2 className="why-h">{t.why_h}</h2>
      <div className="why-grid">
        <div className="why-card"><div className="why-num">01</div><h3>{t.why1_h}</h3><p>{t.why1_p}</p></div>
        <div className="why-card"><div className="why-num">02</div><h3>{t.why2_h}</h3><p>{t.why2_p}</p></div>
      </div>
      <a className="proj-wa" href={WU} target="_blank" rel="noopener" onClick={()=>trackWA("why")} style={{marginTop:28,display:"inline-flex"}}>{t.why_wa}</a>
    </div></section>

    <footer className="ft"><div className="ft-in">
      <img src={IMG.logo} alt="ORA" className="ft-logo"/><p className="ft-disc">{t.ft_disc}</p>
      <div className="ft-links"><a href="#" onClick={(e)=>{e.preventDefault();sPrv(true)}}>{t.privacy}</a><a href="#silversands">Silver Sands</a><a href="#zedeast">ZED East</a></div>
      <p className="ft-cr">© 2026 ORA Developers · أورا · سيلفر ساندس Silver Sands · ZED East</p>
    </div></footer>

    <a className="float-wa" href={WU} target="_blank" rel="noopener" onClick={()=>trackWA("float")}>💬</a>
    <a className="float-call" href={`tel:${PI}`} onClick={()=>trackCall("float")}>📞</a>

    <div className={`p-bk ${pop?"on":""}`} onClick={cp}/>
    <div className={`p-dlg ${pop?"on":""}`} dir={t.dir}><button className="p-x" onClick={cp}>✕</button>
      <p className="cd-label">{t.cd_label}</p>
      <div className="cd-bar"><div className="cd-box"><strong>{cd.d}</strong><span>{t.cd_day}</span></div><div className="cd-box"><strong>{cd.h}</strong><span>{t.cd_hr}</span></div><div className="cd-box"><strong>{cd.m}</strong><span>{t.cd_min}</span></div><div className="cd-box"><strong>{cd.s}</strong><span>{t.cd_sec}</span></div></div>
      <h2 className="hf-title">{t.pop_title}</h2><p className="hf-sub">{t.pop_sub}</p>
      {ps==="sent"?<div style={{textAlign:"center",padding:"14px 0"}}><div style={{fontSize:36}}>✓</div><p style={{color:"var(--color-gold)",fontWeight:700}}>✓</p></div>
      :<form ref={pfr} onSubmit={(e:FormEvent)=>{e.preventDefault();sub(pfr,sPs,"popup").then(()=>setTimeout(cp,2500))}}>
        <input type="hidden" name="access_key" value={WK}/><input type="hidden" name="subject" value="Popup — Silver Sands ORA"/><input type="hidden" name="from_name" value="SS Popup"/><input type="checkbox" name="botcheck" style={{display:"none"}}/>
        <div className="hf-field"><label>{t.f_name}</label><input name="name" placeholder={t.f_name_ph} required/></div>
        <div className="hf-field"><label>{t.f_phone}</label><input name="phone" type="tel" placeholder="+20 1XX XXX XXXX" required/></div>
        <button type="submit" className="hf-submit" disabled={ps==="sending"}>{ps==="sending"?"...":t.f_submit}</button>
        <a href={WU} target="_blank" rel="noopener" onClick={()=>trackWA("popup")} style={{display:"flex",alignItems:"center",justifyContent:"center",gap:6,marginTop:10,padding:10,borderRadius:10,background:"#25d366",color:"#fff",fontSize:12,fontWeight:700,textDecoration:"none"}}>{t.nav_wa}</a>
      </form>}
    </div>

    {prv&&<><div style={{position:"fixed",inset:0,zIndex:300,background:"rgba(0,0,0,.6)"}} onClick={()=>sPrv(false)}/><div style={{position:"fixed",zIndex:301,top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:"min(520px,92vw)",maxHeight:"85vh",overflowY:"auto",background:"#1a1a1a",border:"1px solid rgba(201,168,76,.15)",borderRadius:18,padding:"28px 24px",color:"#fff"}} dir={t.dir}>
      <button onClick={()=>sPrv(false)} style={{position:"absolute",top:10,[t.dir==="rtl"?"left":"right"]:10,background:"rgba(255,255,255,.06)",border:"none",borderRadius:"50%",width:28,height:28,color:"#fff",fontSize:14,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
      <h2 style={{fontFamily:"var(--font-head)",fontSize:22,fontWeight:600,marginBottom:12}}>{t.prv_title}</h2>
      <p style={{fontSize:11,lineHeight:1.8,color:"var(--color-muted)"}}>{t.prv_text}</p>
    </div></>}

    {ck&&<div className="ck" dir={t.dir}><p>{t.ck_text} <button onClick={()=>sPrv(true)} style={{background:"none",border:"none",color:"var(--color-gold)",textDecoration:"underline",cursor:"pointer",fontSize:10}}>{t.privacy}</button></p>
      <div className="ck-btns"><button className="ck-ok" onClick={()=>{sCk(false);try{localStorage.setItem("ssv2","1")}catch{}}}>{t.ck_ok}</button><button className="ck-no" onClick={()=>sCk(false)}>{t.ck_no}</button></div>
    </div>}

    <nav className="mbar"><div className="mbar-in">
      <a className="m-call" href={`tel:${PI}`} onClick={()=>trackCall("mob")}><PhI/> {PD}</a>
      <a className="m-wa" href={WU} target="_blank" rel="noopener" onClick={()=>trackWA("mob")}>{t.mob_wa}</a>
    </div></nav>
  </div>);
}
