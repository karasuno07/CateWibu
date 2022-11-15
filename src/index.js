import BGM from '~/components/BGM';
import Counter from '~/components/Counter';
import Canvas from '~/components/Canvas';
import Gift from '~/components/Gift';
import Slide from '~/components/Slide';

import './index.scss';

const root = document.getElementById('root');
const injectElements = [BGM, Canvas, Counter, Gift, Slide];

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
