import _ from 'lodash';

const MorphCounter = (container, countTimes) => {
   const textSpan1 = container.querySelector('#text-span-1');
   const textSpan2 = container.querySelector('#text-span-2');

   const texts =
      _.isNumber(countTimes) && countTimes > 0
         ? new Array(countTimes)
              .fill(0)
              .map((_, index) => index)
              .reverse()
         : ['3', '2', '1', '0'];

   const morphTime = 1;
   const cooldownTime = 1;

   let textIndex = texts.length - 1;
   let time = new Date();
   let morph = 0;
   let cooldown = cooldownTime;

   textSpan1.textContent = texts[textIndex % texts.length];
   textSpan2.textContent = texts[(textIndex + 1) % texts.length];

   function doMorph() {
      morph -= cooldown;
      cooldown = 0;

      let fraction = morph / morphTime;

      if (fraction > 1) {
         cooldown = cooldownTime;
         fraction = 1;
      }

      setMorph(fraction);
   }

   function setMorph(fraction) {
      textSpan2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
      textSpan2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

      fraction = 1 - fraction;
      textSpan1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
      textSpan1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

      textSpan1.textContent = texts[textIndex % texts.length];
      textSpan2.textContent = texts[(textIndex + 1) % texts.length];
   }

   function doCooldown() {
      morph = 0;

      textSpan2.style.filter = '';
      textSpan2.style.opacity = '100%';

      textSpan1.style.filter = '';
      textSpan1.style.opacity = '0%';
   }

   function animate() {
    //   if (textSpan2.textContent === '0') {
    //      destroy();
    //      return;
    //   }

      requestAnimationFrame(animate);

      let newTime = new Date();
      let shouldIncrementIndex = cooldown > 0;
      let dt = (newTime - time) / 1000;
      time = newTime;

      cooldown -= dt;

      if (cooldown <= 0) {
         if (shouldIncrementIndex) {
            textIndex++;
         }

         doMorph();
      } else {
         doCooldown();
      }
   }

   function destroy() {
      container.remove();
   }

   return {
      start() {
         container.classList.add('show');
         setTimeout(animate, 1000);
      },
   };
};

export default MorphCounter;
