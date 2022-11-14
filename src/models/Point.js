export default class Point {
   constructor(x, y) {
      this.x = _.isNumber(x) ? x : 0;
      this.y = _.isNumber(y) ? y : 0;
   }

   clone() {
      return new Point(this.x, this.y);
   }

   length(length) {
      if (_.isUndefined(length)) return Math.sqrt(this.x * this.x + this.y * this.y);

      this.normalize();

      this.x *= length;

      this.y *= length;

      return this;
   }

   normalize() {
      const length = this.length();

      this.x /= length;

      this.y /= length;

      return this;
   }

   static onHeart(t, divider = 1) {
      return new Point(
         (160 * Math.pow(Math.sin(t), 3)) / divider,

         (130 * Math.cos(t) -
            50 * Math.cos(2 * t) -
            20 * Math.cos(3 * t) -
            10 * Math.cos(4 * t) +
            25) /
            divider
      );
   }
}
