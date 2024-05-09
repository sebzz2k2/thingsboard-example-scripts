const axios = require("axios");

const makeRequest = async (data) => {
  try {
    const BASE_URL = `https://dev.trakr.live:443/api/`;
    const { data } = await axios.post(`${BASE_URL}auth/login`, {
      username: "trakrboardtest@hacklab.solutions",
      password: "HACK@LAB",
    });

    const { data: deviceData } = await axios.post(
      `${BASE_URL}plugins/rpc/twoway/41625e20-6277-11ee-8204-cfecf9a1315c`,
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
