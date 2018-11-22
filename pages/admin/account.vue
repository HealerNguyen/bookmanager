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
		<v-snackbar
			v-model="snackbar"
			:right="x === 'right'"
			:timeout="timeout"
			auto-height
			:color="colorSnackbar"
			>
			{{ text }}
			<v-btn
				color="white"
				flat
				@click="snackbar = false"
			>
				Close
			</v-btn>
		</v-snackbar>
		<v-layout row wrap class="max-height-200">
			<v-img :aspect-ratio="16/9" src="https://cdn.vuetifyjs.com/images/parallax/material.jpg">
				<v-layout pa-2 column fill-height class="lightbox white--text">
					<v-spacer></v-spacer>
					<v-flex shrink>
						<!-- <div class="subheading">{{ authUser.name }}</div>
						<div class="body-1">{{ authUser.email }}</div> -->
						<v-list-tile>
							<v-list-tile-avatar color="red">
								<span class="white--text headline">{{ authUser.avatar }}</span>
							</v-list-tile-avatar>
							<v-list-tile-content>
								<v-list-tile-title>{{ authUser.name }}</v-list-tile-title>
								<v-list-tile-sub-title>{{ authUser.email }}</v-list-tile-sub-title>
							</v-list-tile-content>
						</v-list-tile>
					</v-flex>
				</v-layout>
			</v-img>	
        </v-layout>
		<v-layout row wrap>
			<v-toolbar
				color="white"
				
				tabs
				class="aaa"
			>
				<v-tabs
					v-model="tab"
					color="white"
					grow
					show-arrows
				>
					<v-tabs-slider color="green"></v-tabs-slider>

					<v-tab
					active-class="default-class green--text active-tab--class"
					v-for="(item, index) in items"
					:key="index"
					:href="'#tab-' + index"
					>
					<v-icon class="i-color">{{ item.icon }} </v-icon>  {{ item.text }}
					</v-tab>
				</v-tabs>
			</v-toolbar>

			<v-tabs-items v-model="tab" style="width: 100%;">
				<v-tab-item
					key="0"
					id="tab-0"
				>
					<v-card flat>
						<v-card-text>
							<v-layout align-center justify-center>
								<v-card
									class="mx-auto pl-3 pr-3 pt-3 pb-3"
									width="480"
								>
									<v-flex class="text-xs-center">
										<h6 class="green--text">Thông tin tài khoản</h6>
										<v-list-tile-sub-title class="red--text"><i>(Quản trị viên)</i></v-list-tile-sub-title>
									</v-flex>
									<v-form ref="form" v-model="valid" lazy-validation @submit.prevent="editAccount">
										<v-text-field 
											prepend-icon="person" 
											name="name"
											v-model="user.name" 
											label="Nhập tên" 
											type="text"
											:rules="nameRules"
											required
											color="green"
										></v-text-field>
										<v-text-field 
											prepend-icon="email" 
											name="email"
											v-model="user.email" 
											label="Nhập email" 
											type="text"
											:rules="emailRules"
											required
											color="green"
										></v-text-field>
										<v-text-field 
											prepend-icon="phone" 
											name="phone"
											v-model="user.phone" 
											label="Nhập số điện thoại " 
											type="text"
											:rules="phoneRules"
											required
											color="green"
										></v-text-field>
										<v-text-field 
											prepend-icon="location_city" 
											name="address"
											v-model="user.address" 
											label="Nhập địa chỉ" 
											type="text"
											:rules="addRules"
											required
											color="green"
										></v-text-field>
										<v-menu
											ref="menu"
											:close-on-content-click="false"
											v-model="menu"
											:nudge-right="40"
											lazy
											transition="scale-transition"
											offset-y
											full-width
											min-width="290px"
										>
											<v-text-field
												slot="activator"
												v-model="date"
												label="Ngày sinh"
												prepend-icon="event"
												readonly
												color="green"
											></v-text-field>
											<v-date-picker
												color="green"
												ref="picker"
												v-model="date"
												:max="new Date().toISOString().substr(0, 10)"
												min="1950-01-01"
												@change="save"
											></v-date-picker>
										</v-menu>
										<v-card-actions class="center-content">
											<v-btn 
												type="submit"
												:loading="loading"
												color="green" 
												class="white--text" 
												round 
												:disabled="!valid" ><v-icon>check_circle</v-icon> Lưu </v-btn>
											<v-btn 
												color="primary" 
												class="white--text" 
												round 
												v-bind:to="{name: 'vi-books'}"
											><v-icon>import_contacts</v-icon> Mượn sách</v-btn>
											<!-- <v-btn 
												color="red" 
												class="white--text" 
												round 
											><v-icon>face</v-icon> Thay avatar</v-btn> -->
										</v-card-actions>
									</v-form>
								</v-card>
								
							</v-layout>
							
						</v-card-text>
					</v-card>
				</v-tab-item>

				<!--  -->

				<v-tab-item
					key="1"
					id="tab-1"
				>
					<v-card flat>
						<v-card-title primary-title class="pt-0">
							<v-layout row wrap>
								<v-flex xs12 sm12 md12 lg12>
									<!-- <a class="sum-record">Tổng số: 9</a> -->
									<v-btn small class="btn-sum btn-green white--text" style="text-transform: unset">Đã đăng nhập: {{ totalRowsLogin }} lần</v-btn>
									<!-- <v-btn small class="btn-sum white--text" color="info"  style="text-transform: unset">Đang mượn: {{ borrowing }}</v-btn> -->
									<!-- <v-btn small class="btn-sum white--text" color="red" style="text-transform: unset">Đã trả: {{ borrowDone }}</v-btn> -->
								</v-flex>
								<!-- <v-flex xs6 sm6 md6 lg6  class="text-xs-right">
									<v-btn small class="btn-green white--text" v-bind:to="{name: 'book-add'}"><v-icon>add_circle</v-icon>&nbsp; Thêm mới</v-btn>
								</v-flex> -->
								<v-flex xs12 sm12 md12 lg12 xl12>
									<v-divider></v-divider>
								</v-flex>
							</v-layout>
						</v-card-title>
						<v-card-text>
							<v-layout row wrap>
								<div class="table__overflow" style="width: 100%;">
									<table class="table" style="width: 100%;">
										<thead>
											<th>#</th>
											<th>Tài khoản đăng nhập</th>
											<th>Unique browser</th>
											<th>Hệ điều hành</th>
											<th>Trình duyệt</th>
											<th>Lần đăng nhập cuối</th>
											<!-- <th>Tên sách</th>
											<th>Trạng thái</th>
											<th>Ngày mượn</th>
											<th>Ngày trả(dự tính) </th>
											<th>Ngày trả(thực tế) </th>
											<th>Ghi chú </th> -->
											<!-- <th>Mô tả</th>
											<th>Mô tả ngắn</th>
											<th>Giá</th>
											
											<th>Trạng thái</th>
											<th>Ngày tạo</th>
											<th>Thao tác</th> -->
										</thead>
										<tbody class="text-xs-center">
											<tr style="text-align: center" v-for="(session , index) in userLoginSessions" :key="index">
												<td>{{ index + 1 }}</td>
												<td>{{ session.email}}</td>
												<td>{{ session.client_id}}</td>
												<th>{{ session.json ? JSON.parse(session.json).OS : '-' }}</th>
												<th>{{ session.json ? JSON.parse(session.json).browser : '-' }}</th>
												<td>{{ session.last_login}}</td>
												<!-- <td>{{ JSON.parse(book.json).name }}</td>
												<td>{{ book.status == '1' ? 'Đã trả' : 'Đang mượn' }}</td>
												<td>{{ book.created_date }}</td>
												<td>{{ book.to_date }}</td>
												<td>{{ book.real_date ? book.real_date : '-' }}</td>
												<td>{{ book.note }}</td> -->
											</tr>
										</tbody>
									</table>
								</div>
							</v-layout>
							<v-flex xs12 sm12 md12 lg12 class="text-xs-center" v-if="isShow">
								<v-btn small color="primary" class="white--text " :loading="loading1" round @click="loadmore()">Xem Thêm</v-btn>
							</v-flex>
						</v-card-text>
					</v-card>
				</v-tab-item>
			</v-tabs-items>
		</v-layout>
	</div>
</template>

<script>
import axios from 'axios'

export default {
	data() {
		return {
			tab: null,
			items: [
				{text: 'Tài khoản', icon: 'account_circle'},
				{text: 'Quản lý đăng nhập', icon: 'dashboard'},
			],
			valid: false,
            password: '',
			name: '',
			address: '',
			addRules: [
                v => !!v || 'Vui lòng nhập địa chỉi',
            ],
            nameRules: [
                v => !!v || 'Vui lòng nhập tên của bạn',
            ],
            passRules: [
                v => !!v || 'Vui lòng nhập mật khẩu',
                v => v.length <= 15 || 'Mật khẩu phải ít hơn 15 kí tự '
            ],
            email: '',
            emailRules: [
                v => !!v || 'Vui lòng nhập email',
                v => /.+@.+/.test(v) || 'E-mail không đúng định dạng'
			],
			phone: '',
            phoneRules: [
                v => !!v || 'Vui lòng nhập số điện thại',
            ],
            snackbar: false,
            x: 'right',
            timeout: 6000,
            text: 'sssssssssssssssssss',
            colorSnackbar: '',
            loader: null,
			loading: false,
			loading1: false,
			date: null,
			menu: false,
			user: {},
			borrowBooks: {},
			totalRows: 0,
			userLoginSessions: {},
			page: 0,
			isShow: false,
			isLoadMore: false,
			totalRowsLogin: 0,
		}
	},
	mounted() {
		this.getAuthUserAdmin()
		this.getAuthUser()
	},
	mixins: [],
	watch: {
      menu (val) {
        val && this.$nextTick(() => (this.$refs.picker.activePicker = 'YEAR'))
      }
    },
    methods: {
		getUserSessions() {
			axios.get('/api/users/get-user-session', 
				{
					params: {
						email: this.user.email,
						page: this.page
					}
				}
			).then(response => {
				console.log(response.data)
				//this.userLoginSessions = response.data.userLoginSessions
				this.totalRowsLogin = response.data.totalRows
				this.isShow = response.data.isShow
				if (this.isLoadMore == true)  {
					this.userLoginSessions = this.userLoginSessions.concat(response.data.userLoginSessions);
				} else {
					this.userLoginSessions = response.data.userLoginSessions
				}
			}).catch(err => {
				console.log(err.response)
			}).finally(call => {
				this.isLoadMore = false
				this.loader = null
				this.loading1 = false
			})
		},
		loadmore() {
			this.isLoadMore = true
			this.page += 1
			this.loader = 'loading1'
            const l = this.loader
			this[l] = !this[l]
			this.getUserSessions()
		},
      	save (date) {
        	this.$refs.menu.save(date)
		},
		getAuthUser() {
			//if (this.authUser) {
				axios.post('/api/users/getUserByMail', {
					dataEmail:  this.$store.getters.authUser.email
				}).then(response => {
					console.log(response.data)
					if (response.data) {
						
						this.user = response.data
						this.getUserSessions()
						if(response.data.birthday) {
							console.log(response.data.birthday)
							this.date = response.data.birthday
						}
					}
				}).catch(err => {
					console.log(err)
				}).finally(callback => {

				})
			//}
		},
		editAccount() {
			if (this.$refs.form.validate()) {
                this.loader = 'loading'
                const l = this.loader
				this[l] = !this[l]
				let data = {
					id: this.user.id,
					name: this.user.name,
					email: this.user.email,
					phone: this.user.phone,
					address: this.user.address,
					date: this.date
				}
				axios.post('/api/users/userEditProfile', {data}).then(response => {
					console.log(response)
					if (response.data.stt == true) {
						this.snackbar =  true
                        this.text = response.data.msg
						this.colorSnackbar = 'green'
						this.getAuthUser()
					} else {
						this.snackbar =  true
                        this.text = response.data.msg
                        this.colorSnackbar = 'red'
					}
				}).catch(err => {
					console.log(err)
				}).finally(callback => {
					this.loader  = null
					this.loading  = false
				})
			}
		}
	},
	
}
</script>
<style scoped>
  .max-height-200 {
	  max-height: 160px;
  }
  .aaa {
	  height: 56px !important;
  }
  @media only screen and (max-width: 768px) {
	  .aaa {
		  height: 53px !important;
	  }
  }
  .active-tab--class i {
	  color: green !important;
  }

  table td {
	  font-size: 14px;
  }
  

  .lightbox {
    box-shadow: 0 0 20px inset rgba(0, 0, 0, 0.2);
    background-image: linear-gradient(to top, rgba(0, 0, 0, 0.4) 0%, transparent 72px);
  }
</style>
