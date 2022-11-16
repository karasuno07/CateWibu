import classNames from 'classnames/bind';
import { createCustomEvent } from '~/core/libs/event';
import { sleep } from '~/core/libs/asynchronous';

import { slide } from '~/config';

import classes from './Slide.module.scss';

const cx = classNames.bind(classes);

let showSlideEvent, startSlideEvent, displayDialogueEvent, hideDialogueEvent;

const Slide = (images, userOptions) => {
   const element = document.createElement('div');

   const attributes = {
      id: cx('slideshow'),
   };
   for (const [key, value] of Object.entries(attributes)) {
      element.setAttribute(key, value);
   }

   const imageElements = [];
   if (_.isArray(images) && images.length > 0) {
      images.forEach((source, index) => {
         const imageContainer = document.createElement('div');
         imageContainer.className = cx('slide');

         const image = new Image();
         image.src = source;
         image.alt = 'image-' + index + 1;

         imageContainer.appendChild(image);

         element.appendChild(imageContainer);
         imageElements.push(imageContainer);
      });
   }

   const defaultOptions = {
      delayTime: 2500,
   };
   const options = Object.assign(defaultOptions, userOptions);

   showSlideEvent = createCustomEvent(element, 'show-slide', () => {
      element.classList.add(cx('show'));
   });

   startSlideEvent = createCustomEvent(element, 'start-slide', () => {
      let index = 0;

      setInterval(() => {
         if (index === imageElements.length) index = 0;

         imageElements.forEach(async (el, idx) => {
            el.style.zIndex = 10 + idx;
            el.classList.toggle(cx('active'), idx === index);
         });

         index++;
      }, options.delayTime);
   });

   const textElement = document.createElement('p');
   textElement.id = cx('dialogue');
   textElement.innerHTML =
      '<span>Mirror</span>' +
      '<span>, mirror</span>' +
      '<br/>' +
      '<span>on</span>' +
      '<span>&nbsp;the&nbsp;</span>' +
      '<span>wall</span>' +
      '<br/>' +
      "<span>Who's</span>" +
      '<span>&nbsp;the&nbsp;</span>' +
      '<span>fairest</span>' +
      '<br/>' +
      '<span>of</span>' +
      '<span>&nbsp;them&nbsp;</span>' +
      '<span>all?</span>';

   displayDialogueEvent = createCustomEvent(element, 'display-dialogue', () => {
      const spanElements = textElement.querySelectorAll('span');

      const duration = 1500;
      let delay = 100;
      spanElements.forEach((span) => {
         span.animate(
            {
               opacity: 1,
               filter: 'blur(0)',
            },
            {
               duration,
               delay,
               fill: 'forwards',
               easing: 'cubic-bezier(0.11, 0, 0.5, 0)',
            }
         );

         delay += 500;
      });
   });

   hideDialogueEvent = createCustomEvent(element, 'hide-dialogue', () => {
      textElement.animate(
         {
            opacity: 0,
         },
         {
            duration: 2000,
            fill: 'forwards',
         }
      );
   });

   element.appendChild(textElement);

   return element;
};

export { showSlideEvent, startSlideEvent, displayDialogueEvent, hideDialogueEvent };

export default Slide(slide.images, slide.config);
