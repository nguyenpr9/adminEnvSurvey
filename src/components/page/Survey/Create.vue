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
      <ValidationObserver v-slot="{ handleSubmit }">
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
                    <v-text-field
                      :error-messages="errors"
                      :success="valid"
                      v-model="description"
                      label="Description"
                    ></v-text-field>
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
                    <span class="font-weight-bold"> Quest {{ index }}: </span>
                    <v-btn color="primary" @click="removeSurveyQs(index)" small>
                      Remove
                    </v-btn>
                  </v-col>
                  <v-col cols="12">
                    <ValidationProvider
                      mode="lazy"
                      :name="`${index}_questionNumber`"
                      :rules="
                        `required|integer|unique:${surveyQs.map(i => {
                          return i.number;
                        })}|min_value:0`
                      "
                      v-slot="{ errors, valid }"
                    >
                      <v-text-field
                        :error-messages="errors"
                        :success="valid"
                        v-model.number="question.number"
                        label="Number"
                      ></v-text-field>
                    </ValidationProvider>
                  </v-col>
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
                            return i.value;
                          })
                        "
                        item-value="value"
                        label="Answer"
                        :error-messages="errors"
                        :success="valid"
                      ></v-select>
                    </ValidationProvider>
                  </v-col>
                  <div
                    class="ml-8"
                    v-for="(option, index1) in question.options"
                    :key="index1"
                  >
                    <v-col cols="12">
                      <span class="font-weight-bold">
                        Option {{ index1 }}:
                      </span>
                      <v-btn
                        color="primary"
                        @click="removeSurveyQsOp({ index, index1 })"
                        small
                      >
                        Remove
                      </v-btn>
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
                    <v-col cols="12">
                      <ValidationProvider
                        mode="lazy"
                        :name="`${index}_optionValue_${index1}`"
                        :rules="
                          `required|integer|unique:${question.options.map(i => {
                            return i.value;
                          })}|min_value:0`
                        "
                        v-slot="{ errors, valid }"
                      >
                        <v-text-field
                          :value="option.value"
                          @input="
                            e =>
                              updateSurveyQsOp({
                                title: 'value',
                                value: !isNaN(Number(e)) ? Number(e) : e,
                                qIndex: index,
                                oIndex: index1
                              })
                          "
                          label="Value"
                          :error-messages="errors"
                          :success="valid"
                        ></v-text-field>
                      </ValidationProvider>
                    </v-col>
                  </div>
                  <v-card-actions>
                    <v-btn color="primary" small @click="addSurveyQsOp(index)">
                      Add option
                    </v-btn>
                  </v-card-actions>
                </v-row>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" small @click="addSurveyQs">
                    Add question
                  </v-btn>
                </v-card-actions>
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
              @click.prevent="handleSubmit(create)"
              text
              >Create</v-btn
            >
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
import { CREATE } from "../../../store/action-types";
import {
  ADD_CHILD_ROW,
  ADD_ROW,
  REMOVE_CHILD_ROW,
  REMOVE_ROW
} from "../../../store/mutation-types";
import store from "../../../store";
import {
  survey,
  mapSurveyField,
  mapSurveyQsMultiRowFields
} from "../../../store/modules/survey";
if (!store.state.survey) store.registerModule(`survey`, survey);

const {
  mapActions: mapSurveyActions,
  mapMutations: mapSurveyMutations,
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
      heading: "Create Survey",
      subheading: "Create Survey is show happy",
      icon: "pe-7s-notebook icon-gradient bg-mixed-hopes"
    };
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
  components: {
    PageTitle
  },
  async created() {
    await this.RESETSURVEY();
  },
  methods: {
    ...mapSurveyMutations(["RESETSURVEY"]),
    ...mapSurveyQsMutations({
      addSurveyQs: ADD_ROW,
      addSurveyQsOp: ADD_CHILD_ROW,
      removeSurveyQs: REMOVE_ROW,
      removeSurveyQsOp: REMOVE_CHILD_ROW,
      updateSurveyQsOp: `updateOptions`
    }),
    ...mapSurveyActions({
      create: CREATE
    }),
    formatDate(date) {
      return date ? moment(date).format("DD/MM/YYYY") : "";
    }
  },
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
