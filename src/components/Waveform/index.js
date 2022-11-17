import WaveSurfer from 'wavesurfer.js/src/wavesurfer';
import classNames from 'classnames/bind';

import classes from './Waveform.module.scss';

const cx = classNames.bind(classes);

let wavesurfer;

const Waveform = () => {
   const element = document.createElement('div');

   const attributes = {
      id: cx('waveform'),
   };

   wavesurfer = WaveSurfer.create({
      container: element,
      waveColor: 'violet',
      progressColor: 'purple',
   });

   return element;
};

export { wavesurfer };

export default Waveform();
