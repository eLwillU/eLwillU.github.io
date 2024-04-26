import { ay as _export_sfc, ak as openBlock, aG as createElementBlock, k as createVNode, am as withCtx, az as QCardSection, aA as createBaseVNode, ap as toDisplayString, ar as QSeparator, aB as QCardActions, an as QBtn, ao as createTextVNode, aC as QCard, aL as pushScopeId, aM as popScopeId } from "./index.38afc488.js";
import { f as fhir } from "./midataService.666dd6d8.js";
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
