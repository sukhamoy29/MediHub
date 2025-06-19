import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const PrivacyContent = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
        } else {
          entry.target.classList.remove("animate");
        }
      });
    });

    const currentSection = sectionRef.current;
    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, []);

  return (
    <motion.div
      ref={sectionRef}
      className="max-w-full mx-auto p-4 bg-slate-300 text-gray-900"
      initial={{ opacity: 0, translateY: 100 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mt-16">
        <h1 className="text-2xl font-semibold mb-4">
          # Privacy Policy of MediHub
        </h1>
        <p className="mb-4 text-lg font-sans mt-2">
          We prioritize your privacy and are dedicated to safeguarding your
          personal information. This Privacy Policy explains how we collect,
          use, and protect your data when you use our website and services. By
          accessing our platform, you agree to the practices outlined in this
          policy.
        </p>

        <ol className="list-decimal list-inside space-y-4 text mb-8">
          <li>
            <strong className="text-slate-800">
              Collection of Personal Information:
            </strong>
            We collect personal information that you provide when using our
            site. This includes your name, contact details, and any other
            information necessary to book an appointment with a hospital or
            clinic.
          </li>
          <li>
            <strong className="text-slate-800">
              Use of Personal Information:
            </strong>
            We use your personal information to facilitate the booking of
            appointments and to improve the services offered on our platform. We
            may use this data to contact you for appointments and to provide
            updates on changes to services or policies.
          </li>
          <li>
            <strong className="text-slate-800">Data Security:</strong>
            We take reasonable precautions to protect your personal information.
            We employ various security measures to ensure the safety and
            integrity of your data, including secure servers and encryption
            protocols.
          </li>
          <li>
            <strong className="text-slate-800">Data Sharing:</strong>
            We do not sell, trade, or otherwise transfer your personal
            information to outside parties without your consent, except when
            necessary to provide our services or comply with the law.
          </li>
          <li>
            <strong className="text-slate-800">Cookies and Tracking:</strong>
            Our website uses cookies to enhance your user experience. Cookies
            enable us to understand your preferences and provide more
            personalized services. You can choose to disable cookies through
            your browser settings.
          </li>
          <li>
            <strong className="text-slate-800">
              Access to Personal Information:
            </strong>
            You have the right to access and update your personal information at
            any time. If you wish to review or correct your data, please log
            into your account or contact us for assistance.
          </li>
          <li>
            <strong className="text-slate-800">Third-Party Links:</strong>
            Our website may include links to third-party sites. These sites have
            separate and independent privacy policies. Therefore, we have no
            responsibility or liability for the content and activities of these
            linked sites.
          </li>
          <li>
            <strong className="text-slate-800">
              Changes to Privacy Policy:
            </strong>
            We may update our privacy policy occasionally to reflect changes in
            our practices or for other operational, legal, or regulatory
            reasons. We encourage you to review this policy periodically for any
            updates.
          </li>
        </ol>
      </div>
      <p className="text-lg font-sans mt-2 mb-8">
        If you have any questions, concerns, or feedback about this Privacy
        Policy or how we handle your information, please reach out to us via our
        contact page. Your privacy and trust are our priorities, and we are here
        to assist you.
      </p>
    </motion.div>
  );
};

export default PrivacyContent;
