import { settings } from '~/config';
import Point from './Point';

export default class Particle {
   constructor() {
      this.position = new Point();
      this.velocity = new Point();
      this.acceleration = new Point();
      this.age = 0;
   }

   initialize(x, y, dx, dy) {
      this.position.x = x;
      this.position.y = y;
      this.velocity.x = dx;
      this.velocity.y = dy;
      this.acceleration.x = dx * settings.particles.effect;
      this.acceleration.y = dy * settings.particles.effect;
      this.age = 0;
   }

   update(deltaTime) {
      this.position.x += this.velocity.x * deltaTime;
      this.position.y += this.velocity.y * deltaTime;
      this.velocity.x += this.acceleration.x * deltaTime;
      this.velocity.y += this.acceleration.y * deltaTime;
      this.age += deltaTime;
   }

   draw(context, image) {
      function ease(t) {
         return --t * t * t + 1;
      }

      var size = image.width * ease(this.age / settings.particles.duration);

      context.globalAlpha = 1 - this.age / settings.particles.duration;

      context.drawImage(image, this.position.x - size / 2, this.position.y - size / 2, size, size);
   }
}

export class ParticlePool {
   particles = [];
   firstActive = 0;
   firstFree = 0;

   constructor(length) {
      this.particles = _.map(new Array(length), (particle) => new Particle());
   }

   add(x, y, dx, dy) {
      this.particles[this.firstFree].initialize(x, y, dx, dy);
      this.firstFree++;
      if (this.firstFree == this.particles.length) this.firstFree = 0;
      if (this.firstActive == this.firstFree) this.firstActive++;
      if (this.firstActive == this.particles.length) this.firstActive = 0;
   }

   update(deltaTime) {
      if (this.firstActive < this.firstFree) {
         for (let index = this.firstActive; index < this.firstFree; index++)
            this.particles[index].update(deltaTime);
      }

      if (this.firstFree < this.firstActive) {
         for (let index = this.firstActive; index < this.particles.length; index++)
            this.particles[index].update(deltaTime);

         for (let index = 0; index < this.firstFree; index++)
            this.particles[index].update(deltaTime);
      }

      while (
         this.particles[this.firstActive].age >= this.duration &&
         this.firstActive != this.firstFree
      ) {
         this.firstActive++;

         if (this.firstActive == this.particles.length) this.firstActive = 0;
      }
   }

   draw(context, image) {
      if (this.firstActive < this.firstFree) {
         for (let index = this.firstActive; index < this.firstFree; index++)
            this.particles[index].draw(context, image);
      }

      if (this.firstFree < this.firstActive) {
         for (let index = this.firstActive; index < this.particles.length; index++)
            this.particles[index].draw(context, image);

         for (let index = 0; index < this.firstFree; index++)
            this.particles[index].draw(context, image);
      }
   }
}
