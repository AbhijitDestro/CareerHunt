import React from 'react';
import { FaQuoteLeft } from 'react-icons/fa';

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "Product Designer at Stripe",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    content: "CareerHunt completely changed my job search experience. The AI matching was spot on, and I landed my dream job in just two weeks!",
  },
  {
    name: "Michael Chen",
    role: "Senior Developer at Google",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    content: "The quality of job listings here is unmatched. No spam, just high-quality opportunities from top-tier tech companies.",
  },
  {
    name: "Emily Rodriguez",
    role: "Marketing Director at Airbnb",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    content: "I recruited my entire core team through CareerHunt. The candidate profiles are detailed and the filter system is a lifesaver.",
  },
];

const Testimonials = () => {
    return (
        <section className="bg-[#0d0d12] py-24 px-4 md:px-8 relative">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-white mb-4">Creating Success Stories</h2>
                    <p className="text-gray-400">Don't just take our word for it.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((t, idx) => (
                        <div key={idx} className="bg-[#13131f] p-8 rounded-3xl border border-white/5 relative hover:-translate-y-2 transition-transform duration-300">
                            <FaQuoteLeft className="text-[#1178bd]/20 text-4xl mb-6" />
                            <p className="text-gray-300 mb-8 leading-relaxed">
                                "{t.content}"
                            </p>
                            <div className="flex items-center gap-4">
                                <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full border-2 border-[#1178bd]" />
                                <div>
                                    <h4 className="text-white font-bold">{t.name}</h4>
                                    <p className="text-sm text-gray-400">{t.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
