import RHeader from "../components/header"
import CenteredImage from "@/components/mainimage";
import FileUpload from "@/components/upload";
import ArrowDown from "@/components/arrow";
import React from 'react';

function Index() {
  return (

// fix the changes i made previously with navbar (index.js/app.js)
    <div>
      <RHeader/>
      <CenteredImage/>
      <FileUpload/>
     
    </div>
  );
}

export default Index;
