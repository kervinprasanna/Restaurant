
import "./home.css";

function Home() {
  return (
    <div className="app-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <span className="logo-icon">D</span>
          <h2>Daily Meet</h2>
        </div>

        <ul className="nav-menu">
          <li><a href="#home" className="active">Home</a></li>
          <li><a href="#meetings">Meetings</a></li>
          <li><a href="#schedule">Schedule</a></li>
          <li><a href="#about">About</a></li>
        </ul>

        <button className="login-btn">Get Started ↗</button>
      </nav>

      {/* Hero Section */}
      <main className="hero" id="home">
        <div className="hero-content">
          <span className="badge">
            ✦ YOUR SPACE FOR BETTER MEETINGS
          </span>

          <h1>
            Make Every
            <br />
            Meeting <span>Meaningful.</span>
          </h1>

          <p>
            Bring people together, share ideas, and turn conversations
            into meaningful progress. Your meetings, beautifully organized.
          </p>

          <div className="hero-buttons">
            <button className="primary-btn">
              Start a Meeting ↗
            </button>

            <button className="secondary-btn">
              Explore Features
            </button>
          </div>

          <div className="hero-footer">
            <div className="status-dot"></div>
            <span>One space. Better collaboration.</span>
          </div>
        </div>

        {/* Decorative Card */}
        <div className="hero-card">
          <div className="card-top">
            <span className="live-dot"></span>
            <span>YOUR WORKSPACE</span>
            <span className="card-menu">•••</span>
          </div>

          <div className="card-illustration">
            <div className="orbit orbit-one"></div>
            <div className="orbit orbit-two"></div>
            <div className="center-circle">D</div>
            <div className="floating-circle circle-one">✦</div>
            <div className="floating-circle circle-two">↗</div>
            <div className="floating-circle circle-three">✳</div>
          </div>

          <h3>Ideas start here.</h3>
          <p>Your next great conversation is just one click away.</p>

          <div className="card-bottom">
            <span>✦ Stay connected</span>
            <span>● Ready to meet</span>
          </div>
        </div>
      </main>

      {/* Bottom Information */}
      <footer className="footer" id="about">
        <span>© 2026 Daily Meet</span>
        <span>Designed for meaningful connections.</span>
      </footer>
    </div>
  );
}

export default Home;
