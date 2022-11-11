import _ from 'lodash';
import { HeartBump, Morph } from '~/animations';
import Canvas from '~/components/Canvas';
import Counter from '~/components/Counter';
import BGM from '~/components/BGM';

const HeartBumpAnimation = HeartBump(Canvas);
const TextMorphAnimation = Morph(Counter, 4);

const OpenButton = () => {
   const element = document.createElement('button');

   const attributes = {
      id: 'open-btn',
   };
   for (const [key, value] of Object.entries(attributes)) {
      element.setAttribute(key, value);
   }

   const events = {
      click: async function onClick(event) {
         const giftContainer = document.getElementById('gift-container');
         const openButton = document.getElementById('open-btn');

         giftContainer.classList.toggle('gift-box');
         openButton.classList.add('fade');

         setTimeout(() => {
            TextMorphAnimation.start();
         }, 1500);

         setTimeout(() => {
            BGM.play();
         }, 5500);

         //  HeartBumpAnimation.start();
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
      class: _.isString(className) ? `bandroll ${className}` : 'bandroll',
   };
   for (const [key, value] of Object.entries(attributes)) {
      element.setAttribute(key, value);
   }

   return element;
};

const Gift = () => {
   const element = document.createElement('div');

   const attributes = {
      id: 'gift-container',
      class: 'gift-box',
   };
   for (const [key, value] of Object.entries(attributes)) {
      element.setAttribute(key, value);
   }

   element.appendChild(Bandroll({ className: 'bandroll-1' }));
   element.appendChild(Bandroll({ className: 'bandroll-2' }));
   element.appendChild(OpenButton());

   return element;
};

export default Gift();
