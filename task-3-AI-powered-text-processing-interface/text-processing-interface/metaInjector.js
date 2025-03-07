export function injectMetaTag() {
  document.addEventListener("DOMContentLoaded", () => {
    const metaTag = document.createElement("meta");
    metaTag.httpEquiv = "origin-trial";
    metaTag.content = import.meta.env.VITE_LANGUAGE_DETECTION_TOKEN;
    document.head.appendChild(metaTag);
  });
}
