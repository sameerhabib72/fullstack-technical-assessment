import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Services from '@/components/sections/Services';
import Features from '@/components/sections/Features';
import Portfolio from '@/components/sections/Portfolio';
import Testimonials from '@/components/sections/Testimonials';
import Team from '@/components/sections/Team';
import FAQ from '@/components/sections/FAQ';
import Contact from '@/components/sections/Contact';

import { getHeroData } from '@/services/heroService';
import { getAboutData } from '@/services/aboutService';
import { getServices } from '@/services/serviceService';
// import { getFeatures } from '@/services/';
import { getFeatures } from '@/services/featureService'
import { getPortfolio } from '@/services/portfolioService';
import { getTestimonials } from '@/services/testimonialService';
import { getTeam } from '@/services/teamService';
import { getFaqs } from '@/services/faqService';

export default async function Home() {
    // PDF 3: Each section receives its data from the Laravel API
    const [hero, about, services, features, portfolio, testimonials, team, faqs] = await Promise.all([
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