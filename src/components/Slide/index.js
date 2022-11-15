import classNames from 'classnames/bind';

import { slide } from '~/config';

import classes from './Slide.module.scss';

const cx = classNames.bind(classes);

const defaultOptions = {
   delayTime: 2500,
};

export const slideEvent = new Event('slide');

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

   const options = Object.assign(defaultOptions, userOptions);

   element.addEventListener(slideEvent.type, () => {
      element.classList.add(cx('show'));

      let index = 0;

      setInterval(() => {
         if (index === imageElements.length) index = 0;

         imageElements.forEach((el, idx) => el.classList.toggle(cx('active'), idx === index));

		 index++;
      }, options.delayTime);
   });

   return element;
};

export default Slide(slide.images, slide.config);
