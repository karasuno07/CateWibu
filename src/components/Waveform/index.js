import classNames from 'classnames/bind';
import WaveSurfer from 'wavesurfer.js';
import CursorPlugin from 'wavesurfer.js/src/plugin/cursor';

import color from '~/styles/_color.module.scss';
import classes from './Waveform.module.scss';

const cx = classNames.bind(classes);

let wavesurfer;

export const BGM = (audioSrc = './soundtracks/BGM.mp3') => {
   const audio = new Audio();

   const attributes = {
      src: audioSrc,
      loop: true,
      preload: true,
   };
   for (const [key, value] of Object.entries(attributes)) {
      audio.setAttribute(key, value);
   }

   const events = {
      play() {
         document.getElementById(cx('waveform')).classList.add(cx('show'));
      },
      pause() {
         document.getElementById(cx('waveform')).classList.remove(cx('show'));
      },
   };
   for (const [eventName, fn] of Object.entries(events)) {
      audio.addEventListener(eventName, fn);
   }

   return audio;
};

const Waveform = () => {
   const element = document.createElement('div');

   const attributes = {
      id: cx('waveform'),
   };
   for (const [key, value] of Object.entries(attributes)) {
      element.setAttribute(key, value);
   }

   wavesurfer = WaveSurfer.create({
      container: element,
      responsive: true,
      backend: 'MediaElement',
      height: 50,
      pixelRatio: 1,
      barWidth: 2,
      cursorColor: 'white',
      waveColor: color.waveBarColor,
      progressColor: color.waveProgressBarColor,
      plugins: [
         CursorPlugin.create({
            showTime: true,
            opacity: 1,
            color: color.waveCursorColor,
            customShowTimeStyle: {
               'background-color': 'transparent',
               color: '#fff',
               padding: '8px',
               'font-size': '12px',
               'font-weight': 600,
            },
         }),
      ],
   });
   wavesurfer.load(BGM());

   return element;
};

export { wavesurfer };

export default Waveform();
