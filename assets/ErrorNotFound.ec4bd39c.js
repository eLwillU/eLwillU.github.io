import { ay as _export_sfc, d as defineComponent, ak as openBlock, aF as createElementBlock, aA as createBaseVNode, ap as toDisplayString, k as createVNode, an as QBtn } from "./index.c685f0e7.js";
const _sfc_main = defineComponent({
  name: "ErrorNotFound"
});
const _hoisted_1 = { class: "fullscreen bg-blue text-white text-center q-pa-md flex flex-center" };
const _hoisted_2 = /* @__PURE__ */ createBaseVNode("div", { style: { "font-size": "30vh" } }, "404", -1);
const _hoisted_3 = {
  class: "text-h2",
  style: { "opacity": "0.4" }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1, [
    createBaseVNode("div", null, [
      _hoisted_2,
      createBaseVNode("div", _hoisted_3, toDisplayString(_ctx.$t("errorPage")), 1),
      createVNode(QBtn, {
        class: "q-mt-xl",
        color: "white",
        "text-color": "blue",
        unelevated: "",
        to: "/",
        label: "Go Home",
        "no-caps": ""
      })
    ])
  ]);
}
var ErrorNotFound = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { ErrorNotFound as default };
