export default function About() {
  return (
    <div style={{ minHeight: "100vh", background: "#080b0e", color: "#e8e8e8", fontFamily: "'Inter', 'IBM Plex Sans Arabic', sans-serif", padding: "80px 24px" }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <a href="/" style={{ color: "#c9a84c", fontSize: 12, textDecoration: "none", marginBottom: 32, display: "inline-block" }}>← العودة للرئيسية · Back to Home</a>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, marginBottom: 24 }}>About This Page · عن هذه الصفحة</h1>
        <div style={{ fontSize: 14, lineHeight: 2, color: "#7a8599" }}>
          <p style={{ marginBottom: 16 }}>
            هذه صفحة تسويقية أنشأها <strong style={{ color: "#c9a84c" }}>فريق مبيعات معتمد</strong> لمشروع سيلفر ساندس أورا — الساحل الشمالي، كيلو ٢٢٢. نحن لسنا المطور العقاري (أورا للتطوير العقاري) ولا نمثل أنفسنا كمطور. نعمل كوكلاء مبيعات مرخصين لتسهيل التواصل بين المشتري والمطور.
          </p>
          <p style={{ marginBottom: 16 }}>
            This is a marketing landing page created by an <strong style={{ color: "#c9a84c" }}>authorized sales team</strong> for the Silver Sands ORA project — North Coast, KM 222. We are not the real estate developer (ORA Developers) and do not represent ourselves as such. We operate as licensed sales agents facilitating communication between buyers and the developer.
          </p>
          <p style={{ marginBottom: 16 }}>
            جميع الأسعار والمساحات وخطط السداد المعروضة استرشادية وقابلة للتغيير من المطور بدون إشعار مسبق. العلامات التجارية المذكورة (أورا، سيلفر ساندس) ملك لأصحابها.
          </p>
          <p>
            All prices, areas, and payment plans shown are indicative and subject to change by the developer without prior notice. All trademarks mentioned (ORA, Silver Sands) belong to their respective owners.
          </p>
        </div>
      </div>
    </div>
  );
}
