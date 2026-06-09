import '../styles/CTABanner.css';
import Button from './Button';


export default function CTABanner({
  title = 'Ready to land your dream job?',
  subtitle = 'Join thousands of professionals who improved their interview rate by 40% using ResumeAI.',
  onGetStarted,
}) {
  return (
    <div className="cta-banner">
      <h2 className="cta-banner__title">{title}</h2>
      <p className="cta-banner__sub">{subtitle}</p>
      <div className="cta-banner__actions">
        <Button label="Get Started Free" variant="outline" size="lg" onClick={onGetStarted} />
      </div>
    </div>
  );
}