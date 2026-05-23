"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Github, X, ChevronLeft, ChevronRight } from "lucide-react";
import { projects } from "@/data/portfolio";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [selected, setSelected] = useState<typeof projects[0] | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
    scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const { scrollLeft, scrollWidth, clientWidth } = container;

    // Boundary check for start
    if (scrollLeft <= 5) {
      setActiveSlide(0);
      return;
    }

    // Boundary check for end
    if (scrollLeft + clientWidth >= scrollWidth - 5) {
      setActiveSlide(projects.length - 1);
      return;
    }

    // Find the item closest to the viewport center of the scroll container
    const containerRect = container.getBoundingClientRect();
    const containerCenter = containerRect.left + clientWidth / 2;

    const children = Array.from(container.children) as HTMLElement[];
    if (children.length === 0) return;

    let closestIndex = 0;
    let minDistance = Infinity;

    children.forEach((child, index) => {
      const childRect = child.getBoundingClientRect();
      const childCenter = childRect.left + childRect.width / 2;
      const distance = Math.abs(containerCenter - childCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    setActiveSlide(closestIndex);
  };

  return (
    <section id="projects" ref={ref} className="relative py-32 overflow-hidden">
      <div className="px-6 max-w-7xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center"
        >
          <span className="font-mono text-neon-cyan text-sm tracking-widest uppercase">Portfolio</span>
          <h2 className="font-display text-4xl sm:text-6xl font-bold mt-4 neon-text">Featured Work</h2>
        </motion.div>
      </div>

      <div className="relative group/slider px-6 max-w-7xl mx-auto">
        {/* Navigation Buttons */}
        <button
          onClick={() => scroll("left")}
          className="slider-nav-btn absolute left-0 top-1/2 -translate-y-1/2 z-20 hidden md:flex opacity-90 hover:opacity-100"
          data-cursor="button"
          aria-label="Previous project"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={() => scroll("right")}
          className="slider-nav-btn absolute right-0 top-1/2 -translate-y-1/2 z-20 hidden md:flex opacity-90 hover:opacity-100"
          data-cursor="button"
          aria-label="Next project"
        >
          <ChevronRight size={24} />
        </button>

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-6 overflow-x-auto hide-scrollbar pb-12 snap-x snap-mandatory"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {projects.map((project, i) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, x: 100 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.8 }}
              className="flex-shrink-0 w-[85vw] sm:w-[450px] lg:w-[500px] snap-center group"
              data-cursor="card"
              onClick={() => setSelected(project)}
            >
              <motion.div
                className="glass-panel rounded-3xl overflow-hidden border border-white/5 hover:border-neon-cyan/30 transition-all duration-500 cursor-pointer h-full"
                whileHover={{ scale: 1.02, y: -8 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="relative h-64 overflow-hidden" data-cursor="image">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 85vw, 500px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-void via-void/40 to-transparent" />
                  {project.featured && (
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-mono bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/30">
                      Featured
                    </span>
                  )}
                </div>
                <div className="p-8">
                  <h3 className="font-display text-2xl font-bold text-text-primary mb-3">{project.title}</h3>
                  <p className="text-text-muted text-sm leading-relaxed mb-6 line-clamp-3">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-white/5 text-neon-cyan/80 border border-neon-cyan/10 uppercase tracking-wider">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="project-action-btn project-action-btn--live"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" data-cursor="link">
                        <ExternalLink size={14} /> Live
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="project-action-btn project-action-btn--code"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" data-cursor="link">
                        <Github size={14} /> Code
                      </a>
                    </Button>
                  </div>
                </div>
              </motion.div>
            </motion.article>
          ))}
        </div>

        {/* Progress Indicators */}
        <div className="flex justify-center gap-2 mt-4">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                if (scrollRef.current) {
                  const container = scrollRef.current;
                  const targetChild = container.children[i] as HTMLElement;
                  if (targetChild) {
                    const targetLeft = targetChild.offsetLeft - container.offsetLeft - (container.clientWidth / 2) + (targetChild.clientWidth / 2);
                    container.scrollTo({ left: targetLeft, behavior: "smooth" });
                  }
                }
              }}
              className={cn("slider-dot", i === activeSlide && "slider-dot-active")}
              aria-label={`Go to project ${i + 1}`}
              data-cursor="button"
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-[600] flex items-center justify-center p-6 bg-black/80 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="glass-panel rounded-3xl max-w-2xl w-full overflow-hidden border border-neon-cyan/20"
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              data-cursor="card"
            >
              <motion.div className="relative h-64">
                <Image src={selected.image} alt={selected.title} fill className="object-cover" />
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 p-2 rounded-full glass-panel text-text-secondary hover:text-text-primary"
                  data-cursor="button"
                >
                  <X size={20} />
                </button>
              </motion.div>
              <div className="p-8">
                <h3 className="font-display text-3xl font-bold mb-3">{selected.title}</h3>
                <p className="text-text-secondary leading-relaxed mb-6">{selected.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {selected.tech.map((t) => (
                    <span key={t} className="px-3 py-1 rounded-full text-sm bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <Button variant="neon" asChild>
                    <a href={selected.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink size={16} /> View Live
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href={selected.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github size={16} /> Source Code
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
