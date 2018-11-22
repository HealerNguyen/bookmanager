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
				<v-card-title class="title font-weight-regular">Quản lý mượn trả sách</v-card-title>
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
									<v-menu
										ref="menu"
										:close-on-content-click="false"
										v-model="menu"
										:nudge-right="40"
										:return-value.sync="createdDate"
										lazy
										transition="scale-transition"
										offset-y
										full-width
										min-width="290px"
									>
										<v-text-field
											slot="activator"
											v-model="createdDate"
											label="Ngày trả sách"
											readonly
											color="green"
										></v-text-field>
										<v-date-picker v-model="createdDate" no-title scrollable color="green">
											<v-spacer></v-spacer>
											<v-btn flat color="red" @click="menu = false">Cancel</v-btn>
											<v-btn flat color="green" @click="$refs.menu.save(createdDate)">OK</v-btn>
										</v-date-picker>
									</v-menu>
								</v-flex>
								<v-flex xs12 sm4 md4 lg4 pr-2>
									<v-menu
										ref="menu1"
										:close-on-content-click="false"
										v-model="menu1"
										:nudge-right="40"
										:return-value.sync="removedDate"
										lazy
										transition="scale-transition"
										offset-y
										full-width
										min-width="290px"
									>
										<v-text-field
											slot="activator"
											v-model="removedDate"
											label="Ngày mượn sách"
											readonly
											color="green"
										></v-text-field>
										<v-date-picker v-model="removedDate" no-title scrollable color="green">
											<v-spacer></v-spacer>
											<v-btn flat color="red" @click="menu1 = false">Cancel</v-btn>
											<v-btn flat color="green" @click="$refs.menu1.save(removedDate)">OK</v-btn>
										</v-date-picker>
									</v-menu>
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
		         		<v-flex xs12 sm12 md12 lg12>
		         			<!-- <a class="sum-record">Tổng số: 9</a> -->
		         			<v-btn small class="btn-sum btn-green white--text" style="text-transform: unset">Tổng số: {{ totalRows }}</v-btn>
		         			<v-btn small class="btn-sum white--text" color="info"  style="text-transform: unset">Đang mượn: {{ borrowing }}</v-btn>
		         			<v-btn small class="btn-sum white--text" color="red" style="text-transform: unset">Đã trả: {{ borrowDone }}</v-btn>
						</v-flex>
		         		<!-- <v-flex xs6 sm6 md6 lg6  class="text-xs-right">
		         			<v-btn small class="btn-green white--text" v-bind:to="{name: 'book-add'}"><v-icon>add_circle</v-icon>&nbsp; Thêm mới</v-btn>
		         		</v-flex> -->
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
		         					<th>Tên sách</th>
									<th>Người mượn</th>
									<th>Trạng thái</th>
									<th>Ngày mượn</th>
									<th>Ngày trả(dự tính) </th>
									<th>Ngày trả(thực tế) </th>
									<th>Ghi chú </th>
		         					<!-- <th>Mô tả</th>
		         					<th>Mô tả ngắn</th>
									<th>Giá</th>
									
		         					<th>Trạng thái</th>
		         					<th>Ngày tạo</th>
		         					<th>Thao tác</th> -->
		         				</thead>
		         				<tbody class="text-xs-center">
		         					<tr style="text-align: center" v-for="(book , index) in borrowBooks" :key="index">
										<td>{{ index + 1 }}</td>
										<td><v-btn flat color="green" small v-bind:to="{name: 'book-edit-id', params: { id: book.book_id }}">{{ JSON.parse(book.json).name }}</v-btn></td>
										<td>{{ book.userName }}</td>
										<td>{{ book.status == '1' ? 'Đã trả' : 'Đang mượn' }}</td>
										<td>{{ book.created_date }}</td>
										<td>{{ book.to_date }}</td>
										<td>{{ book.real_date ? book.real_date : '-' }}</td>
										<td>{{ book.note }}</td>
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
			borrowBooks: {},
			snackbar: false,
            x: 'right',
            timeout: 6000,
            text: 'sssssssssssssssssss',
            colorSnackbar: '',
			iconStatus: 'check_circle',
			query: '',
			status: '',
			statuses: [
				{tentt: 'Đang mượn', matt: '0'},
				{tentt: 'Đã trả', matt: '1'}
			],
			category: '',
			categories: [
				{id: '', name: ''}
			],
			page: 0,
			isShow: false,
			isLoadMore: false,
			totalRows: '',
			createdDate: null,
			menu: false,
			removedDate: null,
            menu1: false,
		}
	},
	mounted() {
		this.query = (typeof this.$route.query.s != "undefined") ? this.$route.query.s : ""
		this.status = (typeof this.$route.query.status != "undefined") ? this.$route.query.status : ''
		this.createdDate = (typeof this.$route.query.created_date != "undefined") ? this.$route.query.created_date : ''
		this.removedDate = (typeof this.$route.query.return_date != "undefined") ? this.$route.query.return_date : ''
		this.getAuthUserAdmin()
		// this.getAllCategories()
		this.getAllBooks()
	},
	mixins: [],
	methods: {
		// getAllCategories() {
		// 	axios.get('/api/categories/categories-search').then(response => {
		// 		this.categories = response.data.categories
		// 	}).catch(err => {
		// 		console.log(err.response)
		// 	})
		// },
		getAllBooks() {
			axios.get('/api/books/borrowbookss', 
				{
					params: {
						query: this.query, page: this.page, status: this.status, createdDate: this.createdDate, removedDate: this.removedDate
					}
				}
			).then(response => {
				console.log(response.data)
				this.isShow = response.data.isShow
				this.totalRows = response.data.totalRows
				if (this.isLoadMore == true)  {
					this.borrowBooks = this.borrowBooks.concat(response.data.borrow_books);
				} else {
					this.borrowBooks = response.data.borrow_books
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
			let createdDate = this.createdDate
			let removedDate = this.removedDate
			if (this.status.matt) {
				this.$router.push("/admin/bookborrow?s=" + this.query + "&" + "status=" + this.status.matt + "&" + "created_date=" + createdDate + "&" + "return_date=" + removedDate)
				this.status = this.status.matt
			} else {
				this.$router.push("/admin/bookborrow?s=" + this.query + "&" + "status=" + status + "&" + "created_date=" + createdDate + "&" + "return_date=" + removedDate)
				this.status = this.status
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

	},
	computed: {
		borrowing() {
			let numB = 0
			if (process.browser) {
				$.each(this.borrowBooks, function(key, value) {
					if (value.status == 0) {
						numB += 1;
					}
				})
			}
			return numB;
		},
		borrowDone() {
			let numD = 0
			if (process.browser) {
				$.each(this.borrowBooks, function(key, value) {
					if (value.status == 1) {
						numB += 1;
					}
				})
			}
			return numD;
		}
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
		  top: 48px;
	  }
  }
</style>
