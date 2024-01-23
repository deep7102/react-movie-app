import { Link } from 'react-router-dom';
import './About.css';

function About() {
    return (
      <>
        <h1>About Us: Your Go-To Guide for All Things</h1>

        <section>
          <h2>Welcome to Cinema Sphere!</h2>
          <div className="about-container">
            <figure>
              <img src="/images/movie-night.jpg" alt="Friends enjoying a movie night" />
            </figure>
            <div className="content">
              <p>We're not just another movie website. We're a passionate community of film fanatics, dedicated to unearthing the hidden gems, dissecting the classics, and celebrating the magic of cinema in all its forms.</p>
              <p>Take information with Cinema Sphere. Grab your popcorn, dim the lights, and get ready to dive into the world of film. It's gonna be a wild ride!</p>
              <Link to="/" className="btn">Go back to movies list</Link>
            </div>
          </div>
        </section>
      </>
    );
  }
  
  export default About;