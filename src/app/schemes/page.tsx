"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Search, Filter, ChevronRight, CheckCircle2 } from "lucide-react";

const DUMMY_SCHEMES = [
  {
    id: 1,
    name: "PM Kisan Samman Nidhi",
    category: "Agriculture",
    description: "Income support of ₹6,000 per year to all landholding farmer families.",
    tags: ["Farmers", "Income Support", "Direct Benefit"],
  },
  {
    id: 2,
    name: "Ayushman Bharat",
    category: "Health",
    description: "Health insurance cover of up to ₹5 lakh per family per year for secondary and tertiary care.",
    tags: ["Healthcare", "Insurance", "BPL"],
  },
  {
    id: 3,
    name: "Sukanya Samriddhi Yojana",
    category: "Women",
    description: "A small deposit scheme for the girl child to meet education and marriage expenses.",
    tags: ["Girl Child", "Savings", "Education"],
  },
  {
    id: 4,
    name: "Stand-Up India",
    category: "Business",
    description: "Bank loans between 10 lakh and 1 Crore to at least one SC/ST borrower and one woman borrower.",
    tags: ["Enterprise", "Women", "SC/ST"],
  },
];

export default function SchemesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSchemes = DUMMY_SCHEMES.filter(scheme => 
    scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    scheme.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 w-full h-[400px] bg-gradient-to-b from-primary/10 to-transparent -z-10"></div>
      
      <Navbar />

      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            Discover Government Schemes
          </h1>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Find the right schemes and benefits tailored for you using our AI-powered Smart Scheme Finder.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="glass-card p-4 rounded-2xl flex flex-col md:flex-row gap-4 mb-12 shadow-lg max-w-4xl mx-auto border-white/40">
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/50" />
            <input 
              type="text"
              placeholder="Search for schemes, categories, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-border/50 bg-white/50 dark:bg-black/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>
          <button className="px-6 py-3 rounded-xl bg-white/50 dark:bg-black/50 border border-border/50 hover:bg-white dark:hover:bg-black transition-colors flex items-center justify-center gap-2 font-medium">
            <Filter className="w-5 h-5" />
            Filters
          </button>
          <button className="px-8 py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 transition-colors shadow-md">
            Find For Me (AI)
          </button>
        </div>

        {/* Schemes Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchemes.map((scheme, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              key={scheme.id}
              className="glass p-6 rounded-2xl group hover:-translate-y-1 transition-all duration-300 border border-border flex flex-col h-full"
            >
              <div className="mb-4">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-secondary/10 text-secondary mb-3">
                  {scheme.category}
                </span>
                <h3 className="text-xl font-bold mb-2 line-clamp-2">{scheme.name}</h3>
                <p className="text-foreground/70 text-sm line-clamp-3">{scheme.description}</p>
              </div>
              
              <div className="mt-auto">
                <div className="flex flex-wrap gap-2 mb-6">
                  {scheme.tags.map(tag => (
                    <span key={tag} className="flex items-center gap-1 text-xs text-foreground/60 bg-foreground/5 px-2 py-1 rounded-md">
                      <CheckCircle2 className="w-3 h-3 text-primary" />
                      {tag}
                    </span>
                  ))}
                </div>
                
                <button className="w-full py-2.5 rounded-xl border border-primary/20 bg-primary/5 text-primary font-medium group-hover:bg-primary group-hover:text-white transition-colors flex items-center justify-center gap-2">
                  Check Eligibility
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
