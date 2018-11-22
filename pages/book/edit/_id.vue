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
				<v-btn icon v-bind:to="{name: 'admin-book'}">
					<v-icon>arrow_back</v-icon>
				</v-btn>
				<v-card-title class="title font-weight-regular">Sửa sách</v-card-title>
				<v-spacer></v-spacer>
			</v-toolbar>
	      </v-flex>
		</v-layout>
		<v-container fluid fill-height style="padding-top: 80px;">
			<v-layout align-center justify-center>
				<v-card
					class="mx-auto pa-2"
					width="500"

					
				>
					<v-form ref="form" v-model="valid" lazy-validation @submit.prevent="save()">
						<v-text-field 
							name="name"
							v-model="book.name" 
							label="Nhập tên sách" 
							type="text"
							autofocus
							:rules="nameRules"
							required
                            v-on:input="createSlug()"
							color="green"
						></v-text-field>
                        <v-text-field 
							name="slug"
							v-model="book.slug" 
							label="Nhập slug sach" 
							type="text"
							:rules="slugRules"
							required
							color="green"
						></v-text-field>
						<v-text-field 
							name="price"
							v-model="book.price" 
							label="Nhập giá sách" 
							type="text"
							:rules="priceRules"
							required
							color="green"
						></v-text-field>
						<v-text-field 
							name="count"
							v-model="book.count" 
							label="Nhập số lượng sách" 
							type="number"
							:rules="countRules"
							required
							color="green"
						></v-text-field>
						<v-select
							:items="authors"
							v-model="author"
							single-line
							item-text="name"
							item-value="id"
							return-object
							persistent-hint
							color="green"
							label="Tác giả"
						></v-select>
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
						<v-textarea 
							name="short_description"
							v-model="book.short_description" 
							label="Nhập mô tả ngắn" 
							type="text"
							:rules="shortDescriptionRules"
							required
							color="green"
							auto-grow
							
							rows="1"
						></v-textarea>
						<v-textarea 
							name="description"
							v-model="book.description" 
							label="Nhập mô tả" 
							type="text"
							:rules="descriptionRules"
							required
							color="green"
							auto-grow
							
							rows="2"
						></v-textarea>
						<v-select
							:items="statuses"
							v-model="status"
							single-line
							item-text="tentt"
							item-value="matt"
							return-object
							persistent-hint
							:rules="statusRules"
							required
							color="green"
							
							label="Trạng thái"
						></v-select>
						<v-card-actions>
							<v-btn round v-bind:to="{name: 'admin-book'}"><v-icon>arrow_back</v-icon> &nbsp; Quay lại</v-btn>
							<v-spacer></v-spacer>
							<v-btn color="green lighten-1" 
								class="white--text"
								round
								@click="initPicture()"
							>Chọn ảnh &nbsp;
								<v-icon>add_photo_alternate</v-icon>
							</v-btn>
							<v-btn color="green lighten-1" 
								type="submit" 
								:disabled="!valid" 
								class="white--text"
								:loading="loading"
								round
							>Lưu &nbsp;
								<v-icon>check_circle</v-icon>
							</v-btn>
						</v-card-actions>
					</v-form>
				</v-card>
			</v-layout>
		</v-container>
		<v-layout row justify-center>
			<v-dialog v-model="dialog" persistent max-width="500" ref="dataImage">
				<v-card>
					<v-card-title
					class="headline grey lighten-2"
					primary-title
					>
					Cập nhật ảnh
					</v-card-title>

					<v-card-text class="text-xs-center">
						<v-avatar size="100" color="indigo" v-if="!image">
							<v-icon class="white--text">add_photo_alternate</v-icon>
							<input 
							type="file" 
							name="file" 
							id="file"
							v-on:change="onImageChange"
							>
						</v-avatar>
						<v-img 
							v-if="image"
							:aspect-ratio="16/9" 
							:src="image"
						></v-img>
					</v-card-text>

					<v-divider></v-divider>

					<v-card-actions>
						<v-spacer></v-spacer>
						
						<v-btn
							color="red"
							flat
							@click="dialog = false"
						>
							Cancel
						</v-btn>
						<v-btn flat color="green" @click="resetImage()" dark v-if="image">
							Ảnh khác
						</v-btn>
						<v-btn
							color="primary"
							flat
							@click="dialog = false"
						>
							Cập nhật
						</v-btn>
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
			snackbar: false,
            x: 'right',
            timeout: 6000,
            text: 'sssssssssssssssssss',
            colorSnackbar: '',
			iconStatus: 'check_circle',
			valid: false,
			loader: null,
            loading: false,
			book: {},
			price: '',
			count: '',
			countRules: [
				v => !!v || 'Vui lòng nhập số lượng sách',
			],
			priceRules: [
                v => !!v || 'Vui lòng nhập giá sách',
            ],
            slug: '',
			slugRules: [
                v => !!v || 'Vui lòng nhập slug sách',
			],
			nameRules: [
                v => !!v || 'Vui lòng nhập tên sách',
			],
			shortDescriptionRules: [
                v => !!v || 'Vui lòng nhập mô tả ngắn',
			],
			descriptionRules: [
                v => !!v || 'Vui lòng nhập mô tả',
			],
			statusRules: [
                v => !!v || 'Vui lòng nhập trạng thái',
			],
			status: null,
			statuses: [
				{tentt: 'Test', matt: '0'},
				{tentt: 'Active', matt: '1'},
				{tentt: 'Deactive', matt: '2'}
			],
			category: '',
			categories: [
				{id: '', name: ''}
			],
			author: '',
			authors: [
				{id: '', name: ''}
			],
			dialog: false,
			image: ''

		}
	},
	mounted() {
		this.getAuthUserAdmin()
		this.getAllCategories()
        this.getAllAuthors()
        this.getBookId()
	},
	mixins: [],
	methods: {
        createSlug() {
			if (this.book.name) {
				let slug = this.buildSlug(this.book.name);
				this.book.slug = slug
			}
		},
		getAllCategories() {
			axios.get('/api/categories/categories-search').then(response => {
				this.categories = response.data.categories
			}).catch(err => {
				console.log(err.response)
			})
		},
		getAllAuthors() {
			axios.get('/api/authors/authors-search').then(response => {
				console.log(response)
				this.authors = response.data.authors
			}).catch(err => {
				console.log(err.response)
			})
        },
        getBookId() {
			let id = this.$route.params.id
			if (id) {
				axios.post('/api/books/getByIds', {
					id: id
				}).then(response => {
					console.log(response.data)
					this.book = response.data.book
                    this.status = '' + this.book.status
                    this.author =  this.book.author_id
					this.category =  this.book.category_id
					this.image = this.book.image
				}).catch(error => {
					console.log(error)
				})
			} else {
				console.log('aaaaa')
			}
		},
		save() {
			if (this.$refs.form.validate()) {
				this.loader = 'loading'
                const l = this.loader
				this[l] = !this[l]
				axios.post('/api/books/edit', {
                    id: this.book.id,
					status: this.status.matt,
					book: this.book,
					author: this.author.id,
					category: this.category.id,
					image:  this.image
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
					this.loader= null
					this.loading = false
				})  
            }
		},
		initPicture() {
			this.dialog = true
		},
		onImageChange(e) {
			let files = e.target.files || e.dataTransfer.files;
			if (!files.length)
				return;
			this.createImage(files[0]);
		},
		createImage(file) {
			let reader = new FileReader();
			//let vm = this;
			reader.onload = (e) => {
				this.image = e.target.result;
			};
			reader.readAsDataURL(file);
		},
		resetImage() {
			this.image = ''
		}
	}
}
</script>
<style scoped>
  .test {
	  top: 64px;
	  padding-left: 15px !important;
  }
  #file {
	position: absolute;
    width: 100px;
    height: 100px;
    opacity: 0;
  }
  @media only screen and (max-width: 768px) {
	  .test {
		  top: 55px;
	  }
  }
</style>
