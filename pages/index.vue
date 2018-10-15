<template>
    <div>
    <section>
        <v-parallax src="/assets/hero.jpeg" height="600">
          <v-layout
            column
            align-center
            justify-center
            class="white--text"
          >
            <img src="/assets/vuetify.png" alt="Vuetify.js" height="200">
            <h1 class="white--text mb-2 display-1 text-xs-center">Mini library</h1>
            <div class="subheading mb-3 text-xs-center">Website tìm kiếm và mượn sách</div>
            <v-btn
              class="blue lighten-2 mt-5"
              dark
              large
              round
              v-bind:to="{name: 'vi-books'}"
            >
              Mượn sách
            </v-btn>
          </v-layout>
        </v-parallax>
      </section>

      <section>
        <v-layout
          column
          wrap
          class=""
          align-center
        >
          <v-flex xs12 sm4 class="my-3">
            <div class="text-xs-center">
              <h2 class="headline">Tại sao bạn nên chọn chúng tôi</h2>
            </div>
          </v-flex>
          <v-flex xs12>
            <v-container grid-list-xl>
              <v-layout row wrap align-center>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2">color_lens</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">Nhiều đầu sách</div>
                    </v-card-title>
                    <v-card-text>
                      <p class="subheading">
                      Các đầu sách độc đáo , đảm bảo đa dạng phong phú cho bạn thỏa sức tìm kiếm
                      </p> 
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2">flash_on</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline">Hoàn toàn miễn phí</div>
                    </v-card-title>
                    <v-card-text>
                      <p class="subheading">
                        Luôn luôn miễn phí,bạn sẽ được trải nghiệm tìm kiếm và mượn sách mà không mất khoản phí nào
                      </p>
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2">build</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">Hỗ trợ nhiệt tình</div>
                    </v-card-title>
                    <v-card-text>
                      <p class="subheading">
                        Nếu bạn có bất kì vấn đề , khó khăn trong quá trình tìm và mượn sách chúng tôi sẽ hộ trợ cho bạn
                      </p> 
                    </v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
      </section>

      <section>
        <v-parallax src="/assets/section.jpg" height="380">
          <v-layout column align-center justify-center>
            <div class="headline white--text mb-3 text-xs-center">Chuyên mục đa dạng</div>
            <v-btn
              class="blue lighten-2 mt-5"
              dark
              large
              round
              v-bind:to="{name: 'vi-categories'}"
            >
              Tìm hiểu
            </v-btn>
          </v-layout>
        </v-parallax>
      </section>
    </div>
</template>

<script>

export default {
    data() {
        return {

        }
    },
    mounted() {

    },
    methods: {

    }

}
</script>
<style scoped>

</style>
