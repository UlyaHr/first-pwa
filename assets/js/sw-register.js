// REGISTER SERVICE WORKER
if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
        navigator.serviceWorker
        .register("./service-worker.js")
        .then(function() {
            console.log("ServiceWorker registration success");
        })
        .catch(function() {
            console.log("ServiceWorker registration failed");
        });
    });
} else {
console.log("ServiceWorker not supported in this browser.");
}