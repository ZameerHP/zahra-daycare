import React from "react";
import { motion } from "motion/react";
import { Reveal } from "./Reveal";

import ShinyText from "./ShinyText";

export const Philosophy = () => {
  const pillars = [
    {
      title: "Gentle Guidance",
      text: "We believe in leading with kindness, allowing children to discover their own strengths.",
    },
    {
      title: "Nature & Play",
      text: "Our curriculum is rooted in the simple joys of the natural world and imaginative play.",
    },
    {
      title: "Small Circles",
      text: "Intimate group sizes ensure every child receives the individual attention they deserve.",
    },
    {
      title: "Holistic Growth",
      text: "Nurturing the mind, heart, and spirit through balanced and thoughtful care.",
    }
  ];

  return (
    <section id="philosophy" className="py-12 lg:py-16 bg-paper border-y border-ink/5 overflow-hidden" style={{ contentVisibility: 'auto', containIntrinsicSize: '0 400px' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <Reveal y={20} width="100%">
            <motion.span 
              className="text-accent font-serif italic text-lg tracking-wide block mb-4 will-change-transform"
              style={{ translateZ: 0 }}
            >
              <ShinyText text="Our Philosophy" speed={3} />
            </motion.span>
          </Reveal>
          <Reveal y={30} delay={0.3} width="100%">
            <h2 className="text-4xl md:text-6xl font-serif font-medium text-ink">
              <ShinyText text="The Pillars of " speed={3} />
              <span className="italic">
                <ShinyText text="Zahra" speed={3} />
              </span>
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-ink/5 border border-ink/5">
          {pillars.map((pillar, index) => (
            <Reveal key={index} y={50} delay={0.4 + index * 0.1} width="100%">
              <motion.div
                whileHover={{ backgroundColor: "rgba(79, 70, 233, 0.05)", y: -5 }}
                className="bg-paper p-10 h-full flex flex-col gap-6 group transition-all duration-500 will-change-transform"
                style={{ translateZ: 0 }}
              >
                <span className="text-ink/20 font-serif italic text-4xl group-hover:text-accent/40 transition-colors">
                  0{index + 1}
                </span>
                <div className="flex flex-col gap-3">
                  <h3 className="text-2xl font-serif font-medium text-ink">
                    <ShinyText text={pillar.title} speed={3} />
                  </h3>
                  <p className="text-ink/70 font-serif italic text-base leading-relaxed">
                    <ShinyText text={pillar.text} speed={4} />
                  </p>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

