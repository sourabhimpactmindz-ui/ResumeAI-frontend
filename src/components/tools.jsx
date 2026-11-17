import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { templates } from "./templates";
import "./tools.css"; 
import Footer from "./footer";
import Navbar from "./Navbar";
import { useLayoutEffect, useRef, useState } from "react";


const sample = {
  name: "Sourabh Thakur",
  title: "Frontend Developer",
  email: "Sourabh@email.com",
  phone: "+91 98765 43210",
  location: "Delhi, India",
  linkedin: "linkedin.com/in/Sourabh",
  github: "github.com/sourabh",
  summary:
    "Frontend developer with 3 years of experience building fast, accessible and responsive web apps using React, JavaScript and REST APIs. Skilled in state management, performance optimization and clean component design. Comfortable working with designers and backend teams to ship features that improve sign-ups and user retention.",
  skills:
    "Languages: JavaScript, TypeScript, HTML, CSS, Python\n" +
    "Frontend: React, Redux Toolkit, Next.js, Tailwind CSS, GSAP\n" +
    "Backend: Node.js, Express, MongoDB, REST APIs\n" +
    "Testing: Jest, React Testing Library, Cypress\n" +
    "Tools: Git, GitHub, Figma, Vercel, Postman",
  experience:
    "Frontend Developer | ABC Technologies Pvt Ltd, Delhi | Jan 2023 – Present\n" +
    "- Built 12+ React pages with reusable components and REST API integration\n" +
    "- Cut page load time by 38% using code splitting and image optimization\n" +
    "- Raised sign-ups by 15% by redesigning the onboarding flow\n" +
    "- Mentored 2 junior developers and led weekly code reviews\n" +
    "Junior Web Developer | XYZ Solutions, Noida | Jul 2021 – Dec 2022\n" +
    "- Developed responsive landing pages used by 20+ clients\n" +
    "- Fixed 60+ UI bugs and improved cross-browser compatibility\n" +
    "- Converted Figma designs into pixel-perfect React components\n" +
    "Web Development Intern | Startup Labs, Gurugram | Jan 2021 – Jun 2021\n" +
    "- Created a dashboard with charts that tracked daily user activity\n" +
    "- Wrote unit tests that raised code coverage from 40% to 75%",
  projects:
    "ResumeAI | React, Node.js, MongoDB | resumeai.app\n" +
    "- Built an ATS resume scanner that scores resumes against any job description\n" +
    "- Used AI to find missing keywords and suggest stronger bullet points\n" +
    "TaskFlow | React, Redux, Firebase | github.com/rohitsharma/taskflow\n" +
    "- Created a kanban task manager with drag and drop and real-time sync\n" +
    "- Used by 300+ students for planning their weekly work\n" +
    "ShopEasy | Next.js, Stripe, Tailwind CSS | shopeasy.vercel.app\n" +
    "- Built an e-commerce store with cart, search, filters and secure checkout",
  education:
    "B.Tech in Computer Science | XYZ University, Delhi | 2017 – 2021\n" +
    "Senior Secondary (CBSE), Science | ABC Public School, Delhi | 2015 – 2017",
};

const A4_WIDTH = 794; // the template is built at A4 width

/* Shrinks the A4 template to whatever width the card has, so the preview is responsive */
function Preview({ children }) {
  const box = useRef(null);
  const [scale, setScale] = useState(0.3);

  useLayoutEffect(() => {
    const el = box.current;
    if (!el) return;
    const update = () => setScale(el.clientWidth / A4_WIDTH);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="tl-preview" ref={box}>
      <div className="tl-preview__inner" style={{ transform: `scale(${scale})` }}>
        {children}
      </div>
    </div>
  );
}

export default function Tools() {
  return (
    <div className="tl-page">
      <Navbar />

      <header className="tl-hero">
        <p className="tl-hand">Step 1 of 2</p>
        <h1>Choose a template</h1>
        <p className="tl-hero__sub">
          Pick a clean, ATS-friendly layout. You can fill in your details on the next page.
        </p>
      </header>

      <main className="tl-main">
        <div className="tl-grid">
          {templates.map((t) => {
            const Template = t.component;
            return (
              <Link key={t.id} to={`/tools/builder/${t.id}`} className="tl-card">
                <Preview>
                  <Template data={sample} />
                </Preview>

                <div className="tl-card__foot">
                  <h3>{t.name}</h3>
                  <span className="tl-card__use">
                    Use this template <ArrowRight size={15} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}