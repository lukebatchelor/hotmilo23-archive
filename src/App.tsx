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
        <li>
          <a href="/public_html/facefold/index.html">public_html/facefold/index.html</a> - The first iteration of a
          project I later revisted with <a href="https://facefolding.netlify.com/">facefolding.netlify.com</a>.
          Unfortunately it doesn't work without the (very shoddy) upload functionality, but you can still see it's
          successor above!
        </li>
        <li>
          <a href="/public_html/grim/index.htm">public_html/grim/index.htm</a> - This is a very specific inside joke
          made to make fun of my friend Brett when he said something was grim... But it was also just wet...
        </li>
        <li>
          <a href="/public_html/mcm/index.htm">public_html/mcm/index.htm</a> - This was some sort of calculator that
          automated some part of my computer science classes. It was never a requirement, I just made it for fun. I
          believe it's using dynamic programming to calculate some sort of matrix product
        </li>
        <li>
          <a href="/public_html/420/index.htm">public_html/420/index.htm</a> - This was a very tasteful website that
          told you in which timezone the next 4:20pm was going to occur. It was built with a really dodgily scraped list
          of timezones from wikipedia...
        </li>
        <li>
          <a href="/public_html/meow/index.html">public_html/meow/index.html</a> - This was a game idea that I cloned
          years back. The aim of the game is to use sound to find the invisible kitten. The closer you are, the louder
          they'll be. Yes those meow's are all my voice...
        </li>
        <li>
          <a href="/public_html/python/index.html">public_html/python/index.html</a> - This was a fun little snake game
          that actually plays quite well. It's built using HTML canvas which was still pretty new at the time. I
          followed it up with <a href="/public_html/python/ai/index.html">public_html/python/ai/index.html</a> where I
          apply my newly learned A Star path finding algorithm to have a computer play snake
        </li>
        <li>
          <a href="/public_html/randalyse/index.htm">public_html/randalyse/index.htm</a> - This was a small little
          microsite that just performs one task. It formats SQL insert statments such that the column names and values
          all line up nicely... It was named after one of the senior devs at my first job who had a strong preference
          for this style.
        </li>
        <li>
          <a href="/public_html/random/strike.htm">public_html/random/strike.htm</a> - Little single use site that lets
          you enter text and then copy that text back with some zero width em-dash's creating a "strikethrough" effect.
          Probably my single most used app on all of <a href="https://hotmilo23.com">hotmilo23.com</a>. It even has a
          bookmarket that you can use to call this code from wherever!
        </li>
        <li>
          <a href="/public_html/snow/index.htm">public_html/snow/index.htm</a> - Small Frozen themed game where you
          collect falling snow. Be careful! Don't catch the yellow snow!! Not sure why the starting instructions don't
          tell you, but it's enter to start!
        </li>
        <li>
          <a href="/public_html/tghb/index.htm">public_html/tghb/index.htm</a> - This was meant to be some kind of a
          weird prank I guess? I'd tell people that I've made a new game but that it has a couple of bugs in it. Then
          I'd send this this game that is just a loading screen... I'm not sure I get it either...
        </li>
        <li>
          <a href="/public_html/whatdothotter/index.htm">public_html/whatdothotter/index.htm</a> - A little site for my
          friend. A small otter sprit guide gives out random quotes and magic 8 ball responses. Truly marvellous.
        </li>
        <li>
          <a href="/public_html/faces/index.htm">public_html/faces/index.htm</a> - The start of a bunch of small
          connected sites that I made that all revolved around using my friends faces. Unfortunately the only game that
          still sort of works in
        </li>
      </ul>{' '}
      <p>
        There were plenty more apps but a lot of them relied on php functionality which I do not plan on replacing. This
        site has served me very well since what must be around 2012/2013
      </p>
    </div>
  );
}
