"use strict";
import "../css/style.scss";
import $ from "jquery";
import "./parallax";
import smartPhone from "detect-mobile-browser";
import magnificPopup from "magnific-popup";
import Rellax from "rellax";
import tabby from "Tabby";
import SmoothScroll from "smooth-scroll";
import gumshoe from "gumshoe";
import MapFactory from "./map";
const Flickity = require("flickity/dist/flickity.pkgd");
const SmartPhone = smartPhone(false);
const mainMenu = document.querySelector(".js-menu");
$(".parallax").parallax();

new SmoothScroll(".js-smooth", {
  speed: 1000
});

gumshoe.init({
  scrollDelay: true
});

var map = MapFactory("#map-canvas");

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
        item.el.attr("title")
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

function startMobileMenu(menu) {
  return new Flickity(menu, {
    cellAlign: "left",
    freeScroll: true,
    prevNextButtons: false,
    pageDots: false,
    contain: true,
    percentPosition: false,
    setGallerySize: false
  });
}

function createCarousel(el) {
  if (!el) return;
  const $el = $(el);
  const instance = new Flickity(el, {
    imagesLoaded: true,
    prevNextButtons: false
  });
  $el.data("flickity", instance);
  return instance;
}

var $carousel = createCarousel(
  document.querySelector(".carousel-apartamentos")
);

tabby.init({
  callback: function(tabs, toggle) {
    var el = tabs[0];
    var carousel = $(el).find(".carousel-apartamentos");
    var data = carousel.data("flickity");
    if (data) {
      data.resize();
      data.reposition();
    } else {
      $carousel = createCarousel(carousel[0]);
    }
  }
});

const handleMobileDetection = () => {
  if (!SmartPhone.isAny()) {
    startMobileMenu(mainMenu);
    $(".js-menu-link").on("dragstart", e => e.preventDefault());
  }
};

window.addEventListener("load", function() {
  if (!$carousel) return;
  $carousel.resize();
  $carousel.reposition();
});

$(document).ready(() => {
  handleMobileDetection();
});
