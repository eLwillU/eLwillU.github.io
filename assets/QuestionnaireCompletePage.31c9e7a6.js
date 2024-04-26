import { ak as openBlock, al as createBlock, am as withCtx, k as createVNode, az as QCardSection, aq as QIcon, aA as createBaseVNode, ap as toDisplayString, aB as QCardActions, an as QBtn, as as unref, ao as createTextVNode, aC as QCard } from "./index.6fa9569b.js";
import { Q as QPage } from "./QPage.d8f66d8b.js";
import { f as fhir } from "./midataService.666dd6d8.js";
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
