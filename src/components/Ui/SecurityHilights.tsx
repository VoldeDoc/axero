import React from "react";
import Lightning from "./Lightning";

const SecurityHighlight: React.FC = () => {
  return (
    <section className="relative overflow-hidden py-16 px-4 md:px-12 flex flex-col md:flex-row items-center justify-between bg-white dark:bg-gray-900 shadow-2xl border border-blue-100 dark:border-blue-900">
      {/* Lightning Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Lightning />
      </div>

      {/* Left: Text Content */}
      <div className="relative z-10 max-w-xl animate-fade-in">
        <h2 className="text-4xl md:text-5xl font-extrabold text-blue-700 dark:text-blue-300 mb-6 flex items-center gap-3 drop-shadow-xl">
          <span className="inline-block animate-pulse text-blue-500">
            <svg width="40" height="40" fill="none" viewBox="0 0 32 32">
              <path d="M16 2 L12 18 H18 L14 30 L28 10 H20 L24 2 Z" fill="url(#lg)" />
              <defs>
                <linearGradient id="lg" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#60a5fa" />
                  <stop offset="1" stopColor="#f472b6" />
                </linearGradient>
              </defs>
            </svg>
          </span>
          <span className="ml-2">The highest standards to help reduce compliance burdens.</span>
        </h2>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-blue-600 dark:text-blue-200 mb-2 animate-fade-in-slow drop-shadow-lg">
            Secure by Design &amp; Persona Based Permissioning
          </h3>
          <p className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4 animate-fade-in-slower drop-shadow">
            Ensure the right people get the correct message, with one click
          </p>
        </div>
        <div className="bg-blue-50 dark:bg-blue-950/60 rounded-xl p-6 shadow-xl border border-blue-200 dark:border-blue-800 mb-8 animate-fade-in-slowest">
          <p className="text-base md:text-lg font-normal text-gray-900 dark:text-blue-100 leading-relaxed drop-shadow">
            Axero is designed to protect your company data while still providing a great user experience.<br />
            Our advanced security is integrated from the ground up, allowing users freedom without compromising protection.<br />
            Automatic permissioning enables you to deliver targeted communications to the groups that need to see them easily and effectively.
          </p>
        </div>
        <div className="flex gap-3 mt-4">
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-blue-200 dark:bg-blue-900 text-blue-800 dark:text-blue-200 font-bold text-sm animate-pulse shadow">
            #SecureByDesign
          </span>
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-pink-200 dark:bg-pink-900 text-pink-800 dark:text-pink-200 font-bold text-sm animate-pulse shadow">
            #PersonaPermissioning
          </span>
        </div>
      </div>

      {/* Right: Security Image */}
      <div className="relative z-10 mt-10 md:mt-0 md:ml-12 flex-shrink-0 flex items-center justify-center animate-float">
        <img
          src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExdHN3djYxcXlycXFnZ29jenRnaHVwZXpldDZjbjZxbTQ4MGt2MHZyciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/yZuOZMlH6weASvw8cf/giphy.gif"
          alt="Security Illustration"
          className="w-72 h-72 object-contain drop-shadow-2xl rounded-2xl border border-blue-200 dark:border-blue-800 bg-white dark:bg-gray-800"
        />
      </div>
      <style>
        {`
          .animate-fade-in {
            animation: fadeIn 1s cubic-bezier(.4,2,.6,.8) both;
          }
          .animate-fade-in-slow {
            animation: fadeIn 1.5s cubic-bezier(.4,2,.6,.8) both;
          }
          .animate-fade-in-slower {
            animation: fadeIn 2s cubic-bezier(.4,2,.6,.8) both;
          }
          .animate-fade-in-slowest {
            animation: fadeIn 2.5s cubic-bezier(.4,2,.6,.8) both;
          }
          @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(24px);}
            100% { opacity: 1; transform: none;}
          }
          .animate-float {
            animation: floatY 2.5s ease-in-out infinite alternate;
          }
          @keyframes floatY {
            0% { transform: translateY(0px);}
            100% { transform: translateY(-18px);}
          }
        `}
      </style>
    </section>
  );
};

export default SecurityHighlight;