import React from "react";
import 'tailwindcss/tailwind.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// reactstrap components
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

function Login() {
  const [modalOpen, setModalOpen] = React.useState(false);

  const router = useRouter();

  const googleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log('Google login successful', tokenResponse);
      router.push('/home');
      // You can now use the tokenResponse to authenticate the user in your app
    },
    onError: () => {
      console.error('Google login failed');
      // Handle login errors here
    },
    flow: 'auth-code', // Use 'auth-code' for the authorization code flow
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
        <div class="text-center">
          <Button color="primary" 
          outline 
          type="button"
          class="btn btn-primary">
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
                <img alt="..." class="w-5 mr-2" src="https://demos.creative-tim.com/notus-js/assets/img/google.svg"/>
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