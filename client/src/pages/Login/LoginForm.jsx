import Submit from "components/Buttons/Submit";
import TextField from "components/Input/TextField";
import React from "react";

const LoginForm = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === "login") console.log(formData);
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
                name="first_name"
                value={formData.email}
                onChange={handleChange}
                required
                label="First Name"
              />
              <TextField
                name="last_name"
                value={formData.email}
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
            value={formData.email}
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
