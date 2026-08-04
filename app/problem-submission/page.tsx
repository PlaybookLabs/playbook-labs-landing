import Image from "next/image";
import Link from "next/link";

export default function SubmitPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-center">
            <Link href="/">
              <Image
                src="/images/playbook-labs-logo-black.png"
                alt="Playbook Labs"
                width={200}
                height={80}
                className="h-20 w-auto"
                priority
              />
            </Link>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="tally-wrapper">
            <iframe
              data-tally-src="https://tally.so/embed/LZDDjy?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
              loading="lazy"
              width="100%"
              height="1143"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              title="Problem Submission"
              className="w-full"
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-slate-400 text-center md:text-left">
              <p>© 2026 Playbook Labs.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
