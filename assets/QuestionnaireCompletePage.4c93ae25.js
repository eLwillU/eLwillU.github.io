import { m as QIcon, Q as QBtn } from "./QBtn.fcc7cdec.js";
import { c as QPage, Q as QCardSection, a as QCardActions, b as QCard } from "./QCardActions.22f07249.js";
import { fhir } from "./midataService.c7ddae51.js";
import { W as openBlock, X as createBlock, Y as withCtx, k as createVNode, a3 as createBaseVNode, _ as toDisplayString, Z as createTextVNode, $ as unref } from "./index.0d20794b.js";
import "./use-dark.c9c13bf2.js";
import "./index.33e8d543.js";
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
              createVNode(QCardActions, { class: "justify-between" }, {
                default: withCtx(() => [
                  createVNode(QBtn, {
                    color: "primary",
                    to: "/questionnaire"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(_ctx.$t("back")), 1)
                    ]),
                    _: 1
                  }),
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
