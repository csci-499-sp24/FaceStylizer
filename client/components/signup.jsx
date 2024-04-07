import React, { useState } from "react";
import UsersApi from "@/Api/UsersApi"; // Assuming correct import path
import { useRouter } from "next/router";
import "tailwindcss/tailwind.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "../context/authContext";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  InputGroup,
  InputGroupText,
  Label,
  Input,
} from "reactstrap";

function SignUp() {
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const { signIn } = useAuth();

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await UsersApi.post("/createUser", {
        username: formData.username,
        password: formData.password,
      });
      sessionStorage.setItem("username", formData.username);
      router.push("/account"); // Redirect to /home
    } catch (error) {
      console.error("Error creating account:", error);
      setError(error.response.data.message);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const user = { accessToken: tokenResponse.access_token };

      try {
        const res = await axios.get(
          `https://www.googleapis.com/oauth2/v3/userinfo?alt=json`,
          {
            headers: {
              Authorization: `Bearer ${user.accessToken}`,
              Accept: "application/json",
            },
          }
        );

        user.profile = res.data;
        setModalOpen(false);
        sessionStorage.setItem("username", user.profile.name);
        router.push("/account"); // Redirect
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
      // new try/catch here for google auth post request

      try {
        const response = await UsersApi.post("auth/google", {
          email: user.profile.email,
        });
        const { accessToken, profile } = response.data;
        signIn({ accessToken, profile });
      } catch (error) {
        console.error("Error during POST to /users/auth/google:", error);
      }
    },
    onError: () => {
      console.error("Google login failed");
      // Handle login errors here
    },
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
          <h5 className="text-gray-600 font-bold">Sign Up</h5>
        </div>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="username">Username</Label>
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
              <Label for="password">Password</Label>
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
              <Button color="primary" outline type="submit">
                Sign Up
              </Button>
            </div>
          </Form>

          <br></br>

          <div className="text-center">
            <h5 className="text-gray-600 font-bold">or sign up with</h5>
          </div>
          <div className=" btn-wrapper text-center mb-2">
            <button
              className="m-1 bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 shadow-sm hover:shadow-sm inline-flex items-center text-base ease-linear transition-all duration-150"
              color="default"
              href="#"
              onClick={() => googleLogin()}
            >
              <img
                alt="..."
                className="w-5 mr-2"
                src="https://demos.creative-tim.com/notus-js/assets/img/google.svg"
              />
              Google
            </button>
          </div>
        </ModalBody>
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

export default SignUp;
