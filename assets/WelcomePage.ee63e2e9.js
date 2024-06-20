import { a3 as openBlock, a4 as createBlock, a5 as withCtx, ab as unref, ac as createCommentVNode, ay as createBaseVNode, aA as QCard, k as createVNode, a9 as QIcon, a8 as toDisplayString, ax as QCardSection, a7 as createTextVNode, a6 as QBtn, az as QCardActions } from "./index.9dd312cd.js";
import { Q as QPage } from "./QPage.1ab9179f.js";
import { L as LoginCard } from "./LoginCard.5da7b3a9.js";
import { u as userStore } from "./store.4cfdef6b.js";
import "./midataService.0f773e6e.js";
import "./index.11fb3ad4.js";
const _hoisted_1 = { class: "q-py-md row justify-center" };
const _hoisted_2 = { class: "text-h6" };
const _sfc_main = {
  __name: "WelcomePage",
  setup(__props) {
    const store = userStore();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(QPage, null, {
        default: withCtx(() => [
          !unref(store).isLoggedIn ? (openBlock(), createBlock(LoginCard, { key: 0 })) : createCommentVNode("", true),
          createBaseVNode("div", _hoisted_1, [
            unref(store).isLoggedIn ? (openBlock(), createBlock(QCard, {
              key: 0,
              class: "col-sm-8"
            }, {
              default: withCtx(() => [
                createVNode(QCardSection, { class: "text-center" }, {
                  default: withCtx(() => [
                    createVNode(QIcon, {
                      name: "check_circle_outline",
                      size: "xl",
                      class: "text-green"
                    }),
                    createBaseVNode("div", _hoisted_2, toDisplayString(_ctx.$t("registerSuccess")), 1)
                  ]),
                  _: 1
                }),
                createVNode(QCardSection, { class: "text-center" }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(_ctx.$t("loginSuccess")), 1)
                  ]),
                  _: 1
                }),
                createVNode(QCardActions, { align: "center" }, {
                  default: withCtx(() => [
                    createVNode(QBtn, {
                      color: "primary",
                      to: "/questionnaire"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(_ctx.$t("startButton")), 1)
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })
              ]),
              _: 1
            })) : createCommentVNode("", true)
          ])
        ]),
        _: 1
      });
    };
  }
};
export { _sfc_main as default };
