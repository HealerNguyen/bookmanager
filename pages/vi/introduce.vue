<template>
    <div>
      <gmap-map
        :center="center"
        :zoom="7"
        map-type-id="terrain"
        class="gmap-content"
      >
        <gmap-marker
          :key="index"
          v-for="(m, index) in markers"
          :position="m.position"
          :clickable="true"
          :draggable="true"
          @click="center=m.position"
        />
      </gmap-map>


      <section>
        <v-container grid-list-xl>
          <v-layout row wrap justify-center>
            <v-flex xs12 sm4>
              <v-card class="elevation-0 transparent">
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline">Ve chung toi</div>
                </v-card-title>
                <v-card-text>
                  aaaaaaaaaaaa 
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs12 sm4 offset-sm1>
              <v-card class="elevation-0 transparent">
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline">Lien he chung toi</div>
                </v-card-title>
                <v-card-text>
                  bbb
                </v-card-text>
                <v-list class="transparent">
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon class="blue--text text--lighten-2">phone</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>777-867-5309</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon class="blue--text text--lighten-2">place</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>Ha Noi, Viet Nam</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon class="blue--text text--lighten-2">email</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>libvue@gmail.com</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </section>
    </div>
</template>

<script>

export default {
    data() {
        return {
          center: { lat: 21.027763, lng: 105.834160},
          markers: [
            { position: {lat: 21.027763, lng: 105.834160}},
          ]
        }
    },
    mounted() {

    },
    methods: {

    }

}
</script>
<style scoped>
  .gmap-content {
    width: 100%;
    height: 350px;
  }
</style>
