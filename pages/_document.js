// _document.js는 전체 HTML문서를 커스터마이징할 수 있게 해줌
// 얘는 class기반 컴포넌트여야함

import Document, { Html, Head, Main, NextScript } from 'next/document'; // 여기 Head는 다른 페이지 Head랑 다름

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <div id="overlays" />
          <Main />
          <NextScript />
        </body>
      </Html>
      // 기본형태를 오버라이드 하는 이유
      // HTML 콘텐츠를 애필리케이션 컴포넌트 트리 외부에 추가할 수 있게 해줌 react portal 모달이나 오버레이를 이 요소로 전달할 수 있음
    );
  }
}
