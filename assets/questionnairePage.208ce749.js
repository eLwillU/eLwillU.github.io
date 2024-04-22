import { c as createComponent, l as hMergeSlot, q as useSizeProps, r as useSize, m as QIcon, h as hSlot, Q as QBtn } from "./QBtn.cf6b9e42.js";
import { c as computed, h, g as getCurrentInstance, r as ref, a4 as toRaw, n as stopAndPrevent, o as onMounted, W as openBlock, a5 as createElementBlock, k as createVNode, Y as withCtx, a3 as createBaseVNode, _ as toDisplayString, X as createBlock, a0 as createCommentVNode, F as Fragment, a6 as renderList, a7 as normalizeClass, a8 as watchEffect, $ as unref, Z as createTextVNode } from "./index.2757f978.js";
import { u as useDarkProps, a as useDark } from "./use-dark.e84386eb.js";
import { Q as QCardSection, b as QCard, c as QPage } from "./QCardActions.5945d52d.js";
import { L as LoginCard } from "./LoginCard.21dc16b2.js";
import { fhir } from "./midataService.451e0f3a.js";
import { u as userStore, d as dist } from "./store.4259410a.js";
import { u as useI18n } from "./vue-i18n.b317b62a.js";
import { Q as QSeparator } from "./QSeparator.805ab0b9.js";
import "./index.33e8d543.js";
const alignValues = ["top", "middle", "bottom"];
var QBadge = createComponent({
  name: "QBadge",
  props: {
    color: String,
    textColor: String,
    floating: Boolean,
    transparent: Boolean,
    multiLine: Boolean,
    outline: Boolean,
    rounded: Boolean,
    label: [Number, String],
    align: {
      type: String,
      validator: (v) => alignValues.includes(v)
    }
  },
  setup(props, { slots }) {
    const style = computed(() => {
      return props.align !== void 0 ? { verticalAlign: props.align } : null;
    });
    const classes = computed(() => {
      const text = props.outline === true ? props.color || props.textColor : props.textColor;
      return `q-badge flex inline items-center no-wrap q-badge--${props.multiLine === true ? "multi" : "single"}-line` + (props.outline === true ? " q-badge--outline" : props.color !== void 0 ? ` bg-${props.color}` : "") + (text !== void 0 ? ` text-${text}` : "") + (props.floating === true ? " q-badge--floating" : "") + (props.rounded === true ? " q-badge--rounded" : "") + (props.transparent === true ? " q-badge--transparent" : "");
    });
    return () => h("div", {
      class: classes.value,
      style: style.value,
      role: "status",
      "aria-label": props.label
    }, hMergeSlot(slots.default, props.label !== void 0 ? [props.label] : []));
  }
});
const defaultSizes = {
  xs: 2,
  sm: 4,
  md: 6,
  lg: 10,
  xl: 14
};
function width(val, reverse, $q) {
  return {
    transform: reverse === true ? `translateX(${$q.lang.rtl === true ? "-" : ""}100%) scale3d(${-val},1,1)` : `scale3d(${val},1,1)`
  };
}
var QLinearProgress = createComponent({
  name: "QLinearProgress",
  props: {
    ...useDarkProps,
    ...useSizeProps,
    value: {
      type: Number,
      default: 0
    },
    buffer: Number,
    color: String,
    trackColor: String,
    reverse: Boolean,
    stripe: Boolean,
    indeterminate: Boolean,
    query: Boolean,
    rounded: Boolean,
    animationSpeed: {
      type: [String, Number],
      default: 2100
    },
    instantFeedback: Boolean
  },
  setup(props, { slots }) {
    const { proxy } = getCurrentInstance();
    const isDark = useDark(props, proxy.$q);
    const sizeStyle = useSize(props, defaultSizes);
    const motion = computed(() => props.indeterminate === true || props.query === true);
    const widthReverse = computed(() => props.reverse !== props.query);
    const style = computed(() => ({
      ...sizeStyle.value !== null ? sizeStyle.value : {},
      "--q-linear-progress-speed": `${props.animationSpeed}ms`
    }));
    const classes = computed(
      () => "q-linear-progress" + (props.color !== void 0 ? ` text-${props.color}` : "") + (props.reverse === true || props.query === true ? " q-linear-progress--reverse" : "") + (props.rounded === true ? " rounded-borders" : "")
    );
    const trackStyle = computed(() => width(props.buffer !== void 0 ? props.buffer : 1, widthReverse.value, proxy.$q));
    const transitionSuffix = computed(() => `with${props.instantFeedback === true ? "out" : ""}-transition`);
    const trackClass = computed(
      () => `q-linear-progress__track absolute-full q-linear-progress__track--${transitionSuffix.value} q-linear-progress__track--${isDark.value === true ? "dark" : "light"}` + (props.trackColor !== void 0 ? ` bg-${props.trackColor}` : "")
    );
    const modelStyle = computed(() => width(motion.value === true ? 1 : props.value, widthReverse.value, proxy.$q));
    const modelClass = computed(
      () => `q-linear-progress__model absolute-full q-linear-progress__model--${transitionSuffix.value} q-linear-progress__model--${motion.value === true ? "in" : ""}determinate`
    );
    const stripeStyle = computed(() => ({ width: `${props.value * 100}%` }));
    const stripeClass = computed(
      () => `q-linear-progress__stripe absolute-${props.reverse === true ? "right" : "left"} q-linear-progress__stripe--${transitionSuffix.value}`
    );
    return () => {
      const child = [
        h("div", {
          class: trackClass.value,
          style: trackStyle.value
        }),
        h("div", {
          class: modelClass.value,
          style: modelStyle.value
        })
      ];
      props.stripe === true && motion.value === false && child.push(
        h("div", {
          class: stripeClass.value,
          style: stripeStyle.value
        })
      );
      return h("div", {
        class: classes.value,
        style: style.value,
        role: "progressbar",
        "aria-valuemin": 0,
        "aria-valuemax": 1,
        "aria-valuenow": props.indeterminate === true ? void 0 : props.value
      }, hMergeSlot(slots.default, child));
    };
  }
});
function useRefocusTarget(props, rootRef) {
  const refocusRef = ref(null);
  const refocusTargetEl = computed(() => {
    if (props.disable === true) {
      return null;
    }
    return h("span", {
      ref: refocusRef,
      class: "no-outline",
      tabindex: -1
    });
  });
  function refocusTarget(e) {
    const root = rootRef.value;
    if (e !== void 0 && e.type.indexOf("key") === 0) {
      if (root !== null && document.activeElement !== root && root.contains(document.activeElement) === true) {
        root.focus();
      }
    } else if (refocusRef.value !== null && (e === void 0 || root !== null && root.contains(e.target) === true)) {
      refocusRef.value.focus();
    }
  }
  return {
    refocusTargetEl,
    refocusTarget
  };
}
const useFormProps = {
  name: String
};
function useFormInject(formAttrs = {}) {
  return (child, action, className) => {
    child[action](
      h("input", {
        class: "hidden" + (className || ""),
        ...formAttrs.value
      })
    );
  };
}
var optionSizes = {
  xs: 30,
  sm: 35,
  md: 40,
  lg: 50,
  xl: 60
};
const svg = h("svg", {
  key: "svg",
  class: "q-radio__bg absolute non-selectable",
  viewBox: "0 0 24 24"
}, [
  h("path", {
    d: "M12,22a10,10 0 0 1 -10,-10a10,10 0 0 1 10,-10a10,10 0 0 1 10,10a10,10 0 0 1 -10,10m0,-22a12,12 0 0 0 -12,12a12,12 0 0 0 12,12a12,12 0 0 0 12,-12a12,12 0 0 0 -12,-12"
  }),
  h("path", {
    class: "q-radio__check",
    d: "M12,6a6,6 0 0 0 -6,6a6,6 0 0 0 6,6a6,6 0 0 0 6,-6a6,6 0 0 0 -6,-6"
  })
]);
var QRadio = createComponent({
  name: "QRadio",
  props: {
    ...useDarkProps,
    ...useSizeProps,
    ...useFormProps,
    modelValue: { required: true },
    val: { required: true },
    label: String,
    leftLabel: Boolean,
    checkedIcon: String,
    uncheckedIcon: String,
    color: String,
    keepColor: Boolean,
    dense: Boolean,
    disable: Boolean,
    tabindex: [String, Number]
  },
  emits: ["update:modelValue"],
  setup(props, { slots, emit }) {
    const { proxy } = getCurrentInstance();
    const isDark = useDark(props, proxy.$q);
    const sizeStyle = useSize(props, optionSizes);
    const rootRef = ref(null);
    const { refocusTargetEl, refocusTarget } = useRefocusTarget(props, rootRef);
    const isTrue = computed(() => toRaw(props.modelValue) === toRaw(props.val));
    const classes = computed(
      () => "q-radio cursor-pointer no-outline row inline no-wrap items-center" + (props.disable === true ? " disabled" : "") + (isDark.value === true ? " q-radio--dark" : "") + (props.dense === true ? " q-radio--dense" : "") + (props.leftLabel === true ? " reverse" : "")
    );
    const innerClass = computed(() => {
      const color = props.color !== void 0 && (props.keepColor === true || isTrue.value === true) ? ` text-${props.color}` : "";
      return `q-radio__inner relative-position q-radio__inner--${isTrue.value === true ? "truthy" : "falsy"}${color}`;
    });
    const icon = computed(
      () => (isTrue.value === true ? props.checkedIcon : props.uncheckedIcon) || null
    );
    const tabindex = computed(() => props.disable === true ? -1 : props.tabindex || 0);
    const formAttrs = computed(() => {
      const prop = { type: "radio" };
      props.name !== void 0 && Object.assign(prop, {
        ".checked": isTrue.value === true,
        "^checked": isTrue.value === true ? "checked" : void 0,
        name: props.name,
        value: props.val
      });
      return prop;
    });
    const injectFormInput = useFormInject(formAttrs);
    function onClick(e) {
      if (e !== void 0) {
        stopAndPrevent(e);
        refocusTarget(e);
      }
      if (props.disable !== true && isTrue.value !== true) {
        emit("update:modelValue", props.val, e);
      }
    }
    function onKeydown(e) {
      if (e.keyCode === 13 || e.keyCode === 32) {
        stopAndPrevent(e);
      }
    }
    function onKeyup(e) {
      if (e.keyCode === 13 || e.keyCode === 32) {
        onClick(e);
      }
    }
    Object.assign(proxy, { set: onClick });
    return () => {
      const content = icon.value !== null ? [
        h("div", {
          key: "icon",
          class: "q-radio__icon-container absolute-full flex flex-center no-wrap"
        }, [
          h(QIcon, {
            class: "q-radio__icon",
            name: icon.value
          })
        ])
      ] : [svg];
      props.disable !== true && injectFormInput(
        content,
        "unshift",
        " q-radio__native q-ma-none q-pa-none"
      );
      const child = [
        h("div", {
          class: innerClass.value,
          style: sizeStyle.value,
          "aria-hidden": "true"
        }, content)
      ];
      if (refocusTargetEl.value !== null) {
        child.push(refocusTargetEl.value);
      }
      const label = props.label !== void 0 ? hMergeSlot(slots.default, [props.label]) : hSlot(slots.default);
      label !== void 0 && child.push(
        h("div", {
          class: "q-radio__label q-anchor--skip"
        }, label)
      );
      return h("div", {
        ref: rootRef,
        class: classes.value,
        tabindex: tabindex.value,
        role: "radio",
        "aria-label": props.label,
        "aria-checked": isTrue.value === true ? "true" : "false",
        "aria-disabled": props.disable === true ? "true" : void 0,
        onClick,
        onKeydown,
        onKeyup
      }, child);
    };
  }
});
var QuestionCard_vue_vue_type_style_index_0_lang = "";
const _hoisted_1$1 = { class: "q-pa-sm" };
const _hoisted_2$1 = { class: "text-body2 text-weight-medium text-justify" };
const _hoisted_3$1 = /* @__PURE__ */ createBaseVNode("div", { class: "text-red text-weight-bold" }, " W\xE4hlen Sie eine Antwort aus... ", -1);
const _hoisted_4$1 = { class: "q-py-sm" };
const userSelectedAnswer = true;
const _sfc_main$1 = {
  __name: "QuestionCard",
  props: {
    question: Object,
    language: String,
    qDataObject: Object,
    error: Boolean
  },
  emits: ["answer-selected"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const selectedAnswers = ref([]);
    onMounted(() => {
      var _a, _b;
      selectedAnswers.value = props.question.selectedAnswers;
      if (props.question.selectedAnswers[0]) {
        const code = (_b = (_a = selectedAnswers.value[0]) == null ? void 0 : _a.valueCoding) == null ? void 0 : _b.code;
        selectedAnswers.value = props.question.answerOptions[code];
        handleAnswerSelected(selectedAnswers.value);
      }
    });
    function handleAnswerSelected(selectedAnswer) {
      emit("answer-selected", {
        question: props.question,
        selectedAnswer,
        userSelectedAnswer
      });
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$1, [
        createVNode(QCard, {
          flat: "",
          bordered: "",
          class: normalizeClass({
            "bg-grey-1": !__props.error,
            "bg-red-1": __props.error,
            error: __props.error
          })
        }, {
          default: withCtx(() => [
            createVNode(QCardSection, null, {
              default: withCtx(() => [
                createBaseVNode("div", _hoisted_2$1, toDisplayString(__props.question.id) + ". " + toDisplayString(__props.question.label[__props.language]), 1)
              ]),
              _: 1
            }),
            __props.error ? (openBlock(), createBlock(QCardSection, { key: 0 }, {
              default: withCtx(() => [
                _hoisted_3$1
              ]),
              _: 1
            })) : createCommentVNode("", true),
            createVNode(QCardSection, null, {
              default: withCtx(() => [
                (openBlock(true), createElementBlock(Fragment, null, renderList(__props.question.answerOptions, (answerOption, index) => {
                  return openBlock(), createElementBlock("div", {
                    key: answerOption.code,
                    class: normalizeClass({ "q-py-xs": _ctx.$q.screen.sm })
                  }, [
                    createVNode(QRadio, {
                      label: answerOption.answer[__props.language],
                      val: answerOption,
                      modelValue: selectedAnswers.value,
                      "onUpdate:modelValue": [
                        _cache[0] || (_cache[0] = ($event) => selectedAnswers.value = $event),
                        _cache[1] || (_cache[1] = ($event) => handleAnswerSelected(selectedAnswers.value))
                      ]
                    }, null, 8, ["label", "val", "modelValue"]),
                    createBaseVNode("div", _hoisted_4$1, [
                      index < __props.question.answerOptions.length - 1 ? (openBlock(), createBlock(QSeparator, { key: 0 })) : createCommentVNode("", true)
                    ])
                  ], 2);
                }), 128))
              ]),
              _: 1
            })
          ]),
          _: 1
        }, 8, ["class"])
      ]);
    };
  }
};
const _hoisted_1 = { key: 0 };
const _hoisted_2 = { key: 1 };
const _hoisted_3 = { class: "q-px-sm" };
const _hoisted_4 = { class: "absolute-full flex flex-center" };
const _hoisted_5 = { class: "row justify-between q-px-sm" };
const _sfc_main = {
  __name: "questionnairePage",
  setup(__props) {
    const store = userStore();
    const { locale } = useI18n();
    const language = ref("");
    const isDataFetched = ref(false);
    const data = ref("");
    const qData = ref("");
    const midataLoginStatus = ref(false);
    const existingQdata = ref(false);
    fhir.handleAuthResponse().then((res) => {
      midataLoginStatus.value = true;
      if (res) {
        res.refresh_token;
      }
    }).catch((err) => {
      console.log(err);
    });
    const currentPage = ref(store.currentPage);
    const numPages = ref(0);
    const progress = ref(0);
    const tempBoolean = ref(false);
    const error = ref(false);
    function nextPage() {
      if (!tempBoolean.value) {
        error.value = true;
      } else {
        if (currentPage.value < numPages.value) {
          currentPage.value++;
          store.currentPage++;
          progress.value = currentPage.value / numPages.value;
          tempBoolean.value = false;
          error.value = false;
        }
      }
    }
    function previousPage() {
      if (currentPage.value > 1) {
        currentPage.value--;
        store.currentPage--;
        progress.value = currentPage.value / numPages.value;
      }
    }
    async function fetchData() {
      try {
        data.value = await fhir.search(
          "Questionnaire",
          "url=http://www.krebsliga.ch/prem/SCAPE-CH"
        );
        const resource = data.value.entry[0].resource;
        qData.value = new dist.QuestionnaireData(resource, ["de", "fr"]);
        numPages.value = qData.value.getQuestions().length;
        isDataFetched.value = true;
        const step = 1 / numPages.value;
        progress.value = step;
      } catch (error2) {
        console.error("Error fetching JSON:", error2);
      }
    }
    watchEffect(() => {
      if (midataLoginStatus.value && !existingQdata.value) {
        fetchData();
      }
    });
    watchEffect(() => {
      language.value = locale.value.split("-")[0];
    });
    function handleAnswerSelected({
      question,
      selectedAnswer,
      userSelectedAnswer: userSelectedAnswer2
    }) {
      qData.value.updateQuestionAnswers(question, selectedAnswer);
      userStore.questionnaireResponse = qData.value;
      tempBoolean.value = true;
      if (error.value) {
        error.value = false;
      }
    }
    onMounted(() => {
      const storedQuestionnaireData = userStore.questionnaireResponse;
      if (storedQuestionnaireData) {
        isDataFetched.value = true;
        qData.value = storedQuestionnaireData;
        existingQdata.value = true;
        numPages.value = qData.value.getQuestions().length;
        progress.value = currentPage.value / numPages.value;
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(QPage, null, {
        default: withCtx(() => [
          !unref(fhir).isLoggedIn() ? (openBlock(), createElementBlock("div", _hoisted_1, [
            createVNode(LoginCard)
          ])) : createCommentVNode("", true),
          isDataFetched.value ? (openBlock(), createElementBlock("div", _hoisted_2, [
            createBaseVNode("div", _hoisted_3, [
              createVNode(QLinearProgress, {
                value: progress.value,
                class: "q-mt-sm",
                size: "25px",
                color: "grey-7",
                rounded: ""
              }, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_4, [
                    createVNode(QBadge, null, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(_ctx.$t("question")) + " " + toDisplayString(currentPage.value) + " " + toDisplayString(_ctx.$t("from")) + " " + toDisplayString(numPages.value), 1)
                      ]),
                      _: 1
                    })
                  ])
                ]),
                _: 1
              }, 8, ["value"])
            ]),
            (openBlock(), createBlock(_sfc_main$1, {
              key: currentPage.value - 1,
              question: qData.value.getQuestions()[currentPage.value - 1],
              language: language.value,
              qDataObject: qData.value,
              error: error.value,
              selectedAnswers: qData.value.getQuestions()[currentPage.value - 1].selectedAnswers[0],
              onAnswerSelected: handleAnswerSelected
            }, null, 8, ["question", "language", "qDataObject", "error", "selectedAnswers"])),
            createBaseVNode("div", _hoisted_5, [
              createVNode(QBtn, {
                onClick: _cache[0] || (_cache[0] = ($event) => previousPage()),
                color: "primary",
                disable: currentPage.value === 1
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(_ctx.$t("back")), 1)
                ]),
                _: 1
              }, 8, ["disable"]),
              numPages.value !== currentPage.value ? (openBlock(), createBlock(QBtn, {
                key: 0,
                onClick: _cache[1] || (_cache[1] = ($event) => nextPage()),
                color: "primary",
                disable: error.value
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(_ctx.$t("next")), 1)
                ]),
                _: 1
              }, 8, ["disable"])) : createCommentVNode("", true),
              numPages.value === currentPage.value ? (openBlock(), createBlock(QBtn, {
                key: 1,
                to: "/complete",
                onClick: _cache[2] || (_cache[2] = ($event) => unref(fhir).create(qData.value.getQuestionnaireResponse(language.value))),
                color: "green-5"
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(_ctx.$t("completeQuestionnaire")), 1)
                ]),
                _: 1
              })) : createCommentVNode("", true)
            ])
          ])) : createCommentVNode("", true)
        ]),
        _: 1
      });
    };
  }
};
export { _sfc_main as default };
