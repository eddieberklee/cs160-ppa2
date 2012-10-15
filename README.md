CS160 Pair Programming #2
=========================

UC Berkeley: Edward Lee & Peter Lee

Links
-----

http://tonymilne.com.au/posts/multi-file-drag-and-drop-ajax-upload
http://css.dzone.com/articles/html5-drag-and-drop-multiple
http://tutorialzine.com/2011/09/html5-file-upload-jquery-php/

Rules
-----

Don't touch the .html and .css files. HTML and CSS are managed via HAML (haml-lang.com) and SASS (sass-lang.com).

### Sass

Once sass is installed, it can be run with: `sass --watch style.sass`.  
Sass will continually check the .sass file for changes and convert sass->css.

### Haml

For HAML, I wrote a similar Python script (that is 10000x less efficient that the sass --watch but whatever; quick fix).  
To run: `python haml_watch.py` and then at the prompt type in `index.haml`

Colors
------

### Red

is for *Java*

### Yellow

is for *Python*

### Red

is for *Design*
