import "./style.css";
import { EditorView } from "prosemirror-view";
import { EditorState } from "prosemirror-state";
import { schema } from "./schema";

// 에디터의 부모 요소가 될 Holder 입니다.
const holder = document.querySelector(".holder");

// 내가 정의한 도큐먼트 모델을 토대로 에디터의 최초 상태를 정의합니다.
const state = EditorState.create({ schema });

// Editor View 로 부터 도큐먼트 모델에 따라 변화하는 DOM 의 여러가지 정보를 얻을 수 있습니다.
const view = new EditorView(holder, {
  state,
  attributes: {
    class: "editor",
  },
  dispatchTransaction(transaction) {
    const newState = view.state.apply(transaction);
    view.updateState(newState);
  },
});
