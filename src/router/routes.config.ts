import HomePage from "src/pages/Todo/index";

export default [
  { path: "/", component: HomePage, exact: true },
  {
    redirect: "/"
  }
];
