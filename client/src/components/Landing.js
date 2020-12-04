import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div class="wrapper">
      <div class="Container">
        <div className="landing-nav">
            <div className="landing-logo">
                LOGO
            </div>
        </div>
        <div class="landing-header">
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