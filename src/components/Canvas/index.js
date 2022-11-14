import classNames from 'classnames/bind';

import classes from './Canvas.module.scss';

const cx = classNames.bind(classes);

const Canvas = () => {
   const element = document.createElement('canvas');
   const attributes = {
      id: cx('love-container'),
      width: window.width,
      height: window.height,
   };

   for (const [key, value] of Object.entries(attributes)) {
      element.setAttribute(key, value);
   }

   return element;
};

export default Canvas();
