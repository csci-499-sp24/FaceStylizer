import RHeader from "../components/header"
import CenteredImage from "@/components/mainimage";
import FileUpload from "@/components/upload";
import ArrowDown from "@/components/arrow";
import React from 'react';


function App() {
    return (
        <div>
            <RHeader/>
            <CenteredImage/>
            <FileUpload/>
        </div>
        
    );
}

export default App;
