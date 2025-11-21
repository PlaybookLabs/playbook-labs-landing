import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Playbook Labs | Terms of Service",
  description:
    "Terms of Service for Playbook Labs - Read our terms and conditions for using our consulting and analytical services.",
}

export default function TermsOfService() {
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
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-slate-900 mb-2">Terms of Service</h1>
            <p className="text-slate-500 text-sm mb-8">Last updated: October 20, 2025</p>

            {/* Summary Section */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <h2 className="font-playfair text-xl font-bold text-slate-900 mb-3">Summary (For Convenience Only)</h2>
              <p className="text-sm text-slate-600 mb-3 italic">
                This summary is provided for convenience only. The full legal terms below are binding and take
                precedence in the event of any inconsistency.
              </p>
              <p className="text-slate-700 leading-relaxed mb-3">
                By accessing or using Playbook Labs ("we," "us," "our," or "the Service"), you agree that:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
                <li>
                  Playbook Labs provides consulting and informational services, not medical, psychological, legal,
                  financial, or other professional advice.
                </li>
                <li>You are solely responsible for your own actions, decisions, and outcomes.</li>
                <li>All purchases are final and non-refundable.</li>
                <li>We retain all intellectual property rights in all deliverables.</li>
                <li>We may use anonymized insights from your submissions for research or media purposes.</li>
                <li>Your use of the Service constitutes full acceptance of these Terms and our Privacy Policy.</li>
              </ul>
            </div>

            {/* Legal Content */}
            <div className="prose prose-slate max-w-none">
              <section className="mb-8">
                <h2 className="font-playfair text-2xl font-bold text-slate-900 mb-4">1. Acceptance of Terms</h2>
                <p className="text-slate-700 leading-relaxed mb-3">
                  By accessing, purchasing from, or otherwise using the Playbook Labs website, products, or services
                  (collectively, the "Service"), you agree to be bound by these Terms of Service ("Terms").
                </p>
                <p className="text-slate-700 leading-relaxed mb-3">
                  If you do not agree with these Terms, you must not use the Service.
                </p>
                <p className="text-slate-700 leading-relaxed mb-3">
                  These Terms apply to all users, including individuals submitting personal cases, visitors, and
                  purchasers of Playbook Labs deliverables.
                </p>
                <p className="text-slate-700 leading-relaxed">
                  References to "Playbook Labs," "we," or "our" include its founders, employees, contractors, agents,
                  and any future incorporated entity operating under the name "Playbook Labs."
                </p>
              </section>

              <section className="mb-8">
                <h2 className="font-playfair text-2xl font-bold text-slate-900 mb-4">2. Nature of the Service</h2>
                <p className="text-slate-700 leading-relaxed mb-3">
                  Playbook Labs provides consulting, analytical, and informational services designed to help users
                  reflect on and address personal or professional challenges through research-based synthesis.
                </p>
                <p className="text-slate-700 leading-relaxed mb-3">
                  Deliverables may include written documents ("strategy documents"), audio recordings ("podcasts"), or
                  similar materials (collectively, "Playbooks").
                </p>
                <p className="text-slate-700 leading-relaxed mb-3">You acknowledge and agree that:</p>
                <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4 mb-3">
                  <li>
                    Playbook Labs does not provide medical, psychological, therapeutic, legal, or financial advice.
                  </li>
                  <li>
                    The Service is not a healthcare or mental health service, and no client–patient or fiduciary
                    relationship is created.
                  </li>
                  <li>
                    All information and deliverables are provided for informational and educational purposes only and
                    should not be relied upon as professional advice.
                  </li>
                  <li>
                    You remain solely responsible for your decisions, interpretations, and outcomes based on the
                    information provided.
                  </li>
                  <li>If you have medical or psychological concerns, you should seek qualified professional care.</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="font-playfair text-2xl font-bold text-slate-900 mb-4">3. Eligibility</h2>
                <p className="text-slate-700 leading-relaxed mb-3">
                  You must be at least 18 years old or the age of majority in your jurisdiction to use the Service.
                </p>
                <p className="text-slate-700 leading-relaxed mb-3">
                  By using the Service, you represent and warrant that:
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
                  <li>You have the legal capacity to enter into a binding contract; and</li>
                  <li>You will comply with these Terms and all applicable laws and regulations.</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="font-playfair text-2xl font-bold text-slate-900 mb-4">4. User Submissions</h2>
                <p className="text-slate-700 leading-relaxed mb-3">
                  To build your Playbook, you may submit personal information, descriptions of your situation,
                  experiences, or preferences ("User Submissions").
                </p>
                <p className="text-slate-700 leading-relaxed mb-3">
                  You retain ownership of your User Submissions but grant Playbook Labs a worldwide, perpetual,
                  irrevocable, royalty-free, and transferable license to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4 mb-3">
                  <li>
                    Use, reproduce, analyze, modify, adapt, and create derivative works for the purpose of providing and
                    improving the Service;
                  </li>
                  <li>
                    Use anonymized or aggregated data and insights for research, analytics, or media purposes, without
                    identifying you personally.
                  </li>
                </ul>
                <p className="text-slate-700 leading-relaxed mb-3">You represent and warrant that:</p>
                <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
                  <li>Your User Submissions are truthful and lawful;</li>
                  <li>You have the right to provide them;</li>
                  <li>
                    They do not infringe upon any third party's rights, including privacy or intellectual property
                    rights.
                  </li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="font-playfair text-2xl font-bold text-slate-900 mb-4">
                  5. Deliverables and Intellectual Property
                </h2>
                <p className="text-slate-700 leading-relaxed mb-3">
                  All Playbooks, documents, audio recordings, or other materials created by Playbook Labs are and remain
                  the exclusive property of Playbook Labs.
                </p>
                <p className="text-slate-700 leading-relaxed mb-3">
                  You are granted a non-exclusive, non-transferable, revocable license to access and use your Playbook
                  for personal, non-commercial use only.
                </p>
                <p className="text-slate-700 leading-relaxed mb-3">
                  You may not reproduce, share, sell, or publicly distribute any part of your Playbook without written
                  consent.
                </p>
                <p className="text-slate-700 leading-relaxed">
                  Playbook Labs retains the right to reuse anonymized insights, methodologies, or examples derived from
                  client cases for research, training, or media production, provided that such reuse does not personally
                  identify any user.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="font-playfair text-2xl font-bold text-slate-900 mb-4">6. Payment and Refunds</h2>
                <p className="text-slate-700 leading-relaxed mb-3">
                  All prices are listed in the currency indicated at checkout.
                </p>
                <p className="text-slate-700 leading-relaxed mb-3">Payment is due in full at the time of order.</p>
                <p className="text-slate-700 leading-relaxed mb-3">
                  All sales are final. No refunds, exchanges, or cancellations are permitted once a purchase is
                  completed.
                </p>
                <p className="text-slate-700 leading-relaxed">
                  Playbook Labs reserves the right to modify prices or offerings at any time without prior notice.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="font-playfair text-2xl font-bold text-slate-900 mb-4">7. No Guarantees or Warranties</h2>
                <p className="text-slate-700 leading-relaxed mb-3">
                  Playbook Labs makes no representations, warranties, or guarantees — express or implied — regarding:
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4 mb-3">
                  <li>The accuracy, reliability, completeness, or usefulness of any information or deliverables;</li>
                  <li>The achievement of any specific results, goals, or outcomes.</li>
                </ul>
                <p className="text-slate-700 leading-relaxed mb-3">
                  You acknowledge that all services are provided "as is" and "as available."
                </p>
                <p className="text-slate-700 leading-relaxed">
                  Playbook Labs disclaims any implied warranties of merchantability, fitness for a particular purpose,
                  or non-infringement.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="font-playfair text-2xl font-bold text-slate-900 mb-4">8. Limitation of Liability</h2>
                <p className="text-slate-700 leading-relaxed mb-3">
                  To the fullest extent permitted by law, Playbook Labs, its founders, employees, contractors, and
                  affiliates shall not be liable for any direct, indirect, incidental, special, consequential,
                  exemplary, or punitive damages, including but not limited to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4 mb-3">
                  <li>Loss of profits, data, goodwill, or emotional distress;</li>
                  <li>Personal injury or psychological harm;</li>
                  <li>Reliance on or misuse of the Service or deliverables;</li>
                  <li>Delays, errors, or omissions in the Service.</li>
                </ul>
                <p className="text-slate-700 leading-relaxed mb-3">
                  In no event shall the total liability of Playbook Labs exceed the total amount paid by you for the
                  specific Playbook giving rise to the claim.
                </p>
                <p className="text-slate-700 leading-relaxed">
                  You expressly release and hold harmless Playbook Labs from any and all claims arising from your use of
                  the Service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="font-playfair text-2xl font-bold text-slate-900 mb-4">9. Confidentiality</h2>
                <p className="text-slate-700 leading-relaxed mb-3">
                  Playbook Labs takes reasonable measures to safeguard your submissions and deliverables.
                </p>
                <p className="text-slate-700 leading-relaxed">
                  However, you acknowledge that no online transmission or storage system is completely secure, and
                  Playbook Labs cannot guarantee absolute confidentiality or protection against unauthorized access.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="font-playfair text-2xl font-bold text-slate-900 mb-4">
                  10. Modifications to the Service
                </h2>
                <p className="text-slate-700 leading-relaxed mb-3">
                  Playbook Labs reserves the right to modify, suspend, or discontinue the Service or any part thereof,
                  temporarily or permanently, without notice.
                </p>
                <p className="text-slate-700 leading-relaxed">
                  We may update these Terms at any time by posting a revised version on our website. Your continued use
                  of the Service constitutes acceptance of any updates.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="font-playfair text-2xl font-bold text-slate-900 mb-4">
                  11. Governing Law and Dispute Resolution
                </h2>
                <p className="text-slate-700 leading-relaxed mb-3">
                  These Terms are governed by and construed in accordance with the laws of the Province of Quebec and
                  the laws of Canada applicable therein, without regard to conflict of law principles.
                </p>
                <p className="text-slate-700 leading-relaxed">
                  Any dispute, claim, or controversy arising out of or relating to these Terms or your use of the
                  Service shall be submitted to the exclusive jurisdiction of the courts located in Montreal, Quebec,
                  Canada.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="font-playfair text-2xl font-bold text-slate-900 mb-4">12. Indemnification</h2>
                <p className="text-slate-700 leading-relaxed">
                  You agree to defend, indemnify, and hold harmless Playbook Labs, its founders, affiliates, employees,
                  and contractors from and against any and all claims, liabilities, damages, losses, costs, or expenses
                  (including legal fees) arising out of or relating to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4 mt-3">
                  <li>Your use or misuse of the Service or deliverables;</li>
                  <li>Your violation of these Terms; or</li>
                  <li>Any breach of your representations and warranties herein.</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="font-playfair text-2xl font-bold text-slate-900 mb-4">13. Termination</h2>
                <p className="text-slate-700 leading-relaxed mb-3">
                  Playbook Labs may terminate or suspend access to the Service at any time, with or without cause, and
                  without liability.
                </p>
                <p className="text-slate-700 leading-relaxed mb-3">
                  Upon termination, your right to use the Service and deliverables ceases immediately.
                </p>
                <p className="text-slate-700 leading-relaxed">
                  All provisions of these Terms which by their nature should survive termination shall do so, including
                  ownership, disclaimers, limitation of liability, and indemnification.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="font-playfair text-2xl font-bold text-slate-900 mb-4">14. Contact Information</h2>
                <p className="text-slate-700 leading-relaxed mb-3">
                  For any questions, notices, or legal communications regarding these Terms, please contact:
                </p>
                <p className="text-slate-700 leading-relaxed mb-1 font-semibold">Playbook Labs</p>
                <p className="text-slate-700 leading-relaxed">
                  Email:{" "}
                  <a href="mailto:team@playbooklabs.co" className="text-blue-600 hover:text-blue-700 underline">
                    team@playbooklabs.co
                  </a>
                </p>
              </section>

              <section className="mb-8">
                <h2 className="font-playfair text-2xl font-bold text-slate-900 mb-4">15. Entire Agreement</h2>
                <p className="text-slate-700 leading-relaxed mb-3">
                  These Terms constitute the entire agreement between you and Playbook Labs regarding the Service and
                  supersede all prior or contemporaneous communications, whether oral or written.
                </p>
                <p className="text-slate-700 leading-relaxed">
                  If any provision is found invalid or unenforceable, the remaining provisions shall remain in full
                  force and effect.
                </p>
              </section>

              <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mt-8">
                <p className="text-slate-700 leading-relaxed font-medium text-center">
                  By using Playbook Labs, you acknowledge that you have read, understood, and agreed to these Terms of
                  Service.
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
