import "./style.css";
import { EditorView } from "prosemirror-view";
import { EditorState } from "prosemirror-state";
import { schema } from "./schema";
import counterPlugin from "./plugin";

// 에디터의 부모 요소가 될 Holder 입니다.
const holder = document.querySelector(".holder");

// 내가 정의한 도큐먼트 모델을 토대로 에디터의 최초 상태를 정의합니다.
const state = EditorState.create({ schema, plugins: [counterPlugin] });

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

/**
 * 선택된 텍스트에 <strong> 태그를 적용하는 기능을 구현해 봅니다.
 * 미리 만들어둔 strongButton 을 사용하세요.
 *
 * 1. 트랜잭션 객체를 생성한다.
 * 2. 에디터 상태를 구성하는 스키마를 가져와 strong 마크 를 생성한다.
 * 3. 텍스트 선택의 시작점과 끝점을 가져온다.
 * 4. 시작점과 끝점 사이에 strong 마크를 입힌다는 내용을 트랜잭션 객체에 담는다.
 * 5. 트랜잭션 객체를 에디터에 전달한다.
 *
 */

const strongButton = document.querySelector(".stronger");

strongButton.addEventListener("click", (event) => {
  // 1. 트랜잭션 객체를 생성한다.
  const transaction = view.state.tr;

  // 2. 에디터 상태를 구성하는 스키마를 가져와 strong 마크 를 생성한다.
  const mySchema = view.state.schema;
  const strongMark = mySchema.marks.strong.create();

  // 3. 텍스트 선택의 시작점과 끝점을 가져온다.
  const selection = view.state.selection;
  const from = selection.from;
  const to = selection.to;

  // 4. 시작점과 끝점 사이에 strong 마크를 입힌다는 내용을 트랜잭션 객체에 담는다.
  transaction.addMark(from, to, strongMark);

  // 5. 트랜잭션 객체를 에디터에 전달한다.
  view.dispatch(transaction);
});
