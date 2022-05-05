const Url = require("../models/url");

export const CreateUrl = async (url) => {
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

export const GetUrl = async (id) => {
  try {
    const url = await Url.findOne({ id });
    // if (url == undefined)
    //   return {
    //     status: false,
    //     statusCode: 404,
    //     message: "url not found",
    //   };

    return {
      status: true,
      message: "success",
      url,
    };
  } catch (err) {
    return {
      status: false,
      message: err.message,
    };
  }
};
