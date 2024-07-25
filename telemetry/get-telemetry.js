const {executeQuery} = require("../config/db");
const fs = require("fs");
(async () => {
	const accessToken = "X1LGQWtOmRGbDQiOF3Pd"
	const startTs = 1721865600000
	const endTs = 1721901730000
	const q1 = `
		SELECT * FROM ts_kv_dictionary
		WHERE key = 'full_data'
	`

	const {rows: keyIdRow} = await executeQuery(q1)
	const keyId = keyIdRow[0].key_id;
	const q2 = `
			SELECT json_v as data FROM ts_kv
			JOIN device_credentials as dc ON ts_kv.entity_id = dc.device_id
			WHERE ts >= $1 AND ts <= $2
			AND key = $3
			AND dc.credentials_id = $4
	`

	const {rows: telemetry} = await executeQuery(q2, [startTs, endTs, keyId, accessToken])
	fs.writeFileSync("telemetry.json", JSON.stringify(telemetry, null, 2))
})()

