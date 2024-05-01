import RHeader from "../components/header"
import CenteredImage from "@/components/mainimage";
import FileUpload from "@/components/upload";
import ArrowDown from "@/components/arrow";
import React from 'react';
import Gallery from "@/components/gallery";


function App() {
    return (
        <div>
            <RHeader/>
            <CenteredImage/>
            <FileUpload/>
            <Gallery/>
        </div>
        
    );
}

export default App;
