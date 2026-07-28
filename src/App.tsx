import { useCallback, useEffect, useState } from "react";
import { LoadingScreen } from "./components/common/LoadingScreen";
import { BackgroundCanvas } from "./components/common/BackgroundCanvas";
import { CustomCursor } from "./components/common/CustomCursor";
import { Navbar } from "./components/layout/Navbar";
import { Hero } from "./components/sections/Hero";
import { About } from "./components/sections/About";
import { Services } from "./components/sections/Services";
import { WhyUs } from "./components/sections/WhyUs";
import { Portfolio } from "./components/sections/Portfolio";
import { TechStack } from "./components/sections/TechStack";
import { Industries } from "./components/sections/Industries";
import { Statistics } from "./components/sections/Statistics";
import { Testimonials } from "./components/sections/Testimonials";
import { FAQ } from "./components/sections/FAQ";
import { CTA } from "./components/sections/CTA";
import { Footer } from "./components/layout/Footer";
import { ProjectBuilderModal } from "./components/modals/ProjectBuilderModal";
import { LegalModal } from "./components/modals/LegalModal";
import { SECTION_IDS } from "./data/vmavixData";
import { useActiveSection } from "./hooks/useActiveSection";

export function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<string | undefined>();
  const [legalModalTitle, setLegalModalTitle] = useState<string | null>(null);

  const { activeSection, isScrolled } = useActiveSection(SECTION_IDS);

  // Don't let the page scroll behind the intro.
  useEffect(() => {
    document.body.classList.toggle("modal-open", isLoading);
    return () => document.body.classList.remove("modal-open");
  }, [isLoading]);

  const handleOpenProjectModal = useCallback((service?: string) => {
    setPreselectedService(service);
    setIsProjectModalOpen(true);
  }, []);

  const handleCloseProjectModal = useCallback(() => {
    setIsProjectModalOpen(false);
  }, []);

  return (
    <div className="relative min-h-screen bg-ink text-white selection:bg-brand-orange/30">
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100000] focus:rounded-full focus:bg-brand-orange focus:px-5 focus:py-3 focus:text-sm focus:font-bold focus:text-white"
      >
        Skip to main content
      </a>

      <CustomCursor />
      <BackgroundCanvas />

      <div className="relative z-10">
        <Navbar
          activeSection={activeSection}
          isScrolled={isScrolled}
          onOpenProjectModal={() => handleOpenProjectModal()}
        />

        <main id="main">
          <Hero onOpenProjectModal={() => handleOpenProjectModal()} />
          <About />
          <Services onOpenProjectModalWithService={handleOpenProjectModal} />
          <WhyUs />
          <Portfolio />
          <TechStack />
          <Industries />
          <Statistics />
          <Testimonials />
          <FAQ />
          <CTA onOpenProjectModal={() => handleOpenProjectModal()} />
        </main>

        <Footer
          onOpenProjectModal={() => handleOpenProjectModal()}
          onOpenLegalModal={setLegalModalTitle}
        />
      </div>

      <ProjectBuilderModal
        isOpen={isProjectModalOpen}
        onClose={handleCloseProjectModal}
        preselectedService={preselectedService}
      />

      <LegalModal title={legalModalTitle} onClose={() => setLegalModalTitle(null)} />
    </div>
  );
}

export default App;
