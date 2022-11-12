import BGM from '~/components/BGM';
import Canvas from './components/Canvas';
import Counter from '~/components/Counter';
import Gift from './components/Gift';

import './index.scss';

const root = document.getElementById('root');
const injectElements = [Canvas, Gift, BGM, Counter];

injectElements.forEach((element) => root.appendChild(element));
/* ===================================================================================================== */

const isProduction = process.env.NODE_ENV == 'production';
if (isProduction && 'serviceWorker' in navigator) {
   window.addEventListener('load', () => {
      navigator.serviceWorker
         .register('service-worker.js')
         .then((registration) => {
            console.log('Service Worker registered: ', registration);
         })
         .catch((registrationError) => {
            console.error('Service Worker registration failed: ', registrationError);
         });
   });
}
