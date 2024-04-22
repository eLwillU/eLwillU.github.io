import { Q as QCardSection, a as QCardActions, b as QCard } from "./QCardActions.5705e15c.js";
import { Q as QSeparator } from "./QSeparator.02b2b39e.js";
import { Q as QBtn } from "./QBtn.20d981c2.js";
import { fhir } from "./midataService.45988299.js";
import { a2 as _export_sfc, W as openBlock, a5 as createElementBlock, k as createVNode, Y as withCtx, a3 as createBaseVNode, _ as toDisplayString, Z as createTextVNode, a9 as pushScopeId, aa as popScopeId } from "./index.29efcd77.js";
var LoginCard_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId = (n) => (pushScopeId("data-v-1767c71e"), n = n(), popScopeId(), n);
const _hoisted_1 = { class: "container" };
const _hoisted_2 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-h4 text-weight-thin" }, "Login", -1));
const _hoisted_3 = { class: "text-body1" };
const _sfc_main = {
  __name: "LoginCard",
  setup(__props) {
    function connect() {
      fhir.authenticate();
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createVNode(QCard, { class: "card" }, {
          default: withCtx(() => [
            createVNode(QCardSection, null, {
              default: withCtx(() => [
                _hoisted_2,
                createBaseVNode("div", _hoisted_3, toDisplayString(_ctx.$t("loginCardText")), 1)
              ]),
              _: 1
            }),
            createVNode(QSeparator, { inset: "" }),
            createVNode(QCardActions, null, {
              default: withCtx(() => [
                createVNode(QBtn, {
                  onClick: _cache[0] || (_cache[0] = ($event) => connect()),
                  class: "midata-fade full-width",
                  color: "primary"
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(_ctx.$t("connectToMidata")), 1)
                  ]),
                  _: 1
                })
              ]),
              _: 1
            })
          ]),
          _: 1
        })
      ]);
    };
  }
};
var LoginCard = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-1767c71e"]]);
export { LoginCard as L };
