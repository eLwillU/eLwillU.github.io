import { a3 as openBlock, a4 as createBlock, a5 as withCtx, k as createVNode, ax as QCardSection, a9 as QIcon, ay as createBaseVNode, a8 as toDisplayString, az as QCardActions, a6 as QBtn, ab as unref, a7 as createTextVNode, aA as QCard } from "./index.9dd312cd.js";
import { Q as QPage } from "./QPage.1ab9179f.js";
import { fhir } from "./midataService.0f773e6e.js";
import "./index.11fb3ad4.js";
const _hoisted_1 = { class: "text-h6" };
const _hoisted_2 = { class: "text-center" };
const _sfc_main = {
  __name: "QuestionnaireCompletePage",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(QPage, { padding: "" }, {
        default: withCtx(() => [
          createVNode(QCard, { class: "q-mb-sm" }, {
            default: withCtx(() => [
              createVNode(QCardSection, { class: "text-center" }, {
                default: withCtx(() => [
                  createVNode(QIcon, {
                    name: "task",
                    size: "xl",
                    class: "text-green"
                  }),
                  createBaseVNode("div", _hoisted_1, toDisplayString(_ctx.$t("questionnaireDonePageTitle")), 1)
                ]),
                _: 1
              }),
              createVNode(QCardSection, null, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_2, toDisplayString(_ctx.$t("questionnaireDonePageText")), 1)
                ]),
                _: 1
              }),
              createVNode(QCardActions, { align: "center" }, {
                default: withCtx(() => [
                  createVNode(QBtn, {
                    color: "primary",
                    to: "/infoPage",
                    onClick: _cache[0] || (_cache[0] = ($event) => unref(fhir).logout())
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Logout")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      });
    };
  }
};
export { _sfc_main as default };
