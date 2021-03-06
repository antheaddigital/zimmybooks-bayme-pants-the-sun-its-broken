/* ---------------------------------------------------------------------- */
// Slider functionality
/* ---------------------------------------------------------------------- */

// apply functionality after slick carousel is initilized
$('.slider').on('init', function(event, slick){

  // watch slide - on credits show ad
  $('.slider').on('afterChange', function(event, slick, currentSlide){
    if(currentSlide == window.appSettings.creditsSlide){
      if(window.admob){
        //console.log('show ad');
        showAd();
        _paq.push(['trackGoal', window.appSettings.piwik[window.appEnvironment].creditsPageGoalID]);
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

// init slick carousel
$('.slider').slick({
  infinite: true,
  dots: false,
  cssEase: 'linear'
});

/* ---------------------------------------------------------------------- */
// Sign pop-up functionality
/* ---------------------------------------------------------------------- */

// init magnific popup
$('.sign-link').magnificPopup({type:'image'});

/* ---------------------------------------------------------------------- */
// Admob functionality
/* ---------------------------------------------------------------------- */

// initialize ads
function initAds() {

  // select the right Ad Id according to platform
  if ( /(android)/i.test(navigator.userAgent) ) {
    window.admobid = { // for Android
      banner: window.appSettings.admob.android.banner,
      interstitial: window.appSettings.admob.android.interstitial
    };
  } else if ( /(ipod|iphone|ipad)/i.test(navigator.userAgent) ) {
    window.admobid = { // for iOS
      banner: window.appSettings.admob.ios.banner,
      interstitial: window.appSettings.admob.ios.interstitial
    };
  }

  // admob init
  admob.initAdmob(window.admobid.banner, window.admobid.interstitial);

  // admob params
  // var admobParam = new admob.Params();
  // admobParam.isForChild = true;
  // admobParam.isTesting = window.appConfig.admob[window.appEnvironment].isTesting;
  //console.log(admobParam);

  // prep for interstitial ad
  //admob.cacheInterstitial(admobParam);
  admob.cacheInterstitial({
    isForChild: true,
    isTesting: window.appConfig.admob[window.appEnvironment].isTesting
  });

  // interstitial ad event tests
  document.addEventListener(admob.Event.onInterstitialPresent, onInterstitialPresent, false);
  function onInterstitialPresent(message) {
    console.log('int present');
    console.log(message);
  }
  document.addEventListener(admob.Event.onInterstitialFailedReceive, onInterstitialFailedReceive, false);
  function onInterstitialFailedReceive(message) {
    console.log('int failed');
    console.log(message);
  }
  document.addEventListener(admob.Event.onInterstitialReceive, onInterstitialReceive, false);
  function onInterstitialReceive(message) {
    console.log('int received');
    console.log(message);
  }

}

// show ad if interstitial is ready
function showAd(){
  admob.isInterstitialReady(function(isReady){
    if(isReady){
      admob.showInterstitial();
    }
  });
}

/* ---------------------------------------------------------------------- */
// Phonegap plugin initialization
/* ---------------------------------------------------------------------- */

// phonegap plugin trigger
document.addEventListener("deviceready", function(){
  initAds(); // init admob
}, true); // "true" will remove event listener after being triggered
