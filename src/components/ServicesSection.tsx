import { type ReactNode, useEffect, useRef, useState } from "react";
import { ArrowLeft, X } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import brandIdentityVideo from "@/assets/Brand Identity Creation Section.mp4";
import devopsVideo from "@/assets/Devops Section.mp4";
import erpVideo from "@/assets/ERP Section.mp4";
import seoVideo from "@/assets/For SEO Section.mp4";
import mobileAppVideo from "@/assets/Mobile App Section.mp4";
import saasVideo from "@/assets/SAAS Section.mp4";
import socialMediaVideo from "@/assets/Social Media Management Section.mp4";
import webAppVideo from "@/assets/Web App Development.mp4";
import websiteVideo from "@/assets/Website Design and Development Section.mp4";

gsap.registerPlugin(ScrollTrigger);

type ServiceCardProps = {
  service: ServiceItem;
  showDivider?: boolean;
  onOpen: (service: ServiceItem) => void;
};

type ServiceItem = {
  id: string;
  title: ReactNode;
  cardTitle: string;
  eyebrow: string;
  summary: string;
  outcomes: string[];
  videoSrc: string;
  panels: Array<{
    title: string;
    body: string;
    videoSrc: string;
  }>;
};

const ServiceCard = ({ service, showDivider = true, onOpen }: ServiceCardProps) => {
  return (
    <button
      id={service.id}
      type="button"
      onClick={() => onOpen(service)}
      className="relative group scroll-mt-24 w-full appearance-none bg-transparent p-8 md:p-12 aspect-square md:aspect-auto md:h-[400px] border-x-0 border-t-0 border-b border-white/10 overflow-hidden flex flex-col justify-between text-left"
    >
      <video
        src={service.videoSrc}
        className="absolute inset-0 w-full h-full object-cover opacity-60 transition duration-500 group-hover:opacity-80 group-hover:scale-105"
        autoPlay
        muted
        loop
        playsInline
      />

      <div className="absolute inset-0 bg-black/40 transition-colors duration-500 group-hover:bg-black/25" />

      <div className="relative z-10">
        <div className="w-5 h-5 rounded-full border border-white/30 transition-all duration-500 group-hover:scale-125 group-hover:border-white group-hover:bg-white" />
      </div>

      <h3 className="relative z-10 font-display text-white text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1]">
        {service.title}
      </h3>

      {showDivider && (
        <div className="hidden md:block absolute top-0 right-0 w-[1px] h-full bg-white/10" />
      )}
    </button>
  );
};

const services: ServiceItem[] = [
  {
    title: (
      <>
        Brand Identity <br /> Creation
      </>
    ),
    cardTitle: "Brand Identity Creation",
    eyebrow: "Strategy / Identity",
    summary:
      "A full identity system for brands that need a memorable visual language, consistent applications, and sharper market positioning.",
    outcomes: ["Logo systems", "Visual direction", "Brand guidelines", "Launch assets"],
    id: "service-brand-identity",
    videoSrc: brandIdentityVideo,
    panels: [
      {
        title: "Identity System",
        body: "We shape the mark, typography, color, and visual rules into a brand system that scales across every customer touchpoint.",
        videoSrc: brandIdentityVideo,
      },
      {
        title: "Launch Materials",
        body: "The identity expands into launch assets, social systems, presentation visuals, and practical brand applications.",
        videoSrc: socialMediaVideo,
      },
    ],
  },
  {
    title: (
      <>
        Web Design & <br /> Development
      </>
    ),
    cardTitle: "Website Design & Development",
    eyebrow: "Design / Development",
    summary:
      "Responsive websites built around strong brand storytelling, polished motion, clear conversion paths, and production-ready implementation.",
    outcomes: ["Responsive UI", "Landing pages", "Motion systems", "Frontend build"],
    id: "service-website-design",
    videoSrc: websiteVideo,
    panels: [
      {
        title: "Conversion Structure",
        body: "Each page is structured around the action users should take, with hierarchy and pacing built for clarity.",
        videoSrc: websiteVideo,
      },
      {
        title: "Responsive Execution",
        body: "Layouts, media, and interaction states are tuned across desktop, tablet, and mobile.",
        videoSrc: webAppVideo,
      },
    ],
  },
  {
    title: "Mobile Apps",
    cardTitle: "Mobile Apps",
    eyebrow: "iOS / Android",
    summary:
      "Mobile app interfaces and flows designed for fast scanning, smooth onboarding, and focused native-feeling product experiences.",
    outcomes: ["App UI UX", "User flows", "Design systems", "Interactive screens"],
    id: "service-mobile-apps",
    videoSrc: mobileAppVideo,
    panels: [
      {
        title: "App Flow Design",
        body: "Core user journeys are mapped first, then translated into mobile screens that reduce friction.",
        videoSrc: mobileAppVideo,
      },
      {
        title: "Product Polish",
        body: "Interaction states, visual rhythm, and interface details are refined before development begins.",
        videoSrc: saasVideo,
      },
    ],
  },
  {
    title: "Web Apps",
    cardTitle: "Web Apps",
    eyebrow: "SaaS / Platforms",
    summary:
      "Web application interfaces for dashboards, admin tools, product workflows, and scalable SaaS experiences.",
    outcomes: ["Dashboard UI", "Admin panels", "Product workflows", "Frontend systems"],
    id: "service-web-apps",
    videoSrc: webAppVideo,
    panels: [
      {
        title: "Operational UI",
        body: "Dense workflows are organized into calm, scannable interfaces that help users compare, decide, and act.",
        videoSrc: webAppVideo,
      },
      {
        title: "Reusable Systems",
        body: "Components and states are designed for product growth without sacrificing consistency.",
        videoSrc: erpVideo,
      },
    ],
  },
  {
    title: "ERP",
    cardTitle: "CRM ERP Systems",
    eyebrow: "Business Systems",
    summary:
      "CRM and ERP platforms designed around pipelines, reporting, admin operations, role-based views, and business workflows.",
    outcomes: ["CRM dashboards", "ERP workflows", "Reporting UI", "Business automation"],
    id: "service-crm-erp",
    videoSrc: erpVideo,
    panels: [
      {
        title: "Workflow Architecture",
        body: "Business logic is organized into dashboards and flows that support activity, reporting, and operations.",
        videoSrc: erpVideo,
      },
      {
        title: "Actionable Dashboards",
        body: "Data-heavy screens are designed around readable hierarchy, clear filters, and useful views.",
        videoSrc: webAppVideo,
      },
    ],
  },
  {
    title: "DevOps",
    cardTitle: "DevOps",
    eyebrow: "Cloud / Automation",
    summary:
      "DevOps presentation and platform experiences for infrastructure, deployment workflows, CI/CD, and monitoring systems.",
    outcomes: ["CI/CD flows", "Cloud systems", "Monitoring UI", "Automation"],
    id: "service-devops",
    videoSrc: devopsVideo,
    panels: [
      {
        title: "Infrastructure Storytelling",
        body: "Technical systems are translated into clear visual experiences that make automation easier to understand.",
        videoSrc: devopsVideo,
      },
      {
        title: "Engineering Interfaces",
        body: "Technical workflows for status, logs, deployments, and operational review are designed without visual overload.",
        videoSrc: saasVideo,
      },
    ],
  },
  {
    title: "SEO",
    cardTitle: "SEO",
    eyebrow: "Search / Growth",
    summary:
      "SEO-focused structure for websites and content systems needing better discoverability and search intent alignment.",
    outcomes: ["Search strategy", "Metadata", "Content structure", "Technical SEO"],
    id: "service-seo",
    videoSrc: seoVideo,
    panels: [
      {
        title: "Search Structure",
        body: "Pages are planned around intent, hierarchy, and metadata so users and search engines understand the offer quickly.",
        videoSrc: seoVideo,
      },
      {
        title: "Content Systems",
        body: "Reusable page sections and content patterns support ongoing publishing without sacrificing design quality.",
        videoSrc: websiteVideo,
      },
    ],
  },
  {
    title: "SAAS",
    cardTitle: "SaaS Product Systems",
    eyebrow: "Product Systems",
    summary:
      "SaaS experiences for subscription products, dashboards, onboarding, account flows, and scalable interface systems.",
    outcomes: ["SaaS UX", "Onboarding", "Billing flows", "Product UI"],
    id: "service-saas",
    videoSrc: saasVideo,
    panels: [
      {
        title: "Product Onboarding",
        body: "First-run experiences and core product paths are designed so users understand value quickly.",
        videoSrc: saasVideo,
      },
      {
        title: "Interface Scale",
        body: "Reusable patterns keep expansion consistent across dashboards, settings, billing, and feature surfaces.",
        videoSrc: webAppVideo,
      },
    ],
  },
  {
    title: (
      <>
        Social Media <br /> Management
      </>
    ),
    cardTitle: "Social Media Management",
    eyebrow: "Campaigns / Content",
    summary:
      "Social media systems for campaigns, content calendars, branded post templates, and digital marketing visuals.",
    outcomes: ["Campaign systems", "Post templates", "Content direction", "Brand recall"],
    id: "service-social-media",
    videoSrc: socialMediaVideo,
    panels: [
      {
        title: "Campaign Rhythm",
        body: "Content formats are built as repeatable systems so campaigns stay consistent without becoming repetitive.",
        videoSrc: socialMediaVideo,
      },
      {
        title: "Brand Recall",
        body: "Color, typography, motion, and composition are tuned for fast recognition across social channels.",
        videoSrc: brandIdentityVideo,
      },
    ],
  },
];

const ServicesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;

    if (!selectedService || !detailRef.current) {
      window.dispatchEvent(
        new CustomEvent("brandestiny:nav-scroll-source", {
          detail: { source: null },
        }),
      );
      return undefined;
    }

    detailRef.current.scrollTop = 0;
    document.body.style.overflow = "hidden";
    window.dispatchEvent(
      new CustomEvent("brandestiny:nav-scroll-source", {
        detail: { source: detailRef.current },
      }),
    );

    return () => {
      document.body.style.overflow = originalOverflow;
      window.dispatchEvent(
        new CustomEvent("brandestiny:nav-scroll-source", {
          detail: { source: null },
        }),
      );
    };
  }, [selectedService]);

  useGSAP(
    () => {
      if (!selectedService || !detailRef.current) return;
      const scroller = detailRef.current;

      gsap.fromTo(
        scroller,
        { autoAlpha: 0, y: 34 },
        { autoAlpha: 1, y: 0, duration: 0.65, ease: "power3.out" },
      );

      const panels = gsap.utils.toArray<HTMLElement>(".service-panel");
      panels.forEach((panel) => {
        const media = panel.querySelector(".service-panel-media");
        const copy = panel.querySelector(".service-panel-copy");

        gsap.fromTo(
          copy,
          { autoAlpha: 0, y: 40 },
          {
            autoAlpha: 1,
            y: 0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: panel,
              scroller,
              start: "top 65%",
              end: "center center",
              scrub: 1,
            },
          },
        );

        gsap.fromTo(
          media,
          { yPercent: 12, scale: 1.08 },
          {
            yPercent: -8,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: panel,
              scroller,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          },
        );
      });
    },
    { dependencies: [selectedService], scope: sectionRef },
  );

  return (
    <section ref={sectionRef} id="services" className="w-full bg-black">
      <div className="grid grid-cols-1 md:grid-cols-3 border-t border-white/10">
        <div className="order-2 lg:order-1">
          <ServiceCard
            service={services[0]}
            onOpen={setSelectedService}
          />
        </div>

        {/* Row 1, Col 2-3: Key Services */}
        <div className="order-1 lg:order-2 md:col-span-2 p-8 md:p-12 border-b border-white/10 flex flex-col justify-start gap-8 md:gap-10 h-[300px] md:h-auto">
          <h2 className="font-display text-white text-4xl md:text-5xl lg:text-6xl font-bold">
            Key Services
          </h2>
          <div className="max-w-md">
            <p className="text-white text-xl md:text-2xl font-medium leading-relaxed">
              This is what I focus on. <br />
              Additional services are available upon request.
            </p>
          </div>
        </div>

        {services.slice(1).map((service, index) => (
          <div key={service.id} className="order-3">
            <ServiceCard
              service={service}
              onOpen={setSelectedService}
              showDivider={index % 3 !== 2}
            />
          </div>
        ))}
      </div>

      {selectedService && (
        <div
          ref={detailRef}
          className="fixed inset-0 z-[45] overflow-y-auto bg-black text-white no-scrollbar"
          data-lenis-prevent
        >
          <button
            type="button"
            onClick={() => setSelectedService(null)}
            className="fixed right-5 top-24 md:right-8 md:top-28 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white/70 backdrop-blur-md transition-colors hover:border-white/50 hover:text-white"
            aria-label="Close service"
          >
            <X className="h-5 w-5" />
          </button>

          <main>
            <section className="min-h-screen px-6 md:px-12 lg:px-20 flex flex-col justify-end pb-12 md:pb-20 relative overflow-hidden">
              <video
                src={selectedService.videoSrc}
                className="absolute inset-0 w-full h-full object-cover opacity-35"
                autoPlay
                muted
                loop
                playsInline
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-black/30" />
              <button
                type="button"
                onClick={() => setSelectedService(null)}
                className="relative z-10 self-start mb-12 inline-flex items-center gap-3 text-white/60 hover:text-white transition-colors text-xs uppercase tracking-[0.2em] font-bold"
              >
                <ArrowLeft className="w-4 h-4" />
                All services
              </button>
              <div className="relative z-10 max-w-5xl">
                <p className="text-white/45 text-xs md:text-sm uppercase tracking-[0.3em] font-bold mb-5">
                  {selectedService.eyebrow}
                </p>
                <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tight mb-8">
                  {selectedService.cardTitle}
                </h1>
                <p className="max-w-2xl text-white/70 text-lg md:text-2xl leading-relaxed">
                  {selectedService.summary}
                </p>
                <div className="mt-8 flex flex-wrap gap-2">
                  {selectedService.outcomes.map((outcome) => (
                    <span
                      key={outcome}
                      className="rounded-full border border-white/15 px-4 py-2 text-[10px] md:text-xs uppercase tracking-[0.16em] text-white/65"
                    >
                      {outcome}
                    </span>
                  ))}
                </div>
              </div>
            </section>

            <section className="px-6 md:px-12 lg:px-20 py-16 md:py-28">
              <div className="flex flex-col gap-16 md:gap-28">
                {selectedService.panels.map((panel, index) => {
                  const reversed = index % 2 === 1;

                  return (
                    <article
                      key={panel.title}
                      className={`service-panel grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center min-h-screen ${
                        reversed ? "lg:[&_.service-panel-copy]:order-2" : ""
                      }`}
                    >
                      <div className="service-panel-copy flex flex-col gap-6">
                        <span className="text-white/30 text-xs uppercase tracking-[0.3em] font-bold">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <h2 className="font-display text-4xl md:text-6xl font-bold leading-none">
                          {panel.title}
                        </h2>
                        <p className="max-w-md text-white/55 text-base md:text-lg leading-relaxed">
                          {panel.body}
                        </p>
                      </div>

                      <div className="relative min-h-[360px] md:min-h-[560px] overflow-hidden rounded-[1.25rem] bg-white/5">
                        <video
                          src={panel.videoSrc}
                          className="service-panel-media absolute inset-0 w-full h-[120%] object-cover"
                          autoPlay
                          muted
                          loop
                          playsInline
                        />
                        <div className="absolute inset-0 bg-black/10" />
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          </main>
        </div>
      )}
    </section>
  );
};

export default ServicesSection;
