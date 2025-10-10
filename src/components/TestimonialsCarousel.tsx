import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { testimonials } from '../data/mockData';

export default function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, currentIndex]);

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-24 bg-slate-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium">
              <Quote className="w-4 h-4 mr-2" />
              Customer Success Stories
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            What Our Traders Are Saying
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Real results from real traders who have transformed their trading with our Expert Advisors.
          </p>
        </div>

        <div className="relative">
          {/* Main Testimonial Card */}
          <div className="bg-slate-900 rounded-2xl p-8 md:p-12 border border-slate-800 shadow-2xl">
            <div className="text-center max-w-4xl mx-auto">
              <Quote className="w-12 h-12 text-emerald-500/20 mx-auto mb-6" />

              <blockquote className="text-2xl md:text-3xl text-white font-light leading-relaxed mb-8">
                "{currentTestimonial.content}"
              </blockquote>

              <div className="flex items-center justify-center mb-6">
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-500 fill-current mr-1" />
                ))}
              </div>

              <div className="flex items-center justify-center">
                <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-500 font-bold text-xl mr-4">
                  {currentTestimonial.customerName.charAt(0)}
                </div>
                <div className="text-left">
                  <div className="text-white font-semibold text-lg">{currentTestimonial.customerName}</div>
                  {currentTestimonial.customerTitle && (
                    <div className="text-slate-400">{currentTestimonial.customerTitle}</div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={() => {
              prevTestimonial();
              setIsAutoPlaying(false);
            }}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-slate-800 hover:bg-slate-700 text-white rounded-full flex items-center justify-center transition-all duration-300 shadow-lg border border-slate-700"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={() => {
              nextTestimonial();
              setIsAutoPlaying(false);
            }}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-slate-800 hover:bg-slate-700 text-white rounded-full flex items-center justify-center transition-all duration-300 shadow-lg border border-slate-700"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  goToTestimonial(index);
                  setIsAutoPlaying(false);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-emerald-500 shadow-lg shadow-emerald-500/50'
                    : 'bg-slate-600 hover:bg-slate-500'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: '4.9/5', label: 'Average Rating', icon: '⭐' },
            { value: '500+', label: 'Happy Customers', icon: '👥' },
            { value: '98%', label: 'Satisfaction Rate', icon: '🎯' },
            { value: '24/7', label: 'Support Available', icon: '💬' }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-emerald-500 mb-1">{stat.value}</div>
              <div className="text-sm text-slate-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
