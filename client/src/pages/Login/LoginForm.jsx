import { register } from "actions/auth";
import Submit from "components/Buttons/Submit";
import TextField from "components/Input/TextField";
import { Toast } from "components/Toast";
import { useAuth } from "context/AuthContext";
import React from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = React.useState("login");
  const [formData, setFormData] = React.useState({
    firstName: "",
    lasstName: "",
    email: "",
    password: "",
  });

  const toggleMode = () => {
    setMode(mode === "login" ? "signup" : "login");
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      Toast.fire({
        title: "Please fill out all fields",
        icon: "error",
      });
      return;
    }
    if (mode === "login") {
      let payload = {
        email: formData.email,
        password: formData.password,
      };
      let res = await login(payload);
      if (res.status) {
        navigate("/me");
      } else {
        Toast.fire({
          title: res.message,
          icon: "error",
        });
      }
    } else if (mode === "signup") {
      if (!formData.firstName || !formData.lastName) {
        Toast.fire({
          title: "Please fill out all fields",
          icon: "error",
        });
        return;
      }
      let payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      };
      let res = await register(payload);
      console.log(res);
    }
  };

  return (
    <div className="flex flex-col justify-center  p-5 ml-10 ">
      <div className="flex flex-col gap-5 text-white  ">
        <div className="text-xl font-bold text-gray-300 ">START FOR FREE</div>
        <div className="text-4xl font-extrabold  ">
          {mode === "login" ? "Login to your account " : "Create new Account"}
        </div>
        <div
          className="text-xl font-light hover:text-indigo-300 hover:cursor-pointer "
          onClick={toggleMode}
        >
          {mode === "login"
            ? "Not have an account. Signup here "
            : "Already A Member? Login"}{" "}
        </div>
      </div>
      <div className="flex flex-col gap-5 pt-10  ">
        <form className="flex flex-col" onSubmit={handleSubmit}>
          {mode === "signup" && (
            <div className="flex gap-5 ">
              <TextField
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                label="First Name"
              />
              <TextField
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                label="Last Name"
              />
            </div>
          )}
          <TextField
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            label="Email ID"
          />
          <TextField
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            label="Password"
          />
          <Submit
            label={mode === "login" ? "Login" : "SignUp"}
            onClick={handleSubmit}
          />
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
