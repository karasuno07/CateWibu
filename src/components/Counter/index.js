import classNames from 'classnames/bind';

import classes from './Counter.module.scss';

const cx = classNames.bind(classes);

export const countEvent = new Event('count');

const Counter = (countTimes = 3) => {
   const texts = new Array(countTimes)
      .fill('')
      .map((_, index) => index + 1)
      .reverse();
   let pos = 0;

   const element = document.createElement('div');
   element.id = cx('counter');

   const textSpan1 = document.createElement('span');
   textSpan1.id = cx('text-span');

   element.addEventListener(countEvent.type, function () {
      element.classList.add(cx('show'));

      let counter = setInterval(() => {
         if (pos === texts.length) {
            clearInterval(counter);
            element.remove();
         } else {
            textSpan1.textContent = texts[pos++];
         }
      }, 1000);
   });

   element.appendChild(textSpan1);

   return element;
};

export default Counter();
