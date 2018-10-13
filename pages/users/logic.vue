<template>
	<section class="container">
		<div>
			<app-logo/>
			<h1 class="title">
				nuxtjs
			</h1>
			<h2 class="subtitle">
				Nuxt.js project
			</h2>
			<div class="links">
				
				<template v-if="!isLoggedIn">
					<nuxt-link :to="{ name: 'register'}" class="button--grey">
					 Register
					</nuxt-link>
					<nuxt-link :to="{ name: 'login'}" class="button--grey">
					 Login
					</nuxt-link>
				</template>
				<template v-if="isLoggedIn">
					<nuxt-link :to="{ name: 'register'}" class="button--grey">
					 {{ user.email }}
					</nuxt-link>
					<a class="button--grey" @click="logout">
					 Logout
					</a>
				</template>
				<nuxt-link :to="{ name: 'post'}" class="button--grey">
				 Posts
				</nuxt-link>
				<nuxt-link :to="{ name: 'users'}" class="button--grey">
				 Users
				</nuxt-link>
			</div>
		</div>
	</section>
</template>

<script>
import AppLogo from '~/components/AppLogo.vue'
//import axios from 'axios'
import axios from '~/plugins/axios'

import common from "~/plugins/commonMixins.js"

// function createRequest(type, url, params) {
// 	let token = window.localStorage.getItem(token)
// 	let csrf = "";
// 	if (type.toLowerCase() == "get") {
// 		let dataParams = [token: token, csrf: csrf]
// 		dataParams.push(params)

// 		return axios.get(url, {
// 			params: dataParams
// 		})
// 	}
// }

export default {
	data() {
		return {
			isLoggedIn: false,
			user: {}
		}
	},
	mounted() {
		//this.testAxios()
		this.testCommon()
		this.testSession()
	},
	mixins: [common],
	methods: {
		testAxios() {
			axios.get('/api/getcsrftoken').then((response) => {
			  	axios.defaults.headers.common['X-CSRF-TOKEN'] = response.data.csrfToken
			  	$("meta[name='csrf-token']").attr("content", response.data.csrfToken);
			  	console.log(response.data.csrfToken)
			  	var token = $('meta[name=csrf-token]').attr("content");
			  	console.log(token)
			}, (err) => {
			  	console.log(err)
			})
		},
		testSession() {
			let token = window.localStorage.getItem(token)
			axios.get('/api/session-status', {params:{token: token}}).then(response => {

				console.log(response.data)
				if (response.data) {
					this.user = response.data
					if (this.user) {
						this.isLoggedIn = true
					}
				} else {
					this.isLoggedIn = false
				}
				// this.users = response.data
			}).catch(error => {
				console.log(error.response)
			})
		},
		logout() {
			let token = window.localStorage.getItem(token)
			axios.post('/api/logout', {token: token}).then(response => {
				//console.log(response.data)
				this.isLoggedIn = false
				window.localStorage.clear();
				// this.users = response.data
			}).catch(error => {
				this.isLoggedIn = false
				console.log(error.response)
			})
		}
	},
	components: {
		AppLogo
	}
}
</script>

