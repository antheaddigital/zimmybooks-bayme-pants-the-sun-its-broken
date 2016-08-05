$('.slider').on('init', function(event, slick){

  // watch slide - on credits show ad
  $('.slider').on('afterChange', function(event, slick, currentSlide){
    if(currentSlide == 10){
      if(window.admob){
        window.admob.onAdLoaded({ adType : 'interstitial' });
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
$('.sign-link').magnificPopup({type:'image'});

/* ---------------------------------------------------------------------- */

function initAds() {
  if (window.admob) {
    // var adPublisherIds = {
    //   ios : {
    //     banner : "",
    //     interstitial : ""
    //   },
    //   android : {
    //     banner : "ca-app-pub-XXXXXXXXXXXXXXXX/BBBBBBBBBB",
    //     interstitial : "ca-app-pub-XXXXXXXXXXXXXXXX/IIIIIIIIII"
    //   }
    // };
    //
    // var admobid = (/(android)/i.test(navigator.userAgent)) ? adPublisherIds.android : adPublisherIds.ios;

    window.admob.setOptions({
      publisherId: 'ca-app-pub-4899785129776182/7652659352',
      interstitialAdId: 'ca-app-pub-4899785129776182/6653604159',
      autoShowInterstitial: false,
      isTesting: true
    });

    registerAdEvents();

    window.admob.requestInterstitialAd();

  } else {
    console.log('AdMobAds plugin not ready');
  }
}

function showAd(){
  console.log('showAd');
  window.admob.showInterstitialAd();
}

//function onAdLoaded(e) {
  //alert('load ad');
  //if (e.adType === admob.AD_TYPE.INTERSTITIAL) {
    //alert('adtype pass');
    //window.admob.showInterstitialAd();
    // showNextInterstitial = setTimeout(function() {
    //   window.admob.requestInterstitialAd();
    // }, 2 * 60 * 1000); // 2 minutes
  //}
//}

// function registerAdEvents() {
//   document.addEventListener(admob.events.onAdLoaded, onAdLoaded);
// }

console.log('before device ready call');
document.addEventListener("deviceready", function(){
  console.log('after device ready call');
  initAds();
}, true);
