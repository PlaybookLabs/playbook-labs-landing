"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";

export default function SubmitPage() {
  // We use a ref to track if we've already fired the lead event
  const hasFiredLead = useRef(false);

  useEffect(() => {
    const handleTallyEvent = (e) => {
      console.log("Tally Message Received:", e.data);

      let eventName = "";
      let payload = null;

      // Handle stringified JSON (standard Tally broadcast)
      if (typeof e.data === "string") {
        try {
          const parsed = JSON.parse(e.data);
          eventName = parsed.event || e.data;
          payload = parsed.payload || null;
        } catch (err) {
          eventName = e.data;
        }
      } else if (typeof e.data === "object" && e.data !== null) {
        // Handle object data (some internal Tally signals)
        eventName = e.data.type || e.data.event || "";
        payload = e.data.payload || null;
      }

      /**
       * TRIGGER LOGIC:
       * 1. Official 'tally-form-started' event.
       * 2. 'Tally.FormPageView' only if page number is 2 or higher.
       * (This ensures the user clicked the 'Begin' button on the Start Page).
       */
      const isActualStart =
        eventName === "tally-form-started" ||
        (eventName === "Tally.FormPageView" && payload?.page > 1);

      if (isActualStart && !hasFiredLead.current) {
        console.log("🚀 MATCH! User engaged. Firing Reddit Lead...");

        // Use window['rdt'] to avoid TypeScript property errors
        if (typeof window !== "undefined" && window["rdt"]) {
          window["rdt"]("track", "Lead");
          hasFiredLead.current = true; // Prevent double-firing
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

      <main className="flex-1 flex flex-col w-full h-full">
        <iframe
          id="tally-iframe"
          data-tally-src="https://case.playbooklabs.co?alignLeft=1&hideTitle=1"
          width="100%"
          style={{
            flex: "1 1 auto",
            minHeight: "calc(100vh - 64px - 80px)", // Screen minus header/footer
            border: "none",
          }}
          title="Problem Submission"
        />
      </main>

      <footer className="bg-slate-900 text-slate-300 py-8 px-4 text-center text-sm">
        <p>© 2026 Playbook Labs. All rights reserved</p>
      </footer>
    </div>
  );
}
