import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _3d5f08ea = () => import('../pages/login.vue' /* webpackChunkName: "pages/login" */).then(m => m.default || m)
const _117511ad = () => import('../pages/users/index.vue' /* webpackChunkName: "pages/users/index" */).then(m => m.default || m)
const _3db6d82e = () => import('../pages/document.vue' /* webpackChunkName: "pages/document" */).then(m => m.default || m)
const _16b3da34 = () => import('../pages/admin/index.vue' /* webpackChunkName: "pages/admin/index" */).then(m => m.default || m)
const _676d1012 = () => import('../pages/admin/book.vue' /* webpackChunkName: "pages/admin/book" */).then(m => m.default || m)
const _44eae7d9 = () => import('../pages/admin/user.vue' /* webpackChunkName: "pages/admin/user" */).then(m => m.default || m)
const _6f7a86de = () => import('../pages/vi/introduce.vue' /* webpackChunkName: "pages/vi/introduce" */).then(m => m.default || m)
const _29dad59c = () => import('../pages/vi/books.vue' /* webpackChunkName: "pages/vi/books" */).then(m => m.default || m)
const _3c625819 = () => import('../pages/admin/author.vue' /* webpackChunkName: "pages/admin/author" */).then(m => m.default || m)
const _6cb4595e = () => import('../pages/category/add.vue' /* webpackChunkName: "pages/category/add" */).then(m => m.default || m)
const _178706e8 = () => import('../pages/admin/category.vue' /* webpackChunkName: "pages/admin/category" */).then(m => m.default || m)
const _6c728749 = () => import('../pages/book/add.vue' /* webpackChunkName: "pages/book/add" */).then(m => m.default || m)
const _4dc9d6bc = () => import('../pages/users/add.vue' /* webpackChunkName: "pages/users/add" */).then(m => m.default || m)
const _aa0eee70 = () => import('../pages/users/account.vue' /* webpackChunkName: "pages/users/account" */).then(m => m.default || m)
const _903cfbc2 = () => import('../pages/vi/freebies.vue' /* webpackChunkName: "pages/vi/freebies" */).then(m => m.default || m)
const _0eb06d9a = () => import('../pages/vi/categories.vue' /* webpackChunkName: "pages/vi/categories" */).then(m => m.default || m)
const _4afc9b8e = () => import('../pages/users/logic.vue' /* webpackChunkName: "pages/users/logic" */).then(m => m.default || m)
const _5c8b166b = () => import('../pages/author/add.vue' /* webpackChunkName: "pages/author/add" */).then(m => m.default || m)
const _23a413db = () => import('../pages/author/edit/_id.vue' /* webpackChunkName: "pages/author/edit/_id" */).then(m => m.default || m)
const _75d5de2a = () => import('../pages/users/edit/_id.vue' /* webpackChunkName: "pages/users/edit/_id" */).then(m => m.default || m)
const _f4930486 = () => import('../pages/book/edit/_id.vue' /* webpackChunkName: "pages/book/edit/_id" */).then(m => m.default || m)
const _039db0c8 = () => import('../pages/category/edit/_id.vue' /* webpackChunkName: "pages/category/edit/_id" */).then(m => m.default || m)
const _097249f8 = () => import('../pages/author/_id.vue' /* webpackChunkName: "pages/author/_id" */).then(m => m.default || m)
const _26f4c956 = () => import('../pages/users/_id.vue' /* webpackChunkName: "pages/users/_id" */).then(m => m.default || m)
const _17a8d874 = () => import('../pages/index.vue' /* webpackChunkName: "pages/index" */).then(m => m.default || m)



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
			component: _3d5f08ea,
			name: "login"
		},
		{
			path: "/users",
			component: _117511ad,
			name: "users"
		},
		{
			path: "/document",
			component: _3db6d82e,
			name: "document"
		},
		{
			path: "/admin",
			component: _16b3da34,
			name: "admin"
		},
		{
			path: "/admin/book",
			component: _676d1012,
			name: "admin-book"
		},
		{
			path: "/admin/user",
			component: _44eae7d9,
			name: "admin-user"
		},
		{
			path: "/vi/introduce",
			component: _6f7a86de,
			name: "vi-introduce"
		},
		{
			path: "/vi/books",
			component: _29dad59c,
			name: "vi-books"
		},
		{
			path: "/admin/author",
			component: _3c625819,
			name: "admin-author"
		},
		{
			path: "/category/add",
			component: _6cb4595e,
			name: "category-add"
		},
		{
			path: "/admin/category",
			component: _178706e8,
			name: "admin-category"
		},
		{
			path: "/book/add",
			component: _6c728749,
			name: "book-add"
		},
		{
			path: "/users/add",
			component: _4dc9d6bc,
			name: "users-add"
		},
		{
			path: "/users/account",
			component: _aa0eee70,
			name: "users-account"
		},
		{
			path: "/vi/freebies",
			component: _903cfbc2,
			name: "vi-freebies"
		},
		{
			path: "/vi/categories",
			component: _0eb06d9a,
			name: "vi-categories"
		},
		{
			path: "/users/logic",
			component: _4afc9b8e,
			name: "users-logic"
		},
		{
			path: "/author/add",
			component: _5c8b166b,
			name: "author-add"
		},
		{
			path: "/author/edit/:id?",
			component: _23a413db,
			name: "author-edit-id"
		},
		{
			path: "/users/edit/:id?",
			component: _75d5de2a,
			name: "users-edit-id"
		},
		{
			path: "/book/edit/:id?",
			component: _f4930486,
			name: "book-edit-id"
		},
		{
			path: "/category/edit/:id?",
			component: _039db0c8,
			name: "category-edit-id"
		},
		{
			path: "/author/:id?",
			component: _097249f8,
			name: "author-id"
		},
		{
			path: "/users/:id",
			component: _26f4c956,
			name: "users-id"
		},
		{
			path: "/",
			component: _17a8d874,
			name: "index"
		}
    ],
    
    
    fallback: false
  })
}
