import axios from '~/plugins/axios'

var CommonMixin = {
	data() {
		return {
			
		}
	},
	created() {
		console.log('----CreateWork----')
	},
	methods: {
		testCommon() {
			console.log('---Nuxtjs---')
		},
	}
}
export default CommonMixin