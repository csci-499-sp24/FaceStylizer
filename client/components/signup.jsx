
// import React, { useState } from "react";
// import { Button, Modal, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from "reactstrap";
// import UsersApi from "@/Api/UsersApi"; // Assuming correct import path
// import { useRouter } from 'next/router';
// import Validation from "./signupValidation"; // Import your signup validation function

// function SignUp() {
//   const [modalOpen, setModalOpen] = useState(false);
//   const [formData, setFormData] = useState({ username: '', password: '' });
//   const [error, setError] = useState(null);

//   const router = useRouter();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//     console.log(`${name} changed to:`, value); // Log the changed field and its value
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // Call the signup validation function
//     const validationError = Validation(formData);
//     if (Object.keys(validationError).length > 0) {
//       // If there are validation errors, set the error state and return
//       setError(validationError);
//       return;
//     }
//     try {
//       console.log('Submitting form data:', formData); // Log the entire form data before submission
//       const response = await UsersApi.post('/createUser', {
//         username: formData.username,
//         password: formData.password
//       });
//       console.log('Account created successfully:', response.data);
//       sessionStorage.setItem('username', formData.username);
//       console.log('Redirecting to /home...');
//       router.push('/account'); // Redirect to /home
//     } catch (error) {
//       console.error('Error creating account:', error);
//       console.log('Error response:', error.response); // Log error response
//       setError(error.response.data.message);
//     }
//   };
  

//   return (
//     <>
//       <button
//         className="mt-2 text-sm bg-white active:bg-blueGray-50 text-blueGray-700 px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 shadow-sm hover:shadow-sm inline-flex items-center font-bold ease-linear transition-all duration-150" 
//         type="button"
//         onClick={() => setModalOpen(!modalOpen)}
//       >
//         Sign Up
//       </button>
//       <Modal toggle={() => setModalOpen(!modalOpen)} isOpen={modalOpen}>
//         <div className="text-center mt-3 m-2">
//           <h5 className="text-gray-600 font-bold">
//             Sign Up
//           </h5>
//         </div>
//         <ModalBody>
//           <Form onSubmit={handleSubmit}>
//             <FormGroup>
//               <Label for="username">
//                 Username
//               </Label>
//               <Input
//                 id="username"
//                 name="username"
//                 placeholder="Username"
//                 type="text"
//                 value={formData.username}
//                 onChange={handleChange}
//               />
//             </FormGroup>
//             <FormGroup>
//               <Label for="password">
//                 Password
//               </Label>
//               <Input
//                 id="password"
//                 name="password"
//                 placeholder="Password"
//                 type="password"
//                 value={formData.password}
//                 onChange={handleChange}
//               />
//             </FormGroup>
//             {error && <p className="text-red-500">{error}</p>} {/* Display validation error message */}
//             <div className="text-center">
//               <Button color="primary" outline type="submit">Sign Up</Button>
//             </div>
//           </Form>
//         </ModalBody>
//         <ModalFooter>
//           <Button color="secondary" outline type="button" onClick={() => setModalOpen(!modalOpen)}>Close</Button>
//         </ModalFooter>
//       </Modal>
//     </>
//   );
// }

// export default SignUp;






import React, { useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from "reactstrap";
import UsersApi from "@/Api/UsersApi"; // Assuming correct import path
import { useRouter } from 'next/router';

function SignUp() {
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
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" outline type="button" onClick={() => setModalOpen(!modalOpen)}>Close</Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default SignUp;
