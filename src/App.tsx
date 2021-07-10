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
      <p>
        Presented in no particular order:
        <ul>
          <li>
            <a href="/public_html/upload/index.htm">public_html/upload/index.htm</a> - a (now non-functioning) file
            upload portal. What a fantastic Idea that was... Along with an empty <code>/a</code> directory and a
            javascript file that was definitely designed for a different game? (<code>/otter.js</code>)
          </li>
        </ul>{' '}
      </p>
      <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
        Learn React
      </a>
    </div>
  );
}
