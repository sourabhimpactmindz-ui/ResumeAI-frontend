// import "../styles/legal-pages.css";

function Disclaimer() {
  return (
    <div className="legal-page">
      <div className="legal-container">
        <span className="page-label">LEGAL INFORMATION</span>

        <h1>Disclaimer</h1>

        <p className="page-intro">
          Last Updated: November 3, 2026
        </p>

        <section>
          <h2>General Information</h2>
          <p>
            The information and tools provided by ResumeAI
            are intended to help users prepare professional
            resumes and explore career-related resources.
          </p>
        </section>

        <section>
          <h2>AI-Generated Content</h2>
          <p>
            AI-generated content is provided for assistance
            and informational purposes. It may not always
            be accurate, complete or suitable for every
            individual situation.
          </p>
        </section>

        <section>
          <h2>No Employment Guarantee</h2>
          <p>
            ResumeAI does not guarantee job interviews,
            employment, selection or career outcomes.
          </p>
        </section>

        <section>
          <h2>External Links</h2>
          <p>
            Our website may contain links to third-party
            websites. We are not responsible for their
            content, services or privacy practices.
          </p>
        </section>

        <section>
          <h2>Contact</h2>
          <p>
            For questions about this disclaimer, contact
            support@yourdomain.com.
          </p>
        </section>
      </div>
    </div>
  );
}

export default Disclaimer;