$('.slider').on('init', function(event, slick){

  $('.slider').on('afterChange', function(event, slick, currentSlide){
    //alert('change page');
    if(currentSlide == 10){
      //alert('credits page');
      //onAdLoaded();
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

$(window).on('resize', function(){
  location.reload();
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
      isTesting: true
    });

    registerAdEvents();

  } else {
    console.log('AdMobAds plugin not ready');
  }
}

function onAdLoaded(e) {
  //alert('load ad');
  //if (e.adType === admob.AD_TYPE.INTERSTITIAL) {
    //alert('adtype pass');
    window.admob.showInterstitialAd();
    showNextInterstitial = setTimeout(function() {
      window.admob.requestInterstitialAd();
    }, 2 * 60 * 1000); // 2 minutes
  //}
}

function registerAdEvents() {
  document.addEventListener(admob.events.onAdLoaded, onAdLoaded);
}

function onDeviceReady() {
  document.removeEventListener('deviceready', onDeviceReady, false);
  //initAds();

  window.admob.setOptions({
    publisherId: 'ca-app-pub-4899785129776182/7652659352',
    interstitialAdId: 'ca-app-pub-4899785129776182/6653604159',
    isTesting: true
  });

  // display a banner at startup
  window.admob.createBannerView();

  // request an interstitial
  window.admob.requestInterstitialAd();

  window.admob.showInterstitialAd();

  //admob.events.onAdLoaded({ adType : 'interstitial' })

}

document.addEventListener("deviceready", onDeviceReady, false);
