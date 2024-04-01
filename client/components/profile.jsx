import React, { useState, useEffect } from "react";
import { Button, Modal, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from "reactstrap";

function Profile() {
  const [modalOpen, setModalOpen] = useState(false);
  const [username, setUsername] = useState("");

  const handleSubmit = async (e) => {
    sessionStorage.clear();
  };
  
  useEffect(() => {
    const fetchUsername = () => {
    try {
      // Retrieve the username from session storage
      const storedUsername = sessionStorage.getItem('username');
      setUsername(storedUsername);
    } catch (error) {
      console.error("Error fetching username:", error);
    }
  };

  fetchUsername();
  }, []);

  return (
    <>
      <button
        className="mt-2 text-sm bg-white active:bg-blueGray-50 text-blueGray-700 px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 shadow-sm hover:shadow-sm inline-flex items-center font-bold ease-linear transition-all duration-150"
        type="button"
        onClick={() => setModalOpen(!modalOpen)}
      >
        Hi, {username}
      </button>
      <Modal toggle={() => setModalOpen(!modalOpen)} isOpen={modalOpen}>
        <div className="text-center mt-3 m-2">
          <h5 className="text-gray-600 font-bold">
            {username}'s Profile
          </h5>
        </div>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <div className="text-center">
              <Button color="primary" outline type="submit">Sign Out</Button>
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

export default Profile;
