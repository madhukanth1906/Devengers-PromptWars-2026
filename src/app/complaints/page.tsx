"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Camera, MapPin, UploadCloud, AlertCircle, CheckCircle } from "lucide-react";

export default function ComplaintsPage() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate AI Summarization and Submission
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(3);
    }, 2500);
  };

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full flex-grow flex flex-col">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold mb-4">Report a Public Issue</h1>
          <p className="text-foreground/70">Help us make your city better. Report issues like potholes, garbage, or broken streetlights directly to the concerned authorities.</p>
        </div>

        <div className="glass-card flex-grow rounded-3xl p-6 md:p-10 shadow-xl border border-border">
          {/* Progress Indicator */}
          <div className="flex items-center justify-between mb-8 relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-border/50 -z-10 rounded-full"></div>
            <div className={`absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary rounded-full transition-all duration-500 -z-10`} style={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }}></div>
            
            {[1, 2, 3].map((s) => (
              <div key={s} className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-4 border-background transition-colors duration-300 ${step >= s ? 'bg-primary text-white' : 'bg-border text-foreground/50'}`}>
                {s === 3 && step === 3 ? <CheckCircle className="w-5 h-5" /> : s}
              </div>
            ))}
          </div>

          {step === 1 && (
            <motion.form 
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              onSubmit={() => setStep(2)} className="space-y-6"
            >
              <div>
                <label htmlFor="issue-category" className="block text-sm font-medium mb-2">Category</label>
                <select id="issue-category" required className="w-full p-4 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/50 outline-none">
                  <option value="">Select an issue category</option>
                  <option value="road">Road & Potholes</option>
                  <option value="garbage">Garbage & Sanitation</option>
                  <option value="water">Water Supply</option>
                  <option value="electricity">Electricity & Street Lights</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Upload Photo</label>
                <div className="border-2 border-dashed border-border/80 rounded-2xl p-8 text-center hover:bg-foreground/5 transition-colors cursor-pointer group">
                  <Camera className="w-10 h-10 mx-auto text-foreground/40 group-hover:text-primary mb-3 transition-colors" />
                  <p className="text-foreground/70 font-medium">Click to capture or drag & drop</p>
                  <p className="text-xs text-foreground/50 mt-1">PNG, JPG up to 5MB</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Location</label>
                <button type="button" className="w-full p-4 rounded-xl border border-border bg-background flex items-center justify-center gap-2 hover:bg-foreground/5 transition-colors text-foreground/80">
                  <MapPin className="w-5 h-5 text-red-500" />
                  Use Current GPS Location
                </button>
              </div>

              <div className="pt-4 flex justify-end">
                <button type="button" onClick={() => setStep(2)} className="px-8 py-3 bg-primary text-white font-medium rounded-xl hover:bg-primary/90 transition-colors shadow-md">
                  Continue
                </button>
              </div>
            </motion.form>
          )}

          {step === 2 && (
            <motion.form 
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
              onSubmit={handleSubmit} className="space-y-6"
            >
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex gap-3 text-amber-700 dark:text-amber-400">
                <AlertCircle className="w-6 h-6 flex-shrink-0" />
                <p className="text-sm">Our AI can automatically generate a detailed title and description based on your photo. Please provide any additional details below.</p>
              </div>

              <div>
                <label htmlFor="issue-details" className="block text-sm font-medium mb-2">Additional Details (Optional)</label>
                <textarea 
                  id="issue-details"
                  rows={5}
                  placeholder="E.g., This pothole has been here for 2 weeks..."
                  className="w-full p-4 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/50 outline-none resize-none"
                ></textarea>
              </div>

              <div className="pt-4 flex justify-between">
                <button type="button" onClick={() => setStep(1)} className="px-8 py-3 bg-foreground/10 text-foreground font-medium rounded-xl hover:bg-foreground/20 transition-colors">
                  Back
                </button>
                <button type="submit" disabled={isSubmitting} className="px-8 py-3 bg-primary text-white font-medium rounded-xl hover:bg-primary/90 transition-colors shadow-md flex items-center gap-2 disabled:opacity-70">
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Processing with AI...
                    </>
                  ) : (
                    <>
                      <UploadCloud className="w-5 h-5" />
                      Submit Complaint
                    </>
                  )}
                </button>
              </div>
            </motion.form>
          )}

          {step === 3 && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-emerald-500" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Complaint Registered Successfully!</h2>
              <p className="text-foreground/70 mb-8 max-w-md mx-auto">
                Your issue has been forwarded to the local municipal corporation. You can track the status in your dashboard.
              </p>
              
              <div className="bg-background rounded-2xl border border-border p-6 max-w-sm mx-auto mb-8 text-left">
                <div className="text-sm text-foreground/50 mb-1">Complaint ID</div>
                <div className="text-xl font-mono font-bold tracking-wider mb-4">SB-2026-894A</div>
                <div className="text-sm text-foreground/50 mb-1">AI Generated Title</div>
                <div className="font-medium text-foreground">Severe road damage and water logging on Main Street</div>
              </div>

              <button onClick={() => window.location.href = "/dashboard"} className="px-8 py-3 bg-foreground text-background font-medium rounded-xl hover:bg-foreground/90 transition-colors shadow-md">
                Go to Dashboard
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </main>
  );
}
