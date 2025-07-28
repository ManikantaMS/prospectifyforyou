import { PageHeader } from "@/components/page-header"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service - Prospectify",
  description: "Terms of Service and user agreement for Prospectify data-driven marketing platform.",
  keywords: ["terms of service", "user agreement", "prospectify terms"],
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <PageHeader 
          title="Terms of Service"
          subtitle="Please read these terms carefully before using our service"
          showBackButton={true}
          showHomeButton={true}
        />

        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-8 text-lg">
              <strong>Last updated:</strong> {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                By accessing and using Prospectify ("the Service"), you accept and agree to be bound by the 
                terms and provision of this agreement. If you do not agree to abide by the above, please 
                do not use this service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description of Service</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Prospectify provides data-driven marketing insights for small and medium-sized businesses 
                targeting European markets. Our service includes:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>City recommendation analytics based on demographic data</li>
                <li>Access to European statistical databases</li>
                <li>Marketing campaign optimization tools</li>
                <li>Customer profiling and segmentation features</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Accounts and Registration</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                To access certain features of our service, you must register for an account. You agree to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Provide accurate, current, and complete information during registration</li>
                <li>Maintain and update your account information</li>
                <li>Keep your login credentials secure and confidential</li>
                <li>Accept responsibility for all activities under your account</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Usage and Privacy</h2>
              <p className="text-gray-700 leading-relaxed">
                We collect and process data in accordance with our Privacy Policy. All demographic and 
                economic data provided through our service is sourced from public databases such as 
                Eurostat and INSEE. We do not sell or share your personal information with third parties 
                without your consent.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Acceptable Use</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                You agree not to use the service to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Violate any laws or regulations</li>
                <li>Infringe on intellectual property rights</li>
                <li>Transmit harmful or malicious content</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Use automated tools to access the service without permission</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Payment Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                Subscription fees are billed in advance on a monthly or annual basis. All payments are 
                non-refundable except as required by law. We reserve the right to change our pricing 
                with 30 days' notice.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Limitation of Liability</h2>
              <p className="text-gray-700 leading-relaxed">
                Prospectify provides information and tools "as is" without warranties. We are not liable 
                for any business decisions made based on our recommendations or data. Users are responsible 
                for validating all information before making business decisions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Termination</h2>
              <p className="text-gray-700 leading-relaxed">
                Either party may terminate this agreement at any time. Upon termination, your access to 
                the service will be discontinued, and you must cease all use of our platform.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Changes to Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to modify these terms at any time. Users will be notified of 
                significant changes via email or through the platform. Continued use of the service 
                constitutes acceptance of the updated terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contact Information</h2>
              <p className="text-gray-700 leading-relaxed">
                For questions about these Terms of Service, please contact us at:
                <br />
                <strong>Email:</strong> ManiRamaiha@prospectify.com
                <br />
                <strong>Address:</strong> Mayor Street Lower, International Financial Services Centre, Dublin 1, Ireland
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
