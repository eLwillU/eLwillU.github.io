import { u as useRatioProps, a as useRatio, Q as QImg } from "./QImg.bb448ad1.js";
import { m as createComponent, c as computed, h, aw as _export_sfc, a3 as openBlock, a4 as createBlock, a5 as withCtx, k as createVNode, ax as QCardSection, ay as createBaseVNode, a8 as toDisplayString, az as QCardActions, a6 as QBtn, aA as QCard, a7 as createTextVNode } from "./index.9a05e29b.js";
import { Q as QPage } from "./QPage.e0b1ec6f.js";
import { fhir } from "./midataService.8c7a0c50.js";
import { u as userStore } from "./store.bd6b7a00.js";
import "./index.33e8d543.js";
var QVideo = createComponent({
  name: "QVideo",
  props: {
    ...useRatioProps,
    src: {
      type: String,
      required: true
    },
    title: String,
    fetchpriority: {
      type: String,
      default: "auto"
    },
    loading: {
      type: String,
      default: "eager"
    },
    referrerpolicy: {
      type: String,
      default: "strict-origin-when-cross-origin"
    }
  },
  setup(props) {
    const ratioStyle = useRatio(props);
    const classes = computed(
      () => "q-video" + (props.ratio !== void 0 ? " q-video--responsive" : "")
    );
    return () => h("div", {
      class: classes.value,
      style: ratioStyle.value
    }, [
      h("iframe", {
        src: props.src,
        title: props.title,
        fetchpriority: props.fetchpriority,
        loading: props.loading,
        referrerpolicy: props.referrerpolicy,
        frameborder: "0",
        allowfullscreen: true
      })
    ]);
  }
});
const _sfc_main$2 = {};
const _hoisted_1$1 = { class: "text-h6" };
function _sfc_render(_ctx, _cache) {
  return openBlock(), createBlock(QCard, { class: "my-card" }, {
    default: withCtx(() => [
      createVNode(QImg, {
        class: "card-image",
        src: "https://questionstar.de/wp-content/uploads/2020/06/fragebogen-img.jpg"
      }),
      createVNode(QCardSection, { class: "text-center" }, {
        default: withCtx(() => [
          createBaseVNode("div", _hoisted_1$1, toDisplayString(_ctx.$t("scapeQuestionnaireInfo")), 1),
          createVNode(QCardActions, { class: "text-center" }, {
            default: withCtx(() => [
              createVNode(QBtn, {
                flat: "",
                label: _ctx.$t("SCAPEReadMore"),
                color: "primary",
                href: "https://www.scape-enquete.ch/",
                target: "_blank"
              }, null, 8, ["label"])
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
var InformationCard = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render]]);
const _sfc_main$1 = {
  __name: "LoginButton",
  props: {
    buttonText: String
  },
  setup(__props) {
    const store = userStore();
    function login() {
      fhir.authenticate({ language: store.locale });
    }
    return (_ctx, _cache) => {
      return openBlock(), createBlock(QBtn, {
        onClick: login,
        color: "primary"
      }, {
        default: withCtx(() => [
          createTextVNode(toDisplayString(__props.buttonText), 1)
        ]),
        _: 1
      });
    };
  }
};
const _hoisted_1 = { class: "absolute-bottom text-center" };
const _hoisted_2 = {
  class: "text-subtitle1 text-weight-bold",
  id: "heading1"
};
const _hoisted_3 = { class: "text-subtitle1 text-weight-bold" };
const _hoisted_4 = { class: "text-subtitle1 text-weight-bold" };
const _hoisted_5 = { class: "text-subtitle1 text-weight-bold" };
const _hoisted_6 = { class: "text-subtitle1 text-weight-bold" };
const _hoisted_7 = { class: "text-subtitle1 text-weight-bold" };
const _hoisted_8 = { class: "" };
const _hoisted_9 = /* @__PURE__ */ createBaseVNode("div", { class: "row" }, [
  /* @__PURE__ */ createBaseVNode("div", { class: "q-mx-xl q-py-md text-weight-bold" }, [
    /* @__PURE__ */ createTextVNode(" Karin Kennel: "),
    /* @__PURE__ */ createBaseVNode("br"),
    /* @__PURE__ */ createBaseVNode("a", { href: "mailto:karin.kennel@students.bfh.ch" }, " karin.kennel@students.bfh.ch ")
  ]),
  /* @__PURE__ */ createBaseVNode("div", { class: "q-mx-xl q-py-md text-weight-bold" }, [
    /* @__PURE__ */ createTextVNode(" Dominic Willi: "),
    /* @__PURE__ */ createBaseVNode("br"),
    /* @__PURE__ */ createBaseVNode("a", { href: "mailto:dominic.willi@students.bfh.ch" }, "dominic.willi@students.bfh.ch")
  ])
], -1);
const _hoisted_10 = { class: "text-weight-bold" };
const _hoisted_11 = {
  class: "text-h6",
  id: "heading2"
};
const _hoisted_12 = {
  class: "text-h6",
  id: "heading3"
};
const _sfc_main = {
  __name: "InfoPage",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(QPage, { class: "q-pa-none" }, {
        default: withCtx(() => [
          createBaseVNode("div", null, [
            createVNode(QCard, { class: "q-mb-sm" }, {
              default: withCtx(() => [
                createVNode(QImg, { src: "https://cdn.prod.www.manager-magazin.de/images/e762e9b2-669c-40fc-a4df-dc28ba89c20b_w960_r1.778_fpx55_fpy59.jpg" }, {
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_1, toDisplayString(_ctx.$t("infoCaption")), 1)
                  ]),
                  _: 1
                }),
                createVNode(QCardSection, null, {
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_2, toDisplayString(_ctx.$t("interestedPersonF")) + ", " + toDisplayString(_ctx.$t("interestedPersonM")), 1),
                    createBaseVNode("div", null, toDisplayString(_ctx.$t("infoPageIntroText")), 1)
                  ]),
                  _: 1
                }),
                createVNode(QCardSection, null, {
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_3, toDisplayString(_ctx.$t("infoPageAimTitle")), 1),
                    createBaseVNode("div", null, toDisplayString(_ctx.$t("infoPageAimText")), 1)
                  ]),
                  _: 1
                }),
                createVNode(QCardSection, null, {
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_4, toDisplayString(_ctx.$t("infoPageThesisTitle")), 1),
                    createBaseVNode("div", null, toDisplayString(_ctx.$t("infoPageThesisText")), 1)
                  ]),
                  _: 1
                }),
                createVNode(QCardSection, null, {
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_5, toDisplayString(_ctx.$t("infoPageRoleTitle")), 1),
                    createBaseVNode("div", null, toDisplayString(_ctx.$t("infoPageRoleText")), 1)
                  ]),
                  _: 1
                }),
                createVNode(QCardSection, null, {
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_6, toDisplayString(_ctx.$t("infoPageToDoTitle")), 1),
                    createBaseVNode("div", null, toDisplayString(_ctx.$t("infoPageToDoText")), 1)
                  ]),
                  _: 1
                }),
                createVNode(QCardSection, null, {
                  default: withCtx(() => [
                    createVNode(_sfc_main$1, {
                      "button-text": _ctx.$t("registerNowButton")
                    }, null, 8, ["button-text"])
                  ]),
                  _: 1
                }),
                createVNode(QCardSection, null, {
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_7, toDisplayString(_ctx.$t("infoPageMoreTitle")), 1),
                    createBaseVNode("div", _hoisted_8, toDisplayString(_ctx.$t("infoPageMoreText")), 1),
                    _hoisted_9
                  ]),
                  _: 1
                }),
                createVNode(QCardSection, null, {
                  default: withCtx(() => [
                    createBaseVNode("div", null, [
                      createBaseVNode("div", _hoisted_10, toDisplayString(_ctx.$t("infoPageTogether")), 1),
                      createBaseVNode("div", null, toDisplayString(_ctx.$t("infoPageGreeting")), 1)
                    ])
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }),
            createVNode(QCard, { class: "q-mb-sm" }, {
              default: withCtx(() => [
                createVNode(QCardSection, null, {
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_11, toDisplayString(_ctx.$t("infoVideo")), 1)
                  ]),
                  _: 1
                }),
                createVNode(QCardSection, null, {
                  default: withCtx(() => [
                    createVNode(QVideo, {
                      src: "https://www.youtube.com/embed/qj8r_7lH76c?si=ufz14iosaoqJvF8z",
                      ratio: 16 / 9
                    })
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }),
            createVNode(QCard, { class: "q-mb-sm" }, {
              default: withCtx(() => [
                createVNode(QCardSection, null, {
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_12, toDisplayString(_ctx.$t("moreInfo")), 1)
                  ]),
                  _: 1
                }),
                createVNode(QCardSection, null, {
                  default: withCtx(() => [
                    createVNode(InformationCard)
                  ]),
                  _: 1
                })
              ]),
              _: 1
            })
          ])
        ]),
        _: 1
      });
    };
  }
};
export { _sfc_main as default };
