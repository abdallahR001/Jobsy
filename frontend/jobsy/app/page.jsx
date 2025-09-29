import Link from "next/link";
import Main from "./components/LandingPageMainSection/LandingPageMainSection";
import { Briefcase, Users, Sparkles, TrendingUp, Star, CheckCircle, ArrowRight, Play, Zap, Target, Shield, Award, Globe, MessageCircle } from "lucide-react";

export default function Home() {
  return (
    <>
      <Main />
      
      {/* Stats Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Trusted by <span className="text-indigo-600">Thousands</span> Worldwide
            </h2>
            <p className="text-xl text-gray-600">Join the fastest-growing job platform</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-3xl p-8 border border-indigo-100 group-hover:shadow-xl transition-shadow duration-300">
                <div className="text-4xl font-bold text-indigo-600 mb-2">50K+</div>
                <div className="text-gray-600 font-semibold">Active Jobs</div>
              </div>
            </div>
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 border border-green-100 group-hover:shadow-xl transition-shadow duration-300">
                <div className="text-4xl font-bold text-green-600 mb-2">100K+</div>
                <div className="text-gray-600 font-semibold">Job Seekers</div>
              </div>
            </div>
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl p-8 border border-purple-100 group-hover:shadow-xl transition-shadow duration-300">
                <div className="text-4xl font-bold text-purple-600 mb-2">5K+</div>
                <div className="text-gray-600 font-semibold">Companies</div>
              </div>
            </div>
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-3xl p-8 border border-orange-100 group-hover:shadow-xl transition-shadow duration-300">
                <div className="text-4xl font-bold text-orange-600 mb-2">95%</div>
                <div className="text-gray-600 font-semibold">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full font-semibold mb-4">
              <Zap className="w-4 h-4" />
              Simple Process
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Get Hired in <span className="text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text">3 Easy Steps</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our streamlined process makes job hunting effortless and efficient
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="group text-center relative">
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Target className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">1. Create Profile</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Build your professional profile with our AI-powered resume builder and showcase your skills
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-6 w-12 h-12 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full flex items-center justify-center z-10">
                <ArrowRight className="w-6 h-6 text-white" />
              </div>
            </div>

            <div className="group text-center relative">
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Briefcase className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">2. Find Jobs</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Browse thousands of opportunities with smart filters and get personalized job recommendations
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-6 w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center z-10">
                <ArrowRight className="w-6 h-6 text-white" />
              </div>
            </div>

            <div className="group text-center">
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Award className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">3. Get Hired</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Apply with one click, track your applications, and land your dream job faster than ever
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full font-semibold mb-4">
              <MessageCircle className="w-4 h-4" />
              Success Stories
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              What Our <span className="text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text">Users Say</span>
            </h2>
            <p className="text-xl text-gray-600">Real stories from real people who found their dream jobs</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="flex items-center gap-2 mb-6">
                {[1,2,3,4,5].map((star) => (
                  <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                "Found my dream job in just 2 weeks! The AI-powered matching is incredible. Jobsy made the whole process so smooth and stress-free."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold">
                  S
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Sarah Johnson</div>
                  <div className="text-gray-500">Software Engineer</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="flex items-center gap-2 mb-6">
                {[1,2,3,4,5].map((star) => (
                  <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                "As a recruiter, Jobsy has revolutionized how we find talent. The quality of candidates is outstanding, and the platform is so intuitive."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center text-white font-bold">
                  M
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Mike Chen</div>
                  <div className="text-gray-500">HR Director</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="flex items-center gap-2 mb-6">
                {[1,2,3,4,5].map((star) => (
                  <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                "The resume builder with AI suggestions helped me land 3 interviews in my first week. This platform is a game-changer!"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold">
                  A
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Alex Rivera</div>
                  <div className="text-gray-500">Marketing Specialist</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 py-24 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full font-semibold mb-8">
            <Sparkles className="w-4 h-4" />
            Start Your Journey
          </div>
          <h2 className="text-6xl font-bold text-white mb-6">
            Ready to Find Your <span className="text-yellow-300">Dream Job?</span>
          </h2>
          <p className="text-2xl text-indigo-100 mb-12 leading-relaxed">
            Join thousands of professionals who've already transformed their careers with Jobsy
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href={"/login/jobseeker"} className="group bg-white text-indigo-600 px-12 py-5 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-white/25 hover:scale-105 transition-all duration-300">
              <span className="flex items-center gap-3">
                Get Started Free
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </Link>
            {/* <button className="group border-2 border-white text-white px-12 py-5 rounded-2xl font-bold text-xl hover:bg-white hover:text-indigo-600 transition-all duration-300">
              <span className="flex items-center gap-3">
                <Play className="w-6 h-6" />
                Watch Demo
              </span>
            </button> */}
          </div>
          
          <div className="mt-12 flex items-center justify-center gap-8 text-white/80">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-300" />
              <span>Free to start</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-300" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-300" />
              <span>Setup in minutes</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="text-4xl font-bold mb-4">
              <span className="text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text">Jobsy</span>
            </div>
            <p className="text-gray-400 text-lg">Where careers take flight ✈️</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="text-xl font-bold mb-4">For Job Seekers</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Browse Jobs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Resume Builder</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Career Advice</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Salary Guide</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">For Employers</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Post Jobs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Find Candidates</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Employer Branding</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Mobile App</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Jobsy. All rights reserved. Made with 💜 for ambitious professionals.</p>
          </div>
        </div>
      </footer>
    </>
  );
}