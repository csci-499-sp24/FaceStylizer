import React, { useState, useEffect } from "react";
import { Button, Modal, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from "reactstrap";
import { useRouter } from 'next/router';
import UsersApi from "@/Api/UsersApi"; 

function UpdateUsername() {
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({ username: '', currentUsername: '' });
  const [error, setError] = useState(null);

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(`${name} changed to:`, value); 
  };
  useEffect(() => {
    const currentUsername = sessionStorage.getItem('username');
    setFormData({ ...formData, currentUsername });
  }, []);



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const currentUsername = sessionStorage.getItem('username');
        let currentUserId; 
    
        
        const userResponse = await UsersApi.get('/readUser', { username: currentUsername });
        const userObject = userResponse.data.message;

        console.log(userResponse);
        console.log(userResponse.data);

        
        
        console.log('User object:', userObject); 

        if (!userObject) {
            throw new Error('User not found'); 
        }

        currentUserId = userObject._id;
        sessionStorage.setItem('_id', currentUserId); 

        const response = await UsersApi.put(`/updateUser/${currentUserId}`, {
            username: formData.username,
        });

        console.log('Username update successful:', response.data);
        sessionStorage.setItem('username', formData.username); 
        setModalOpen(false);
        window.location.reload();
    } catch (error) {
        console.error('Error updating username:', error);
        setError(error.message || "An unexpected error occurred");
    }
};






  return (
    <>
    <button
      type="button"
      onClick={() => setModalOpen(!modalOpen)}
    >
      CHANGE USERNAME
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
            <Label for="username">
              New Username
            </Label>
            <Input
              id="username"
              name="username"
              placeholder="New Username"
              type="text"
              value={formData.username}
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
