var mqtt = require("mqtt");
var client = mqtt.connect("tcp://dev.trakr.live", {
  username: "919YPoEKfgACZdMSsO26",
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
