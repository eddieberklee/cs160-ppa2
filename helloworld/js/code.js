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
          var tag = "ryb";
          ajax_per_click(tag);
          $("#display-status").text('"Displaying only Java + Python + Design documents!"');
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
          var tag = "ry";
          ajax_per_click(tag);
          $("#display-status").text('"Displaying only Java + Python documents!"');
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
          var tag = "rb";
          ajax_per_click(tag);
          $("#display-status").text('"Displaying only Java + Design documents!"');
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
          var tag = "rb";
          ajax_per_click(tag);
          $("#display-status").text('"Displaying only Java documents!"');
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
          var tag = "yb";
          ajax_per_click(tag);
          $("#display-status").text('"Displaying only Python + Design documents!"');
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
          var tag = "y";
          ajax_per_click(tag);
          $("#display-status").text('"Displaying only Python documents!"');
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
          var tag = "b";
          ajax_per_click(tag);
          $("#display-status").text('"Displaying only Design documents!"');
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
          var tag = "";
          ajax_per_click(tag);
          $("#display-status").text('"Displaying all documents!"');
        }
      }
    }
  }

  var top_i = '90px';

  var AUTHOR=0;
  var FILENAME=1;
  var TAGS=2;
  var URL=3;

  function moveCrystal(crystal) {
    $(crystal).toggleClass('on');
    // negative code: -parseInt(top_i.slice(0,-2))
    top_increment = ($(crystal).hasClass('on')) ? 0 : top_i;
    $(crystal).animate({
      top: top_increment,
    },1,function() {});
    color_bars();
  }

  function color_check(selector, colorstring) {
    switch(colorstring) {
      case 'r':
        selector.addClass('red-on');
        break;
      case 'y':
        selector.addClass('yellow-on');
        break;
      case 'b':
        selector.addClass('blue-on');
        break;
      case 'ry':
        selector.addClass('orange-on');
        break;
      case 'rb':
        selector.addClass('purple-on');
        break;
      case 'yb':
        selector.addClass('green-on');
        break;
    }
  }

  function update_list(docs) {
    var total_number = docs.length;
    var list_p = "";
    for (var i=0; i<total_number; i++) {
      list_p += "<p><i class=\"icon-file\"></i><span></span><span style='float:right;'>tags:1,2,3</span></p>";
    }
    $("#list-background").html('');
    $("#list-background").html(list_p);
    for (var i=0; i<total_number; i++) {
      $("#list-background p:nth-of-type("+(parseInt(i)+1)+") span:first-of-type").html(
        "<a href=\""+docs[i][URL]+"\" data-author='"+docs[i][AUTHOR]+"'"+
        ">"+docs[i][FILENAME]+"</a>");
      $("#list-background p:nth-of-type("+(parseInt(i)+1)+") span:nth-of-type(2)").text(docs[i][TAGS]);
      color_check($("#list-background p:nth-of-type("+(parseInt(i)+1)+")"), docs[i][TAGS]);
    }
  }

  function generate_tags() {

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

  function ajax_per_click(tag) {
    $("#list-background").html(img_ajax);
    $.ajax({
      url: "/documents/"+tag,
      type: "GET",
      context: document.body
    }).done(function(dataReturned) { 
      console.log(dataReturned);
      var obj = jQuery.parseJSON(dataReturned);
      var count = 0;
      var docs = [];
      var current_obj;
      $.each(obj, function() {
        current_obj = obj[count];
        count++;
        docs.push([current_obj.author, current_obj.filename, current_obj.tags, current_obj.url]);
      });
      update_list(docs);
    });
  }

  var img_ajax = "<img src='img/ajax-loader.gif'/>";

  $("#red").click(function() {
    moveCrystal(this);
    ripple('red');
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
  
  // moveCrystal("#red");
  // moveCrystal("#yellow");
  // moveCrystal("#blue");
  color_bars();

  var template = '<p><i class="icon-file"></i><span></span></p>';

  var upload_url;

  $.ajax({
    url: "/upload_form_action",
    type: "GET",
    success: function(data) {
      var obj = jQuery.parseJSON(data);
      $("form").attr('action',obj[0]);
    },
  });

  $("#list-background").filedrop({
    url: '/upload',
    paramname: 'file',
    error: function(err, file) {
      switch(err) {
        case 'BrowserNotSupported':
          alert('browser does not support html5 drag and drop')
          break;
        case 'TooManyFiles':
          // user uploaded more than 'maxfiles'
          break;
        case 'FileTooLarge':
          // program encountered a file whose size is greater than 'maxfilesize'
          // FileTooLarge also has access to the file which was too large
          // use file.name to reference the filename of the culprit file
          break;
        case 'FileTypeNotAllowed':
          // The file type is not in the specified list 'allowedfiletypes'
          default:
          break;
      }
    },
    dragOver: function() {
      $("list-background").addClass('hover');
    },
    drop: function() {
      tags = generate_tags();
      $("form input[type='text']").val(tags);
    },
    uploadStarted: function(i,file,len) {
    },
    uploadFinished: function(i,file,response,time) {
    },
  });
  console.log($("form").attr('action'));

});


