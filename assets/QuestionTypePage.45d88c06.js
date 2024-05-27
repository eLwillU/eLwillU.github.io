import { r as ref, a3 as openBlock, aD as createElementBlock, k as createVNode, a5 as withCtx, aA as QCard, ac as createCommentVNode, ax as QCardSection, F as Fragment, aE as renderList, ay as createBaseVNode, a8 as toDisplayString, a4 as createBlock, aG as QRadio, b8 as QCheckbox, ba as QInput, a6 as QBtn, a7 as createTextVNode } from "./index.73cef502.js";
import { d as dist } from "./index.a52644ac.js";
import "./index.33e8d543.js";
const _hoisted_1 = { key: 0 };
const _hoisted_2 = { key: 0 };
const _hoisted_3 = { key: 0 };
const _sfc_main = {
  __name: "QuestionTypePage",
  setup(__props) {
    const qData = ref("");
    const selectedAnswer = ref("");
    const selectedAnswers = ref([]);
    const stringAnswer = ref("");
    const dataReady = ref(false);
    fetch("questionnaire/type.json").then((response) => response.json()).then((res) => {
      qData.value = new dist.QuestionnaireData(res, ["de"]);
      dataReady.value = true;
    }).catch((error) => {
      console.error("Error loading the JSON file:", error);
    });
    function updateQuestionAnswers(q, answer) {
      qData.value.updateQuestionAnswers(q, answer);
    }
    function updateTextQuestion(question, answer) {
      const res = {
        answer: {},
        code: {}
      };
      res.code.valueString = answer;
      res.answer["de"] = answer;
      qData.value.updateQuestionAnswers(question, res);
      console.log("Qdata new:", qData.value);
    }
    function logggg() {
      try {
        const response = qData.value.getQuestionnaireResponse("de");
        console.log(response);
      } catch (e) {
        console.warn("Something ain't right:", e);
      }
    }
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
                    q.type === "choice" ? (openBlock(), createElementBlock("div", _hoisted_2, [
                      createBaseVNode("h6", null, toDisplayString(q.label["de"]), 1),
                      (openBlock(true), createElementBlock(Fragment, null, renderList(q.answerOptions, (answer) => {
                        return openBlock(), createElementBlock("div", {
                          key: q.id + "-" + answer.code
                        }, [
                          !q.allowsMultipleAnswers ? (openBlock(), createBlock(QRadio, {
                            key: 0,
                            modelValue: selectedAnswer.value,
                            "onUpdate:modelValue": [
                              _cache[0] || (_cache[0] = ($event) => selectedAnswer.value = $event),
                              () => updateQuestionAnswers(q, answer)
                            ],
                            label: answer.answer["de"],
                            val: answer.answer["de"]
                          }, null, 8, ["modelValue", "label", "val", "onUpdate:modelValue"])) : createCommentVNode("", true),
                          q.allowsMultipleAnswers ? (openBlock(), createBlock(QCheckbox, {
                            key: 1,
                            modelValue: selectedAnswers.value,
                            "onUpdate:modelValue": [
                              _cache[1] || (_cache[1] = ($event) => selectedAnswers.value = $event),
                              () => updateQuestionAnswers(q, answer)
                            ],
                            label: answer.answer["de"],
                            val: answer.answer["de"]
                          }, null, 8, ["modelValue", "label", "val", "onUpdate:modelValue"])) : createCommentVNode("", true)
                        ]);
                      }), 128)),
                      (openBlock(true), createElementBlock(Fragment, null, renderList(q.subItems, (qSub) => {
                        return openBlock(), createElementBlock(Fragment, {
                          key: qSub.id
                        }, [
                          qSub.isEnabled ? (openBlock(), createElementBlock("div", _hoisted_3, [
                            createVNode(QInput, {
                              modelValue: stringAnswer.value,
                              "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => stringAnswer.value = $event),
                              outlined: ""
                            }, null, 8, ["modelValue"]),
                            createVNode(QBtn, {
                              onClick: ($event) => updateTextQuestion(qSub, stringAnswer.value)
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Submit")
                              ]),
                              _: 2
                            }, 1032, ["onClick"]),
                            createVNode(QBtn, {
                              onClick: _cache[3] || (_cache[3] = ($event) => logggg())
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Log response ")
                              ]),
                              _: 1
                            })
                          ])) : createCommentVNode("", true)
                        ], 64);
                      }), 128))
                    ])) : createCommentVNode("", true)
                  ]);
                }), 128))
              ]),
              _: 1
            })
          ]),
          _: 1
        })
      ])) : createCommentVNode("", true);
    };
  }
};
export { _sfc_main as default };
