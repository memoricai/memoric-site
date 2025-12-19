import React from 'react';
import { Card } from '@/components/ui/card';

export function PrivacyPolicy() {
  return (
    <div className="w-full bg-slate-50 py-12 md:py-16 lg:py-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <Card className="p-6 md:p-8 lg:p-10 border-2 border-slate-100">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-6 md:mb-8">
            Memoric AI Privacy Policy
          </h1>

          <div className="prose prose-slate max-w-none space-y-6 text-sm md:text-base">
            <p className="text-slate-700 leading-relaxed">
              Effective Date: 1 January 2026
            </p>

            <p className="text-slate-700 leading-relaxed">
              Memoric AI LLP is committed to protecting your privacy. This Privacy Policy describes how we
              collect, use, and disclose the personal information we receive from users of our online
              training sessions, websites, and services (collectively, the "Service").
            </p>

            <section>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mt-8 mb-4">
                1. Information We Collect
              </h2>
              <p className="text-slate-700 leading-relaxed ml-4">
                We collect information that identifies, relates to, describes, references, is capable of being
                associated with, or could reasonably be linked, directly or indirectly, with a particular user ("Personal
                Information").
              </p>

              <h3 className="text-lg md:text-xl font-semibold text-slate-900 mt-4 mb-2 ml-4">
                A. Information You Provide to Us
              </h3>
              <p className="text-slate-700 leading-relaxed ml-6">
                This information is collected when you register for a course, make a purchase, or contact us:
              </p>
              <ul className="list-disc list-inside text-slate-700 leading-relaxed ml-8">
                <li><strong>Identity Data:</strong> Name, email address, phone number, and billing address.</li>
                <li><strong>Payment Data:</strong> While we do not store your full card details, transactional information such
                  as payment method used, transaction ID, date, and amount are processed by our payment gateway.</li>
                <li><strong>Registration Data:</strong> Login credentials, course progress, and certification details.</li>
              </ul>

              <h3 className="text-lg md:text-xl font-semibold text-slate-900 mt-4 mb-2 ml-4">
                B. Information Collected Automatically
              </h3>
              <p className="text-slate-700 leading-relaxed ml-6">
                When you interact with our website or training portal:
              </p>
              <ul className="list-disc list-inside text-slate-700 leading-relaxed ml-8">
                <li><strong>Usage Data:</strong> Details about your use of our Service, including time spent on pages, courses
                  viewed, IP address, browser type, and operating system.</li>
                <li><strong>Device Data:</strong> Information about the device you use to access the Service (e.g., hardware
                  model, unique device identifiers).</li>
                <li><strong>Cookies and Tracking:</strong> We use cookies and similar tracking technologies to monitor and
                  analyze the use of our Service and to gather demographic information.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mt-8 mb-4">
                2. How We Use Your Information
              </h2>
              <p className="text-slate-700 leading-relaxed ml-4">
                We use the collected information for the following purposes:
              </p>
              <ul className="list-disc list-inside text-slate-700 leading-relaxed ml-8">
                <li><strong>Service Provision:</strong> To process your registration, provide you with access to the live sessions
                  and recorded content, and issue course certificates.</li>
                <li><strong>Transaction Processing:</strong> To process and fulfill your orders, including communicating with you
                  about your purchase and managing refunds.</li>
                <li><strong>Customer Support:</strong> To respond to your inquiries, provide technical support, and resolve
                  issues related to the Service.</li>
                <li><strong>Communication:</strong> To send you service updates, marketing communications (which you may
                  opt-out of), and information about new courses.</li>
                <li><strong>Improvement:</strong> To analyze usage data to improve our course content, website functionality,
                  and user experience.</li>
                <li><strong>Compliance:</strong> To comply with legal obligations, including tax and GST requirements (e.g.,
                  generating GST-compliant invoices).</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mt-8 mb-4">
                3. Disclosure and Sharing of Your Information
              </h2>
              <p className="text-slate-700 leading-relaxed ml-4">
                We share your Personal Information only in limited circumstances:
              </p>
              <ul className="list-disc list-inside text-slate-700 leading-relaxed ml-8">
                <li><strong>Payment Processor (Razorpay):</strong> We share your necessary payment details (name, email,
                  billing amount, and transaction identifier) with our third-party payment gateway, <span className='font-bold'>Razorpay</span>, to process your
                  course fees securely. <span className='font-bold'>Razorpay handles and secures your credit/debit card and net banking details; we do
                    not store them.</span></li>
                <li><strong>Service Providers:</strong> We may share data with third-party vendors who perform services on our
                  behalf, such as cloud hosting providers, analytics services, and email communication platforms.</li>
                <li><strong>Legal Compliance:</strong> We will disclose your information where required to do so by law, in
                  response to a court order, or to protect our rights or the safety of our users.</li>
                <li><strong>Business Transfer:</strong> If we are involved in a merger, acquisition, or sale of assets, your
                  Personal Information may be transferred as part of that transaction.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mt-8 mb-4">
                4. Data Security
              </h2>
              <p className="text-slate-700 leading-relaxed ml-4">
                We implement reasonable security measures, including physical, technical, and administrative
                safeguards, to protect your Personal Information from unauthorized access, use, or disclosure.
                However, no method of transmission over the Internet or method of electronic storage is 100%
                secure.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mt-8 mb-4">
                5. Your Rights
              </h2>
              <p className="text-slate-700 leading-relaxed ml-4">
                Depending on where you are located, you may have the following rights regarding your personal
                data:
              </p>
              <ul className="list-disc list-inside text-slate-700 leading-relaxed ml-8">
                <li><strong>Access:</strong> You can request a copy of the Personal Information we hold about you.</li>
                <li><strong>Correction/Update:</strong> You can request that we correct any inaccurate or incomplete data we
                  hold about you.</li>
                <li><strong>Opt-out:</strong> You can opt-out of receiving marketing and promotional emails from us by
                  following the unsubscribe link in those emails.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mt-8 mb-4">
                6. Contact Information
              </h2>
              <p className="text-slate-700 leading-relaxed ml-4">
                If you have any questions or concerns about this Privacy Policy or our data practices, please contact
                us at:
              </p>
              <p className="text-slate-700 leading-relaxed ml-4 font-bold">
                Memoric AI LLP<br />
                A-703, Adarsh Esplanade, 25th Cross, 12th A Main, HSR Layout,<br />
                Bangalore 560102, Karnataka, India<br />
                Email: support@memoricai.in
              </p>
            </section>
          </div>
        </Card>
      </div>
    </div>
  );
}

// ------------------------- Terms and Conditions -------------------------

export function TermsAndConditions() {
  return (
    <div className="w-full bg-slate-50 py-12 md:py-16 lg:py-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <Card className="p-6 md:p-8 lg:p-10 border-2 border-slate-100">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-6 md:mb-8">
            Memoric AI Terms and Conditions of Service
          </h1>

          <div className="prose prose-slate max-w-none space-y-6 text-sm md:text-base">

            <p className="text-slate-700 leading-relaxed">
              Effective Date: 1 January 2026
            </p>

            <p className="text-slate-700 leading-relaxed">
              These Terms and Conditions ("Terms") govern your use of the website, products, and online training
              services ("Service") provided by <span className='font-bold'>Memoric AI LLP, Bangalore, Karnataka.</span>
            </p>

            <section>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mt-8 mb-4">
                1. Acceptance of Terms
              </h2>
              <p className="text-slate-700 leading-relaxed ml-4">
                By accessing, browsing, registering for, or purchasing any Service, you agree to be bound by these
                Terms and Conditions and acknowledge that you have read and understood our <span className='font-bold'>Privacy Policy and
                  Cancellation and Refund Policy</span>, which are incorporated herein by reference.
              </p>
              <p className="text-slate-700 leading-relaxed ml-4 mt-2">
                You must be at least 18 years of age or have attained the legal age of majority in your jurisdiction to
                purchase and use our services.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mt-8 mb-4">
                2. Description of Service
              </h2>
              <p className="text-slate-700 leading-relaxed ml-4">
                <span className='font-bold'>Memoric AI LLP</span> provides online educational services focused on AI and related technologies. The
                Service includes, but is not limited to, live interactive training sessions, downloadable course
                materials (videos, PDFs, code files), and certification upon completion.
              </p>
              <p className="text-slate-700 leading-relaxed ml-4 mt-2">
                We reserve the right to modify, suspend, or discontinue any course or feature of the Service at any
                time, with or without notice.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mt-8 mb-4">
                3. Payment and Billing
              </h2>
              <p className="text-slate-700 leading-relaxed ml-4">
                <strong>Pricing:</strong> All course fees are listed in Indian Rupees (INR) and are subject to applicable Goods and
                Services Tax (GST) as per Indian law.
              </p>
              <p className="text-slate-700 leading-relaxed ml-4 mt-2">
                <strong>Payment Gateway:</strong> All payments are processed securely through our authorized payment gateway, <span className='font-bold'>Razorpay</span>. By making a payment, you agree to comply with Razorpay's terms of service and privacy policy. We are not responsible for any failures or issues arising from the payment gateway.
              </p>
              <p className="text-slate-700 leading-relaxed ml-4 mt-2">
                <strong>Accuracy:</strong> You agree to provide current, complete, and accurate purchase and account information for all purchases made via the Service.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mt-8 mb-4">
                4. Intellectual Property Rights (The Core Protection)
              </h2>
              <p className="text-slate-700 leading-relaxed ml-4">
                The content of the training sessions is our most valuable asset. This clause is critical.
              </p>
              <p className="text-slate-700 leading-relaxed ml-4 mt-2">
                <strong>Ownership:</strong> All content, including but not limited to course materials, videos, graphics, text, code,
                templates, logos, and trademarks, are the exclusive property of Memoric AI LLP and are protected
                by Indian and International copyright laws.
              </p>
              <p className="text-slate-700 leading-relaxed ml-4 mt-2">
                <strong>Limited License:</strong> Upon purchase, you are granted a <span className='font-bold'>limited, non-exclusive, non-transferable, and
                  revocable license</span> to access and view the course materials <span className='font-bold'>solely for your personal, non-commercial
                    educational use.</span>
              </p>
              <p className="text-slate-700 leading-relaxed ml-4 mt-2">
                <strong>Prohibited Use:</strong> You must <span className='font-bold'>not</span> reproduce, redistribute, transmit, sell, publish, modify, or create
                derivative works from any part of the course materials without our prior written consent. This
                includes, but is not limited to:
              </p>
              <ul className="list-disc list-inside text-slate-700 leading-relaxed ml-8">
                <li>Sharing your login credentials with any third party.</li>
                <li>Recording, sharing, or streaming the live sessions.</li>
                <li>Using the course content to create or teach a competing course or service.</li>
              </ul>
              <p className="text-slate-700 leading-relaxed ml-4 mt-2">
                <strong>Violations:</strong> Any violation of this Intellectual Property clause will result in immediate termination of
                your access to the Service without refund, and may subject you to legal action for damages.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mt-8 mb-4">
                5. Termination of Access
              </h2>
              <p className="text-slate-700 leading-relaxed ml-4">
                We may suspend or terminate your access to the Service immediately, without prior notice or
                liability, for any reason, including without limitation if you breach these Terms.
              </p>
              <ul className="list-disc list-inside text-slate-700 leading-relaxed ml-8">
                <li>Upon termination, your right to use the Service will immediately cease.</li>
                <li>Termination due to a breach of these Terms (e.g., intellectual property violation) will <span className='font-bold'>not</span>
                  entitle you to any refund.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mt-8 mb-4">
                6. Disclaimer of Warranties and Limitation of Liability
              </h2>
              <p className="text-slate-700 leading-relaxed ml-4">
                This clause limits your financial and legal exposure.
              </p>
              <ul className="list-disc list-inside text-slate-700 leading-relaxed ml-8">
                <li><strong>No Guarantee:</strong> You acknowledge that the training is provided for educational purposes only.
                  We make <span className='font-bold'>no guarantees, representations, or warranties</span> regarding the results, specific job
                  placement, or income you may achieve from taking our courses. Your success depends on your own
                  effort, background, and dedication.</li>
                <li><strong>Service "As Is":</strong> The Service is provided on an "as is" and "as available" basis. We disclaim all
                  warranties, express or implied, including, but not limited to, implied warranties of merchantability
                  and fitness for a particular purpose.</li>
                <li><strong>Limitation of Liability:</strong> To the maximum extent permitted by law, <span className='font-bold'>Memoric AI LLP</span> shall not
                  be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of
                  profits or revenues, whether incurred directly or indirectly. Our total liability to you for any damages
                  arising out of or related to these Terms or your use of the Service shall <span className='font-bold'>not exceed the total amount
                    you paid to us for the specific course in question.</span></li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mt-8 mb-4">
                7. Governing Law and Jurisdiction
              </h2>
              <p className="text-slate-700 leading-relaxed ml-4">
                These Terms shall be governed and construed in accordance with the laws of <span className='font-bold'>India</span>, without regard
                to its conflict of law provisions.
              </p>
              <p className="text-slate-700 leading-relaxed ml-4 mt-2">
                You agree that the courts located in <span className='font-bold'>Bangalore, Karnataka</span> shall
                have exclusive jurisdiction to resolve any dispute or claim arising out of or relating to these Terms
                or your use of the Service.
              </p>
            </section>

          </div>
        </Card>
      </div>
    </div>
  );
}

// ------------------------- Refund Policy -------------------------

export function RefundPolicy() {
  return (
    <div className="w-full bg-slate-50 py-12 md:py-16 lg:py-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <Card className="p-6 md:p-8 lg:p-10 border-2 border-slate-100">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-6 md:mb-8">
            Memoric AI Cancellation & Refund Policy
          </h1>

          <div className="prose prose-slate max-w-none space-y-6 text-sm md:text-base">

            <p className="text-slate-700 leading-relaxed">
              <span className="font-bold">Memoric AI LLP</span> is committed to transparency. This policy applies to all purchases of our online
              training sessions and courses via Razorpay.
            </p>

            <section>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mt-8 mb-4">
                1. Refund Eligibility Criteria
              </h2>
              <p className="text-slate-700 leading-relaxed">
                Refunds are <span className='font-bold'>only</span> eligible if the following criteria are strictly met:
              </p>

              <div className="overflow-x-auto">
                <table className="table-auto w-full border border-slate-300 text-slate-700 not-prose">
                  <thead>
                    <tr className="bg-slate-100">
                      <th className="border border-slate-300 px-4 py-2 text-left font-bold">Scenario</th>
                      <th className="border border-slate-300 px-4 py-2 text-left font-bold">Condition</th>
                      <th className="border border-slate-300 px-4 py-2 text-left font-bold">Refund Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-slate-300 px-4 py-2 font-bold">Early Cancellation</td>
                      <td className="border border-slate-300 px-4 py-2">Request received <span className='font-bold'>at least 72 hours prior</span> to the scheduled start time of the live session.</td>
                      <td className="border border-slate-300 px-4 py-2 font-bold">100% of the Course Fee</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="border border-slate-300 px-4 py-2 font-bold">Medium-Term Cancellation</td>
                      <td className="border border-slate-300 px-4 py-2">Request received <span className='font-bold'>between 24 hours and 72 hours prior</span> to the scheduled start time.</td>
                      <td className="border border-slate-300 px-4 py-2 font-bold">50% of the Course Fee (or full credit for a future batch, at customer's choice)</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-300 px-4 py-2 font-bold">Course Cancellation by Us</td>
                      <td className="border border-slate-300 px-4 py-2">If <span className='font-bold'>Memoric AI LLP cancels</span> the course/batch entirely due to unforeseen circumstances.</td>
                      <td className="border border-slate-300 px-4 py-2 font-bold">100% of the Course Fee</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mt-8 mb-4">
                2. Non-Refundable Scenarios
              </h2>
              <p className="text-slate-700 leading-relaxed">
                No refund will be provided under the following circumstances, as the service is considered fully or partially consumed:
              </p>
              <ul className="list-disc list-inside text-slate-700 leading-relaxed ml-4">
                <li><span className='font-bold'>Late Cancellation:</span> Request received <span className='font-bold'>less than 24 hours</span> prior to the scheduled start time.</li>
                <li><span className='font-bold'>No-Show:</span> Failure to attend the scheduled live session.</li>
                <li><span className='font-bold'>Content Access:</span> If the participant has accessed, downloaded, or viewed <span className='font-bold'>any</span> bundled digital material, videos, or course recordings.</li>
                <li><span className='font-bold'>Mid-Course Withdrawal:</span> Once the session has commenced or the refund window has expired, no prorated refund will be issued.</li>
                <li><span className='font-bold'>Breach of T&C:</span> If the participant's access is terminated due to a violation of the Terms and Conditions.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mt-8 mb-4">
                3. Refund Process and Deductions
              </h2>
              <ul className="list-disc list-inside text-slate-700 leading-relaxed ml-4">
                <li><span className='font-bold'>Request Method:</span> All cancellation and refund requests must be submitted via email to <span className='font-bold'>support@memoricai.in</span> with the course name and transaction ID.</li>
                <li>
                  <span className='font-bold'>Deductions:</span> All approved refunds will be processed after deducting non-refundable administrative and financial charges, which typically include:
                  <ul className="list-disc list-inside text-slate-700 leading-relaxed ml-6">
                    <li>Payment Gateway charges (Razorpay fees)</li>
                    <li>Applicable Goods and Services Tax (GST) on the consumed portion</li>
                    <li>Cost of any specific physical or proprietary digital material already delivered</li>
                  </ul>
                </li>
                <li><span className='font-bold'>Processing Time:</span> Approved refunds will be credited back to the original payment source within <span className='font-bold'>7 to 14 business days</span> from the date of refund approval.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mt-8 mb-4">
                4. Governing Law
              </h2>
              <p className="text-slate-700 leading-relaxed">
                Any dispute arising from this policy shall be governed by the laws of India, and the Courts of <span className='font-bold'>Bangalore, Karnataka</span> shall have exclusive jurisdiction.
              </p>
            </section>

          </div>
        </Card>
      </div>
    </div>
  );
}
