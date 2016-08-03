// http://pointdeveloper.com/how-to-add-interstitial-ads-on-navigation-for-phonegap-app-using-admob/

// function onDeviceReady() {
//   document.removeEventListener('deviceready', onDeviceReady, false);
//
//   // Set AdMobAds options:
//   admob.setOptions({
//     publisherId: "ca-app-pub-4899785129776182/7652659352",
//     interstitialAdId: "ca-app-pub-4899785129776182/6653604159",
//     isTesting:true
//   });
//
//   // Start showing banners (atomatic when autoShowBanner is set to true)
//   admob.createBannerView({
//     autoShowBanner: true
//   });
//
//   // Request interstitial (will present automatically when autoShowInterstitial is set to true)
//   admob.requestInterstitialAd({
//     autoShowInterstitial: false
//   });
// }
//
// function domLoaded(){
//  document.addEventListener("deviceready", onDeviceReady, false);
// }

/* ---------------------------------------------------------------------- */


// function adSetter(){
//   var admobid = {};
//   // select the right Ad Id according to platform
//   if( /(android)/i.test(navigator.userAgent) ) {
//     admobid = { // for Android
//       banner: 'ca-app-pub-4899785129776182~5176870955',
//       interstitial: 'ca-app-pub-4899785129776182/6653604159'
//     };
//   } else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
//     admobid = { // for iOS
//       //banner: 'ca-app-pub-6869992474017983/4806197152',
//       //interstitial: 'ca-app-pub-6869992474017983/7563979554'
//     };
//   } else {
//     admobid = { // for Windows Phone
//       //banner: 'ca-app-pub-6869992474017983/8878394753',
//       //interstitial: 'ca-app-pub-6869992474017983/1355127956'
//     };
//   }
//
//   if(window.AdMob) AdMob.prepareInterstitial({
//     adId:admobid.interstitial,
//     autoShow:false
//   });
//
// }



// function onDeviceReady(){
//   admob.requestInterstitialAd({
//     publisherId: "ca-app-pub-4899785129776182/7652659352",
//     interstitialAdId: "ca-app-pub-4899785129776182/6653604159",
//     autoShowInterstitial: true
//   });
//   //adSetter();
// }
//
// function domLoaded(){
//   document.addEventListener("deviceready", onDeviceReady, false);
// }
