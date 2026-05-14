import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const services = ["WEBSITE", "MOBILE APP", "WEB APP", "BRAND", "SOCIAL MEDIA"];

const CTASection = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const servicesRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useGSAP(() => {
    if (!containerRef.current) return;

    const items = servicesRefs.current.filter((el): el is HTMLSpanElement => Boolean(el));
    if (items.length === 0) return;

    gsap.set(items, { opacity: 0.18, filter: "blur(16px)" });
    gsap.set(items[0], { opacity: 1, filter: "blur(0px)" });

    if (backgroundRef.current) {
      gsap.set(backgroundRef.current, { filter: "blur(0px)" });
    }

    const steps = Math.max(1, items.length - 1);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: () => `+=${steps * 420}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    if (backgroundRef.current) {
      tl.to(backgroundRef.current, { filter: "blur(60px)", ease: "none", duration: steps }, 0);
    }

    for (let i = 0; i < items.length - 1; i += 1) {
      tl.to(items[i], { opacity: 0.18, filter: "blur(16px)", duration: 1, ease: "power2.inOut" }, i);
      tl.to(items[i + 1], { opacity: 1, filter: "blur(0px)", duration: 1, ease: "power2.inOut" }, i);
    }
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="contact" className="w-full relative overflow-hidden px-6 md:px-10 pt-24 pb-10 md:pt-36 md:pb-14" style={{ background: "var(--black-2)" }}>
      
      {/* Background Visuals that Blur on Scroll */}
      <motion.div 
        ref={backgroundRef}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <div className="absolute top-[10%] left-[10%] w-[300px] h-[300px] bg-[#2d5af1]/20 rounded-full mix-blend-screen blur-[40px]" />
        <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] bg-[#fde3c6]/10 rounded-full mix-blend-screen blur-[60px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/[0.03] rounded-full mix-blend-screen blur-[80px]" />
      </motion.div>

      <div className="text-center relative z-10 max-w-5xl mx-auto">
        <motion.p
          className="text-white/50 text-lg mb-8 font-grotesk"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Let's talk about your
        </motion.p>

        <div className="flex flex-col items-center mb-14">
          {services.map((service, i) => (
            <span
              key={service}
              ref={(el) => { servicesRefs.current[i] = el; }}
              className="font-display text-white font-bold leading-[1.1] tracking-tight"
              style={{ fontSize: "clamp(2.5rem, 6vw, 6.5rem)" }}
            >
              {service}
            </span>
          ))}
        </div>

        <motion.div
          className="flex flex-wrap gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <button
            onClick={() => navigate("/lets-connect")}
            className="inline-flex items-center gap-3 text-[#020202] text-[13px] font-semibold tracking-wider uppercase px-7 py-4 hover:brightness-110 transition-all duration-300"
            style={{ background: "#fde3c6", borderRadius: 100 }}
          >
            Let's Connect
            <ArrowRight size={14} />
          </button>
          <button
            onClick={() => navigate("/lets-connect")}
            className="inline-flex items-center gap-3 text-white text-[13px] font-semibold tracking-wider uppercase px-7 py-4 hover:bg-white hover:text-[#020202] transition-all duration-300"
            style={{ border: "1px solid rgba(255,255,255,0.35)", borderRadius: 100 }}
          >
            Book a Call
            <ArrowRight size={14} />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
