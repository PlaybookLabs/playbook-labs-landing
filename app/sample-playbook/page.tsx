"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

export default function SamplePlaybookPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "/images/cover_3.png",
      title: "Cover Page",
      page: "Playbook Overview",
      blurs: [], // No blur for cover
    },
    {
      image: "/images/TOC_3.png",
      title: "Table of Contents",
      page: "Page 1",
      blurs: [], // No blur for TOC
    },
    {
      image: "/images/Situation_4.png",
      title: "Executive Summary",
      page: "Extract from page 2",
      blurs: [
        { top: "22%", left: "10.5%", width: "4.3%", height: "2.3%" }, // Name "Imran"
        { top: "36%", left: "10%", right: "12%", bottom: "50%" }, // Bottom paragraph with specific examples
      ],
    },
    {
      image: "/images/Diagnosis_3.png",
      title: "Contributing Factors",
      page: "Extract from page 3",
      blurs: [
        { top: "46%", left: "12%", width: "38%", bottom: "29%" }, // Left column bullet points
      ],
    },
    {
      image: "/images/Case_3.png",
      title: "Case Study 1",
      page: "Extract from page 6",
      blurs: [
        { top: "73.5%", left: "14%", right: "12%", bottom: "12.5%" }, // "Parallel to You" section
      ],
    },
    {
      image: "/images/Disciplines_3.png",
      title: "Core Disciplines & Frameworks",
      page: "Extract from page 9",
      blurs: [
        { top: "87%", left: "25.2%", right: "12.5%", bottom: "11.5%" },
        { top: "89.25%", left: "10.4%", right: "79.5%", bottom: "9.3%" }, // "Relevance in Your Situation" excerpt
      ],
    },
    {
      image: "/images/Options_3.png",
      title: "Options",
      page: "Extract from page 12",
      blurs: [
        { top: "6%", left: "10%", right: "9.5%", height: "7%" }, // Top intro paragraph
        { top: "23.3%", left: "24%", right: "26.8%", bottom: "23.9%" }, // Table content
        { top: "82.5%", left: "14.9%", right: "11.3%", bottom: "3.5%" }, // Recommendation box
      ],
    },
    {
      image: "/images/Strategy_3.png",
      title: "Personalized Strategy",
      page: "Extract from page 13",
      blurs: [
        { top: "14%", left: "10%", right: "11%", height: "8%" }, // Top intro paragraph
        { top: "89.2%", left: "17%", right: "11.7%", bottom: "3%" }, // Box 3 specific details
      ],
    },
    {
      image: "/images/Roadmap_3.png",
      title: "Solution Roadmap",
      page: "Extract from page 14",
      blurs: [
        { top: "14.1%", left: "30.3%", width: "20%", bottom: "0" }, // Action column
        { top: "14.1%", left: "69.5%", width: "19.6%", bottom: "0" }, // Milestone column
      ],
    },
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => {
      const carousel = document.getElementById("carousel-container");
      if (carousel) {
        const yOffset = 300;
        const y =
          carousel.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }, 50);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => {
      const carousel = document.getElementById("carousel-container");
      if (carousel) {
        const yOffset = 300;
        const y =
          carousel.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }, 50);
  }, [slides.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  const currentSlideData = slides[currentSlide];

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
              <Link href="/problem-submission">Submit Your Problem</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-playfair text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
              Sample Playbook
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Real playbook delivered to a client struggling with confrontation
              avoidance
            </p>
          </div>

          {/* Audio Section */}
          <div className="mb-16">
            <div
              id="carousel-container"
              className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
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
                  <h2 className="text-xl font-bold text-slate-900">
                    Custom Podcast
                  </h2>
                  <p className="text-sm text-slate-600">Snippet</p>
                </div>
              </div>

              {/* Audio Player */}
              <audio controls className="w-full">
                <source src="/playbook_snippet.mp3" type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          </div>

          {/* Document Preview Section */}
          <div className="mb-16">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center">
                  <img
                    src="/images/white-logo.png"
                    alt="Playbook Labs"
                    className="w-7 h-7 object-contain"
                  />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Personalized Strategy
                  </h2>
                  <p className="text-sm text-slate-600">
                    Excerpts of the 16-page deliverable (confidential
                    information redacted)
                  </p>
                </div>
              </div>

              {/* Image with Blur Overlays */}
              <div className="relative rounded-lg overflow-hidden border border-slate-200 mb-6">
                <img
                  src={currentSlideData.image}
                  alt={currentSlideData.title}
                  className="w-full h-auto"
                />

                {/* Blur Overlays */}
                {currentSlideData.blurs.map((blur, index) => (
                  <div
                    key={index}
                    className="absolute backdrop-blur-[4px] bg-slate-900/3"
                    style={{
                      top: blur.top,
                      left: blur.left,
                      right: blur.right,
                      bottom: blur.bottom,
                      width: blur.width,
                      height: blur.height,
                    }}
                  />
                ))}
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between mb-6">
                {/* Previous Button */}
                <button
                  onClick={prevSlide}
                  className="flex items-center gap-2 px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-5 h-5" />
                  <span className="text-sm font-medium hidden sm:inline">
                    Previous
                  </span>
                </button>

                {/* Slide Indicator Dots */}
                <div className="flex items-center gap-2">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setCurrentSlide(index);
                        // Scroll to carousel top
                        setTimeout(() => {
                          const carousel =
                            document.getElementById("carousel-container");
                          if (carousel) {
                            const yOffset = 300;
                            const y =
                              carousel.getBoundingClientRect().top +
                              window.pageYOffset +
                              yOffset;
                            window.scrollTo({ top: y, behavior: "smooth" });
                          }
                        }, 50);
                      }}
                      className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                        index === currentSlide
                          ? "bg-blue-800"
                          : "bg-slate-300 hover:bg-slate-400"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>

                {/* Next Button */}
                <button
                  onClick={nextSlide}
                  className="flex items-center gap-2 px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                  aria-label="Next slide"
                >
                  <span className="text-sm font-medium hidden sm:inline">
                    Next
                  </span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Section Label */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700">
                  Section: {currentSlideData.title}
                </span>
                <span className="text-xs text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                  {currentSlideData.page}
                </span>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Get Your Own Custom Playbook
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Comprehensive strategy document + personalized podcast for your
              specific challenge. Delivered in 5-7 business days.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-white hover:bg-slate-50 text-slate-900 text-lg px-8 py-6 font-semibold cursor-pointer"
              >
                <Link href="/problem-submission">
                  Start Your Strategy
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-6 font-semibold cursor-pointer"
              >
                <Link href="/#pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
