import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Briefcase, Target, Zap, Users, ArrowRight, CheckCircle2, BarChart3, ShieldCheck, Globe, Star } from "lucide-react";
import Button from "../components/ui/Button";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background font-sans text-primary overflow-hidden selection:bg-accent/20">
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-6 lg:pt-40 lg:pb-32">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-full pointer-events-none z-0">
          <div className="absolute top-[10%] left-[10%] w-[35rem] h-[35rem] rounded-full bg-accent/10 blur-[80px]" />
          <div className="absolute top-[20%] right-[10%] w-[25rem] h-[25rem] rounded-full bg-secondary/10 blur-[80px]" />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-black/5 shadow-sm mb-8 text-sm font-semibold text-primary/70">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              CareerPoint 2.0 is live
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1] text-primary">
              Where ambitious talent <br className="hidden md:block" />
              meets <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent">top companies.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-primary/60 mb-10 max-w-2xl mx-auto leading-relaxed">
              A smarter way to track applications, discover tailored opportunities, and hire the best candidates. Skip the noise and find your perfect fit today.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/register">
                <Button className="w-full sm:w-auto px-8 py-3.5 text-base shadow-premium hover:shadow-lg transition-all duration-300">
                  Get started for free
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" className="w-full sm:w-auto px-8 py-3.5 text-base bg-white/50 backdrop-blur-sm border-black/10">
                  Sign in to account
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Faux Dashboard UI Preview */}
          <motion.div 
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-20 mx-auto max-w-4xl relative"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 top-1/2" />
            <div className="bg-white rounded-t-2xl border border-black/10 shadow-2xl overflow-hidden flex flex-col h-64 md:h-96 relative z-0 ring-1 ring-black/5">
              {/* Fake Window Header */}
              <div className="h-10 border-b border-black/5 bg-background/50 flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              {/* Fake Content */}
              <div className="flex flex-1 overflow-hidden p-6 gap-6 bg-[#FAFAFA]">
                <div className="w-48 hidden md:flex flex-col gap-3">
                  <div className="h-8 bg-black/5 rounded-lg w-full" />
                  <div className="h-8 bg-black/5 rounded-lg w-3/4" />
                  <div className="h-8 bg-black/5 rounded-lg w-5/6" />
                </div>
                <div className="flex-1 flex flex-col gap-4">
                  <div className="flex gap-4">
                    <div className="h-24 bg-white border border-black/5 rounded-xl flex-1 shadow-sm" />
                    <div className="h-24 bg-white border border-black/5 rounded-xl flex-1 shadow-sm" />
                    <div className="h-24 bg-white border border-black/5 rounded-xl flex-1 shadow-sm" />
                  </div>
                  <div className="h-full bg-white border border-black/5 rounded-xl shadow-sm" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bento Grid Features Section */}
      <section className="py-24 px-6 relative z-10 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Everything you need, nothing you don't.</h2>
            <p className="text-lg text-primary/60">
              Designed specifically for modern job seekers and forward-thinking companies. A unified platform built for speed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Large Card */}
            <motion.div whileHover={{ y: -5 }} className="md:col-span-2 bg-background p-8 rounded-3xl border border-black/5 flex flex-col justify-between overflow-hidden relative group">
              <div className="relative z-10 mb-20 md:mb-0">
                <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-primary mb-6">
                  <Target size={24} />
                </div>
                <h3 className="text-2xl font-bold mb-2">Smart Application Tracking</h3>
                <p className="text-primary/60 max-w-md">
                  Keep tabs on every application from the moment you hit send until you sign the offer. Visual pipelines make organization effortless.
                </p>
              </div>
              <div className="absolute right-[-10%] bottom-[-20%] md:w-96 md:h-64 bg-white rounded-t-xl border border-black/10 shadow-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500 hidden md:block">
                <div className="p-4 border-b border-black/5 flex gap-2"><div className="w-20 h-4 bg-black/5 rounded-full" /></div>
                <div className="p-4 space-y-3"><div className="w-full h-8 bg-black/5 rounded-md" /><div className="w-full h-8 bg-black/5 rounded-md" /></div>
              </div>
            </motion.div>

            {/* Small Card 1 */}
            <motion.div whileHover={{ y: -5 }} className="bg-primary text-white p-8 rounded-3xl border border-primary-dark flex flex-col relative overflow-hidden">
              <div className="absolute top-[-20%] right-[-20%] w-40 h-40 rounded-full bg-accent/30 blur-[40px]" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-accent-light mb-6 border border-white/10">
                  <Zap size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2">Perfect-Fit Matching</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Our algorithm pairs your unique skills with roles where you'll thrive, cutting out irrelevant noise.
                </p>
              </div>
            </motion.div>

            {/* Small Card 2 */}
            <motion.div whileHover={{ y: -5 }} className="bg-white p-8 rounded-3xl border border-black/10 shadow-soft flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-background flex items-center justify-center text-primary mb-6">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Verified Companies</h3>
              <p className="text-primary/60 text-sm leading-relaxed">
                Apply with confidence. Every employer on our platform is vetted to ensure quality opportunities.
              </p>
            </motion.div>

            {/* Large Card 2 */}
            <motion.div whileHover={{ y: -5 }} className="md:col-span-2 bg-background p-8 rounded-3xl border border-black/5 flex flex-col justify-between overflow-hidden relative">
              <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-primary mb-6">
                <BarChart3 size={24} />
              </div>
              <h3 className="text-2xl font-bold mb-2">Real-Time Insights</h3>
              <p className="text-primary/60 max-w-md">
                Get notified the exact moment an employer views your profile or updates your application status. Never stay in the dark.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 px-6 border-t border-b border-black/5 bg-background">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-md">
            <h3 className="text-2xl font-bold mb-4">Trusted by modern teams and ambitious professionals.</h3>
            <div className="flex items-center gap-2 text-accent">
              {[1, 2, 3, 4, 5].map(i => <Star key={i} size={20} fill="currentColor" />)}
            </div>
            <p className="mt-2 text-sm font-semibold text-primary/60">Based on 10,000+ reviews</p>
          </div>
          <div className="flex flex-wrap gap-10 opacity-50 justify-center">
            <div className="flex items-center gap-2 font-bold text-xl"><Globe size={24} /> Acme Corp</div>
            <div className="flex items-center gap-2 font-bold text-xl"><Users size={24} /> Globex</div>
            <div className="flex items-center gap-2 font-bold text-xl"><Zap size={24} /> Initech</div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center bg-primary rounded-3xl p-12 md:p-20 relative overflow-hidden shadow-premium">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-dark to-primary opacity-90" />
          <div className="absolute top-[-50%] left-[-20%] w-[40rem] h-[40rem] bg-accent/20 rounded-full blur-[100px]" />
          
          <div className="relative z-10 text-white">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">Ready to elevate your career?</h2>
            <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed">
              Join the platform designed to make hiring and getting hired a seamless, elegant experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button variant="accent" className="px-10 py-4 text-lg w-full sm:w-auto hover:bg-white hover:text-primary">
                  Create free account
                </Button>
              </Link>
            </div>
            <p className="text-white/40 text-sm mt-6">Takes less than 2 minutes.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-16 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-12 mb-16">
          <div className="col-span-2">
            <Link to="/" className="text-xl font-extrabold tracking-tight flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white">
                <Briefcase size={16} />
              </div>
              CareerPoint
            </Link>
            <p className="text-primary/50 text-sm leading-relaxed max-w-xs mt-6">
              Connecting ambitious job seekers with the world's most innovative companies through a beautiful, seamless platform.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-6 tracking-tight">Product</h4>
            <div className="flex flex-col gap-4 text-sm font-semibold text-primary/50">
              <Link to="#" className="hover:text-primary transition-colors">Features</Link>
              <Link to="#" className="hover:text-primary transition-colors">Pricing</Link>
              <Link to="#" className="hover:text-primary transition-colors">Changelog</Link>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-6 tracking-tight">Resources</h4>
            <div className="flex flex-col gap-4 text-sm font-semibold text-primary/50">
              <Link to="#" className="hover:text-primary transition-colors">Help Center</Link>
              <Link to="#" className="hover:text-primary transition-colors">Career Advice</Link>
              <Link to="#" className="hover:text-primary transition-colors">Salary Guide</Link>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-6 tracking-tight">Company</h4>
            <div className="flex flex-col gap-4 text-sm font-semibold text-primary/50">
              <Link to="#" className="hover:text-primary transition-colors">About Us</Link>
              <Link to="#" className="hover:text-primary transition-colors">Contact</Link>
              <Link to="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto pt-8 border-t border-black/5 flex flex-col md:flex-row items-center justify-between gap-4 text-sm font-semibold text-primary/40">
          <div>© {new Date().getFullYear()} CareerPoint. All rights reserved.</div>
          <div className="flex items-center gap-6">
            <Link to="#" className="hover:text-primary transition-colors">Twitter</Link>
            <Link to="#" className="hover:text-primary transition-colors">LinkedIn</Link>
            <Link to="#" className="hover:text-primary transition-colors">GitHub</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;