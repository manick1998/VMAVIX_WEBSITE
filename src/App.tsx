import { useCallback, useEffect, useState } from "react";
import { LoadingScreen } from "./components/common/LoadingScreen";
import { BackgroundCanvas } from "./components/common/BackgroundCanvas";
import { CustomCursor } from "./components/common/CustomCursor";
import { ProjectBuilderModal } from "./components/modals/ProjectBuilderModal";
import { LegalModal } from "./components/modals/LegalModal";
import { SECTION_IDS } from "./data/vmavixData";
import { useActiveSection } from "./hooks/useActiveSection";
import { useIsMobile } from "./hooks/useIsMobile";
import type { ProjectItem, ServiceItem } from "./types";

/* Desktop */
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
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

/* Mobile — a separate experience, not a reflow of the desktop one */
import { MobileDock } from "./components/mobile/MobileDock";
import { FloatingContact } from "./components/mobile/FloatingContact";
import { MobileHero } from "./components/mobile/MobileHero";
import { MobileAbout } from "./components/mobile/MobileAbout";
import { MobileServices } from "./components/mobile/MobileServices";
import { MobileWhyUs } from "./components/mobile/MobileWhyUs";
import { MobilePortfolio } from "./components/mobile/MobilePortfolio";
import { MobileStack } from "./components/mobile/MobileStack";
import { MobileTestimonials } from "./components/mobile/MobileTestimonials";
import { MobileFAQ } from "./components/mobile/MobileFAQ";
import { MobileCTA } from "./components/mobile/MobileCTA";
import { MobileFooter } from "./components/mobile/MobileFooter";
import { MobileServiceSheet } from "./components/mobile/MobileServiceSheet";
import { MobileProjectSheet } from "./components/mobile/MobileProjectSheet";

export function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<string | undefined>();
  const [legalModalTitle, setLegalModalTitle] = useState<string | null>(null);

  // Mobile detail sheets
  const [activeService, setActiveService] = useState<ServiceItem | null>(null);
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  const isMobile = useIsMobile();
  const { activeSection, isScrolled } = useActiveSection(SECTION_IDS);

  useEffect(() => {
    document.body.classList.toggle("modal-open", isLoading);
    return () => document.body.classList.remove("modal-open");
  }, [isLoading]);

  const openProjectModal = useCallback((service?: string) => {
    setPreselectedService(service);
    setIsProjectModalOpen(true);
  }, []);

  const closeProjectModal = useCallback(() => setIsProjectModalOpen(false), []);

  return (
    <div className="relative min-h-screen bg-ink text-white selection:bg-brand-orange/30">
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100000] focus:rounded-full focus:bg-brand-orange focus:px-5 focus:py-3 focus:text-sm focus:font-bold focus:text-white"
      >
        Skip to main content
      </a>

      {!isMobile && <CustomCursor />}
      <BackgroundCanvas />

      {isMobile ? (
        /* ---------------- MOBILE APP EXPERIENCE ---------------- */
        <div className="relative z-10">
          <main id="main">
            <MobileHero onOpenProjectModal={() => openProjectModal()} />
            <MobileAbout />
            <MobileServices
              onOpenProjectModalWithService={openProjectModal}
              onOpenService={setActiveService}
            />
            <MobileWhyUs />
            <MobilePortfolio onOpenProject={setActiveProject} />
            <MobileStack />
            <MobileTestimonials />
            <MobileFAQ />
            <MobileCTA onOpenProjectModal={() => openProjectModal()} />
          </main>

          <MobileFooter onOpenLegalModal={setLegalModalTitle} />

          <MobileDock
            activeSection={activeSection}
            onOpenProjectModal={() => openProjectModal()}
          />
          <FloatingContact onOpenProjectModal={() => openProjectModal()} />

          <MobileServiceSheet
            service={activeService}
            onClose={() => setActiveService(null)}
            onRequest={(goal) => {
              setActiveService(null);
              openProjectModal(goal);
            }}
          />
          <MobileProjectSheet
            project={activeProject}
            onClose={() => setActiveProject(null)}
            onRequest={() => {
              setActiveProject(null);
              openProjectModal();
            }}
          />
        </div>
      ) : (
        /* ---------------- DESKTOP ---------------- */
        <div className="relative z-10">
          <Navbar
            activeSection={activeSection}
            isScrolled={isScrolled}
            onOpenProjectModal={() => openProjectModal()}
          />

          <main id="main">
            <Hero onOpenProjectModal={() => openProjectModal()} />
            <About />
            <Services onOpenProjectModalWithService={openProjectModal} />
            <WhyUs />
            <Portfolio />
            <TechStack />
            <Industries />
            <Statistics />
            <Testimonials />
            <FAQ />
            <CTA onOpenProjectModal={() => openProjectModal()} />
          </main>

          <Footer
            onOpenProjectModal={() => openProjectModal()}
            onOpenLegalModal={setLegalModalTitle}
          />

          <FloatingContact onOpenProjectModal={() => openProjectModal()} />
        </div>
      )}

      <ProjectBuilderModal
        isOpen={isProjectModalOpen}
        onClose={closeProjectModal}
        preselectedService={preselectedService}
      />

      <LegalModal title={legalModalTitle} onClose={() => setLegalModalTitle(null)} />
    </div>
  );
}

export default App;
