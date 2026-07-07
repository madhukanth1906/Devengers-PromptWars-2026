"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Building2, HeartPulse, GraduationCap, Car, Landmark, Briefcase, ChevronRight } from "lucide-react";

const SERVICES = [
  { name: "Health & Wellness", icon: HeartPulse, color: "text-rose-500", bg: "bg-rose-500/10", count: 24 },
  { name: "Education & Skills", icon: GraduationCap, color: "text-blue-500", bg: "bg-blue-500/10", count: 18 },
  { name: "Transport & Driving", icon: Car, color: "text-amber-500", bg: "bg-amber-500/10", count: 12 },
  { name: "Taxes & Finance", icon: Landmark, color: "text-emerald-500", bg: "bg-emerald-500/10", count: 35 },
  { name: "Business & Startup", icon: Building2, color: "text-purple-500", bg: "bg-purple-500/10", count: 42 },
  { name: "Jobs & Employment", icon: Briefcase, color: "text-indigo-500", bg: "bg-indigo-500/10", count: 15 },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-primary/10 to-transparent rounded-full blur-3xl -z-10"></div>
      
      <Navbar />

      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            Government Services Directory
          </h1>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Access hundreds of government services categorized for your convenience. From applying for a PAN card to renewing your driving license.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              key={service.name}
              className="glass-card p-6 group hover:-translate-y-2 transition-all duration-300 cursor-pointer border border-border"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${service.bg} group-hover:scale-110 transition-transform`}>
                  <service.icon className={`w-7 h-7 ${service.color}`} />
                </div>
                <span className="text-sm font-medium text-foreground/50 bg-foreground/5 px-3 py-1 rounded-full">
                  {service.count} Services
                </span>
              </div>
              
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{service.name}</h3>
              
              <div className="flex items-center text-sm font-medium text-primary mt-4 opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0 duration-300">
                Explore Category <ChevronRight className="w-4 h-4 ml-1" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Popular Services Highlight */}
        <div className="mt-24">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
            <span className="w-2 h-8 bg-primary rounded-full"></span>
            Most Requested Services
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {["Apply for PAN Card", "Aadhaar Update", "Income Certificate", "Driving License Renewal"].map((item, i) => (
              <div key={i} className="p-4 rounded-xl border border-border bg-white/50 dark:bg-black/50 hover:bg-white dark:hover:bg-black transition-colors flex items-center justify-between group cursor-pointer shadow-sm">
                <span className="font-medium text-foreground/80 group-hover:text-foreground">{item}</span>
                <ChevronRight className="w-4 h-4 text-foreground/30 group-hover:text-primary" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
