<template>
    <div>
    <section>
        <v-parallax src="/assets/hero.jpeg" height="250">
          <v-layout
            column
            align-center
            justify-center
            class="white--text"
          >
            <h1 class="white--text mb-2 display-1 text-lg-left">Danh sách các đầu sách</h1>
            <div class="subheading mb-3 text-lg-left">Đa dạng phong phú, dễ dàng tìm kiếm</div>
          </v-layout>
        </v-parallax>
      </section>

      <section>
        <v-layout>
            <v-flex>
                <v-btn flat small @click="filterDialog = !filterDialog">
                    <v-icon>filter_list</v-icon> Bộ lọc
                </v-btn>
                <v-btn flat color="green" small>
                    Tìm thấy {{ totalRows }} kết quả
                </v-btn>
            </v-flex>
        </v-layout>
        <v-layout
          row
          wrap
          class=""
          v-if="filterDialog"
        >
            <v-flex xs12 md12 class="pa-4">
                <v-form @submit.prevent="search()">
                    <v-layout row wrap>
                        <v-flex xs12 sm4 md4 lg4 pr-2>
                            <v-text-field 
                                name="name"
                                v-model="query" 
                                label="Nhập tên sách" 
                                type="text"
                                autofocus
                                color="green"
                            ></v-text-field>
                        </v-flex>
                        <!-- <v-flex xs12 sm4 md4 lg4 pr-2>
                            <v-select
                                :items="statuses"
                                v-model="status"
                                single-line
                                item-text="tentt"
                                item-value="matt"
                                return-object
                                persistent-hint
                                color="green"
                                label="Trạng thái"
                            ></v-select>
                        </v-flex> -->
                        <v-flex xs12 sm4 md4 lg4 pr-2>
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
                        </v-flex>
                        <v-card-actions>
                            <v-btn color="primary lighten-1" 
                                type="submit" 
                                class="white--text"
                                :loading="loading"
                                round
                                small
                            >Tìm kiếm &nbsp;
                                <v-icon>search</v-icon>
                            </v-btn>
                        </v-card-actions>
                    </v-layout>
                </v-form>
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
                        <v-btn flat dark v-bind:to="{name: 'book-slug', params: {slug: book.slug}}">Chi tiết</v-btn>
                        <v-btn flat dark @click="doBorrow(index)">Mượn sách</v-btn>
                    </v-card-actions>      
                </v-card>
          </v-flex>
        </v-layout>
        <v-flex xs12 sm12 md12 lg12 class="text-xs-center pt-4" v-if="isShow">
            <v-btn small color="primary" class="white--text " :loading="loading1" round @click="loadmore()">Xem Thêm</v-btn>
        </v-flex>
      </section>

      
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            rating: 4.5,
            loader: null,
            loading: false,
            loading1: false,
            query: '',
			status: '1',
			category: '',
			categories: [
				{id: '', name: ''}
            ],
            books: {},
			page: 0,
			isShow: false,
			isLoadMore: false,
			totalRows: '',
            filterDialog: false,
            dialog: false,
        }
    },
    mounted() {
        this.query = (typeof this.$route.query.s != "undefined") ? this.$route.query.s : ""
		this.category = (typeof this.$route.query.category != "undefined") ? this.$route.query.category : ''
		this.getAllCategories()
		this.getAllBooks()
    },
    methods: {
        getAllCategories() {
			axios.get('/api/categories/categories-search').then(response => {
				this.categories = response.data.categories
			}).catch(err => {
				console.log(err.response)
			})
		},
		getAllBooks() {
			axios.get('/api/books/books', 
				{
					params: {
						query: this.query, page: this.page, status: 1, category: this.category
					}
				}
			).then(response => {
				console.log(response.data)
				this.isShow = response.data.isShow
				this.totalRows = response.data.totalRows
				if (this.isLoadMore == true)  {
					this.books = this.books.concat(response.data.books);
				} else {
					this.books = response.data.books
				}
			}).catch(err => {
				console.log(err.response)
			}).finally(call => {
				this.isLoadMore = false
				this.loader = null
				this.loading1 = false
			})
		},
		search() {
			this.page = 0;
			let query = this.query;
			let status = 1;
			let category = this.category
			if (this.status) {
				this.$router.push("/vi/book?s=" + this.query + "&" + "category=" + this.category.id)
				this.category = this.category.id
			} else {
				this.$router.push("/vi/book?s=" + this.query + "&" + "category=" + category)
				this.category = this.category
			}	
			this.getAllBooks()
		},
		loadmore() {
			this.isLoadMore = true
			this.page += 1
			this.loader = 'loading1'
            const l = this.loader
			this[l] = !this[l]
			this.getAllBooks()
		},
        viewDetail(index) {

        }
    }

}
</script>
<style scoped>

</style>
