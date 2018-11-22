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
				<v-card-title class="title font-weight-regular">Quản lý sách</v-card-title>
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
										label="Nhập tên sách" 
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
								<v-flex xs12 sm4 md4 lg4 pr-2>
									<v-select
										:items="categories"
										v-model="category"
										single-line
										item-text="name"
										item-value="id"
										return-object
										persistent-hint
										color="green"
										label="Danh mục"
									></v-select>
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
		         			<v-btn small class="btn-green white--text" v-bind:to="{name: 'book-add'}"><v-icon>add_circle</v-icon>&nbsp; Thêm mới</v-btn>
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
		         					<th>Mô tả</th>
		         					<th>Mô tả ngắn</th>
									<th>Giá</th>
									<th>Số lượng</th>
									<th>Đã được mượn</th>
									
		         					<th>Trạng thái</th>
		         					<th>Ngày tạo</th>
		         					<th>Thao tác</th>
		         				</thead>
		         				<tbody class="text-xs-center">
		         					<tr style="text-align: center" v-for="(book , index) in books" :key="index">
												<td>{{ index + 1 }}</td>
												<td>{{ book.name }}</td>
												<td>{{ book.short_description }}</td>
												<td>{{ book.description }}</td>
												<td>{{ book.price }}</td>
												<td>{{ book.count }}</td>
												<td>{{ book.borrowed ? book.borrowed : '0' }}</td>
												<td v-if="book.status == '0'">Nháp</td>
												<td v-if="book.status == '1'">Active</td>
												<td v-if="book.status == '2'">Deactive</td>
												<td>{{ book.created_date }}</td>
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
																v-bind:to="{name: 'book-edit-id', params: { id: book.id }}"
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
			loader: null,
            loading: false,
			loading1: false,
			dialog: false,
			direction: 'left',
			fab: false,
			hover: true,
			left: true,
			transition: 'slide-y-reverse-transition',
			books: {},
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
			category: '',
			categories: [
				{id: '', name: ''}
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
		this.category = (typeof this.$route.query.category != "undefined") ? this.$route.query.category : ''
		this.getAuthUserAdmin()
		this.getAllCategories()
		this.getAllBooks()
	},
	mixins: [],
	methods: {
		getAllCategories() {
			axios.get('/api/categories/categories-search').then(response => {
				this.categories = response.data.categories
			}).catch(err => {
				console.log(err.response)
			})
		},
		getAllBooks() {
			axios.get('/api/books/books', 
				{
					params: {
						query: this.query, page: this.page, status: this.status, category: this.category
					}
				}
			).then(response => {
				console.log(response.data)
				this.isShow = response.data.isShow
				this.totalRows = response.data.totalRows
				if (this.isLoadMore == true)  {
					this.books = this.books.concat(response.data.books);
				} else {
					this.books = response.data.books
				}
			}).catch(err => {
				console.log(err.response)
			}).finally(call => {
				this.isLoadMore = false
				this.loader = null
				this.loading1 = false
			})
		},
		search() {
			this.page = 0;
			let query = this.query;
			let status = this.status;
			let category = this.category
			if (this.status.matt) {
				this.$router.push("/admin/book?s=" + this.query + "&" + "status=" + this.status.matt + "&" + "category=" + this.category.id)
				this.status = this.status.matt
				this.category = this.category.id
			} else {
				this.$router.push("/admin/book?s=" + this.query + "&" + "status=" + status + "&" + "category=" + category)
				this.status = this.status
				this.category = this.category
			}	
			this.getAllBooks()
		},
		loadmore() {
			this.isLoadMore = true
			this.page += 1
			this.loader = 'loading1'
            const l = this.loader
			this[l] = !this[l]
			this.getAllBooks()
		},
		deleteCate(index) {
			this.dialog = true
			let id = this.categories[index].id
			this.$refs.idDetele = id
		},
		doDelete() {
			this.loader = 'loading'
            const l = this.loader
			this[l] = !this[l]
			let id = this.$refs.idDetele
			axios.post('/api/books/delete', {
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
				this.getAllBooks()
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
