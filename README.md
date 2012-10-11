CS160 Pair Programming #2
=========================

UC Berkeley: Edward Lee & Peter Lee

Rules
-----

Don't touch the .html and .css files. HTML and CSS are managed via HAML (haml-lang.com) and SASS (sass-lang.com).

### Sass

Once sass is installed, it can be run with: `sass --watch style.sass`.  
Sass will continually check the .sass file for changes and convert sass->css.

### Haml

For HAML, I wrote a similar Python script (that is 10000x less efficient that the sass --watch but whatever; quick fix).  
To run: `python haml_watch.py` and then at the prompt type in `index.haml`
