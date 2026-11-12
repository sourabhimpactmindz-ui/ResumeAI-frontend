import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ParticleField from "../components/ParticleField";
import { Button } from "../components/Button";
import { Badge } from "../components/Badge";
import FloatingWrapper from "../components/animations/FloatingWrapper";
import { Compass, Home, Sparkles } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="relative min-h-screen bg-deep-space text-c-100 flex flex-col justify-between overflow-hidden selection:bg-c-100 selection:text-c-900">
      <ParticleField count={24} />
      <Navbar />

      <main className="relative z-10 w-full max-w-2xl mx-auto px-6 py-40 text-center flex flex-col items-center justify-center">
        <FloatingWrapper y={16} duration={5.8}>
          <div className="w-24 h-24 rounded-3xl bg-c-800/80 border border-c-700/80 shadow-[0_0_30px_rgba(155,168,171,0.15)] flex items-center justify-center text-c-100 mb-6 mx-auto">
            <Compass size={44} />
          </div>
        </FloatingWrapper>

        <Badge variant="warning" className="mb-4">
          Error 404 · Zero Gravity Loss
        </Badge>

        <h1 className="font-heading font-extrabold text-4xl sm:text-6xl text-c-100 tracking-tight mb-4">
          Lost in deep space.
        </h1>

        <p className="text-sm sm:text-base text-c-300 font-sans max-w-md mx-auto mb-8 leading-relaxed">
          The coordinate or page you were aiming for has drifted beyond our detection radar. Let's get you back on course.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Button to="/" variant="primary" size="md" icon={<Home size={16} />}>
            Return to Orbit (Home)
          </Button>
          <Button to="/scanner" variant="secondary" size="md" icon={<Sparkles size={16} />}>
            Open ATS Scanner
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}

