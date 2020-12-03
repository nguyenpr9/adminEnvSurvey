<template>
  <div>
    <page-title
      :heading="heading"
      :subheading="subheading"
      :icon="icon"
    ></page-title>
    <h1></h1>
    <p v-if="error" class="text-center error">{{ error }}</p>
    <template>
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="username"
                  label="Username"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="email" label="Email"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="name" label="Full name"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text to="/user">
            Back
          </v-btn>
          <v-btn color="blue darken-1" text @click="create">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </div>
</template>

<script>
import PageTitle from "../../../Layout/Components/PageTitle.vue";
import { createNamespacedHelpers } from "vuex";
import { CREATE } from "../../../store/action-types";
import store from "../../../store";
import { user, mapUserField } from "../../../store/modules/user";
if (!store.state.user) store.registerModule(`user`, user);
const { mapActions, mapState } = createNamespacedHelpers(`user`);
export default {
  name: "PageCreatePost",
  data() {
    return {
      editedIndex: -1,
      heading: "Create User",
      subheading: "Create User is show happy",
      icon: "pe-7s-notebook icon-gradient bg-mixed-hopes"
    };
  },
  components: {
    PageTitle
  },
  methods: {
    ...mapActions({
      create: CREATE
    })
  },
  computed: {
    ...mapState([`error`, `success`]),
    ...mapUserField([`user.username`, `user.email`, `user.name`])
  }
};
</script>
<style scoped></style>
