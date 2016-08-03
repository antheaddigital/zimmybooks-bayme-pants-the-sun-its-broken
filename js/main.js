$(document).ready(function(){

  $('.slider').on('afterChange', function(event, slick, currentSlide){
    if(currentSlide == 10){
      if(window.AdMob) AdMob.showInterstitial();
    }
  });

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
    cssEase: 'linear',
    onAfterChange: function(){
      console.log('changed');
      //$('.current').text($('.slides').slickCurrentSlide()+1);
    }
  });

  $(window).on('resize', function(){
    location.reload();
  });

  /* ---------------------------------------------------------------------- */

  // Sign pop-up functionality
  $('.sign-link').magnificPopup({type:'image'});

  /* ---------------------------------------------------------------------- */
  // http://pointdeveloper.com/how-to-add-interstitial-ads-on-navigation-for-phonegap-app-using-admob/

  function adSetter(){
    var admobid = {};
    // select the right Ad Id according to platform
    if( /(android)/i.test(navigator.userAgent) ) {
      admobid = { // for Android
        banner: 'ca-app-pub-4899785129776182~5176870955',
        interstitial: 'ca-app-pub-4899785129776182/6653604159'
      };
    } else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
      admobid = { // for iOS
        //banner: 'ca-app-pub-6869992474017983/4806197152',
        //interstitial: 'ca-app-pub-6869992474017983/7563979554'
      };
    } else {
      admobid = { // for Windows Phone
        //banner: 'ca-app-pub-6869992474017983/8878394753',
        //interstitial: 'ca-app-pub-6869992474017983/1355127956'
      };
    }

    if(window.AdMob) AdMob.createBanner( {
        isTesting:true, //Remove this Before publishing your app
        adId:admobid.banner,
        position:AdMob.AD_POSITION.BOTTOM_CENTER,
        autoShow:true} );

    if(window.AdMob) AdMob.prepareInterstitial( {adId:admobid.interstitial, autoShow:false} );

  }

  function onDeviceReady(){
    adSetter();
  }

  function domLoaded(){
    document.addEventListener("deviceready", onDeviceReady, false);
  }

});
