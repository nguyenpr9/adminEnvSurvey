import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
import { middlewarePipeline } from "./middlewarePipeline";
import guestMiddle from "./middleware/guest";
import authMiddle from "./middleware/auth";
import DEFAULT_PAGE from "../Layout/Wrappers/baseLayout.vue";
import BLANK from "../Layout/Wrappers/pagesLayout.vue";
import { auth } from "../store/modules/auth";
if (!store.state.auth) store.registerModule(`auth`, auth);
Vue.use(VueRouter);

const routes = [
  {
    path: "*",
    name: "PageNotFound",
    component: () => import("../views/PageNotFound.vue"),
    meta: {
      layout: BLANK
    }
  },
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
    meta: {
      layout: DEFAULT_PAGE,
      middleware: [authMiddle]
    }
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
    meta: {
      layout: BLANK,
      middleware: [guestMiddle]
    }
  },
  {
    path: "/user",
    component: () => import("../Layout/Components/Blank.vue"),
    meta: {
      layout: DEFAULT_PAGE,
      middleware: [authMiddle]
    },
    children: [
      {
        path: "",
        name: "ListUser",
        component: () => import("../components/page/User"),
        meta: {
          layout: DEFAULT_PAGE,
          middleware: [authMiddle]
        }
      },
      {
        path: "create",
        name: "CreateUser",
        component: () => import("../components/page/User/Create"),
        meta: {
          layout: DEFAULT_PAGE,
          middleware: [authMiddle]
        }
      }
    ]
  },
  {
    path: "/faq",
    component: () => import("../Layout/Components/Blank.vue"),
    meta: {
      layout: DEFAULT_PAGE,
      middleware: [authMiddle]
    },
    children: [
      {
        path: "",
        name: "ListFaq",
        component: () => import("../components/page/Faq"),
        meta: {
          layout: DEFAULT_PAGE,
          middleware: [authMiddle]
        }
      },
      {
        path: "create",
        name: "CreateFaq",
        component: () => import("../components/page/Faq/Create"),
        meta: {
          layout: DEFAULT_PAGE,
          middleware: [authMiddle]
        }
      },
      {
        path: "update/:id",
        name: "UpdateFaq",
        component: () => import("../components/page/Faq/Update"),
        meta: {
          layout: DEFAULT_PAGE,
          middleware: [authMiddle]
        }
      }
    ]
  },
  {
    path: "/survey",
    component: () => import("../Layout/Components/Blank.vue"),
    meta: {
      layout: DEFAULT_PAGE,
      middleware: [authMiddle]
    },
    children: [
      {
        path: "",
        name: "ListSurvey",
        component: () => import("../components/page/Survey"),
        meta: {
          layout: DEFAULT_PAGE,
          middleware: [authMiddle]
        }
      },
      {
        path: "create",
        name: "CreateSurvey",
        component: () => import("../components/page/Survey/Create"),
        meta: {
          layout: DEFAULT_PAGE,
          middleware: [authMiddle]
        }
      },
      {
        path: "update/:id",
        name: "UpdateSurvey",
        component: () => import("../components/page/Survey/Update"),
        meta: {
          layout: DEFAULT_PAGE,
          middleware: [authMiddle]
        }
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) return next();
  store.dispatch("auth/checkAuth");
  const middleware = to.meta.middleware;
  const context = {
    to,
    from,
    next,
    store
  };
  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1)
  });
});

export default router;
