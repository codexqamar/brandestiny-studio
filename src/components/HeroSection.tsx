import { type WheelEvent, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Link } from "react-router-dom";
import brandIdentityVideo from "@/assets/Brand Identity Creation Section.mp4";
import devopsVideo from "@/assets/Devops Section.mp4";
import erpVideo from "@/assets/ERP Section.mp4";
import seoVideo from "@/assets/For SEO Section.mp4";
import mobileAppVideo from "@/assets/Mobile App Section.mp4";
import saasVideo from "@/assets/SAAS Section.mp4";
import socialMediaVideo from "@/assets/Social Media Management Section.mp4";
import webAppVideo from "@/assets/Web App Development.mp4";
import websiteVideo from "@/assets/Website Design and Development Section.mp4";

type DrawerType = "work" | "services";

type DrawerItem = {
  title: string;
  eyebrow: string;
  video: string;
  href: string;
};

const serviceItems: DrawerItem[] = [
  { title: "Brand Identity", eyebrow: "Strategy / Identity", video: brandIdentityVideo, href: "#service-brand-identity" },
  { title: "Website Design", eyebrow: "Design / Development", video: websiteVideo, href: "#service-website-design" },
  { title: "Mobile Apps", eyebrow: "iOS / Android", video: mobileAppVideo, href: "#service-mobile-apps" },
  { title: "Web Apps", eyebrow: "SaaS / Platforms", video: webAppVideo, href: "#service-web-apps" },
  { title: "CRM ERP", eyebrow: "Business Systems", video: erpVideo, href: "#service-crm-erp" },
  { title: "DevOps", eyebrow: "Cloud / Automation", video: devopsVideo, href: "#service-devops" },
  { title: "SEO", eyebrow: "Search / Growth", video: seoVideo, href: "#service-seo" },
  { title: "SAAS", eyebrow: "Product Systems", video: saasVideo, href: "#service-saas" },
  { title: "Social Media", eyebrow: "Campaigns / Content", video: socialMediaVideo, href: "#service-social-media" },
];

const caseStudyVideos = import.meta.glob("/src/case studies/**/*.mp4", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

const workLabels: Record<string, { title: string; eyebrow: string }> = {
  "CRM ERP": { title: "CRM ERP Systems", eyebrow: "CRM / ERP" },
  "Devops Portfolio": { title: "DevOps Portfolio", eyebrow: "Cloud / Automation" },
  "Logo Designs Portfolio": { title: "Logo Design", eyebrow: "Brand Identity" },
  "Mobile App Portfolio": { title: "Mobile Apps", eyebrow: "Product UI UX" },
  "Product Design Portfolio": { title: "Product Design", eyebrow: "3D / Launch" },
  "Web App Section": { title: "Web Apps", eyebrow: "SaaS / Platforms" },
  "Website Portfolio": { title: "Websites", eyebrow: "Web Design" },
};

const workItems = Object.entries(caseStudyVideos)
  .reduce<DrawerItem[]>((items, [path, video]) => {
    const folder = path.split("/case studies/")[1]?.split("/")[0];
    if (!folder || folder === "Somewhere in About US Page") return items;
    if (items.some((item) => item.title === workLabels[folder]?.title)) return items;

    const label = workLabels[folder] || { title: folder, eyebrow: "Case Study" };
    items.push({ ...label, video, href: "/case-studies" });
    return items;
  }, [])
  .slice(0, 8);

const DrawerCardContent = ({ item }: { item: DrawerItem }) => (
  <>
    <video
      src={item.video}
      className="absolute inset-0 h-full w-full object-cover opacity-65 transition duration-700 group-hover:scale-105 group-hover:opacity-90"
      autoPlay
      muted
      loop
      playsInline
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />
    <div className="absolute bottom-4 left-4 right-4">
      <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.22em] text-white/45">
        {item.eyebrow}
      </p>
      <h3 className="mt-1 text-lg md:text-xl font-bold leading-tight text-white">
        {item.title}
      </h3>
    </div>
  </>
);

const DrawerCards = ({
  items,
  onSelect,
}: {
  items: DrawerItem[];
  onSelect: (item: DrawerItem) => void;
}) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
    {items.map((item) => (
      item.href.startsWith("#") ? (
        <a
          key={item.title}
          href={item.href}
          onClick={(event) => {
            event.preventDefault();
            onSelect(item);
          }}
          className="group relative block aspect-[5/4] overflow-hidden rounded-md border border-white/10 bg-white/[0.04] interactive"
        >
          <DrawerCardContent item={item} />
        </a>
      ) : (
        <Link
          key={item.title}
          to={item.href}
          onClick={() => onSelect(item)}
          className="group relative block aspect-[5/4] overflow-hidden rounded-md border border-white/10 bg-white/[0.04] interactive"
        >
          <DrawerCardContent item={item} />
        </Link>
      )
    ))}
  </div>
);

const HeroSection = () => {
  const workDrawerRef = useRef<HTMLDivElement>(null);
  const servicesDrawerRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [activeDrawer, setActiveDrawer] = useState<DrawerType | null>(null);
  const [hiddenLabel, setHiddenLabel] = useState<DrawerType | null>(null);

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleDrawerSelect = (item: DrawerItem) => {
    cancelClose();
    setHiddenLabel(null);

    if (item.href.startsWith("#")) {
      document.querySelector(item.href)?.scrollIntoView({ behavior: "smooth" });
    }

    const drawer = item.href.startsWith("#") ? "services" : "work";
    closeDrawer(drawer, 0);
  };

  const handleDrawerWheel = (event: WheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.scrollTop += event.deltaY;
  };

  useGSAP(() => {
    gsap.set(workDrawerRef.current, { xPercent: -105, autoAlpha: 0 });
    gsap.set(servicesDrawerRef.current, { xPercent: 105, autoAlpha: 0 });
  }, []);

  const cancelClose = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const closeDrawer = (drawer: DrawerType, delay = 160) => {
    cancelClose();
    closeTimerRef.current = setTimeout(() => {
      const target = drawer === "work" ? workDrawerRef.current : servicesDrawerRef.current;
      const xPercent = drawer === "work" ? -105 : 105;
      if (!target) return;

      setHiddenLabel(null);
      gsap.to(target, {
        xPercent,
        autoAlpha: 0,
        duration: 0.45,
        ease: "power3.inOut",
        onComplete: () => setActiveDrawer(null),
      });
    }, delay);
  };

  const openDrawer = (drawer: DrawerType) => {
    cancelClose();
    setActiveDrawer(drawer);
    setHiddenLabel(drawer);

    const target = drawer === "work" ? workDrawerRef.current : servicesDrawerRef.current;
    const other = drawer === "work" ? servicesDrawerRef.current : workDrawerRef.current;
    const otherXPercent = drawer === "work" ? 105 : -105;
    if (!target || !other) return;

    gsap.killTweensOf([target, other]);
    gsap.to(other, {
      xPercent: otherXPercent,
      autoAlpha: 0,
      duration: 0.35,
      ease: "power3.inOut",
    });
    gsap.to(target, {
      xPercent: 0,
      autoAlpha: 1,
      duration: 0.75,
      ease: "expo.out",
    });
  };

  return (
    <section id="hero" className="relative w-full h-screen overflow-hidden" style={{ background: "var(--black-2)" }}>
      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 z-[2]" style={{
        background: "linear-gradient(to bottom, rgba(2,2,2,0) 0%, rgba(2,2,2,0) 50%, rgba(2,2,2,0.7) 100%)"
      }} />
      <div className="absolute inset-0 z-[2]" style={{
        background: "radial-gradient(ellipse at center, transparent 30%, rgba(2,2,2,0.6) 100%)"
      }} />

      {/* Hero visual — astronaut replaced with video */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-60"
          style={{
            filter: "drop-shadow(0 20px 60px rgba(0,0,0,0.5))",
          }}
        >
          <source src="/Brandestiny.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </motion.div>

      <aside
        ref={workDrawerRef}
        onMouseEnter={cancelClose}
        onMouseLeave={() => closeDrawer("work")}
        className={`absolute left-0 top-0 z-[4] h-full w-[min(90vw,560px)] overflow-hidden border-r border-white/10 bg-black/70 px-5 py-20 backdrop-blur-2xl md:px-8 md:py-24 ${
          activeDrawer === "work" ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div
          className="flex h-full flex-col gap-6 overflow-y-auto no-scrollbar pr-1"
          onWheel={handleDrawerWheel}
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          <div className="shrink-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-white/40">
              Selected Work
            </p>
            <h2 className="mt-3 text-3xl md:text-5xl font-bold leading-none text-white">
              Case Studies
            </h2>
          </div>
          <DrawerCards items={workItems} onSelect={handleDrawerSelect} />
        </div>
      </aside>

      <aside
        ref={servicesDrawerRef}
        onMouseEnter={cancelClose}
        onMouseLeave={() => closeDrawer("services")}
        className={`absolute right-0 top-0 z-[4] h-full w-[min(90vw,560px)] overflow-hidden border-l border-white/10 bg-black/70 px-5 py-20 backdrop-blur-2xl md:px-8 md:py-24 ${
          activeDrawer === "services" ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div
          className="flex h-full flex-col gap-6 overflow-y-auto no-scrollbar pr-1"
          onWheel={handleDrawerWheel}
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          <div className="shrink-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-white/40">
              What We Build
            </p>
            <h2 className="mt-3 text-3xl md:text-5xl font-bold leading-none text-white">
              Services
            </h2>
          </div>
          <DrawerCards items={serviceItems} onSelect={handleDrawerSelect} />
        </div>
      </aside>

      {/* Main navigation labels — Centered vertically as per image */}
      <div className="absolute inset-0 z-[5] px-6 md:px-10 flex justify-between items-center pointer-events-none">
        <motion.button
          onClick={() => scrollTo("#projects")}
          onMouseEnter={() => openDrawer("work")}
          onMouseLeave={() => closeDrawer("work")}
          className="font-pixter text-white font-normal leading-none hover-blur interactive pointer-events-auto"
          style={{ fontSize: "clamp(2.4rem, 6vw, 6.25rem)" }}
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: hiddenLabel === "work" ? 0 : 1, x: 0 }}
          transition={{ duration: 0.12, ease: [0.16, 1, 0.3, 1] }}
        >
          Work
        </motion.button>

        <motion.button
          onClick={() => scrollTo("#services")}
          onMouseEnter={() => openDrawer("services")}
          onMouseLeave={() => closeDrawer("services")}
          className="font-pixter text-white font-normal leading-none hover-blur interactive pointer-events-auto"
          style={{ fontSize: "clamp(2.4rem, 6vw, 6.25rem)" }}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: hiddenLabel === "services" ? 0 : 1, x: 0 }}
          transition={{ duration: 0.12, ease: [0.16, 1, 0.3, 1] }}
        >
          Services
        </motion.button>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[3]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 1.8, duration: 1 }}
      >
        <motion.div
          className="w-[1px] h-10 bg-white/40"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "top" }}
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
