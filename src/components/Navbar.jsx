import '../styles/Navbar.css';
import { useNavigate} from 'react-router-dom';

export default function Navbar() {
    const navigate = useNavigate();
    const isLoggIn = !!localStorage.getItem("accessToken")

    const Logout = () => {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        navigate('/')
    }

  return (
    <nav className="navbar">
      <span className="navbar__logo">ResumeAI</span>
      <div className="navbar__actions">
        {isLoggIn && (
          <button className="navbar__logout" onClick={Logout}>
            Logout
          </button>
        )}
        {!isLoggIn && (
          <>
            <button className="navbar__login">Login</button>
            <button className="navbar__signup">Signup</button>
          </>
        )}
      </div>
    </nav>
  );
}