const Url = require("../models/url");
const { nanoid } = require("nanoid");

const CreateUrl = async (url) => {
  try {
    const id = nanoid(4);
    const newUrl = new Url({
      url,
      id,
      count: 0,
    });
    await newUrl.save();
    return {
      status: true,
      message: "success",
      id,
    };
  } catch (err) {
    return {
      status: false,
      message: err.message,
    };
  }
};

const GetUrl = async (id) => {
  try {
    const data = await Url.findOne({ id });
    if (!data || data === null || data === undefined)
      return {
        status: false,
        statusCode: 404,
        message: "url not found",
      };

    return {
      status: true,
      message: "success",
      url: data.url,
    };
  } catch (err) {
    return {
      status: false,
      message: err.message,
    };
  }
};

module.exports = {
  CreateUrl,
  GetUrl,
};
