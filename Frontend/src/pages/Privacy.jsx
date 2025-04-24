import React from 'react';
import Title from '../components/Title';

function Privacy() {
  return (
    <div className="min-h-screen p-12 pt-32 text-white bg-gradient-to-b from-[#0c081c] to-[#1a073e]">
        <div className='flex justify-center '>
        <Title text1={"Privacy"} text2={"Policy"} />
        </div>


      <p>Effective Date: 25/04/2025</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
      <p className='mb-10'>
        We collect the following types of information to provide and improve our services:
        <ul className="list-disc ml-6">
          <li><strong>Personal Information</strong>: When you register an account or interact with Skillora, we collect information such as your name, email address, role (mentor or student), and other details.</li>
          <li><strong>Profile Data</strong>: Your profile may include additional personal and professional details, including your skills, experience, and profile picture.</li>
          <li><strong>Usage Data</strong>: This includes session data, IP addresses, device information, browser type, and access timestamps.</li>
          <li><strong>Payment Information</strong>: If applicable, we collect billing and payment information for transaction purposes.</li>
        </ul>
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. How We Use Your Information</h2>
      <p className='mb-10'>
        We use your information for the following purposes:
        <ul className="list-disc ml-6">
          <li>To create and manage your Skillora account.</li>
          <li>To personalize our services, including mentoring and student matching.</li>
          <li>To process payments and maintain your account.</li>
          <li>To communicate with you about updates, news, and support.</li>
          <li>To monitor and improve platform performance and security.</li>
          <li>To comply with legal obligations.</li>
        </ul>
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. How We Share Your Information</h2>
      <p className='mb-10'>
        We do not share your personal information except in the following cases:
        <ul className="list-disc ml-6">
          <li>With service providers who assist in delivering our services (e.g., payment processors, hosting providers).</li>
          <li>If required by law, in response to legal requests, or to protect our rights and users.</li>
          <li>With your explicit consent.</li>
        </ul>
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Data Security</h2>
      <p className='mb-10'>
        We implement reasonable measures to protect your data, but cannot guarantee absolute security.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Your Choices and Rights</h2>
      <p className='mb-10'>
        You have the following rights:
        <ul className="list-disc ml-6">
          <li>Access and update your information at any time through your profile.</li>
          <li>Delete your account and data, subject to legal retention requirements.</li>
          <li>Opt-out of marketing communications by following the unsubscribe instructions.</li>
        </ul>
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">6. Cookies and Tracking Technologies</h2>
      <p className='mb-10'>
        We use cookies to enhance your experience. You can manage your preferences through browser settings, but disabling cookies may affect certain platform features.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">7. Contact Us</h2>
      <p className='mb-10'>
        If you have any questions, please contact us at:
        <br />
        <strong>Email:</strong> atharvakadam631@gmail.com <br />
      </p>
    </div>
  );
}

export default Privacy;
