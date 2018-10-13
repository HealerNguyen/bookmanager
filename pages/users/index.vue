<template>
	<!-- <section class="container">
		<div>
			<h2 class="subtitle">
				List Users
			</h2>
			<div class="links">
				<nuxt-link :to="{ name: 'index'}" class="button--grey">
				Home
				</nuxt-link>
				<nuxt-link :to="{ name: 'users-add'}" class="button--grey">
				New User
				</nuxt-link>
				<ul>
					<li v-for="(user, index) in users" :key="index">
						<nuxt-link :to="{ name: 'users-id', params: { id: user.id } }">{{ user.email }}</nuxt-link>
					</li>
				</ul>
				<i>{{data}}</i>
			</div>
		</div>

	</section> -->
	<div>
		
	</div>
</template>

<script>
export default {
	data() {
		return {
			users: {},
			data: ''
		}
	},
	mounted() {
		//this.testAxios()
		//this.testCommon()
	},
	mixins: [common],
	methods: {
		// testAxios() {
		// 	let token = window.localStorage.getItem(token)
		// 	axios.get('/api/users', {params: {token: token}}).then(response => {
		// 		console.log(response.data)
		// 		this.users = response.data
		// 	}).catch(error => {
		// 		console.log(error.response)
		// 		if (error.response.status =='403') {
		// 			this.$router.push({name: 'login'})
		// 		}
		// 	})

		// }
		
	},
}
</script>

