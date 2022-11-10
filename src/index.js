import { createHeart } from './components/Shape';
import { settings } from './config';
import { ParticlePool, Point } from './models';

import './index.scss';

const canvas = document.getElementById('love-container');
const context = canvas.getContext('2d');
const heart = createHeart();

const App = {
   particles: new ParticlePool(settings.particles.length),
   time: 0,
   config: {
      particleRate: settings.particles.length / settings.particles.duration,
   },
   render: () => {
      requestAnimationFrame(App.render);

      const newTime = new Date().getTime() / 1000;
      const deltaTime = newTime - (App.time || newTime);
      App.time = newTime;

      context.clearRect(0, 0, canvas.width, canvas.height);

      const amount = App.config.particleRate * deltaTime;

      for (let i = 0; i < amount; i++) {
         const pos = Point.onHeart(Math.PI - 2 * Math.PI * Math.random());

         const dir = pos.clone().length(settings.particles.velocity);

         App.particles.add(canvas.width / 2 + pos.x, canvas.height / 2 - pos.y, dir.x, -dir.y);
      }

      App.particles.update(deltaTime);

      App.particles.draw(context, heart);
   },
   handleEvents: {
      resize() {
         canvas.width = canvas.clientWidth;
         canvas.height = canvas.clientHeight;
      },
      move(x, y) {
         console.log(canvas.clientWidth);

         canvas.width = x;
         canvas.height = y;
      },
   },
   start() {
      window.addEventListener('resize', this.handleEvents.resize);

      this.handleEvents.resize();
      this.render();

      this.handleEvents.move(600, 600);
   },
};

App.start();

/* ===================================================================================================== */

const isProduction = process.env.NODE_ENV == 'production';
if (isProduction && 'serviceWorker' in navigator) {
   window.addEventListener('load', () => {
      navigator.serviceWorker
         .register('service-worker.js')
         .then((registration) => {
            console.log('Service Worker registered: ', registration);
         })
         .catch((registrationError) => {
            console.error('Service Worker registration failed: ', registrationError);
         });
   });
}
