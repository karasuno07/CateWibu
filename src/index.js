import { render } from './core/libs/render';

import Counter from '~/components/Counter';
import Gift from '~/components/Gift';
import Slide from '~/components/Slide';
import Waveform from '~/components/Waveform';

import './serviceWorker';
import './index.scss';

render([Counter, Gift, Slide, Waveform], document.getElementById('root'));
