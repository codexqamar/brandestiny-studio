import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import brandestinyLogo from "@/assets/brandestiny-footer-logo.png";

const Preloader = () => {
  const [visible, setVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => setVisible(false),
      });

      tl.fromTo(
        logoRef.current,
        { autoAlpha: 0, y: 28, scale: 0.86 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.7 },
      )
        .fromTo(
          textRef.current,
          { autoAlpha: 0, y: 12 },
          { autoAlpha: 1, y: 0, duration: 0.45 },
          "-=0.25",
        )
        .fromTo(
          barRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 1.05, ease: "power2.inOut" },
          "-=0.15",
        )
        .to(logoRef.current, {
          y: -14,
          duration: 0.35,
          yoyo: true,
          repeat: 1,
          ease: "power1.inOut",
        })
        .to(containerRef.current, {
          autoAlpha: 0,
          duration: 0.45,
          ease: "power2.inOut",
        });
    },
    { scope: containerRef },
  );

  if (!visible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black text-white"
    >
      <div className="flex flex-col items-center gap-7 px-6 text-center">
        <img
          ref={logoRef}
          src={brandestinyLogo}
          alt="Brandestiny"
          className="h-24 w-24 md:h-32 md:w-32 object-contain"
        />
        <p
          ref={textRef}
          className="font-grotesk text-xs md:text-sm font-bold uppercase tracking-[0.28em] text-white/70"
        >
          Getting Ready to Take Off
        </p>
        <div className="h-[2px] w-36 overflow-hidden bg-white/10">
          <div ref={barRef} className="h-full w-full origin-left bg-[#fde3c6]" />
        </div>
      </div>
    </div>
  );
};

export default Preloader;
