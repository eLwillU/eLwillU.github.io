import { l as defineStore, r as ref } from "./index.6fa9569b.js";
const userStore = defineStore("user", {
  state: () => ({
    locale: ref(navigator.language.split("-")[0]),
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
