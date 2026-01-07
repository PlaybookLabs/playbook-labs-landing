'use client'

import { useEffect } from 'react'
import HeroSection from "@/components/HeroSection"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ThankYouPage() {
  useEffect(() => {
    // Fire Purchase event when thank you page loads
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Purchase', {
        value: 499,
        currency: 'USD'
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 pt-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <a href="/#top" className="flex items-center -ml-11.5 md:ml-0 cursor-pointer">
              <Image
                src="/images/playbook-labs-logo-black.png"
                alt="Playbook Labs"
                width={200}
                height={80}
                className="w-auto h-36"
                priority
              />
            </a>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="/#approach" className="text-slate-900 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 transition-all">
                What We Do
              </a>
              <a href="/#how-it-works" className="text-slate-900 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 transition-all">
                How It Works
              </a>
              <a href="/#pricing" className="text-slate-900 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 transition-all">
                Pricing
              </a>
              <a href="/#faq" className="text-slate-900 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 transition-all">
                FAQ
              </a>
            </nav>
            <Button
              asChild
              className="bg-slate-900 hover:bg-gradient-to-r hover:from-blue-700 hover:to-purple-700 text-white font-semibold"
            >
              <a href="/problem-submission" rel="noopener noreferrer">
                Submit Your Problem
              </a>
            </Button>
          </div>
        </div>
      </header>
      {/* Main (accounts for fixed header) */}
      <div className="flex-1 flex pt-16">
        <HeroSection
          centered
          showParticles={false}
          title="Thank You"
          subtitle="Your case has been submitted and we will start working on your playbook shortly."
          footerContent={
            <p className="tracking-[-0.01em] leading-[1.5] font-normal text-slate-600 text-base lg:text-lg max-w-3xl text-center">
              A confirmation email is on its way. Please check your Inbox (as well as your Spam folder).
            </p>
          }
        />
      </div>
      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-slate-400 text-center md:text-left">
              © 2026 Playbook Labs. All rights reserved
            </p>
            <div className="flex gap-6">
              <a href="mailto:team@playbooklabs.co" className="text-slate-400 hover:text-white transition-colors">
                Contact Us
              </a>
              <Link href="/privacy-policy" className="text-slate-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="text-slate-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}