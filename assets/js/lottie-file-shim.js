// Lets Webflow load Lottie files on file:// pages, where fetch/XHR of local files is blocked.
// assets/lottie/<file>.js registers each file's bytes; here they become blob: URLs.
(function () {
  if (location.protocol !== "file:" || !window.__wfLottie) return;
  document.querySelectorAll("[data-src]").forEach(function (el) {
    var name = el.getAttribute("data-src").split("/").pop();
    var b64 = window.__wfLottie[name];
    if (!b64) return;
    var bin = atob(b64), bytes = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    var url = URL.createObjectURL(new Blob([bytes]));
    // Webflow picks the .lottie loader by extension; the fragment keeps it, fetch ignores it.
    el.setAttribute("data-src", url + "#" + name);
  });
})();
