import { settings } from '~/config';
import { Point } from '~/models';

export default function createImage() {
   const canvas = document.createElement('canvas');
   const context = canvas.getContext('2d');

   canvas.width = settings.particles.size;
   canvas.height = settings.particles.size;

   function to(t) {
      const point = Point.onHeart(t);

      point.x = settings.particles.size / 2 + (point.x * settings.particles.size) / 350;

      point.y = settings.particles.size / 2 - (point.y * settings.particles.size) / 350;

      return point;
   }

   context.beginPath();

   let t = -Math.PI;
   let point = to(t);

   context.moveTo(point.x, point.y);

   while (t < Math.PI) {
      t += 0.01; // baby steps!

      point = to(t);

      context.lineTo(point.x, point.y);
   }

   context.closePath();

   context.fillStyle = '#ea80b0';
   context.fill();

   // create the image

   const image = new Image();
   image.src = canvas.toDataURL();

   return image;
}
