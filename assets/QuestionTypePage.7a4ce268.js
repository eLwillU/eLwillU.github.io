import { r as ref, o as onMounted, a2 as resolveComponent, a3 as openBlock, a4 as createBlock, a5 as withCtx, ax as QCardSection, aF as normalizeClass, a7 as createTextVNode, a8 as toDisplayString, ac as createCommentVNode, aD as createElementBlock, F as Fragment, k as createVNode, ba as QInput, aE as renderList, aG as QRadio, b8 as QCheckbox, aA as QCard, a6 as QBtn } from "./index.2bb0558a.js";
import { d as dist } from "./index.a52644ac.js";
import "./index.33e8d543.js";
const questionTitleStyle = "text-body2 text-weight-medium text-justify";
const _sfc_main$1 = {
  __name: "QuestionComponent",
  props: {
    question: Object,
    qData: Object
  },
  setup(__props) {
    const dataReady = ref(false);
    const selectedAnswer = ref();
    const selectedAnswers = ref([]);
    const stringAnswer = ref("");
    const error = ref(false);
    const q = ref();
    const props = __props;
    onMounted(() => {
      q.value = props.question;
      dataReady.value = true;
    });
    function updateAnswers(question, answer) {
      props.qData.updateQuestionAnswers(question, selectedAnswer.value);
    }
    return (_ctx, _cache) => {
      const _component_QuestionComponent = resolveComponent("QuestionComponent", true);
      return dataReady.value && props.question.isEnabled ? (openBlock(), createBlock(QCard, {
        key: 0,
        class: normalizeClass(["q-ma-sm", {
          "bg-grey-1": !error.value,
          "bg-red-1": error.value,
          error: error.value
        }]),
        flat: "",
        bordered: ""
      }, {
        default: withCtx(() => [
          q.value.type === "display" ? (openBlock(), createBlock(QCardSection, {
            key: 0,
            class: normalizeClass(questionTitleStyle)
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(q.value.prefix) + ". " + toDisplayString(q.value.label["de"]), 1)
            ]),
            _: 1
          })) : createCommentVNode("", true),
          q.value.type === "group" ? (openBlock(), createBlock(QCardSection, {
            key: 1,
            class: normalizeClass(questionTitleStyle)
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(q.value.prefix) + ". " + toDisplayString(q.value.label["de"]), 1)
            ]),
            _: 1
          })) : createCommentVNode("", true),
          q.value.type === "string" ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
            createVNode(QCardSection, {
              class: normalizeClass(questionTitleStyle)
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(q.value.prefix) + ". " + toDisplayString(q.value.label["de"]), 1)
              ]),
              _: 1
            }),
            createVNode(QCardSection, null, {
              default: withCtx(() => [
                createVNode(QInput, {
                  modelValue: stringAnswer.value,
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => stringAnswer.value = $event),
                  outlined: "",
                  placeholder: "Ihre Antwort"
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            })
          ], 64)) : createCommentVNode("", true),
          q.value.type === "integer" ? (openBlock(), createElementBlock(Fragment, { key: 3 }, [
            createVNode(QCardSection, {
              class: normalizeClass(questionTitleStyle)
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(q.value.prefix) + ". " + toDisplayString(q.value.label["de"]), 1)
              ]),
              _: 1
            }),
            createVNode(QCardSection, null, {
              default: withCtx(() => [
                createVNode(QInput, {
                  modelValue: stringAnswer.value,
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => stringAnswer.value = $event),
                  type: "number",
                  outlined: "",
                  placeholder: "Ihre Antwort"
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            })
          ], 64)) : createCommentVNode("", true),
          q.value.type === "choice" ? (openBlock(), createElementBlock(Fragment, { key: 4 }, [
            createVNode(QCardSection, {
              class: normalizeClass(questionTitleStyle)
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(q.value.prefix) + ". " + toDisplayString(q.value.label["de"]), 1)
              ]),
              _: 1
            }),
            createVNode(QCardSection, null, {
              default: withCtx(() => [
                (openBlock(true), createElementBlock(Fragment, null, renderList(q.value.answerOptions, (answer) => {
                  return openBlock(), createElementBlock("div", {
                    key: q.value.id + "-" + answer.code
                  }, [
                    !q.value.allowsMultipleAnswers ? (openBlock(), createBlock(QRadio, {
                      key: 0,
                      modelValue: selectedAnswer.value,
                      "onUpdate:modelValue": [
                        _cache[2] || (_cache[2] = ($event) => selectedAnswer.value = $event),
                        () => updateAnswers(props.question, answer)
                      ],
                      label: answer.answer["de"],
                      val: answer
                    }, null, 8, ["modelValue", "label", "val", "onUpdate:modelValue"])) : createCommentVNode("", true),
                    q.value.allowsMultipleAnswers ? (openBlock(), createBlock(QCheckbox, {
                      key: 1,
                      onAnswer: props.qData.updateQuestionAnswers.bind(__props.qData),
                      modelValue: selectedAnswers.value,
                      "onUpdate:modelValue": [
                        _cache[3] || (_cache[3] = ($event) => selectedAnswers.value = $event),
                        () => updateAnswers(props.question, answer)
                      ],
                      label: answer.answer["de"],
                      val: answer
                    }, null, 8, ["onAnswer", "modelValue", "label", "val", "onUpdate:modelValue"])) : createCommentVNode("", true)
                  ]);
                }), 128))
              ]),
              _: 1
            })
          ], 64)) : createCommentVNode("", true),
          (openBlock(true), createElementBlock(Fragment, null, renderList(q.value.subItems, (qSub) => {
            return openBlock(), createBlock(QCardSection, {
              key: qSub.id
            }, {
              default: withCtx(() => [
                createVNode(_component_QuestionComponent, {
                  qData: props.qData,
                  question: qSub
                }, null, 8, ["qData", "question"])
              ]),
              _: 2
            }, 1024);
          }), 128))
        ]),
        _: 1
      }, 8, ["class"])) : createCommentVNode("", true);
    };
  }
};
const _hoisted_1 = { key: 0 };
const _sfc_main = {
  __name: "QuestionTypePage",
  setup(__props) {
    const qData = ref();
    const dataReady = ref(false);
    ref("");
    ref([]);
    ref("");
    fetch("questionnaire/scape_complete.json").then((response) => response.json()).then((res) => {
      qData.value = new dist.QuestionnaireData(res, ["de"]);
      dataReady.value = true;
    }).catch((error) => {
      console.error("Error loading the JSON file:", error);
    });
    return (_ctx, _cache) => {
      return dataReady.value ? (openBlock(), createElementBlock("div", _hoisted_1, [
        createVNode(QCard, null, {
          default: withCtx(() => [
            createVNode(QCardSection, null, {
              default: withCtx(() => [
                (openBlock(true), createElementBlock(Fragment, null, renderList(qData.value.getQuestions(), (q) => {
                  return openBlock(), createElementBlock("div", {
                    key: q.id
                  }, [
                    createVNode(_sfc_main$1, {
                      qData: qData.value,
                      question: q
                    }, null, 8, ["qData", "question"])
                  ]);
                }), 128))
              ]),
              _: 1
            })
          ]),
          _: 1
        }),
        createVNode(QBtn, {
          onClick: _cache[0] || (_cache[0] = ($event) => console.log(qData.value.getQuestionnaireResponse("de")))
        }, {
          default: withCtx(() => [
            createTextVNode("Log Response")
          ]),
          _: 1
        })
      ])) : createCommentVNode("", true);
    };
  }
};
export { _sfc_main as default };
