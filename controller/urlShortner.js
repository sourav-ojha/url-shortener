const Url = require("../models/url");
const { nanoid } = require("nanoid");

const CreateUrl = async (url, title, user) => {
  try {
    const id = nanoid(4);
    const today = new Date();
    const todayDate = today.getDate();
    const todayMonth = today.getMonth();
    const todayYear = today.getFullYear();
    let curDate = `${todayDate}-${todayMonth}-${todayYear}`;
    const newUrl = new Url({
      url,
      title,
      user: user.id,
      id,
      count: 0,
      stats: [
        {
          date: curDate,
          count: 0,
        },
      ],
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

    // update daily count and total count
    const { stats } = data;
    const today = new Date();

    const todayDate = today.getDate();
    const todayMonth = today.getMonth();
    const todayYear = today.getFullYear();
    const todayDateString = `${todayDate}-${todayMonth}-${todayYear}`;
    const todayCount = stats.filter((stat) => stat.date === todayDateString);
    if (todayCount.length === 0) {
      data.stats.push({
        date: todayDateString,
        count: 1,
      });
    } else {
      todayCount[0].count += 1;
    }
    data.count += 1;
    await data.save();

    // await Url.findOneAndUpdate({ id }, { $inc: { count: 1 }

    // });

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

const GetUserUrls = async (user) => {
  try {
    console.log(user.id);
    const data = await Url.find({ user: user.id });
    return {
      status: true,
      message: "success",
      data,
    };
  } catch (err) {
    return {
      status: false,
      message: err.message,
    };
  }
};

const GetUrlDetails = async (id, user) => {
  try {
    const data = await Url.findOne({ id, user: user.id });
    if (!data || data === null || data === undefined)
      return {
        status: false,
        statusCode: 404,
        message: "url not found",
      };
    return {
      status: true,
      message: "success",
      data,
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
  GetUserUrls,
  GetUrlDetails,
};
