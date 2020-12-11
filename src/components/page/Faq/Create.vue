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
                    name="Question"
                    rules="required"
                    v-slot="{ errors, valid }"
                  >
                    <v-text-field
                      v-model="question"
                      :error-messages="errors"
                      :success="valid"
                      label="Question"
                      required
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12">
                  <ValidationProvider
                    name="Answer"
                    rules="required"
                    v-slot="{ errors, valid }"
                  >
                    <v-textarea
                      :error-messages="errors"
                      :success="valid"
                      required
                      v-model="answer"
                      label="Answer"
                    ></v-textarea>
                  </ValidationProvider>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text to="/faq">
              Back
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
              @click.prevent="submitForm(create)"
              >Create</v-btn
            >
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
import { faq, mapFaqField } from "../../../store/modules/faq";
if (!store.state.faq) store.registerModule(`faq`, faq);
const { mapActions, mapState, mapMutations } = createNamespacedHelpers(`faq`);
export default {
  name: "PageCreatePost",
  data() {
    return {
      editedIndex: -1,
      heading: "Create Faq",
      subheading: "Create Faq is show happy",
      icon: "pe-7s-notebook icon-gradient bg-mixed-hopes"
    };
  },
  components: {
    PageTitle
  },
  created() {
    this.RESETFAQ();
  },
  methods: {
    ...mapMutations(["RESETFAQ"]),
    ...mapActions({
      create: CREATE
    })
  },
  computed: {
    ...mapState([`error`, `success`]),
    ...mapFaqField([`faq.question`, `faq.answer`])
  }
};
</script>
<style scoped></style>
