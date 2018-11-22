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
				<v-btn icon v-bind:to="{name: 'admin-category'}">
					<v-icon>arrow_back</v-icon>
				</v-btn>
				<v-card-title class="title font-weight-regular">Sửa chuyên mục</v-card-title>
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
					<v-form ref="form" v-model="valid" lazy-validation @submit.prevent="edit()">
						<v-text-field 
							name="name"
							v-model="category.name" 
							label="Nhập tên chuyên mục" 
							type="text"
							autofocus
							:rules="nameRules"
							required
							v-on:input="createSlug()"
							color="green"
						></v-text-field>
						<v-text-field 
							name="slug"
							v-model="category.slug" 
							label="Nhập slug chuyên mục" 
							type="text"
							:rules="slugRules"
							required
							readonly
							color="green"
						></v-text-field>
						<v-textarea 
							name="short_description"
							v-model="category.short_description" 
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
							v-model="category.description" 
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
							<v-btn round v-bind:to="{name: 'admin-category'}"><v-icon>arrow_back</v-icon> &nbsp; Quay lại</v-btn>
							<v-spacer></v-spacer>
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
			category: {},
			name: '',
			description: '',
			short_description: '',
			nameRules: [
                v => !!v || 'Vui lòng nhập tên chuyên mục',
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
			slug: '',
			slugRules: [
                v => !!v || 'Vui lòng nhập slug chuyên mục',
			],
			status: null,
			statuses: [
				{tentt: 'Test', matt: '0'},
				{tentt: 'Active', matt: '1'},
				{tentt: 'Deactive', matt: '2'}
			]

		}
	},
	mounted() {
		this.getAuthUserAdmin()
		this.getCategoryById()
	},
	mixins: [],
	methods: {
		createSlug() {
			if (this.category.name) {
				let slug = this.buildSlug(this.category.name);
				this.category.slug = slug
			}
		},
		getCategoryById() {
			let id = this.$route.params.id
			if (id) {
				axios.post('/api/categories/getById', {
					id: id
				}).then(response => {
					//console.log(response)
					this.category = response.data.category
					this.status = '' + this.category.status
				}).catch(error => {
					console.log(error)
				})
			} else {
				console.log('aaaaa')
			}
		},
		edit() {
			if (this.$refs.form.validate()) {
                this.loader = 'loading'
                const l = this.loader
				this[l] = !this[l]
				let statuss = ''
				if (this.status.matt) {
					statuss = this.status.matt
				} else {
					statuss = this.status
				}
				axios.post('/api/categories/edit', {
					status: statuss,
					id: this.category.id,
					category: this.category
				}).then(response => {	
					console.log(response)				
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
