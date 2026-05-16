import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroSection from '../sections/HeroSection';
import AboutSection from '../sections/AboutSection';
import SkillsSection from '../sections/SkillsSection';
import ProjectsSection from '../sections/ProjectsSection';
import ExperienceSection from '../sections/ExperienceSection';
import VolunteeringSection from '../sections/VolunteeringSection';
import GallerySection from '../sections/GallerySection';
import ContactSection from '../sections/ContactSection';
import DotNav from '../components/DotNav';

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />
      <DotNav />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <VolunteeringSection />
        <GallerySection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
