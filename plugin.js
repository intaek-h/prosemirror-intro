import { Plugin } from "prosemirror-state";
import { EditorView } from "prosemirror-view";

/**
 *  1. 트랜잭션이 발생할 때마다 count 를 1씩 증가시키는 플러그인을 만들어 봅니다.
 *
 *  2. PluginView 를 사용해 숫자를 렌더링해 봅니다.
 *
 */

class counterPluginView {
  /**
   *
   * @param {EditorView} editorView
   */
  constructor(editorView) {
    // 1. 숫자를 표기할 요소를 생성한다.
    this.counter = document.createElement("div");
    this.counter.textContent = "0";
    this.counter.classList.add("counter");

    // 2. 에디터의 부모 요소에 숫자를 표기할 요소를 추가한다.
    const editorHolder = editorView.dom.parentNode;
    editorHolder.insertBefore(this.counter, editorView.dom);
  }

  // 3. 에디터의 상태가 변경될 때마다 호출되는 update 메서드에서 숫자를 업데이트 한다.
  update(view) {
    const { count } = counterPlugin.getState(view.state);
    this.counter.textContent = count;
  }
}

const counterPlugin = new Plugin({
  state: {
    init() {
      return { count: 0 };
    },
    apply(tr, value) {
      return { count: value.count + 1 };
    },
  },
  view(editorView) {
    return new counterPluginView(editorView);
  },
});

export default counterPlugin;
