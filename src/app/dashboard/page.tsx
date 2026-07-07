"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { UserCircle, FileText, AlertTriangle, BookOpen, Clock, Settings, LogOut, Search } from "lucide-react";
import Link from "next/link";

const RECENT_ACTIVITY = [
  { id: 1, type: "complaint", title: "Pothole on Main Street", status: "In Progress", date: "2 days ago", icon: AlertTriangle, color: "text-amber-500", bg: "bg-amber-500/10" },
  { id: 2, type: "scheme", title: "PM Kisan Samman Nidhi", status: "Approved", date: "1 week ago", icon: BookOpen, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { id: 3, type: "document", title: "Aadhaar Card Updated", status: "Completed", date: "2 weeks ago", icon: FileText, color: "text-blue-500", bg: "bg-blue-500/10" },
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid md:grid-cols-4 gap-8">
          
          {/* Sidebar / Profile Section */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="md:col-span-1"
          >
            <div className="glass-card rounded-3xl p-6 text-center border border-border shadow-lg sticky top-32">
              <div className="w-24 h-24 bg-gradient-premium rounded-full mx-auto mb-4 p-1">
                <div className="w-full h-full bg-background rounded-full flex items-center justify-center">
                  <UserCircle className="w-16 h-16 text-foreground/50" />
                </div>
              </div>
              <h2 className="text-xl font-bold mb-1">Ramesh Kumar</h2>
              <p className="text-sm text-foreground/60 mb-6">Citizen ID: 4590-XXXX-XXXX</p>
              
              <div className="space-y-2">
                <button className="w-full py-3 px-4 rounded-xl flex items-center gap-3 hover:bg-foreground/5 text-left transition-colors text-sm font-medium">
                  <UserCircle className="w-5 h-5 text-primary" /> Profile Details
                </button>
                <button className="w-full py-3 px-4 rounded-xl flex items-center gap-3 hover:bg-foreground/5 text-left transition-colors text-sm font-medium">
                  <Settings className="w-5 h-5 text-foreground/70" /> Settings
                </button>
                <button className="w-full py-3 px-4 rounded-xl flex items-center gap-3 hover:bg-destructive/10 text-destructive text-left transition-colors text-sm font-medium">
                  <LogOut className="w-5 h-5" /> Logout
                </button>
              </div>
            </div>
          </motion.div>

          {/* Main Content Area */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:col-span-3 space-y-8"
          >
            <h1 className="text-3xl font-extrabold">Welcome back, Ramesh</h1>

            {/* Quick Stats */}
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { label: "Active Complaints", value: "1", color: "text-amber-500", border: "border-amber-500/20" },
                { label: "Saved Schemes", value: "4", color: "text-emerald-500", border: "border-emerald-500/20" },
                { label: "Verified Documents", value: "3", color: "text-blue-500", border: "border-blue-500/20" },
              ].map((stat, i) => (
                <div key={i} className={`glass-card p-6 rounded-2xl border ${stat.border}`}>
                  <div className={`text-3xl font-bold mb-1 ${stat.color}`}>{stat.value}</div>
                  <div className="text-sm text-foreground/70 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="glass-card rounded-3xl p-6 md:p-8 border border-border shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" /> Recent Activity
                </h2>
                <button className="text-sm text-primary font-medium hover:underline">View All</button>
              </div>

              <div className="space-y-4">
                {RECENT_ACTIVITY.map((activity, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-foreground/5 transition-colors cursor-pointer group border border-transparent hover:border-border/50">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${activity.bg}`}>
                      <activity.icon className={`w-6 h-6 ${activity.color}`} />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{activity.title}</h3>
                      <p className="text-sm text-foreground/50">{activity.date}</p>
                    </div>
                    <div className="text-right">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-foreground/5 text-foreground/70">
                        {activity.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid sm:grid-cols-2 gap-6">
              <Link href="/schemes" className="glass p-6 rounded-2xl border border-primary/20 hover:-translate-y-1 transition-transform group flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors text-primary">
                  <Search className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Find New Schemes</h3>
                  <p className="text-sm text-foreground/60">Check your eligibility for new gov programs.</p>
                </div>
              </Link>
              <Link href="/complaints" className="glass p-6 rounded-2xl border border-amber-500/20 hover:-translate-y-1 transition-transform group flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-white transition-colors text-amber-500">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Report an Issue</h3>
                  <p className="text-sm text-foreground/60">File a new public complaint quickly.</p>
                </div>
              </Link>
            </div>

          </motion.div>
        </div>
      </div>
    </main>
  );
}
