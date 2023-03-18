//console.log("こんにちは");
//console.log("さようなら");

const express = require("express");
const app = express();
const coraonaData = require("./coronaData.json");
const fs = require("fs");
app.use(express.urlencoded({ extended: true }));
const activities = require("./activities.json");


app.get("/", function (req, res) {
//	res.send("<h1>こんにちはの見出し</h1>");
//	res.send(
//		{
//			"name": "小川",
//			"age": "59"
//		}
//	);
// res.send(coraonaData);
// console.log("__dirnameの中身" + __dirname);
	res.sendFile(__dirname + "/index.html");
});

app.post("/autumn", function (req, res) {
//	console.log("POSTリクエストの確認");
//	console.log("reqの中身", req.body);
//	console.log(req.body.activity);
	const activity = req.body.activity;
	fs.writeFile(__dirname + "/data.txt", activity.toString(), function () {
		res.send("投稿完了");
	});
});

app.post("/update", function (req, res) {
	console.log(activities);
	console.log(activities[0].activity);
	activities[0].activity = req.body.updateActivity;
	res.send(activities);
});

app.post("/delete", function (req, res) {
	//	console.log(req.body);
	activities.splice(req.body.number, 1);
	res.send(activities);
} );

const port = process.env.PORT || 5000;

app.listen(port, function () {
	console.log( `Listening on localhost port ${port}` );
});
