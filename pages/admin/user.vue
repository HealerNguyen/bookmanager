<template>
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
				<v-icon>{{ iconStatus }}</v-icon>
			</v-btn>
		</v-snackbar>
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
				<v-btn icon v-bind:to="{name: 'admin'}">
					<v-icon>arrow_back</v-icon>
				</v-btn>
				<v-card-title class="title font-weight-regular">Quản lý thành viên</v-card-title>
				<v-spacer></v-spacer>
			</v-toolbar>
	      </v-flex>
			<v-flex xs12 ms12 sm12 lg12 xl12 style="padding-top: 80px;">
			<v-card>
		        <v-card-title primary-title>
					<v-flex xs12 md12>
						<v-form @submit.prevent="search()">
							<v-layout row wrap>
								<v-flex xs12 sm4 md4 lg4 pr-2>
									<v-text-field 
										name="name"
										v-model="query" 
										label="Nhập tên thành viên" 
										type="text"
										autofocus
										color="green"
									></v-text-field>
								</v-flex>
								<v-flex xs12 sm4 md4 lg4 pr-2>
									<v-select
										:items="statuses"
										v-model="status"
										single-line
										item-text="tentt"
										item-value="matt"
										return-object
										persistent-hint
										color="green"
										label="Trạng thái"
									></v-select>
								</v-flex>
								<v-radio-group v-model="gender" :mandatory="false" @change="changeGender">
									<v-layout row wrap>
										<v-flex xs6 sm6 md6 lg6>
											<v-radio label="Nam" value="1" color="primary"></v-radio>
										</v-flex>
										<v-flex xs6 sm6 md6 lg6>
											<v-radio label="Nữ" value="2" color="primary"></v-radio>
										</v-flex>
									</v-layout>
								</v-radio-group>
								<v-card-actions>
									<v-btn color="primary lighten-1" 
										type="submit" 
										class="white--text"
										:loading="loading"
										round
										small
									>Tìm kiếm &nbsp;
										<v-icon>search</v-icon>
									</v-btn>
								</v-card-actions>
							</v-layout>
						</v-form>
					</v-flex>
				</v-card-title>
		         <v-card-title primary-title class="pt-0">
		         	<v-layout row wrap>
		         		<v-flex xs6 sm6 md6 lg6>
		         			<!-- <a class="sum-record">Tổng số: 9</a> -->
		         			<v-btn small class="btn-sum btn-green white--text" style="text-transform: unset">Tổng số: {{ totalRows }}</v-btn>
		         		</v-flex>
		         		<v-flex xs6 sm6 md6 lg6  class="text-xs-right">
		         			<!-- <v-btn small class="btn-green white--text" v-bind:to="{name: 'category-add'}"><v-icon>add_circle</v-icon>&nbsp; Thêm mới</v-btn> -->
		         		</v-flex>
		         		<v-flex xs12 sm12 md12 lg12 xl12>
					          <v-divider></v-divider>
					    </v-flex>
		         	</v-layout>
		         </v-card-title>
		        <v-card-title primary-title>
		         	<v-layout row wrap>
		         		<div class="table__overflow" style="width: 100%;">
		         			<table class="table" style="width: 100%;">
		         				<thead>
		         					<th>#</th>
		         					<th>Tên</th>
		         					<th>Email</th>
									<th>Số điện thoại</th>
		         					<th>Ngày sinh</th>
									<th>Giới tínhh</th>
									<th>Địa chỉ</th>
		         					<th>Trạng thái</th>
		         					<th>Ngày tạo</th>
		         					<th>Thao tác</th>
		         				</thead>
		         				<tbody class="text-xs-center">
		         					<tr style="text-align: center" v-for="(user , index) in users" :key="index">
												<td>{{ index + 1 }}</td>
												<td>{{ user.name }}</td>
												<td>{{ user.email }}</td>
												<td>{{ user.phone ? user.phone: '-' }}</td>
												<td>{{ user.birthday ? user.phone : '-' }}</td>
												<td>{{ user.gender == 1 ? 'Nam' : 'Nu' }}</td>
												<td>{{ user.address ? user.address : '-' }}</td>												
												<td v-if="user.status == '0'">Nhap</td>
												<td v-if="user.status == '1'">Active</td>
												<td v-if="user.status == '2'">Deactive</td>
												<td>{{ user.created_at }}</td>
												<td>
													<v-speed-dial
															
															:left="left"
															:direction="direction"
															:open-on-hover="hover"
															:transition="transition"
															class="btn-action"
														>

															<v-btn
																slot="activator"
																v-model="fab"
																fab
																hover
																class="btn-for-action"
															>
																<v-icon class="green--text">more_horiz</v-icon>
																<v-icon>close</v-icon>
															</v-btn>
															
															<v-tooltip bottom>
															<v-btn
																fab
																dark
																small
																color="indigo"
																slot="activator"
																v-bind:to="{name: 'users-edit-id', params: { id: user.id }}"
															>
																<v-icon>edit</v-icon>
															</v-btn>
															<span class="white--text">Sửa</span>
															</v-tooltip>
															<v-tooltip bottom>
															<v-btn
																fab
																dark
																small
																color="red"
																slot="activator"
																@click="deleteUser(index)"
															>
																<v-icon>delete</v-icon>
															</v-btn>
															<span class="white--text">Xóa</span>
															</v-tooltip>
														</v-speed-dial>
												</td>
									 		</tr>
		         				</tbody>
		         			</table>
		         		</div>
		         	</v-layout>
		         	<v-flex xs12 sm12 md12 lg12 class="text-xs-center" v-if="isShow">
		         		<v-btn small color="primary" class="white--text " :loading="loading1" round @click="loadmore()">Xem Thêm</v-btn>
		         	</v-flex>
		         </v-card-title>
	      	</v-card>
	      </v-flex>
		</v-layout>
		<v-layout row justify-center>
			<v-dialog v-model="dialog" persistent max-width="300" ref="idDetele">
			<v-card>
				<v-card-title class="headline red--text">Bạn đã chắc chắn?</v-card-title>
				<v-card-text></v-card-text>
				<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="red darken-1" flat @click.native="dialog = false">Cancel</v-btn>
				<v-btn color="green darken-1" :loading="loading" flat @click="doDelete()">Xóa</v-btn>
				</v-card-actions>
			</v-card>
			</v-dialog>
		</v-layout>
	</div>
</template>

<script>
import axios from 'axios'

export default {
	data() {
		return {
			gender: '',
			loader: null,
            loading: false,
			loading1: false,
			dialog: false,
			direction: 'left',
			fab: false,
			hover: true,
			left: true,
			transition: 'slide-y-reverse-transition',
			users: {},
			snackbar: false,
            x: 'right',
            timeout: 6000,
            text: 'sssssssssssssssssss',
            colorSnackbar: '',
			iconStatus: 'check_circle',
			query: '',
			status: '',
			statuses: [
				{tentt: 'Test', matt: '0'},
				{tentt: 'Active', matt: '1'},
				{tentt: 'Deactive', matt: '2'}
			],
			page: 0,
			isShow: false,
			isLoadMore: false,
			totalRows: ''
		}
	},
	mounted() {
		this.query = (typeof this.$route.query.s != "undefined") ? this.$route.query.s : ""
		this.status = (typeof this.$route.query.status != "undefined") ? this.$route.query.status : ''
		this.gender = (typeof this.$route.query.gender !== "undefined") ? this.$route.query.gender: ''
		this.getAuthUserAdmin()
		this.getAllUsers()
	},
	mixins: [],
	methods: {
		getAllUsers() {
			axios.get('/api/users/usersall', 
				{
					params: {
						query: this.query, page: this.page, status: this.status, gender: this.gender
					}
				}
			).then(response => {
				console.log(response.data)
				this.isShow = response.data.isShow
				this.totalRows = response.data.totalRows
				if (this.isLoadMore == true)  {
					this.users = this.users.concat(response.data.users);
				} else {
					this.users = response.data.users
				}
			}).catch(err => {
				console.log(err.response)
			}).finally(call => {
				this.isLoadMore = false
				this.loader = null
				this.loading1 = false
			})
		},
		changeGender() {
			this.search()

		},
		search() {
			this.page = 0;
			let query = this.query;
			let status = this.status;
			let gender = this.gender;

			if (this.status.matt) {
				this.$router.push("/admin/user?s=" + this.query + "&" + "status=" + this.status.matt + "&" + "gender=" + this.gender)
				this.status = this.status.matt
			} else {
				this.$router.push("/admin/user?s=" + this.query + "&" + "status=" + status + "&" + "gender=" + this.gender)
				this.status = this.status
			}	
			this.getAllUsers()
		},
		loadmore() {
			this.isLoadMore = true
			this.page += 1
			this.loader = 'loading1'
            const l = this.loader
			this[l] = !this[l]
			this.getAllUsers()
		},
		deleteUser(index) {
			this.dialog = true
			let id = this.users[index].id
			this.$refs.idDetele = id
		},
		doDelete() {
			this.loader = 'loading'
            const l = this.loader
			this[l] = !this[l]
			let id = this.$refs.idDetele
			axios.post('/api/users/delete', {
				id: id
			}).then(response => {
				if (response.data.stt == true) {
					this.snackbar = true
					this.iconStatus = 'check_circle'
					this.text = response.data.msg
					this.colorSnackbar = 'green'
				} else {
					this.snackbar = true
					this.iconStatus = 'cancel'
					this.text = response.data.msg
					this.colorSnackbar = 'red'
				}					
			}).catch(error => {
				this.snackbar = true
				this.iconStatus = 'cancel'
				this.text = 'Ops! Đã có lỗi xảy ra'
				this.colorSnackbar = 'red'
			}).finally(callback => {
				this.loader = null
				this.loading = false
				this.dialog = false
				this.getAllUsers()
			})
		},

	}
}
</script>
<style scoped>
  table td {
	  font-size: 14px;
  }
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
