$(function() {
  var colors = ["red","yellow","blue","green","purple","orange","brown","white"];

  function removeClasses($selector) {
    for (var i=0; i<colors.length; i++) {
      $selector.removeClass(colors[i]+'-on');
    }
  }

  var debug = 1;
  var name = "Eddie";

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
          removeClasses($("#list-background"));
          $("#list-background").addClass('brown-on');
          removeClasses($("#triangle-actual-r"));
          $("#triangle-actual-r").addClass('brown-on');
          removeClasses($("#triangle-actual"));
          $("#triangle-actual").addClass('brown-on');
        }
        else if (!$blue.hasClass('on')) {
          removeClasses($blue_light);
          $blue_light.addClass('orange-on');
          removeClasses($("#list-background"));
          $("#list-background").addClass('orange-on');
          removeClasses($("#triangle-actual-r"));
          $("#triangle-actual-r").addClass('orange-on');
          removeClasses($("#triangle-actual"));
          $("#triangle-actual").addClass('orange-on');
        }
      }
      else if (!$yellow.hasClass('on')) {
        removeClasses($yellow_light);
        $yellow_light.addClass('red-on');
        if ($blue.hasClass('on')) {
          removeClasses($blue_light);
          $blue_light.addClass('purple-on');
          removeClasses($("#list-background"));
          $("#list-background").addClass('purple-on');
          removeClasses($("#triangle-actual-r"));
          $("#triangle-actual-r").addClass('purple-on');
          removeClasses($("#triangle-actual"));
          $("#triangle-actual").addClass('purple-on');
        }
        else if (!$blue.hasClass('on')) {
          removeClasses($blue_light);
          $blue_light.addClass('red-on');
          removeClasses($("#list-background"));
          $("#list-background").addClass('red-on');
          removeClasses($("#triangle-actual-r"));
          $("#triangle-actual-r").addClass('red-on');
          removeClasses($("#triangle-actual"));
          $("#triangle-actual").addClass('red-on');
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
          removeClasses($("#list-background"));
          $("#list-background").addClass('green-on');
          removeClasses($("#triangle-actual-r"));
          $("#triangle-actual-r").addClass('green-on');
          removeClasses($("#triangle-actual"));
          $("#triangle-actual").addClass('green-on');
        }
        else if (!$blue.hasClass('on')) {
          removeClasses($blue_light);
          $blue_light.addClass('yellow-on');
          removeClasses($("#list-background"));
          $("#list-background").addClass('yellow-on');
          removeClasses($("#triangle-actual-r"));
          $("#triangle-actual-r").addClass('yellow-on');
          removeClasses($("#triangle-actual"));
          $("#triangle-actual").addClass('yellow-on');
        }
      }
      else if (!$yellow.hasClass('on')) {
        removeClasses($yellow_light);
        $yellow_light.addClass('white-on');
        if ($blue.hasClass('on')) {
          removeClasses($blue_light);
          $blue_light.addClass('blue-on');
          removeClasses($("#list-background"));
          $("#list-background").addClass('blue-on');
          removeClasses($("#triangle-actual-r"));
          $("#triangle-actual-r").addClass('blue-on');
          removeClasses($("#triangle-actual"));
          $("#triangle-actual").addClass('blue-on');
        }
        else if (!$blue.hasClass('on')) {
          removeClasses($blue_light);
          $blue_light.addClass('white-on');
          removeClasses($("#list-background"));
          $("#list-background").addClass('white-on');
          removeClasses($("#triangle-actual-r"));
          $("#triangle-actual-r").addClass('white-on');
          removeClasses($("#triangle-actual"));
          $("#triangle-actual").addClass('white-on');
        }
      }
    }
  }

  var top_i = '90px';

  function moveCrystal(crystal) {
    $(crystal).toggleClass('on');
    // negative code: -parseInt(top_i.slice(0,-2))
    top_increment = ($(crystal).hasClass('on')) ? 0 : top_i;
    $(crystal).animate({
      top: top_increment,
    },1,function() {});
    color_bars();
  }

  function ripple(color) {
    selector = '#' + color + '-ring img';
    $(selector).css('opacity','100');
    $(selector).animate({
      width: 400,
      left: 0,
      top: 0,
      opacity: 0,
    },500,'linear',function() {});
    // reset
    $(selector).css('opacity','100');
    $(selector).animate({
      width: 60,
      top: 170,
      left: 170,
    },1,'linear');
  }

  $("#red").click(function() {
    moveCrystal(this);
    ripple('red');
    $.ajax({
      url: "http://cs160ppa2lee.appspot.com/documents/r",
      type: "GET",
      context: document.body
    }).done(function(dataReturned) { 
      $(this).addClass("done");
      alert(dataReturned);
    });
  });
  $("#yellow").click(function() {
    moveCrystal(this);
    ripple('yellow');
  });
  $("#blue").click(function() {
    moveCrystal(this);
    ripple('blue');
  });

  // develop: enter in a test name
  debug ? $("span#name").text(name) : 1;

  var $text_surrounding_name = $("#header div#text");
  // debug ? console.log(name.length) : 1;
  
  color_bars();
  moveCrystal("#red");
  moveCrystal("#yellow");
  moveCrystal("#blue");
});
