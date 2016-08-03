function onDeviceReady() {
  document.removeEventListener('deviceready', onDeviceReady, false);

  // Set AdMobAds options:
  admob.setOptions({
    publisherId: "ca-app-pub-4899785129776182/7652659352",
    interstitialAdId: "ca-app-pub-4899785129776182/6653604159"
  });

  // Start showing banners (atomatic when autoShowBanner is set to true)
  admob.createBannerView({
    autoShowBanner: true
  });

  // Request interstitial (will present automatically when autoShowInterstitial is set to true)
  admob.requestInterstitialAd({
    autoShowInterstitial: false
  });
}

function domLoaded(){
 document.addEventListener("deviceready", onDeviceReady, false);
}
