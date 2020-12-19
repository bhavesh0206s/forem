import { Card, Divider } from 'antd';
import { Link } from 'react-router-dom';
import './auth.css'
const { Meta } = Card;

const Signin = () => {
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
            <div className="google-btn">
              <div className="google-icon-wrapper">
                <img className="google-icon" alt="signup" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"/>
              </div>
                <p className="btn-text"><b>Sign in with Google</b></p>
            </div>
          </div>
        </a>
        <Divider />
      </Card>
    </div>
  );
}
 
export default Signin;