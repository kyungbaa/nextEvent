import Head from 'next/head';
import '../styles/globals.css';
import 'tailwindcss/tailwind.css';

import Layout from '../components/layout/layout';
// _app.js 파일은 표시되는 모든 페이지에서 렌더링되는 경로 애플리케이션 컴포넌트임
// _app.js는 애플리케이션 Shell
// body섹션 속 루트 컴포넌트
export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>next EventSearch</title>
        <meta
          name="description"
          content="Find a lot of great events that allow you to evolve..."
        />
        <meta
          name="viewport"
          content="initial-scale=1.0 , width = device-witdth"
        />
        {/* 반응형 페이지의 스케일을 적정값으로 사용하는데 많이 사용됨 일부페이지가 아니라 전체 페이지에 적용되어야함 */}
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}
