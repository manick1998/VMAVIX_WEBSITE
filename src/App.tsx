import { useState, useEffect } from 'react';
import { LoadingScreen } from './components/common/LoadingScreen';
import { BackgroundCanvas } from './components/common/BackgroundCanvas';
import { CustomCursor } from './components/common/CustomCursor';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Services } from './components/sections/Services';
import { WhyUs } from './components/sections/WhyUs';
import { Portfolio } from './components/sections/Portfolio';
import { Process } from './components/sections/Process';
import { TechStack } from './components/sections/TechStack';
import { Industries } from './components/sections/Industries';
import { Statistics } from './components/sections/Statistics';
import { Testimonials } from './components/sections/Testimonials';
import { Pricing } from './components/sections/Pricing';
import { FAQ } from './components/sections/FAQ';
import { CTA } from './components/sections/CTA';
import { Footer } from './components/layout/Footer';
import { ProjectBuilderModal } from './components/modals/ProjectBuilderModal';
import { LegalModal } from './components/modals/LegalModal';

export function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');

  // Modal States
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<string | undefined>();
  const [preselectedPlan, setPreselectedPlan] = useState<string | undefined>();
  const [legalModalTitle, setLegalModalTitle] = useState<string | null>(null);

  // Active section scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'services', 'why-us', 'portfolio', 'process', 'tech-stack', 'pricing', 'faq'];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenProjectModal = (service?: string, plan?: string) => {
    setPreselectedService(service);
    setPreselectedPlan(plan);
    setIsProjectModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-orange-500/30 selection:text-white relative">
      {/* 1. Award-Winning Preloader */}
      {isLoading && (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      )}

      {/* 2. Precision Custom Cursor */}
      <CustomCursor />

      {/* 3. Dynamic WebGL Particle & Aurora Canvas */}
      <BackgroundCanvas />

      {/* Main Website Structure */}
      <div className="relative z-10">
        <Navbar
          activeSection={activeSection}
          onOpenProjectModal={() => handleOpenProjectModal()}
        />

        <main>
          <Hero
            onOpenProjectModal={() => handleOpenProjectModal()}
          />

          <About />

          <Services
            onOpenProjectModalWithService={(serviceName) =>
              handleOpenProjectModal(serviceName)
            }
          />

          <WhyUs />

          <Portfolio />

          <Process />

          <TechStack />

          <Industries />

          <Statistics />

          <Testimonials />

          <Pricing
            onOpenProjectModalWithPlan={(planName) =>
              handleOpenProjectModal(undefined, planName)
            }
          />

          <FAQ />

          <CTA
            onOpenProjectModal={() => handleOpenProjectModal()}
          />
        </main>

        <Footer
          onOpenProjectModal={() => handleOpenProjectModal()}
          onOpenLegalModal={(title) => setLegalModalTitle(title)}
        />
      </div>

      {/* Interactive Project Proposal Configurator Modal */}
      <ProjectBuilderModal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
        preselectedService={preselectedService}
        preselectedPlan={preselectedPlan}
      />

      {/* Legal & Security Modal */}
      <LegalModal
        title={legalModalTitle}
        onClose={() => setLegalModalTitle(null)}
      />
    </div>
  );
}

export default App;
