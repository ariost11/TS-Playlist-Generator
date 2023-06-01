import * as React from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

import Quiz from './Quiz';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <div className='background-image'>
    <h1 id='title'>Taylor Swift Playist Generator</h1>
    <Quiz/>
    <h2>About Me</h2>
    <p id='descriptionText'>
      My name is Ari Ostrow and I am a senior studying computer science at Case Western Reserve University. 
      I have a strong passion for Taylor Swift and had the urge to make this.
      <br/><br/>
      If you have any questions about this project you can email me at <a id='emailColor' href="mailto:ari.ostrow@case.edu">ari.ostrow@case.edu</a>.
      <br/><br/>
      Thanks to all who helped populate the data for this project!
    </p>
  </div>
);