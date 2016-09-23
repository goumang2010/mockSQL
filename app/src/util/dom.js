export const $ = (selector) => {
    return document.querySelectorAll(selector);
};

Element.prototype.on = Element.prototype.addEventListener;
