const axios = require("axios")

const personaUrl = "https://persona.api.ksfmedia.fi/v1/"
const letteraUrl = "https://lettera.api.ksfmedia.fi/v3/"

module.exports = {

	login: async function(username, password) {
		
		let loginUrl = personaUrl +"login"
		let data = {
			"username": username,
			"password": password
		}
		let response = await axios.post(loginUrl, data)

		let loginData = {}
		loginData.uuid = response.data.uuid
		loginData.token = response.data.token
		if (loginData != null) {
			let userUrl = personaUrl +"users/"+ loginData.uuid
			config = {
				headers: {
					"Authorization": getOAuth(loginData.token)
				}
			}
			response = await axios.get(userUrl, config)
			loginData.firstName = response.data.firstName
			loginData.lastName = response.data.lastName
		} else {
			throw "Unexepected response"
		}
		return loginData
	},

	logout: async function(uuid, token) {
		let config = {
			headers: {
				"Authorization": getOAuth(token)
			}
		}
		let url = personaUrl +"login/"+ uuid
		let response = await axios.delete(url, config)

		return response.data
	},
	
	getArticle:  async function(articleUuid, loginUuid, token) {
		let config = {}
		if (loginUuid != null && token != null) {
			config = {
				headers: {
					"AuthUser": loginUuid,
					"Authorization": getOAuth(token)
				}
			}
		}
		let url = letteraUrl +"article/"+ articleUuid
		let response = await axios.get(url, config)
		return response.data
	},
}

function getOAuth(token) {
	return "OAuth "+ token
}
