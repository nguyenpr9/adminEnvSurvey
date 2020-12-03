export default function auth({ next, store }) {
  if (!store.getters["auth/loggedIn"]) {
    return next({
      name: "Login"
    });
  }

  return next();
}
