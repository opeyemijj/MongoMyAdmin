<template>
  <v-app id="inspire">
    <v-system-bar app>
      <v-spacer></v-spacer>

      <v-icon>mdi-square</v-icon>

      <v-icon>mdi-circle</v-icon>

      <v-icon>mdi-triangle</v-icon>
    </v-system-bar>

    <v-app-bar
      app
      clipped-right
      flat
      height="100"
    >
    <v-toolbar-title>Your Dashboard</v-toolbar-title>

      
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      app
      width="300"
    >
      <v-navigation-drawer
        v-model="drawer"
        absolute
        color="grey darken-3"
        width="80"
      >
        <v-avatar
          class="d-block text-center mx-auto mt-4"
          color="grey darken-0"
          size="36"
        ></v-avatar>

        <v-divider class="mx-3 my-5"></v-divider>

      

      <v-icon
          class="d-block text-center mx-auto mb-9"
          color="grey lighten-0"
            size="50"
  >mdi-connection</v-icon>

      <v-icon
          class="d-block text-center mx-auto mb-9"
          color="grey lighten-0"
            size="50"
  >mdi-connection</v-icon>

      <v-icon
          class="d-block text-center mx-auto mb-9"
          color="grey lighten-0"
            size="50"
  >mdi-connection</v-icon>

        
      </v-navigation-drawer>



      <v-sheet
        color="grey lighten-5"
        height="100"
        width="100%"
      >
      </v-sheet>

      <v-list
        class="pl-14"
        shaped
      >
        <v-list-item
          v-for="n in 5"
          :key="n"
          link
        >
          <v-list-item-content>
            <v-list-item-title>Item {{ n }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    

    <v-navigation-drawer
      app
      clipped
      right
    >
      <v-list>
        <v-list-item
          v-for="n in 5"
          :key="n"
          link
        >
          <v-list-item-content>
            <v-list-item-title>Item {{ n }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
     <v-tabs>
    <v-tab>Item One</v-tab>
    <v-tab>Item Two</v-tab>
    <v-tab>Item Three</v-tab>
    <v-tab>Item One</v-tab>
    <v-tab>Item Two</v-tab>
    <v-tab>Item Three</v-tab>
    <v-tab>Item One</v-tab>
    <v-tab>Item Two</v-tab>
    <v-tab>Item Three</v-tab>
  </v-tabs>
    </v-main>

    <v-footer
      app
      color="transparent"
      height="72"
      inset
    >
      <v-text-field
        background-color="grey lighten-1"
        dense
        flat
        hide-details
        rounded
        solo
      ></v-text-field>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data: () => ({ drawer: null }),
  }
</script>
