import React from 'react';

const NewsLetter = () => {
  return (
    <div className="flex flex-col md:flex-row border border-gray-200 rounded-lg items-start md:items-center justify-between gap-8 text-sm max-w-7xl bg-white p-6 md:p-8 mx-auto mt-24 pb-14 mb-14">
      {/* Left Section */}
      <div className="max-w-md w-full">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-700">
          Subscribe to our newsletter 
        </h1>
        <p className="text-gray-500 mt-2">
          Stay updated with the latest news, articles, and exclusive offers. No spam, we promise!
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
          <input
            className="py-2 px-3 w-full sm:w-auto flex-grow outline-none focus:ring-2 focus:ring-primary transition border border-gray-300 rounded-md"
            type="email"
            placeholder="Enter your email"
          />
          <button className="bg-primary hover:bg-primary-600 transition-all px-6 py-2 rounded text-white font-medium">
            Subscribe
          </button>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Weekly Articles */}
        <div className="space-y-4 md:max-w-xs">
          <div className="flex items-center gap-3">
            <div className="bg-gray-100 p-3 rounded">
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.834 20.167H9.167c-3.457 0-5.186 0-6.26-1.074s-1.074-2.802-1.074-6.26V11c0-3.457 0-5.185 1.074-6.26 1.074-1.073 2.803-1.073 6.26-1.073h3.667c3.456 0 5.185 0 6.259 1.074s1.074 2.802 1.074 6.26v1.833c0 3.457 0 5.185-1.074 6.259-.599.599-1.401.864-2.593.981M6.417 3.667V2.292m9.167 1.375V2.292m4.125 5.958H9.854m-8.02 0h3.552"
                  stroke="#6B7280"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <h3 className="text-base font-medium text-gray-800">Weekly articles</h3>
          </div>
          <p className="text-gray-500">
            Get curated articles and insights delivered to your inbox every week.
          </p>
        </div>

        {/* No Spam */}
        <div className="space-y-4 md:max-w-xs">
          <div className="flex items-center gap-3">
            <div className="bg-gray-100 p-3 rounded">
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.834 3.208v6.875-5.958a1.375 1.375 0 1 1 2.75 0v5.958-3.208a1.375 1.375 0 1 1 2.75 0v7.791a5.5 5.5 0 0 1-5.5 5.5H11.8a5.5 5.5 0 0 1-3.76-1.486l-4.546-4.261a1.594 1.594 0 1 1 2.218-2.291l1.623 1.623V5.958a1.375 1.375 0 1 1 2.75 0v4.125-6.875a1.375 1.375 0 1 1 2.75 0"
                  stroke="#6B7280"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="text-base font-medium text-gray-800">No spam</h3>
          </div>
          <p className="text-gray-500">
            We respect your privacy and ensure no spam emails.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;