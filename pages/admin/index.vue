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
        <v-layout row wrap>
            <v-flex xs12 ms12 sm12 lg12 xl12>
			<v-toolbar
				class="test"
				color="deep-purple accent-4"
				cards
				dark
				flat
				fixed
				>
				<v-card-title class="title font-weight-regular">Trang quản trị</v-card-title>
				<v-spacer></v-spacer>
			</v-toolbar>
            </v-flex>
        </v-layout>
        <v-layout row wrap style="padding-top: 80px;">
            <v-flex xs12 sm6 md6 lg4 pa-3 >
                <v-card color="blue-grey darken-2" class="white--text" ripple v-bind:to="{name: 'admin-book'}">
                    <v-card-title primary-title>
                        <div class="headline"><v-icon class="white--text"   >import_contacts</v-icon> &nbsp; Quản lý sách</div>
                        <v-spacer></v-spacer>
                        <div class="headline">{{ totalBook }}</div>
                    </v-card-title>
                </v-card>
            </v-flex>

            <v-flex xs12 sm6 md6 lg4 pa-3>
                <v-card color="blue-grey darken-2" class="white--text" ripple v-bind:to="{name: 'admin-author'}">
                    <v-card-title primary-title>
                        <div class="headline"><v-icon class="white--text">group</v-icon> &nbsp; Quản lý tác giả</div>
                        <v-spacer></v-spacer>
                        <div class="headline">{{ totalAuthor }}</div>
                    </v-card-title>
                </v-card>
            </v-flex>

            <v-flex xs12 sm6 md6 lg4 pa-3>
                <v-card color="blue-grey darken-2" class="white--text" ripple v-bind:to="{name: 'admin-user'}">
                    <v-card-title primary-title>
                        <div class="headline"><v-icon class="white--text">group</v-icon> &nbsp; Quản lý thành viên</div>
                        <v-spacer></v-spacer>
                        <div class="headline">{{ totalUser }}</div>
                    </v-card-title>
                </v-card>
            </v-flex>

            <v-flex xs12 sm6 md6 lg4 pa-3>
                <v-card color="blue-grey darken-2" class="white--text" ripple v-bind:to="{name: 'admin-category'}">
                    <v-card-title primary-title>
                        <div class="headline"><v-icon class="white--text">list</v-icon> &nbsp; Quản lý danh mục</div>
                        <v-spacer></v-spacer>
                        <div class="headline">{{ totalCate }}</div>
                    </v-card-title>
                </v-card>
            </v-flex>
        </v-layout>
	</div>
</template>

<script>
import axios from 'axios'

export default {
	data() {
		return {
            countData: {},
            totalCate: '',
            totalBook: '',
            totalAuthor: '',
            totalUser: ''
		}
	},
	mounted() {
        this.getAuthUserAdmin()
        this.getCountData()
	},
	mixins: [],
	
    methods: {
		getCountData() {
            axios.get('/api/dashboard/count').then(response => {
                //console.log(response.data.countCate)
                this.countData = response.data.countCate
                this.totalCate = this.countData[0][0].total
                this.totalUser = this.countData[1][0].total
                this.totalAuthor = this.countData[2][0].total
                this.totalBook = this.countData[3][0].total
            }).catch(error => {
                console.log(error)
            })
        }
    }
}
</script>
<style scoped>
  .test {
	  top: 64px;
	  padding-left: 15px !important;
  }
  @media only screen and (max-width: 768px) {
	  .test {
		  top: 55px;
	  }
  }
</style>
