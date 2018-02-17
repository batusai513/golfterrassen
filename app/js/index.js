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
import MapFactory from './map';
const Flickity = require("flickity/dist/flickity.pkgd");
var jQueryBridget = require('jquery-bridget');
jQueryBridget( 'flickity', Flickity, $ );
const SmartPhone = smartPhone(false);
const mainMenu = document.querySelector(".js-menu");
$('.parallax').parallax();


new SmoothScroll('.js-menu-link', {
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



var $carousel = $('.carousel-apartamentos').flickity({
  imagesLoaded: true,
  prevNextButtons: false
});

tabby.init({
  callback: function ( tabs, toggle ) {
    var el = tabs[0];
    var carousel = $(el).find('.carousel-apartamentos');
    var data = carousel.data('flickity');
    if(data) {
      data.resize();
      data.reposition();
    } else {
      $carousel = $(carousel).flickity({
        imagesLoaded: true,
        prevNextButtons: false
      });
    }
  }
});

const handleMobileDetection = () => {
  if (!SmartPhone.isAny()) {
    startMobileMenu(mainMenu);
    $(".js-menu-link").on("dragstart", e => e.preventDefault());
  }
};

window.addEventListener( 'load', function() {
  const data = $carousel.data('flickity');
  data.resize();
  data.reposition();
});

$(document).ready(() => {
  handleMobileDetection();
});
