const express = require("express")
const app = express()
const path = require("path")
const port = process.env.PORT || 3000

const cookieParser = require("cookie-parser")
app.use(cookieParser())

const ksfApi = require("./KSF_api")

app.use(express.json())
app.use('/public', express.static(__dirname + '/public'))

app.get("/article/:uuid", async (req, res) => {
	res.sendFile(path.join(__dirname + "/public/index.html"))
})

app.get("/article/:uuid/data", async (req, res) => {
	try {
		let articleUuid = req.params.uuid
		let token = null
		let loginUuid = null
		if (req.cookies.token != null) {
			token = req.cookies.token
		}
		if (req.cookies.uuid != null) {
			loginUuid = req.cookies.uuid
		}
		console.log("getting article : "+ articleUuid)
		console.log("loginUuid : "+ loginUuid)
		let article = await ksfApi.getArticle(articleUuid, loginUuid, token)
		res.json(article)

	} catch(err) {
		res.status(400).json({ err: err })
	}
})

app.post("/login", async (req, res) => {
	try {
		let username = req.body.username
		let password = req.body.password
		console.log("Tentative login of user "+ username)
		// let username = "365-tester@ksfmedia.fi"
		// let password = "Tester-testingHBL365"

		let loginData = await ksfApi.login(username, password)
		let maxAge = 365 * 24 * 60 * 60 * 1000
		res.writeHead(200, {
			"Set-Cookie": [
				"token="+ loginData.token +"; Path=/; HttpOnly; Secure; Max-Age="+ maxAge,
				"uuid="+ loginData.uuid +"; Path=/; HttpOnly; Secure; Max-Age="+ maxAge,
				"firstName="+ loginData.firstName +"; Path=/; Secure; Max-Age="+ maxAge,
				"lastName="+ loginData.lastName +"; Path=/; Secure; Max-Age="+ maxAge,
			],
			"Access-Control-Allow-Credentials": "true"
		}).send()
	} catch(err) {
		res.status(400).json({ "err": err })
	}
})

app.delete("/login", async (req, res) => {
	try {
		await ksfApi.logout(req.cookies.uuid, req.cookies.token)
		res.writeHead(202, {
			"Set-Cookie": [
				"token=''; Path=/; HttpOnly; Secure; Max-Age=0",
				"uuid=''; Path=/; HttpOnly; Secure; Max-Age=0",
				"firstName=''; Path=/; Secure; Max-Age=0",
				"lastName=''; Path=/; Secure; Max-Age=0",
			],
			"Access-Control-Allow-Credentials": "true"
		}).send()
	} catch(err) {
		res.status(400).json({ "err": err })
	}
})


app.listen(port, () => {
	console.log(`listening on ${ port }`)
})
