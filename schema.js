import { Schema } from "prosemirror-model";

/**
 * 스키마를 직접 정의합니다.
 *
 * 1. 새로운 Node 의 스펙을 만들어 봅니다.
 *    <blockquote> 노드의 스펙:
 *    - content: "(paragraph)+"               (paragraph 를 1개 이상 가질 수 있습니다.)
 *    - group: "block"                        (block 으로 분류됩니다.)
 *    - parseDOM: [{ tag: "blockquote" }]     (HTML 태그로부터 노드를 만들 수 있습니다.)
 *    - toDOM: ['blockquote', 0]              (노드를 HTML 태그로 표현할 때 사용됩니다.)
 *
 *
 * 2. 새로운 Mark 의 스펙을 만들어 봅니다.
 *    <strong> 마크의 스펙:
 *    - parseDOM: [{ tag: "strong" }]         (HTML 태그로부터 노드를 만들 수 있습니다.)
 *    - toDOM: ["strong", 0]                  (노드를 HTML 태그로 표현할 때 사용됩니다.)
 *
 *
 */
export const spec = {
  nodes: {
    text: {
      group: "inline",
    },

    doc: {
      content: "block+",
    },

    paragraph: {
      content: "inline*",
      group: "block",
      parseDOM: [{ tag: "p" }],
      toDOM() {
        return ["p", 0];
      },
    },

    blockquote: {
      content: "(paragraph)+",
      group: "block",
      defining: true,
      parseDOM: [{ tag: "blockquote" }],
      toDOM() {
        return blockquoteDOM;
      },
    },
  },

  marks: {
    strong: {
      toDOM() {
        return ["strong", 0];
      },
      parseDOM: [{ tag: "strong" }],
    },
  },
};

export const schema = new Schema(spec);
