import React from 'react';
import Gallery from '@/components/gallery';
import {RHeader} from "../../../components/header"

function GalleryPage() {
  return (
    <div>
      <h1>This is the GalleryPage</h1>
      {/* a navbar will be */}
      {/* filter component here */}
      {/* then the gallery component */}
      {/* <RHeader/> */}
      <Gallery/>
    </div>
  );
}

export default GalleryPage;