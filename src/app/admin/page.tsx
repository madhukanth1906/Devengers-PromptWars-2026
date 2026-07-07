"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Users, AlertTriangle, CheckCircle, Activity, BarChart3, Database } from "lucide-react";

const COMPLAINTS = [
  { id: "SB-894A", issue: "Road Potholes", location: "Main St, Sector 4", status: "Pending", priority: "High" },
  { id: "SB-895B", issue: "Water Logging", location: "Ring Road", status: "In Progress", priority: "Medium" },
  { id: "SB-896C", issue: "Street Light Broken", location: "Avenue 1", status: "Resolved", priority: "Low" },
  { id: "SB-897D", issue: "Garbage Dump", location: "Market Area", status: "Pending", priority: "High" },
];

export default function AdminDashboardPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-extrabold mb-2">Government Admin Portal</h1>
            <p className="text-foreground/60">Overview of civic issues, user engagement, and AI assistance metrics.</p>
          </div>
          <button className="px-5 py-2.5 bg-foreground text-background rounded-xl font-medium text-sm shadow-md hover:bg-foreground/90 transition-colors flex items-center gap-2">
            <Database className="w-4 h-4" /> Export Report
          </button>
        </div>

        {/* Top KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: "Total Users", value: "12,450", icon: Users, color: "text-blue-500" },
            { label: "Pending Issues", value: "342", icon: AlertTriangle, color: "text-amber-500" },
            { label: "Resolved Today", value: "89", icon: CheckCircle, color: "text-emerald-500" },
            { label: "AI Queries Handled", value: "45K+", icon: Activity, color: "text-purple-500" },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6 rounded-2xl border border-border"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl bg-foreground/5 ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <BarChart3 className="w-5 h-5 text-foreground/30" />
              </div>
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm font-medium text-foreground/60">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Complaints Table */}
        <div className="glass-card rounded-3xl border border-border shadow-lg overflow-hidden">
          <div className="p-6 border-b border-border/50 flex justify-between items-center bg-white/50 dark:bg-black/50">
            <h2 className="text-xl font-bold">Recent Public Issues</h2>
            <select className="px-3 py-1.5 rounded-lg border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-primary/50">
              <option>All Locations</option>
              <option>Sector 4</option>
              <option>Market Area</option>
            </select>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-foreground/5 text-sm uppercase tracking-wider text-foreground/60">
                  <th className="p-4 font-medium">ID</th>
                  <th className="p-4 font-medium">Issue Description</th>
                  <th className="p-4 font-medium">Location</th>
                  <th className="p-4 font-medium">Priority</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50 text-sm">
                {COMPLAINTS.map((complaint) => (
                  <tr key={complaint.id} className="hover:bg-foreground/5 transition-colors">
                    <td className="p-4 font-mono font-medium">{complaint.id}</td>
                    <td className="p-4 font-medium">{complaint.issue}</td>
                    <td className="p-4 text-foreground/70">{complaint.location}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        complaint.priority === 'High' ? 'bg-red-500/10 text-red-500' :
                        complaint.priority === 'Medium' ? 'bg-amber-500/10 text-amber-500' :
                        'bg-emerald-500/10 text-emerald-500'
                      }`}>
                        {complaint.priority}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        complaint.status === 'Pending' ? 'bg-amber-500/10 text-amber-500' :
                        complaint.status === 'In Progress' ? 'bg-blue-500/10 text-blue-500' :
                        'bg-emerald-500/10 text-emerald-500'
                      }`}>
                        {complaint.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <button className="text-primary font-medium hover:underline">Review</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
