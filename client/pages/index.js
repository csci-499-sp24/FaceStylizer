import RHeader from "../components/header"
import CenteredImage from "@/components/mainimage";
import FileUpload from "@/components/upload";
import ArrowDown from "@/components/arrow";
import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';

function Index() {
  return (
    <GoogleOAuthProvider clientId="593381902699-jdfocdq7nnpnsbjehq5sedfs6cf8k7b8.apps.googleusercontent.com">
        <RHeader/>
        <CenteredImage/>
        <FileUpload/>
    </GoogleOAuthProvider>
    
  );
}

export default Index;
