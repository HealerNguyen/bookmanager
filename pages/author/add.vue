<template>
	<div>
        <v-layout row wrap>
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
			<v-flex xs12 ms12 sm12 lg12 xl12>
			<v-toolbar
				class="test"
				color="deep-purple accent-4"
				cards
				dark
				flat
				fixed
				>
				<v-btn icon v-bind:to="{name: 'admin-author'}">
					<v-icon>arrow_back</v-icon>
				</v-btn>
				<v-card-title class="title font-weight-regular">Thêm tác giả</v-card-title>
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
					<v-form ref="form" v-model="valid" lazy-validation @submit.prevent="add()">
						<v-text-field 
							name="name"
							v-model="name" 
							label="Nhập tên tác giả" 
							type="text"
							autofocus
							:rules="nameRules"
							required
							color="green"
						></v-text-field>
						<v-text-field 
							name="email"
							v-model="email" 
							label="Nhập email tác giả" 
							type="text"
							autofocus
							:rules="mailRules"
							required
							color="green"
						></v-text-field>
						<v-radio-group v-model="radios" :mandatory="false">
							<v-layout row wrap>
								<v-flex xs6 sm6 md6 lg6>
									<v-radio label="Nam" value="1" color="primary"></v-radio>
								</v-flex>
								<v-flex xs6 sm6 md6 lg6>
									<v-radio label="Nữ" value="2" color="primary"></v-radio>
								</v-flex>
							</v-layout>
						</v-radio-group>
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
							<v-btn round v-bind:to="{name: 'admin-author'}"><v-icon>arrow_back</v-icon> &nbsp; Quay lại</v-btn>
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
			valid: false,
			loader: null,
            loading: false,
			radios:  '1',
			name: '',
			email: '',
			mailRules: [
				v => !!v || 'Vui lòng nhập email',
                v => /.+@.+/.test(v) || 'E-mail không đúng định dạng'
			],
			nameRules: [
                v => !!v || 'Vui lòng nhập tên tac gia',
			],
			statusRules: [
                v => !!v || 'Vui lòng nhập trạng thái',
			],
			status: null,
			statuses: [
				{tentt: 'Nhap', matt: '0'},
				{tentt: 'Active', matt: '1'},
				{tentt: 'Deactive', matt: '2'}
			],
			date: null,
			menu: false,
			snackbar: false,
            x: 'right',
            timeout: 6000,
            text: 'sssssssssssssssssss',
            colorSnackbar: '',
			iconStatus: 'check_circle',

		}
	},
	mounted() {
		this.getAuthUserAdmin()
	},
	mixins: [],
	watch: {
      menu (val) {
        val && this.$nextTick(() => (this.$refs.picker.activePicker = 'YEAR'))
      }
    },
	methods: {
		save (date) {
        	this.$refs.menu.save(date)
		},
		add() {
			if (this.$refs.form.validate()) {
                this.loader = 'loading'
                const l = this.loader
				this[l] = !this[l]
				let data = {
					status: this.status.matt,
					name: this.name,
					gender: this.radios,
					date: this.date,
					email: this.email,
					image: this.name.charAt(0)
				}
				axios.post('/api/authors/add', {
					data: data
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
					//console.log(error.response)
					this.snackbar = true
					this.iconStatus = 'cancel'
					this.text = 'Ops! Đã có lỗi xảy ra'
					this.colorSnackbar = 'red'
				}).finally(callback => {
					this.loader = null
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
