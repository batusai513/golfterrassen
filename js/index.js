"use strict";

const styles = require("../css/style.scss");
const $ = require("jquery");
const SmartPhone = require("detect-mobile-browser")(false);
const magnificPopup = require("magnific-popup");
const Flickity = require("flickity");
const Rellax = require("rellax");
const tabby = require("Tabby");
const smoothScroll = require("smooth-scroll");
const gumshoe = require("gumshoe");
const MapFactory = require('./map');

const mainMenu = document.querySelector(".js-menu");
const rellax = new Rellax(".rellax", {
  center: true
});

tabby.init();
smoothScroll.init({
  speed: 1000
});
gumshoe.init({
  scrollDelay: true
});
var map = MapFactory('#map-canvas');

$(".js-gallery").magnificPopup({
  delegate: "a",
  type: "image",
  closeOnContentClick: false,
  closeBtnInside: false,
  mainClass: "mfp-with-zoom mfp-img-mobile",
  image: {
    verticalFit: true,
    titleSrc: function(item) {
      return (
        item.el.attr("title") +
        ' &middot; <a class="image-source-link" href="' +
        item.el.attr("data-source") +
        '" target="_blank">image source</a>'
      );
    }
  },
  gallery: {
    enabled: true
  },
  zoom: {
    enabled: true,
    duration: 300, // don't foget to change the duration also in CSS
    opener: function(element) {
      return element.find("img");
    }
  }
});

const demos = {
  2: document.querySelector("#search-demo"),
  3: document.querySelector("#radio-demo"),
  4: document.querySelector("#collections-demo")
};

const swapVideos = (index, nextIndex) => {
  const previousVideo = demos[index];
  const nextVideo = demos[nextIndex];

  if (previousVideo) {
    previousVideo.pause();
  }

  if (nextVideo) {
    nextVideo.play();
  }
};

const renderHeroBackground = () => {
  const url = "../images/bg1.jpg";
  const img = new Image();
  img.onload = function() {
    $(".overlay").css({ "background-image": "url(" + url + ")", opacity: 1 });
  };
  img.src = url;
};

function startMobileMenu(menu) {
  return new Flickity(menu, {
    cellAlign: "left",
    freeScroll: true,
    prevNextButtons: false,
    pageDots: false,
    contain: true,
    percentPosition: false
  });
}

const handleMobileDetection = () => {
  if (!SmartPhone.isAny()) {
    startMobileMenu(mainMenu);
    startMobileMenu(document.querySelector(".js-tab-menu"));
    $(".js-menu-link").on("dragstart", e => e.preventDefault());
  }
  if (SmartPhone.isAny()) {
    // replace videos with images
    const demos = ["search-demo", "radio-demo", "collections-demo"];
    demos.forEach(demo => {
      $(`#${demo}`).replaceWith(
        `<img src='images/${demo}.png' id='${demo}' class='demo-image'/>`
      );
    });
    $(".download")
      .removeClass("download")
      .html("<p>Available for Windows, Mac and Ubuntu.</p>");
    $(".demo").click(function() {
      $(this).toggleClass("active");
    });
  }
};

$(document).ready(() => {
  renderHeroBackground();
  handleMobileDetection();
});
