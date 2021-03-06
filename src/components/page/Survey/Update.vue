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
                    name="Title"
                    rules="required"
                    v-slot="{ errors, valid }"
                    ><v-text-field
                      v-model="title"
                      label="Title"
                      :error-messages="errors"
                      :success="valid"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12">
                  <ValidationProvider
                    mode="lazy"
                    name="Description"
                    rules="required"
                    v-slot="{ errors, valid }"
                  >
                    <v-textarea
                      :error-messages="errors"
                      :success="valid"
                      v-model="description"
                      label="Description"
                    ></v-textarea>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12">
                  <v-menu
                    ref="menu1"
                    v-model="menu1"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <ValidationProvider
                        mode="lazy"
                        name="StartDate"
                        rules="required"
                        v-slot="{ errors, valid }"
                      >
                        <v-text-field
                          v-model="startDate"
                          label="StartDate"
                          persistent-hint
                          readonly
                          append-icon="mdi-calendar"
                          v-bind="attrs"
                          v-on="on"
                          :error-messages="errors"
                          :success="valid"
                        ></v-text-field>
                      </ValidationProvider>
                    </template>
                    <v-date-picker
                      v-model="startDate"
                      locale="vi-vn"
                      no-title
                      @input="menu1 = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12">
                  <v-menu
                    ref="menu2"
                    v-model="menu2"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <ValidationProvider
                        mode="lazy"
                        name="EndDate"
                        rules="required"
                        v-slot="{ errors, valid }"
                      >
                        <v-text-field
                          v-model="endDate"
                          label="EndDate"
                          persistent-hint
                          readonly
                          append-icon="mdi-calendar"
                          v-bind="attrs"
                          v-on="on"
                          :error-messages="errors"
                          :success="valid"
                        ></v-text-field>
                      </ValidationProvider>
                    </template>
                    <v-date-picker
                      v-model="endDate"
                      locale="vi-vn"
                      no-title
                      @input="menu2 = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>
              <div class="ml-4">
                <v-row v-for="(question, index) in surveyQs" :key="index">
                  <v-col cols="12">
                    <span class="font-weight-bold">
                      Quest {{ index + 1 }}:
                    </span>
                  </v-col>
                  <v-text-field
                    v-show="false"
                    :value="(question.number = index + 1)"
                    label="Number"
                  ></v-text-field>
                  <v-col cols="12">
                    <ValidationProvider
                      mode="lazy"
                      :name="`${index}_questionQuestion`"
                      rules="required"
                      v-slot="{ errors, valid }"
                    >
                      <v-text-field
                        v-model="question.question"
                        label="Question"
                        :error-messages="errors"
                        :success="valid"
                      ></v-text-field>
                    </ValidationProvider>
                  </v-col>
                  <div
                    v-for="(option, index1) in question.options"
                    :key="index1"
                  >
                    <v-col cols="12">
                      <span class="font-weight-bold">
                        Option {{ index1 + 1 }}:
                      </span>
                    </v-col>
                    <v-col cols="12">
                      <ValidationProvider
                        mode="lazy"
                        :name="`${index}_optionTitle_${index1}`"
                        rules="required"
                        v-slot="{ errors, valid }"
                      >
                        <v-text-field
                          :value="option.title"
                          @input="
                            e =>
                              updateSurveyQsOp({
                                title: 'title',
                                value: e,
                                qIndex: index,
                                oIndex: index1
                              })
                          "
                          label="Title"
                          :error-messages="errors"
                          :success="valid"
                        ></v-text-field>
                      </ValidationProvider>
                    </v-col>
                    <v-text-field
                      v-show="false"
                      :value="
                        updateSurveyQsOp({
                          title: 'value',
                          value: Number(index1) + 1,
                          qIndex: index,
                          oIndex: index1
                        })
                      "
                      label="Value"
                    ></v-text-field>
                  </div>
                  <v-col cols="12">
                    <ValidationProvider
                      mode="lazy"
                      :name="`${index}_questionAnswer`"
                      rules="required|integer"
                      v-slot="{ errors, valid }"
                    >
                      <v-select
                        v-model.number="question.answer"
                        :items="
                          question.options.map(i => {
                            return { value: i.value, title: i.title };
                          })
                        "
                        item-value="value"
                        item-text="title"
                        label="Answer"
                        :error-messages="errors"
                        :success="valid"
                      ></v-select>
                    </ValidationProvider>
                  </v-col>
                </v-row>
              </div>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text to="/survey">
              Back
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
              @click.prevent="submitForm(update)"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </ValidationObserver>
    </template>
  </div>
</template>

<script>
import moment from "moment";
import PageTitle from "../../../Layout/Components/PageTitle.vue";
import { createNamespacedHelpers } from "vuex";
import { UPDATE, ONE } from "../../../store/action-types";
import store from "../../../store";
import {
  survey,
  mapSurveyField,
  mapSurveyQsMultiRowFields
} from "../../../store/modules/survey";
if (!store.state.survey) store.registerModule(`survey`, survey);

const {
  mapActions: mapSurveyActions,
  mapState: mapSurveyState
} = createNamespacedHelpers(`survey`);

const { mapMutations: mapSurveyQsMutations } = createNamespacedHelpers(
  `survey/surveyQs`
);

export default {
  name: "PageCreatePost",
  data() {
    return {
      menu1: false,
      menu2: false,
      startDateTmp: "",
      endDateTmp: "",
      editedIndex: -1,
      heading: "Create Faq",
      subheading: "Create Faq is show happy",
      icon: "pe-7s-notebook icon-gradient bg-mixed-hopes"
    };
  },
  async created() {
    await this.one(this.$route.params.id);
    this.endDate = moment(this.endDate).format("YYYY-MM-DD");
    this.startDate = moment(this.startDate).format("YYYY-MM-DD");
  },
  components: {
    PageTitle
  },
  methods: {
    ...mapSurveyQsMutations({
      updateSurveyQsOp: `updateOptions`
    }),
    ...mapSurveyActions({
      update: UPDATE,
      one: ONE
    }),
    formatDate(date) {
      return date ? moment(date).format("DD/MM/YYYY") : "";
    }
  },
  computed: {
    ...mapSurveyState([`error`, `success`]),
    ...mapSurveyField([
      `survey.title`,
      `survey.description`,
      `survey.startDate`,
      `survey.endDate`,
      `survey.questions`
    ]),
    ...mapSurveyQsMultiRowFields({ surveyQs: `rows` })
  },
  mounted() {},
  watch: {
    startDateTmp(val) {
      this.startDate = this.formatDate(val);
    },
    endDateTmp(val) {
      this.endDate = this.formatDate(val);
    }
  }
};
</script>
<style scoped></style>
