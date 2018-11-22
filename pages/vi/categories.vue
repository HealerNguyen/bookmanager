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
            <h1 class="white--text mb-2 display-1 text-lg-left">Danh sách chuyên mục</h1>
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
                                label="Nhập tên chuyên mục" 
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
            <v-flex xs12 md3 lg3 v-for="(cate, index) in categories" :key="index" class="pa-3">
                <v-card color="blue-grey darken-2" class="white--text">
                    <v-card-title primary-title>
                        <div class="headline" style="width:100%">{{ cate.name }}</div><br>
                        <div><p class="subheading">{{ cate.short_description }}</p></div>
                    </v-card-title>
                    <v-card-actions>
                        <v-btn flat dark v-bind:to="{name: 'category-slug', params: {slug: cate.slug}}">Chi tiết</v-btn>
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
            loader: null,
            loading: false,
            loading1: false,
            query: '',
			status: '1',
            page: 0,
            categories: {},
			isShow: false,
			isLoadMore: false,
            totalRows: 0,
            filterDialog: false
        }
    },
    mounted() {
        this.query = (typeof this.$route.query.s != "undefined") ? this.$route.query.s : ""
		this.getAllCategories()
    },
    methods: {
        getAllCategories() {
			axios.get('/api/categories/categories', 
				{
					params: {
						query: this.query, page: this.page, status: 1
					}
				}
			).then(response => {
				console.log(response.data)
				this.isShow = response.data.isShow
				this.totalRows = response.data.totalRows
				if (this.isLoadMore == true)  {
					this.categories = this.categories.concat(response.data.categories);
				} else {
					this.categories = response.data.categories
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
		    this.$router.push("/vi/categories?s=" + this.query)
			this.getAllCategories()
		},
		loadmore() {
			this.isLoadMore = true
			this.page += 1
			this.loader = 'loading1'
            const l = this.loader
			this[l] = !this[l]
			this.getAllCategories()
		},
    }

}
</script>
<style scoped>

</style>
