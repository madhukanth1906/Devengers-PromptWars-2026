"use client";

import { motion } from "framer-motion";
import { ArrowRight, Bot, ShieldCheck, FileText, MapPin, Search, Sparkles } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";

const FEATURES = [
  {
    title: "AI Civic Assistant",
    description: "Chat with our intelligent Gemini-powered assistant in your native language for instant help.",
    icon: Bot,
    color: "from-blue-500 to-indigo-500",
  },
  {
    title: "Smart Scheme Finder",
    description: "Discover government schemes tailored specifically to your profile and eligibility.",
    icon: Search,
    color: "from-emerald-400 to-teal-500",
  },
  {
    title: "Issue Reporting",
    description: "Report public issues with photos and GPS. AI automatically summarizes your complaint.",
    icon: MapPin,
    color: "from-amber-400 to-orange-500",
  },
  {
    title: "Document Assistant",
    description: "Upload PDFs or images of documents. AI extracts details and suggests next steps.",
    icon: FileText,
    color: "from-purple-500 to-pink-500",
  },
];

const STATS = [
  { label: "Citizens Helped", value: "1M+" },
  { label: "Issues Resolved", value: "85K+" },
  { label: "Languages Supported", value: "10+" },
  { label: "Government Schemes", value: "500+" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[120px] mix-blend-multiply opacity-70 animate-blob"></div>
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] rounded-full bg-secondary/20 blur-[120px] mix-blend-multiply opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-[20%] left-[20%] w-[60%] h-[60%] rounded-full bg-accent/20 blur-[120px] mix-blend-multiply opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-primary/20 bg-primary/5 text-primary mb-8"
        >
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-semibold tracking-wide uppercase">The Future of Digital India</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl"
        >
          Your Intelligent <br className="hidden md:block" />
          <span className="gradient-text">Government Companion</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-foreground/70 max-w-2xl mb-10"
        >
          Smart Bharat leverages cutting-edge AI to help you discover schemes, access services, report issues, and interact with the government effortlessly.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 w-full justify-center"
        >
          <Link
            href="/assistant"
            className="px-8 py-4 rounded-full bg-primary text-white font-semibold text-lg hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 group"
          >
            Chat with AI Assistant
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/schemes"
            className="px-8 py-4 rounded-full glass text-foreground font-semibold text-lg hover:bg-white/80 dark:hover:bg-black/80 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
          >
            Find My Schemes
          </Link>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y border-border/50 bg-white/30 dark:bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-extrabold text-foreground mb-2">{stat.value}</div>
                <div className="text-sm text-foreground/60 font-medium uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Empowering Every Citizen</h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Experience government services reimagined with artificial intelligence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {FEATURES.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-8 group hover:-translate-y-2 transition-all duration-300"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
              <p className="text-foreground/70 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-premium rounded-3xl p-10 md:p-16 text-center relative overflow-hidden glass shadow-2xl border border-white/20"
        >
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
              Ready to experience modern governance?
            </h2>
            <p className="text-xl text-foreground/80 mb-10">
              Join thousands of citizens using Smart Bharat to navigate government services with ease.
            </p>
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-foreground text-background font-semibold text-lg hover:scale-105 transition-transform gap-2"
            >
              <ShieldCheck className="w-5 h-5" />
              Get Started Securely
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
