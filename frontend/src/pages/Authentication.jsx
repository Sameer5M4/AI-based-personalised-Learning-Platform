// import { GoogleOAuthProvider } from '@react-oauth/google';
import AuthContainer from '../components/authentication/AuthContainer';


export default function Authentication( { setIsAuthentic, handleLogin, setUserId } ) {
  return (
    <div className='flex justify-center items-center m-auto'>
      {/* <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID"> */}
        <AuthContainer setIsAuthentic={setIsAuthentic} handleLogin={handleLogin} setUserId={setUserId} />
      {/* </GoogleOAuthProvider> */}
    </div>
  );
}

