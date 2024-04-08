import React, { useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from "reactstrap";
import { useRouter } from 'next/router';
import UsersApi from "@/Api/UsersApi"; 

function UpdateUsername() {
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({ newUsername: '', currentUsername: '' });
  const [error, setError] = useState(null);

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(`${name} changed to:`, value); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Submitting form data for username change:', formData);
      
      const response = await UsersApi.put('/updateUser', {
        currentUsername: formData.currentUsername,
        newUsername: formData.newUsername
      });
      
      console.log('Username update successful:', response.data);
      sessionStorage.setItem('username', formData.newUsername); 
      setModalOpen(false);
      window.location.reload(); // Reload the page
      
    } catch (error) {
      console.error('Error updating username:', error);
      setError(error.response ? error.response.data.message : "An unexpected error occurred");
    }
  };
  

  return (
    <>
    <button
      type="button"
      onClick={() => setModalOpen(!modalOpen)}
    >
      Change Username
    </button>
    <Modal toggle={() => setModalOpen(!modalOpen)} isOpen={modalOpen}>
      <div className="text-center mt-3 m-2">
        <h5 className="text-gray-600 font-bold">
          Update Username
        </h5>
      </div>
      <ModalBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="currentUsername">
              Current Username
            </Label>
            <Input
              id="currentUsername"
              name="currentUsername"
              placeholder="Current Username"
              type="text"
              value={formData.currentUsername}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="newUsername">
              New Username
            </Label>
            <Input
              id="newUsername"
              name="newUsername"
              placeholder="New Username"
              type="text"
              value={formData.newUsername}
              onChange={handleChange}
            />
          </FormGroup>
          {error && <p className="text-red-500">{error}</p>}
          <div className="text-center">
            <Button color="primary" outline type="submit">Update Username</Button>
          </div>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" outline type="button" onClick={() => setModalOpen(!modalOpen)}>Close</Button>
      </ModalFooter>
    </Modal>
  </>  );
}

export default UpdateUsername;
