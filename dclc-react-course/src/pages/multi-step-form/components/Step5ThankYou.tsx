import React from "react";

const Step5ThankYou: React.FC = () => {
  return (
    <div className="max-w-md flex flex-col items-center justify-center py-12">
      <img
        src="/images/icon-thank-you.svg"
        alt="Thank you"
        className="w-16 h-16 mb-6"
      />
      <h1 className="text-2xl md:text-3xl font-bold text-blue-950 mb-4">
        Thank you!
      </h1>
      <p className="text-grey-500 text-center leading-relaxed">
        Thanks for confirming your subscription! We hope you have fun using our
        platform. If you ever need support, please feel free to email us at
        support@loremgaming.com.
      </p>
    </div>
  );
};

export default Step5ThankYou;
