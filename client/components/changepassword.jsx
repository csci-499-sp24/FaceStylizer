import React, { useState, useEffect } from "react";
import { Button, Modal, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from "reactstrap";
import { useRouter } from 'next/router';
import UsersApi from "@/Api/UsersApi"; 

function ChangePassword() {
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({ password: '', currentPassword: '' });
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
        const currentUserId = sessionStorage.getItem('uid');

        const response = await UsersApi.put(`/updateUser/${currentUserId}`, {
            password: formData.password
        });

        console.log('Password update successful:', response.data);
        setModalOpen(false);
        window.location.reload();
    } catch (error) {
        console.error('Error updating password:', error);
        setError(error.message || "An unexpected error occurred");
    }
  };

  return (
    <>
      <button type="button" onClick={() => setModalOpen(!modalOpen)}>
        CHANGE PASSWORD
      </button>
      <Modal toggle={() => setModalOpen(!modalOpen)} isOpen={modalOpen}>
        <div className="text-center mt-3 m-2">
          <h5 className="text-gray-600 font-bold">
            Change Password
          </h5>
        </div>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="currentPassword">
                Current Password
              </Label>
              <Input
                id="currentPassword"
                name="currentPassword"
                placeholder="Current Password"
                type="password"
                value={formData.currentPassword}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">
                New Password
              </Label>
              <Input
                id="password"
                name="password"
                placeholder="New Password"
                type="password"
                value={formData.password}
                onChange={handleChange}
              />
            </FormGroup>
            {error && <p className="text-red-500">{error}</p>}
            <div className="text-center">
              <Button color="primary" outline type="submit">Update Password</Button>
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

export default ChangePassword;
