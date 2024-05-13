var mqtt = require("mqtt");
require("dotenv").config();
var client = mqtt.connect("tcp://dev.trakr.live", {
  username: "0uWs1gv1A4TnxxG4SsC0",
});

client.on("connect", function () {
  console.log("connected");
  client.subscribe("v1/devices/me/rpc/response/+");
  var requestId = 1;
  var request = {
    method: "getCurrentTime",
    params: {},
    timeout: 300,
  };
  client.publish(
    "v1/devices/me/rpc/request/" + requestId,
    JSON.stringify(request)
  );
});

client.on("message", function (topic, message) {
  console.log("response.topic: " + topic);
  console.log("response.body: " + message.toString());
});

/* 
> node rpc/device.js
connected
response.topic: v1/devices/me/rpc/response/1
response.body: {"error":"timeout"}
^C
> node rpc/device.js
connected
response.topic: v1/devices/me/rpc/response/1
response.body: {"time":1715609750}
^C
*/
