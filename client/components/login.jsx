import React, { useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from "reactstrap";
import { useRouter } from 'next/router';
import UsersApi from "@/Api/UsersApi";

function Login() {
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState(null);

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
      const response = await UsersApi.post('/login', {
        
          username: formData.username,
          password: formData.password
        
      });
      console.log('Login successful:', response.data);
      sessionStorage.setItem('username', formData.username);
      sessionStorage.setItem('uid', response.data.uid);
      console.log('Redirecting to /home...');
      router.push('/account'); // Redirect to /home
    } catch (error) {
      console.error('Error logging in:', error);
      console.log('Error response:', error.response); // Log error response
      setError(error.response.data.message);
    }
  };
  

  return (
    <>
      <button
        className="mt-2 text-sm bg-slate-200 hover:bg-white active:bg-blueGray-50 text-blueGray-700 px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 shadow-sm hover:shadow-sm inline-flex items-center font-bold ease-linear transition-all duration-150"
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
              <Button color="primary" outline type="submit">Sign In</Button>
            </div>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" outline type="button" onClick={() => setModalOpen(!modalOpen)}>Close</Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default Login;
