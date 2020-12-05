<template>
  <v-card>
    <v-alert type="success" v-if="success">{{ success }}</v-alert>
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
      <v-btn color="primary" dark class="mb-2" :to="{ name: 'CreateUser' }">
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
        <!--        <toggle-button-->
        <!--          id="changed-font"-->
        <!--          :speed="480"-->
        <!--          :sync="true"-->
        <!--          :value="item.status === 1"-->
        <!--          readonly-->
        <!--          @change="updateStatusItem(item.id, $event.value)"-->
        <!--        />-->
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small @click="deleteItem(item)">
          mdi-delete
        </v-icon>
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
// import { ToggleButton } from "vue-js-toggle-button";
import PageTitle from "../../Layout/Components/PageTitle.vue";
import store from "../../store";
import { user, mapUserField } from "../../store/modules/user";
import { DELETE } from "../../store/action-types";
const { mapActions } = createNamespacedHelpers(`user`);

if (!store.state.user) store.registerModule(`user`, user);
export default {
  name: "User",
  components: {
    PageTitle
    // ToggleButton
  },
  data: function() {
    return {
      dialogDelete: false,
      heading: "User",
      subheading: "manager user",
      icon: "pe-7s-notebook icon-gradient bg-mixed-hopes",
      loading: true,
      search: null,
      page: 1,
      pageCount: 0,
      itemsLength: this.$store.state.user.data.length,
      itemsPerPage: 10,
      headers: [
        { value: "id", text: "Id" },
        {
          value: "email",
          text: "Email"
        },
        { value: "name", text: "Full name" },
        { value: "status", text: "Status" },
        { value: "actions", text: "Action", sortable: false }
      ]
    };
  },
  computed: {
    ...mapUserField([`success`]),
    formTitle() {
      return this.editedIndex === -1 ? "New User" : "Edit User";
    },
    items: {
      get() {
        return this.$store.state.user.data;
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
      delete: DELETE
    }),
    fetchData() {
      this.loading = true;
      this.$store.dispatch("user/fetchUsers").then(() => {
        this.loading = false;
      });
    },
    updateStatusItem(id, value) {
      this.$store.dispatch("user/changeStatusUsers", { status: value, id });
    },

    deleteItem(item) {
      // this.items.indexOf(item);
      this.editedIndex = item.id;
      this.dialogDelete = true;
    },

    async deleteItemConfirm() {
      await this.delete(this.editedIndex);
      await this.$store.dispatch("user/fetchUsers");
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
