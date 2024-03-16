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
  Label,
  Input
 } from "reactstrap";

function Login() {
  const [modalOpen, setModalOpen] = React.useState(false);
  return (
    <>
      <Button
        onClick={() => setModalOpen(!modalOpen)}
      >
        Sign In
      </Button>
      <Modal toggle={() => setModalOpen(!modalOpen)} isOpen={modalOpen}>
        <div className="text-center m-3">
          <h5 className="text-gray-600 text-sm font-bold">
            Sign in with
          </h5>
        </div>
        <div className=" btn-wrapper text-center">
          <button
              className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
              color="default"
              href="#"
              onClick={(e) => e.preventDefault()}
            >
              <img alt="..." class="w-5 mr-1" src="https://demos.creative-tim.com/notus-js/assets/img/google.svg"/>
              Google 
            </button>
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
        </ModalBody>
        <ModalFooter>
          <Button
            color="secondary"
            type="button"
            onClick={() => setModalOpen(!modalOpen)}
          >
            Close
          </Button>
          <Button color="primary" type="button">
            Save changes
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default Login;