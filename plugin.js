import { Plugin } from "prosemirror-state";

/**
 *  1. 트랜잭션이 발생할 때마다 count 를 1씩 증가시키는 플러그인을 만들어 봅니다.
 *
 */
const counterPlugin = new Plugin({
  state: {
    init() {
      return { count: 0 };
    },
    apply(tr, value) {
      // ???
    },
  },
});

export default counterPlugin;
