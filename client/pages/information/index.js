import React, { useState, useEffect, useRef } from "react";
import { useRouter } from 'next/router';
import RHeader from "@/components/header";
import { Text, Button, Modal, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from "reactstrap";

const Information = () => {
    
  return (
    <div>
        <RHeader/>
        
        <div className="min-h-screen bg-gradient-to-br from-yellow-300 to-orange-500 p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-white">Understanding JoJoGAN</h1>
        <div className="bg-white p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold mb-4">Introduction to StyleGANs</h2>
          <p className="text-gray-800">
                <figure >
                <img src="https://editor.analyticsvidhya.com/uploads/615652.PNG" alt="Centered Image" className="m-1" />
                <figcaption className="flex justify-center mb-2 text-black font-semibold">JoJoGAN model architecture</figcaption>
                </figure>
                StyleGANs are a class of machine learning model built to create stylized versions of images by manipulating features of input images.
                Different from traditional GANs (generative adversarial networks), which lacked control over the style of the synthetic images that were generated,
                StyleGANs introduces control over generated images by applying noise to achieve different levels of detail.
            </p>
        </div>
        <div className="bg-white p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold mb-4">JoJoGAN Architecture</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-lg overflow-hidden">
                <img src="https://machinelearningmastery.com/wp-content/uploads/2019/06/Example-of-One-Set-of-Generated-Faces-Left-Adopting-the-Coarse-Style-of-Another-Set-of-Generated-Faces-Top.png" alt="Centered Image" className="m-1" />
            </div>
            <div className="rounded-lg overflow-hidden">
                <img src="https://editor.analyticsvidhya.com/uploads/490883.jpg" alt="Centered Image" className="" />
            </div>
          </div>
          <p className="text-gray-800 mt-4">
                <figcaption className="flex justify-center mb-2 text-black font-semibold">Examples of images stylized by JoJoGANs</figcaption>
            JoJoGANs introduce one shot face stylization, which revolves around a model learning the mapping of one face style. JoJoGANs require only one reference image 
            and as little as 30 seconds of training time to be able to stylize images in the reference style. 
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Using JoJoGAN on Our Website</h2>
          <p className="text-gray-800">
          Stylize your own images by interacting with our straightforward stylization interface. Simply upload a photo with a face and choose your preferred style, and 
          a model will stylize your image behind the scenes. Sign up or login to be able to save your images and view them at a later time. Our application currently offers
          stylizations in the original Jojo style, as well as other popular cartoon styles. If you have your own reference image, upload your custom style for our model to train on 
          along with an image to be stylized.
          </p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Information;