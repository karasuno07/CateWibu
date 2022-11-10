import { createHeart } from '~/components/Shape';
import { settings } from '~/config';
import { ParticlePool, Point } from '~/models';

const HeartBump = (canvas) => {
   const context = canvas.getContext('2d');
   const heart = createHeart();

   const particles = new ParticlePool(settings.particles.length);
   let time = 0;

   const config = {
      ...settings.particles,
      particleRate: settings.particles.length / settings.particles.duration,
   };

   function render(h = 0, v = 0) {
      requestAnimationFrame(render.bind(null, h, v));

      const newTime = new Date().getTime() / 1000;
      const deltaTime = newTime - (time || newTime);
      time = newTime;

      context.clearRect(0, 0, canvas.width, canvas.height);

      const amount = config.particleRate * deltaTime;

      for (let i = 0; i < amount; i++) {
         const pos = Point.onHeart(Math.PI - 2 * Math.PI * Math.random(), 1.5);

         const dir = pos.clone().length(config.velocity);

         particles.add(canvas.width / 2 + pos.x + h, canvas.height / 2 - pos.y + v, dir.x, -dir.y);
      }

      particles.update(deltaTime);

      particles.draw(context, heart);
   }

   const handleEvents = {
      resize() {
         canvas.width = canvas.clientWidth;
         canvas.height = canvas.clientHeight;
      },
      move(x = canvas.clientWidth, y = canvas.clientHeight) {
         canvas.width = x;
         canvas.height = y;
      },
   };

   function start() {
      window.addEventListener('resize', handleEvents.resize);

      handleEvents.resize();
      render(0, 0);

      handleEvents.move();
   }

   return {
      start,
   };
};

export default HeartBump;
