import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import { getHeroData } from "@/services/heroService";
import { getAboutData } from "@/services/aboutService";
import { getServices } from "@/services/serviceService";
import { getFeatures } from "@/services/featureService";
import { getPortfolio } from "@/services/portfolioService";
import { getTestimonials } from "@/services/testimonialService";
import { getTeam } from "@/services/teamService";
import { getFaqs } from "@/services/faqService";

// PDF 6: Code splitting - dynamic imports with loading states
const Hero = dynamic(() => import("@/components/sections/Hero"), {
  loading: () => (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-800 animate-pulse flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-500 dark:text-gray-400">Loading Hero...</p>
      </div>
    </div>
  ),
  ssr: true, // Enable SSR for SEO
});

const About = dynamic(() => import("@/components/sections/About"), {
  loading: () => (
    <div className="h-[400px] bg-gray-100 dark:bg-slate-800 animate-pulse flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Loading About...</p>
      </div>
    </div>
  ),
  ssr: true,
});

const Services = dynamic(() => import("@/components/sections/Services"), {
  loading: () => (
    <div className="h-[400px] bg-gray-100 dark:bg-slate-800 animate-pulse flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Loading Services...</p>
      </div>
    </div>
  ),
  ssr: true,
});

const Features = dynamic(() => import("@/components/sections/Features"), {
  loading: () => (
    <div className="h-[300px] bg-gray-100 dark:bg-slate-800 animate-pulse flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Loading Features...</p>
      </div>
    </div>
  ),
  ssr: true,
});

const Portfolio = dynamic(() => import("@/components/sections/Portfolio"), {
  loading: () => (
    <div className="h-[400px] bg-gray-100 dark:bg-slate-800 animate-pulse flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Loading Portfolio...</p>
      </div>
    </div>
  ),
  ssr: true,
});

const Testimonials = dynamic(() => import("@/components/sections/Testimonials"), {
  loading: () => (
    <div className="h-[300px] bg-gray-100 dark:bg-slate-800 animate-pulse flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Loading Testimonials...</p>
      </div>
    </div>
  ),
  ssr: true,
});

const Team = dynamic(() => import("@/components/sections/Team"), {
  loading: () => (
    <div className="h-[300px] bg-gray-100 dark:bg-slate-800 animate-pulse flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Loading Team...</p>
      </div>
    </div>
  ),
  ssr: true,
});

const FAQ = dynamic(() => import("@/components/sections/FAQ"), {
  loading: () => (
    <div className="h-[300px] bg-gray-100 dark:bg-slate-800 animate-pulse flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Loading FAQ...</p>
      </div>
    </div>
  ),
  ssr: true,
});

const Contact = dynamic(() => import("@/components/sections/Contact"), {
  loading: () => (
    <div className="h-[500px] bg-gray-100 dark:bg-slate-800 animate-pulse flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Loading Contact Form...</p>
      </div>
    </div>
  ),
  ssr: true,
});

export default async function Home() {
  // PDF 3: Each section receives its data from the Laravel API
  const [hero, about, services, features, portfolio, testimonials, team, faqs] =
    await Promise.all([
      getHeroData().catch(() => null),
      getAboutData().catch(() => null),
      getServices().catch(() => []),
      getFeatures().catch(() => []),
      getPortfolio().catch(() => []),
      getTestimonials().catch(() => []),
      getTeam().catch(() => []),
      getFaqs().catch(() => []),
    ]);

  return (
    <main className="min-h-screen flex flex-col transition-colors duration-300">
      <Navbar />
      <Hero data={hero} />
      <About data={about} />
      <Services services={services} />
      <Features features={features} />
      <Portfolio items={portfolio} />
      <Testimonials testimonials={testimonials} />
      <Team members={team} />
      <FAQ faqs={faqs} />
      <Contact />
      <Footer />
    </main>
  );
}