var debug = 1;
var name = "Leandro Daivincin";
var colors = ["red","yellow","blue","green","purple","orange","brown"];

function remove_color_classes(selector) {
  $(selector).removeClass('red-color');
}
function color_bars() {
  if ($("#red").hasClass('on')) {
  }
}

// develop: enter in a test name
console.log('hi');
debug ? $("span#name").text(name) : 1;

var $text_surrounding_name = $("#header div#text");
// debug ? console.log(name.length) : 1;
