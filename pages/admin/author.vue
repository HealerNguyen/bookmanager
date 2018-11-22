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
				<v-card-title class="title font-weight-regular">Quản lý tác giả</v-card-title>
				<v-spacer></v-spacer>
			</v-toolbar>
	      </v-flex>
			<v-flex xs12 ms12 sm12 lg12 xl12 style="padding-top: 80px;">
			<v-card>
		        <v-card-title primary-title>
					<v-flex xs12 md12>
						<v-form @submit.prevent="search()">
							<v-layout row wrap>
								<v-flex xs12 sm3 md3 lg3 pr-2>
									<v-text-field 
										name="name"
										v-model="query" 
										label="Nhập tên tác giả" 
										type="text"
										autofocus
										color="green"
									></v-text-field>
								</v-flex>
								<v-flex xs12 sm3 md3 lg3 pr-2>
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
								<v-flex xs12 sm3 md3 lg3 pr-2>
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
								</v-flex>
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
		         			<v-btn small class="btn-green white--text" v-bind:to="{name: 'author-add'}"><v-icon>add_circle</v-icon>&nbsp; Thêm mới</v-btn>
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
		         					<th>Ngày sinh</th>
		         					<th>Giới tính</th>
									<th>Trạng thái</th>
		         					<th>Ngày tạo</th>
		         					<th>Thao tác</th>
		         				</thead>
		         				<tbody class="text-xs-center">
		         					<tr style="text-align: center" v-for="(author , index) in authors" :key="index">
												<td>{{ index + 1 }}</td>
												<td>
												{{ author.name }} &nbsp;
												 <v-avatar color="teal">
													<span class="white--text headline">{{ author.image }}</span>
												</v-avatar>
												</td>
												<td>{{ author.email }}</td>
												<td>{{ author.birthday }}</td>
												<td v-if="author.gender == '1'">Nam</td>
												<td v-if="author.gender == '2'">Nữ</td>
												<td v-if="author.status == '0'">Nhap</td>
												<td v-if="author.status == '1'">Active</td>
												<td v-if="author.status == '2'">Deactive</td>
												<td>{{ author.created_date }}</td>
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
																	color="green"
																	slot="activator"
																	@click="view(index)"
																>
																	<v-icon>remove_red_eye</v-icon>
																</v-btn>
																<span class="white--text">Xem</span>
															</v-tooltip>
															<v-tooltip bottom>
															<v-btn
																fab
																dark
																small
																color="indigo"
																slot="activator"
																v-bind:to="{name: 'author-edit-id', params: { id: author.id }}"
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
																@click="deleteCate(index)"
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
				<v-card-text>
					<p>
						Thông tin của tác giả này sẽ bị xóa khỏi dữ liệu của bạn
					</p>
				</v-card-text>
				<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="red darken-1" flat @click.native="dialog = false">Cancel</v-btn>
				<v-btn color="green darken-1" :loading="loading" flat @click="doDelete()">Xóa</v-btn>
				</v-card-actions>
			</v-card>
			</v-dialog>
		</v-layout>
		<v-layout row justify-center>
			<v-dialog v-model="dialogView" max-width="400">
				<v-card>
					<v-img
					src="https://cdn.vuetifyjs.com/images/lists/ali.png"
					height="200px"
					>
					<v-layout
						column
						fill-height
					>
						<v-card-title>
						<v-btn dark icon>
							<v-icon>chevron_right</v-icon>
						</v-btn>

						<v-spacer></v-spacer>

						<v-btn dark icon class="mr-3">
							<v-icon>edit</v-icon>
						</v-btn>

						<v-btn dark icon @click.native="dialogView = false">
							<v-icon>cancel</v-icon>
						</v-btn>
						</v-card-title>

						<v-spacer></v-spacer>

						<v-card-title class="white--text pl-5 pt-5">
						<div class="display-1 pl-5 pt-5">Ali Conners</div>
						</v-card-title>
					</v-layout>
					</v-img>

					<!-- <v-list two-line>
						<v-list-tile>
							<v-list-tile-action>
								<v-icon color="indigo">phone</v-icon>
							</v-list-tile-action>

							<v-list-tile-content>
								<v-list-tile-title>(650) 555-1234</v-list-tile-title>
								<v-list-tile-sub-title>Mobile</v-list-tile-sub-title>
							</v-list-tile-content>
						</v-list-tile>
						<v-list-tile>
							<v-list-tile-action>
								<v-icon color="indigo">phone</v-icon>
							</v-list-tile-action>

							<v-list-tile-content>
								<v-list-tile-title>(650) 555-1234</v-list-tile-title>
								<v-list-tile-sub-title>Mobile</v-list-tile-sub-title>
							</v-list-tile-content>
						</v-list-tile> 
					</v-list> -->
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
			dialogView: false,
			loader: null,
            loading: false,
			loading1: false,
			dialog: false,
			direction: 'left',
			fab: false,
			hover: true,
			left: true,
			transition: 'slide-y-reverse-transition',
			authors: {},
			snackbar: false,
            x: 'right',
            timeout: 6000,
            text: 'sssssssssssssssssss',
            colorSnackbar: '',
			iconStatus: 'check_circle',
			query: '',
			status: '',
			gender: '',
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
		this.getAllAuthors()
	},
	mixins: [],
	methods: {
		getAllAuthors() {
			axios.get('/api/authors/authors', 
				{
					params: {
						query: this.query, page: this.page, status: this.status, gender: this.gender
					}
				}
			).then(response => {
				this.isShow = response.data.isShow
				this.totalRows = response.data.totalRows
				if (this.isLoadMore == true)  {
					this.authors = this.authors.concat(response.data.authors);
				} else {
					this.authors = response.data.authors
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
				this.$router.push("/admin/author?s=" + this.query + "&" + "status=" + this.status.matt + "&" + "gender=" + this.gender)
				this.status = this.status.matt
			} else {
				this.$router.push("/admin/author?s=" + this.query + "&" + "status=" + status + "&" + "gender=" + this.gender)
				this.status = this.status
			}	
			this.getAllAuthors()
		},
		loadmore() {
			this.isLoadMore = true
			this.page += 1
			this.loader = 'loading1'
            const l = this.loader
			this[l] = !this[l]
			this.getAllAuthors()
		},
		deleteCate(index) {
			this.dialog = true
			let id = this.authors[index].id
			this.$refs.idDetele = id
		},
		doDelete() {
			this.loader = 'loading'
            const l = this.loader
			this[l] = !this[l]
			let id = this.$refs.idDetele
			axios.post('/api/authors/delete', {
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
				this.getAllAuthors()
			})
		},
		view(index) {
			//console.log(this.authors[index])
			//this.dialogView = true
		}

	}
}
</script>
<style scoped>
  table td {
	  font-size: 14px;
  }
  p {
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
