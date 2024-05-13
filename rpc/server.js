var mqtt = require("mqtt");
require("dotenv").config();
var client = mqtt.connect("tcp://dev.trakr.live", {
  username: "0uWs1gv1A4TnxxG4SsC0",
});
client.on("connect", function () {
  console.log("connected");
  client.subscribe("v1/devices/me/rpc/request/+");
});

client.on("message", function (topic, message) {
  console.log("request.topic: " + topic);
  console.log("request.body: " + message.toString());
  var requestId = topic.slice("v1/devices/me/rpc/request/".length);
  //client acts as an echo service
  client.publish("v1/devices/me/rpc/response/" + requestId, message);
});

/*
> node rpc/server.js
connected
request.topic: v1/devices/me/rpc/request/0
request.body: {"method":"setGpio","params":{"pin":"23","value":1}}
*/
