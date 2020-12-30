import { Link } from "react-router-dom";
import Logo from '../assets/logo.png';

const Landing = () => {
  return (
    <div className="wrapper">
      <div className="Container">
        <div className="landing-nav">
            <div className="landing-logo">
                <img src={Logo} width='200' alt="logo"/>
            </div>
        </div>
        <div className="landing-header">
          <h1>Forem</h1>
          <p>Forum for everone</p>
          <Link to='/home'>
            <button className='continue-btn' type="button">Continue to Forum</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
 
export default Landing;