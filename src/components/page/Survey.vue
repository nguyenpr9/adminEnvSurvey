<template>
  <v-card>
    <page-title
      :heading="heading"
      :subheading="subheading"
      :icon="icon"
    ></page-title>
    <v-card-title>
      <v-text-field
        v-model.lazy="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-btn color="primary" dark class="mb-2" :to="{ name: 'CreateSurvey' }">
        <v-icon>mdi-plus</v-icon> New Item
      </v-btn>
    </v-card-title>
    <v-data-table
      must-sort
      :search="search"
      :headers="headers"
      :items="items"
      :loading="loading"
      :page.sync="page"
      :items-per-page="itemsPerPage"
      @pagination="itemsLength = $event.itemsLength"
      class="elevation-1"
      hide-default-footer
      no-data-text="Không có dữ liệu"
      no-results-text="Không có kết quả"
    >
      <template v-slot:item.status="{ item }">
        <toggle-button
          id="changed-font"
          :speed="480"
          readonly
          :sync="true"
          :value="item.status === 1"
        />
      </template>
      <template v-slot:item.description="{ item }">
        {{ truncateText(item, 200) }}
      </template>
      <template v-slot:item.endDate="{ item }">
        {{ formatDate(item) }}
      </template>
      <template v-slot:item.startDate="{ item }">
        {{ formatDate(item) }}
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn
          small
          icon
          :to="{ name: 'UpdateSurvey', params: { id: item.id } }"
        >
          <v-icon small>
            mdi-pencil
          </v-icon>
        </v-btn>
      </template>
    </v-data-table>
    <div class="div-center">
      <b-pagination
        :total-rows="itemsLength"
        :per-page="itemsPerPage"
        v-model="page"
        class="div-center"
      />
    </div>
  </v-card>
</template>

<script>
import moment from "moment";
import { ToggleButton } from "vue-js-toggle-button";
import { createNamespacedHelpers } from "vuex";
import PageTitle from "../../Layout/Components/PageTitle.vue";
import store from "../../store";
import { survey } from "../../store/modules/survey";
import { ALL } from "../../store/action-types";
const { mapActions } = createNamespacedHelpers(`survey`);

if (!store.state.survey) store.registerModule(`survey`, survey);
export default {
  name: "Survey",
  components: {
    PageTitle,
    ToggleButton
  },
  data: function() {
    return {
      heading: "Survey",
      subheading: "manager survey",
      icon: "pe-7s-notebook icon-gradient bg-mixed-hopes",
      loading: true,
      search: null,
      page: 1,
      pageCount: 0,
      itemsLength: this.$store.state.survey.data.length,
      itemsPerPage: 10,
      headers: [
        { value: "id", text: "Id" },
        {
          value: "description",
          text: "Description"
        },
        { value: "endDate", text: "End date" },
        { value: "startDate", text: "Start date" },
        { value: "title", text: "Title" },
        { value: "user.name", text: "User created" },
        { value: "status", text: "Status" },
        { value: "actions", text: "Action", sortable: false }
      ]
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Survey" : "Edit Survey";
    },
    items: {
      get() {
        return this.$store.state.survey.data;
      },
      set(value) {
        this.value = value;
      }
    }
  },
  mounted() {
    this.fetchData();
  },
  created() {},
  methods: {
    ...mapActions({
      all: ALL
    }),
    async fetchData() {
      this.loading = true;
      await this.all();
      this.loading = false;
    },
    updateStatusItem(id, value) {
      this.$store.dispatch("user/changeStatusSurveys", { status: value, id });
    },
    formatDate(date) {
      return date ? moment(date).format("DD/MM/YYYY") : "";
    },
    truncateText(text, length) {
      if (text.description.length > length) {
        return text.description.substring(0, length) + "...";
      } else {
        return text.description;
      }
    }
  }
};
</script>