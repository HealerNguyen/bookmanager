import Vue from 'vue'
import axios from 'axios'

const mixin = {
  methods: {
    test() {
      console.log('aaaaa')
    },
    checkLogin() {
      if (this.$store.getters.authUser) {
          this.$router.push('/users/account');
      } else {
        this.$router.push('/login');
      }
    },
    getClientId() {
      axios.get('/api/users/clientid').then(response => {

      })
    },
    buildSlug(title) {
      var slug = "";
      if (title) {
          // Change to lower case
        var titleLower = title.toLowerCase();
          // Letter "e"
        slug = titleLower.replace(/e|é|è|ẽ|ẻ|ẹ|ê|ế|ề|ễ|ể|ệ/gi, 'e');
          // Letter "a"
        slug = slug.replace(/a|á|à|ã|ả|ạ|ă|ắ|ằ|ẵ|ẳ|ặ|â|ấ|ầ|ẫ|ẩ|ậ/gi, 'a');
        //letter i
        slug = slug.replace(/i|í|ì|ị|ỉ|ĩ/gi, 'i');
          // Letter "o"
        slug = slug.replace(/o|ó|ò|õ|ỏ|ọ|ô|ố|ồ|ỗ|ổ|ộ|ơ|ớ|ờ|ỡ|ở|ợ/gi, 'o');
          // Letter "u"
        slug = slug.replace(/u|ú|ù|ũ|ủ|ụ|ư|ứ|ừ|ữ|ử|ự/gi, 'u');
          // Letter "d"
        slug = slug.replace(/đ/gi, 'd');
          // Trim the last whitespace
        slug = slug.replace(/\s*$/g, '');
          // Change whitespace to "-"
        slug = slug.replace(/\s+/g, '-');
        return slug;
      }
		},
    getAuthUserAdmin() {
      axios.post('/api/users/getUserByMail', {
          dataEmail:  this.$store.getters.authUser.email
      }).then(response => {
          //console.log(response.data)
          if (response.data) {
              if (response.data.stt == false) {
                  this.$router.push('/login')
              } else {
                  if (response.data.role !== 1) {
                      console.log('===')
                      this.$router.push('/users/account')
                  }
              }
              
          }
      }).catch(err => {
          console.log(err)
      }).finally(callback => {

      })
    }
  },
  computed: {
    authUser() {
      return this.$store.getters.authUser;
    },
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
  }
}

//- export it as a plugin
export default {
  install (Vue, options) {
    Vue.mixin(mixin)
  }
}