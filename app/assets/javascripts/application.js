// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//

//= require jquery
//= require jquery-ui
//= require jquery-ui/core
//= require jquery-ui/widget
//= require jquery-ui/position
//= require bootstrap-sprockets
//= require bootstrap/dropdown
//= require bootstrap/modal
//= require bootstrap/transition
//= require bootstrap-datepicker
//= require jasny-bootstrap.min
//= require rails-ujs
//= require turbolinks
//= require toastr
//= require spin
//= require jquery.spin
//= require owl.carousel
//= require timepiece
//= require formvalidation
//= require formvalidation.bootstrap

//= require_tree .


// For Rails 5 Use the jquery.turbolinks gem and using
// $( document ).on('turbolinks:load', function() {
//   // your code
// }


$( document ).on('turbolinks:load', function() {
    $('#term').autocomplete({
        source: "/contacts/autocomplete",
        minLength: 3,
        select: function (event, ui) {
            $('#term').val(ui.item.value);
            $(this).closest('form').submit();
        }
    });
    // $('#form-modal-save-btn').click(function() {
    //     $('#new_contact').submit();
    // });
    // $(document).on("page:fetch", function(){
    //   $("#abc").show();
    //   $("#abc").spin(true);
    // });
    //
    // $(document).on("page:receive", function(){
    //   $("#abc").hide();
    //   $("#abc").spin(false);
    // });

    $('#ajax-spin').hide();
    $('#abc').hide();


    var owl = $('.owl-carousel');
    owl.owlCarousel({
        loop:true,
        margin:16,
        items: 4,
        autoplay:true,
        autoplayTimeout:3000,
        autoplayHoverPause:true,
        fluidSpeed:true,
        autowidth:false,
        dots: true,
        // navigation: true,
        responsiveClass:false,
        responsive:{
            0:{
                items:1,
                nav:false
                },
         600:{
             items:3,
             nav:false
             },
         1000:{
             items:5,
             nav:false,
             loop:false
             }
        }
    });
    $('.play').on('onmouseout',function(){
        owl.trigger('play.owl.autoplay',[1000])
    });
    $('.stop').on('mouseover',function(){
        owl.trigger('stop.owl.autoplay')
    });

    $('#task_form').formValidation({
      framework: 'bootstrap',
      icon: {
          valid: 'glyphicon glyphicon-ok',
          invalid: 'glyphicon glyphicon-remove',
          validating: 'glyphicon glyphicon-refresh'
      },
      fields: {
         'task[name]': {
          message: 'name is required',
          validators: {
            notEmpty: {
              message: 'name is required'
            },
            stringLength: {
                min: 2,
                max: 16,
                message: 'The name must be more than 2 and less than 16 characters long'
            },
            regexp: {
                regexp: /^[a-zA-Z]+$/,
                message: 'The name can only consist of alphabetical characters'
            }
          }
        }              
        
      }
    }).on('success.form.fv', function(e) {
            // Prevent form submission
            e.preventDefault();
            $.ajax({
                url: String($(this).attr('action')),
                type: 'post',
                data:  new FormData(this),
                contentType: false,
                cache: false,
                processData:false,
                beforeSend: function(data) {
                  $('.displaynone').css("display","inline-block");
                    },
                    success: function(data) {

                    },
                    complete: function(data){
                       $('.displaynone').fadeOut().css("display","none");
                     },
                    error: function(data) {
                       // code here
                    }
            });
       
     });



    var trigger = $('.hamburger'),
      overlay = $('.overlay'),
     isClosed = false;

    trigger.click(function () {
      hamburger_cross();      
    });

    function hamburger_cross() {

      if (isClosed == true) {          
        overlay.hide();
        trigger.removeClass('is-open');
        trigger.addClass('is-closed');
        isClosed = false;
      } else {   
        overlay.show();
        trigger.removeClass('is-closed');
        trigger.addClass('is-open');
        isClosed = true;
      }
  }
  
  $('[data-toggle="offcanvas"]').click(function () {
        $('#wrapper').toggleClass('toggled');
  });  

}); // end turbolinks

// default

$(document).ajaxStart(function () {
    $('#ajax-spin').spin({
          lines: 13 // The number of lines to draw
        , length: 28 // The length of each line
        , width: 14 // The line thickness
        , radius: 42 // The radius of the inner circle
        , scale: 1 // Scales overall size of the spinner
        , corners: 1 // Corner roundness (0..1)
        , color: '#F62217' // #rgb or #rrggbb or array of colors
        , opacity: 0.25 // Opacity of the lines
        , rotate: 0 // The rotation offset
        , direction: 1 // 1: clockwise, -1: counterclockwise
        , speed: 1 // Rounds per second
        , trail: 60 // Afterglow percentage
        , fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
        , zIndex: 2e9 // The z-index (defaults to 2000000000)
        , className: 'spinner' // The CSS class to assign to the spinner
        , top: '50%' // Top position relative to parent
        , left: '50%' // Left position relative to parent
        , shadow: false // Whether to render a shadow
        , hwaccel: false // Whether to use hardware acceleration
        , position: 'absolute' // Element positioning
    });
    $('#ajax-spin').show();
    $('#abc').spin({
      lines: 12, // The number of lines to draw
      length: 7, // The length of each line
      width: 9, // The line thickness
      radius: 18, // The radius of the inner circle
      direction: -1,
      color: '#000', // #rgb or #rrggbb
      speed: 0.5, // Rounds per second
      trail: 60, // Afterglow percentage
      shadow: false // Whether to render a shadow
    });
    $('#abc').show();
});

$(document).ajaxStop(function () {
    $('#ajax-spin').delay(1800).fadeOut('slow');
    $('#abc').delay(1800).fadeOut('slow');
});

//history.pushState(state, title, url)

$(document).on('click', '.pagination a[data-remote=true], a.list-group-item', function() {
  history.pushState({}, '', $(this).attr('href'));
});

$(window).on('popstate', function() {
  $.get(document.location.href);
});
// $(document).ready(function() {
//   $("#myInput").on("keyup", function() {
//     var value = $(this).val().toLowerCase();
//     $("#myTable tr").filter(function() {
//       $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
//     });
//   });
// });

// $(document).ready( function() {
//     //$('.alert').delay(3000).fadeOut();
//     $(".alert-danger" ).fadeOut(3000);
// });



/*global toastr*/
toastr.options = {
  "closeButton": true,
  "debug": false,
  "positionClass": "toast-top-right",
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "5000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}



// function updateClock ( )
//   {
//     var currentTime = new Date ( );
//     var currentHours = currentTime.getHours ( );
//     var currentMinutes = currentTime.getMinutes ( );
//     var currentSeconds = currentTime.getSeconds ( );

//     // Pad the minutes and seconds with leading zeros, if required
//     currentMinutes = ( currentMinutes  12 ) ? currentHours - 12 : currentHours;

//     // Convert an hours component of "0" to "12"
//     currentHours = ( currentHours == 0 ) ? 12 : currentHours;

//     // Compose the string for display
//     var currentTimeString = currentHours + ":" + currentMinutes + ":" + currentSeconds + " " + timeOfDay;
    
    
//     $("#clock").html(currentTimeString);
        
//  }

// $(document).ready(function()
// {
//    setInterval('updateClock()', 1000);
// });