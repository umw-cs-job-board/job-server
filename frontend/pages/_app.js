// The _app.js file is used to do global imports for all pages.
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/jobboard.css';


// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}