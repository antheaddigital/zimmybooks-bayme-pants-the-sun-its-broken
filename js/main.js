/* ---------------------------------------------------------------------- */
// Environment assign
/* ---------------------------------------------------------------------- */

var environment = config.environment;
var envObj = envObj || {};
switch(environment){
  case 'staging':
    envObj = config.staging;
  break;
  case 'production':
    envObj = config.production;
  break;
}

/* ---------------------------------------------------------------------- */
// Slider functionality
/* ---------------------------------------------------------------------- */

$('.slider').on('init', function(event, slick){

  // watch slide - on credits show ad
  $('.slider').on('afterChange', function(event, slick, currentSlide){
    if(currentSlide == 10){
      if(window.admob){
        showAd();
      }
    }
  });

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

/* ---------------------------------------------------------------------- */
// Sign pop-up functionality
/* ---------------------------------------------------------------------- */

$('.sign-link').magnificPopup({type:'image'});

/* ---------------------------------------------------------------------- */
// Admon functionality
/* ---------------------------------------------------------------------- */

function initAds() {
  if (window.admob) {

    // select the right Ad Id according to platform
    if ( /(android)/i.test(navigator.userAgent) ) {
      admobid = { // for Android
        banner: settings.admob.android.banner,
        interstitial: settings.admob.android.interstitial
      };
    } else if (/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
      admobid = { // for iOS
        banner: settings.admob.ios.banner,
        interstitial: settings.admob.ios.interstitial
      };
    }

    window.admob.setOptions({
      publisherId: admobid.banner,
      interstitialAdId: admobid.interstitial,
      autoShowInterstitial: false,
      isTesting: window.envObj.isTesting
    });

    window.admob.requestInterstitialAd();

  }
}

function showAd(){
  window.admob.showInterstitialAd();
  showNextInterstitial = setTimeout(function() {
    admob.requestInterstitialAd();
  }, 2 * 60 * 1000); // 2 minutes - refresh new ad
}

document.addEventListener("deviceready", function(){
  initAds();
}, true);
