import { m as createComponent, c as computed, h, a1 as hMergeSlot, r as ref, o as onMounted, a3 as openBlock, aD as createElementBlock, k as createVNode, a5 as withCtx, ax as QCardSection, ay as createBaseVNode, a8 as toDisplayString, a4 as createBlock, ac as createCommentVNode, F as Fragment, aE as renderList, aF as normalizeClass, aG as QRadio, aa as QSeparator, aA as QCard, aH as watchEffect, ab as unref, a7 as createTextVNode, a6 as QBtn, az as QCardActions, S as withDirectives, aI as QDialog } from "./index.73cef502.js";
import { Q as QLinearProgress } from "./QLinearProgress.d9a74b6a.js";
import { Q as QPage } from "./QPage.50568207.js";
import { C as ClosePopup } from "./ClosePopup.297595e0.js";
import { L as LoginCard } from "./LoginCard.93cb8021.js";
import { fhir } from "./midataService.acf51e2d.js";
import { d as dist } from "./index.a52644ac.js";
import { u as useI18n } from "./vue-i18n.5d120c42.js";
import { u as userStore } from "./store.342a5c83.js";
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
const _hoisted_6 = { class: "text-subtitle1 text-weight-bold" };
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
    const confirm = ref(false);
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
                label: _ctx.$t("completeQuestionnaire"),
                color: "green-5",
                onClick: _cache[2] || (_cache[2] = ($event) => confirm.value = true)
              }, null, 8, ["label"])) : createCommentVNode("", true),
              createVNode(QDialog, {
                modelValue: confirm.value,
                "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => confirm.value = $event),
                persistent: ""
              }, {
                default: withCtx(() => [
                  createVNode(QCard, null, {
                    default: withCtx(() => [
                      createVNode(QCardSection, { class: "row items-center" }, {
                        default: withCtx(() => [
                          createBaseVNode("div", _hoisted_6, toDisplayString(_ctx.$t("confirmEnd")), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(QCardActions, { align: "right" }, {
                        default: withCtx(() => [
                          withDirectives(createVNode(QBtn, {
                            flat: "",
                            label: _ctx.$t("cancel"),
                            color: "primary"
                          }, null, 8, ["label"]), [
                            [ClosePopup]
                          ]),
                          withDirectives(createVNode(QBtn, {
                            label: _ctx.$t("send"),
                            color: "green",
                            onClick: _cache[3] || (_cache[3] = ($event) => unref(fhir).create(qData.value.getQuestionnaireResponse(language.value))),
                            to: "/complete"
                          }, null, 8, ["label"]), [
                            [ClosePopup]
                          ])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["modelValue"])
            ])
          ])) : createCommentVNode("", true)
        ]),
        _: 1
      });
    };
  }
};
export { _sfc_main as default };
