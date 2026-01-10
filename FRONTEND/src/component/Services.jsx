// Services.jsx
import React, { useState } from "react";
import { schemes as dummySchemes } from "./dummySchemes";
import ChatBot from "./ChatBot";
import ChatBotWrapper from "./ChatBotWrapper";

const Services = (chatLang={ chatLang }) => {
  const [search, setSearch] = useState("");

  // Filter schemes based on search input
  const filteredSchemes = dummySchemes.filter((scheme) =>
    scheme.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-green-50 py-10 px-4">
      
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-green-800 mb-4">Our Services</h1>
        <p className="text-gray-700 max-w-2xl mx-auto">
          Find information on government schemes, land records, Bhulekh, and more, all in one place.
        </p>
      </header>

      {/* Search Bar */}
      <div className="max-w-md mx-auto mb-12">
        <input
          type="text"
          placeholder="Search for schemes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Schemes Section */}
      <section className="max-w-6xl mx-auto mb-16">
        <h2 className="text-2xl font-semibold text-green-700 mb-6">Government Schemes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchemes.length > 0 ? (
            filteredSchemes.map((scheme) => (
              <div
                key={scheme.id}
                className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-green-700 font-semibold text-xl mb-2">{scheme.name}</h3>
                <p className="text-gray-600 mb-2">{scheme.description}</p>
                <p className="text-gray-500 mb-4">Deadline: {scheme.deadline}</p>
                <a
                  href={scheme.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-white bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700 transition-all"
                >
                  Apply Now
                </a>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">No schemes found.</p>
          )}
        </div>
      </section>

      {/* ChatBot Section */}
      <section className="max-w-3xl mx-auto mb-16">
        <h2 className="text-2xl font-semibold text-green-700 mb-6 text-center">AI Crop Advisory</h2>
        <ChatBotWrapper chatLang={chatLang} />
      </section>

     {/* // Services.jsx (only the Market Prices section updated) */}
<section className="max-w-6xl mx-auto mb-16">
  <div className="p-6 bg-white rounded-xl shadow-md">
    <h2 className="text-2xl font-semibold text-green-700 mb-4">Market Prices & Crop Advisory</h2>
    <p className="text-gray-600 mb-4">
      Get daily crop prices and AI-based advice for pests, fertilizers, and weather conditions.
    </p>

    {/* Dynamic Market Prices Table */}
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead className="bg-green-100">
          <tr>
            <th className="text-left py-2 px-4 border-b">Crop</th>
            <th className="text-left py-2 px-4 border-b">Price (₹/kg)</th>
            <th className="text-left py-2 px-4 border-b">Market</th>
            <th className="text-left py-2 px-4 border-b">Date</th>
          </tr>
        </thead>
        <tbody>
          {[
            { crop: "Wheat", price: 210, market: "Delhi Mandi", date: "26-09-2025" },
            { crop: "Rice", price: 45, market: "Lucknow Mandi", date: "26-09-2025" },
            { crop: "Maize", price: 170, market: "Bangalore Mandi", date: "26-09-2025" },
            { crop: "Sugarcane", price: 310, market: "Patna Mandi", date: "26-09-2025" },
          ].map((item, idx) => (
            <tr key={idx} className="hover:bg-green-50 transition-colors">
              <td className="py-2 px-4 border-b">{item.crop}</td>
              <td className="py-2 px-4 border-b">{item.price}</td>
              <td className="py-2 px-4 border-b">{item.market}</td>
              <td className="py-2 px-4 border-b">{item.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Check Prices Button */}
    <div className="mt-4">
      <a
        href={"https://enam.gov.in/web/dashboard/trade-data"}
        target="_blank"
        rel="noreferrer"
        className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-all"
      >
        Check Official Prices
      </a>
    </div>
  </div>
</section>


    </div>
  );
};

export default Services;
