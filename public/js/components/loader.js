// Handling loader element and it's state functions
const loaderElement = document.getElementById("loader");
const hideLoader = () => loaderElement.classList.add("hidden");
const showLoader = () => loaderElement.classList.remove("flex");

export { hideLoader, showLoader };
