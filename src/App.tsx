import React from 'react';
import './App.css';

export function App() {
  return (
    <div className="App">
      <p>
        This website is an archive of some of the static content that lived at{' '}
        <a href="https://hotmilo23.com">hotmilo23.com</a> for several years. That site was decimissioned in 2021 as it
        was hosted on an extremely expensive managed hosting service and was running a lot of dodgy php with trivial RCE
        bugs present.
      </p>
      <p>
        For the nonstatic sites I've either removed them or tried to present them in a read-only way that matches what
        the old experience would have been
      </p>
      <p>Presented in no particular order:</p>
      <ul>
        <li>
          <a href="/public_html/upload/index.htm">public_html/upload/index.htm</a> - a (now non-functioning) file upload
          portal. What a fantastic Idea that was... Along with an empty <code>/a</code> directory and a javascript file
          that was definitely designed for a different game? (<code>/otter.js</code>). If you click the mislabelled
          "Learn More" button that's definitely just been copy pasted from a tutorial it will download the php file that
          would have been run.
        </li>
        <li>
          <a href="/public_html/ginnyplz/index.htm">public_html/ginnyplz/index.htm</a> - <strong>Warning: </strong>{' '}
          strong strobing effect is in use. There wasn't really a point here, it was just to annoy my house mate.
        </li>
        <li>
          <a href="/public_html/4pics/index.htm">public_html/4pics/index.htm</a> - This was actually a somewhat useful
          app. It was used to solve a popular puzzle game at the time called "4 pics one word". I wrote a python script
          to take a dictionary file and split it up into various files and folders based on the lenght of the word and
          the letter is started with. I think this was so I didn't have to load the whole dictionary at once? It also
          included an <code>addWord.htm</code> page where users could add missing words to the dictionary (through a php
          script that just appends to a txt file...)
        </li>
      </ul>{' '}
      <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
        Learn React
      </a>
    </div>
  );
}
