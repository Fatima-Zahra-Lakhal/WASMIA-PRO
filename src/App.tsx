import { useState, useEffect, useRef } from "react";
import heroTruck from "@/imports/background.png";
import emailjs from "@emailjs/browser";
// ─── Intersection Observer hook ──────────────────────────────────────────────
function useReveal() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add("visible"); },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

// ─── Counter animation hook ───────────────────────────────────────────────────
function useCounter(target: number, duration = 2000, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      setValue(Math.floor(current));
      if (current >= target) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, start]);
  return value;
}

// ─── SVG Icons ────────────────────────────────────────────────────────────────
const IconShield = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);
const IconClock = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7">
    <circle cx="12" cy="12" r="10"/><path strokeLinecap="round" d="M12 6v6l4 2"/>
  </svg>
);
const IconMapPin = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><circle cx="12" cy="11" r="3"/>
  </svg>
);
const IconHeadphones = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 18v-6a9 9 0 0118 0v6"/><path strokeLinecap="round" strokeLinejoin="round" d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z"/>
  </svg>
);
const IconTruck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-8 h-8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2.5-.003M13 16l.5.003M13 16H9m4 0h2m2 0h1.5a1.5 1.5 0 001.5-1.5V9.6a1.5 1.5 0 00-.5-1.122l-3-2.5A1.5 1.5 0 0016.5 5.6H13"/>
  </svg>
);
const IconGlobe = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-8 h-8">
    <circle cx="12" cy="12" r="10"/><path strokeLinecap="round" d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
  </svg>
);
const IconBox = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-8 h-8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
  </svg>
);
const IconSettings = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-8 h-8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><circle cx="12" cy="12" r="3"/>
  </svg>
);
const IconCheckCircle = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
  </svg>
);
const IconPhone = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
  </svg>
);
const IconMail = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
  </svg>
);
const IconLocation = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><circle cx="12" cy="11" r="3"/>
  </svg>
);
const IconArrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
  </svg>
);
const IconMenu = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
    <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16"/>
  </svg>
);
const IconX = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
    <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12"/>
  </svg>
);
const IconHardHat = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-8 h-8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 17h18M12 3L4 9v4h16V9L12 3z"/>
    <path strokeLinecap="round" d="M12 3v10"/>
  </svg>
);
const IconRoad = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-8 h-8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 20L3 4M15 20l6-16M9 20h6M6.5 12h11M4.5 6h15"/>
  </svg>
);
const IconPipe = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-8 h-8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 16h10M4 12h16M4 8a3 3 0 010 8M20 8a3 3 0 010 8"/>
  </svg>
);
const IconCrane = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-8 h-8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M3 7l9-4 9 4M3 7v4l9 4 9-4V7M9 21h6"/>
  </svg>
);
const IconStar = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-yellow-400">
    <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
  </svg>
);

// ─── Fleet Section with tabs ──────────────────────────────────────────────────
const FLEET_DATA = {
  transport: [
    { img: "https://images.unsplash.com/photo-1592838064575-70ed626d3a0e?w=800&h=500&fit=crop&auto=format", alt: "Semi-remorque sur route", model: "Semi-Remorque XL", spec1: ["Charge max.", "24 t"], spec2: ["Volume", "82 m³"], spec3: ["Portée", "Nationale"], badge: "Bestseller" },
    { img: "https://images.unsplash.com/photo-1616432043562-3671ea2e5242?w=800&h=500&fit=crop&auto=format", alt: "Camion plateau lourd", model: "Plateau Lourd", spec1: ["Charge max.", "30 t"], spec2: ["Volume", "Plateau ouvert"], spec3: ["Portée", "Nationale"], badge: null },
    { img: "https://images.unsplash.com/photo-1695222833131-54ee679ae8e5?w=800&h=500&fit=crop&auto=format", alt: "Camion porteur standard", model: "Porteur Standard", spec1: ["Charge max.", "8 t"], spec2: ["Volume", "28 m³"], spec3: ["Portée", "Distribution locale"], badge: null },
    { img: "https://images.unsplash.com/photo-1591768793355-74d04bb6608f?w=800&h=500&fit=crop&auto=format", alt: "Camion citerne", model: "Citerne Inox", spec1: ["Capacité", "20 000 L"], spec2: ["Type", "Liquides alimentaires"], spec3: ["Portée", "Nationale"], badge: null },
    { img: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800&h=500&fit=crop&auto=format", alt: "Camion benne", model: "Camion-Benne TP", spec1: ["Charge max.", "18 t"], spec2: ["Benne", "10 m³"], spec3: ["Usage", "Travaux publics"], badge: "TP" },
    { img: "https://images.unsplash.com/photo-1759234675463-986edc8c5506?w=800&h=500&fit=crop&auto=format", alt: "Camion long-courrier", model: "Long-Courrier Int'l", spec1: ["Charge max.", "26 t"], spec2: ["Volume", "90 m³"], spec3: ["Portée", "Europe / Afrique"], badge: "International" },
  ],
  engins: [
    { img: "https://images.unsplash.com/photo-1503708928676-1cb796a0891e?w=800&h=500&fit=crop&auto=format", alt: "Pelle mécanique sur chantier", model: "Pelle Hydraulique", spec1: ["Godet", "0,9 m³"], spec2: ["Portée", "9,5 m"], spec3: ["Usage", "Terrassement"], badge: "Bestseller" },
    { img: "https://images.unsplash.com/photo-1575281923032-f40d94ef6160?w=800&h=500&fit=crop&auto=format", alt: "Excavatrice et camion benne", model: "Excavatrice XL", spec1: ["Godet", "1,5 m³"], spec2: ["Portée", "12 m"], spec3: ["Usage", "Grands chantiers"], badge: null },
    { img: "https://images.unsplash.com/photo-1603814929877-d5d927322656?w=800&h=500&fit=crop&auto=format", alt: "Bulldozer sur chantier", model: "Bulldozer D6", spec1: ["Puissance", "215 ch"], spec2: ["Lame", "3,4 m"], spec3: ["Usage", "Déblai & remblai"], badge: null },
    { img: "https://images.unsplash.com/photo-1583024011792-b165975b52f5?w=800&h=500&fit=crop&auto=format", alt: "Pelle sur pneus", model: "Pelle sur Pneus", spec1: ["Godet", "0,6 m³"], spec2: ["Mobilité", "Haute"], spec3: ["Usage", "Milieu urbain"], badge: null },
    { img: "https://images.unsplash.com/photo-1610477865545-37711c53144d?w=800&h=500&fit=crop&auto=format", alt: "Engins voirie assainissement", model: "Compacteur Tandem", spec1: ["Poids", "8 t"], spec2: ["Largeur", "1,68 m"], spec3: ["Usage", "Voirie & bitume"], badge: null },
    { img: "https://images.unsplash.com/photo-1495036019936-220b29b930ea?w=800&h=500&fit=crop&auto=format", alt: "Grue de chantier", model: "Chargeuse sur Pneus", spec1: ["Charge", "3,5 t"], spec2: ["Godet", "2,1 m³"], spec3: ["Usage", "Chargement / manutention"], badge: null },
  ],
};

function FleetSection() {
  const [tab, setTab] = useState<"transport" | "engins">("transport");
  const vehicles = FLEET_DATA[tab];
  return (
    <div>
      {/* Tabs */}
      <div className="flex justify-center mb-10">
        <div className="inline-flex bg-[#0B3A68]/30 border border-white/10 rounded-full p-1.5 gap-1">
          {([["transport", "🚛  Camions de transport"], ["engins", "🏗️  Engins de chantier"]] as const).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${tab === key ? "bg-[#E7A62B] text-[#071A2F] shadow-lg" : "text-white/50 hover:text-white"}`}
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {vehicles.map((v, i) => (
          <div key={`${tab}-${i}`} className="section-reveal card-hover group rounded-2xl overflow-hidden border border-white/8 bg-[#0B3A68]/15" style={{ transitionDelay: `${i * 60}ms` }}>
            <div className="relative h-48 overflow-hidden bg-[#0B3A68]/30">
              <img src={v.img} alt={v.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060F1E]/60 to-transparent" />
              {v.badge && (
                <div className="absolute top-3 right-3 bg-[#E7A62B] text-[#071A2F] text-xs font-bold px-3 py-1 rounded-full" style={{ fontFamily: "Outfit, sans-serif" }}>{v.badge}</div>
              )}
            </div>
            <div className="p-6">
              <h3 className="text-lg font-bold text-white mb-4" style={{ fontFamily: "Outfit, sans-serif" }}>{v.model}</h3>
              <div className="space-y-2">
                {[v.spec1, v.spec2, v.spec3].map(([label, val]) => (
                  <div key={label} className="flex justify-between text-sm">
                    <span className="text-white/40">{label}</span>
                    <span className="text-white font-medium">{val}</span>
                  </div>
                ))}
              </div>
              <div className="mt-5 pt-4 border-t border-white/8 flex items-center gap-2 text-[#E7A62B] text-sm font-medium opacity-60 group-hover:opacity-100 transition-opacity cursor-pointer">
                Demander une disponibilité <IconArrow />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Service Card ─────────────────────────────────────────────────────────────
function ServiceCard({ svc }: { svc: { icon: React.ReactNode; title: string; desc: string; tag: string | null; delay: number; points: string[] } }) {
  return (
    <div
      className="section-reveal card-hover border border-white/8 rounded-2xl p-7 bg-[#0B3A68]/20 relative overflow-hidden group cursor-default flex flex-col"
      style={{ transitionDelay: `${svc.delay}ms` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#E7A62B]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      {svc.tag && (
        <div className="absolute top-4 right-4 bg-[#E7A62B] text-[#071A2F] text-xs font-bold px-3 py-1 rounded-full" style={{ fontFamily: "Outfit, sans-serif" }}>
          {svc.tag}
        </div>
      )}
      <div className="w-14 h-14 rounded-xl bg-[#E7A62B]/10 border border-[#E7A62B]/20 flex items-center justify-center text-[#E7A62B] mb-5 group-hover:bg-[#E7A62B]/20 transition-colors flex-shrink-0">
        {svc.icon}
      </div>
      <h3 className="text-lg font-bold text-white mb-3" style={{ fontFamily: "Outfit, sans-serif" }}>{svc.title}</h3>
      <p className="text-white/50 text-sm leading-relaxed mb-5">{svc.desc}</p>
      <ul className="space-y-2 mt-auto">
        {svc.points.map((p) => (
          <li key={p} className="flex items-center gap-2 text-white/40 text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E7A62B]/60 flex-shrink-0" />
            {p}
          </li>
        ))}
      </ul>
      <div className="mt-5 pt-4 border-t border-white/8 flex items-center gap-2 text-[#E7A62B] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
        En savoir plus <IconArrow />
      </div>
    </div>
  );
}

// ─── Logo ─────────────────────────────────────────────────────────────────────
const Logo = ({ size = "md" }: { size?: "sm" | "md" | "lg" }) => {
  const s = size === "sm" ? 32 : size === "lg" ? 52 : 42;
  return (
    <div className="flex items-center gap-3">
      <div
        style={{ width: s, height: s }}
        className="relative flex items-center justify-center rounded-lg overflow-hidden flex-shrink-0"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#E7A62B] to-[#C8901F]" />
        <svg viewBox="0 0 40 40" style={{ width: s * 0.7, height: s * 0.7, position: "relative", zIndex: 1 }}>
          <text x="4" y="29" fontSize="24" fontWeight="900" fontFamily="Outfit,sans-serif" fill="#071A2F">W</text>
          <text x="20" y="29" fontSize="16" fontWeight="700" fontFamily="Outfit,sans-serif" fill="#071A2F">P</text>
        </svg>
      </div>
      <div>
        <div
          style={{ fontFamily: "Outfit, sans-serif", fontSize: size === "sm" ? 16 : size === "lg" ? 24 : 20, fontWeight: 800, letterSpacing: 1 }}
          className="text-white leading-none"
        >
          WASMIA-<span className="text-[#E7A62B]">PRO</span>
        </div>
        <div style={{ fontFamily: "Outfit, sans-serif", fontSize: 9, letterSpacing: 2, fontWeight: 400 }} className="text-white/50 uppercase mt-0.5">
          Construction · Transport · Engins
        </div>
      </div>
    </div>
  );
};

// ─── Stat Card (with counter) ─────────────────────────────────────────────────
function StatCard({ value, suffix, label, delay, started }: { value: number; suffix: string; label: string; delay: number; started: boolean }) {
  const count = useCounter(value, 1800, started);
  return (
    <div
      className="section-reveal bg-white rounded-2xl p-8 text-center shadow-xl border border-gray-100 card-hover"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div style={{ fontFamily: "Outfit, sans-serif", fontSize: 52, fontWeight: 800, color: "#071A2F", lineHeight: 1 }}>
        {count}{suffix}
      </div>
      <div className="mt-3 text-sm font-medium text-gray-500 uppercase tracking-widest">{label}</div>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("accueil");
  const [statsStarted, setStatsStarted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [formSent, setFormSent] = useState(false);

  const statsRef = useRef<HTMLDivElement>(null);

  // Sticky header
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      // Active section detection
      const sections = ["accueil", "apropos", "services", "flotte", "contact"];
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 100) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Stats counter trigger
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsStarted(true); }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Section reveals
  useEffect(() => {
    const els = document.querySelectorAll(".section-reveal");
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); });
    }, { threshold: 0.1 });
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const navLinks = [
    { label: "Accueil", href: "#accueil", id: "accueil" },
    { label: "À propos", href: "#apropos", id: "apropos" },
    { label: "Nos Services", href: "#services", id: "services" },
    { label: "Flotte", href: "#flotte", id: "flotte" },
    { label: "Actualités", href: "#actualites", id: "actualites" },
    { label: "Contact", href: "#contact", id: "contact" },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  try {
    await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
        to_email: "contactwasmia.pro@gmail.com",
      },
      {
        publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      }
    );

    setFormSent(true);

    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });

    setTimeout(() => {
      setFormSent(false);
    }, 4000);

  } catch (error) {
    console.error("Erreur lors de l'envoi du formulaire :", error);
    alert("Une erreur est survenue lors de l'envoi. Veuillez réessayer.");
  }
};

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen" style={{ fontFamily: "Inter, sans-serif" }}>

      {/* ═══ HEADER ═══════════════════════════════════════════════════════════ */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-[#071A2F]/95 backdrop-blur-md shadow-2xl" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <a href="#accueil" onClick={(e) => { e.preventDefault(); scrollTo("#accueil"); }}>
              <Logo />
            </a>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                  className={`nav-link text-sm font-medium tracking-wide transition-colors ${
                    activeSection === link.id ? "text-[#E7A62B] active" : "text-white/80 hover:text-white"
                  }`}
                  style={{ fontFamily: "Outfit, sans-serif" }}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-4">
              <button
                onClick={() => scrollTo("#contact")}
                className="btn-gold text-[#071A2F] font-bold text-sm px-6 py-2.5 rounded-full flex items-center gap-2"
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                Demande de devis <IconArrow />
              </button>
            </div>

            {/* Mobile menu toggle */}
            <button
              className="lg:hidden text-white p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <IconX /> : <IconMenu />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="lg:hidden bg-[#071A2F]/98 backdrop-blur-md border-t border-white/10 px-6 py-6 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                className="block text-white/80 hover:text-[#E7A62B] font-medium py-2 border-b border-white/5 transition-colors"
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => scrollTo("#contact")}
              className="btn-gold w-full text-[#071A2F] font-bold text-sm px-6 py-3 rounded-full mt-4"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              Demande de devis
            </button>
          </div>
        )}
      </header>

      {/* ═══ HERO ══════════════════════════════════════════════════════════════ */}
      <section id="accueil" className="relative min-h-screen flex flex-col overflow-hidden bg-[#071A2F]">

        {/* Full-bleed background — image is pre-designed: dark navy left, truck+sunset right */}
        <div className="absolute inset-0">
          <img
            src={heroTruck}
            alt="Camion WASMIA-PRO sur autoroute au coucher du soleil"
            className="w-full h-full object-cover object-center"
            style={{ objectPosition: "60% center" }}
          />
          {/* Subtle bottom fade to merge with trust bar */}
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#071A2F] to-transparent" />
          {/* Top fade behind header */}
          <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-[#071A2F]/70 to-transparent" />
          {/* Extra left vignette on mobile to keep text readable */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#071A2F]/60 via-transparent to-transparent lg:hidden" />
        </div>

        {/* ── Hero content: text anchored to the dark left panel ─────────────── */}
        <div className="relative flex-1 flex items-center pt-24 pb-10">
          <div className="w-full max-w-7xl mx-auto px-6 lg:px-8">
            {/* Content sits in the left ~50% where the image is already dark */}
            <div className="max-w-xl lg:max-w-2xl">

              {/* Badge */}
              <div
                className="inline-flex items-center gap-2 bg-[#E7A62B]/15 border border-[#E7A62B]/30 rounded-full px-4 py-1.5 mb-7 animate-fade-up"
                style={{ fontFamily: "Outfit, sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: 2.5 }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#E7A62B] animate-pulse inline-block" />
                <span className="text-[#E7A62B] uppercase tracking-widest">Transport &amp; Logistique</span>
              </div>

              {/* Main heading */}
              <h1
                className="font-extrabold leading-[1.08] text-white mb-6 animate-fade-up delay-100"
                style={{ fontFamily: "Outfit, sans-serif", fontSize: "clamp(2.4rem, 5vw, 4.5rem)" }}
              >
                Votre partenaire<br />
                de confiance pour<br />
                la construction &amp;<br />
                <span className="gold-shimmer">le transport de fret</span>
              </h1>

              {/* Divider line */}
              <div className="flex items-center gap-4 mb-6 animate-fade-up delay-200">
                <div className="h-px w-12 bg-[#E7A62B]" />
                <span className="text-white/40 text-xs uppercase tracking-widest font-medium" style={{ fontFamily: "Outfit, sans-serif" }}>
                  Maroc &amp; International
                </span>
              </div>

              <p className="text-white/65 text-base lg:text-lg leading-relaxed mb-9 animate-fade-up delay-200" style={{ maxWidth: 480 }}>
                WASMIA-PRO intervient dans les travaux de construction, les travaux publics, la voirie,
                l'assainissement, le transport routier de fret et la location d'engins de chantier.
                Excellence et fiabilité à chaque mission.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 mb-9 animate-fade-up delay-300">
                <button
                  onClick={() => scrollTo("#services")}
                  className="btn-gold text-[#071A2F] font-bold px-8 py-4 rounded-full flex items-center gap-2 text-sm"
                  style={{ fontFamily: "Outfit, sans-serif", letterSpacing: 0.5 }}
                >
                  Découvrir nos services <IconArrow />
                </button>
                <button
                  onClick={() => scrollTo("#contact")}
                  className="flex items-center gap-2 text-white border border-white/25 hover:border-[#E7A62B]/50 hover:text-[#E7A62B] px-8 py-4 rounded-full text-sm font-medium transition-all duration-300"
                  style={{ fontFamily: "Outfit, sans-serif" }}
                >
                  <IconPhone /> Nous contacter
                </button>
              </div>

              {/* Trust micro row */}
              <div className="flex flex-wrap items-center gap-6 animate-fade-up delay-400">
                <div className="flex gap-0.5">{[...Array(5)].map((_, i) => <IconStar key={i} />)}</div>
                <span className="text-white/40 text-sm">200+ clients satisfaits au Maroc</span>
                <div className="hidden sm:flex items-center gap-2 text-white/40 text-sm">
                  <span className="w-1 h-1 rounded-full bg-[#E7A62B]/60 inline-block" />
                  Livraison garantie 98,7%
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Trust indicators bar ────────────────────────────────────────────── */}
        <div className="relative z-10">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div
              className="grid grid-cols-2 lg:grid-cols-4 rounded-t-2xl overflow-hidden"
              style={{ background: "rgba(7,26,47,0.85)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.07)", borderBottom: "none" }}
            >
              {[
                { icon: <IconShield />, title: "Sécurité garantie", desc: "Marchandises sécurisées à 100%." },
                { icon: <IconClock />, title: "Livraison à temps", desc: "Respect des délais, toujours." },
                { icon: <IconMapPin />, title: "Couverture nationale", desc: "Partout au Maroc et au-delà." },
                { icon: <IconHeadphones />, title: "Support 24/7", desc: "Équipe disponible 24h/24, 7j/7." },
              ].map((item, i) => (
                <div
                  key={i}
                  className="px-6 py-5 flex items-start gap-4 group hover:bg-[#E7A62B]/5 transition-colors duration-300"
                  style={{ borderRight: i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none" }}
                >
                  <div className="text-[#E7A62B] flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                  <div>
                    <div className="font-semibold text-white text-sm leading-snug" style={{ fontFamily: "Outfit, sans-serif" }}>{item.title}</div>
                    <div className="text-white/40 text-xs mt-0.5 leading-relaxed">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ ABOUT ══════════════════════════════════════════════════════════════ */}
      <section id="apropos" className="bg-[#F4F6F9] py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div className="section-reveal">
              <div className="flex items-center gap-3 mb-4">
                <div className="gold-line" />
                <span
                  className="text-[#E7A62B] text-xs font-bold uppercase tracking-widest"
                  style={{ fontFamily: "Outfit, sans-serif" }}
                >
                  À propos de nous
                </span>
              </div>
              <h2
                className="text-4xl lg:text-5xl font-extrabold leading-tight mb-6 text-[#071A2F]"
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                Transporter aujourd'hui,<br />
                <span className="text-[#E7A62B]">construire demain.</span>
              </h2>
              <p className="text-gray-500 text-base leading-relaxed mb-6">
                WASMIA-PRO est une entreprise marocaine multi-activités intervenant dans les travaux de construction,
                les travaux publics, la voirie et l'assainissement, le transport routier de fret et la location
                d'engins de chantier. Fondée sur les valeurs de fiabilité, de rigueur et d'excellence opérationnelle,
                nous accompagnons nos clients sur l'ensemble du territoire marocain.
              </p>
              <p className="text-gray-500 text-base leading-relaxed mb-8">
                Notre parc d'engins et de véhicules modernes, combiné à des équipes de professionnels expérimentés,
                nous permet de répondre à des projets de toute envergure — du chantier de proximité aux grands
                projets d'infrastructure — dans les meilleurs délais et selon les normes en vigueur.
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                {["Certifié ISO 9001", "Parc GPS tracké", "Assurance tous risques"].map((t) => (
                  <div key={t} className="flex items-center gap-2 bg-[#E7A62B]/10 text-[#071A2F] rounded-full px-4 py-1.5 text-sm font-medium">
                    <span className="text-[#E7A62B]"><IconCheckCircle /></span> {t}
                  </div>
                ))}
              </div>
              <button
                onClick={() => scrollTo("#services")}
                className="btn-gold text-[#071A2F] font-bold px-8 py-3.5 rounded-full flex items-center gap-2"
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                En savoir plus <IconArrow />
              </button>
            </div>

            {/* Right: stats */}
            <div ref={statsRef} className="grid grid-cols-1 gap-6">
              <StatCard value={150} suffix="+" label="Camions modernes" delay={0} started={statsStarted} />
              <StatCard value={200} suffix="+" label="Clients satisfaits" delay={150} started={statsStarted} />
              <StatCard value={25} suffix="+" label="Villes desservies" delay={300} started={statsStarted} />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SERVICES ═══════════════════════════════════════════════════════════ */}
      <section id="services" className="bg-[#071A2F] py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16 section-reveal">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="gold-line" />
              <span className="text-[#E7A62B] text-xs font-bold uppercase tracking-widest" style={{ fontFamily: "Outfit, sans-serif" }}>
                Nos Services
              </span>
              <div className="gold-line" />
            </div>
            <h2
              className="text-4xl lg:text-5xl font-extrabold text-white"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              Des solutions adaptées à<br />
              <span className="text-[#E7A62B]">chaque besoin</span>
            </h2>
            <p className="text-white/50 mt-4 max-w-xl mx-auto">
              De la construction d'infrastructures au transport de fret, WASMIA-PRO couvre
              l'ensemble de vos besoins avec des équipes qualifiées et un matériel de pointe.
            </p>
          </div>

          {/* Row 1 — 2 cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {[
              {
                icon: <IconHardHat />,
                title: "Travaux Divers & Construction",
                desc: "Réalisation de tous types de travaux de bâtiment et de génie civil : fondations, gros œuvre, finitions et aménagements intérieurs.",
                tag: "Expertise clé",
                delay: 0,
                points: ["Bâtiments industriels & commerciaux", "Ouvrages de génie civil", "Réhabilitation & rénovation"],
              },
              {
                icon: <IconRoad />,
                title: "Travaux Publics",
                desc: "Conception et exécution de projets d'infrastructure publique : routes, ponts, terrassements et aménagements urbains d'envergure.",
                tag: null,
                delay: 100,
                points: ["Terrassement & déblai", "Construction de routes & pistes", "Ouvrages d'art"],
              },
            ].map((svc, i) => (
              <ServiceCard key={i} svc={svc} />
            ))}
          </div>
          {/* Row 2 — 3 cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <IconPipe />,
                title: "Voirie & Assainissement",
                desc: "Aménagement de voiries, réseaux d'eau potable, systèmes d'assainissement et pose de canalisations conformes aux normes marocaines.",
                tag: null,
                delay: 200,
                points: ["Réseaux d'assainissement", "Voiries & trottoirs", "Pose de canalisations"],
              },
              {
                icon: <IconTruck />,
                title: "Transport Routier de Fret",
                desc: "Transport de marchandises sur l'ensemble du territoire marocain et vers l'international avec suivi GPS en temps réel.",
                tag: "Cœur de métier",
                delay: 300,
                points: ["Fret national & international", "Suivi GPS temps réel", "Assurance tous risques"],
              },
              {
                icon: <IconCrane />,
                title: "Location d'Engins de Chantier",
                desc: "Mise à disposition de pelles mécaniques, bulldozers, grues, camions-bennes et compacteurs avec ou sans opérateur qualifié.",
                tag: null,
                delay: 400,
                points: ["Pelles & bulldozers", "Grues & nacelles", "Camions-bennes & compacteurs"],
              },
            ].map((svc, i) => (
              <ServiceCard key={i} svc={svc} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FLEET ══════════════════════════════════════════════════════════════ */}
      <section id="flotte" className="bg-[#060F1E] py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16 section-reveal">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="gold-line" />
              <span className="text-[#E7A62B] text-xs font-bold uppercase tracking-widest" style={{ fontFamily: "Outfit, sans-serif" }}>
                Notre Flotte
              </span>
              <div className="gold-line" />
            </div>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-white" style={{ fontFamily: "Outfit, sans-serif" }}>
              Matériel &amp; engins <span className="text-[#E7A62B]">de pointe</span>
            </h2>
            <p className="text-white/50 mt-4 max-w-xl mx-auto">
              Camions de transport, pelles mécaniques, bulldozers, grues et compacteurs —
              un parc complet entretenu selon les plus hauts standards pour chaque mission.
            </p>
          </div>

          <FleetSection />
          </div>
       
      </section>

      {/* ═══ WHY US ══════════════════════════════════════════════════════════════ */}
      <section className="bg-[#0B3A68] py-24 lg:py-32 relative overflow-hidden">
        {/* Decorative */}
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#E7A62B]/5 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-[#071A2F]/40 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16 section-reveal">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="gold-line" />
              <span className="text-[#E7A62B] text-xs font-bold uppercase tracking-widest" style={{ fontFamily: "Outfit, sans-serif" }}>
                Pourquoi nous choisir
              </span>
              <div className="gold-line" />
            </div>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-white" style={{ fontFamily: "Outfit, sans-serif" }}>
              L'excellence au cœur<br />
              <span className="text-[#E7A62B]">de chaque projet</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { num: "01", title: "Expertise multi-métiers", desc: "Construction, TP, voirie, assainissement, transport et location d'engins : un seul interlocuteur pour tous vos besoins.", icon: <IconCheckCircle /> },
              { num: "02", title: "Matériel de pointe", desc: "Parc de véhicules et d'engins récents, entretenus rigoureusement, disponibles rapidement sur chantier.", icon: <IconCrane /> },
              { num: "03", title: "Réactivité 24/7", desc: "Intervention rapide sous 24h, équipes mobiles et support disponible à toute heure pour les urgences.", icon: <IconClock /> },
              { num: "04", title: "Équipes qualifiées", desc: "Ingénieurs, techniciens, conducteurs d'engins et chauffeurs certifiés avec des années d'expérience terrain.", icon: <IconHeadphones /> },
              { num: "05", title: "Suivi & transparence", desc: "Reporting chantier régulier, suivi GPS des camions et portail client dédié pour une visibilité totale.", icon: <IconMapPin /> },
              { num: "06", title: "Solutions sur mesure", desc: "Devis personnalisé, flexibilité contractuelle et accompagnement de A à Z pour chaque projet.", icon: <IconSettings /> },
            ].map((item, i) => (
              <div key={i} className="section-reveal card-hover group relative border border-white/10 rounded-2xl p-7 bg-[#071A2F]/30 backdrop-blur-sm" style={{ transitionDelay: `${i * 70}ms` }}>
                <div className="absolute top-5 right-5 text-white/8 font-black text-5xl select-none" style={{ fontFamily: "Outfit, sans-serif" }}>{item.num}</div>
                <div className="text-[#E7A62B] mb-4 w-10 h-10 flex items-center justify-center bg-[#E7A62B]/10 rounded-xl group-hover:bg-[#E7A62B]/20 transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: "Outfit, sans-serif" }}>{item.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ NEWS TEASER ═══════════════════════════════════════════════════════ */}
      <section id="actualites" className="bg-[#F4F6F9] py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 section-reveal">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="gold-line" />
                <span className="text-[#E7A62B] text-xs font-bold uppercase tracking-widest" style={{ fontFamily: "Outfit, sans-serif" }}>Actualités</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-[#071A2F]" style={{ fontFamily: "Outfit, sans-serif" }}>
                Les dernières nouvelles<br /><span className="text-[#E7A62B]">de WASMIA-PRO</span>
              </h2>
            </div>
            <button className="flex items-center gap-2 text-[#0B3A68] border border-[#0B3A68]/30 hover:border-[#0B3A68] px-6 py-2.5 rounded-full text-sm font-medium transition-all" style={{ fontFamily: "Outfit, sans-serif" }}>
              Voir toutes les actualités <IconArrow />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-7">
            {[
              {
                img: "https://images.unsplash.com/photo-1726866672851-5b99c837603c?w=600&h=380&fit=crop&auto=format",
                cat: "Flotte",
                date: "15 Août 2026",
                title: "WASMIA-PRO renouvelle 30 camions de sa flotte avec des modèles Euro 6",
                excerpt: "Dans le cadre de notre stratégie de développement durable, nous avons investi dans 30 nouveaux véhicules conformes aux normes Euro 6.",
              },
              {
                img: "https://images.unsplash.com/photo-1779419226072-3c21c89a8d9d?w=600&h=380&fit=crop&auto=format",
                cat: "Expansion",
                date: "3 Juillet 2026",
                title: "Ouverture d'une nouvelle plateforme logistique à Casablanca",
                excerpt: "WASMIA-PRO renforce sa présence dans la métropole avec un hub de 5 000 m² pour optimiser les flux de marchandises.",
              },
              {
                img: "https://images.unsplash.com/photo-1759826350352-c5b0b77729bd?w=600&h=380&fit=crop&auto=format",
                cat: "Certification",
                date: "20 Juin 2026",
                title: "WASMIA-PRO obtient la certification ISO 9001:2015 pour la qualité de ses services",
                excerpt: "Une reconnaissance internationale de notre engagement envers l'excellence et la satisfaction client.",
              },
            ].map((article, i) => (
              <div key={i} className="section-reveal card-hover bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 group cursor-pointer" style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="relative h-52 overflow-hidden bg-gray-100">
                  <img src={article.img} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-3 left-3 bg-[#E7A62B] text-[#071A2F] text-xs font-bold px-3 py-1 rounded-full" style={{ fontFamily: "Outfit, sans-serif" }}>
                    {article.cat}
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-gray-400 text-xs mb-3 font-medium">{article.date}</div>
                  <h3 className="text-[#071A2F] font-bold text-base leading-snug mb-3 group-hover:text-[#0B3A68] transition-colors" style={{ fontFamily: "Outfit, sans-serif" }}>
                    {article.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{article.excerpt}</p>
                  <div className="mt-4 flex items-center gap-1 text-[#E7A62B] text-sm font-semibold">
                    Lire la suite <IconArrow />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CONTACT ═════════════════════════════════════════════════════════════ */}
      <section id="contact" className="bg-[#071A2F] py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16 section-reveal">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="gold-line" />
              <span className="text-[#E7A62B] text-xs font-bold uppercase tracking-widest" style={{ fontFamily: "Outfit, sans-serif" }}>Contact</span>
              <div className="gold-line" />
            </div>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-white" style={{ fontFamily: "Outfit, sans-serif" }}>
              Parlons de votre<br /><span className="text-[#E7A62B]">prochain transport</span>
            </h2>
            <p className="text-white/50 mt-4 max-w-xl mx-auto">
              Notre équipe est disponible 24h/24 pour répondre à vos demandes et établir un devis personnalisé.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact info */}
            <div className="lg:col-span-2 section-reveal space-y-8">
              {[
                { icon: <IconPhone />, label: "Téléphone", values: ["0537408484", "+212 661-751726"] },
                { icon: <IconMail />, label: "Email", values: ["contactwasmia.pro@gmail.com"] },
                { icon: <IconLocation />, label: "Adresse", values: ["Lot Kassba N° 146 Témara", "Rabat 10000, Maroc"] },
                { icon: <IconClock />, label: "Horaires", values: ["Lun–Ven: 08h–18h", "Sam: 08h–13h | Urgences 24/7"] },
              ].map((info, i) => (
                <div key={i} className="flex gap-5">
                  <div className="w-11 h-11 rounded-xl bg-[#E7A62B]/10 border border-[#E7A62B]/20 flex items-center justify-center text-[#E7A62B] flex-shrink-0">
                    {info.icon}
                  </div>
                  <div>
                    <div className="text-white/40 text-xs font-medium uppercase tracking-widest mb-1" style={{ fontFamily: "Outfit, sans-serif" }}>{info.label}</div>
                    {info.values.map((v) => <div key={v} className="text-white text-sm font-medium">{v}</div>)}
                  </div>
                </div>
              ))}

              {/* Map placeholder */}
              <div className="mt-6 rounded-2xl overflow-hidden border border-white/10 h-52 bg-[#0B3A68]/20 relative flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0B3A68]/40 to-[#071A2F]/60" />
                <div
                  style={{
                    backgroundImage: `url("https://images.unsplash.com/photo-1664024613249-e4f5a8d3cb9b?w=600&h=300&fit=crop&auto=format")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  className="absolute inset-0 opacity-30"
                />
                <div className="relative z-10 text-center">
                  <div className="w-10 h-10 bg-[#E7A62B] rounded-full flex items-center justify-center mx-auto mb-2" style={{ animation: "pulse-gold 2s infinite" }}>
                    <IconLocation />
                  </div>
                  <div className="text-white text-sm font-medium">Rabat, Maroc</div>
                  <div className="text-white/40 text-xs mt-1">Lot Kassba N° 146 Témara</div>
                </div>
              </div>
            </div>

            {/* Contact form */}
            <div className="lg:col-span-3 section-reveal" style={{ transitionDelay: "150ms" }}>
              <div className="bg-[#0B3A68]/20 border border-white/8 rounded-2xl p-8 lg:p-10">
                <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "Outfit, sans-serif" }}>
                  Demander un devis gratuit
                </h3>
                <p className="text-white/40 text-sm mb-8">Réponse sous 2 heures ouvrées.</p>

                {formSent && (
                  <div className="mb-6 bg-green-500/10 border border-green-500/30 rounded-xl px-5 py-4 flex items-center gap-3 text-green-400">
                    <IconCheckCircle /> Votre demande a été envoyée. Nous vous contacterons très bientôt.
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-white/50 text-xs font-medium mb-1.5 uppercase tracking-wider">Nom complet *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Mohamed Alami"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-white/50 text-xs font-medium mb-1.5 uppercase tracking-wider">Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="contact@entreprise.ma"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm transition-all"
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-white/50 text-xs font-medium mb-1.5 uppercase tracking-wider">Téléphone</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+212 6XX-XXXXXX"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-white/50 text-xs font-medium mb-1.5 uppercase tracking-wider">Type de service</label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full bg-[#071A2F] border border-white/10 rounded-xl px-4 py-3 text-white/70 text-sm transition-all appearance-none"
                      >
                        <option value="">Sélectionner un service</option>
                        <option value="construction">Travaux de Construction</option>
                        <option value="tp">Travaux Publics</option>
                        <option value="voirie">Voirie &amp; Assainissement</option>
                        <option value="transport">Transport Routier de Fret</option>
                        <option value="location">Location d'Engins de Chantier</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-white/50 text-xs font-medium mb-1.5 uppercase tracking-wider">Message *</label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Décrivez votre besoin de transport, les quantités, l'origine et la destination..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm resize-none transition-all"
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn-gold w-full text-[#071A2F] font-bold py-4 rounded-xl text-base flex items-center justify-center gap-2"
                    style={{ fontFamily: "Outfit, sans-serif" }}
                  >
                    Envoyer ma demande de devis <IconArrow />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ══════════════════════════════════════════════════════════════ */}
      <footer className="bg-[#040E1C] border-t border-white/5 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div className="lg:col-span-1">
              <Logo size="md" />
              <p className="text-white/40 text-sm leading-relaxed mt-5 mb-6">
                Construction · Travaux publics · Voirie &amp; assainissement · Transport de fret · Location d'engins.
              </p>
              {/* Social */}
              <div className="flex gap-3">
                {["facebook", "linkedin", "instagram", "twitter"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-[#E7A62B] hover:border-[#E7A62B]/30 transition-all"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      {social === "facebook" && <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>}
                      {social === "linkedin" && <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zm2-3a2 2 0 110-4 2 2 0 010 4z"/>}
                      {social === "instagram" && <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M6.5 19.5h11a3 3 0 003-3v-11a3 3 0 00-3-3h-11a3 3 0 00-3 3v11a3 3 0 003 3z" strokeWidth="2" fill="none" stroke="currentColor"/>}
                      {social === "twitter" && <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>}
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="text-white font-bold text-sm mb-5 uppercase tracking-wider" style={{ fontFamily: "Outfit, sans-serif" }}>Navigation</h4>
              <ul className="space-y-3">
                {navLinks.map((l) => (
                  <li key={l.id}>
                    <a
                      href={l.href}
                      onClick={(e) => { e.preventDefault(); scrollTo(l.href); }}
                      className="text-white/40 hover:text-[#E7A62B] text-sm transition-colors flex items-center gap-1.5"
                    >
                      <span className="w-1 h-1 rounded-full bg-[#E7A62B]/50 inline-block" />
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-white font-bold text-sm mb-5 uppercase tracking-wider" style={{ fontFamily: "Outfit, sans-serif" }}>Nos Services</h4>
              <ul className="space-y-3">
                {["Travaux de Construction", "Travaux Publics", "Voirie & Assainissement", "Transport Routier de Fret", "Location d'Engins de Chantier"].map((s) => (
                  <li key={s}>
                    <a href="#services" onClick={(e) => { e.preventDefault(); scrollTo("#services"); }} className="text-white/40 hover:text-[#E7A62B] text-sm transition-colors flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-[#E7A62B]/50 inline-block" />
                      {s}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-bold text-sm mb-5 uppercase tracking-wider" style={{ fontFamily: "Outfit, sans-serif" }}>Contact</h4>
              <ul className="space-y-4">
                <li className="flex gap-3 text-sm text-white/40">
                  <IconLocation /> Lot Kassba N° 146 Témara<br />Rabat, Maroc
                </li>
                <li className="flex gap-3 text-sm text-white/40 items-center">
                  <IconPhone /> 0537408484
                </li>
                <li className="flex gap-3 text-sm text-white/40 items-center">
                  <IconMail /> contactwasmia.pro@gmail.com
                </li>
              </ul>
              <button
                onClick={() => scrollTo("#contact")}
                className="btn-gold text-[#071A2F] font-bold text-sm px-6 py-2.5 rounded-full mt-6 flex items-center gap-2"
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                Demande de devis <IconArrow />
              </button>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/20 text-xs">
              © 2026 WASMIA-PRO — Tous droits réservés. Construction · Transport · Location d'engins au Maroc.
            </p>
            <div className="flex gap-6">
              {["Mentions légales", "Politique de confidentialité", "CGV"].map((l) => (
                <a key={l} href="#" className="text-white/20 hover:text-white/50 text-xs transition-colors">{l}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
