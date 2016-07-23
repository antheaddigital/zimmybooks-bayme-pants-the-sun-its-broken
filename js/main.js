$(document).ready(function(){

  $('.slider').on('init', function(event, slick){

    // Apply browser height to wrapper and slider blocks
    var browserHeight = $(window).height();
    $('.wrapper').height(browserHeight);
    var sliderMargin = Math.ceil(browserHeight / 20);
    $('.slider .page-img').height(browserHeight - (sliderMargin * 2));
    $('.slider').css({'margin-top': sliderMargin});

    // Apply new image width to slider width
    var pageImgWidth = $('.slider .page-img').width();
    $('.slider').width(pageImgWidth);

    // Apply width of sign link and position
    var signLinkWidth = Math.ceil(pageImgWidth / 5);
    $('.sign-link').width(signLinkWidth);
    var signLinkPosition = Math.ceil(signLinkWidth / 10);
    $('.sign-link').css({ top: signLinkPosition, right: signLinkPosition});

  });

  $('.slider').slick({
    infinite: true,
    dots: false,
    cssEase: 'linear'
  });

  $(window).on('resize', function(){
    location.reload();
  });

  // Sign pop-up functionality
  $('.sign-link').magnificPopup({type:'image'});

});
