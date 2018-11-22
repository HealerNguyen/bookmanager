<template>
    <div>
        <!--Snack Bar-->
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
                <v-icon>{{ typeSnack }}</v-icon>
            </v-btn>
        </v-snackbar>
        <section>
            <v-parallax src="/assets/hero.jpeg" height="250">
            <v-layout
                column
                align-center
                justify-center
                class="white--text"
            >
                <h1 class="white--text mb-2 display-1 text-lg-left">Sách theo chuyên mục</h1>
                <div class="mb-3 display-2 text-lg-left">{{ cateinfor.name }}</div>
            </v-layout>
            </v-parallax>
        </section>
        <div v-if="books.length">
            <v-layout>
                <v-flex>
                    <v-btn flat color="green" small>
                        Tổng số {{ totalRows }} kết quả
                    </v-btn>
                </v-flex>
            </v-layout>
            <v-layout row wrap>
                <v-flex xs12 md4 lg4 class="pa-3" v-for="(book, index) in books" :key="index">
                    <v-card color="purple" class="white--text">
                        <v-layout row>
                            <v-flex xs7>
                                <v-card-title primary-title>
                                    <div>
                                    <div class="headline">{{ book.name }}</div>
                                    <div class="subheading">{{ book.short_description }}</div>
                                    <v-rating
                                        v-model="rating"
                                        color="yellow darken-3"
                                        background-color="grey darken-1"
                                        empty-icon="$vuetify.icons.ratingFull"
                                        half-increments
                                        hover
                                        size="16"
                                    ></v-rating>
                                    </div>
                                </v-card-title>
                            </v-flex>
                            <v-flex xs5 class="pa-2">
                                <v-img
                                    :src="book.image"
                                    height="125px"
                                    contain
                                ></v-img>
                            </v-flex>
                        </v-layout>
                        <v-divider light></v-divider>
                        <v-card-actions class="pa-3">
                            <v-btn flat dark @click="viewDetail(index)">Chi tiết</v-btn>
                        <v-btn flat dark @click="initBorrow(index)">Mượn sách</v-btn>
                        </v-card-actions>      
                    </v-card>
                </v-flex>
            </v-layout>
            <v-flex xs12 sm12 md12 lg12 class="text-xs-center pt-4" v-if="isShow">
                <v-btn small color="primary" class="white--text " :loading="loading1" round @click="loadmore()">Xem Thêm</v-btn>
            </v-flex>
        </div>
        <div v-else>
             <v-alert :value="true" type="info">
                 Các đầu sách đang được cập nhật <v-btn flat v-bind:to="{name: 'vi-categories'}">Quay lại trang trước</v-btn>
             </v-alert>
        </div>

         <div class="text-xs-center">
            <v-dialog
            v-model="dialog"
            width="500"
            >

            <v-card>
                <v-card-title
                class="headline grey lighten-2"
                primary-title
                >
                Chi tiết sách: {{ bookDetail.name }}
                </v-card-title>

                <v-img
                    :src="bookDetail.image"
                ></v-img>

                <v-card-title primary-title>
                <div>
                    <h3 class="subheading mb-0">{{ bookDetail.short_description }}</h3>
                    <div class="subheading">{{ bookDetail.description }}</div>
                    <div class="subheading">
                        <v-icon>event</v-icon>: <i>{{ bookDetail.created_date }}</i>
                    </div>
                </div>
                </v-card-title>

                <v-divider></v-divider>

                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="primary"
                    flat
                    @click="dialog = false"
                >
                    Đóng
                </v-btn>
                <v-btn
                    color="green"
                    flat
                    @click="initDoBorrow()"
                >
                    Mượn sách
                </v-btn>
                </v-card-actions>
            </v-card>
            </v-dialog>
        </div>

        <div class="text-xs-center">
            <v-dialog
            v-model="dialogBorrow"
            width="400"
            >

            <v-card>
                <v-card-title
                class="headline grey lighten-2"
                primary-title
                >
                    Ngày mượn trả sách
                </v-card-title>
                <v-card-title primary-title>
                    <v-flex xs12>
                        <v-menu
                            ref="menu"
                            :close-on-content-click="false"
                            v-model="menu"
                            :nudge-right="40"
                            :return-value.sync="date"
                            lazy
                            transition="scale-transition"
                            offset-y
                            full-width
                            min-width="290px"
                        >
                            <v-text-field
                                slot="activator"
                                v-model="date"
                                label="Ngày trả sách"
                                readonly
                                color="green"
                            ></v-text-field>
                            <v-date-picker v-model="date" no-title scrollable color="green">
                                <v-spacer></v-spacer>
                                <v-btn flat color="red" @click="menu = false">Cancel</v-btn>
                                <v-btn flat color="green" @click="$refs.menu.save(date)">OK</v-btn>
                            </v-date-picker>
                        </v-menu>
                    </v-flex>
                    <v-flex xs12>
                        <v-textarea
                            v-model="note"
                            label="Ghi chú"
                            rows="3"
                            color="green"
                        ></v-textarea>
                    </v-flex>
                </v-card-title>

                <v-divider></v-divider>

                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="primary"
                    flat
                    @click="dialogBorrow = false"
                >
                    Đóng
                </v-btn>
                <v-btn
                    color="green"
                    flat
                    :loading="loading2"
                    @click="doBorrow()"
                >
                    Đồng ý
                </v-btn>
                </v-card-actions>
            </v-card>
            </v-dialog>
        </div>
        <v-layout row justify-center>
            <v-dialog v-model="dialogLogin" persistent max-width="290">
            <v-card>
                <v-card-title class="subheading">Bạn cần đăng nhập để tiếp tục</v-card-title>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red darken-1" flat @click.native="dialogLogin = false">Cancel</v-btn>
                    <v-btn color="green darken-1" flat v-bind:to="{name: 'login'}">Đăng nhập</v-btn>
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
            books: {},
            gradient: 'to top right, rgba(63,81,181, .7), rgba(25,32,72, .7)',
            rating: 4.5,
            page: 0,
			isShow: false,
			isLoadMore: false,
            totalRows: '',
            loader: null,
            loading: false,
            loading1: false,
            loading2: false,
            cateinfor: {},
            dialog: false,
            bookDetail: {},
            bookBorrow: {},
            bookCart: [],
            dialogBorrow: false,
            date: null,
            menu: false,
            note: '',
            snackbar: false,
            x: 'right',
            timeout: 6000,
            text: 'sssssssssssssssssss',
            colorSnackbar: '',
            typeSnack: 'check_circle',
            dialogLogin: false,
            linkRedirect: ''
        }
    },
    mounted() {
        //console.log(this.$route.params.slug)
        this.getBookByCategory()
    },
    methods: {
        getBookByCategory() {
            let slug = this.$route.params.slug
            axios.get('/api/categories/slug/books', {params: {slug: slug, page: this.page}}).then(response  => {
                console.log(response)
                if (response.data.books) {
                    this.books = response.data.books
                }
                this.isShow = response.data.isShow
				this.totalRows = response.data.totalRows
				if (this.isLoadMore == true)  {
					this.books = this.books.concat(response.data.books);
				} else {
					this.books = response.data.books
                }
                this.cateinfor = response.data.id[0]
                
            }).catch(error => {
                console.log(error)
            }).finally(callback => {
                this.isLoadMore = false
				this.loader = null
				this.loading1 = false
            })
        },
        loadmore() {
			this.isLoadMore = true
			this.page += 1
			this.loader = 'loading1'
            const l = this.loader
			this[l] = !this[l]
			this.getBookByCategory()
        },
        viewDetail(index) {
            //console.log(this.books[index]);
            this.bookDetail = this.books[index]
            this.dialog = true
        },
        // save (date) {
        // 	this.$refs.menu.save(date)
		// },
        initBorrow(index) {
            let authUser = this.$store.getters.authUser;
            if (authUser) {
                this.bookBorrow = this.books[index]
                this.dialogBorrow = true
            } else {
                this.dialogLogin = true
                this.dialogBorrow = false
                window.linkRedirect = this.$route.name
            }
            
        },
        doBorrow() {
            let authUser = this.$store.getters.authUser;
            if (authUser) {
                this.loader = 'loading2'
                const l = this.loader
                this[l] = !this[l]
                
                axios.post('/api/books/borrowbook', {
                    email: authUser.email,
                    bookBorrow: this.bookBorrow,
                    toDate: this.date,
                    note: this.note,
                }).then(response => {
                    if (response.data.stt == true) {
                        this.bookCart.push(this.bookBorrow)
                        this.$store.dispatch('cart', {
                            bookCart : this.bookCart
                        }).then(res => {
                            this.snackbar =  true
                            this.text = response.data.msg
                            this.colorSnackbar = 'green'
                            this.typeSnack = 'check_circle'
                        })
                    } else {
                        this.snackbar =  true
                        this.text = response.data.msg
                        this.colorSnackbar = 'red'
                        this.typeSnack = 'cancel'
                    } 
                }).catch(error => {
                    console.log(error)
                }).finally(callback => {
                    this.date = null
                    this.note = ''
                    this.bookBorrow = {}
                    this.loader = null
                    this.loading2 = false
                    this.dialogBorrow = false
                    this.getBookByCategory()
                })
            } else {
                this.dialogLogin = true
                this.dialogBorrow = false
            }
        },
        initDoBorrow() {
            let authUser = this.$store.getters.authUser;
            if (authUser) {
                this.bookBorrow = this.bookDetail
                this.dialogBorrow = true
            } else {
                this.dialogLogin = true
                this.dialogBorrow = false
                window.linkRedirect = this.$route.name
            }
        }
    },
    watch: {
    //   menu (val) {
    //     val && this.$nextTick(() => (this.$refs.picker.activePicker = 'YEAR'))
    //   }
    },
}
</script>
