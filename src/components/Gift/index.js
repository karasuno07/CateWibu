import classNames from 'classnames/bind';
import { sleep } from '~/core/libs/asynchronous';

import { HeartBump } from '~/animations';
import Audio from '~/components/BGM';
import Canvas from '~/components/Canvas';
import Counter, { countEvent } from '~/components/Counter';
import Slide, {
   showSlideEvent,
   startSlideEvent,
   displayDialogueEvent,
   hideDialogueEvent,
} from '~/components/Slide';

import classes from './Gift.module.scss';

const cx = classNames.bind(classes);
const HeartBumpAnimation = HeartBump(Canvas);

const OpenButton = () => {
   const element = document.createElement('button');

   const attributes = {
      id: cx('open-btn'),
   };
   for (const [key, value] of Object.entries(attributes)) {
      element.setAttribute(key, value);
   }

   const events = {
      click: async function onClick(event) {
         const giftContainer = document.getElementById(cx('gift-container'));
         const openButton = document.getElementById(cx('open-btn'));

         giftContainer.classList.toggle(cx('gift-box'));
         openButton.classList.add(cx('fade'));

         await sleep(3000);

         Counter.dispatchEvent(countEvent);

         await sleep(3500);

         Audio.play();
         giftContainer.style.animation = `${cx('expanding')} 2.5s ease-in-out forwards`;
         Slide.dispatchEvent(showSlideEvent);

         await sleep(4000);

         Slide.dispatchEvent(displayDialogueEvent);

         await sleep(7000);

         Slide.dispatchEvent(hideDialogueEvent);

         await sleep(2000);

         Slide.dispatchEvent(startSlideEvent);
      },
   };
   for (const [name, fn] of Object.entries(events)) {
      element.addEventListener(name, fn);
   }

   return element;
};

const Bandroll = ({ className }) => {
   const element = document.createElement('span');

   const attributes = {
      class: _.isString(className) ? cx('bandroll', className) : cx('bandroll'),
   };
   for (const [key, value] of Object.entries(attributes)) {
      element.setAttribute(key, value);
   }

   return element;
};

const Gift = () => {
   const element = document.createElement('div');

   const attributes = {
      id: cx('gift-container'),
      class: cx('gift-box'),
   };
   for (const [key, value] of Object.entries(attributes)) {
      element.setAttribute(key, value);
   }

   element.appendChild(Bandroll({ className: cx('bandroll-1') }));
   element.appendChild(Bandroll({ className: cx('bandroll-2') }));
   element.appendChild(OpenButton());

   return element;
};

export default Gift();
