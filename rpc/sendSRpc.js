const axios = require("axios");

require("dotenv").config();
const makeRequest = async (data) => {
  try {
    const BASE_URL = process.env.TB_BASE_URL;
    const { data } = await axios.post(`${BASE_URL}auth/login`, {
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
    });

    const { data: deviceData } = await axios.post(
      `${BASE_URL}plugins/rpc/twoway/${process.env.DEVICE_ID}`,
      {
        method: "setGpio",
        params: {
          pin: "23",
          value: 1,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }
    );
    console.log(deviceData);
  } catch (error) {
    console.error(error);
  }
};

makeRequest();
