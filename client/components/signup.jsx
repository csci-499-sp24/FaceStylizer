import React, { useState } from "react";
import UsersApi from "@/Api/UsersApi"; // Assuming correct import path
import { useRouter } from 'next/router';
import 'tailwindcss/tailwind.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from '../context/authContext';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { Button, 
  Modal, 
  ModalBody, 
  ModalFooter,
  Form,
  FormGroup,
  InputGroup,
  InputGroupText,
  Label,
  Input
 } from "reactstrap";


function SignUp() {
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState(null);
  const { signIn } = useAuth();

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(`${name} changed to:`, value); // Log the changed field and its value
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Submitting form data:', formData); // Log the entire form data before submission
      const response = await UsersApi.post('/createUser', {
        username: formData.username,
        password: formData.password
      });
      console.log('Account created successfully:', response.data);
      sessionStorage.setItem('username', formData.username);
      console.log('Redirecting to /home...');
      router.push('/account'); // Redirect to /home
    } catch (error) {
      console.error('Error creating account:', error);
      console.log('Error response:', error.response); // Log error response
      setError(error.response.data.message);
    }
  };
  
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log('Google login successful', tokenResponse);
      const user = { accessToken: tokenResponse.access_token }; // Adjust based on actual token response structure

      try {
        const res = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?alt=json`, {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
            Accept: 'application/json'
          }
        });
        
        user.profile = res.data; // Include profile information in the user object
        console.log(user)
        signIn(user);  // Update global user state
        setModalOpen(false);  // Close the modal upon successful login
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      }
      // new try/catch here for google auth post request
      try {
        // Send the verified Google profile information to your backend endpoint
        const response = await axios.post('/api/auth/google', {
          email: user.profile.email,
          // Include any other relevant profile information that you need
        });
  
        // Extract the relevant data from the backend response
        const { accessToken, profile } = response.data;
  
        // Update the global user state with the received data
        signIn({ accessToken, profile });
  
        // Redirect the user or update the UI as needed
        router.push('/account');
      } catch (error) {
        // Handle errors, such as displaying an error message to the user
      }



    },
    onError: () => {
      console.error('Google login failed');
      // Handle login errors here
    }
  });
 
  return (
    <>
      <button
        className="mt-2 text-sm bg-white active:bg-blueGray-50 text-blueGray-700 px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 shadow-sm hover:shadow-sm inline-flex items-center font-bold ease-linear transition-all duration-150" 
        type="button"
        onClick={() => setModalOpen(!modalOpen)}
      >
        Sign Up
      </button>
      <Modal toggle={() => setModalOpen(!modalOpen)} isOpen={modalOpen}>
        <div className="text-center mt-3 m-2">
          <h5 className="text-gray-600 font-bold">
            Sign Up
          </h5>
        </div>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="username">
                Username
              </Label>
              <Input
                id="username"
                name="username"
                placeholder="Username"
                type="text"
                value={formData.username}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                placeholder="Password"
                type="password"
                value={formData.password}
                onChange={handleChange}
              />
            </FormGroup>
            {error && <p className="text-red-500">{error}</p>}
            <div className="text-center">
              <Button color="primary" outline type="submit">Sign Up</Button>
            </div>
          </Form>

          <br></br>

          <div className="text-center">
          <h5 className="text-gray-600 font-bold">
            or sign up with
          </h5>
          </div>
          <div className=" btn-wrapper text-center mb-2">
          <button
              className="m-1 bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 shadow-sm hover:shadow-sm inline-flex items-center text-base ease-linear transition-all duration-150"
              color="default"
              href="#"
              onClick={() => googleLogin()}
            >
              <img alt="..." className="w-5 mr-2" src="https://demos.creative-tim.com/notus-js/assets/img/google.svg"/>
              Google 
            </button>
            
          </div>

        </ModalBody>
        <ModalFooter>
          <Button color="secondary" outline type="button" onClick={() => setModalOpen(!modalOpen)}>Close</Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default SignUp;
