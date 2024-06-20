import { Q as QImg } from "./QImg.f4fa32f8.js";
import { aw as _export_sfc, a3 as openBlock, a4 as createBlock, a5 as withCtx, k as createVNode, ax as QCardSection, az as QCardActions, a6 as QBtn, a7 as createTextVNode, aA as QCard, ay as createBaseVNode } from "./index.9dd312cd.js";
import { Q as QPage } from "./QPage.1ab9179f.js";
const _sfc_main = {};
const _hoisted_1 = /* @__PURE__ */ createBaseVNode("div", { class: "absolute-bottom" }, [
  /* @__PURE__ */ createBaseVNode("div", { class: "text-h6" }, "Willkommen bei REVIVAL")
], -1);
const _hoisted_2 = /* @__PURE__ */ createBaseVNode("div", null, " Vielen Dank f\xFCr Ihr Interesse! Sie haben nun die M\xF6glichkeit unsere komplette Web-App mit dem originalen Fragebogen zu testen. ", -1);
function _sfc_render(_ctx, _cache) {
  return openBlock(), createBlock(QPage, null, {
    default: withCtx(() => [
      createVNode(QCard, { class: "q-mt-sm" }, {
        default: withCtx(() => [
          createVNode(QImg, { src: "/images/1 nSqr-piDM2QmdAWzGI0DuA.png" }, {
            default: withCtx(() => [
              _hoisted_1
            ]),
            _: 1
          }),
          createVNode(QCardSection, null, {
            default: withCtx(() => [
              _hoisted_2
            ]),
            _: 1
          }),
          createVNode(QCardActions, null, {
            default: withCtx(() => [
              createVNode(QBtn, {
                to: "/",
                color: "primary"
              }, {
                default: withCtx(() => [
                  createTextVNode("Hier klicken")
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
var FeedbackPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { FeedbackPage as default };
