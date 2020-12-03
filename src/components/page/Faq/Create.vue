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
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="question"
                  label="Question"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea v-model="answer" label="Answer"></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text to="/faq">
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
