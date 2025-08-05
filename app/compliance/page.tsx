"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Shield, Lock, Eye, Scale, FileText, Users, Globe, AlertTriangle, CheckCircle, BookOpen } from "lucide-react"
import Link from "next/link"

export default function CompliancePage() {
  const complianceFrameworks = [
    {
      icon: Shield,
      title: "GDPR Compliance",
      status: "Fully Compliant",
      description: "Full adherence to European General Data Protection Regulation",
      details: [
        "Data minimization principles implemented",
        "Explicit consent mechanisms for data collection",
        "Right to be forgotten functionality",
        "Data portability and access rights",
        "Privacy by design architecture",
        "Regular compliance audits and assessments"
      ]
    },
    {
      icon: Lock,
      title: "Data Security Standards",
      status: "ISO 27001 Aligned",
      description: "Enterprise-grade security measures and protocols",
      details: [
        "End-to-end encryption for all data transmission",
        "Advanced encryption at rest (AES-256)",
        "Multi-factor authentication (MFA) required",
        "Regular penetration testing and vulnerability assessments",
        "Secure cloud infrastructure with AWS/Azure compliance",
        "Access control and role-based permissions"
      ]
    },
    {
      icon: Eye,
      title: "Privacy Protection",
      status: "Privacy First",
      description: "Comprehensive privacy protection mechanisms",
      details: [
        "Data anonymization and pseudonymization",
        "Minimal data collection practices",
        "Transparent privacy policies and notices",
        "Cookie consent management",
        "Third-party data sharing controls",
        "Regular privacy impact assessments"
      ]
    },
    {
      icon: Scale,
      title: "Legal Framework",
      status: "Legally Compliant",
      description: "Full compliance with applicable legal requirements",
      details: [
        "Terms of Service clearly defined",
        "Service Level Agreements (SLAs)",
        "Intellectual property protection",
        "Anti-discrimination policies",
        "Accessibility compliance (WCAG 2.1)",
        "Cross-border data transfer regulations"
      ]
    }
  ]

  const ethicalPrinciples = [
    {
      principle: "Algorithmic Transparency",
      description: "Our AI recommendations are explainable and transparent",
      implementation: "Clear explanation of how city recommendations are generated"
    },
    {
      principle: "Bias Prevention",
      description: "Active measures to prevent algorithmic bias in recommendations",
      implementation: "Regular bias testing and diverse training data sets"
    },
    {
      principle: "Fair Competition",
      description: "Ensuring fair market practices and competition",
      implementation: "No preferential treatment for specific locations or vendors"
    },
    {
      principle: "Environmental Responsibility",
      description: "Promoting sustainable business expansion practices",
      implementation: "Carbon footprint considerations in recommendations"
    }
  ]

  const dataGovernance = [
    {
      category: "Data Collection",
      policies: [
        "Only collect data necessary for service delivery",
        "Explicit user consent for all data collection",
        "Clear data retention policies",
        "Regular data audit and cleanup processes"
      ]
    },
    {
      category: "Data Processing",
      policies: [
        "Lawful basis for all data processing activities",
        "Data processing agreements with third parties",
        "Regular monitoring of data processing activities",
        "Incident response procedures for data breaches"
      ]
    },
    {
      category: "Data Sharing",
      policies: [
        "No sharing of personal data without explicit consent",
        "Anonymized data only for research purposes",
        "Strict vendor and partner data sharing agreements",
        "Regular third-party security assessments"
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-green-50 pt-16 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Shield className="h-8 w-8 text-blue-600 mr-3" />
              <Badge variant="outline" className="text-blue-600 border-blue-600">
                Regulatory Compliance
              </Badge>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-6">
              Legal & Regulatory Compliance
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Comprehensive compliance framework ensuring data privacy, security, and ethical AI practices 
              in accordance with European and international regulations.
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
              <span className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                GDPR Compliant
              </span>
              <span className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                ISO 27001 Aligned
              </span>
              <span className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                Ethics First
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Frameworks */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Compliance Frameworks</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive approach to regulatory compliance across all operational areas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {complianceFrameworks.map((framework, index) => (
              <Card key={index} className="border shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <framework.icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{framework.title}</CardTitle>
                        <Badge className="mt-1 bg-green-100 text-green-800">{framework.status}</Badge>
                      </div>
                    </div>
                  </div>
                  <CardDescription className="text-base mt-2">{framework.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {framework.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Ethical AI Principles */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ethical AI Principles</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our commitment to responsible AI development and deployment
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ethicalPrinciples.map((principle, index) => (
              <Card key={index} className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <CardTitle className="text-lg text-blue-700">{principle.principle}</CardTitle>
                  <CardDescription>{principle.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <span className="text-sm font-medium text-blue-800">Implementation: </span>
                    <span className="text-sm text-blue-700">{principle.implementation}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Data Governance */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Data Governance Framework</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive policies ensuring responsible data handling throughout the data lifecycle
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {dataGovernance.map((category, index) => (
              <Card key={index} className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg text-center">{category.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {category.policies.map((policy, policyIndex) => (
                      <li key={policyIndex} className="flex items-start">
                        <FileText className="h-4 w-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{policy}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Regulatory Documentation */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Legal Documentation</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Access our comprehensive legal and compliance documentation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center border shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <BookOpen className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Privacy Policy</CardTitle>
                <CardDescription>Comprehensive data privacy and protection policies</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" asChild>
                  <Link href="/privacy">View Privacy Policy</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center border shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <Scale className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Terms of Service</CardTitle>
                <CardDescription>Legal terms and conditions for service usage</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" asChild>
                  <Link href="/terms">View Terms of Service</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center border shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <AlertTriangle className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                <CardTitle>Incident Response</CardTitle>
                <CardDescription>Security incident reporting and response procedures</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={() => alert('🚨 Security Incident Response\n\n📞 EMERGENCY CONTACT:\nEmail: security@prospectify.com\nPhone: +353-1-800-SECURITY\n\n⚡ IMMEDIATE ACTIONS:\n1. Document the incident details\n2. Preserve evidence and logs\n3. Notify affected parties within 72 hours\n4. Implement containment measures\n\n📋 INCIDENT TYPES:\n• Data breach or unauthorized access\n• System compromise or malware\n• Service disruption or outage\n• Privacy violation or GDPR incident\n\n🔒 RESPONSE TIMELINE:\n• Initial response: Within 1 hour\n• Stakeholder notification: Within 4 hours\n• Regulatory notification: Within 72 hours\n• Full investigation: Within 7 days\n\n📊 POST-INCIDENT:\n• Root cause analysis\n• Remediation plan implementation\n• Process improvement recommendations\n• Compliance reporting to authorities\n\nFor non-emergency security concerns, please email: ManiRamaiah@prospectify.com')}
                >
                  Report Security Incident
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact for Compliance */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Compliance Inquiries</h2>
          <p className="text-gray-600 mb-6">
            For questions about our compliance practices, data protection, or to exercise your rights under GDPR
          </p>
          <div className="space-y-2 text-gray-700">
            <p><strong>Data Protection Officer:</strong> ManiRamaiah@prospectify.com</p>
            <p><strong>Legal Compliance:</strong> legal@prospectify.com</p>
            <p><strong>Privacy Rights:</strong> privacy@prospectify.com</p>
            <p><strong>Address:</strong> Mayor Street Lower, IFSC, Dublin 1, Ireland</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
