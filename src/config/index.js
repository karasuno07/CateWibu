import importAll from '~/core/libs/resource';

export const settings = {
   particles: {
      length: 500,
      duration: 2,
      velocity: 100,
      effect: -0.75,
      size: 30,
   },
};

export const slide = {
   images: importAll(require.context('../assets/images', false, /\.(png|jpe?g|svg)$/)),
   config: {},
};

export default { settings, slide };
