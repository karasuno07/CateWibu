const Counter = () => {
   const element = document.createElement('div');
   element.id = 'counter';

   const textSpan1 = document.createElement('span');
   textSpan1.id = 'text-span-1';

   const textSpan2 = document.createElement('span');
   textSpan2.id = 'text-span-2';

   element.appendChild(textSpan1);
   element.appendChild(textSpan2);

   return element;
};

export default Counter();
