"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

export default function SamplePlaybookPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const slides = [
    {
      image: "/images/Cover_3.png",
      title: "Cover Page",
      page: "Playbook Overview",
      blurs: [],
    },
    {
      image: "/images/TOC_3.png",
      title: "Table of Contents",
      page: "Page 1",
      blurs: [],
    },
    {
      image: "/images/Situation_5.png",
      title: "Executive Summary",
      page: "Extract from page 2",
      blurs: [],
    },
    {
      image: "/images/Diagnosis_5.png",
      title: "Contributing Factors",
      page: "Extract from page 3",
      blurs: [],
    },
    {
      image: "/images/Case_5.png",
      title: "Case Study 1",
      page: "Extract from page 6",
      blurs: [],
    },
    {
      image: "/images/Disciplines_5.png",
      title: "Core Disciplines & Frameworks",
      page: "Extract from page 9",
      blurs: [],
    },
    {
      image: "/images/Options_5.png",
      title: "Options",
      page: "Extract from page 12",
      blurs: [],
    },
    {
      image: "/images/Strategy_5.png",
      title: "Personalized Strategy",
      page: "Extract from page 13",
      blurs: [],
    },
    {
      image: "/images/Roadmap_5.png",
      title: "Solution Roadmap",
      page: "Extract from page 14",
      blurs: [],
    },
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => {
      const carousel = document.getElementById("carousel-container");
      if (carousel) {
        const yOffset = 240;
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
        const yOffset = 240;
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

  // Swipe support for modal
  useEffect(() => {
    if (!isModalOpen) return;

    let touchStartX = 0;
    let touchEndX = 0;
    let isPinching = false;

    const handleTouchStart = (e: TouchEvent) => {
      // Detect if this is a pinch (multi-touch)
      if (e.touches.length > 1) {
        isPinching = true;
        return;
      }
      isPinching = false;
      touchStartX = e.changedTouches[0].screenX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      // Don't trigger swipe if user was pinching
      if (isPinching) {
        isPinching = false;
        return;
      }
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    };

    const handleSwipe = () => {
      if (touchEndX < touchStartX - 50) {
        nextSlide();
      }
      if (touchEndX > touchStartX + 50) {
        prevSlide();
      }
    };

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isModalOpen, nextSlide, prevSlide]);

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isModalOpen) {
        setIsModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isModalOpen]);

  // Handle browser back button in modal
  useEffect(() => {
    if (!isModalOpen) return;

    // Push a fake history state when modal opens
    window.history.pushState({ modalOpen: true }, "");

    const handlePopState = () => {
      setIsModalOpen(false);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
      // Clean up: if modal is still open when component unmounts, go back
      if (window.history.state?.modalOpen) {
        window.history.back();
      }
    };
  }, [isModalOpen]);

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
      <main className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
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
          <div className="mb-6">
            <div
              id="carousel-container"
              className="bg-white rounded-2xl shadow-sm p-8 border border-slate-200"
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
          <div>
            <div className="bg-white rounded-2xl shadow-sm p-8 border border-slate-200">
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
                  <p className="text-sm text-slate-600">Redacted excerpts</p>
                </div>
              </div>

              {/* Image with Blur Overlays */}
              <div
                className="relative rounded-lg overflow-hidden border border-slate-200 mb-6 cursor-pointer hover:opacity-95 transition-opacity"
                onClick={() => setIsModalOpen(true)}
              >
                <img
                  src={currentSlideData.image}
                  alt={currentSlideData.title}
                  className="w-full h-auto"
                />
              </div>

              {/* Navigation Controls */}
              <div className="relative mb-12">
                {/* First Row: Previous + Dots + Next */}
                <div className="flex items-center justify-between mb-4">
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
                  <div className="flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
                    {slides.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setCurrentSlide(index);
                          setTimeout(() => {
                            const carousel =
                              document.getElementById("carousel-container");
                            if (carousel) {
                              const yOffset = 240;
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

                {/* Second Row: Tag (Absolutely Centered) */}
                <div className="flex justify-center absolute left-1/2 -translate-x-1/2 w-full">
                  <span className="text-sm font-medium text-slate-700 bg-slate-100 px-4 py-2 rounded-full">
                    {currentSlideData.title}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lightbox Modal */}
        {isModalOpen && (
          <div
            className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center"
            onClick={() => setIsModalOpen(false)}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-[110]"
              aria-label="Close modal"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Modal Content */}
            <div
              className="relative max-w-6xl w-full h-full flex items-center justify-center p-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Previous Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevSlide();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors bg-black/50 rounded-full p-3 z-[110]"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>

              {/* Image */}
              <div className="relative max-h-[75vh] max-w-full mb-20">
                <img
                  src={currentSlideData.image}
                  alt={currentSlideData.title}
                  className="max-h-[75vh] max-w-full w-auto h-auto object-contain"
                />
              </div>

              {/* Next Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextSlide();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors bg-black/50 rounded-full p-3 z-[110]"
                aria-label="Next slide"
              >
                <ChevronRight className="w-8 h-8" />
              </button>

              {/* Slide Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent pt-16 pb-12">
                <div className="text-center">
                  <div className="px-4 py-2 mb-4">
                    <p className="text-white text-base font-medium">
                      {currentSlideData.title}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 justify-center">
                    {slides.map((_, index) => (
                      <button
                        key={index}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentSlide(index);
                        }}
                        className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                          index === currentSlide
                            ? "bg-white"
                            : "bg-white/50 hover:bg-white/70"
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="font-playfair text-4xl lg:text-6xl leading-[1.2] text-white font-extrabold mb-4 text-balance md:text-6xl tracking-[-0.03em]">
            Get Your Own
          </h2>
          <p className="text-xl text-white/90 mb-12 font-normal leading-6 tracking-[-0.01em] md:text-2xl">
            Every challenge is unique. So is every solution.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-white hover:bg-slate-50 text-slate-900 text-lg px-8 py-6 font-semibold cursor-pointer"
          >
            <Link href="/problem-submission">Submit Your Problem</Link>
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
