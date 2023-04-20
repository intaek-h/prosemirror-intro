import { Schema } from "prosemirror-model";

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
  },
  marks: {},
};

export const schema = new Schema(spec);
