import { m as QIcon, Q as QBtn } from "./QBtn.996f4566.js";
import { c as QPage, b as QCard, Q as QCardSection, a as QCardActions } from "./QCardActions.2b83d1d5.js";
import { L as LoginCard } from "./LoginCard.c1f6e7cc.js";
import { u as userStore } from "./store.33623ab2.js";
import { W as openBlock, X as createBlock, Y as withCtx, $ as unref, a0 as createCommentVNode, a3 as createBaseVNode, k as createVNode, _ as toDisplayString, Z as createTextVNode } from "./index.221cf170.js";
import "./use-dark.ad7e2716.js";
import "./QSeparator.3af3ce63.js";
import "./midataService.acf51e2d.js";
import "./index.33e8d543.js";
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
