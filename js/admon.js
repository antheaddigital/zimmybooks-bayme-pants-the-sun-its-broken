function onDeviceReady() {

  // Set AdMobAds options:
  admob.setOptions({
    publisherId: "ca-app-pub-4899785129776182/7652659352",
    interstitialAdId: "ca-app-pub-4899785129776182/6653604159",
    autoShowBanner: true
  });

  // Start showing banners (atomatic when autoShowBanner is set to true)
  admob.createBannerView();

  // Request interstitial (will present automatically when autoShowInterstitial is set to true)
  admob.requestInterstitialAd();
}

$(document).ready(function() {
  onDeviceReady();
});
