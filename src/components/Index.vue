<template>
  <v-app id="inspire">
    <v-system-bar app>
      <v-spacer></v-spacer>
      <v-icon>mdi-square</v-icon>
      <v-icon>mdi-circle</v-icon>
      <v-icon>mdi-triangle</v-icon>
    </v-system-bar>
    <v-navigation-drawer
        v-model="drawer"
        app
    >
      <v-sheet
          color="grey lighten-4"
          class="pa-4"
      >
        <v-avatar
            class="mb-4"
            color="grey darken-1"
            size="64"
        />
        <div>john@vuetifyjs.com</div>
      </v-sheet>
      <v-divider/>
      <v-treeview :items="links"></v-treeview>
    </v-navigation-drawer>
    <v-main>
      <v-container
          class="py-8 px-6"
          fluid
      >
        <v-row>
          <v-col
              cols="12"
          >
            <v-card>
              <v-tabs
                  v-model="current_tab"
                  background-color="primary"
                  dark
              >
                <div class="d-flex"></div>
                <v-tab
                    v-for="(tab, index) in tabs"
                    :key="tab.id"
                >
                  {{ tab.name }}
                  <v-btn
                      icon
                      v-if="index"
                      @click="removeTab(index)"
                      class="ml-2"
                  >
                    <v-icon x-small>mdi-close</v-icon>
                  </v-btn>
                </v-tab>
              </v-tabs>

              <v-tabs-items v-model="current_tab">
                <v-tab-item
                    v-for="tab in tabs"
                    :key="tab.id"
                >
                  <v-card flat>
                    <v-card-text>{{ tab.content }}</v-card-text>
                  </v-card>
                </v-tab-item>
              </v-tabs-items>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'Index',
  data: () => ({
    cards: ['Today', 'Yesterday'],
    drawer: null,
    links: [
      {
        id: 1,
        name: 'collections',
        children: [
          { id: 2, name: 'documents' },
          { id: 3, name: 'users' },
        ],
      },
      {
        id: 4,
        name: 'demo',
        children: [
          { id: 5, name: 'test_table' },
          { id: 6, name: 'users' },
          { id: 7, name: 'uploads' },
        ],
      },
    ],
    current_tab: null,
    tabs: [
      {id: 1, name: 'Welcome', content: 'Tab Welcome' },
      {id: 2, name: 'One', content: 'Tab 1 Content' },
      {id: 3, name: 'Two', content: 'Tab 2 Content' },
      {id: 4, name: 'Three', content: 'Tab 3 Content' },
      {id: 5, name: 'Four', content: 'Tab 4 Content' },
      {id: 6, name: 'Five', content: 'Tab 5 Content' },
      {id: 7, name: 'Six', content: 'Tab 6 Content' },
      {id: 8, name: 'Seven', content: 'Tab 7 Content' },
      {id: 9, name: 'Eight', content: 'Tab 8 Content' },
      {id: 10, name: 'Nine', content: 'Tab 9 Content' },
      {id: 11, name: 'Ten', content: 'Tab 10 Content' },
    ],
  }),
  methods: {
    removeTab(index) {
      this.tabs.splice(index, 1)
    }
  }
}
</script>

<style scoped>

</style>