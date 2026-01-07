"use client"

import Image from "next/image"
import Link from "next/link"

export default function SubmitPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-center">
            <Link href="/">
              <Image
                src="/images/playbook-labs-logo-black.png"
                alt="Playbook Labs"
                width={200}
                height={80}
                className="h-36 w-auto"
                priority
              />
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col">
        <div className="flex-1 relative">
          <iframe
            data-tally-src="https://tally.so/r/LZDDjy?transparentBackground=1"
            loading="lazy"
            width="100%"
            height="100%"
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
            title="Problem Submission"
            className="absolute inset-0 w-full h-full"
          />
        </div>
      </main>

      <footer className="bg-slate-900 text-slate-300 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-slate-400 text-center md:text-left text-sm">
              <p>© 2026 Playbook Labs. All rights reserved</p>
            </div>
            <div className="flex gap-6 text-sm">
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
  )
}
