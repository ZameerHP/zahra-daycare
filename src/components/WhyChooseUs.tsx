import React from "react";
import { motion } from "framer-motion";
import { Shield, Users, Heart, Sparkles, Utensils, Bell } from "lucide-react";
import ShinyText from "./ShinyText";
import ElectricBorder from "./ElectricBorder";
import { Reveal } from "./Reveal";

export const WhyChooseUs = () => {
  const features = [
    {
      title: "Safe Environment",
      text: "A secure and nurturing space where children feel protected and happy.",
      icon: <Shield className="w-6 h-6 text-yellow-600" />,
      bgColor: "#FEFCE8", // bg-yellow-50
      borderColor: "border-yellow-100",
      electricColor: "#FACC15", // yellow-400
    },
    {
      title: "Qualified Staff",
      text: "Trained caregivers ensuring professional and loving care for every child.",
      icon: <Users className="w-6 h-6 text-purple-600" />,
      bgColor: "#FAF5FF", // bg-purple-50
      borderColor: "border-purple-100",
      electricColor: "#C084FC", // purple-400
    },
    {
      title: "Child-Focused Care",
      text: "We prioritize each child's emotional, social, and learning development.",
      icon: <Heart className="w-6 h-6 text-pink-600" />,
      bgColor: "#FDF2F8", // bg-pink-50
      borderColor: "border-pink-100",
      electricColor: "#F472B6", // pink-400
    },
    {
      title: "Fun Learning",
      text: "We combine play and education to help children grow creatively.",
      icon: <Sparkles className="w-6 h-6 text-blue-600" />,
      bgColor: "#EFF6FF", // bg-blue-50
      borderColor: "border-blue-100",
      electricColor: "#60A5FA", // blue-400
    },
    {
      title: "Nutritious Meals",
      text: "Healthy, balanced meals to keep your child energized and growing.",
      icon: <Utensils className="w-6 h-6 text-green-600" />,
      bgColor: "#F0FDF4", // bg-green-50
      borderColor: "border-green-100",
      electricColor: "#4ADE80", // green-400
    },
    {
      title: "Parent Updates",
      text: "Stay connected with daily reports and photos of activities.",
      icon: <Bell className="w-6 h-6 text-orange-600" />,
      bgColor: "#FFF7ED", // bg-orange-50
      borderColor: "border-orange-100",
      electricColor: "#FB923C", // orange-400
    }
  ];

  return (
    <section id="why-us" className="py-8 sm:py-10 bg-white relative overflow-hidden scroll-mt-24" style={{ contentVisibility: 'auto', containIntrinsicSize: '0 600px' }}>
      {/* Subtle Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-100 blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-pink-100 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <Reveal y={20} width="100%">
            <div className="inline-block px-4 py-2 mb-6 rounded-full bg-indigo-50 border border-indigo-100">
              <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">Why Choose Us</span>
            </div>
          </Reveal>
          
          <Reveal y={30} delay={0.3} width="100%">
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              <ShinyText text="A " speed={3} />
              <span className="text-indigo-600 italic font-serif">
                <ShinyText text="Perfect" speed={3} shineColor="rgba(79, 70, 229, 0.4)" />
              </span>
              <ShinyText text=" Place for Your Child's Growth" speed={3} />
            </h2>
          </Reveal>
          
          <Reveal y={20} delay={0.5} width="100%">
            <p className="text-base sm:text-lg lg:text-xl text-slate-700 leading-relaxed font-medium">
              <ShinyText text="We provide a nurturing environment where every child is treated with love, respect, and professional care." speed={4} />
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <Reveal key={index} y={40} delay={0.4 + index * 0.1} width="100%">
              <motion.div
                whileHover={{ y: -10 }}
                className="h-full will-change-transform"
                style={{ translateZ: 0 }}
              >
                <ElectricBorder
                  color={feature.electricColor}
                  speed={1}
                  chaos={0.12}
                  thickness={2}
                  borderRadius={32}
                  className="h-full"
                >
                  <div 
                    className={`p-6 sm:p-8 h-full flex flex-col border ${feature.borderColor} transition-all duration-300 group shadow-sm hover:shadow-xl`}
                    style={{ backgroundColor: feature.bgColor, borderRadius: '31px' }}
                  >
                    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-md mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300" aria-hidden="true">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2 font-serif">
                      <ShinyText text={feature.title} speed={3} />
                    </h3>
                    <p className="text-slate-700 leading-relaxed text-xs sm:text-sm flex-grow font-medium">
                      <ShinyText text={feature.text} speed={4} />
                    </p>
                    <div className="mt-4 pt-4 border-t border-black/5">
                      <div className="h-1 w-12 bg-indigo-200 rounded-full group-hover:w-full group-hover:bg-indigo-600 transition-all duration-500" />
                    </div>
                  </div>
                </ElectricBorder>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};




