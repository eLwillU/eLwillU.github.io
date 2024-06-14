import { aw as _export_sfc, a3 as openBlock, a4 as createBlock, a5 as withCtx, k as createVNode, ax as QCardSection, a7 as createTextVNode, az as QCardActions, a6 as QBtn, aA as QCard } from "./index.9a05e29b.js";
import { Q as QPage } from "./QPage.e0b1ec6f.js";
const _sfc_main = {};
function _sfc_render(_ctx, _cache) {
  return openBlock(), createBlock(QPage, null, {
    default: withCtx(() => [
      createVNode(QCard, {
        class: "q-mt-sm",
        primary: ""
      }, {
        default: withCtx(() => [
          createVNode(QCardSection, null, {
            default: withCtx(() => [
              createTextVNode(" Um den Feedback-Fragebogen auszuf\xFCllen, klicken sie auf den Button ")
            ]),
            _: 1
          }),
          createVNode(QCardActions, null, {
            default: withCtx(() => [
              createVNode(QBtn, { outline: "" }, {
                default: withCtx(() => [
                  createTextVNode("Start")
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
}
var TechDayPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { TechDayPage as default };
