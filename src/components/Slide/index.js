import classNames from 'classnames/bind';

import classes from './Slide.module.scss';

const cx = classNames.bind(classes);

const defaultOptions = {
   delayTime: 1000,
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
         image.className = cx('image');
         image.src = source;
         if (index === 0) image.classList.add(cx('active'));

         element.appendChild(imageContainer);
         imageElements.push(imageContainer);
      });
   }

   const options = Object.assign(defaultOptions, userOptions);

   element.addEventListener(slideEvent.type, () => {
      let intervel = setInterval(() => {}, options.delayTime);
   });

   return element;
};

export default Slide();
