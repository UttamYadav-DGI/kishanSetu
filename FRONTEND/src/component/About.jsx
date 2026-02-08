import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Leaf, 
  Users, 
  Workflow, 
  ChevronDown, 
  TrendingUp, 
  ShieldCheck, 
  Truck,
  ArrowRight,
  Check
} from "lucide-react";

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans overflow-x-hidden text-slate-900">
      
      {/* --- HERO SECTION --- */}
      <div className="relative bg-gradient-to-b from-green-100/50 to-white pt-20 pb-24 px-6 overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 translate-x-1/2 -translate-y-1/2"></div>

        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-4xl mx-auto text-center relative z-10"
        >
          <motion.div variants={itemVariants} className="inline-block mb-4 px-4 py-1.5 rounded-full bg-green-100 text-green-700 text-sm font-medium border border-green-200">
            🌱 Revolutionizing Agriculture
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
            About <span className="text-green-600">KishanSetu</span>
          </motion.h1>
          
          <motion.p variants={itemVariants} className="text-xl text-slate-600 mb-8 leading-relaxed max-w-2xl mx-auto">
            We bridge the gap between hard-working farmers and conscious buyers using cutting-edge technology to ensure fair trade and fresh produce.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg shadow-green-600/20 transition-all active:scale-95">
              Get Started
            </button>
            <button className="bg-white hover:bg-slate-50 text-green-700 border border-green-200 px-8 py-4 rounded-xl text-lg font-semibold transition-all active:scale-95">
              Learn More
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* --- STATS SECTION --- */}
      <div className="bg-white py-12 border-y border-slate-100">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <StatItem number="5000+" label="Active Farmers" />
          <StatItem number="1200+" label="Daily Orders" />
          <StatItem number="150+" label="Cities Covered" />
          <StatItem number="₹2Cr+" label="Direct Earnings" />
        </div>
      </div>

      {/* --- MISSION & VISION --- */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-slate-900">Empowering the Hands that Feed Us</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Traditional supply chains are cluttered with middlemen, causing farmers to lose profits and buyers to pay inflated prices. 
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              <strong>KishanSetu</strong> changes the game by creating a transparent digital marketplace. We handle the logistics, payments, and trust—so farmers can focus on growing.
            </p>
            <ul className="space-y-3 mt-4">
              <CheckListItem text="Zero Commission for Small Farmers" />
              <CheckListItem text="Instant Digital Payments" />
              <CheckListItem text="Real-time Market Pricing" />
            </ul>
          </div>
          <div className="relative h-96 w-full rounded-3xl overflow-hidden shadow-2xl">
            {/* Placeholder image using a colored div if image fails, or use an actual img tag */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-600 to-green-800 flex items-center justify-center text-green-100">
              <img 
                src="https://images.unsplash.com/photo-1625246333195-58f216418018?q=80&w=1974&auto=format&fit=crop" 
                alt="Farmer using technology" 
                className="object-cover w-full h-full opacity-80 hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* --- FEATURES GRID --- */}
      <section className="py-20 bg-slate-100/50 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Choose Us?</h2>
            <p className="text-slate-600 text-lg">Built for simplicity, speed, and security.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Leaf className="w-8 h-8 text-green-600" />} 
              title="Fresh from Source" 
              description="Listing crops directly from the harvest ensures maximum freshness for buyers." 
            />
            <FeatureCard 
              icon={<ShieldCheck className="w-8 h-8 text-blue-600" />} 
              title="Secure Payments" 
              description="Escrow-based payment systems protect both the buyer and the farmer." 
            />
            <FeatureCard 
              icon={<TrendingUp className="w-8 h-8 text-orange-600" />} 
              title="Fair Pricing" 
              description="AI-driven suggestions help farmers set competitive yet profitable prices." 
            />
            <FeatureCard 
              icon={<Truck className="w-8 h-8 text-purple-600" />} 
              title="Smart Logistics" 
              description="Integrated delivery partners ensure crops reach the destination safely." 
            />
            <FeatureCard 
              icon={<Users className="w-8 h-8 text-teal-600" />} 
              title="Community Support" 
              description="Access to agricultural experts and community forums for farming tips." 
            />
            <FeatureCard 
              icon={<Workflow className="w-8 h-8 text-red-600" />} 
              title="Easy Dashboard" 
              description="A simple, vernacular interface designed for non-tech-savvy users." 
            />
          </div>
        </div>
      </section>

      {/* --- INTERACTIVE FLOW --- */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-slate-900 mb-16">How It Works</h2>
        <div className="relative">
          {/* Connector Line (Desktop only) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-green-200 via-green-400 to-green-200 -translate-y-1/2 z-0 rounded"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
            <FlowStep number="01" title="List Crop" icon={<Leaf />} delay={0} />
            <FlowStep number="02" title="Buyer Connects" icon={<Users />} delay={0.2} />
            <FlowStep number="03" title="Secure Deal" icon={<ShieldCheck />} delay={0.4} />
            <FlowStep number="04" title="Fast Delivery" icon={<Truck />} delay={0.6} />
          </div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section className="py-20 bg-green-900 text-white px-6 md:rounded-t-[4rem] rounded-t-[2rem] mt-12">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <AccordionItem 
              question="Is there a registration fee for farmers?" 
              answer="No! Registration is completely free for farmers. We only charge a small platform fee on successful transactions." 
            />
            <AccordionItem 
              question="How do I get paid?" 
              answer="Payments are processed directly to your linked bank account within 24 hours of successful delivery confirmation." 
            />
            <AccordionItem 
              question="Can I sell in small quantities?" 
              answer="Yes, KishanSetu supports both wholesale bulk orders and smaller consumer-direct quantities." 
            />
          </div>
        </div>
      </section>

      {/* --- CTA FOOTER --- */}
      <div className="bg-white py-16 text-center px-6">
        <h2 className="text-3xl font-bold text-slate-900 mb-6">Ready to transform your trade?</h2>
        <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl transition-all flex items-center gap-2 mx-auto active:scale-95">
          Join KishanSetu Now <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}

// --- Sub-Components (Defined locally for portability) ---

function StatItem({ number, label }) {
  return (
    <div className="p-4 flex flex-col items-center">
      <h3 className="text-3xl md:text-4xl font-extrabold text-green-600 mb-1">{number}</h3>
      <p className="text-slate-500 font-medium">{label}</p>
    </div>
  );
}

function CheckListItem({ text }) {
  return (
    <div className="flex items-center gap-3 text-slate-700 font-medium">
      <div className="p-1 bg-green-100 rounded-full flex-shrink-0">
        <Check className="w-4 h-4 text-green-600" />
      </div>
      <span>{text}</span>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl border border-slate-200 transition-all duration-300"
    >
      <div className="mb-5 bg-green-50 w-14 h-14 rounded-xl flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-800 mb-3">{title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
}

function FlowStep({ number, title, icon, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 text-center relative group"
    >
      <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-green-600 group-hover:text-white transition-colors duration-300">
        {React.cloneElement(icon, { size: 28 })}
      </div>
      <div className="absolute top-4 right-4 text-4xl font-black text-slate-100 -z-0 select-none">
        {number}
      </div>
      <h3 className="font-bold text-lg text-slate-800 relative z-10">{title}</h3>
    </motion.div>
  );
}

function AccordionItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-green-800/50 rounded-xl overflow-hidden mb-3 border border-green-700/30">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-5 text-left font-semibold text-green-50 hover:bg-green-800/50 transition-colors"
      >
        <span>{question}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={20} />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-5 pt-0 text-green-100/80 leading-relaxed text-sm">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}