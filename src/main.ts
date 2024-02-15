import { createApp } from "vue";
import App from "./App.vue";
import "./assets/style.scss";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const app = createApp(App);
// Adding plugin for notifications
app.use(Toast);
app.mount("#app");
