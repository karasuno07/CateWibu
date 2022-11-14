import { Wave } from '@foobar404/wave';

import { HeartBump } from '~/animations';
import Canvas from '~/components/Canvas';
import Counter, { countEvent } from '~/components/Counter';
import Audio from '~/components/BGM';

const wave = new Wave(Audio, Canvas);

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
            Counter.dispatchEvent(countEvent);
         }, 3000);

         setTimeout(() => {
            Audio.play();

            giftContainer.style.animation = 'expanding 2.5s ease-in-out forwards';

            wave.addAnimation(
               new wave.animations.Shine({
                  glow: true,
                  lineColor: 'red',
				  rotate: true,
               })
            );

            // HeartBumpAnimation.start();
         }, 6500);
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
