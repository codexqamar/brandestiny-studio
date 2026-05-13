import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, X } from "lucide-react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import CustomCursor from "@/components/CustomCursor";
import NavPill from "@/components/NavPill";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";

gsap.registerPlugin(ScrollTrigger);

const caseStudyAssets = import.meta.glob(
  "/src/case studies/**/*.{jpg,jpeg,png,mp4}",
  {
    eager: true,
    query: "?url",
    import: "default",
  },
) as Record<string, string>;

const metadata: Record<
  string,
  {
    title: string;
    cardTitle: string;
    category: string;
    summary: string;
    cardSummary: string;
    services: string[];
    nda?: boolean;
  }
> = {
  "CRM ERP": {
    title: "Custom CRM and ERP Software Development",
    cardTitle: "CRM ERP Systems",
    category: "CRM / ERP Development",
    summary:
      "Custom CRM and ERP software interfaces shaped around dashboards, lead pipelines, reporting, role-based workflows, and the operational tools teams rely on every day.",
    cardSummary:
      "Scalable CRM and ERP dashboard design for sales pipelines, analytics, admin workflows, and business process automation.",
    services: ["CRM Software", "ERP Systems", "Dashboard UX", "Workflow Automation"],
  },
  "Devops Portfolio": {
    title: "DevOps Automation and Cloud Infrastructure",
    cardTitle: "DevOps Automation",
    category: "DevOps / Cloud",
    summary:
      "DevOps portfolio work covering cloud infrastructure, CI/CD automation, deployment workflows, monitoring interfaces, and technical product storytelling for engineering-led brands.",
    cardSummary:
      "Cloud DevOps, CI/CD pipelines, deployment automation, monitoring systems, and infrastructure presentation design.",
    services: ["DevOps", "CI/CD", "Cloud Infrastructure", "Automation"],
  },
  "Logo Designs Portfolio": {
    title: "Logo Design and Brand Identity Systems",
    cardTitle: "Logo & Brand Identity",
    category: "Brand Identity",
    summary:
      "A brand identity and logo design portfolio focused on memorable marks, flexible visual systems, and industry-specific identity directions for digital-first businesses.",
    cardSummary:
      "Logo design, brand marks, identity systems, visual direction, and scalable brand assets for modern companies.",
    services: ["Logo Design", "Brand Identity", "Visual Systems", "Brand Strategy"],
  },
  "Mobile App Portfolio": {
    title: "Mobile App UI UX Design and Development",
    cardTitle: "Mobile App UI UX",
    category: "Mobile App Design",
    summary:
      "Mobile app design work built around clear product flows, user onboarding, app dashboards, native interaction patterns, and polished interface systems for iOS and Android experiences.",
    cardSummary:
      "Mobile app UI UX for onboarding, dashboards, booking flows, fintech, logistics, travel, and product-led apps.",
    services: ["Mobile App UI", "UX Design", "iOS / Android", "Product Flows"],
  },
  "Product Design Portfolio": {
    title: "Digital Product Design and Launch Visuals",
    cardTitle: "Product Design",
    category: "Product Design",
    summary:
      "Product design visuals and launch assets for digital products, consumer goods, 3D product storytelling, packaging-style compositions, and high-impact commercial presentation.",
    cardSummary:
      "Product design visuals, 3D product content, launch campaigns, packaging concepts, and conversion-focused imagery.",
    services: ["Product Design", "3D Visuals", "Launch Assets", "Commercial Design"],
  },
  "Social Media Management Portfolio": {
    title: "Social Media Management and Campaign Design",
    cardTitle: "Social Media Campaigns",
    category: "Social Media Marketing",
    summary:
      "Social media management portfolio work built for campaign consistency, content calendars, branded post systems, visual storytelling, and stronger brand recall across digital channels.",
    cardSummary:
      "Social media campaign design, branded content systems, post templates, engagement assets, and digital marketing visuals.",
    services: ["Social Media", "Campaign Design", "Content Strategy", "Brand Recall"],
  },
  "Web App Section": {
    title: "SaaS and Web App Development",
    cardTitle: "SaaS Web Apps",
    category: "Web App Development",
    summary:
      "Web app and SaaS interface work balancing dense product functionality with clean UX, dashboards, subscription flows, admin tools, and responsive application design.",
    cardSummary:
      "SaaS web app design and development for dashboards, product workflows, admin panels, and scalable interfaces.",
    services: ["SaaS Design", "Web Apps", "Dashboard UI", "Frontend Development"],
  },
  "Website Portfolio": {
    title: "Website Design and Development Portfolio",
    cardTitle: "Website Design",
    category: "Website Design",
    summary:
      "Website design and development portfolio work using responsive layouts, motion, brand storytelling, conversion-focused sections, and product-led visuals for stronger online presence.",
    cardSummary:
      "Responsive website design, landing pages, motion-driven web development, brand websites, and conversion-focused UI.",
    services: ["Website Design", "Web Development", "Landing Pages", "Responsive UI"],
  },
};

type CaseStudy = {
  id: string;
  title: string;
  cardTitle: string;
  category: string;
  summary: string;
  cardSummary: string;
  services: string[];
  nda?: boolean;
  videos: string[];
  images: string[];
};

type TransitionState = {
  study: CaseStudy;
  mode: "open" | "close";
};

const titleFromFilename = (path: string) =>
  path
    .split("/")
    .pop()
    ?.replace(/\.[^.]+$/, "")
    .replace(/\s*\(\d+\)\s*/g, "")
    .replace(/[-_]+/g, " ")
    .trim() || "Project";

const buildCaseStudies = (): CaseStudy[] => {
  const grouped = Object.entries(caseStudyAssets).reduce<
    Record<string, { videos: string[]; images: string[] }>
  >((acc, [path, url]) => {
    const folder = path.split("/case studies/")[1]?.split("/")[0];
    if (!folder || folder === "Somewhere in About US Page") return acc;

    if (!acc[folder]) acc[folder] = { videos: [], images: [] };

    if (path.toLowerCase().endsWith(".mp4")) {
      acc[folder].videos.push(url);
    } else {
      acc[folder].images.push(url);
    }

    return acc;
  }, {});

  return Object.entries(grouped)
    .map(([folder, assets]) => {
      const copy = metadata[folder] || {
        title: folder,
        cardTitle: folder,
        category: "Case Study",
        summary:
          "A selected body of work arranged as an immersive case-study sequence.",
        cardSummary:
          "Digital case study covering strategy, interface design, visual direction, responsive execution, and launch-ready presentation.",
        services: ["Digital Strategy", "UI UX", "Development", "Creative Direction"],
      };

      return {
        id: folder.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        ...copy,
        videos: assets.videos,
        images: assets.images,
      };
    })
    .filter((study) => study.videos.length || study.images.length);
};

const getMediaTitle = (study: CaseStudy, index: number) => {
  const titles = [
    "Visual system",
    "Interaction detail",
    "Experience flow",
    "Launch-ready presentation",
    "Brand application",
  ];

  return titles[index % titles.length] || study.title;
};

const getStudyMedia = (study: CaseStudy) => {
  const media = [...study.images, ...study.videos.slice(1)];

  return media.length ? media.slice(0, 8) : study.videos.slice(0, 8);
};

const CaseStudies = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null);
  const [transitionState, setTransitionState] = useState<TransitionState | null>(
    null,
  );

  const caseStudies = useMemo(() => buildCaseStudies(), []);

  useEffect(() => {
    const title = selectedStudy
      ? `${selectedStudy.title} | Brandestiny Case Study`
      : "Case Studies | Website, App, Brand, CRM, ERP and DevOps Portfolio | Brandestiny";
    const description =
      selectedStudy?.summary ||
      "Explore Brandestiny case studies across website design, web app development, mobile app UI UX, CRM ERP software, DevOps automation, brand identity, product design, and social media campaigns.";

    document.title = title;

    let metaDescription = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]',
    );

    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.name = "description";
      document.head.appendChild(metaDescription);
    }

    metaDescription.content = description;
  }, [selectedStudy]);

  useGSAP(
    () => {
      if (selectedStudy || !sectionRef.current || !triggerRef.current) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const totalWidth = sectionRef.current!.scrollWidth - window.innerWidth;

        gsap.to(sectionRef.current, {
          x: -totalWidth,
          ease: "none",
          scrollTrigger: {
            trigger: triggerRef.current,
            pin: true,
            scrub: 1,
            start: "top top",
            end: () => `+=${totalWidth}`,
            invalidateOnRefresh: true,
          },
        });
      });

      return () => mm.revert();
    },
    { dependencies: [selectedStudy], scope: triggerRef },
  );

  useGSAP(
    () => {
      if (!selectedStudy || !pageRef.current) return;

      const panels = gsap.utils.toArray<HTMLElement>(".case-panel");

      panels.forEach((panel) => {
        const image = panel.querySelector(".case-panel-media");
        const content = panel.querySelector(".case-panel-copy");

        gsap.fromTo(
          content,
          { autoAlpha: 0, y: 40 },
          {
            autoAlpha: 1,
            y: 0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: panel,
              start: "top 65%",
              end: "center center",
              scrub: 1,
            },
          },
        );

        gsap.fromTo(
          image,
          { yPercent: 12, scale: 1.08 },
          {
            yPercent: -8,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: panel,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          },
        );
      });
    },
    { dependencies: [selectedStudy], scope: pageRef },
  );

  const openStudy = (study: CaseStudy) => {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    setTransitionState({ study, mode: "open" });

    window.setTimeout(() => {
      setSelectedStudy(study);
      window.scrollTo({ top: 0 });
    }, 1300);

    window.setTimeout(() => {
      setTransitionState(null);
    }, 2600);
  };

  const closeStudy = () => {
    if (!selectedStudy) return;

    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    setTransitionState({ study: selectedStudy, mode: "close" });

    window.setTimeout(() => {
      setSelectedStudy(null);
      window.scrollTo({ top: 0 });
    }, 1300);

    window.setTimeout(() => {
      setTransitionState(null);
    }, 2600);
  };

  const selectedMedia = selectedStudy ? getStudyMedia(selectedStudy) : [];

  return (
    <SmoothScroll>
      <div ref={pageRef} className="bg-black text-white min-h-screen">
        <CustomCursor />
        <NavPill />

        <style>{`
          @keyframes caseRocketLaunch {
            0% { transform: translate(-50%, 120vh) rotate(0deg); opacity: 0; }
            18% { opacity: 1; }
            62% { transform: translate(-50%, 12vh) rotate(0deg); opacity: 1; }
            100% { transform: translate(-50%, -28vh) rotate(0deg); opacity: 0; }
          }
          @keyframes casePageCut {
            0%, 34% { transform: scaleY(0); opacity: 0; }
            52% { opacity: 1; }
            74% { transform: scaleY(1); opacity: 1; }
            100% { transform: scaleY(1); opacity: 0; }
          }
          @keyframes caseDoorLeft {
            0%, 24% { transform: translateX(-105%); opacity: 0; }
            40% { opacity: 1; }
            52%, 68% { transform: translateX(0); opacity: 1; }
            100% { transform: translateX(-105%); opacity: 0; }
          }
          @keyframes caseDoorRight {
            0%, 24% { transform: translateX(105%); opacity: 0; }
            40% { opacity: 1; }
            52%, 68% { transform: translateX(0); opacity: 1; }
            100% { transform: translateX(105%); opacity: 0; }
          }
          .case-rocket-transition .case-rocket {
            animation: caseRocketLaunch 2.6s cubic-bezier(0.22, 0.8, 0.22, 1) forwards;
          }
          .case-rocket-transition .case-cut {
            animation: casePageCut 2.35s cubic-bezier(0.22, 0.8, 0.22, 1) forwards;
          }
          .case-rocket-transition .case-door-left {
            animation: caseDoorLeft 2.55s cubic-bezier(0.22, 0.8, 0.22, 1) forwards;
          }
          .case-rocket-transition .case-door-right {
            animation: caseDoorRight 2.55s cubic-bezier(0.22, 0.8, 0.22, 1) forwards;
          }
        `}</style>

        {transitionState && (
          <div className="case-rocket-transition fixed inset-0 z-[80] pointer-events-none overflow-hidden bg-transparent">
            <div className="case-door-left absolute top-0 left-0 h-full w-1/2 bg-black" />
            <div className="case-door-right absolute top-0 right-0 h-full w-1/2 bg-black" />
            <div className="case-cut absolute left-1/2 top-0 h-full w-[2px] origin-center bg-[#c8a77a] shadow-[0_0_30px_rgba(200,167,122,0.75)]" />
            <div className="case-rocket absolute left-1/2 top-0 flex flex-col items-center">
              <div className="h-16 w-9 rounded-t-full rounded-b-md border border-[#c8a77a]/80 bg-[#090909]/80 backdrop-blur-md shadow-[0_0_35px_rgba(200,167,122,0.32)]">
                <div className="mx-auto mt-4 h-4 w-4 rounded-full border border-white/50 bg-white/15" />
                <div className="mx-auto mt-5 h-2 w-5 rounded-full bg-[#c8a77a]/70" />
              </div>
              <div className="-mt-1 h-16 w-5 rounded-b-full bg-gradient-to-b from-[#c8a77a] via-white/50 to-transparent blur-[1px]" />
            </div>
          </div>
        )}

        {!selectedStudy ? (
          <main
            ref={triggerRef}
            className="overflow-x-hidden pt-20 md:pt-32 pb-5 md:pb-5"
          >
            <div
              ref={sectionRef}
              className="flex flex-col md:flex-row md:items-center h-auto md:h-[80vh] w-full md:w-fit px-6 md:px-20 gap-8 md:gap-12"
            >
              <div className="w-fit md:min-w-[500px] flex flex-col justify-center flex-shrink-0 pt-10 md:pt-0 h-auto md:h-full">
                <div className="flex flex-col gap-6 md:gap-8">
                  <h1
                    className="font-display font-bold tracking-tight leading-[0.9]"
                    style={{ fontSize: "clamp(3.5rem, 10vw, 7.5rem)" }}
                  >
                    Case <br /> Studies
                  </h1>
                  <div className="max-w-[280px] md:max-w-xs text-gray-500 font-grotesk text-xs md:text-sm uppercase tracking-widest leading-relaxed">
                    Explorations of digital <br className="hidden md:block" />
                    products and brand <br className="hidden md:block" />
                    identities that push boundaries.
                  </div>
                  <div className="mt-8 md:mt-12 flex items-center gap-4 text-white/30 text-[10px] md:text-xs font-bold tracking-widest uppercase">
                    <span className="md:block hidden">Scroll to explore</span>
                    <span className="md:hidden block">Scroll down to explore</span>
                    <div className="w-8 md:w-12 h-[1px] bg-white/10" />
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-8 md:gap-10 items-center w-full md:h-full py-10 md:py-0">
                {caseStudies.map((study) => {
                  const poster = study.images[0];
                  const video = study.videos[0];

                  return (
                    <motion.button
                      key={study.id}
                      type="button"
                      className="relative w-full text-left sm:w-[85vw] md:w-[380px] aspect-[4/5] md:aspect-[3/4] rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden group flex-shrink-0 max-h-[70vh] bg-white/5"
                      whileHover={{ scale: 0.98 }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      onClick={() => openStudy(study)}
                    >
                      {video ? (
                        <video
                          src={video}
                          poster={poster}
                          className="w-full h-full object-cover opacity-80 transition-all duration-[1.5s] ease-out group-hover:scale-110 group-hover:opacity-100"
                          autoPlay
                          muted
                          loop
                          playsInline
                        />
                      ) : (
                        <img
                          src={poster}
                          alt={study.title}
                          className="w-full h-full object-cover opacity-80 transition-all duration-[1.5s] ease-out group-hover:scale-110 group-hover:opacity-100"
                          loading="lazy"
                        />
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/25 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
                      <div className="absolute inset-x-8 top-8 h-[1px] scale-x-0 bg-white/50 transition-transform duration-700 group-hover:scale-x-100" />

                      {study.nda && (
                        <div className="absolute top-6 left-6 md:top-10 md:left-10">
                          <div className="bg-white text-black px-3 py-1 md:px-5 md:py-2 rounded-full shadow-2xl">
                            <span className="text-[8px] md:text-[10px] font-bold tracking-widest uppercase">
                              NDA
                            </span>
                          </div>
                        </div>
                      )}

                      <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10">
                        <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-2 md:mb-3 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                          {study.cardTitle}
                        </h3>
                        <div className="h-[1px] w-0 group-hover:w-full bg-white/30 transition-all duration-700 mb-3 md:mb-4" />
                        <p className="text-gray-400 text-[10px] md:text-xs lg:text-sm uppercase tracking-[0.2em] font-medium">
                          {study.category}
                        </p>
                        <p
                          className="mt-3 text-white/55 text-xs md:text-sm leading-relaxed max-w-[92%]"
                          style={{
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {study.cardSummary}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {study.services.slice(0, 3).map((service) => (
                            <span
                              key={service}
                              className="rounded-full border border-white/15 px-3 py-1 text-[9px] md:text-[10px] uppercase tracking-[0.14em] text-white/60"
                            >
                              {service}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              <div className="w-2 md:w-4 flex-shrink-0 h-1" />
            </div>
          </main>
        ) : (
          <main className="pt-24 md:pt-32">
            <button
              type="button"
              onClick={closeStudy}
              className="fixed right-5 top-24 md:right-8 md:top-28 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white/70 backdrop-blur-md transition-colors hover:border-white/50 hover:text-white"
              aria-label="Close case study"
            >
              <X className="h-5 w-5" />
            </button>

            <section className="min-h-[88vh] px-6 md:px-12 lg:px-20 flex flex-col justify-end pb-12 md:pb-20 relative overflow-hidden">
              {selectedStudy.videos[0] && (
                <video
                  src={selectedStudy.videos[0]}
                  className="absolute inset-0 w-full h-full object-cover opacity-35"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-black/30" />
              <button
                type="button"
                onClick={closeStudy}
                className="relative z-10 self-start mb-12 inline-flex items-center gap-3 text-white/60 hover:text-white transition-colors text-xs uppercase tracking-[0.2em] font-bold"
              >
                <ArrowLeft className="w-4 h-4" />
                All case studies
              </button>
              <div className="relative z-10 max-w-5xl">
                <p className="text-white/45 text-xs md:text-sm uppercase tracking-[0.3em] font-bold mb-5">
                  {selectedStudy.category}
                </p>
                <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tight mb-8">
                  {selectedStudy.title}
                </h1>
                <p className="max-w-2xl text-white/70 text-lg md:text-2xl leading-relaxed">
                  {selectedStudy.summary}
                </p>
              </div>
            </section>

            <section className="px-6 md:px-12 lg:px-20 py-16 md:py-28">
              <div className="flex flex-col gap-16 md:gap-28">
                {selectedMedia.map((media, index) => {
                  const reversed = index % 2 === 1;
                  const isVideo = media.toLowerCase().includes(".mp4");

                  return (
                    <article
                      key={media}
                      className={`case-panel grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center min-h-[70vh] ${
                        reversed ? "lg:[&_.case-panel-copy]:order-2" : ""
                      }`}
                    >
                      <div className="case-panel-copy flex flex-col gap-6">
                        <span className="text-white/30 text-xs uppercase tracking-[0.3em] font-bold">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <h2 className="font-display text-4xl md:text-6xl font-bold leading-none">
                          {getMediaTitle(selectedStudy, index)}
                        </h2>
                        <p className="max-w-md text-white/55 text-base md:text-lg leading-relaxed">
                          {selectedStudy.cardSummary} This section highlights
                          {` ${selectedStudy.services
                            .slice(0, 3)
                            .join(", ")
                            .toLowerCase()} `}
                          through layout, motion, visual hierarchy, and
                          responsive execution.
                        </p>
                      </div>

                      <div className="relative min-h-[360px] md:min-h-[560px] overflow-hidden rounded-[1.25rem] bg-white/5">
                        {isVideo ? (
                          <video
                            src={media}
                            className="case-panel-media absolute inset-0 w-full h-[120%] object-cover"
                            autoPlay
                            muted
                            loop
                            playsInline
                          />
                        ) : (
                          <img
                            src={media}
                            alt={`${selectedStudy.title} ${index + 1}`}
                            className="case-panel-media absolute inset-0 w-full h-[120%] object-cover"
                            loading="lazy"
                          />
                        )}
                        <div className="absolute inset-0 bg-black/10" />
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          </main>
        )}

        <Footer />
      </div>
    </SmoothScroll>
  );
};

export default CaseStudies;
