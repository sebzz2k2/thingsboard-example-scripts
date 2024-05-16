var mqtt = require("mqtt");
const client = mqtt.connect("tcp://dev.trakr.live", {
  username: "0uWs1gv1A4TnxxG4SsC0",
});

client.on("connect", () => {
  client.subscribe("v1/devices/me/telemetry");

  client.publish(
    "v1/devices/me/telemetry",
    JSON.stringify({
      ver: "2",
      ts: new Date(),
      uid: "123456",
      lvl: "EVENT",
      ext: {
        evn: "CASA",
        msg: JSON.stringify({
          OPID: 202,
        }),
      },
    })
  );
});

/*
> node telemetry/index.ts

*/
