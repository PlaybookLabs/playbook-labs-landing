import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Playbook Labs | Privacy Policy",
  description: "Privacy Policy for Playbook Labs - Learn how we collect, use, and protect your personal information.",
}

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/60 via-purple-50/40 to-pink-50/30">
      {/* Back to Home Link */}
      <div className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <main className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12">
            {/* Page Title */}
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-slate-900 mb-2">Privacy Policy</h1>
            <p className="text-slate-500 text-sm mb-8">Last updated: October 20, 2025</p>

            {/* Legal Content */}
            <div className="prose prose-slate max-w-none">
              <section className="mb-8">
                <h2 className="font-playfair text-2xl font-bold text-slate-900 mb-4">1. Introduction</h2>
                <p className="text-slate-700 leading-relaxed mb-3">
                  Playbook Labs ("we," "our," or "us") respects your privacy and is committed to protecting the personal
                  information you provide. This Privacy Policy explains how we collect, use, store, and protect
                  information submitted through our website and services (collectively, the "Service").
                </p>
                <p className="text-slate-700 leading-relaxed">
                  By using the Service, you consent to the practices described in this Privacy Policy.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="font-playfair text-2xl font-bold text-slate-900 mb-4">2. Information We Collect</h2>
                <p className="text-slate-700 leading-relaxed mb-3">
                  When you use our Service, we may collect the following personal and technical information:
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4 mb-3">
                  <li>
                    <strong>User Submissions:</strong> Open-text descriptions of your situation, what you have tried,
                    your goals, and other relevant details.
                  </li>
                  <li>
                    <strong>Demographics:</strong> Gender, age, location, religion, or other personal attributes
                    voluntarily provided.
                  </li>
                  <li>
                    <strong>Contact Information:</strong> Email address for delivery of Playbooks and communication
                    purposes.
                  </li>
                  <li>
                    <strong>Payment Information:</strong> Collected through third-party processors (e.g., Stripe) to
                    complete purchases. Playbook Labs does not store your credit card or bank account information
                    directly.
                  </li>
                  <li>
                    <strong>Device and Technical Information:</strong> IP address, browser type, device type, operating
                    system, screen resolution, language preferences, and other similar information collected
                    automatically.
                  </li>
                  <li>
                    <strong>Cookies and Tracking Technologies:</strong> Cookies, pixel tags, web beacons, local storage,
                    or other technologies may be used to monitor activity on our site, facilitate service functionality,
                    and gather aggregated analytics.
                  </li>
                  <li>
                    <strong>Analytics and Usage Data:</strong> Data regarding how you interact with the Service,
                    including page views, clicks, session duration, and engagement patterns.
                  </li>
                  <li>
                    <strong>Third-Party Data:</strong> Information from third-party integrations or services used to
                    operate the Service.
                  </li>
                </ul>
                <p className="text-slate-700 leading-relaxed">
                  We collect all such information as reasonably necessary to provide, secure, improve, and develop the
                  Service, now and in the future.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="font-playfair text-2xl font-bold text-slate-900 mb-4">3. How We Use Your Information</h2>
                <p className="text-slate-700 leading-relaxed mb-3">
                  Your information is used strictly for the following purposes:
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4 mb-3">
                  <li>
                    <strong>Service Delivery:</strong> Creating and delivering personalized Playbooks, including
                    strategy documents and podcasts.
                  </li>
                  <li>
                    <strong>Service Improvement:</strong> Analyzing submissions, device, and usage data (including
                    anonymized analytics) to improve our methodology and Service.
                  </li>
                  <li>
                    <strong>Research and Media:</strong> Using anonymized insights for research, training, analytics, or
                    media purposes.
                  </li>
                  <li>
                    <strong>Communication:</strong> Sending Service-related communications, including payment
                    confirmations, updates, or notifications.
                  </li>
                  <li>
                    <strong>Marketing (Optional / Future):</strong> If you opt in, we may send newsletters, promotions,
                    or updates.
                  </li>
                </ul>
                <p className="text-slate-700 leading-relaxed">
                  We do not sell, trade, or otherwise share personal information with third parties, except as required
                  for payment processing, anonymized research, or legitimate technical service providers.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="font-playfair text-2xl font-bold text-slate-900 mb-4">4. Data Retention</h2>
                <p className="text-slate-700 leading-relaxed mb-3">
                  We retain your personal and technical information indefinitely, unless you request deletion. Retention
                  is necessary to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
                  <li>Provide ongoing access to Playbooks,</li>
                  <li>Improve our services,</li>
                  <li>Comply with legal or contractual obligations,</li>
                  <li>Support research or media projects using anonymized data.</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="font-playfair text-2xl font-bold text-slate-900 mb-4">5. Data Security</h2>
                <p className="text-slate-700 leading-relaxed mb-3">
                  We implement reasonable organizational, technical, and administrative measures to protect your
                  information, including:
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4 mb-3">
                  <li>Limiting access to authorized personnel,</li>
                  <li>Using encryption for stored data and transmissions where appropriate,</li>
                  <li>Monitoring systems for unauthorized access.</li>
                </ul>
                <p className="text-slate-700 leading-relaxed">
                  Despite these measures, no system can guarantee complete security. By submitting information, you
                  acknowledge that Playbook Labs cannot guarantee absolute protection against unauthorized access or
                  breaches.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="font-playfair text-2xl font-bold text-slate-900 mb-4">6. Third-Party Services</h2>
                <p className="text-slate-700 leading-relaxed mb-3">
                  We may use third-party services, including payment processors (e.g., Stripe) and analytics providers,
                  to operate or improve the Service. These providers are bound by their own privacy policies and are
                  only allowed access as necessary to perform their functions.
                </p>
                <p className="text-slate-700 leading-relaxed">
                  You acknowledge and agree that Playbook Labs is not responsible for the privacy practices of these
                  third parties.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="font-playfair text-2xl font-bold text-slate-900 mb-4">7. User Rights</h2>
                <p className="text-slate-700 leading-relaxed mb-3">
                  Under Quebec Law 25 and PIPEDA, you have the right to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4 mb-3">
                  <li>Request access to your personal information,</li>
                  <li>Request correction of inaccuracies,</li>
                  <li>Request deletion of your personal information.</li>
                </ul>
                <p className="text-slate-700 leading-relaxed mb-3">
                  Requests may be sent to:{" "}
                  <a href="mailto:team@playbooklabs.co" className="text-blue-600 hover:text-blue-700 underline">
                    team@playbooklabs.co
                  </a>
                  .
                </p>
                <p className="text-slate-700 leading-relaxed">
                  We may require verification of identity before fulfilling requests and may refuse requests to the
                  extent permitted by law or necessary to maintain the Service, comply with legal obligations, or
                  preserve anonymized research data.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="font-playfair text-2xl font-bold text-slate-900 mb-4">8. Children's Privacy</h2>
                <p className="text-slate-700 leading-relaxed mb-3">
                  The Service is not intended for individuals under 18 years of age. We do not knowingly collect
                  personal information from minors. If we become aware of such collection, we will take reasonable steps
                  to delete the information.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="font-playfair text-2xl font-bold text-slate-900 mb-4">
                  9. Changes to this Privacy Policy
                </h2>
                <p className="text-slate-700 leading-relaxed mb-3">
                  We may update this Privacy Policy at any time by posting a revised version on our website. Your
                  continued use of the Service constitutes acceptance of any updates.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="font-playfair text-2xl font-bold text-slate-900 mb-4">10. Contact Information</h2>
                <p className="text-slate-700 leading-relaxed mb-3">
                  For any questions, concerns, or requests regarding this Privacy Policy, please contact:
                </p>
                <p className="text-slate-700 leading-relaxed mb-1 font-semibold">Playbook Labs</p>
                <p className="text-slate-700 leading-relaxed">
                  Email:{" "}
                  <a href="mailto:team@playbooklabs.co" className="text-blue-600 hover:text-blue-700 underline">
                    team@playbooklabs.co
                  </a>
                </p>
              </section>

              <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mt-8">
                <p className="text-slate-700 leading-relaxed font-medium text-center">
                  By using Playbook Labs and submitting your information, you acknowledge that you have read,
                  understood, and agreed to this Privacy Policy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12 px-4 sm:px-6 lg:px-8 mt-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div>
              <p className="text-slate-400">© 2025 Playbook Labs. All rights reserved</p>
            </div>
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
