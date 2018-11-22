<template>
	<v-app id="inspire">
		<v-navigation-drawer
			fixed
			temporary
			:clipped="$vuetify.breakpoint.mdAndUp"
			app
			v-model="drawer"
		>
			<v-toolbar flat class="transparent" v-if="isLoggedIn">
				<v-list class="pa-0">
					<v-list-tile avatar v-bind:to="{name: 'users-account'}">
						<v-list-tile-avatar color="red">
								<span class="white--text headline">{{ authUser.avatar }}</span>
						</v-list-tile-avatar>

						<v-list-tile-content>
							<v-list-tile-title>{{ authUser.name }}</v-list-tile-title>							
						</v-list-tile-content>
						
					</v-list-tile>
				</v-list>
			</v-toolbar>
			<v-list dense>
				<v-divider v-if="isLoggedIn"></v-divider>
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
						<v-list-tile slot="activator" v-bind:to="{name: item.router}">
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
					<v-list-tile  v-bind:to="{name: item.router}" v-else  :key="item.text">
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
			<v-divider v-if="isLoggedIn"></v-divider>
			<v-toolbar flat class="transparent" v-if="isLoggedIn" @click="logout()" style="cursor: pointer">
				<v-list class="pa-0">
					<v-list-tile avatar>
						<v-list-tile-avatar>
								<span class="white--text headline"><v-icon>input</v-icon></span>
						</v-list-tile-avatar>

						<v-list-tile-content>
							<v-list-tile-title>Đăng xuất</v-list-tile-title>							
						</v-list-tile-content>
						
					</v-list-tile>
				</v-list>
			</v-toolbar>
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
					<span>Trang chủ</span>
				</v-tooltip>
			</v-toolbar-title>
			
			<v-spacer></v-spacer>

			<v-toolbar-items class="hidden-sm-and-down">
				<v-btn flat v-bind:to="{name: 'vi-books'}">Sách</v-btn>
				<v-btn flat v-bind:to="{name: 'vi-categories'}">Chuyên mục</v-btn>
				<v-btn flat v-bind:to="{name: 'vi-introduce'}">Giới thiệu</v-btn>
			</v-toolbar-items>
			<v-tooltip bottom>
				<v-btn slot="activator" icon v-if="isLoggedIn">
					<v-icon>apps</v-icon>
				</v-btn>
				<span>Ưng dụng</span>
			</v-tooltip>
			<v-tooltip bottom>
				<v-btn slot="activator" icon v-if="isLoggedIn">
					<v-icon>notifications</v-icon>
				</v-btn>
				<span>Thông báo</span>
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
		<v-tooltip left>
			<v-fab-transition slot="activator">
				<v-btn
					style="bottom: 10px;"
					v-show="!isShowTop"
					id="btn-scroll-topp"
					class="white--text btn-scroll-top"
					dark
					icon
					fixed
					bottom
					right
					fab
					v-scroll-to="'#scroll-top'"
				>
					<v-icon>keyboard_arrow_up</v-icon>
				</v-btn>

			</v-fab-transition>
			<span>Về đầu trang</span>
		</v-tooltip>
		<v-btn
			style="top: 70px;z-index:100"
			class="white--text btn-scroll-top"
			dark
			fixed
			top
			right
			icon
			v-bind:to="{name: 'users-account'}"
		>
			<v-badge
				overlap
				color="orange"
				>
				<span
					slot="badge"
					small
				>{{ cart }}</span>
				<v-icon
					color="white"
				>
					shopping_cart
				</v-icon>
			</v-badge>
		</v-btn>
		<v-content id="scroll-top">
			<nuxt/>
		</v-content>
	</v-app>
</template>
<!--vai tro nhu file App.vue, chay vao day trc ,load scss, js -->
<!--load component from '~/components/*.vue'-->

<script>
if (process.browser) {
    window.App = null;
    var scrollTop = $("#btn-scroll-topp");
	
	$(window).scroll(function() {
		var topPos = $(this).scrollTop();

		if (topPos > 100) {
			$(scrollTop).css("opacity", "1");
			//window.App.isShowTop = false
		} else {
			$(scrollTop).css("opacity", "0");
			//window.App.isShowTop = true
		}

	});
}
import axios from 'axios'
export default {
  data: () => ({
			drawer: false,
			isShowTop: true,
			testemit: '',
			items: [
				{ icon: 'home', text: 'Trang chủ', router: 'index' },
				{ icon: 'import_contacts', text: 'Sách', router: 'vi-books' },
				{ icon: 'list', text: 'Chuyên mục', router: 'vi-categories' },
				{ icon: 'contacts', text: 'Giới thiệu', router: 'vi-introduce' },


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
			window.App = this
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
			},
		},
		computed: {
			isLoggedIn() {
				return this.$store.getters.isLoggedIn;
			},
			authUser() {
				return this.$store.getters.authUser;
			},
			cart() {
				let dataCart = this.$store.getters.cart
				if (dataCart.bookCart) {
					return dataCart.bookCart.length
				} else {
					return 0;
				}
			}
		}
}


</script>

<style lang="scss">
.v-btn--floating {
	height: 36px !important;
	width: 36px !important;
}
@import '../assets/sass/main.scss';
</style>
