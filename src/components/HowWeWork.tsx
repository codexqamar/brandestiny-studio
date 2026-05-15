import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "1",
    title: "Align on your key product goal",
    description: "Start with what matters-your core product objective. We build solutions around real user needs to set a strong foundation for growth.",
  },
  {
    number: "2",
    title: "Always more than one solution",
    description: "I don't deliver just one route. You get options, explorations and clear directions.",
  },
  {
    number: "3",
    title: "Build & iterate rapidly",
    description: "Using modern tech stacks and agile processes, we deliver working products fast — then refine based on real user feedback.",
  },
];

const HowWeWork = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const stepsContainerRef = useRef<HTMLDivElement>(null);
  const stepsRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    // Ensure elements exist
    if (!containerRef.current || !headingRef.current || !stepsContainerRef.current) return;

    // Reset initial states
    stepsRefs.current.forEach((step, i) => {
      if (!step) return;
      if (i > 0) {
        gsap.set(step, { autoAlpha: 0, y: 50 });
      } else {
        gsap.set(step, { autoAlpha: 1, y: 0 }); 
      }
    });

    // Create the main pinned scroll timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: stepsContainerRef.current,
        start: "top top",
        end: "+=2000", // Total scroll distance for steps only
        pin: true,
        scrub: 1, // Smooth scrubbing 
        anticipatePin: 1,
      }
    });

    // Animate between steps 
    // Step 1 to Step 2
    tl.to(stepsRefs.current[0], {
      autoAlpha: 0,
      y: -50,
      duration: 1,
      ease: "power2.inOut"
    }, "+=1") // Wait a bit before transitioning
    .to(stepsRefs.current[1], {
      autoAlpha: 1,
      y: 0,
      duration: 1,
      ease: "power2.inOut"
    }, "<0.5"); // Start bringing in step 2 while step 1 leaves

    // Step 2 to Step 3
    tl.to(stepsRefs.current[1], {
      autoAlpha: 0,
      y: -50,
      duration: 1,
      ease: "power2.inOut"
    }, "+=1")
    .to(stepsRefs.current[2], {
      autoAlpha: 1,
      y: 0,
      duration: 1,
      ease: "power2.inOut"
    }, "<0.5");

    // Hold step 3 for a bit at the end
    tl.to({}, { duration: 1 });

  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      className="relative w-full overflow-hidden" 
      style={{ background: "var(--black-2)" }}
    >
      {/* Heading Layer - Non pinned */}
      <div 
        ref={headingRef}
        className="w-full h-[60vh] flex flex-col items-center justify-center px-6 text-center"
      >
        <h2
          className="text-white font-display font-medium leading-[1.1] max-w-4xl"
          style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)" }}
        >
          We turn raw ideas into products that work and grow.
        </h2>
        <div className="mt-20 w-[1px] h-32 border-l border-dashed border-[#2d5af1]/40" />
      </div>

      {/* Steps Layer - Pinned Area */}
      <div 
        ref={stepsContainerRef}
        className="relative h-screen flex items-center justify-center z-10 w-full"
      >
        {/* Background Dashed Line */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] border-l border-dashed border-[#2d5af1]/30 z-0" />

        <div className="max-w-[1440px] w-full mx-auto px-6 md:px-12 lg:px-20 flex flex-col items-center relative h-full justify-center z-10">
          
          {/* Steps Content Area - Stacked absolutely */}
          <div className="w-full flex-1 flex flex-col justify-center relative min-h-[400px]">
            {steps.map((step, i) => (
              <div 
                key={`step-${step.number}`}
                ref={el => { stepsRefs.current[i] = el }}
                className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex flex-col md:flex-row items-center justify-between gap-12"
              >
                {/* Left Title */}
                <div className="md:w-1/3 text-center md:text-left">
                  <h3 className="text-white font-display font-medium text-2xl md:text-4xl leading-tight">
                    {step.title}
                  </h3>
                </div>

                {/* Center Large Number */}
                <div className="md:w-1/3 flex justify-center">
                  <span 
                    className="text-white font-display font-bold leading-none select-none"
                    style={{ fontSize: "clamp(12rem, 25vw, 30rem)" }}
                  >
                    {step.number}
                  </span>
                </div>

                {/* Right Description */}
                <div className="md:w-1/3 text-center md:text-right flex md:justify-end">
                  <p className="text-white/70 font-display text-base md:text-lg leading-relaxed max-w-[320px]">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Persistent Step UI Area (Button) */}
          <div className="flex flex-col items-center mb-12 relative z-20">
            {/* Step Button */}
            <button
              onClick={() => navigate("/lets-connect")}
              className="inline-flex items-center justify-center text-black font-bold text-xs md:text-sm tracking-[0.2em] uppercase px-10 py-4 rounded-xl hover:scale-105 transition-transform shadow-[0_0_20px_rgba(253,227,198,0.3)] mb-8"
              style={{ backgroundColor: "#FDE3C6" }}
            >
              Let's Connect
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HowWeWork;
