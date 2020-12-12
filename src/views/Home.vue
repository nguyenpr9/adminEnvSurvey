<template>
  <div>
    <div class="row card">
      <div class="card-header-tab card-header">
        <div
          class="card-header-title font-size-lg text-capitalize font-weight-normal"
        >
          <i class="header-icon lnr-charts icon-gradient bg-happy-green"> </i>
          Statistic Dashboard
        </div>
      </div>
      <div class="no-gutters row">
        <div class="col-sm-6 col-md-4 col-xl-4">
          <div
            class="card no-shadow rm-border bg-transparent widget-chart text-left"
          >
            <div class="icon-wrapper rounded-circle">
              <div class="icon-wrapper-bg opacity-10 bg-warning"></div>
              <i class="lnr-laptop-phone text-dark opacity-8"></i>
            </div>
            <div class="widget-chart-content">
              <div class="widget-subheading">Total Users</div>
              <div class="widget-numbers">
                {{ statisticDashboard.userCount }}
              </div>
            </div>
          </div>
          <div class="divider m-0 d-md-none d-sm-block"></div>
        </div>
        <div class="col-sm-6 col-md-4 col-xl-4">
          <div
            class="card no-shadow rm-border bg-transparent widget-chart text-left"
          >
            <div class="icon-wrapper rounded-circle">
              <div class="icon-wrapper-bg opacity-9 bg-danger"></div>
              <i class="lnr-graduation-hat text-white"></i>
            </div>
            <div class="widget-chart-content">
              <div class="widget-subheading">Total Surveys</div>
              <div class="widget-numbers">
                <span>{{ statisticDashboard.surveyCount }}</span>
              </div>
            </div>
          </div>
          <div class="divider m-0 d-md-none d-sm-block"></div>
        </div>
        <div class="col-sm-12 col-md-4 col-xl-4">
          <div
            class="card no-shadow rm-border bg-transparent widget-chart text-left"
          >
            <div class="icon-wrapper rounded-circle">
              <div class="icon-wrapper-bg opacity-9 bg-success"></div>
              <i class="lnr-apartment text-white"></i>
            </div>
            <div class="widget-chart-content">
              <div class="widget-subheading">
                Total participants
              </div>
              <div class="widget-numbers text-success">
                <span>{{ statisticDashboard.surveyResultCount }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <br />
    <div class="row card">
      <div class="card-header-tab card-header">
        <div
          class="card-header-title font-size-lg text-capitalize font-weight-normal"
        >
          <i class="header-icon lnr-charts icon-gradient bg-happy-green"> </i>
          Survey's participants
        </div>
      </div>
      <div class="no-gutters row">
        <div
          class="col-sm-6 col-md-4 col-xl-4"
          v-for="(value, index) in statisticSurveyUserCount"
          :key="value.id"
        >
          <div
            class="card no-shadow rm-border bg-transparent widget-chart text-left"
          >
            <div class="icon-wrapper rounded-circle">
              <div class="icon-wrapper-bg opacity-9 bg-danger"></div>
              <i class="lnr-graduation-hat text-white"></i>
            </div>
            <div class="widget-chart-content">
              <div class="widget-subheading">Topic {{ index }}</div>
              <div class="widget-numbers">
                <span>{{ value.userCount }}</span>
              </div>
              <div class="widget-description opacity-8 text-focus">
                <div class="d-inline text-danger pr-1">
                  {{ value.title }}
                </div>
              </div>
            </div>
          </div>
          <div class="divider m-0 d-md-none d-sm-block"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store";
export default {
  name: "Home",
  components: {},
  computed: {
    statisticSurveyUserCount() {
      return store.state.statisticSurveyUserCount;
    },
    statisticDashboard() {
      return store.state.statisticDashboard;
    }
  },
  async created() {
    await store.dispatch("statisticSurveyUserCount");
    await store.dispatch("statisticDashboard");
  },
  methods: {
    load() {
      console.log(this.statisticSurveyUserCount);
      console.log(this.statisticDashboard);
    }
  }
};
</script>
