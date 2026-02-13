import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleNavClick = (path) => {
    navigate(path); 
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800 selection:bg-green-100 selection:text-green-800">
      
      {/* ================= HERO SECTION (Preserved) ================= */}
      <section className="relative w-full pt-16 pb-24 lg:pt-32 lg:pb-40 overflow-hidden">
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-green-50 rounded-full blur-3xl -z-10 opacity-60"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-50 rounded-full blur-3xl -z-10 opacity-60"></div>

        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="text-left z-10 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-200 text-green-700 text-xs font-bold tracking-widest uppercase mb-8">
                🚀 The Future of Indian Agriculture
              </div>
              <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 mb-6 leading-[1.1]">
                Empowering <br/>
                <span className="text-green-600 relative inline-block">
                  Farmers
                  <svg className="absolute w-full h-3 -bottom-1 left-0 text-green-200 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" /></svg>
                </span> & Buyers
              </h1>
              <p className="text-xl text-gray-500 mb-10 leading-relaxed max-w-lg">
                The all-in-one digital mandi. Sell produce at fair prices, access government schemes, and get expert AI advice instantly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => handleNavClick("/register")}
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl text-lg font-bold transition-all shadow-xl shadow-green-200 hover:-translate-y-1 flex items-center justify-center gap-2"
                >
                  Get Started 🌾
                </button>
                <button 
                  onClick={() => handleNavClick("/buyers/marketplace")}
                  className="bg-white border-2 border-gray-100 hover:border-green-600 text-gray-700 hover:text-green-700 px-8 py-4 rounded-xl text-lg font-bold transition-all hover:-translate-y-1"
                >
                  Explore Market
                </button>
              </div>
              <div className="mt-12 flex items-center gap-6 text-sm font-semibold text-gray-500">
                <div className="flex -space-x-4">
                  <img className="w-12 h-12 rounded-full border-4 border-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop" alt="User" />
                  <img className="w-12 h-12 rounded-full border-4 border-white object-cover" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop" alt="User" />
                  <img className="w-12 h-12 rounded-full border-4 border-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" alt="User" />
                  <div className="w-12 h-12 rounded-full border-4 border-white bg-green-100 text-green-700 flex items-center justify-center text-xs">+2k</div>
                </div>
                <p>Join 15,000+ farmers today.</p>
              </div>
            </div>
            <div className="relative hidden lg:block h-[600px]">
              <div className="absolute right-0 top-0 w-2/3 h-[500px] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white z-10 hover:scale-[1.02] transition-transform duration-500">
                <img 
                  src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80" 
                  alt="Farmer smiling" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <p className="text-white font-bold">Connect Directly</p>
                  <p className="text-green-200 text-sm">No Middlemen</p>
                </div>
              </div>
              <div className="absolute left-0 bottom-20 w-3/5 h-48 rounded-[1.5rem] overflow-hidden shadow-xl border-4 border-white z-20 hover:scale-[1.05] transition-transform duration-500">
                <img 
                  src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=600&q=80" 
                  alt="Fresh produce" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute top-20 left-10 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 z-30 animate-bounce-slow">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                    📈
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-bold uppercase">Market Price</p>
                    <p className="text-green-700 font-bold">Wheat +12% 🔼</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= NEW BOTTOM PART STARTS HERE ================= */}

      {/* --- HOW IT WORKS (Timeline) --- */}
      <section className="py-24 bg-gray-50 relative">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">From Farm to Fork in 3 Steps</h2>
            <p className="text-gray-500 text-lg">We simplify the supply chain so you focus on what matters—growing and selling.</p>
          </div>

          <div className="relative grid md:grid-cols-3 gap-8">
            {/* Connecting Line (Desktop Only) */}
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-gray-300 border-t-2 border-dashed border-gray-300 z-0"></div>

            {[
              { title: "Register & List", desc: "Create a profile and list your crops with photos and prices.", icon: "📝", color: "blue" },
              { title: "Connect & Negotiate", desc: "Buyers contact you directly via chat. Agree on terms securely.", icon: "🤝", color: "green" },
              { title: "Deliver & Earn", desc: "Ship your produce and receive instant payments.", icon: "💰", color: "orange" }
            ].map((step, i) => (
              <div key={i} className="relative z-10 text-center group">
                <div className={`w-24 h-24 mx-auto bg-white rounded-3xl border-4 border-white shadow-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:shadow-${step.color}-200`}>
                  <span className="text-4xl">{step.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-500 px-6 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- WHAT WE OFFER (Interactive Cards) --- */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-green-600 font-bold tracking-widest uppercase text-xs">Our Ecosystem</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2 mb-4">Tools for Modern Farming</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                icon: "🏷️", color: "green", title: "Direct Selling", 
                desc: "List crops at your price. Zero commission fees. 100% Transparency." 
              },
              { 
                icon: "📜", color: "blue", title: "Govt Schemes", 
                desc: "Stay updated with latest subsidies and apply directly through the portal." 
              },
              { 
                icon: "🤖", color: "purple", title: "AI Assistant", 
                desc: "Detect crop diseases and get weather updates in your local language." 
              },
              { 
                icon: "🚚", color: "orange", title: "Smart Logistics", 
                desc: "Track orders live and manage payments with a secure dashboard." 
              }
            ].map((item, i) => (
              <div key={i} className="bg-gray-50 p-8 rounded-[2rem] hover:bg-white hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 group cursor-default">
                <div className={`w-14 h-14 bg-${item.color}-100 rounded-2xl flex items-center justify-center mb-6 text-2xl group-hover:rotate-6 transition-transform`}>
                  {item.icon}
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- STATISTICS STRIP (Dark Mode Contrast) --- */}
      <section className="bg-gray-900 py-16 text-white overflow-hidden relative">
        {/* Background Patterns */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-gray-800">
            {[
              { label: "Active Farmers", val: "50k+" },
              { label: "Transactions", val: "₹10Cr+" },
              { label: "Govt Schemes", val: "200+" },
              { label: "Support", val: "24/7" }
            ].map((stat, i) => (
              <div key={i} className="px-4">
                <h3 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 mb-2">
                  {stat.val}
                </h3>
                <p className="text-green-400 text-sm font-bold uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA CARD (Call to Action) --- */}
      <section className="py-24 px-4 bg-white">
        <div className="container mx-auto max-w-5xl">
          <div className="bg-gradient-to-br from-green-600 to-emerald-800 rounded-[3rem] p-12 md:p-20 text-center text-white shadow-2xl relative overflow-hidden">
            
            {/* Pattern Overlay */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to harvest better profits?</h2>
              <p className="text-green-100 text-lg mb-10 max-w-2xl mx-auto">
                Join thousands of Indian farmers who are getting better prices and smarter insights every day.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => handleNavClick("/register")} 
                  className="bg-white text-green-900 px-10 py-4 rounded-xl font-bold hover:bg-green-50 transition-colors shadow-lg"
                >
                  Join Now - It's Free
                </button>
                <button 
                  onClick={() => handleNavClick("/contact")} 
                  className="bg-transparent border border-white/30 text-white px-10 py-4 rounded-xl font-bold hover:bg-white/10 transition-colors"
                >
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- MODERN DARK FOOTER --- */}
      <footer className="bg-gray-900 text-gray-400 py-16 border-t border-gray-800">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <span className="text-3xl">🌱</span>
                <span className="text-2xl font-bold text-white tracking-tight">KishanSetu</span>
              </div>
              <p className="text-sm leading-relaxed">
                Building a resilient agricultural community through technology, trust, and transparency.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6">Quick Links</h4>
              <ul className="space-y-3 text-sm">
                <li><button onClick={() => handleNavClick("/buyers/marketplace")} className="hover:text-green-400 transition-colors">Marketplace</button></li>
                <li><button onClick={() => handleNavClick("/services")} className="hover:text-green-400 transition-colors">Govt Schemes</button></li>
                <li><button onClick={() => handleNavClick("/chatbot")} className="hover:text-green-400 transition-colors">AI Assistant</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Company</h4>
              <ul className="space-y-3 text-sm">
                <li><button onClick={() => handleNavClick("/about")} className="hover:text-green-400 transition-colors">About Us</button></li>
                <li><button onClick={() => handleNavClick("/contact")} className="hover:text-green-400 transition-colors">Contact</button></li>
                <li><button onClick={() => handleNavClick("/register")} className="hover:text-green-400 transition-colors">Join Us</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Get in Touch</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center"><span className="w-6 opacity-50">📧</span> help@kishansetu.in</li>
                <li className="flex items-center"><span className="w-6 opacity-50">📞</span> 1800-KISHAN-HELP</li>
                <li className="flex items-center"><span className="w-6 opacity-50">📍</span> Bangalore, India</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs">
            <p>&copy; {new Date().getFullYear()} KishanSetu. Made with 💚 in India.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <button className="hover:text-white transition-colors">Privacy</button>
              <button className="hover:text-white transition-colors">Terms</button>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Home;