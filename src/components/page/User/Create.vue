<template>
  <div>
    <page-title
      :heading="heading"
      :subheading="subheading"
      :icon="icon"
    ></page-title>
    <h1></h1>
    <v-alert type="error" v-if="error">{{ error }}</v-alert>
    <template>
      <ValidationObserver ref="obs">
        <v-card>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <ValidationProvider
                    mode="lazy"
                    name="UserName"
                    rules="required|max:255"
                    v-slot="{ errors, valid }"
                  >
                    <v-text-field
                      v-model="username"
                      :counter="255"
                      :error-messages="errors"
                      :success="valid"
                      label="Username"
                      required
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12">
                  <ValidationProvider
                    mode="lazy"
                    name="email"
                    rules="required|email"
                    v-slot="{ errors, valid }"
                  >
                    <v-text-field
                      v-model="email"
                      :error-messages="errors"
                      :success="valid"
                      label="E-mail"
                      required
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12">
                  <ValidationProvider
                    mode="lazy"
                    name="Name"
                    rules="required|max:255"
                    v-slot="{ errors, valid }"
                  >
                    <v-text-field
                      v-model="name"
                      :counter="255"
                      :error-messages="errors"
                      :success="valid"
                      label="Full name"
                      required
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12">
                  <ValidationProvider
                    mode="lazy"
                    name="Class"
                    rules="required"
                    v-slot="{ errors, valid }"
                  >
                    <v-text-field
                      v-model="_class"
                      :error-messages="errors"
                      :success="valid"
                      label="Class"
                      required
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12">
                  <ValidationProvider
                    mode="lazy"
                    name="RollNumber"
                    rules="required"
                    v-slot="{ errors, valid }"
                  >
                    <v-text-field
                      v-model="rollNumber"
                      :error-messages="errors"
                      :success="valid"
                      label="RollNumber"
                      required
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12">
                  <ValidationProvider
                    mode="lazy"
                    name="Section"
                    rules="required"
                    v-slot="{ errors, valid }"
                  >
                    <v-text-field
                      v-model="section"
                      :error-messages="errors"
                      :success="valid"
                      label="Section"
                      required
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12">
                  <ValidationProvider
                    mode="lazy"
                    name="Specification"
                    rules="required"
                    v-slot="{ errors, valid }"
                  >
                    <v-text-field
                      v-model="specification"
                      :error-messages="errors"
                      :success="valid"
                      label="Specification"
                      required
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text to="/user">
              Back
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
              @click.prevent="submitForm(create)"
            >
              Create
            </v-btn>
          </v-card-actions>
        </v-card>
      </ValidationObserver>
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
const { mapActions, mapState, mapMutations } = createNamespacedHelpers(`user`);
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
    }),
    ...mapMutations(["RESETUSER"])
  },
  created() {
    this.RESETUSER();
  },
  computed: {
    ...mapState([`error`, `success`]),
    ...mapUserField([
      `user.username`,
      `user.email`,
      `user.class`,
      `user.rollNumber`,
      `user.section`,
      `user.specification`,
      `user.name`
    ]),
    ...mapUserField({
      _class: `user._class`
    })
  }
};
</script>
<style scoped></style>
