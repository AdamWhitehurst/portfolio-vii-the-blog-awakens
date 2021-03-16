// REF: https://nextjs.org/docs/advanced-features/custom-app
// import App from 'next/app'
import Signature from '@layouts/signature'
import './_app.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* canvas element (id="canvas") is required by
      bracket-lib wasm module to exist at all times once
      the module is loaded. RoguieCanvas Component handles
      displaying and hiding this element. */}
      <canvas
        id="canvas"
        width="640"
        height="400"
        style={{ display: 'none' }}
      ></canvas>
      <Signature />
      <Component {...pageProps} />
    </>
  )
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp
