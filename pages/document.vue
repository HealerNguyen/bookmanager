<template>
	<div style="background-color: darkgrey">
        
        <v-layout row wrap>
				<v-flex class="text-xs-center">
                    <v-rating
                        v-model="rating"
                        color="yellow darken-3"
                        background-color="grey darken-1"
                        empty-icon="$vuetify.icons.ratingFull"
                        half-increments
                        hover
                    ></v-rating> {{ rating }}
					<v-btn 
                        round 
                        large 
                        class="btn-start" 
                        dark 
                        v-bind:to="{name: 'index'}">
						<v-icon left dark>near_me</v-icon> Home
					</v-btn>
                    <v-btn 
                        round 
                        large 
                        class="btn-start" 
                        dark 
                        v-bind:to="{name: 'document'}">
                        <v-icon left dark>cloud_done</v-icon> Document
                    </v-btn>
				</v-flex>
		</v-layout>
        <v-layout row wrap>
				<v-flex class="text-xs-center">
					<v-btn 
                        round 
                        large 
                        color="primary" 
                        dark
                        :loading="loading"
                        :disabled="loading" 
                        @click.native="loader = 'loading'"
                        >
						<v-icon left dark>near_me</v-icon> Loading
					</v-btn>
                    <v-btn 
                        round 
                        large 
                        color="green" 
                        dark
                        :loading="loading2"
                        :disabled="loading2" 
                        @click="customEvent()" 
                        >
                        <v-icon left dark>cloud_done</v-icon> Compare
                    </v-btn>
                    <v-hover>
    <v-card
      slot-scope="{ hover }"
      :class="`elevation-${hover ? 12 : 2}`"
      class="mx-auto"
      width="344"
    >
      <v-img
        :aspect-ratio="16/9"
        src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
      ></v-img>
      <v-card-title>
        <div>
          <span class="headline">Cafe Badilico</span>
          <div class="d-flex">
            <v-rating
              :value="value"
              color="amber"
              dense
              half-increments
              readonly
              size="14"
            ></v-rating>
            <div class="ml-2 grey--text text--darken-2">
              <span>{{ value }}</span>
              <span>({{ reviews }})</span>
            </div>
          </div>
        </div>
        <v-spacer></v-spacer>
        <v-btn icon class="mr-0">
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-card-title>
    </v-card>
  </v-hover>
  <v-card>
        <v-container grid-list-sm fluid>
          <v-layout row wrap>
            <v-flex
              v-for="n in 9"
              :key="n"
              xs4
              d-flex
            >
              <v-card flat tile class="d-flex">
                <v-img
                  :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
                  :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
                  aspect-ratio="1"
                  class="grey lighten-2"
                >
                  <v-layout
                    slot="placeholder"
                    fill-height
                    align-center
                    justify-center
                    ma-0
                  >
                    <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                  </v-layout>
                </v-img>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
				</v-flex>
		</v-layout>
	</div>
</template>

<script>
export default {
	data () {
		return {
			loader: null,
            loading: false,
            loading2:false,
            reviews: 413,
            value: 4.5,
            rating: 0,
		}
    },
    mounted() {
        this.test()
    },
    methods: {
        customEvent() {
            this.loader = 'loading2'
            const l = this.loader
            this[l] = !this[l]
            console.log('work!')
            //setTimeout(() => (this[l] = false), 3000)
            setTimeout(function () {
                this[l] = false
            }.bind(this))
            this.loader = null
        }
    },
    watch: {
        loader () {
            const l = this.loader
            this[l] = !this[l]

            setTimeout(() => (this[l] = false), 3000)

            this.loader = null
        }
    }
}
</script>