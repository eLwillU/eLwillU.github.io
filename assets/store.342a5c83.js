import { l as defineStore, r as ref } from "./index.73cef502.js";
var lang = navigator.language.split("-")[0];
if (lang === "de" || lang === "fr") {
  lang = lang;
} else {
  lang = "de";
}
const userStore = defineStore("user", {
  state: () => ({
    locale: lang,
    questionnaireResponse: ref(""),
    currentPage: ref(1),
    isLoggedIn: false
  }),
  getters: {
    getCurrentPage() {
      return this.currentPage;
    },
    getLanguage() {
      return this.locale.split("-")[0];
    },
    getQuestionnaireResponse() {
      return this.questionnaireResponse;
    },
    getIsLoggedIn() {
      return this.isLoggedIn;
    }
  },
  actions: {
    setLanguage(language) {
      this.locale = language;
    },
    setQuestionnaireResponse(response) {
      this.questionnaireResponse = response;
    },
    setLoginStatus(status) {
      console.log(`Updating login status from ${this.isLoggedIn} to ${status}`);
      this.isLoggedIn = status;
    }
  }
});
export { userStore as u };
