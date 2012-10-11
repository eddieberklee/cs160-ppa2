$(function() {
  var colors = ["red","yellow","blue","green","purple","orange","brown","white"];

  function removeClasses($selector) {
    for (var i=0; i<colors.length; i++) {
      $selector.removeClass(colors[i]+'-on');
    }
  }

  var debug = 1;
  var name = "Leandro Daivincin";

  function remove_color_classes(selector) {
    $(selector).removeClass('red-color');
  }
  // TODO add functions for easy application of a single color on following filters.
  // TODO refactor

  function color_bars() {
    $red = $("#red");
    $yellow = $("#yellow");
    $blue = $("#blue");
    $red_light = $("#w-r");
    $yellow_light = $("#w-r-y");
    $blue_light = $("#w-r-y-b");
    if ($red.hasClass('on')) {
      removeClasses($red_light);
      $red_light.addClass('red-on');
      if ($yellow.hasClass('on')) {
        removeClasses($yellow_light);
        $yellow_light.addClass('orange-on');
        if ($blue.hasClass('on')) {
          removeClasses($blue_light);
          $blue_light.addClass('brown-on');
        }
        else if (!$blue.hasClass('on')) {
          removeClasses($blue_light);
          $blue_light.addClass('orange-on');
        }
      }
      else if (!$yellow.hasClass('on')) {
        removeClasses($yellow_light);
        $yellow_light.addClass('red-on');
        if ($blue.hasClass('on')) {
          removeClasses($blue_light);
          $blue_light.addClass('purple-on');
        }
        else if (!$blue.hasClass('on')) {
          removeClasses($blue_light);
          $blue_light.addClass('red-on');
        }
      }
    }
    else {
      removeClasses($red_light);
      $red_light.addClass('white-on');
      if ($yellow.hasClass('on')) {
        removeClasses($yellow_light);
        $yellow_light.addClass('yellow-on');
        if ($blue.hasClass('on')) {
          removeClasses($blue_light);
          $blue_light.addClass('green-on');
        }
        else if (!$blue.hasClass('on')) {
          removeClasses($blue_light);
          $blue_light.addClass('yellow-on');
        }
      }
      else if (!$yellow.hasClass('on')) {
        removeClasses($yellow_light);
        $yellow_light.addClass('white-on');
        if ($blue.hasClass('on')) {
          removeClasses($blue_light);
          $blue_light.addClass('blue-on');
        }
        else if (!$blue.hasClass('on')) {
          removeClasses($blue_light);
          $blue_light.addClass('white-on');
        }
      }
    }
  }

  var top_i = '70px';

  function moveCrystal(crystal) {
    $(crystal).toggleClass('on');
    // negative code: -parseInt(top_i.slice(0,-2))
    top_increment = ($(crystal).hasClass('on')) ? 0 : top_i;
    $(crystal).animate({
      top: top_increment,
    },50,function() {});
    color_bars();
  }

  $("#red").click(function() {
    moveCrystal(this);
  });
  $("#yellow").click(function() {
    moveCrystal(this);
  });
  $("#blue").click(function() {
    moveCrystal(this);
  });

  // develop: enter in a test name
  debug ? $("span#name").text(name) : 1;

  var $text_surrounding_name = $("#header div#text");
  // debug ? console.log(name.length) : 1;
  
  color_bars();
});