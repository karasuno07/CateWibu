const Canvas = () => {
   const element = document.createElement('canvas');
   const attributes = {
      id: 'love-container',
      width: window.width,
      height: window.height,
   };

   for (const [key, value] of Object.entries(attributes)) {
      element.setAttribute(key, value);
   }

   return element;
};

export default Canvas();
