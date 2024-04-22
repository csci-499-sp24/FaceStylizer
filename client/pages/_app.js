import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "../context/authContext";
import { GoogleOAuthProvider } from '@react-oauth/google';

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <GoogleOAuthProvider clientId="593381902699-jdfocdq7nnpnsbjehq5sedfs6cf8k7b8.apps.googleusercontent.com">
        <Component {...pageProps} />;
      </GoogleOAuthProvider>
    </AuthProvider>
  );
}
