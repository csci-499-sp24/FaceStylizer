import RHeader from "../components/header"
import CenteredImage from "@/components/mainimage";
import FileUpload from "@/components/upload";
import ArrowDown from "@/components/arrow";
import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from "./app"

function Index() {
  return (
    <GoogleOAuthProvider clientId="593381902699-od149i7asrg50dv2fgsju6ho0vqnpehl.apps.googleusercontent.com">
        <App/>
    </GoogleOAuthProvider>
    
  );
}

export default Index;
