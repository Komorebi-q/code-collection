if ("serviceWorker" in navigator && "PushManager" in window) {
  (() => import("./subscribe"))();

  navigator.serviceWorker
    .register("/serviceWorker.js")
    .then(registration => {
      console.log("SW registered", registration);
    })
    .catch(registrationError => {
      console.log("SW registration failed", registrationError);
    });
}
