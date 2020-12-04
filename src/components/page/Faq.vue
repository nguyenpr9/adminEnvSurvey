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
      <v-btn color="primary" dark class="mb-2" :to="{ name: 'CreateFaq' }">
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
      :sort-by="['status', 'id']"
      :sort-desc="[true, true]"
      :items-per-page="itemsPerPage"
      @pagination="itemsLength = $event.itemsLength"
      class="elevation-1"
      hide-default-footer
      no-data-text="Không có dữ liệu"
      no-results-text="Không có kết quả"
    >
      <template v-slot:item.status="{ item }">
        <v-chip :color="item.status ? 'green' : 'red'" dark>
          {{ item.status ? "Active" : "Block" }}
        </v-chip>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small @click="deleteItem(item)">
          mdi-delete
        </v-icon>
        <v-btn small icon :to="{ name: 'UpdateFaq', params: { id: item.id } }">
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
    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="headline"
          >Are you sure you want to delete this item?</v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="deleteItemConfirm"
            >OK</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import PageTitle from "../../Layout/Components/PageTitle.vue";
import store from "../../store";
import { faq } from "../../store/modules/faq";
import { DELETE, ALL } from "../../store/action-types";
const { mapActions } = createNamespacedHelpers(`faq`);

if (!store.state.faq) store.registerModule(`faq`, faq);
export default {
  name: "Faq",
  components: {
    PageTitle
  },
  data: function() {
    return {
      dialogDelete: false,
      heading: "Faq",
      subheading: "manager faq",
      icon: "pe-7s-notebook icon-gradient bg-mixed-hopes",
      loading: true,
      search: null,
      page: 1,
      pageCount: 0,
      itemsLength: this.$store.state.faq.data.length,
      itemsPerPage: 10,
      headers: [
        { value: "id", text: "Id" },
        {
          value: "question",
          text: "Question"
        },
        { value: "answer", text: "Answer" },
        { value: "status", text: "Status" },
        { value: "actions", text: "Action", sortable: false }
      ]
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Faq" : "Edit Faq";
    },
    items: {
      get() {
        return this.$store.state.faq.data;
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
      delete: DELETE,
      all: ALL
    }),
    async fetchData() {
      this.loading = true;
      await this.all();
      this.loading = false;
    },
    updateStatusItem(id, value) {
      this.$store.dispatch("user/changeStatusFaqs", { status: value, id });
    },

    deleteItem(item) {
      // this.items.indexOf(item);
      this.editedIndex = item.id;
      this.dialogDelete = true;
    },

    async deleteItemConfirm() {
      await this.delete(this.editedIndex);
      await this.all();
      this.closeDelete();
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedIndex = -1;
      });
    }
  },
  watch: {
    dialogDelete(val) {
      val || this.closeDelete();
    }
  }
};
</script>
