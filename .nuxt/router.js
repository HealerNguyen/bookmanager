import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _2e34578a = () => import('../pages/login.vue' /* webpackChunkName: "pages/login" */).then(m => m.default || m)
const _501db346 = () => import('../pages/users/index.vue' /* webpackChunkName: "pages/users/index" */).then(m => m.default || m)
const _5dc03d39 = () => import('../pages/document.vue' /* webpackChunkName: "pages/document" */).then(m => m.default || m)
const _45a02238 = () => import('../pages/admin/index.vue' /* webpackChunkName: "pages/admin/index" */).then(m => m.default || m)
const _267a164a = () => import('../pages/vi/categories.vue' /* webpackChunkName: "pages/vi/categories" */).then(m => m.default || m)
const _09417d29 = () => import('../pages/admin/user.vue' /* webpackChunkName: "pages/admin/user" */).then(m => m.default || m)
const _5d6d843e = () => import('../pages/vi/introduce.vue' /* webpackChunkName: "pages/vi/introduce" */).then(m => m.default || m)
const _b3130228 = () => import('../pages/vi/books.vue' /* webpackChunkName: "pages/vi/books" */).then(m => m.default || m)
const _2de39ece = () => import('../pages/book/add.vue' /* webpackChunkName: "pages/book/add" */).then(m => m.default || m)
const _20e1abbb = () => import('../pages/author/add.vue' /* webpackChunkName: "pages/author/add" */).then(m => m.default || m)
const _75badaae = () => import('../pages/category/add.vue' /* webpackChunkName: "pages/category/add" */).then(m => m.default || m)
const _debfe572 = () => import('../pages/admin/book.vue' /* webpackChunkName: "pages/admin/book" */).then(m => m.default || m)
const _64a3576c = () => import('../pages/users/add.vue' /* webpackChunkName: "pages/users/add" */).then(m => m.default || m)
const _7a7b9d10 = () => import('../pages/users/account.vue' /* webpackChunkName: "pages/users/account" */).then(m => m.default || m)
const _7e5d96cf = () => import('../pages/vi/freebies.vue' /* webpackChunkName: "pages/vi/freebies" */).then(m => m.default || m)
const _7370f43f = () => import('../pages/admin/account.vue' /* webpackChunkName: "pages/admin/account" */).then(m => m.default || m)
const _7ab89508 = () => import('../pages/admin/bookborrow.vue' /* webpackChunkName: "pages/admin/bookborrow" */).then(m => m.default || m)
const _4568d969 = () => import('../pages/admin/author.vue' /* webpackChunkName: "pages/admin/author" */).then(m => m.default || m)
const _be04722e = () => import('../pages/users/logic.vue' /* webpackChunkName: "pages/users/logic" */).then(m => m.default || m)
const _54b02c48 = () => import('../pages/admin/category.vue' /* webpackChunkName: "pages/admin/category" */).then(m => m.default || m)
const _6fa6508b = () => import('../pages/author/edit/_id.vue' /* webpackChunkName: "pages/author/edit/_id" */).then(m => m.default || m)
const _57414b7a = () => import('../pages/users/edit/_id.vue' /* webpackChunkName: "pages/users/edit/_id" */).then(m => m.default || m)
const _c4ffb326 = () => import('../pages/book/edit/_id.vue' /* webpackChunkName: "pages/book/edit/_id" */).then(m => m.default || m)
const _58038178 = () => import('../pages/category/edit/_id.vue' /* webpackChunkName: "pages/category/edit/_id" */).then(m => m.default || m)
const _295871fc = () => import('../pages/book/_slug.vue' /* webpackChunkName: "pages/book/_slug" */).then(m => m.default || m)
const _80c51f58 = () => import('../pages/author/_id.vue' /* webpackChunkName: "pages/author/_id" */).then(m => m.default || m)
const _01038052 = () => import('../pages/category/_slug.vue' /* webpackChunkName: "pages/category/_slug" */).then(m => m.default || m)
const _035f1c05 = () => import('../pages/users/_id.vue' /* webpackChunkName: "pages/users/_id" */).then(m => m.default || m)
const _1f3e3124 = () => import('../pages/index.vue' /* webpackChunkName: "pages/index" */).then(m => m.default || m)



if (process.client) {
  window.history.scrollRestoration = 'manual'
}
const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected
  if (to.matched.length < 2) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise(resolve => {
    // wait for the out transition to complete (if necessary)
    window.$nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash) {
        let hash = to.hash
        // CSS.escape() is not supported with IE and Edge.
        if (typeof window.CSS !== 'undefined' && typeof window.CSS.escape !== 'undefined') {
          hash = '#' + window.CSS.escape(hash.substr(1))
        }
        try {
          if (document.querySelector(hash)) {
            // scroll to anchor by returning the selector
            position = { selector: hash }
          }
        } catch (e) {
          console.warn('Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).')
        }
      }
      resolve(position)
    })
  })
}


export function createRouter () {
  return new Router({
    mode: 'history',
    base: '/',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,
    routes: [
		{
			path: "/login",
			component: _2e34578a,
			name: "login"
		},
		{
			path: "/users",
			component: _501db346,
			name: "users"
		},
		{
			path: "/document",
			component: _5dc03d39,
			name: "document"
		},
		{
			path: "/admin",
			component: _45a02238,
			name: "admin"
		},
		{
			path: "/vi/categories",
			component: _267a164a,
			name: "vi-categories"
		},
		{
			path: "/admin/user",
			component: _09417d29,
			name: "admin-user"
		},
		{
			path: "/vi/introduce",
			component: _5d6d843e,
			name: "vi-introduce"
		},
		{
			path: "/vi/books",
			component: _b3130228,
			name: "vi-books"
		},
		{
			path: "/book/add",
			component: _2de39ece,
			name: "book-add"
		},
		{
			path: "/author/add",
			component: _20e1abbb,
			name: "author-add"
		},
		{
			path: "/category/add",
			component: _75badaae,
			name: "category-add"
		},
		{
			path: "/admin/book",
			component: _debfe572,
			name: "admin-book"
		},
		{
			path: "/users/add",
			component: _64a3576c,
			name: "users-add"
		},
		{
			path: "/users/account",
			component: _7a7b9d10,
			name: "users-account"
		},
		{
			path: "/vi/freebies",
			component: _7e5d96cf,
			name: "vi-freebies"
		},
		{
			path: "/admin/account",
			component: _7370f43f,
			name: "admin-account"
		},
		{
			path: "/admin/bookborrow",
			component: _7ab89508,
			name: "admin-bookborrow"
		},
		{
			path: "/admin/author",
			component: _4568d969,
			name: "admin-author"
		},
		{
			path: "/users/logic",
			component: _be04722e,
			name: "users-logic"
		},
		{
			path: "/admin/category",
			component: _54b02c48,
			name: "admin-category"
		},
		{
			path: "/author/edit/:id?",
			component: _6fa6508b,
			name: "author-edit-id"
		},
		{
			path: "/users/edit/:id?",
			component: _57414b7a,
			name: "users-edit-id"
		},
		{
			path: "/book/edit/:id?",
			component: _c4ffb326,
			name: "book-edit-id"
		},
		{
			path: "/category/edit/:id?",
			component: _58038178,
			name: "category-edit-id"
		},
		{
			path: "/book/:slug?",
			component: _295871fc,
			name: "book-slug"
		},
		{
			path: "/author/:id?",
			component: _80c51f58,
			name: "author-id"
		},
		{
			path: "/category/:slug?",
			component: _01038052,
			name: "category-slug"
		},
		{
			path: "/users/:id",
			component: _035f1c05,
			name: "users-id"
		},
		{
			path: "/",
			component: _1f3e3124,
			name: "index"
		}
    ],
    
    
    fallback: false
  })
}
