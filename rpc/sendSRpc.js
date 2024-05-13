const axios = require("axios");

require("dotenv").config();
const makeRequest = async (data) => {
  try {
    const BASE_URL = "https://dev.trakr.live/api/";
    const { data } = await axios.post(`${BASE_URL}auth/login`, {
      username: "trakrboardtest@hacklab.solutions",
      password: "HACK@LAB",
    });

    const { data: deviceData } = await axios.post(
      `${BASE_URL}plugins/rpc/twoway/7e2b8950-d6d3-11ee-92f8-95facc11745c`,
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

/*
> node rpc/sendSRpc.js
{ method: 'setGpio', params: { pin: '23', value: 1 } }
*/
