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
// Admon functionality
/* ---------------------------------------------------------------------- */

function initAds() {
  if (window.admob) {



    // admob options
    var admobParam = new window.admob.Params();
    //admobParam.autoShowInterstitial = false;
    admobParam.isForChild = true;
    admobParam.isTesting = window.appConfig.admob[window.appEnvironment].isTesting; // set test for ad
    //console.log(admobParam);
    // window.admob.setOptions({
    //   publisherId: admobid.banner,
    //   interstitialAdId: admobid.interstitial,
    //   autoShowInterstitial: false,
    //   isForChild: true,
    //   isTesting: window.appConfig.admob[window.appEnvironment].isTesting // set test for ad
    // });

    // prep for interstitial ad
    //window.admob.requestInterstitialAd();
    window.admob.cacheInterstitial();

  }
}

// show ad
function showAd(){
  window.admob.showInterstitial();
  // window.admob.showInterstitialAd();
  // showNextInterstitial = setTimeout(function() {
  //   admob.requestInterstitialAd();
  // }, 2 * 60 * 1000); // 2 minutes - refresh new ad
}

/* ---------------------------------------------------------------------- */
// phonegap plugin initialization
/* ---------------------------------------------------------------------- */

// phonegap plugin trigger
document.addEventListener("deviceready", function(){

  var admobid = {};
  // select the right Ad Id according to platform
  if ( /(android)/i.test(navigator.userAgent) ) {
    admobid = { // for Android
      banner: window.appSettings.admob.android.banner,
      interstitial: window.appSettings.admob.android.interstitial
    };
  } else if ( /(ipod|iphone|ipad)/i.test(navigator.userAgent) ) {
    admobid = { // for iOS
      banner: window.appSettings.admob.ios.banner,
      interstitial: window.appSettings.admob.ios.interstitial
    };
  }

  //console.log('device ready');
  window.admob = admob.initAdmob(admobid.banner, admobid.interstitial);

  //console.log('admob init');
  initAds(); // init admob

}, true); // "true" will remove event listener after being triggered
