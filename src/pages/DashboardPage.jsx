import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ParticleField from "../components/ParticleField";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { Badge } from "../components/Badge";
import ScoreRing from "../components/ScoreRing";
import { EmptyState } from "../components/Skeleton";
import StaggerFromEdges from "../components/animations/StaggerFromEdges";
import {
  Sparkles,
  TrendingUp,
  FileText,
  Clock,
  ArrowRight,
  Plus,
  Target,
  CheckCircle2,
  Trash2,
  Eye,
} from "lucide-react";
import { toast } from "react-toastify";

export default function DashboardPage() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("Rohit");

  // Dynamic greeting based on current local time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const [scanHistory, setScanHistory] = useState([
    {
      id: "scan-1",
      role: "Senior Fullstack Engineer",
      company: "Stripe",
      date: "Nov 08, 2026",
      score: 88,
      matchingCount: 16,
      missingCount: 2,
      fileName: "Rohit_Verma_Resume_v4.pdf",
    },
    {
      id: "scan-2",
      role: "Lead Frontend Developer",
      company: "Figma",
      date: "Nov 03, 2026",
      score: 74,
      matchingCount: 12,
      missingCount: 5,
      fileName: "Rohit_Verma_Resume_v3.pdf",
    },
    {
      id: "scan-3",
      role: "Software Engineer II",
      company: "Google Cloud",
      date: "Oct 25, 2026",
      score: 58,
      matchingCount: 8,
      missingCount: 9,
      fileName: "Rohit_Verma_Resume_v1.pdf",
    },
  ]);

  const handleDeleteScan = (id) => {
    setScanHistory((prev) => prev.filter((s) => s.id !== id));
    toast.success("Scan removed from history.");
  };

  return (
    <div className="relative min-h-screen bg-deep-space text-c-100 overflow-x-hidden selection:bg-c-100 selection:text-c-900">
      <ParticleField count={26} />
      <Navbar />

      <main className="relative z-10 w-full max-w-6xl mx-auto px-6 pt-32 pb-24">
        {/* Top Header & Greeting */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <Badge variant="status" pulsing={true}>
                Candidate Command Center
              </Badge>
            </div>
            <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-c-100 tracking-tight">
              {getGreeting()}, {userName} 👋
            </h1>
            <p className="mt-1 text-sm text-c-300 font-sans">
              Here is your resume benchmark telemetry and recruiter match progression.
            </p>
          </div>

          <Button
            to="/scanner"
            variant="primary"
            size="lg"
            icon={<Plus size={18} />}
            className="shadow-[0_12px_32px_rgba(204,208,207,0.35)] shrink-0"
          >
            Launch New ATS Scan
          </Button>
        </div>

        {/* Telemetry Overview: 3 Quick Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="p-7 flex flex-col justify-between" glow={true}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-heading font-bold text-c-300">
                LATEST ATS SCORE
              </span>
              <span className="text-xs font-heading font-extrabold px-2 py-0.5 rounded-full bg-c-success/20 text-c-success">
                Top 8%
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-heading font-extrabold text-4xl text-c-100">88</span>
              <span className="text-xs text-c-600 uppercase font-bold">/ 100</span>
            </div>
            <p className="text-xs text-c-600 font-sans mt-3">
              Passed Workday & Greenhouse automated filters.
            </p>
          </Card>

          <Card className="p-7 flex flex-col justify-between" glow={true}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-heading font-bold text-c-300">
                SCORE PROGRESSION
              </span>
              <TrendingUp size={16} className="text-c-success" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-heading font-extrabold text-4xl text-c-success">+30 pts</span>
            </div>
            <p className="text-xs text-c-600 font-sans mt-3">
              58 → 74 → 88 over your last 3 diagnostic revisions.
            </p>
          </Card>

          <Card className="p-7 flex flex-col justify-between" glow={true}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-heading font-bold text-c-300">
                FORMATTING TRAPS
              </span>
              <CheckCircle2 size={16} className="text-c-success" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-heading font-extrabold text-4xl text-c-100">0 Traps</span>
            </div>
            <p className="text-xs text-c-600 font-sans mt-3">
              Clean linear UTF-8 text structure with zero column parsing breaks.
            </p>
          </Card>
        </div>

        {/* Visual Trend Chart Banner */}
        <Card className="p-8 md:p-10 mb-14 bg-gradient-to-r from-c-800 to-c-800/60" glow={true}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-heading font-extrabold text-xl text-c-100">
                ATS Score Lift Telemetry
              </h3>
              <p className="text-xs text-c-600 font-sans mt-0.5">
                Benchmark scores plotted across your revision iterations
              </p>
            </div>
            <Badge variant="success">+51% Lift</Badge>
          </div>

          {/* Styled SVG Trend Line Chart */}
          <div className="relative w-full h-44 bg-c-900/80 rounded-2xl border border-c-700/60 p-4 flex items-end justify-between overflow-hidden shadow-inner">
            {/* Grid line guides */}
            <div className="absolute inset-x-0 top-1/4 border-b border-c-700/30" />
            <div className="absolute inset-x-0 top-2/4 border-b border-c-700/30" />
            <div className="absolute inset-x-0 top-3/4 border-b border-c-700/30" />

            <div className="relative z-10 flex flex-col items-center gap-2">
              <span className="text-[11px] font-heading font-bold text-c-error">58</span>
              <div className="w-10 sm:w-16 h-16 rounded-xl bg-c-error/30 border border-c-error/50 flex items-center justify-center text-xs text-c-100" />
              <span className="text-[10px] text-c-600 font-sans">Oct 25 (v1)</span>
            </div>

            <div className="relative z-10 flex flex-col items-center gap-2">
              <span className="text-[11px] font-heading font-bold text-c-warning">74</span>
              <div className="w-10 sm:w-16 h-28 rounded-xl bg-c-warning/30 border border-c-warning/50 flex items-center justify-center text-xs text-c-100" />
              <span className="text-[10px] text-c-600 font-sans">Nov 03 (v3)</span>
            </div>

            <div className="relative z-10 flex flex-col items-center gap-2">
              <span className="text-[11px] font-heading font-bold text-c-success">88</span>
              <div className="w-10 sm:w-16 h-36 rounded-xl bg-c-success/30 border border-c-success/50 flex items-center justify-center text-xs text-c-100 shadow-[0_0_15px_rgba(127,181,154,0.3)]" />
              <span className="text-[10px] text-c-100 font-sans font-semibold">Nov 08 (v4)</span>
            </div>
          </div>
        </Card>

        {/* Scan History Section */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-heading font-extrabold text-2xl text-c-100">
              Recent ATS Diagnostics ({scanHistory.length})
            </h3>
            <Button to="/scanner" variant="secondary" size="sm">
              + New Scan
            </Button>
          </div>

          {scanHistory.length > 0 ? (
            <StaggerFromEdges
              itemSelector=".history-item"
              staggerTime={0.08}
              className="space-y-4"
            >
              {scanHistory.map((scan) => (
                <Card
                  key={scan.id}
                  className="history-item p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 hover:border-c-300/40"
                  glow={false}
                >
                  <div className="flex items-start sm:items-center gap-4">
                    <ScoreRing
                      score={scan.score}
                      maxScore={100}
                      size={70}
                      strokeWidth={6}
                      showCountUp={false}
                    />

                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-heading font-bold text-base text-c-100">
                          {scan.role}
                        </h4>
                        <span className="text-xs text-c-600">·</span>
                        <span className="text-xs font-sans text-c-300">{scan.company}</span>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-c-600 font-sans">
                        <span className="flex items-center gap-1">
                          <FileText size={12} className="text-c-300" />
                          <span>{scan.fileName}</span>
                        </span>
                        <span>·</span>
                        <span className="text-c-success font-semibold">
                          +{scan.matchingCount} keywords matched
                        </span>
                        <span>·</span>
                        <span>{scan.date}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end pt-3 sm:pt-0 border-t sm:border-t-0 border-c-700/60">
                    <Button
                      to="/scanner"
                      variant="secondary"
                      size="sm"
                      icon={<Eye size={14} />}
                    >
                      Inspect
                    </Button>

                    <button
                      type="button"
                      onClick={() => handleDeleteScan(scan.id)}
                      title="Delete record"
                      className="p-2 rounded-full border border-c-700 hover:border-c-error/40 hover:text-c-error text-c-600 transition-colors cursor-pointer"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </Card>
              ))}
            </StaggerFromEdges>
          ) : (
            <EmptyState
              icon={<Target size={28} />}
              title="No saved scans yet"
              description="Drop your resume against any job description to view your benchmark breakdown here."
              action={
                <Button to="/scanner" variant="primary" size="md">
                  Run First ATS Scan
                </Button>
              }
            />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

