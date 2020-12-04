import { Card, Divider } from 'antd';
import { Link } from 'react-router-dom';
import './auth.css'
const { Meta } = Card;

const Signup = () => {
  return (
    <div className='signup'>
      <Card
        className='signup-card'
        hoverable
        // cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
      >
        <h1 style={{fontWeight: 'bold', fontSize: '2.5em', margin: 0}}>Welcome to Forem</h1>
        <p style={{fontSize: '1.2em'}}>Forum for everyone</p>
        <a href='/auth/google'>
          <div className='google-signup'>
            <div class="google-btn">
              <div class="google-icon-wrapper">
                <img class="google-icon" alt="signup" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"/>
              </div>
                <p class="btn-text"><b>Sign un with Google</b></p>
            </div>
          </div>
        </a>
        <Divider />
        <div>
          <p style={{fontSize: '1.2em', color: 'grey'}}>Already have an account? <Link to='/signin'>Signin</Link></p>
        </div>
      </Card>
    </div>
  );
}
 
export default Signup;