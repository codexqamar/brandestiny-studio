import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import CustomCursor from "@/components/CustomCursor";
import NavPill from "@/components/NavPill";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import ServiceDetailOverlay from "@/components/ServiceDetailOverlay";
import { services, type ServiceItem } from "@/data/services";

const Services = () => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const location = useLocation();

  useEffect(() => {
    document.title = "Services | Brandestiny";

    let metaDescription = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]',
    );

    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.name = "description";
      document.head.appendChild(metaDescription);
    }

    metaDescription.content =
      "Explore Brandestiny services across brand identity, website design, web app development, mobile apps, CRM ERP systems, DevOps, SEO, SaaS, and social media management.";
  }, []);

  useEffect(() => {
    if (!location.hash) return;

    const targetId = location.hash.slice(1);
    const scrollTimer = window.setTimeout(() => {
      document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);

    return () => window.clearTimeout(scrollTimer);
  }, [location.hash]);

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-black text-white">
        <CustomCursor />
        <NavPill />

        <main className="pt-24 md:pt-32">
          <section className="px-6 md:px-12 lg:px-20 pb-16 md:pb-24">
            <div className="max-w-6xl">
              <p className="mb-6 text-xs md:text-sm uppercase tracking-[0.3em] text-white/40 font-bold">
                Services
              </p>
              <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tight">
                Services built for brand, product, and growth.
              </h1>
              <p className="mt-8 max-w-2xl text-lg md:text-2xl leading-relaxed text-white/60">
                Each service opens into the same immersive detail experience used across the site, with focused outcomes, motion, and a clear path to connect.
              </p>
            </div>
          </section>

          <section className="border-t border-white/10">
            {services.map((service, index) => {
              const reversed = index % 2 === 1;

              return (
                <article
                  key={service.id}
                  id={service.id}
                  className="grid min-h-[78vh] scroll-mt-24 grid-cols-1 border-b border-white/10 lg:grid-cols-2"
                >
                  <button
                    type="button"
                    onClick={() => setSelectedService(service)}
                    className={`group relative min-h-[360px] overflow-hidden text-left ${
                      reversed ? "lg:order-2" : ""
                    }`}
                  >
                    <video
                      src={service.videoSrc}
                      className="absolute inset-0 h-full w-full object-cover opacity-65 transition duration-700 group-hover:scale-105 group-hover:opacity-85"
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                    <div className="absolute inset-0 bg-black/35 transition-colors duration-500 group-hover:bg-black/20" />
                    <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-[0.24em] text-white/55">
                        Open Service
                      </span>
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/25 bg-black/30 text-white transition-transform duration-300 group-hover:scale-110">
                        <ArrowRight className="h-5 w-5" />
                      </span>
                    </div>
                  </button>

                  <div className="flex flex-col justify-center px-6 py-12 md:px-12 lg:px-20">
                    <span className="mb-6 text-xs font-bold uppercase tracking-[0.3em] text-white/35">
                      {String(index + 1).padStart(2, "0")} / {service.eyebrow}
                    </span>
                    <h2 className="font-display text-4xl md:text-6xl font-bold leading-none">
                      {service.cardTitle}
                    </h2>
                    <p className="mt-6 max-w-xl text-base md:text-lg leading-relaxed text-white/58">
                      {service.summary}
                    </p>
                    <div className="mt-8 flex flex-wrap gap-2">
                      {service.outcomes.map((outcome) => (
                        <span
                          key={outcome}
                          className="rounded-full border border-white/15 px-4 py-2 text-[10px] md:text-xs uppercase tracking-[0.16em] text-white/60"
                        >
                          {outcome}
                        </span>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedService(service)}
                      className="mt-10 inline-flex w-fit items-center gap-3 rounded-full bg-[#fde3c6] px-7 py-4 text-[12px] font-bold uppercase tracking-[0.18em] text-black transition-transform duration-300 hover:scale-105"
                    >
                      View Details
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </article>
              );
            })}
          </section>

          <section className="overflow-hidden px-6 md:px-12 lg:px-20 py-20 md:py-32">
            <div className="border-t border-white/10 pt-10 md:pt-14">
              <div className="mx-auto flex min-h-[260px] max-w-5xl flex-col items-center justify-center gap-8 text-center">
                <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-none text-white">
                  Let's Go Beyond the Stars
                </h2>
                <Link
                  to="/lets-connect"
                  className="inline-flex items-center gap-3 rounded-full bg-[#fde3c6] px-7 py-4 text-[12px] font-bold uppercase tracking-[0.18em] text-black transition-transform duration-300 hover:scale-105"
                >
                  Let's Connect
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </section>
        </main>

        {selectedService && (
          <ServiceDetailOverlay
            service={selectedService}
            onClose={() => setSelectedService(null)}
          />
        )}

        <Footer />
      </div>
    </SmoothScroll>
  );
};

export default Services;
