import createImage from './components/Image';
import { Point, ParticlePool, Particle } from './models';
import { settings } from './config';
import './index.scss';

const canvas = document.getElementById('love-container');
const context = canvas.getContext('2d');
const particles = new ParticlePool(settings.particles.length);
const image = createImage();
// let particleRate = settings.particles.length / settings.particles.duration;
// let time = 0;

const App = {
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

         particles.add(canvas.width / 2 + pos.x, canvas.height / 2 - pos.y, dir.x, -dir.y);
      }

      particles.update(deltaTime);

      particles.draw(context, image);
   },
   handleEvents: {
      resize() {
         canvas.width = canvas.clientWidth;
         canvas.height = canvas.clientHeight;
      },
   },
   start() {
      window.addEventListener('resize', this.handleEvents.resize);

      this.handleEvents.resize();
      this.render();
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
