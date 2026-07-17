"use client";
import{useEffect}from"react";
const PI="+201009260259",PD="0100 926 0259";
const WU=`https://wa.me/201009260259?text=${encodeURIComponent("مرحباً، لسه سجلت في سيلفر ساندس أورا — Silver Sands ORA")}`;
export default function ThankYou(){
  useEffect(()=>{
    // ══ Google Ads Conversion ══
    // const w=window as any;if(w.gtag)w.gtag("event","conversion",{send_to:"AW-XXXXXXX/XXXXXXX"});
  },[]);
  return(
    <div style={{minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",background:"#0a0a0a",padding:"40px 24px",fontFamily:"'Inter',sans-serif",textAlign:"center",color:"#fff"}}>
      <img src="https://ora.properties-eg.com/ora-logo-new.png" alt="ORA أورا" style={{height:44,marginBottom:24,opacity:.7}}/>
      <div style={{width:72,height:72,borderRadius:"50%",background:"rgba(201,168,76,.1)",border:"2px solid rgba(201,168,76,.25)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:36,marginBottom:20}}>✓</div>
      <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(24px,5vw,40px)",fontWeight:600,marginBottom:10}}>شكراً — Thank You!</h1>
      <p style={{fontSize:14,color:"rgba(255,255,255,.6)",maxWidth:460,lineHeight:1.7,marginBottom:6,fontFamily:"'IBM Plex Sans Arabic',sans-serif"}}>فريق <strong style={{color:"#c9a84c"}}>سيلفر ساندس أورا — Silver Sands ORA</strong> هيتواصل معاك قريب بالأسعار والتفاصيل الحصرية.</p>
      <p style={{fontSize:11,color:"rgba(255,255,255,.3)",marginBottom:28}}>سيلفر ساندس الساحل الشمالي · Silver Sands North Coast · ZED East · أورا ORA</p>
      <div style={{display:"flex",gap:10,flexWrap:"wrap",justifyContent:"center",marginBottom:28}}>
        <a href={WU} target="_blank" rel="noopener" style={{display:"flex",alignItems:"center",gap:7,padding:"13px 26px",background:"#25d366",color:"#fff",borderRadius:10,fontSize:13,fontWeight:700,textDecoration:"none"}}>💬 واتساب · WhatsApp</a>
        <a href={`tel:${PI}`} style={{display:"flex",alignItems:"center",gap:7,padding:"13px 26px",border:"1px solid rgba(201,168,76,.3)",color:"#c9a84c",borderRadius:10,fontSize:13,fontWeight:700,textDecoration:"none"}}>{PD}</a>
        <a href="/" style={{padding:"13px 26px",border:"1px solid rgba(255,255,255,.1)",color:"rgba(255,255,255,.5)",borderRadius:10,fontSize:12,textDecoration:"none"}}>← العودة · Back</a>
      </div>
      <p style={{fontSize:8,color:"rgba(255,255,255,.15)",marginTop:20}}>© 2026 ORA Developers · أورا · سيلفر ساندس Silver Sands · ZED East</p>
    </div>
  );
}
