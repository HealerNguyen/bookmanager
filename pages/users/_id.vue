<template>
	<section class="container">
		<div>
			<h2 class="subtitle">
				User Detail
			</h2>
			<div class="links">
				<nuxt-link :to="{ name: 'post'}" class="button--grey">
					Posts
				</nuxt-link>
				<nuxt-link :to="{ name: 'index'}" class="button--grey">
					Home
				</nuxt-link>
				<nuxt-link :to="{ name: 'users'}" class="button--grey">
					Users
				</nuxt-link>
				<h3>Id: {{ user.id }}</h3>
				<h4>Name: {{ user.email }}</h4>
				<nuxt-link :to="{ name: 'users-edit-id', params:{id: user.id}}" style="color: #fff;">
					edit
				</nuxt-link>
				<a @click="deleteUser" style="color: #fff;">
					delete
				</a>
				
			</div>
		</div>
	</section>
</template>

<script>
import axios from 'axios'
import common from "~/plugins/commonMixins.js"
export default {
	data() {
		return {
			user: {}
		}
	},
	mounted() {
		this.testAxios()
		this.testCommon()
	},
	mixins: [common],
	methods: {
		testAxios() {
			let id = this.$route.params.id
			let token = window.localStorage.getItem(token)
			axios.get('/api/users/' + id, {params:{token: token}}).then(response => {
				//console.log(response.data)
				this.user = response.data
			}).catch(error => {
				console.log(error.response)
				if (error.response.status =='403') {
					this.$router.push({name: 'login'})
				}
			})
		},
		deleteUser() {
			let id = this.user.id
			let token = window.localStorage.getItem(token)
      		axios.post('/api/users/delete/' + id, {token: token, id: id}).then(response => {
				console.log(response.data)
				this.$router.push({name: 'index'})
			}).catch(error => {
				console.log(error.response)
				if (error.response.status =='403') {
					this.$router.push({name: 'login'})
				}
			}) 
		}
		
	},
}
</script>

