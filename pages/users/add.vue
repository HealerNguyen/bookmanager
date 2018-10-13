<template>
	<section class="container">
		<div>
			<h2 class="subtitle">
				New User
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
				<div class="box-login">
					<b-form @submit="add">
						<b-form-group id="exampleInputGroup1"
										label="Email address:"
										label-for="exampleInput1"
										description="">
							<b-form-input id="exampleInput1"
										  type="email"
										  v-model="user.email"
										  required
										  placeholder="Enter email">
							</b-form-input>
						</b-form-group>
						<b-form-group id="exampleInputGroup2"
										label="Password:"
										label-for="exampleInput2"
										description="">
							<b-form-input id="exampleInput2"
										  type="password"
										  v-model="user.password"
										  required
										  placeholder="Enter password">
							</b-form-input>
						</b-form-group>
						<b-button type="submit" variant="primary">add</b-button>
					</b-form>
				</div>
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
			user: {
				email: '',
				password: ''
			}
		}
	},
	mounted() {
		this.testCommon()
	},
	mixins: [common],
	methods: {
		add(evt) {
			evt.preventDefault();
			let id = this.$route.params.id
			let token = window.localStorage.getItem(token)
      		axios.post('/api/users/add', {token: token, user: this.user}).then(response => {
				console.log(response.data)
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

