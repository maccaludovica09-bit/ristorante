import { useState, useRef, useEffect } from "react";

const COLORS = {
  bg: "#0C0B0A",
  bgWarm: "#110F0D",
  card: "rgba(26,24,22,0.9)",
  cardSolid: "#1A1816",
  accent: "#C8956C",
  accentLight: "#D4A97A",
  accentDark: "#A07450",
  accentGlow: "rgba(200,149,108,0.2)",
  text: "#F5F0EB",
  textSecondary: "rgba(245,240,235,0.55)",
  textTertiary: "rgba(245,240,235,0.3)",
  border: "rgba(245,240,235,0.07)",
  borderLight: "rgba(245,240,235,0.12)",
  glass: "rgba(245,240,235,0.03)",
  success: "#7CB68E",
  gold: "#D4A24E",
  cream: "#F5F0EB",
  wine: "#8B3A4A",
  olive: "#6B7B5E",
};

const categories = [
  { id: "all", label: "Tutto" },
  { id: "antipasti", label: "Antipasti" },
  { id: "primi", label: "Primi" },
  { id: "secondi", label: "Secondi" },
  { id: "dolci", label: "Dolci" },
  { id: "bevande", label: "Bevande" },
];

const menuItems = [
  { id: 1, name: "Burrata Pugliese", desc: "Con pomodorini datterini, basilico fresco e riduzione di aceto balsamico", price: 16, category: "antipasti", rating: 4.9, time: "8 min", tags: ["Chef's Pick"] },
  { id: 2, name: "Tartare di Tonno", desc: "Tonno rosso, avocado, sesamo nero e salsa ponzu alla yuzu", price: 22, category: "antipasti", rating: 4.8, time: "12 min", tags: ["Nuovo"] },
  { id: 3, name: "Carpaccio di Polpo", desc: "Polpo grigliato, patate schiacciate, olive taggiasche e capperi", price: 19, category: "antipasti", rating: 4.7, time: "10 min", tags: [] },
  { id: 4, name: "Cacio e Pepe", desc: "Tonnarelli freschi, pecorino romano DOP 36 mesi e pepe di Sarawak", price: 18, category: "primi", rating: 5.0, time: "15 min", tags: ["Bestseller"] },
  { id: 5, name: "Risotto allo Zafferano", desc: "Carnaroli, zafferano iraniano, midollo e parmigiano 48 mesi", price: 24, category: "primi", rating: 4.9, time: "22 min", tags: ["Chef's Pick"] },
  { id: 6, name: "Paccheri all'Amatriciana", desc: "Guanciale croccante, pomodoro San Marzano e pecorino", price: 17, category: "primi", rating: 4.8, time: "18 min", tags: [] },
  { id: 7, name: "Ravioli al Tartufo", desc: "Pasta fresca ripiena di ricotta, tartufo nero pregiato e burro nocciola", price: 28, category: "primi", rating: 4.9, time: "20 min", tags: ["Premium"] },
  { id: 8, name: "Filetto di Manzo", desc: "Black Angus, fonduta di parmigiano, asparagi grigliati e jus al vino rosso", price: 38, category: "secondi", rating: 4.9, time: "25 min", tags: ["Premium"] },
  { id: 9, name: "Branzino al Forno", desc: "Branzino selvaggio, crosta di erbe, patate al limone e salsa verde", price: 32, category: "secondi", rating: 4.7, time: "28 min", tags: [] },
  { id: 10, name: "Ossobuco alla Milanese", desc: "Ossobuco brasato lentamente, gremolata e risotto giallo", price: 34, category: "secondi", rating: 4.8, time: "30 min", tags: ["Tradizione"] },
  { id: 11, name: "Tiramisù Classico", desc: "Savoiardi, mascarpone, caffè espresso e cacao amaro Valrhona", price: 12, category: "dolci", rating: 5.0, time: "5 min", tags: ["Bestseller"] },
  { id: 12, name: "Panna Cotta", desc: "Vaniglia Bourbon, coulis di frutti di bosco e crumble al pistacchio", price: 11, category: "dolci", rating: 4.8, time: "5 min", tags: [] },
  { id: 13, name: "Semifreddo al Limone", desc: "Limoni di Amalfi, meringa italiana e basilico cristallizzato", price: 13, category: "dolci", rating: 4.7, time: "5 min", tags: ["Nuovo"] },
  { id: 14, name: "Vino Rosso della Casa", desc: "Chianti Classico DOCG, Toscana — Bicchiere 175ml", price: 9, category: "bevande", rating: 4.6, time: "1 min", tags: [] },
  { id: 15, name: "Cocktail Negroni", desc: "Gin, Campari, Vermouth rosso — il classico italiano", price: 14, category: "bevande", rating: 4.9, time: "3 min", tags: ["Signature"] },
  { id: 16, name: "Acqua Minerale", desc: "San Pellegrino — Bottiglia 750ml", price: 4, category: "bevande", rating: 4.5, time: "1 min", tags: [] },
];

const promoOffers = [
  { id: 1, tag: "Offerta Speciale", title: "Menu Degustazione", subtitle: "5 portate + vino in abbinamento", price: 65, oldPrice: 89, imgLabel: "Degustazione" },
  { id: 2, tag: "Weekend Special", title: "Brunch della Domenica", subtitle: "Antipasto, primo, dolce e drink", price: 35, oldPrice: 52, imgLabel: "Brunch" },
  { id: 3, tag: "Per Due", title: "Cena Romantica", subtitle: "Menu a 4 mani con calice di bollicine", price: 95, oldPrice: 130, imgLabel: "Romantica" },
  { id: 4, tag: "Business Lunch", title: "Menu Pranzo Express", subtitle: "Primo + secondo + caffè in 45 min", price: 22, oldPrice: 35, imgLabel: "Business" },
];

const reviews = [
  { id: 1, name: "Marco R.", rating: 5, text: "Cacio e Pepe sublime, servizio impeccabile. Torneremo sicuramente!", date: "2 giorni fa", avatar: "M" },
  { id: 2, name: "Giulia P.", rating: 5, text: "Ambiente elegante e curato. Il risotto allo zafferano è il migliore che abbia mai assaggiato.", date: "1 settimana fa", avatar: "G" },
  { id: 3, name: "Alessandro T.", rating: 4, text: "Ottima cena romantica, la terrazza è fantastica. Porzioni generose e vino eccellente.", date: "2 settimane fa", avatar: "A" },
  { id: 4, name: "Sofia M.", rating: 5, text: "Il tiramisù è un capolavoro. Staff gentilissimo e attento alle allergie.", date: "3 settimane fa", avatar: "S" },
  { id: 5, name: "Luca B.", rating: 5, text: "Menu degustazione spettacolare. Ogni portata era una sorpresa, consigliatissimo!", date: "1 mese fa", avatar: "L" },
];

const ambienteSpaces = [
  { id: "sala", name: "Sala Principale", desc: "Il cuore del ristorante, con soffitti a volta e illuminazione calda", mediaCount: { photos: 12, videos: 2 },
    gallery: [
      { type: "photo", label: "Vista panoramica sala" },
      { type: "photo", label: "Dettaglio tavoli" },
      { type: "photo", label: "Illuminazione serale" },
      { type: "video", label: "Tour virtuale sala" },
      { type: "photo", label: "Angolo bar" },
      { type: "photo", label: "Dettaglio arredo" },
      { type: "video", label: "Atmosfera serale" },
      { type: "photo", label: "Ingresso" },
    ]},
  { id: "terrazza", name: "Terrazza", desc: "Vista suggestiva sulla città, ideale per cene estive e aperitivi", mediaCount: { photos: 8, videos: 1 },
    gallery: [
      { type: "photo", label: "Panorama terrazza" },
      { type: "photo", label: "Tavoli all'aperto" },
      { type: "video", label: "Tramonto dalla terrazza" },
      { type: "photo", label: "Setup serale" },
      { type: "photo", label: "Dettaglio piante" },
      { type: "photo", label: "Vista notturna" },
    ]},
  { id: "cantina", name: "Cantina", desc: "Oltre 500 etichette selezionate, con degustazioni private su prenotazione", mediaCount: { photos: 6, videos: 1 },
    gallery: [
      { type: "photo", label: "Scaffali vini" },
      { type: "photo", label: "Sala degustazione" },
      { type: "video", label: "Il sommelier racconta" },
      { type: "photo", label: "Etichette pregiate" },
      { type: "photo", label: "Botti d'epoca" },
      { type: "photo", label: "Angolo tasting" },
    ]},
  { id: "cucina", name: "Cucina a Vista", desc: "Guarda i nostri chef al lavoro, preparazioni dal vivo ogni sera", mediaCount: { photos: 10, videos: 3 },
    gallery: [
      { type: "photo", label: "Chef al lavoro" },
      { type: "video", label: "Preparazione pasta" },
      { type: "photo", label: "Bancone cucina" },
      { type: "photo", label: "Ingredienti freschi" },
      { type: "video", label: "Fiammata" },
      { type: "photo", label: "Impiattamento" },
      { type: "video", label: "Dietro le quinte" },
      { type: "photo", label: "Il team" },
    ]},
];

/* ── Shared Components ── */

const ImagePlaceholder = ({ width, height, borderRadius = 16, label, style = {} }) => (
  <div style={{
    width, height, borderRadius, overflow: "hidden", position: "relative",
    background: `linear-gradient(145deg, ${COLORS.cardSolid}, rgba(200,149,108,0.08))`,
    border: `1px dashed rgba(200,149,108,0.2)`,
    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6,
    flexShrink: 0, ...style,
  }}>
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="18" height="18" rx="3" stroke={COLORS.accentDark} strokeWidth="1.5" opacity="0.4"/>
      <circle cx="8.5" cy="8.5" r="2" stroke={COLORS.accentDark} strokeWidth="1.5" opacity="0.4"/>
      <path d="M3 16L8 11L13 16" stroke={COLORS.accentDark} strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
      <path d="M13 14L16 11L21 16" stroke={COLORS.accentDark} strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
    </svg>
    {label && <span style={{ fontSize: 9, fontWeight: 600, color: COLORS.textTertiary, textTransform: "uppercase", letterSpacing: 0.8, textAlign: "center", padding: "0 4px" }}>{label}</span>}
  </div>
);

const VideoPlaceholder = ({ width, height, borderRadius = 16, label, style = {} }) => (
  <div style={{
    width, height, borderRadius, overflow: "hidden", position: "relative",
    background: `linear-gradient(145deg, rgba(139,58,74,0.12), rgba(200,149,108,0.08))`,
    border: `1px dashed rgba(139,58,74,0.3)`,
    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6,
    flexShrink: 0, ...style,
  }}>
    <div style={{ width: 40, height: 40, borderRadius: 20, background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M8 5.14V19.14L19 12.14L8 5.14Z" fill={COLORS.cream} opacity="0.6"/></svg>
    </div>
    {label && <span style={{ fontSize: 9, fontWeight: 600, color: COLORS.textTertiary, textTransform: "uppercase", letterSpacing: 0.8, textAlign: "center", padding: "0 4px" }}>{label}</span>}
  </div>
);

const SlideIndicators = ({ total, active }) => (
  <div style={{ display: "flex", gap: 5, justifyContent: "center", marginTop: 12 }}>
    {Array.from({ length: total }).map((_, i) => (
      <div key={i} style={{
        width: i === active ? 20 : 6, height: 6, borderRadius: 3,
        background: i === active ? COLORS.accent : COLORS.border,
        transition: "all 0.3s ease",
      }} />
    ))}
  </div>
);

const useScrollIndex = (ref, itemWidth) => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handler = () => {
      const newIndex = Math.round(el.scrollLeft / itemWidth);
      setIndex(newIndex);
    };
    el.addEventListener("scroll", handler, { passive: true });
    return () => el.removeEventListener("scroll", handler);
  }, [ref, itemWidth]);
  return index;
};

const BackButton = ({ onClick }) => (
  <div onClick={onClick} style={{ width: 40, height: 40, borderRadius: 14, background: COLORS.glass, border: `1px solid ${COLORS.border}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M15 19L8 12L15 5" stroke={COLORS.cream} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
  </div>
);

const StatusBar = () => (
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 24px 4px", color: COLORS.text, fontSize: 14, fontWeight: 600 }}>
    <span>9:41</span>
    <div style={{ width: 126, height: 34, background: "#000", borderRadius: 20, position: "absolute", left: "50%", transform: "translateX(-50%)", top: 0 }} />
    <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
      <svg width="17" height="12" viewBox="0 0 17 12"><rect x="0" y="5" width="3" height="7" rx="1" fill={COLORS.cream}/><rect x="4.5" y="3" width="3" height="9" rx="1" fill={COLORS.cream}/><rect x="9" y="1" width="3" height="11" rx="1" fill={COLORS.cream}/><rect x="13.5" y="0" width="3" height="12" rx="1" fill={COLORS.cream}/></svg>
      <svg width="16" height="12" viewBox="0 0 16 12"><path d="M8 2.4C10.6 2.4 12.9 3.5 14.5 5.2L15.7 4C13.8 2 11 .8 8 .8S2.2 2 .3 4L1.5 5.2C3.1 3.5 5.4 2.4 8 2.4ZM8 6C9.7 6 11.2 6.7 12.3 7.8L13.5 6.6C12.1 5.2 10.1 4.4 8 4.4S3.9 5.2 2.5 6.6L3.7 7.8C4.8 6.7 6.3 6 8 6ZM8 9.6C8.9 9.6 9.7 10 10.3 10.6L8 13.2L5.7 10.6C6.3 10 7.1 9.6 8 9.6Z" fill={COLORS.cream}/></svg>
      <div style={{ width: 27, height: 13, border: `1.5px solid rgba(245,240,235,0.35)`, borderRadius: 4, padding: 1.5, position: "relative" }}>
        <div style={{ width: "75%", height: "100%", background: COLORS.success, borderRadius: 2 }}/>
        <div style={{ position: "absolute", right: -4, top: 3.5, width: 2, height: 5, background: "rgba(245,240,235,0.35)", borderRadius: "0 1px 1px 0" }}/>
      </div>
    </div>
  </div>
);

const TagBadge = ({ text }) => {
  const map = {
    "Chef's Pick": { bg: COLORS.accentGlow, color: COLORS.accent },
    "Premium": { bg: "rgba(212,162,78,0.12)", color: COLORS.gold },
    "Bestseller": { bg: "rgba(124,182,142,0.12)", color: COLORS.success },
    "Nuovo": { bg: "rgba(139,58,74,0.15)", color: "#D4687E" },
    "Tradizione": { bg: "rgba(107,123,94,0.15)", color: COLORS.olive },
    "Signature": { bg: "rgba(200,149,108,0.12)", color: COLORS.accent },
  };
  const s = map[text] || { bg: COLORS.glass, color: COLORS.textSecondary };
  return <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase", color: s.color, background: s.bg, padding: "3px 8px", borderRadius: 6 }}>{text}</span>;
};

const StarRating = ({ rating }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
    <span style={{ color: COLORS.gold, fontSize: 11 }}>★</span>
    <span style={{ fontSize: 12, fontWeight: 600, color: COLORS.text }}>{rating}</span>
  </div>
);

/* ── Pages ── */

const HomePage = ({ onNavigate, setActiveCategory, cart, setCart }) => {
  const featured = menuItems.filter(i => i.tags.includes("Chef's Pick") || i.tags.includes("Bestseller")).slice(0, 5);
  const promoRef = useRef(null);
  const featuredRef = useRef(null);
  const ambienteRef = useRef(null);
  const reviewsRef = useRef(null);
  const promoIndex = useScrollIndex(promoRef, 334);
  const featuredIndex = useScrollIndex(featuredRef, 204);
  const ambienteIndex = useScrollIndex(ambienteRef, 230);
  const reviewsIndex = useScrollIndex(reviewsRef, 290);

  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(c => c.id === item.id);
      if (existing) return prev.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { ...item, qty: 1 }];
    });
  };
  const removeFromCart = (item) => {
    setCart(prev => {
      const existing = prev.find(c => c.id === item.id);
      if (!existing) return prev;
      if (existing.qty === 1) return prev.filter(c => c.id !== item.id);
      return prev.map(c => c.id === item.id ? { ...c, qty: c.qty - 1 } : c);
    });
  };
  const getQty = (id) => cart.find(c => c.id === id)?.qty || 0;

  return (
    <div style={{ paddingBottom: 100 }}>
      {/* Hero */}
      <div style={{ position: "relative", margin: "8px 16px 0", borderRadius: 28, overflow: "hidden" }}>
        <ImagePlaceholder width="100%" height={220} borderRadius={28} label="Hero — Il tuo ristorante"
          style={{ background: `linear-gradient(145deg, #1A1816, rgba(200,149,108,0.06))` }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "50px 22px 20px", background: "linear-gradient(180deg, transparent 0%, rgba(12,11,10,0.95) 100%)" }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: COLORS.accent, margin: 0, textTransform: "uppercase", letterSpacing: 2 }}>Benvenuto da</p>
          <h1 style={{ fontSize: 30, fontWeight: 800, color: COLORS.cream, margin: "4px 0 0", letterSpacing: -0.5, lineHeight: 1.1 }}>Osteria<br/>Moderna</h1>
        </div>
        <div style={{ position: "absolute", top: 16, right: 16, width: 42, height: 42, borderRadius: 21, background: "rgba(12,11,10,0.6)", backdropFilter: "blur(16px)", border: `1px solid ${COLORS.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke={COLORS.cream} strokeWidth="2"/><path d="M4 20C4 17 7 14 12 14S20 17 20 20" stroke={COLORS.cream} strokeWidth="2" strokeLinecap="round"/></svg>
        </div>
      </div>

      <div style={{ padding: "20px 20px 0" }}>
        <div style={{ background: COLORS.glass, borderRadius: 16, padding: "13px 16px", display: "flex", alignItems: "center", gap: 10, border: `1px solid ${COLORS.border}`, marginBottom: 24 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke={COLORS.textTertiary} strokeWidth="2"/><path d="M20 20L16.5 16.5" stroke={COLORS.textTertiary} strokeWidth="2" strokeLinecap="round"/></svg>
          <span style={{ fontSize: 15, color: COLORS.textTertiary, fontWeight: 400 }}>Cerca nel menu...</span>
        </div>
      </div>

      {/* Promo Carousel */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ padding: "0 20px", marginBottom: 14 }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: COLORS.text, margin: 0, letterSpacing: -0.2 }}>Offerte Speciali</h3>
        </div>
        <div ref={promoRef} style={{ display: "flex", gap: 14, overflowX: "auto", padding: "0 20px", scrollbarWidth: "none", scrollSnapType: "x mandatory" }}>
          {promoOffers.map(promo => (
            <div key={promo.id} style={{ minWidth: 320, borderRadius: 22, overflow: "hidden", position: "relative", border: `1px solid ${COLORS.border}`, flexShrink: 0, scrollSnapAlign: "start" }}>
              <ImagePlaceholder width="100%" height={170} borderRadius={0} label={promo.imgLabel}
                style={{ background: `linear-gradient(145deg, rgba(139,58,74,0.12), rgba(200,149,108,0.08))`, border: "none" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 15%, rgba(12,11,10,0.93) 100%)" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "14px 18px 16px" }}>
                <p style={{ fontSize: 9, fontWeight: 700, color: COLORS.accent, margin: 0, textTransform: "uppercase", letterSpacing: 2 }}>{promo.tag}</p>
                <h2 style={{ fontSize: 18, fontWeight: 800, color: COLORS.cream, margin: "3px 0 2px", lineHeight: 1.2 }}>{promo.title}</h2>
                <p style={{ fontSize: 11, color: COLORS.textSecondary, margin: 0 }}>{promo.subtitle}</p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 10 }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                    <span style={{ fontSize: 22, fontWeight: 800, color: COLORS.cream }}>€{promo.price}</span>
                    <span style={{ fontSize: 11, color: COLORS.textTertiary, textDecoration: "line-through" }}>€{promo.oldPrice}</span>
                  </div>
                  <div style={{ background: COLORS.accent, borderRadius: 8, padding: "5px 10px", cursor: "pointer" }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: COLORS.bg }}>Scopri di più</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <SlideIndicators total={promoOffers.length} active={promoIndex} />
      </div>

      {/* In Evidenza */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 20px", marginBottom: 14 }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: COLORS.text, margin: 0, letterSpacing: -0.2 }}>In Evidenza</h3>
          <span onClick={() => onNavigate("menu")} style={{ fontSize: 12, fontWeight: 600, color: COLORS.accent, cursor: "pointer" }}>Vedi tutto</span>
        </div>
        <div ref={featuredRef} style={{ display: "flex", gap: 14, overflowX: "auto", padding: "0 20px", scrollbarWidth: "none", scrollSnapType: "x mandatory" }}>
          {featured.map(item => {
            const qty = getQty(item.id);
            return (
              <div key={item.id} onClick={() => onNavigate("detail", item)} style={{ minWidth: 190, background: COLORS.card, borderRadius: 22, overflow: "hidden", border: `1px solid ${COLORS.border}`, cursor: "pointer", flexShrink: 0, scrollSnapAlign: "start" }}>
                <ImagePlaceholder width="100%" height={120} borderRadius={0} label={item.name}
                  style={{ borderRadius: 0, border: "none", borderBottom: `1px solid ${COLORS.border}` }} />
                <div style={{ padding: "12px 14px 14px" }}>
                  <div style={{ display: "flex", gap: 6, marginBottom: 6 }}>{item.tags.map(t => <TagBadge key={t} text={t} />)}</div>
                  <h4 style={{ fontSize: 14, fontWeight: 700, color: COLORS.text, margin: "0 0 4px" }}>{item.name}</h4>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <span style={{ fontSize: 16, fontWeight: 800, color: COLORS.accent }}>€{item.price}</span>
                    <StarRating rating={item.rating} />
                  </div>
                  <div onClick={e => e.stopPropagation()} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    {qty > 0 ? (
                      <>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, background: COLORS.glass, borderRadius: 10, padding: "3px 3px", border: `1px solid ${COLORS.border}`, flex: 1 }}>
                          <div onClick={() => removeFromCart(item)} style={{ width: 28, height: 28, borderRadius: 8, background: COLORS.cardSolid, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 14, color: COLORS.text }}>−</div>
                          <span style={{ fontSize: 13, fontWeight: 700, color: COLORS.text, flex: 1, textAlign: "center" }}>{qty}</span>
                          <div onClick={() => addToCart(item)} style={{ width: 28, height: 28, borderRadius: 8, background: COLORS.cardSolid, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 14, color: COLORS.text }}>+</div>
                        </div>
                        <div onClick={() => addToCart(item)} style={{ background: COLORS.accent, borderRadius: 10, padding: "7px 10px", cursor: "pointer" }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M6 6H21L19 15H8L6 6Z" stroke={COLORS.bg} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="10" cy="20" r="1.5" fill={COLORS.bg}/><circle cx="18" cy="20" r="1.5" fill={COLORS.bg}/></svg>
                        </div>
                      </>
                    ) : (
                      <div onClick={() => addToCart(item)} style={{ background: COLORS.accent, borderRadius: 10, padding: "8px 0", cursor: "pointer", textAlign: "center", width: "100%" }}>
                        <span style={{ fontSize: 12, fontWeight: 700, color: COLORS.bg }}>Aggiungi al Carrello</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <SlideIndicators total={featured.length} active={featuredIndex} />
      </div>

      {/* Categorie — single row */}
      <div style={{ padding: "0 20px", marginBottom: 28 }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, color: COLORS.text, margin: "0 0 14px", letterSpacing: -0.2 }}>Categorie</h3>
        <div style={{ display: "flex", gap: 10, overflowX: "auto", scrollbarWidth: "none" }}>
          {categories.filter(c => c.id !== "all").map(cat => (
            <div key={cat.id} onClick={() => { setActiveCategory(cat.id); onNavigate("menu"); }} style={{
              background: COLORS.card, borderRadius: 16, padding: "14px 18px", display: "flex", alignItems: "center", gap: 10, cursor: "pointer",
              border: `1px solid ${COLORS.border}`, flexShrink: 0, whiteSpace: "nowrap",
            }}>
              <ImagePlaceholder width={36} height={36} borderRadius={10} style={{ border: "none", background: `linear-gradient(145deg, ${COLORS.glass}, rgba(200,149,108,0.06))` }} />
              <span style={{ fontSize: 13, fontWeight: 600, color: COLORS.textSecondary }}>{cat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Il Nostro Ambiente — with indicators, clickable */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ padding: "0 20px", marginBottom: 14 }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: COLORS.text, margin: 0, letterSpacing: -0.2 }}>Il Nostro Ambiente</h3>
        </div>
        <div ref={ambienteRef} style={{ display: "flex", gap: 12, overflowX: "auto", padding: "0 20px", scrollbarWidth: "none", scrollSnapType: "x mandatory" }}>
          {ambienteSpaces.map(space => (
            <div key={space.id} onClick={() => onNavigate("ambiente", space)} style={{
              minWidth: 220, borderRadius: 20, overflow: "hidden", position: "relative",
              border: `1px solid ${COLORS.border}`, cursor: "pointer", flexShrink: 0, scrollSnapAlign: "start",
            }}>
              <ImagePlaceholder width="100%" height={140} borderRadius={0} label={space.name}
                style={{ border: "none", borderBottom: `1px solid ${COLORS.border}` }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 40%, rgba(12,11,10,0.9) 100%)" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "12px 16px 14px" }}>
                <h4 style={{ fontSize: 14, fontWeight: 700, color: COLORS.cream, margin: "0 0 3px" }}>{space.name}</h4>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <span style={{ fontSize: 10, color: COLORS.textSecondary }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" style={{ verticalAlign: "middle", marginRight: 3 }}><rect x="3" y="3" width="18" height="18" rx="3" stroke={COLORS.accent} strokeWidth="2"/><circle cx="8.5" cy="8.5" r="2" stroke={COLORS.accent} strokeWidth="2"/><path d="M3 16L8 11L13 16" stroke={COLORS.accent} strokeWidth="2"/></svg>
                    {space.mediaCount.photos} foto
                  </span>
                  <span style={{ fontSize: 10, color: COLORS.textSecondary }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" style={{ verticalAlign: "middle", marginRight: 3 }}><path d="M8 5.14V19.14L19 12.14L8 5.14Z" fill={COLORS.accent}/></svg>
                    {space.mediaCount.videos} video
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <SlideIndicators total={ambienteSpaces.length} active={ambienteIndex} />
      </div>

      {/* Recensioni */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 20px", marginBottom: 14 }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: COLORS.text, margin: 0, letterSpacing: -0.2 }}>Recensioni</h3>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <span style={{ color: COLORS.gold, fontSize: 14 }}>★</span>
            <span style={{ fontSize: 14, fontWeight: 800, color: COLORS.text }}>4.9</span>
            <span style={{ fontSize: 11, color: COLORS.textTertiary, marginLeft: 2 }}>(324)</span>
          </div>
        </div>
        <div ref={reviewsRef} style={{ display: "flex", gap: 12, overflowX: "auto", padding: "0 20px", scrollbarWidth: "none", scrollSnapType: "x mandatory" }}>
          {reviews.map(rev => (
            <div key={rev.id} style={{
              minWidth: 275, background: COLORS.card, borderRadius: 20, padding: 18,
              border: `1px solid ${COLORS.border}`, flexShrink: 0, scrollSnapAlign: "start",
              display: "flex", flexDirection: "column", gap: 10,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: 18, background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accentDark})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: COLORS.bg }}>{rev.avatar}</div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: COLORS.text, margin: 0 }}>{rev.name}</p>
                  <p style={{ fontSize: 10, color: COLORS.textTertiary, margin: 0 }}>{rev.date}</p>
                </div>
                <div style={{ display: "flex", gap: 2 }}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} style={{ fontSize: 10, color: i < rev.rating ? COLORS.gold : COLORS.textTertiary }}>★</span>
                  ))}
                </div>
              </div>
              <p style={{ fontSize: 13, color: COLORS.textSecondary, margin: 0, lineHeight: 1.5 }}>{rev.text}</p>
            </div>
          ))}
        </div>
        <SlideIndicators total={reviews.length} active={reviewsIndex} />
      </div>
    </div>
  );
};

/* ── Ambiente Detail Page ── */

const AmbienteDetailPage = ({ space, onNavigate }) => {
  if (!space) return null;
  const galleryRef = useRef(null);
  const galleryIndex = useScrollIndex(galleryRef, 290);

  return (
    <div style={{ paddingBottom: 100 }}>
      {/* Hero */}
      <div style={{ position: "relative" }}>
        <ImagePlaceholder width="100%" height={280} borderRadius={0} label={space.name}
          style={{ background: `linear-gradient(180deg, rgba(200,149,108,0.08), ${COLORS.bg})`, border: "none" }} />
        <div onClick={() => onNavigate("home")} style={{ position: "absolute", top: 56, left: 20, width: 40, height: 40, borderRadius: 14, background: "rgba(12,11,10,0.6)", backdropFilter: "blur(20px)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", border: `1px solid ${COLORS.border}` }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M15 19L8 12L15 5" stroke={COLORS.cream} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 80, background: `linear-gradient(180deg, transparent, ${COLORS.bg})` }} />
      </div>

      <div style={{ padding: "0 20px", marginTop: -30, position: "relative" }}>
        <div style={{ background: COLORS.card, borderRadius: 26, padding: "22px 20px", border: `1px solid ${COLORS.border}`, marginBottom: 24 }}>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: COLORS.text, margin: "0 0 8px", letterSpacing: -0.3 }}>{space.name}</h1>
          <p style={{ fontSize: 14, color: COLORS.textSecondary, margin: "0 0 16px", lineHeight: 1.6 }}>{space.desc}</p>
          <div style={{ display: "flex", gap: 12 }}>
            <div style={{ flex: 1, background: COLORS.glass, borderRadius: 14, padding: "12px 10px", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, border: `1px solid ${COLORS.border}` }}>
              <span style={{ fontSize: 20, fontWeight: 800, color: COLORS.text }}>{space.mediaCount.photos}</span>
              <span style={{ fontSize: 10, fontWeight: 600, color: COLORS.textTertiary, textTransform: "uppercase", letterSpacing: 0.5 }}>Foto</span>
            </div>
            <div style={{ flex: 1, background: COLORS.glass, borderRadius: 14, padding: "12px 10px", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, border: `1px solid ${COLORS.border}` }}>
              <span style={{ fontSize: 20, fontWeight: 800, color: COLORS.text }}>{space.mediaCount.videos}</span>
              <span style={{ fontSize: 10, fontWeight: 600, color: COLORS.textTertiary, textTransform: "uppercase", letterSpacing: 0.5 }}>Video</span>
            </div>
          </div>
        </div>

        {/* Gallery */}
        <h3 style={{ fontSize: 16, fontWeight: 700, color: COLORS.text, margin: "0 0 14px" }}>Galleria</h3>
      </div>

      <div ref={galleryRef} style={{ display: "flex", gap: 12, overflowX: "auto", padding: "0 20px", scrollbarWidth: "none", scrollSnapType: "x mandatory" }}>
        {space.gallery.map((media, i) => (
          media.type === "video" ? (
            <VideoPlaceholder key={i} width={275} height={200} borderRadius={20} label={media.label}
              style={{ flexShrink: 0, scrollSnapAlign: "start" }} />
          ) : (
            <ImagePlaceholder key={i} width={275} height={200} borderRadius={20} label={media.label}
              style={{ flexShrink: 0, scrollSnapAlign: "start", border: `1px solid ${COLORS.border}` }} />
          )
        ))}
      </div>
      <SlideIndicators total={space.gallery.length} active={galleryIndex} />

      {/* Grid thumbnails */}
      <div style={{ padding: "24px 20px 0" }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: COLORS.text, margin: "0 0 14px" }}>Tutte le Foto</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
          {space.gallery.map((media, i) => (
            media.type === "video" ? (
              <VideoPlaceholder key={i} width="100%" height={100} borderRadius={14} label=""
                style={{ border: `1px solid ${COLORS.border}` }} />
            ) : (
              <ImagePlaceholder key={i} width="100%" height={100} borderRadius={14}
                style={{ border: `1px solid ${COLORS.border}` }} />
            )
          ))}
        </div>
      </div>
    </div>
  );
};

const MenuPage = ({ onNavigate, cart, setCart, activeCategory, setActiveCategory }) => {
  const filtered = activeCategory === "all" ? menuItems : menuItems.filter(i => i.category === activeCategory);
  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(c => c.id === item.id);
      if (existing) return prev.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { ...item, qty: 1 }];
    });
  };
  const removeFromCart = (item) => {
    setCart(prev => {
      const existing = prev.find(c => c.id === item.id);
      if (!existing) return prev;
      if (existing.qty === 1) return prev.filter(c => c.id !== item.id);
      return prev.map(c => c.id === item.id ? { ...c, qty: c.qty - 1 } : c);
    });
  };
  const getQty = (id) => cart.find(c => c.id === id)?.qty || 0;

  return (
    <div style={{ paddingBottom: 100 }}>
      <div style={{ padding: "16px 20px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          <BackButton onClick={() => onNavigate("home")} />
          <h1 style={{ fontSize: 22, fontWeight: 800, color: COLORS.text, margin: 0, flex: 1, letterSpacing: -0.3 }}>Il Nostro Menu</h1>
        </div>
      </div>
      <div style={{ display: "flex", gap: 8, overflowX: "auto", padding: "0 20px 20px", scrollbarWidth: "none" }}>
        {categories.map(cat => {
          const active = activeCategory === cat.id;
          return (
            <div key={cat.id} onClick={() => setActiveCategory(cat.id)} style={{
              padding: "9px 18px", borderRadius: 30, cursor: "pointer", flexShrink: 0, whiteSpace: "nowrap",
              background: active ? COLORS.accent : COLORS.glass, border: `1px solid ${active ? COLORS.accent : COLORS.border}`,
            }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: active ? COLORS.bg : COLORS.textSecondary }}>{cat.label}</span>
            </div>
          );
        })}
      </div>
      <div style={{ padding: "0 20px", display: "flex", flexDirection: "column", gap: 12 }}>
        {filtered.map(item => {
          const qty = getQty(item.id);
          return (
            <div key={item.id} style={{ background: COLORS.card, borderRadius: 20, overflow: "hidden", border: `1px solid ${COLORS.border}` }}>
              <div style={{ display: "flex", gap: 14, padding: 14, cursor: "pointer" }} onClick={() => onNavigate("detail", item)}>
                <ImagePlaceholder width={88} height={88} borderRadius={16} style={{ border: `1px solid ${COLORS.border}` }} />
                <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <div style={{ display: "flex", gap: 6, marginBottom: 4 }}>{item.tags.map(t => <TagBadge key={t} text={t} />)}</div>
                  <h4 style={{ fontSize: 15, fontWeight: 700, color: COLORS.text, margin: "0 0 3px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.name}</h4>
                  <p style={{ fontSize: 12, color: COLORS.textSecondary, margin: 0, lineHeight: 1.4, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{item.desc}</p>
                </div>
              </div>
              <div style={{ padding: "0 14px 14px", display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 17, fontWeight: 800, color: COLORS.accent }}>€{item.price}</span>
                <StarRating rating={item.rating} />
                <div style={{ flex: 1 }} />
                {qty > 0 && (
                  <div style={{ display: "flex", alignItems: "center", gap: 6, background: COLORS.glass, borderRadius: 10, padding: "3px 3px", border: `1px solid ${COLORS.border}` }}>
                    <div onClick={() => removeFromCart(item)} style={{ width: 28, height: 28, borderRadius: 8, background: COLORS.cardSolid, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 14, color: COLORS.text }}>−</div>
                    <span style={{ fontSize: 13, fontWeight: 700, color: COLORS.text, minWidth: 16, textAlign: "center" }}>{qty}</span>
                    <div onClick={() => addToCart(item)} style={{ width: 28, height: 28, borderRadius: 8, background: COLORS.cardSolid, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 14, color: COLORS.text }}>+</div>
                  </div>
                )}
                <div onClick={() => addToCart(item)} style={{ background: COLORS.accent, borderRadius: 10, padding: qty > 0 ? "7px 10px" : "8px 16px", cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M6 6H21L19 15H8L6 6Z" stroke={COLORS.bg} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="10" cy="20" r="1.5" fill={COLORS.bg}/><circle cx="18" cy="20" r="1.5" fill={COLORS.bg}/></svg>
                  {!qty && <span style={{ fontSize: 12, fontWeight: 700, color: COLORS.bg }}>Aggiungi</span>}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const DetailPage = ({ item, onNavigate, cart, setCart }) => {
  const [note, setNote] = useState("");
  if (!item) return null;
  const qty = cart.find(c => c.id === item.id)?.qty || 0;
  const addToCart = () => { setCart(prev => { const e = prev.find(c => c.id === item.id); if (e) return prev.map(c => c.id === item.id ? { ...c, qty: c.qty + 1, note } : c); return [...prev, { ...item, qty: 1, note }]; }); };
  const removeFromCart = () => { setCart(prev => { const e = prev.find(c => c.id === item.id); if (!e) return prev; if (e.qty === 1) return prev.filter(c => c.id !== item.id); return prev.map(c => c.id === item.id ? { ...c, qty: c.qty - 1 } : c); }); };

  return (
    <div style={{ paddingBottom: 130 }}>
      <div style={{ position: "relative" }}>
        <ImagePlaceholder width="100%" height={320} borderRadius={0} label={`Foto — ${item.name}`}
          style={{ background: `linear-gradient(180deg, rgba(200,149,108,0.08) 0%, ${COLORS.bg} 100%)`, border: "none" }} />
        <div onClick={() => onNavigate("menu")} style={{ position: "absolute", top: 56, left: 20, width: 40, height: 40, borderRadius: 14, background: "rgba(12,11,10,0.6)", backdropFilter: "blur(20px)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", border: `1px solid ${COLORS.border}` }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M15 19L8 12L15 5" stroke={COLORS.cream} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 60, background: `linear-gradient(180deg, transparent, ${COLORS.bg})` }} />
      </div>
      <div style={{ padding: "0 20px", marginTop: -30, position: "relative" }}>
        <div style={{ background: COLORS.card, borderRadius: 26, padding: "22px 20px", border: `1px solid ${COLORS.border}` }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>{item.tags.map(t => <TagBadge key={t} text={t} />)}</div>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: COLORS.text, margin: "0 0 6px", letterSpacing: -0.3 }}>{item.name}</h1>
          <p style={{ fontSize: 14, color: COLORS.textSecondary, margin: "0 0 18px", lineHeight: 1.6 }}>{item.desc}</p>
          <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
            {[{ label: item.time, sub: "Preparazione" }, { label: item.rating, sub: "Valutazione" }, { label: `€${item.price}`, sub: "Prezzo" }].map((info, i) => (
              <div key={i} style={{ flex: 1, background: COLORS.glass, borderRadius: 16, padding: "14px 8px", display: "flex", flexDirection: "column", alignItems: "center", gap: 2, border: `1px solid ${COLORS.border}` }}>
                <span style={{ fontSize: 16, fontWeight: 800, color: COLORS.text }}>{info.label}</span>
                <span style={{ fontSize: 10, fontWeight: 600, color: COLORS.textTertiary, textTransform: "uppercase", letterSpacing: 0.5 }}>{info.sub}</span>
              </div>
            ))}
          </div>
          <div style={{ background: COLORS.glass, borderRadius: 18, padding: 16, border: `1px solid ${COLORS.border}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M14 2H6C5.45 2 5 2.45 5 3V21C5 21.55 5.45 22 6 22H18C18.55 22 19 21.55 19 21V7L14 2Z" stroke={COLORS.accent} strokeWidth="1.5"/><path d="M14 2V7H19" stroke={COLORS.accent} strokeWidth="1.5"/><path d="M9 13H15M9 17H12" stroke={COLORS.accent} strokeWidth="1.5" strokeLinecap="round"/></svg>
              <h4 style={{ fontSize: 14, fontWeight: 700, color: COLORS.text, margin: 0 }}>Note per la cucina</h4>
            </div>
            <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Aggiunte, sostituzioni, allergie, preferenze di cottura..."
              style={{ width: "100%", minHeight: 72, background: COLORS.cardSolid, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: "12px 14px", color: COLORS.text, fontSize: 13, fontFamily: "inherit", resize: "vertical", outline: "none", lineHeight: 1.5, boxSizing: "border-box" }} />
            <div style={{ display: "flex", gap: 6, marginTop: 10, flexWrap: "wrap" }}>
              {["Senza glutine", "Senza lattosio", "Extra piccante", "Cottura al sangue", "Porzione ridotta"].map(tag => (
                <div key={tag} onClick={() => setNote(prev => prev ? prev + ", " + tag : tag)} style={{ padding: "5px 10px", borderRadius: 8, background: COLORS.cardSolid, border: `1px solid ${COLORS.border}`, cursor: "pointer", fontSize: 11, color: COLORS.textSecondary, fontWeight: 500 }}>{tag}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, maxWidth: 430, margin: "0 auto", padding: "16px 20px", paddingBottom: 34, background: `linear-gradient(180deg, transparent, ${COLORS.bg} 30%)` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 26, fontWeight: 800, color: COLORS.accent }}>€{item.price}</span>
          <div style={{ flex: 1 }} />
          <div style={{ display: "flex", alignItems: "center", gap: 8, background: COLORS.glass, borderRadius: 14, padding: "5px 5px", border: `1px solid ${COLORS.border}` }}>
            <div onClick={removeFromCart} style={{ width: 34, height: 34, borderRadius: 10, background: COLORS.cardSolid, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 17, color: qty > 0 ? COLORS.text : COLORS.textTertiary }}>−</div>
            <span style={{ fontSize: 16, fontWeight: 700, color: COLORS.text, minWidth: 20, textAlign: "center" }}>{qty}</span>
            <div onClick={addToCart} style={{ width: 34, height: 34, borderRadius: 10, background: COLORS.cardSolid, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 17, color: COLORS.text }}>+</div>
          </div>
          <div onClick={addToCart} style={{ background: COLORS.accent, borderRadius: 14, padding: "13px 20px", cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M6 6H21L19 15H8L6 6Z" stroke={COLORS.bg} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="10" cy="20" r="1.5" fill={COLORS.bg}/><circle cx="18" cy="20" r="1.5" fill={COLORS.bg}/></svg>
            <span style={{ fontSize: 14, fontWeight: 700, color: COLORS.bg }}>Aggiungi</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const CartPage = ({ onNavigate, cart, setCart }) => {
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const discount = promoApplied ? Math.round(total * 0.1 * 100) / 100 : 0;
  const finalTotal = total + 2 - discount;
  const totalItems = cart.reduce((sum, i) => sum + i.qty, 0);
  const updateQty = (id, delta) => { setCart(prev => prev.map(c => c.id === id ? { ...c, qty: Math.max(0, c.qty + delta) } : c).filter(c => c.qty > 0)); };
  const paymentMethods = [
    { id: "card", label: "Carta", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="2" y="5" width="20" height="14" rx="3" stroke="currentColor" strokeWidth="1.5"/><path d="M2 10H22" stroke="currentColor" strokeWidth="1.5"/><path d="M6 15H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg> },
    { id: "apple", label: "Apple Pay", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M17.05 12.54C17.02 9.8 19.27 8.5 19.37 8.44C18.07 6.56 16.07 6.3 15.37 6.28C13.67 6.1 12.04 7.29 11.18 7.29C10.3 7.29 8.97 6.3 7.55 6.33C5.72 6.36 4.02 7.42 3.08 9.09C1.14 12.48 2.58 17.52 4.43 20.27C5.35 21.62 6.43 23.13 7.85 23.07C9.23 23.01 9.76 22.18 11.42 22.18C13.06 22.18 13.55 23.07 14.99 23.04C16.48 23.01 17.41 21.68 18.29 20.31C19.35 18.74 19.77 17.2 19.79 17.12C19.75 17.11 17.08 16.07 17.05 12.54Z" fill="currentColor"/><path d="M14.53 4.42C15.28 3.5 15.79 2.23 15.64 0.95C14.56 1 13.22 1.7 12.44 2.6C11.75 3.4 11.13 4.72 11.3 5.96C12.51 6.05 13.75 5.32 14.53 4.42Z" fill="currentColor"/></svg> },
    { id: "cash", label: "Contanti", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="2" y="6" width="20" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/><path d="M6 12H6.01M18 12H18.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg> },
  ];
  return (
    <div style={{ paddingBottom: 190 }}>
      <div style={{ padding: "16px 20px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
          <BackButton onClick={() => onNavigate("home")} />
          <h1 style={{ fontSize: 22, fontWeight: 800, color: COLORS.text, margin: 0, flex: 1, letterSpacing: -0.3 }}>Il Tuo Ordine</h1>
          {totalItems > 0 && <span style={{ fontSize: 12, fontWeight: 600, color: COLORS.textTertiary, background: COLORS.glass, padding: "4px 10px", borderRadius: 8, border: `1px solid ${COLORS.border}` }}>{totalItems} {totalItems === 1 ? "piatto" : "piatti"}</span>}
        </div>
      </div>
      {cart.length === 0 ? (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px 40px", textAlign: "center" }}>
          <div style={{ width: 80, height: 80, borderRadius: 40, background: COLORS.glass, border: `1px solid ${COLORS.border}`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none"><path d="M6 6H21L19 15H8L6 6ZM6 6L5 2H2" stroke={COLORS.textTertiary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="10" cy="20" r="1.5" fill={COLORS.textTertiary}/><circle cx="18" cy="20" r="1.5" fill={COLORS.textTertiary}/></svg>
          </div>
          <h3 style={{ fontSize: 19, fontWeight: 700, color: COLORS.text, margin: "0 0 6px" }}>Carrello Vuoto</h3>
          <p style={{ fontSize: 13, color: COLORS.textSecondary, margin: "0 0 24px", lineHeight: 1.5 }}>Esplora il nostro menu e aggiungi i tuoi piatti preferiti</p>
          <div onClick={() => onNavigate("menu")} style={{ background: COLORS.accent, borderRadius: 14, padding: "13px 28px", cursor: "pointer" }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: COLORS.bg }}>Vai al Menu</span>
          </div>
        </div>
      ) : (
        <div style={{ padding: "0 20px", display: "flex", flexDirection: "column", gap: 12 }}>
          {cart.map(item => (
            <div key={item.id} style={{ background: COLORS.card, borderRadius: 20, padding: 14, display: "flex", gap: 12, border: `1px solid ${COLORS.border}` }}>
              <ImagePlaceholder width={60} height={60} borderRadius={14} style={{ border: `1px solid ${COLORS.border}` }} />
              <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <h4 style={{ fontSize: 14, fontWeight: 700, color: COLORS.text, margin: "0 0 2px" }}>{item.name}</h4>
                {item.note && <p style={{ fontSize: 11, color: COLORS.accent, margin: "0 0 3px", fontStyle: "italic" }}>"{item.note}"</p>}
                <span style={{ fontSize: 15, fontWeight: 800, color: COLORS.accent }}>€{(item.price * item.qty).toFixed(2)}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, background: COLORS.glass, borderRadius: 12, padding: "3px", border: `1px solid ${COLORS.border}` }}>
                <div onClick={() => updateQty(item.id, -1)} style={{ width: 30, height: 30, borderRadius: 9, background: COLORS.cardSolid, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 15, color: COLORS.text }}>−</div>
                <span style={{ fontSize: 14, fontWeight: 700, color: COLORS.text, minWidth: 16, textAlign: "center" }}>{item.qty}</span>
                <div onClick={() => updateQty(item.id, 1)} style={{ width: 30, height: 30, borderRadius: 9, background: COLORS.cardSolid, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 15, color: COLORS.text }}>+</div>
              </div>
            </div>
          ))}
          <div style={{ background: COLORS.card, borderRadius: 20, padding: 18, border: `1px solid ${COLORS.border}`, marginTop: 6 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M21 5H3C2.45 5 2 5.45 2 6V10C3.1 10 4 10.9 4 12S3.1 14 2 14V18C2 18.55 2.45 19 3 19H21C21.55 19 22 18.55 22 18V14C20.9 14 20 13.1 20 12S20.9 10 22 10V6C22 5.45 21.55 5 21 5Z" stroke={COLORS.accent} strokeWidth="1.5"/><path d="M10 5V19" stroke={COLORS.accent} strokeWidth="1.5" strokeDasharray="3 3"/></svg>
              <h4 style={{ fontSize: 14, fontWeight: 700, color: COLORS.text, margin: 0 }}>Codice Sconto</h4>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <input value={promoCode} onChange={(e) => { setPromoCode(e.target.value.toUpperCase()); setPromoApplied(false); }} placeholder="Inserisci codice..."
                style={{ flex: 1, background: COLORS.cardSolid, border: `1px solid ${promoApplied ? COLORS.success : COLORS.border}`, borderRadius: 12, padding: "11px 14px", color: COLORS.text, fontSize: 13, fontFamily: "inherit", outline: "none", letterSpacing: 1, fontWeight: 600 }} />
              <div onClick={() => { if (promoCode.length >= 3) setPromoApplied(true); }} style={{ background: promoCode.length >= 3 ? COLORS.accent : COLORS.glass, borderRadius: 12, padding: "11px 18px", cursor: promoCode.length >= 3 ? "pointer" : "default", display: "flex", alignItems: "center", border: `1px solid ${promoCode.length >= 3 ? COLORS.accent : COLORS.border}` }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: promoCode.length >= 3 ? COLORS.bg : COLORS.textTertiary }}>Applica</span>
              </div>
            </div>
            {promoApplied && <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 10, padding: "8px 12px", background: "rgba(124,182,142,0.1)", borderRadius: 10, border: `1px solid rgba(124,182,142,0.2)` }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill={COLORS.success}/><path d="M8 12L11 15L16 9" stroke={COLORS.bg} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <span style={{ fontSize: 12, fontWeight: 600, color: COLORS.success }}>Sconto del 10% applicato! (−€{discount.toFixed(2)})</span>
            </div>}
          </div>
          <div style={{ background: COLORS.card, borderRadius: 20, padding: 18, border: `1px solid ${COLORS.border}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="2" y="5" width="20" height="14" rx="3" stroke={COLORS.accent} strokeWidth="1.5"/><path d="M2 10H22" stroke={COLORS.accent} strokeWidth="1.5"/></svg>
              <h4 style={{ fontSize: 14, fontWeight: 700, color: COLORS.text, margin: 0 }}>Metodo di Pagamento</h4>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {paymentMethods.map(pm => { const active = paymentMethod === pm.id; return (
                <div key={pm.id} onClick={() => setPaymentMethod(pm.id)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", borderRadius: 14, cursor: "pointer", background: active ? "rgba(200,149,108,0.08)" : COLORS.glass, border: `1.5px solid ${active ? COLORS.accent : COLORS.border}` }}>
                  <div style={{ width: 20, height: 20, borderRadius: 10, border: `2px solid ${active ? COLORS.accent : COLORS.textTertiary}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{active && <div style={{ width: 10, height: 10, borderRadius: 5, background: COLORS.accent }} />}</div>
                  <div style={{ color: active ? COLORS.accent : COLORS.textSecondary, display: "flex", alignItems: "center" }}>{pm.icon}</div>
                  <span style={{ fontSize: 14, fontWeight: 600, color: active ? COLORS.text : COLORS.textSecondary }}>{pm.label}</span>
                  {pm.id === "card" && <span style={{ marginLeft: "auto", fontSize: 11, color: COLORS.textTertiary, fontWeight: 500 }}>•••• 4242</span>}
                </div>
              ); })}
            </div>
          </div>
          <div style={{ background: COLORS.card, borderRadius: 20, padding: 18, border: `1px solid ${COLORS.border}` }}>
            <h4 style={{ fontSize: 14, fontWeight: 700, color: COLORS.text, margin: "0 0 14px" }}>Riepilogo</h4>
            {[{ label: "Subtotale", value: `€${total.toFixed(2)}` }, ...(promoApplied ? [{ label: "Sconto", value: `−€${discount.toFixed(2)}`, color: COLORS.success }] : []), { label: "Servizio", value: "€2.00" }, { label: "Consegna", value: "Gratuita", color: COLORS.success }].map((row, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontSize: 13, color: COLORS.textSecondary }}>{row.label}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: row.color || COLORS.text }}>{row.value}</span>
              </div>
            ))}
            <div style={{ height: 1, background: COLORS.border, margin: "10px 0" }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 16, fontWeight: 700, color: COLORS.text }}>Totale</span>
              <span style={{ fontSize: 22, fontWeight: 800, color: COLORS.accent }}>€{finalTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}
      {cart.length > 0 && (
        <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, maxWidth: 430, margin: "0 auto", padding: "16px 20px", paddingBottom: 100, background: `linear-gradient(180deg, transparent, ${COLORS.bg} 30%)` }}>
          <div style={{ background: COLORS.accent, borderRadius: 18, padding: "17px 22px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <span style={{ fontSize: 12, color: "rgba(12,11,10,0.6)", fontWeight: 500 }}>Totale: €{finalTotal.toFixed(2)}</span>
              <p style={{ fontSize: 16, fontWeight: 800, color: COLORS.bg, margin: "2px 0 0" }}>Ordina Ora</p>
            </div>
            <div style={{ width: 42, height: 42, borderRadius: 13, background: "rgba(12,11,10,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M5 12H19M19 12L13 6M19 12L13 18" stroke={COLORS.bg} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const BookingPage = ({ onNavigate }) => {
  const [selectedDate, setSelectedDate] = useState(8);
  const [selectedTime, setSelectedTime] = useState("20:30");
  const [guests, setGuests] = useState(2);
  const dates = Array.from({ length: 7 }, (_, i) => ({ day: i + 6, weekday: ["Ven", "Sab", "Dom", "Lun", "Mar", "Mer", "Gio"][i] }));
  const times = ["19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00"];
  return (
    <div style={{ paddingBottom: 100 }}>
      <div style={{ position: "relative", margin: "8px 16px 0", borderRadius: 24, overflow: "hidden", marginBottom: 20 }}>
        <ImagePlaceholder width="100%" height={140} borderRadius={24} label="Sala ristorante" style={{ background: `linear-gradient(145deg, ${COLORS.cardSolid}, rgba(200,149,108,0.06))` }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 30%, rgba(12,11,10,0.9) 100%)" }} />
        <div style={{ position: "absolute", bottom: 16, left: 20 }}><h1 style={{ fontSize: 22, fontWeight: 800, color: COLORS.cream, margin: 0 }}>Prenota un Tavolo</h1></div>
        <div onClick={() => onNavigate("home")} style={{ position: "absolute", top: 12, left: 12, width: 38, height: 38, borderRadius: 12, background: "rgba(12,11,10,0.6)", backdropFilter: "blur(16px)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", border: `1px solid ${COLORS.border}` }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M15 19L8 12L15 5" stroke={COLORS.cream} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
      </div>
      <div style={{ padding: "0 20px" }}>
        <div style={{ background: COLORS.card, borderRadius: 20, padding: 20, border: `1px solid ${COLORS.border}`, marginBottom: 14 }}>
          <h4 style={{ fontSize: 11, fontWeight: 700, color: COLORS.textTertiary, margin: "0 0 14px", textTransform: "uppercase", letterSpacing: 1.5 }}>Ospiti</h4>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 24 }}>
            <div onClick={() => setGuests(Math.max(1, guests - 1))} style={{ width: 44, height: 44, borderRadius: 14, background: COLORS.glass, border: `1px solid ${COLORS.border}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 20, color: COLORS.text }}>−</div>
            <div style={{ textAlign: "center" }}><span style={{ fontSize: 36, fontWeight: 800, color: COLORS.text }}>{guests}</span><p style={{ fontSize: 11, color: COLORS.textTertiary, margin: "2px 0 0" }}>{guests === 1 ? "persona" : "persone"}</p></div>
            <div onClick={() => setGuests(Math.min(12, guests + 1))} style={{ width: 44, height: 44, borderRadius: 14, background: COLORS.glass, border: `1px solid ${COLORS.border}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 20, color: COLORS.text }}>+</div>
          </div>
        </div>
        <div style={{ background: COLORS.card, borderRadius: 20, padding: 20, border: `1px solid ${COLORS.border}`, marginBottom: 14 }}>
          <h4 style={{ fontSize: 11, fontWeight: 700, color: COLORS.textTertiary, margin: "0 0 14px", textTransform: "uppercase", letterSpacing: 1.5 }}>Data — Marzo 2026</h4>
          <div style={{ display: "flex", gap: 8, overflowX: "auto", scrollbarWidth: "none" }}>
            {dates.map(d => { const active = selectedDate === d.day; return (
              <div key={d.day} onClick={() => setSelectedDate(d.day)} style={{ minWidth: 52, padding: "10px 6px", borderRadius: 16, textAlign: "center", cursor: "pointer", background: active ? COLORS.accent : COLORS.glass, border: `1px solid ${active ? COLORS.accent : COLORS.border}` }}>
                <p style={{ fontSize: 10, fontWeight: 600, color: active ? "rgba(12,11,10,0.6)" : COLORS.textTertiary, margin: "0 0 3px" }}>{d.weekday}</p>
                <p style={{ fontSize: 18, fontWeight: 800, color: active ? COLORS.bg : COLORS.text, margin: 0 }}>{d.day}</p>
              </div>
            ); })}
          </div>
        </div>
        <div style={{ background: COLORS.card, borderRadius: 20, padding: 20, border: `1px solid ${COLORS.border}`, marginBottom: 24 }}>
          <h4 style={{ fontSize: 11, fontWeight: 700, color: COLORS.textTertiary, margin: "0 0 14px", textTransform: "uppercase", letterSpacing: 1.5 }}>Orario</h4>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {times.map(t => { const active = selectedTime === t; return (
              <div key={t} onClick={() => setSelectedTime(t)} style={{ padding: "9px 16px", borderRadius: 12, cursor: "pointer", background: active ? COLORS.accent : COLORS.glass, border: `1px solid ${active ? COLORS.accent : COLORS.border}` }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: active ? COLORS.bg : COLORS.textSecondary }}>{t}</span>
              </div>
            ); })}
          </div>
        </div>
        <div style={{ background: COLORS.accent, borderRadius: 18, padding: "17px 22px", cursor: "pointer", textAlign: "center" }}>
          <p style={{ fontSize: 16, fontWeight: 800, color: COLORS.bg, margin: 0 }}>Conferma Prenotazione</p>
          <p style={{ fontSize: 12, color: "rgba(12,11,10,0.5)", margin: "4px 0 0", fontWeight: 500 }}>{guests} {guests === 1 ? "ospite" : "ospiti"} · {selectedDate} Marzo · {selectedTime}</p>
        </div>
      </div>
    </div>
  );
};

/* ── Main App ── */
export default function RestaurantApp() {
  const [page, setPage] = useState("home");
  const [activeTab, setActiveTab] = useState("home");
  const [detailItem, setDetailItem] = useState(null);
  const [ambienteSpace, setAmbienteSpace] = useState(null);
  const [cart, setCart] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const totalItems = cart.reduce((sum, i) => sum + i.qty, 0);

  const navigate = (target, item) => {
    if (target === "detail") { setDetailItem(item); setPage("detail"); }
    else if (target === "ambiente") { setAmbienteSpace(item); setPage("ambiente"); }
    else { setPage(target); setActiveTab(target === "menu" || target === "detail" ? "menu" : target); }
  };

  const tabItems = [
    { id: "home", label: "Home", icon: (a) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M3 10.5L12 3L21 10.5V20C21 20.55 20.55 21 20 21H15V15H9V21H4C3.45 21 3 20.55 3 20V10.5Z" stroke={a ? COLORS.accent : COLORS.textTertiary} strokeWidth="2" fill={a ? "rgba(200,149,108,0.15)" : "none"}/></svg> },
    { id: "menu", label: "Menu", icon: (a) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M4 6H20M4 12H20M4 18H14" stroke={a ? COLORS.accent : COLORS.textTertiary} strokeWidth="2" strokeLinecap="round"/></svg> },
    { id: "cart", label: "Ordine", icon: (a) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M6 6H21L19 15H8L6 6ZM6 6L5 2H2" stroke={a ? COLORS.accent : COLORS.textTertiary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill={a ? "rgba(200,149,108,0.15)" : "none"}/><circle cx="10" cy="20" r="1.5" fill={a ? COLORS.accent : COLORS.textTertiary}/><circle cx="18" cy="20" r="1.5" fill={a ? COLORS.accent : COLORS.textTertiary}/></svg> },
    { id: "booking", label: "Prenota", icon: (a) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="18" rx="3" stroke={a ? COLORS.accent : COLORS.textTertiary} strokeWidth="2" fill={a ? "rgba(200,149,108,0.15)" : "none"}/><path d="M3 10H21M8 2V6M16 2V6" stroke={a ? COLORS.accent : COLORS.textTertiary} strokeWidth="2" strokeLinecap="round"/></svg> },
  ];

  const showTabs = page !== "detail" && page !== "ambiente";

  return (
    <div style={{ maxWidth: 430, margin: "0 auto", minHeight: "100vh", background: COLORS.bg, fontFamily: "-apple-system, 'SF Pro Display', 'SF Pro Text', system-ui, sans-serif", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "fixed", top: -120, right: -80, width: 280, height: 280, background: `radial-gradient(circle, rgba(200,149,108,0.08), transparent 70%)`, pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", bottom: -100, left: -80, width: 250, height: 250, background: `radial-gradient(circle, rgba(139,58,74,0.05), transparent 70%)`, pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <StatusBar />
        {page === "home" && <HomePage onNavigate={navigate} cart={cart} setCart={setCart} setActiveCategory={setActiveCategory} activeCategory={activeCategory} />}
        {page === "menu" && <MenuPage onNavigate={navigate} cart={cart} setCart={setCart} activeCategory={activeCategory} setActiveCategory={setActiveCategory} />}
        {page === "detail" && <DetailPage item={detailItem} onNavigate={navigate} cart={cart} setCart={setCart} />}
        {page === "cart" && <CartPage onNavigate={navigate} cart={cart} setCart={setCart} />}
        {page === "booking" && <BookingPage onNavigate={navigate} />}
        {page === "ambiente" && <AmbienteDetailPage space={ambienteSpace} onNavigate={navigate} />}
      </div>
      {showTabs && (
        <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, maxWidth: 430, margin: "0 auto", background: "rgba(12,11,10,0.92)", backdropFilter: "blur(40px) saturate(180%)", borderTop: `1px solid ${COLORS.border}`, padding: "8px 0 28px", display: "flex", justifyContent: "space-around", zIndex: 100 }}>
          {tabItems.map(tab => { const active = activeTab === tab.id; return (
            <div key={tab.id} onClick={() => { setActiveTab(tab.id); navigate(tab.id); }} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, cursor: "pointer", position: "relative", padding: "4px 16px" }}>
              <div style={{ position: "relative" }}>
                {tab.icon(active)}
                {tab.id === "cart" && totalItems > 0 && <div style={{ position: "absolute", top: -5, right: -9, minWidth: 16, height: 16, borderRadius: 8, background: COLORS.accent, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 3px" }}><span style={{ fontSize: 9, fontWeight: 800, color: COLORS.bg }}>{totalItems}</span></div>}
              </div>
              <span style={{ fontSize: 10, fontWeight: 600, color: active ? COLORS.accent : COLORS.textTertiary }}>{tab.label}</span>
            </div>
          ); })}
        </div>
      )}
    </div>
  );
}