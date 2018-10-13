<template>
	<v-app id="inspire">
		<v-navigation-drawer
			fixed
			temporary
			:clipped="$vuetify.breakpoint.mdAndUp"
			app
			v-model="drawer"
		>
			<v-list dense>
				<template v-for="item in items">
					<v-layout
						row
						v-if="item.heading"
						align-center
						:key="item.heading"
					>
						<v-flex xs6>
							<v-subheader v-if="item.heading">
								{{ item.heading }}
							</v-subheader>
						</v-flex>
						<v-flex xs6 class="text-xs-center">
							<a href="#!" class="body-2 black--text">EDIT</a>
						</v-flex>
					</v-layout>
					<v-list-group
						v-else-if="item.children"
						v-model="item.model"
						:key="item.text"
						:prepend-icon="item.model ? item.icon : item['icon-alt']"
						append-icon=""
					>
						<v-list-tile slot="activator">
							<v-list-tile-content>
								<v-list-tile-title>
									{{ item.text }}
								</v-list-tile-title>
							</v-list-tile-content>
						</v-list-tile>
						<v-list-tile
							v-for="(child, i) in item.children"
							:key="i"
							
						>
							<v-list-tile-action v-if="child.icon">
								<v-icon>{{ child.icon }}</v-icon>
							</v-list-tile-action>
							<v-list-tile-content>
								<v-list-tile-title>
									{{ child.text }}
								</v-list-tile-title>
							</v-list-tile-content>
						</v-list-tile>
					</v-list-group>
					<v-list-tile v-else  :key="item.text">
						<v-list-tile-action>
							<v-icon>{{ item.icon }}</v-icon>
						</v-list-tile-action>
						<v-list-tile-content>
							<v-list-tile-title>
								{{ item.text }}
							</v-list-tile-title>
						</v-list-tile-content>
					</v-list-tile>
				</template>
			</v-list>
		</v-navigation-drawer>
		<v-toolbar
			color="darken-3"
			dark
			app
			:clipped-left="$vuetify.breakpoint.mdAndUp"
			fixed
		>
			<v-toolbar-title style="width: 300px" class="ml-0">
				<v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
				<span class="hidden-sm-and-down">Mini library</span> &nbsp;
				<v-tooltip bottom>
					<v-icon slot="activator" class="hidden-sm-and-down" @click="returnHome()">visibility</v-icon>
					<span>Trang chu</span>
				</v-tooltip>
			</v-toolbar-title>
			
			<v-spacer></v-spacer>

			<v-toolbar-items class="hidden-sm-and-down" v-if="authUser.role != 1">
				<v-btn flat v-bind:to="{name: 'vi-freebies'}">Freebies</v-btn>
				<v-btn flat v-bind:to="{name: 'vi-books'}">Sách</v-btn>
				<v-btn flat v-bind:to="{name: 'vi-categories'}">Chuyên mục</v-btn>
				<v-btn flat v-bind:to="{name: 'vi-introduce'}">Giới thiệu</v-btn>
			</v-toolbar-items>
			<v-tooltip bottom>
				<v-btn slot="activator" icon v-if="isLoggedIn">
					<v-icon>apps</v-icon>
				</v-btn>
				<span>Ung dung</span>
			</v-tooltip>
			<v-tooltip bottom>
				<v-btn slot="activator" icon v-if="isLoggedIn">
					<v-icon>notifications</v-icon>
				</v-btn>
				<span>Thong bao</span>
			</v-tooltip>
			
			<v-menu
				transition="slide-x-transition"
				bottom
				left
				v-if="isLoggedIn"
			>
				<v-btn icon large  slot="activator">
					<v-avatar size="32px" color="red">
						<span class="white--text headline">{{ authUser.avatar }}</span>
					</v-avatar>
				</v-btn>
				<v-list two-line>
					<v-list-tile>
						<v-list-tile-avatar color="red">
							<span class="white--text headline">{{ authUser.avatar }}</span>
						</v-list-tile-avatar>
						<v-list-tile-content>
							<v-list-tile-title>{{ authUser.name }}</v-list-tile-title>
							<v-list-tile-sub-title>{{ authUser.email }}</v-list-tile-sub-title>
						</v-list-tile-content>
					</v-list-tile>

					<v-card-actions>
						<v-btn 
							dark 
							small 
							color="white" 
							class="green--text"
							v-bind:to="{name: 'users-account'}"
						>Tài khoản</v-btn>
						<v-spacer></v-spacer>
						<v-btn 
							@click="logout"
							small
							dark
							color="white" 
							class="green--text"
						> Đăng xuất
						</v-btn>
					</v-card-actions>
				</v-list>
			</v-menu>
			<v-btn
				v-if="!isLoggedIn"
				color="white" 
				class="green--text" 
				round 
				v-bind:to="{name: 'login'}"
			> Đăng nhập
			</v-btn>         
		</v-toolbar>
		<v-fab-transition>
				<v-btn
					style="bottom: 10px;"
					v-show="!isShowTop"
					class="white--text btn-scroll-top"
					dark
					fixed
					bottom
					right
					fab
					v-scroll-to="'#scroll-top'"
				>
					<v-icon>keyboard_arrow_up</v-icon>
				</v-btn>
			</v-fab-transition>
		<v-content id="scroll-top">
			<nuxt/>
		</v-content>
	</v-app>
</template>
<!--vai tro nhu file App.vue, chay vao day trc ,load scss, js -->
<!--load component from '~/components/*.vue'-->

<script>
import axios from 'axios'
export default {
  data: () => ({
			drawer: false,
			isShowTop: false,
			items: [
				{ icon: 'contacts', text: 'Contacts' },
				// { icon: 'history', text: 'Frequently contacted' },
				// { icon: 'content_copy', text: 'Duplicates' },
				// {
				// 	icon: 'keyboard_arrow_up',
				// 	'icon-alt': 'keyboard_arrow_down',
				// 	text: 'Labels',
				// 	model: true,
				// 	children: [
				// 		{ icon: 'add', text: 'Create label' }
				// 	]
				// },
				// {
				// 	icon: 'keyboard_arrow_up',
				// 	'icon-alt': 'keyboard_arrow_down',
				// 	text: 'More',
				// 	model: false,
				// 	children: [
				// 		{ text: 'Import' },
				// 		{ text: 'Export' },
				// 		{ text: 'Print' },
				// 		{ text: 'Undo changes' },
				// 		{ text: 'Other contacts' }
				// 	]
				// },
				// { icon: 'settings', text: 'Settings' },
				// { icon: 'chat_bubble', text: 'Send feedback' },
				// { icon: 'help', text: 'Help' },
				// { icon: 'phonelink', text: 'App downloads' },
				// { icon: 'keyboard', text: 'Go to the old version' }
			],
		}),
		mounted() {
			
			//console.log(isLoggedIn);
			//console.log(this.$store.getters)
		},
		props: {
			source: String
		},
		methods: {
			logout() {
				axios.post('/api/logout').then(respone => {
					this.$store.dispatch('logout').then(res => {
						this.$router.push('/')
					})
				})
			},
			returnHome() {
				this.$router.push({name: 'index'})
			}
		},
		computed: {
			isLoggedIn() {
				return this.$store.getters.isLoggedIn;
			},
			authUser() {
				return this.$store.getters.authUser;
			},
		}
}


</script>

<style lang="scss">

@import '../assets/sass/main.scss';
</style>
