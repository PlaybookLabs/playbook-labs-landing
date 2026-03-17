"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SamplePodcastPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 pt-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/"
              className="flex items-center -ml-11.5 md:ml-0 cursor-pointer"
            >
              <img
                src="/images/playbook-labs-logo-black.png"
                alt="Playbook Labs"
                className="w-auto h-36"
              />
            </Link>
            <Button
              asChild
              className="bg-slate-900 hover:bg-gradient-to-r hover:from-blue-700 hover:to-purple-700 text-white font-semibold cursor-pointer"
            >
              <a href="https://case.playbooklabs.co">Submit Your Problem</a>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="font-playfair text-4xl md:text-5xl tracking-[-0.02em] leading-[1.2] font-extrabold text-slate-900 mb-8 text-center">
              Sample Podcast
            </h1>
            <p className="text-lg text-slate-600 md:text-left">
              Each playbook includes a personalized strategy document and a
              custom podcast. Below is the episode from a playbook delivered to
              a client who discovered her husband had been secretly attending AA
              since before they met. We analyzed her situation, researched real
              cases, and identified the right frameworks. She walked away with a
              plan and a concrete way to decide what to do next, on her own
              terms and with a clear timeline.
            </p>
          </div>

          {/* Podcast Section */}
          <div className="mb-6">
            <div className="bg-white rounded-2xl shadow-sm p-8 border border-slate-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shrink-0">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl tracking-[-0.02em] leading-[1.2] font-bold text-slate-900">
                    Playbook: Navigating a Hidden AA History
                  </h2>
                  <p className="text-sm text-slate-600">Full Episode</p>
                </div>
              </div>

              {/* Context Pills */}
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="text-xs font-medium text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
                  Intelligence Analysis
                </span>
                <span className="text-xs font-medium text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
                  Medical Ethics
                </span>
                <span className="text-xs font-medium text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
                  Addiction Science
                </span>
                <span className="text-xs font-medium text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
                  Trust & Betrayal Research
                </span>
              </div>

              {/* Audio Player */}
              <audio controls className="w-full">
                <source src="/podcast_full.mp3" type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>

              {/* Episode Note */}
              <p className="text-xs text-slate-400 mt-4 text-center">
                Names and identifying details have been anonymized.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="font-playfair text-4xl lg:text-6xl leading-[1.2] text-white font-extrabold mb-4 text-balance md:text-6xl tracking-[-0.03em]">
            Get Your Own
          </h2>
          <p className="text-xl text-white/90 mb-12 font-normal leading-relaxed tracking-[-0.01em] md:text-2xl">
            Every challenge is unique.
            <br />
            So is every solution.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-white hover:bg-slate-50 text-slate-900 text-lg px-8 py-6 font-semibold cursor-pointer"
          >
            <a href="https://case.playbooklabs.co">Submit Your Problem</a>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-slate-400 text-center md:text-left">
              <p>© 2026 Playbook Labs. All rights reserved</p>
            </div>
            <div className="flex gap-6">
              <a
                href="mailto:team@playbooklabs.co"
                className="text-slate-400 hover:text-white transition-colors"
              >
                Contact Us
              </a>
              <Link
                href="/privacy-policy"
                className="text-slate-400 hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-of-service"
                className="text-slate-400 hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
