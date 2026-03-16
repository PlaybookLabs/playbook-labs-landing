"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";

export default function SubmitPage() {
  const hasFiredLead = useRef(false);

  useEffect(() => {
    const handleTallyEvent = (e) => {
      console.log("Tally Message Received:", e.data);
      let eventName = "";
      let payload = null;

      if (typeof e.data === "string") {
        try {
          const parsed = JSON.parse(e.data);
          eventName = parsed.event || e.data;
          payload = parsed.payload || null;
        } catch (err) {
          eventName = e.data;
        }
      } else if (typeof e.data === "object" && e.data !== null) {
        eventName = e.data.type || e.data.event || "";
        payload = e.data.payload || null;
      }

      // Track Lead only when they move past the Start Page (Page 1)
      const isActualStart =
        eventName === "tally-form-started" ||
        (eventName === "Tally.FormPageView" && payload?.page > 1);

      if (isActualStart && !hasFiredLead.current) {
        console.log("🚀 MATCH! User engaged. Firing Reddit Lead...");
        if (typeof window !== "undefined" && window["rdt"]) {
          window["rdt"]("track", "Lead");
          hasFiredLead.current = true;
        }
      }
    };

    window.addEventListener("message", handleTallyEvent);
    return () => window.removeEventListener("message", handleTallyEvent);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
      {/* Reddit Pixel Load */}
      <Script id="reddit-pixel" strategy="afterInteractive">
        {`
          !function(w,d){if(!w.rdt){var p=w.rdt=function(){p.sendEvent?p.sendEvent.apply(p,arguments):p.callQueue.push(arguments)};p.callQueue=[];var t=d.createElement("script");t.src="https://www.redditstatic.com/ads/pixel.js?pixel_id=a2_imnqcglj4sjt",t.async=!0;var s=d.getElementsByTagName("script")[0];s.parentNode.insertBefore(t,s)}}(window,document);
          rdt('init','a2_imnqcglj4sjt');
          rdt('track', 'PageVisit');
        `}
      </Script>

      {/* Tally Embed Bridge */}
      <Script
        src="https://tally.so/widgets/embed.js"
        strategy="afterInteractive"
      />

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

      <main className="flex-1 flex flex-col min-h-[800px]">
        <div className="flex-1 relative">
          <iframe
            id="tally-iframe"
            data-tally-src="https://case.playbooklabs.co"
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
  );
}
