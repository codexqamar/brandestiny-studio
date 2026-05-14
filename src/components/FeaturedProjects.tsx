import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const caseStudyAssets = import.meta.glob(
  "/src/case studies/**/*.{jpg,jpeg,png,mp4}",
  {
    eager: true,
    query: "?url",
    import: "default",
  },
) as Record<string, string>;

const projectMetadata: Record<string, { name: string; tags: string[] }> = {
  "CRM ERP": {
    name: "CRM ERP",
    tags: ["ERP", "CRM", "Dashboard", "Workflow Systems"],
  },
  "Devops Portfolio": {
    name: "DEVOPS",
    tags: ["DevOps", "Infrastructure", "Automation", "Cloud"],
  },
  "Logo Designs Portfolio": {
    name: "LOGO DESIGN",
    tags: ["Brand Identity", "Logo Systems", "Visual Design"],
  },
  "Mobile App Portfolio": {
    name: "MOBILE APP",
    tags: ["Mobile App", "UX/UI Design", "Product Design"],
  },
  "Product Design Portfolio": {
    name: "PRODUCT DESIGN",
    tags: ["Product Design", "3D Visuals", "Launch Assets"],
  },
  "Social Media Management Portfolio": {
    name: "SOCIAL MEDIA",
    tags: ["Social Media", "Campaigns", "Content Systems"],
  },
  "Web App Section": {
    name: "WEB APP",
    tags: ["Web App", "SaaS", "Interface Design", "Development"],
  },
  "Website Portfolio": {
    name: "WEBSITE",
    tags: ["Website Design", "Development", "Motion"],
  },
};

const projectOrder = Object.keys(projectMetadata);

const projects = Object.entries(caseStudyAssets).reduce<
  Array<{
    id: string;
    name: string;
    year: string;
    tags: string[];
    video?: string;
    image?: string;
  }>
>((acc, [path, url]) => {
  const folder = path.split("/case studies/")[1]?.split("/")[0];
  if (!folder || folder === "Somewhere in About US Page") return acc;

  const existing = acc.find((project) => project.id === folder);
  const project =
    existing ||
    ({
      id: folder,
      name: projectMetadata[folder]?.name || folder.toUpperCase(),
      year: "2026",
      tags: projectMetadata[folder]?.tags || ["Case Study", "Digital Product"],
    } as {
      id: string;
      name: string;
      year: string;
      tags: string[];
      video?: string;
      image?: string;
    });

  if (path.toLowerCase().endsWith(".mp4") && !project.video) {
    project.video = url;
  }

  if (!path.toLowerCase().endsWith(".mp4") && !project.image) {
    project.image = url;
  }

  if (!existing) acc.push(project);

  return acc;
}, []).sort((a, b) => projectOrder.indexOf(a.id) - projectOrder.indexOf(b.id));

const FeaturedProjects = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !rightColumnRef.current) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      ScrollTrigger.create({
        trigger: rightColumnRef.current,
        start: "top top",
        endTrigger: containerRef.current,
        end: "bottom bottom",
        pin: true,
      });
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="projects" className="w-full py-20 bg-black">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 flex flex-col md:flex-row gap-16 md:gap-24 items-start">
        {/* Left: Project Cards Grid (Scrollable) */}
        <div className="md:w-3/5 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-20">
          {projects.map((project) => (
            <div key={project.id} className="group flex flex-col cursor-pointer">
              {/* Card Header */}
              <div className="flex justify-between items-baseline mb-4">
                <span className="text-white text-[12px] font-bold tracking-[0.15em] uppercase">
                  {project.name}
                </span>
                <span className="text-white/40 text-[12px] font-medium tracking-widest">
                  {project.year}
                </span>
              </div>

              {/* Project Media Container */}
              <div className="relative aspect-square bg-[#0c0c0c] overflow-hidden mb-6 rounded-sm">
                {project.video ? (
                  <video
                    src={project.video}
                    poster={project.image}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-[1.05] transition-all duration-1000 ease-out"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                ) : (
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-[1.05] transition-all duration-1000 ease-out"
                    loading="lazy"
                  />
                )}
                <Link to="/case-studies" className="absolute inset-0 z-10" />
              </div>

              {/* Tags / Categories List */}
              <div className="flex flex-col gap-1">
                {project.tags.map((tag, index) => (
                  <span key={index} className="text-white/40 text-[12px] font-medium tracking-wide leading-relaxed">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Right: Featured Projects Heading + CTA (Pinned) */}
        <div ref={rightColumnRef} className="md:w-2/5 flex flex-col">
          <div className="flex flex-col gap-12">
            {/* Heading Area */}
            <div className="flex justify-between items-start">
              <h2 className="font-display text-white text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tight">
                Featured <br /> Projects
              </h2>
              <span className="font-display text-white/20 text-6xl md:text-7xl lg:text-8xl font-bold leading-none">
                {projects.length}
              </span>
            </div>

            {/* Custom Styled View All Link */}
            <Link
              to="/case-studies"
              className="group relative flex items-center justify-between border border-white/20 rounded-full px-8 py-5 hover:bg-white hover:text-black transition-all duration-500 overflow-hidden"
            >
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase z-10">
                View All
              </span>
              <span className="text-[12px] font-medium opacity-60 z-10 group-hover:opacity-100 transition-opacity">
                {projects.length}
              </span>
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
