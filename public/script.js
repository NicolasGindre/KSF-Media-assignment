const apiUrl = "http://127.0.0.1:3000"

function loginOverlayOn() {
	document.getElementById("login-overlay").style.display = "block"
}

function loginOverlayOff() {
	document.getElementById("login-overlay").style.display = "none"
}

document.getElementById("login-btn").addEventListener("click", function (evt) {
	evt.preventDefault()
	let username = document.getElementById("login-username").value
	let password = document.getElementById("login-password").value

	login(username, password)
})

async function login(username, password) {
	console.log(username)
	console.log(password)
	let response = await fetch(apiUrl +"/login/",{
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({"username": username, "password": password}),
	})
	if (response.status === 200) {
		checkLogin()
		loginOverlayOff()
	} else {
		alert	("Error. Check username/password.")
	}
}

async function logout() {
	await fetch(apiUrl +"/login/",{
		method: "DELETE"
	})
	checkLogin()
}

checkLogin()
function checkLogin() {
	let firstName = getCookie("firstName")
	if (firstName != null) {
		let lastName = getCookie("lastName")
		document.getElementById("logged-out-navbar").style.display = "none"
		document.getElementById("logged-in-navbar").style.display = "block"
		let greetings = "Hello Mr "+ firstName +" "+ lastName
		document.getElementById("first-last-name").innerHTML = greetings
	} else {
		document.getElementById("logged-out-navbar").style.display = "block"
		document.getElementById("logged-in-navbar").style.display = "none"
	}
	fetchArticle()
}

async function fetchArticle() {
	let articleDataUrl = apiUrl + window.location.pathname.replace(/\/$/, "") +"/data"
	let response = await fetch(articleDataUrl)
	if (response.status === 200) {
		let articleData = await response.json()
		let html = getArticleHtml(articleData)
		document.getElementById("article-container").innerHTML = html
	} else {
		let html = "Article unavailable. Please log in or visit another article."
		html += " Also you better pay your subscription."
		document.getElementById("article-container").innerHTML = html
	}
}

function getCookie(name) {
	let myReg = new RegExp("^(?:.*;)?\\s*"+ name +"\\s*=\\s*([^;]+)(?:.*)?$")
	let value_or_null = (document.cookie.match(myReg)||[,null])[1]
	return value_or_null
}
