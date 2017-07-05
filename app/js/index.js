"use strict";
import "../css/style.scss";
import $ from "jquery";
import "./parallax";
import smartPhone from "detect-mobile-browser";
import magnificPopup from "magnific-popup";
import Rellax from "rellax";
import tabby from "Tabby";
import smoothScroll from "smooth-scroll";
import gumshoe from "gumshoe";
import MapFactory from './map';
const Flickity = require("flickity/dist/flickity.pkgd");
var jQueryBridget = require('jquery-bridget');
jQueryBridget( 'flickity', Flickity, $ );
const SmartPhone = smartPhone(false);
const mainMenu = document.querySelector(".js-menu");
$('.parallax').parallax();

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

window.addEventListener( 'load', function() {
  $carousel.data('flickity').resize();
});

$(document).ready(() => {
  handleMobileDetection();
});
