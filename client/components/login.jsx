import React from "react";
import 'tailwindcss/tailwind.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// reactstrap components
import { useAuth } from '../context/authContext';
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

import { useRouter } from 'next/router';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

function Login() {
  const [modalOpen, setModalOpen] = React.useState(false);
  const { signIn } = useAuth();
  const router = useRouter();

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
        Sign In
      </button>
      <Modal toggle={() => setModalOpen(!modalOpen)} isOpen={modalOpen}>
        <div className="text-center mt-3 m-2">
          <h5 className="text-gray-600 font-bold">
            Sign In
          </h5>
        </div>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="exampleEmail">
                Email
              </Label>
                <Input
                  id="exampleEmail"
                  name="email"
                  placeholder="Email"
                  type="email"
                />
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">
                Password
              </Label>
              <Input
                id="examplePassword"
                name="password"
                placeholder="Password"
                type="password"
              />
            </FormGroup>
          </Form>
        <div className="text-center">
          <Button color="primary" 
          outline 
          type="button"
          className="btn btn-primary">
            Sign In
          </Button>
        </div>
        </ModalBody>
          <div className="text-center">
            <h5 className="text-gray-600 font-bold">
              or sign in with
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
        <ModalFooter>
          <Button
            color="secondary"
            outline
            type="button"
            onClick={() => setModalOpen(!modalOpen)}
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default Login;