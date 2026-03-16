"use client";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";

export default function SubmitPage() {
  useEffect(() => {
    const handleTallyEvent = (e) => {
      // 1. Log every message to the console for visibility
      console.log("Tally Message Received:", e.data);

      // 2. Check for the start event in various formats
      const isStartEvent =
        e.data === "tally-form-started" ||
        e.data === "tally-form-start" ||
        (typeof e.data === "string" && e.data.includes("form-started"));

      if (isStartEvent) {
        console.log("🚀 Parent detected form start! Firing Reddit Lead...");
        if (typeof window !== "undefined" && window.rdt) {
          window.rdt("track", "Lead");
        }
      }
    };

    window.addEventListener("message", handleTallyEvent);
    return () => window.removeEventListener("message", handleTallyEvent);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
      {/* 1. Load Reddit Pixel Script */}
      <Script id="reddit-pixel" strategy="afterInteractive">
        {`
          !function(w,d){if(!w.rdt){var p=w.rdt=function(){p.sendEvent?p.sendEvent.apply(p,arguments):p.callQueue.push(arguments)};p.callQueue=[];var t=d.createElement("script");t.src="https://www.redditstatic.com/ads/pixel.js?pixel_id=a2_imnqcglj4sjt",t.async=!0;var s=d.getElementsByTagName("script")[0];s.parentNode.insertBefore(t,s)}}(window,document);
          rdt('init','a2_imnqcglj4sjt');
          rdt('track', 'PageVisit');
        `}
      </Script>

      {/* 2. Load Tally Embed Library */}
      <Script
        src="https://tally.so/widgets/embed.js"
        strategy="afterInteractive"
      />

      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-center">
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
      </header>

      <main className="flex-1 relative min-h-[800px]">
        {/* We keep data-tally-src so the embed.js can "hook" into it */}
        <iframe
          id="tally-iframe"
          data-tally-src="https://case.playbooklabs.co"
          width="100%"
          height="100%"
          frameBorder="0"
          title="Problem Submission"
          className="absolute inset-0 w-full h-full"
        />
      </main>

      <footer className="bg-slate-900 text-slate-300 py-8 px-4 text-center text-sm">
        <p>© 2026 Playbook Labs. All rights reserved</p>
      </footer>
    </div>
  );
}
