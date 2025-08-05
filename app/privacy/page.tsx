import { PageHeader } from "@/components/page-header"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy - Prospectify",
  description: "Privacy Policy and data protection information for Prospectify users.",
  keywords: ["privacy policy", "data protection", "GDPR", "prospectify privacy"],
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <PageHeader 
          title="Privacy Policy"
          subtitle="Your privacy is important to us. Learn how we collect, use, and protect your data."
          showBackButton={true}
          showHomeButton={true}
        />

        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-8 text-lg">
              <strong>Last updated:</strong> {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Personal Information</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                We collect information you provide directly to us, including:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Name and contact information (email address)</li>
                <li>Company name and industry</li>
                <li>Account credentials</li>
                <li>Communication preferences</li>
                <li>Payment information (processed securely by third-party providers)</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Usage Information</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                We automatically collect certain information about your use of our service:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Log data (IP address, browser type, pages visited)</li>
                <li>Device information</li>
                <li>Usage patterns and preferences</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Provide and improve our services</li>
                <li>Process transactions and send related information</li>
                <li>Send technical notices and support messages</li>
                <li>Respond to your comments and questions</li>
                <li>Analyze usage patterns to enhance user experience</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Information Sharing</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We do not sell, trade, or otherwise transfer your personal information to third parties except:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>With your explicit consent</li>
                <li>To trusted service providers who assist in operating our service</li>
                <li>When required by law or to protect our rights</li>
                <li>In connection with a business transfer or acquisition</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Sources</h2>
              <p className="text-gray-700 leading-relaxed">
                Our demographic and economic data comes from publicly available sources including:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mt-4">
                <li>Eurostat (European Statistics Office)</li>
                <li>INSEE (French National Institute of Statistics)</li>
                <li>Other national statistical offices</li>
                <li>Open government data portals</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                This data is aggregated, anonymized, and used solely for providing insights to our users.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Security</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We implement appropriate security measures to protect your information:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>SSL/TLS encryption for data transmission</li>
                <li>Secure cloud infrastructure (Supabase)</li>
                <li>Regular security assessments</li>
                <li>Access controls and authentication</li>
                <li>Data backup and recovery procedures</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Your Rights (GDPR)</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Under the General Data Protection Regulation, you have the right to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Access your personal data</li>
                <li>Rectify inaccurate information</li>
                <li>Erase your data ("right to be forgotten")</li>
                <li>Restrict processing of your data</li>
                <li>Data portability</li>
                <li>Object to processing</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Cookies and Tracking</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We use cookies and similar technologies to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Remember your preferences</li>
                <li>Analyze site usage</li>
                <li>Improve our services</li>
                <li>Provide personalized experiences</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                You can control cookie settings through your browser preferences.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Data Retention</h2>
              <p className="text-gray-700 leading-relaxed">
                We retain your information only as long as necessary to provide our services and comply 
                with legal obligations. Account data is deleted within 30 days of account closure unless 
                required by law to retain it longer.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. International Transfers</h2>
              <p className="text-gray-700 leading-relaxed">
                Your data may be transferred to and processed in countries other than your own. We ensure 
                appropriate safeguards are in place to protect your data in accordance with applicable 
                data protection laws.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Children's Privacy</h2>
              <p className="text-gray-700 leading-relaxed">
                Our service is not intended for children under 16. We do not knowingly collect personal 
                information from children under 16. If you become aware that a child has provided us with 
                personal information, please contact us.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Changes to This Policy</h2>
              <p className="text-gray-700 leading-relaxed">
                We may update this Privacy Policy periodically. We will notify users of significant changes 
                via email or through our platform. The "Last updated" date at the top of this policy 
                indicates when it was last revised.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Contact Us</h2>
              <p className="text-gray-700 leading-relaxed">
                For questions about this Privacy Policy or to exercise your rights, please contact us:
                <br />
                <strong>Email:</strong> ManiRamaiah@prospectify.com
                <br />
                <strong>Address:</strong> Mayor Street Lower, International Financial Services Centre, Dublin 1, Ireland
                <br />
                <strong>Data Protection Officer:</strong> ManiRamaiah@prospectify.com
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
