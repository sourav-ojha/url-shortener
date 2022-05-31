const generateToken = require("../helper/generateToken");
const User = require("../models/users");

const loginUser = async (email, password) => {
  try {
    if (!email || !password) {
      return {
        status: false,
        statusCode: 400,
        message: "Email or password is missing",
      };
    }

    const user = await User.findOne({ email });
    if (!user) {
      return {
        status: false,
        statusCode: 404,
        message: "user not found",
      };
    }
    if (user.password !== password) {
      return {
        status: false,
        statusCode: 404,
        message: "Invalid Credentials",
      };
    }

    const token = generateToken(user);

    return {
      status: true,
      statusCode: 200,
      message: "success",
      data: { user, token },
    };
  } catch (err) {
    return {
      status: false,
      statusCode: 500,
      message: err.message,
    };
  }
};

const createUser = async (body) => {
  const { firstName, lastName, email, password } = body;
  let { status, statusCode, message } = await checkExistingUser(email);
  if (status) {
    const user = new User({ firstName, lastName, email, password });
    return await user.save((err, data) => {
      if (err) {
        return {
          status: false,
          statusCode: 500,
          message: err.message,
        };
      }
      return {
        status: true,
        statusCode: 200,
        message: "User created successfully",
        data,
      };
    });
  } else {
    return {
      status: false,
      statusCode,
      message,
    };
  }
};

const checkExistingUser = async (email) => {
  try {
    const user = await User.findOne({ email });
    if (user) {
      return {
        status: false,
        statusCode: 400,
        message: "User already exists",
      };
    }
    return {
      status: true,
    };
  } catch (err) {
    return {
      status: false,
      statusCode: 500,
      message: err.message,
    };
  }
};

module.exports = {
  loginUser,
  createUser,
  checkExistingUser,
};
