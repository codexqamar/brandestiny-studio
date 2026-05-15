import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Building2, Mail } from "lucide-react";
import footerLogo from "@/assets/brandestiny-footer-logo.png";

const navLinks = [
  { label: "Work", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#story" },
  { label: "Contact", href: "#contact" },
  { label: "Cookies Policy", href: "#" },
  { label: "Privacy Policy", href: "#" },
];

const socialLinks = [
  { label: "WhatsApp", displayName: "WhatsApp", href: "https://wa.me/447380313065" },
  { label: "Instagram", displayName: "Instagram", href: "#" },
  { label: "X", displayName: "X", href: "#" },
  { label: "LinkedIn", displayName: "LinkedIn", href: "#" },
  { label: "Behance", displayName: "Behance", href: "#" },
  { label: "Dribbble", displayName: "Dribbble", href: "#" },
];

const platformLinks = [
  { label: "Bark", href: "#" },
  { label: "Trustpilot", href: "#" },
  { label: "Clutch", href: "#" },
  { label: "Google", href: "#" },
];

const contactLinks = [
  { label: "Email", value: "info@brandestiny.co", href: "mailto:info@brandestiny.co", icon: "mail" },
  { label: "US Phone Number", value: "+1 (213) 993-0155", href: "tel:+12139930155", icon: "us" },
  { label: "UK Phone Number", value: "+ 44 (020) 382-9286", href: "tel:+440203829286", icon: "uk" },
  { label: "Company Number", value: "16558368", href: null, icon: "company" },
];

const FlagIcon = ({ country }: { country: "uk" | "us" }) => {
  if (country === "uk") {
    return (
      <svg viewBox="0 0 60 36" className="h-[18px] w-[30px] shrink-0 rounded-sm" aria-hidden="true">
        <clipPath id="footer-uk-flag">
          <rect width="60" height="36" rx="3" />
        </clipPath>
        <g clipPath="url(#footer-uk-flag)">
          <rect width="60" height="36" fill="#012169" />
          <path d="M0 0l60 36M60 0 0 36" stroke="#fff" strokeWidth="8" />
          <path d="M0 0l60 36M60 0 0 36" stroke="#C8102E" strokeWidth="4" />
          <path d="M30 0v36M0 18h60" stroke="#fff" strokeWidth="12" />
          <path d="M30 0v36M0 18h60" stroke="#C8102E" strokeWidth="7" />
        </g>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 60 36" className="h-[18px] w-[30px] shrink-0 rounded-sm" aria-hidden="true">
      <clipPath id="footer-us-flag">
        <rect width="60" height="36" rx="3" />
      </clipPath>
      <g clipPath="url(#footer-us-flag)">
        <rect width="60" height="36" fill="#fff" />
        {Array.from({ length: 7 }).map((_, index) => (
          <rect key={index} y={index * 5.54} width="60" height="2.77" fill="#B22234" />
        ))}
        <rect width="24" height="19.4" fill="#3C3B6E" />
        {Array.from({ length: 18 }).map((_, index) => (
          <circle
            key={index}
            cx={3.2 + (index % 6) * 3.6}
            cy={3 + Math.floor(index / 6) * 5.4}
            r="0.8"
            fill="#fff"
          />
        ))}
      </g>
    </svg>
  );
};

const ContactIcon = ({ icon }: { icon: string }) => {
  if (icon === "mail") return <Mail size={18} className="shrink-0 text-white/60" aria-hidden="true" />;
  if (icon === "company") return <Building2 size={18} className="shrink-0 text-white/60" aria-hidden="true" />;
  return <FlagIcon country={icon === "us" ? "us" : "uk"} />;
};

const PlatformLogo = ({ label }: { label: string }) => {
  if (label === "Google") {
    return (
      <svg viewBox="0 0 74 24" className="h-5 w-auto" aria-hidden="true">
        <text
          x="0"
          y="18"
          fill="currentColor"
          fontFamily="Arial, sans-serif"
          fontSize="20"
          fontWeight="700"
          letterSpacing="-1.2"
        >
          Google
        </text>
      </svg>
    );
  }

  if (label === "Trustpilot") {
    return (
      <svg viewBox="0 0 116 24" className="h-5 w-auto" aria-hidden="true">
        <path
          fill="currentColor"
          d="M12 1.8l2.8 6.6 7.1.6-5.4 4.7 1.6 7-6.1-3.7-6.1 3.7 1.6-7L2.1 9l7.1-.6L12 1.8z"
        />
        <text
          x="29"
          y="17"
          fill="currentColor"
          fontFamily="Arial, sans-serif"
          fontSize="15"
          fontWeight="700"
        >
          Trustpilot
        </text>
      </svg>
    );
  }

  if (label === "Clutch") {
    return (
      <svg viewBox="0 0 84 24" className="h-5 w-auto" aria-hidden="true">
        <path
          fill="currentColor"
          d="M12 3a9 9 0 1 0 7.7 13.7l-4.1-2.4A4.2 4.2 0 1 1 15.6 9l4.1-2.4A9 9 0 0 0 12 3z"
        />
        <circle cx="12" cy="12" r="3" fill="currentColor" />
        <text
          x="28"
          y="17"
          fill="currentColor"
          fontFamily="Arial, sans-serif"
          fontSize="16"
          fontWeight="700"
        >
          Clutch
        </text>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 62 24" className="h-5 w-auto" aria-hidden="true">
      <text
        x="0"
        y="18"
        fill="currentColor"
        fontFamily="Arial, sans-serif"
        fontSize="20"
        fontWeight="800"
      >
        bark
      </text>
    </svg>
  );
};

const SocialLogo = ({ label }: { label: string }) => {
  if (label === "WhatsApp") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path
          fill="currentColor"
          d="M12 2a9.7 9.7 0 0 0-8.3 14.7L2.5 22l5.4-1.2A9.7 9.7 0 1 0 12 2Zm0 2a7.7 7.7 0 0 1 0 15.4c-1.3 0-2.5-.3-3.6-.9l-.3-.2-2.9.7.7-2.8-.2-.3A7.7 7.7 0 0 1 12 4Zm-3.4 3.9c-.2 0-.5.1-.7.4-.3.3-.9.9-.9 2.2s.9 2.5 1 2.7c.1.2 1.8 2.8 4.4 3.8 2.1.8 2.6.6 3.1.6.5 0 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.2-.2-.5-.4l-1.7-.8c-.2-.1-.4-.1-.6.1-.2.3-.7.8-.8 1-.2.2-.3.2-.6.1-.3-.1-1.1-.4-2.1-1.3-.8-.7-1.3-1.6-1.5-1.9-.2-.3 0-.4.1-.5l.4-.5c.1-.2.2-.3.3-.5.1-.2.1-.4 0-.5L9.7 8.4c-.2-.4-.4-.5-.6-.5h-.5Z"
        />
      </svg>
    );
  }

  if (label === "Instagram") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
      </svg>
    );
  }

  if (label === "X") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path
          fill="currentColor"
          d="M14.2 10.5 22.2 1h-2.1l-6.8 8.1L7.8 1H1.4l8.4 12.2L1 23h2.1l7.6-8.5 6 8.5h6.4l-8.9-12.5Zm-2.7 3-1-1.4L3.9 2.6h2.9l5.4 7.7 1 1.4 7 9.8h-2.9l-5.8-8Z"
        />
      </svg>
    );
  }

  if (label === "LinkedIn") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path
          fill="currentColor"
          d="M5.4 8.8H1.9V22h3.5V8.8ZM3.7 2C2.5 2 1.6 2.9 1.6 4s.9 2 2.1 2 2.1-.9 2.1-2-.9-2-2.1-2Zm9.4 6.8H9.8V22h3.5v-6.9c0-1.8.8-3.1 2.4-3.1 1.4 0 2.1 1 2.1 3.1V22h3.5v-7.7c0-3.7-1.9-5.8-4.8-5.8-2 0-3 .9-3.5 1.8h.1V8.8Z"
        />
      </svg>
    );
  }

  if (label === "Behance") {
    return (
      <svg viewBox="0 0 32 20" className="h-5 w-8" aria-hidden="true">
        <path
          fill="currentColor"
          d="M0 1h9.3c3.5 0 5.6 1.7 5.6 4.6 0 1.9-.9 3.1-2.5 3.9 2.2.6 3.4 2.2 3.4 4.7 0 3.4-2.7 5.8-6.7 5.8H0V1Zm4.4 7.5h4.1c1.4 0 2.1-.7 2.1-1.9 0-1.3-.8-1.9-2.4-1.9H4.4v3.8Zm0 7.7h4.4c1.7 0 2.6-.8 2.6-2.3 0-1.4-.9-2.2-2.7-2.2H4.4v4.5ZM20 2.6h8.7v2H20v-2Zm12 10.8H21.7c.1 2.1 1.1 3.2 2.9 3.2 1.2 0 2.2-.6 2.6-1.5h4.5c-.9 3.1-3.3 4.9-7.1 4.9-4.5 0-7.4-3-7.4-7.4 0-4.3 3-7.5 7.3-7.5 4.8 0 7.5 3.7 7.5 8.3Zm-4.5-2.5c-.3-1.7-1.2-2.6-2.9-2.6-1.6 0-2.6 1-2.8 2.6h5.7Z"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        d="M5.8 16.6c3.8-3 7.9-4.4 12.3-4.2M7.5 5.9c4.5 3.1 7.1 7.7 7.9 13.6M3.4 11.2c6.2-.4 11.4 1.2 15.6 4.8"
      />
    </svg>
  );
};

const Footer = () => {
  const [email, setEmail] = useState("");

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full" style={{ background: "var(--black-2)" }}>
      {/* Universal brand marquee */}
      <motion.div
        className="overflow-hidden pt-8 pb-6 md:pt-10 md:pb-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="marquee-track">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-8 mx-8 flex-shrink-0">
              <span
                className="font-display text-white/70 font-bold whitespace-nowrap tracking-tight"
                style={{ fontSize: "clamp(4rem, 8vw, 8rem)" }}
              >
                BRANDESTINY
              </span>
              <img
                src={footerLogo}
                alt="Brandestiny mark"
                className="w-16 h-16 md:w-20 md:h-20 object-contain flex-shrink-0 opacity-80"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </motion.div>

      {/* Tag bar */}
      <div className="flex">
        <div className="px-6 py-3" style={{ width: "fit-content" }}>
          <img
            src={footerLogo}
            alt="Brandestiny"
            className="h-14 w-14 md:h-16 md:w-16 object-contain"
            loading="lazy"
          />
        </div>
      </div>

      {/* Main footer content */}
      <div className="px-6 md:px-10 pt-10 pb-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[0.85fr_0.85fr_1.15fr_0.95fr_1.45fr] lg:gap-8 mb-12">
          {/* Column 1: Navigation */}
          <div>
            <h4 className="text-white/40 text-xs font-grotesk uppercase tracking-wider mb-5">Menu</h4>
            <div className="flex flex-col gap-1.5">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-white text-sm transition-colors duration-300 hover:text-[#fde3c6] py-0.5 interactive"
                  onClick={(e) => {
                    if (link.href.startsWith("#")) {
                      e.preventDefault();
                      document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Social */}
          <div>
            <h4 className="text-white/40 text-xs font-grotesk uppercase tracking-wider mb-5">Social</h4>
            <div className="flex flex-col gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="flex w-fit items-center gap-3 text-white transition-colors duration-300 hover:text-[#fde3c6] interactive"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                >
                  <SocialLogo label={link.label} />
                  <span className="text-sm font-medium leading-none">
                    {link.displayName}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h4 className="text-white/40 text-xs font-grotesk uppercase tracking-wider mb-5">Contact</h4>
            <div className="flex flex-col gap-3">
              {contactLinks.map((item) => {
                const content = (
                  <>
                    <ContactIcon icon={item.icon} />
                    <span className="flex flex-col gap-0.5">
                      <span className="text-[11px] font-grotesk uppercase tracking-wider text-white/40">
                        {item.label}
                      </span>
                      <span className="text-sm font-medium leading-snug text-white">
                        {item.value}
                      </span>
                    </span>
                  </>
                );

                if (!item.href) {
                  return (
                    <div key={item.label} className="flex items-start gap-3">
                      {content}
                    </div>
                  );
                }

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex w-fit items-start gap-3 transition-colors duration-300 hover:text-[#fde3c6] interactive"
                    aria-label={`${item.label}: ${item.value}`}
                  >
                    {content}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 4: Platforms */}
          <div>
            <h4 className="text-white/40 text-xs font-grotesk uppercase tracking-wider mb-5">Our Platforms</h4>
            <div className="flex flex-col gap-3">
              {platformLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="w-fit text-white transition-colors duration-300 hover:text-[#fde3c6] interactive"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                >
                  <PlatformLogo label={link.label} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 5: Newsletter */}
          <div className="md:col-span-2 lg:col-span-1">
            <h4 className="text-white/40 text-xs font-grotesk uppercase tracking-wider mb-5">Newsletter</h4>
            <div className="p-5" style={{ background: "#fde3c6" }}>
              <p className="text-[#020202] text-sm mb-4 leading-relaxed">
                Subscribe to our newsletter for insights on branding, design trends, and creative strategies.
              </p>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="newsletter-input w-full pr-14"
                />
                <button
                  className="absolute right-0 top-0 bottom-0 px-4 flex items-center justify-center interactive hover:opacity-70 transition-opacity"
                  style={{ background: "rgba(255,255,255,0.1)" }}
                >
                  <ArrowUpRight size={18} className="text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom strip */}
        <div
          className="pt-5 flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
        >
          <button
            onClick={scrollToTop}
            className="text-white text-sm font-medium hover:opacity-50 transition-opacity interactive"
          >
            To top ↑
          </button>
          <span className="text-white/40 text-sm">Doncaster & Sherman Oaks</span>
          <span className="text-white text-sm font-medium">© 2026 Brandestiny</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
