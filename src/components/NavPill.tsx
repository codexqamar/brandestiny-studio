import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";

const navItems = [
  { label: "HOME", number: "01", href: "/" },
  { label: "CASE STUDIES", number: "02", href: "/case-studies" },
  { label: "LET'S CONNECT", number: "03", href: "/lets-connect" },
];

const NavPill = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pillRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll progress tracker -> CSS variable fill without React re-renders.
  useEffect(() => {
    let rafId = 0;
    let lastProgress = -1;
    let ticking = false;

    const computeProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      return docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
    };

    const update = () => {
      ticking = false;
      const progress = computeProgress();
      if (Math.abs(progress - lastProgress) > 0.001) {
        lastProgress = progress;
        pillRef.current?.style.setProperty("--nav-scroll-progress", `${progress * 100}%`);
      }
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        rafId = window.requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (pillRef.current && !pillRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 200);
  };

  const handleNavClick = (href: string) => {
    setIsOpen(false);

    if (href.startsWith("/#")) {
      const id = href.substring(2);
      if (location.pathname === "/") {
        const el = document.getElementById(id);
        el?.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate(href);
      }
    } else {
      navigate(href);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const scrollTo = (id: string) => {
    setIsOpen(false);
    const el = document.querySelector(id);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed top-[10px] left-1/2 -translate-x-1/2 z-50 flex items-center justify-center pointer-events-none">
      <motion.nav
        ref={pillRef}
        className="pointer-events-auto relative flex flex-col items-start"
        style={{
          borderRadius: 20,
          overflow: "hidden", // Changed from clip to explicitly hidden, removes container padding
        }}
        initial={false}
        animate={{
          width: isOpen ? 385 : 363,
          height: isOpen ? "90vh" : 54, // Full screen relative height
        }}
        transition={{
          height: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
          width: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* ── Outer glass background (static base) ── */}
        <div
          className="absolute inset-0 z-0"
          style={{
            borderRadius: "inherit",
            background: "linear-gradient(180deg, rgba(20, 20, 20, 0.9) 0%, rgba(30, 30, 30, 0.8) 100%)",
            backdropFilter: "blur(40px)",
            WebkitBackdropFilter: "blur(40px)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
          }}
        />

        {/* ── Subtle inner gradient overlay for that "soft" look in the image ── */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-[1] pointer-events-none"
            style={{
              background: "radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.05) 0%, transparent 70%)"
            }}
          />
        )}

        {/* ── Inner header strip (pill-in-pill) ── */}
        {/* Takes exactly 44px inside the 54px pill, meaning 5px gap top/bottom, 5px gap left/right */}
        <div
          className="absolute z-[2]"
          style={{
            top: 5,
            left: 5,
            right: 5,
            height: 44,
            borderRadius: 16,
            backgroundColor: "transparent",
            border: "1px solid rgba(255, 255, 255, 0.10)",
            overflow: "hidden",
            pointerEvents: "none",
          }}
        >
          <div
            className="absolute inset-y-0 left-0"
            style={{
              width: "var(--nav-scroll-progress, 0%)",
              backgroundColor: "rgba(255, 255, 255, 0.16)",
              borderRadius: "inherit",
              transition: "width 0.08s linear",
            }}
          />
        </div>

        {/* ── Header row: Logo + Dots toggle ── */}
        {/* Exactly positioned over the inner header strip */}
        <div
          className="absolute z-[3] flex items-center justify-between cursor-pointer interactive"
          style={{
            top: 5,
            left: 5,
            right: 5,
            height: 44,
            paddingLeft: 20, // Perfectly indents the text & dots
            paddingRight: 16,
          }}
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
        >
          {/* Logo text — using custom HelveticaNeue Ext file */}
          <span
            onClick={(e) => {
              e.stopPropagation();
              handleNavClick("/");
            }}
            className="relative select-none whitespace-nowrap"
            style={{
              fontFamily: "'HelveticaNeue Ext', sans-serif",
              fontSize: 16, // Adjusted slightly since extended fonts tend to render larger
              fontWeight: 'bold',
              letterSpacing: "0.01em", // Extended fonts usually benefit from tighter kerning
              textTransform: "uppercase",
              color: "#ffffff",
              display: "inline-flex",
              alignItems: "center",
              transform: "translateY(1px)", // Perfect visual alignment center
            }}
          >
            <span aria-hidden="true">BRANDESTINY</span>
            <span
              aria-hidden="true"
              className="absolute inset-y-0 left-0 overflow-hidden"
              style={{
                width: "var(--nav-scroll-progress, 0%)",
                color: "#fde3c6",
                transition: "width 0.08s linear",
              }}
            >
              BRANDESTINY
            </span>
            <span className="sr-only">BRANDESTINY</span>
          </span>

          {/* ── Animated dots toggle — grouped perfectly right ── */}
          <div
            className="relative flex-shrink-0"
            style={{ width: 18, height: 18 }}
          >
            {[
              { id: "tl", closed: { top: 0, left: 0, opacity: 1 }, open: { top: "50%", left: "50%", x: "-50%", y: "-50%", opacity: 0 } },
              { id: "bl", closed: { bottom: 0, left: 0, opacity: 1 }, open: { top: "50%", left: "50%", x: "-50%", y: "-50%", opacity: 0 } },
              { id: "tr", closed: { top: 0, right: 0, opacity: 1 }, open: { top: "50%", right: "50%", x: "50%", y: "-50%", opacity: 0 } },
              { id: "br", closed: { bottom: 0, right: 0, opacity: 1 }, open: { top: "50%", right: "50%", x: "50%", y: "-50%", opacity: 0 } },
              { id: "cl", closed: { top: "50%", left: "50%", x: "-50%", y: "-50%", opacity: 0 }, open: { top: "50%", left: "15%", x: "-50%", y: "-50%", opacity: 1 } },
              { id: "cr", closed: { top: "50%", right: "50%", x: "50%", y: "-50%", opacity: 0 }, open: { top: "50%", right: "15%", x: "50%", y: "-50%", opacity: 1 } },
            ].map((dot) => (
              <motion.div
                key={dot.id}
                className="absolute rounded-full bg-white"
                style={{ width: 6, height: 6 }}
                initial={false}
                animate={isOpen ? dot.open : dot.closed}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
            ))}
          </div>
        </div>

        {/* ── Expanded content ── */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="relative z-[1] flex flex-col flex-1 justify-between w-full max-h-[90vh] overflow-hidden"
              style={{
                marginTop: 64, // Pushes it exactly below the header strip
                paddingLeft: 25,
                paddingRight: 25,
                paddingBottom: 25,
              }}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Nav links */}
              <div className="flex flex-col gap-8 overflow-y-auto no-scrollbar pt-12">
                {navItems.map((item, i) => (
                  <motion.button
                    key={item.label}
                    onClick={() => handleNavClick(item.href)}
                    className="group flex items-center gap-[15px] relative cursor-pointer text-left w-fit interactive"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
                  >
                    <span
                      className="text-white leading-[1] tracking-tight uppercase"
                      style={{
                        fontFamily: "'Helvetica Now Display', 'DM Sans', sans-serif",
                        fontSize: 40,
                        fontWeight: 600
                      }}
                    >
                      {item.label}
                    </span>
                    <span
                      className="self-start"
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: 16,
                        fontWeight: 300,
                        color: "rgba(255, 255, 255, 0.3)",
                        marginTop: 6,
                      }}
                    >
                      {item.number}
                    </span>
                  </motion.button>
                ))}
              </div>

              {/* CTA at bottom */}
              <motion.div
                className="mt-auto pt-10"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <button
                  onClick={() => handleNavClick("/lets-connect")}
                  className="group flex items-center gap-[10px] relative cursor-pointer text-left w-fit interactive"
                >
                  <span
                    className="text-white leading-[1] uppercase"
                    style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 34, fontWeight: 600 }}
                  >
                    Let's Connect
                  </span>
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
};

export default NavPill;
