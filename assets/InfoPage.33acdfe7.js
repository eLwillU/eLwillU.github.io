import { Q as QCardSection, a as QCardActions, b as QCard, c as QPage } from "./QCardActions.111b08d6.js";
import { c as computed, r as ref, G as isRuntimeSsrPreHydration, o as onMounted, h, E as Transition, w as watch, g as getCurrentInstance, a2 as _export_sfc, W as openBlock, X as createBlock, Y as withCtx, k as createVNode, a3 as createBaseVNode, _ as toDisplayString, Z as createTextVNode } from "./index.06797750.js";
import { c as createComponent, h as hSlot, n as QSpinner, d as vmIsDestroyed, Q as QBtn } from "./QBtn.0ff5b315.js";
import { u as useTimeout } from "./use-timeout.e6247861.js";
import { fhir } from "./midataService.451e0f3a.js";
import "./use-dark.9ebbe6db.js";
import "./index.33e8d543.js";
const useRatioProps = {
  ratio: [String, Number]
};
function useRatio(props, naturalRatio) {
  return computed(() => {
    const ratio = Number(
      props.ratio || (naturalRatio !== void 0 ? naturalRatio.value : void 0)
    );
    return isNaN(ratio) !== true && ratio > 0 ? { paddingBottom: `${100 / ratio}%` } : null;
  });
}
const defaultRatio = 1.7778;
var QImg = createComponent({
  name: "QImg",
  props: {
    ...useRatioProps,
    src: String,
    srcset: String,
    sizes: String,
    alt: String,
    crossorigin: String,
    decoding: String,
    referrerpolicy: String,
    draggable: Boolean,
    loading: {
      type: String,
      default: "lazy"
    },
    loadingShowDelay: {
      type: [Number, String],
      default: 0
    },
    fetchpriority: {
      type: String,
      default: "auto"
    },
    width: String,
    height: String,
    initialRatio: {
      type: [Number, String],
      default: defaultRatio
    },
    placeholderSrc: String,
    errorSrc: String,
    fit: {
      type: String,
      default: "cover"
    },
    position: {
      type: String,
      default: "50% 50%"
    },
    imgClass: String,
    imgStyle: Object,
    noSpinner: Boolean,
    noNativeMenu: Boolean,
    noTransition: Boolean,
    spinnerColor: String,
    spinnerSize: String
  },
  emits: ["load", "error"],
  setup(props, { slots, emit }) {
    const naturalRatio = ref(props.initialRatio);
    const ratioStyle = useRatio(props, naturalRatio);
    const vm = getCurrentInstance();
    const { registerTimeout: registerLoadTimeout, removeTimeout: removeLoadTimeout } = useTimeout();
    const { registerTimeout: registerLoadShowTimeout, removeTimeout: removeLoadShowTimeout } = useTimeout();
    const placeholderImg = computed(() => props.placeholderSrc !== void 0 ? { src: props.placeholderSrc } : null);
    const errorImg = computed(() => props.errorSrc !== void 0 ? { src: props.errorSrc, __qerror: true } : null);
    const images = [
      ref(null),
      ref(placeholderImg.value)
    ];
    const position = ref(0);
    const isLoading = ref(false);
    const hasError = ref(false);
    const classes = computed(
      () => `q-img q-img--${props.noNativeMenu === true ? "no-" : ""}menu`
    );
    const style = computed(() => ({
      width: props.width,
      height: props.height
    }));
    const imgClass = computed(
      () => `q-img__image ${props.imgClass !== void 0 ? props.imgClass + " " : ""}q-img__image--with${props.noTransition === true ? "out" : ""}-transition q-img__image--`
    );
    const imgStyle = computed(() => ({
      ...props.imgStyle,
      objectFit: props.fit,
      objectPosition: props.position
    }));
    function setLoading() {
      removeLoadShowTimeout();
      if (props.loadingShowDelay === 0) {
        isLoading.value = true;
        return;
      }
      registerLoadShowTimeout(() => {
        isLoading.value = true;
      }, props.loadingShowDelay);
    }
    function clearLoading() {
      removeLoadShowTimeout();
      isLoading.value = false;
    }
    function onLoad({ target }) {
      if (vmIsDestroyed(vm) === false) {
        removeLoadTimeout();
        naturalRatio.value = target.naturalHeight === 0 ? 0.5 : target.naturalWidth / target.naturalHeight;
        waitForCompleteness(target, 1);
      }
    }
    function waitForCompleteness(target, count) {
      if (count === 1e3 || vmIsDestroyed(vm) === true)
        return;
      if (target.complete === true) {
        onReady(target);
      } else {
        registerLoadTimeout(() => {
          waitForCompleteness(target, count + 1);
        }, 50);
      }
    }
    function onReady(target) {
      if (vmIsDestroyed(vm) === true)
        return;
      position.value = position.value ^ 1;
      images[position.value].value = null;
      clearLoading();
      if (target.getAttribute("__qerror") !== "true") {
        hasError.value = false;
      }
      emit("load", target.currentSrc || target.src);
    }
    function onError(err) {
      removeLoadTimeout();
      clearLoading();
      hasError.value = true;
      images[position.value].value = errorImg.value;
      images[position.value ^ 1].value = placeholderImg.value;
      emit("error", err);
    }
    function getImage(index) {
      const img = images[index].value;
      const data = {
        key: "img_" + index,
        class: imgClass.value,
        style: imgStyle.value,
        alt: props.alt,
        crossorigin: props.crossorigin,
        decoding: props.decoding,
        referrerpolicy: props.referrerpolicy,
        height: props.height,
        width: props.width,
        loading: props.loading,
        fetchpriority: props.fetchpriority,
        "aria-hidden": "true",
        draggable: props.draggable,
        ...img
      };
      if (position.value === index) {
        Object.assign(data, {
          class: data.class + "current",
          onLoad,
          onError
        });
      } else {
        data.class += "loaded";
      }
      return h(
        "div",
        { class: "q-img__container absolute-full", key: "img" + index },
        h("img", data)
      );
    }
    function getContent() {
      if (isLoading.value === false) {
        return h("div", {
          key: "content",
          class: "q-img__content absolute-full q-anchor--skip"
        }, hSlot(slots[hasError.value === true ? "error" : "default"]));
      }
      return h("div", {
        key: "loading",
        class: "q-img__loading absolute-full flex flex-center"
      }, slots.loading !== void 0 ? slots.loading() : props.noSpinner === true ? void 0 : [
        h(QSpinner, {
          color: props.spinnerColor,
          size: props.spinnerSize
        })
      ]);
    }
    {
      let watchSrc = function() {
        watch(
          () => props.src || props.srcset || props.sizes ? {
            src: props.src,
            srcset: props.srcset,
            sizes: props.sizes
          } : null,
          (imgProps) => {
            removeLoadTimeout();
            hasError.value = false;
            if (imgProps === null) {
              clearLoading();
              images[position.value ^ 1].value = placeholderImg.value;
            } else {
              setLoading();
            }
            images[position.value].value = imgProps;
          },
          { immediate: true }
        );
      };
      if (isRuntimeSsrPreHydration.value === true) {
        onMounted(watchSrc);
      } else {
        watchSrc();
      }
    }
    return () => {
      const content = [];
      if (ratioStyle.value !== null) {
        content.push(
          h("div", { key: "filler", style: ratioStyle.value })
        );
      }
      if (images[0].value !== null) {
        content.push(
          getImage(0)
        );
      }
      if (images[1].value !== null) {
        content.push(
          getImage(1)
        );
      }
      content.push(
        h(Transition, { name: "q-transition--fade" }, getContent)
      );
      return h("div", {
        key: "main",
        class: classes.value,
        style: style.value,
        role: "img",
        "aria-label": props.alt
      }, content);
    };
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
    function login() {
      fhir.authenticate();
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
var InfoPage_vue_vue_type_style_index_0_lang = "";
const _hoisted_1 = {
  class: "text-subtitle1 text-weight-bold",
  id: "heading1"
};
const _hoisted_2 = { class: "text-subtitle1 text-weight-bold" };
const _hoisted_3 = { class: "text-subtitle1 text-weight-bold" };
const _hoisted_4 = { class: "text-subtitle1 text-weight-bold" };
const _hoisted_5 = { class: "text-subtitle1 text-weight-bold" };
const _hoisted_6 = { class: "text-subtitle1 text-weight-bold" };
const _hoisted_7 = { class: "" };
const _hoisted_8 = /* @__PURE__ */ createBaseVNode("div", { class: "row" }, [
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
const _hoisted_9 = { class: "text-weight-bold" };
const _hoisted_10 = {
  class: "text-h6",
  id: "heading2"
};
const _hoisted_11 = {
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
                createVNode(QCardSection, null, {
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_1, toDisplayString(_ctx.$t("interestedPersonF")) + ", " + toDisplayString(_ctx.$t("interestedPersonM")), 1),
                    createBaseVNode("div", null, toDisplayString(_ctx.$t("infoPageIntroText")), 1)
                  ]),
                  _: 1
                }),
                createVNode(QCardSection, null, {
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_2, toDisplayString(_ctx.$t("infoPageAimTitle")), 1),
                    createBaseVNode("div", null, toDisplayString(_ctx.$t("infoPageAimText")), 1)
                  ]),
                  _: 1
                }),
                createVNode(QCardSection, null, {
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_3, toDisplayString(_ctx.$t("infoPageThesisTitle")), 1),
                    createBaseVNode("div", null, toDisplayString(_ctx.$t("infoPageThesisText")), 1)
                  ]),
                  _: 1
                }),
                createVNode(QCardSection, null, {
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_4, toDisplayString(_ctx.$t("infoPageRoleTitle")), 1),
                    createBaseVNode("div", null, toDisplayString(_ctx.$t("infoPageRoleText")), 1)
                  ]),
                  _: 1
                }),
                createVNode(QCardSection, null, {
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_5, toDisplayString(_ctx.$t("infoPageToDoTitle")), 1),
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
                    createBaseVNode("div", _hoisted_6, toDisplayString(_ctx.$t("infoPageMoreTitle")), 1),
                    createBaseVNode("div", _hoisted_7, toDisplayString(_ctx.$t("infoPageMoreText")), 1),
                    _hoisted_8
                  ]),
                  _: 1
                }),
                createVNode(QCardSection, null, {
                  default: withCtx(() => [
                    createBaseVNode("div", null, [
                      createBaseVNode("div", _hoisted_9, toDisplayString(_ctx.$t("infoPageTogether")), 1),
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
                    createBaseVNode("div", _hoisted_10, toDisplayString(_ctx.$t("infoVideo")), 1)
                  ]),
                  _: 1
                }),
                createVNode(QCardSection)
              ]),
              _: 1
            }),
            createVNode(QCard, { class: "q-mb-sm" }, {
              default: withCtx(() => [
                createVNode(QCardSection, null, {
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_11, toDisplayString(_ctx.$t("moreInfo")), 1)
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
