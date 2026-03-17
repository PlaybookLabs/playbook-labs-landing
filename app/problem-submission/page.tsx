"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SubmitPage() {
  const router = useRouter();

  useEffect(() => {
    // Teleport the user to the smooth subdomain version
    router.replace("https://case.playbooklabs.co");
  }, [router]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      {/* Short message in case the redirect takes a second */}
      <p className="text-slate-500 font-medium">
        Redirecting to secure submission form...
      </p>
    </div>
  );
}
