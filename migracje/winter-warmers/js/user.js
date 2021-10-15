$(document).ready(function () {
  let mobileViewport = window.matchMedia("screen and (min-width: 768px)");

  if ($(".logo-bar > .basket, .logo-bar > .basket-contain").length) {
    $(".logo-bar > .basket, .logo-bar > .basket-contain").wrapAll(
      '<div class="bbs-wrap right"></div>'
    );
  } else {
    $("header .logo-bar").append('<div class="bbs-wrap right"></div>');
  }
  $("header .logo-bar").prepend('<div class="fx-social-wrapper"></div>');
  // empty mask fix
  $(document.body).append('<div class="mask none"></div>');

  //search
  if ($("header .logo-bar .search-form.right").length) {
    $(".logo-bar .bbs-wrap").prepend($("header .logo-bar .search-form.right"));
  } else if ($("header .logo-bar .search__container.none").length) {
    console.log("search off...");
  } else {
    $(".logo-bar .bbs-wrap").prepend('<div class="fx-search"></div>');
  }

  //login panel
  if ($("header .login-bar").length) {
    $(".logo-bar .bbs-wrap").prepend('<div class="fx-panel"></div>');
  }

  $(".fx-panel").on("click", function () {
    $(this).toggleClass("fx-active");
    $("header .login-bar .links").toggleClass("fx-active");
  });

  // modal cart to do
  $(".logo-bar .bbs-wrap > .basket-contain").wrapAll(
    '<div class="modal modal-cart"></div>'
  );
  $(".modal-cart").prepend(
    '<div class="modal-header"><h3>' +
      $("header .logo-bar .basket > a .countlabel > span").html() +
      '</h3><div class="modal-close modal-cart-close"><span class="modal-close-txt">zamknij</span></div></div>'
  );

  $("header .logo-bar .basket").on("click", function (e) {
    e.preventDefault();
    $(".modal-cart").toggleClass("modal-visible");
    $(".mask").toggleClass("none");
  });

  $(".modal-cart-close").on("click", function (e) {
    e.preventDefault();
    $(".modal-cart").toggleClass("modal-visible");
    $(".mask").toggleClass("none");
  });

  $(".fx-search").on("click", function () {
    $(this).toggleClass("fx-active");
    $(".search__container").toggleClass("fx-active");
  });

  //welcome top
  if ($("#fx-welcome").length) {
    $("#fx-welcome").append('<i class="fx-welcome-close fa fa-times"></i>');
    $("header").prepend($("#fx-welcome"));

    $(".fx-welcome-close").on("click", function () {
      $("#fx-welcome").toggleClass("none");
    });
  }

  //social top
  if ($("#fx-social").length) {
    $(".logo-bar .fx-social-wrapper").prepend($("#fx-social"));
  }

  //social foot
  if ($("#fx-social_footer").length) {
    $(".footer .innerfooter").append($("#fx-social_footer"));
  }

  if ($("#fx-front-b").length) {
    $("#fx-front-b").find("img").wrap("<span></span>");
  }

  //blog images on main page
  if ($("#fx-blog").length) {
    $("#fx-blog").append($("#box_articlelist"));

    $("#box_articlelist article").each(function () {
      var fxImgWrap = '<div class="fx-img row"></div>';
      var fxImg = $(this).find(".article-image");

      $(this).prepend($(this).find(".article-image"));
      $(this).find(".readmore").wrapInner("<span></span>");
    });
  } else {
    $(this).find(".readmore").wrapInner("<span></span>");
  }

  //sticky

  $(window).scroll(function () {
    var scroll = $(window).scrollTop();

    if (mobileViewport.matches || $("#fx-sticky").length) {
      if (scroll >= 105) {
        $(".wrap").addClass("scrolled").removeClass("scrolled-back");
      } else {
        $(".wrap").removeClass("scrolled").addClass("scrolled-back");
      }
    }
  });

  //product page
  $("#box_productfull .maininfo > .f-row > .f-grid-6:not(.productimg)").prepend(
    $("#box_productfull .basket .addtofav"),
    $("#box_productfull .boxhead > h1.name")
  );

  const ShortDescApi = () => {
    if (typeof frontAPI != "undefined" && `${$("body").attr("id")}` != "undefined") {
      frontAPI.getProduct(
        function (product) {
          if (product.shortDescription.length) {
            $("#box_productfull .productdetails-more-details").before(
              '<div class="row fx-short_desc">' + product.shortDescription + "<div>"
            );
          }
        },
        {
          id: `${$("body").attr("id").replace(/\D/g, "")}`,
        }
      );
    } else {
      console.log("ups...");
    }
  };

  setTimeout(ShortDescApi, 2000);

  // slick ms13
  if ($("#ms13").length) {
    $(".ms13").slick({
      dots: false,
      infinite: true,
      speed: 300,
      slidesToShow: 3,
      slidesToScroll: 1,
      centerMode: true,
      variableWidth: true,
    });
  }

  // slick ms20
  if ($(".ms-slick").length) {
    $(".ms-slick").slick({
      dots: false,
      infinite: true,
      speed: 300,
    });
  }

  if ($(".ms-slick-dots").length) {
    $(".ms-slick-dots").slick({
      dots: true,
      infinite: true,
      speed: 300,
    });
  }

  // lang switch in header

  if ($("#fx-lang").length) {
    $("#box_languages_select option").each(function () {
      var x = $(this).val();

      if (x === "/" || x === "/pl/index") {
        x = "pl";
        $(this).html(x);
      } else {
        x = x.substring(1, 3);
        $(this).html(x);
      }
    });

    $("header .logo-bar .bbs-wrap").prepend($("#box_languages_select"));
    $("#box_languages").addClass("none");
  }

  //curr...

  if ($("#fx-curr").length) {
    $("#box_currencies_select option").each(function () {
      var c = $(this).val();
      c = c.split("=").pop();
      $(this).html(c);
    });

    $("header .logo-bar .bbs-wrap").prepend($("#box_currencies_select"));
    $("#box_currencies").addClass("none");
  }

  //eof curr...
});

window.onload = function () {
  if ($(".showShippingCost").length && !$(".tab-container").length) {
    $("#box_productdeliveries").wrapAll('<div class="modal modal-shipping"></div>');
    $("#box_productdeliveries .boxhead")
      .addClass("modal-header")
      .append(
        '<div class="modal-close modal-shipping-close"><span class="modal-shipping-txt">zamknij</span></div>'
      );

    $("#box_productfull .availability>.row .shipping-costs .showShippingCost").on(
      "click",
      function (e) {
        e.preventDefault();

        $(".modal-shipping").toggleClass("modal-visible");
        $(".mask").toggleClass("none");
      }
    );

    $(".modal-shipping-close").on("click", function (e) {
      e.preventDefault();
      $(".modal-shipping").toggleClass("modal-visible");
      $(".mask").toggleClass("none");
    });
  }
};

Shop.include({
  selectorFunctions: {
    boxslider: {
      selector: ".box.slider",

      load: function (slider, shopInstance) {
        var isAnimated;
        var _initialSlideWidth = 240;
        var _slideWidth;
        var _sliderWidth;
        var _visibleSlides;
        var _maxHeight = 0;
        var _autoMove = false;
        var slides;
        var sliderWrap;
        var prev;
        var next;
        var _autoMoveDuration = Shop.useroptions.slider.automove;
        var nav;
        /**
         * in xhrBox we need to know if this functiona was already called or no
         */
        slider.selectorFnTriggered = true;

        isAnimated = false;
        slider.removeClass("loading");
        shopInstance.lazypicture.lazyLoading();

        if (slider.hasClass("slider_automove")) {
          _autoMove = true;
        }

        slides = slider.find(".product");

        if (slides.length > 1) {
          sliderWrap = $('<div class="slider-wrap" />').css("text-align", "left");

          nav = $("<div />").appendTo(slider);
          prev = $('<span class="slider-nav-left" />')
            .css({
              display: "none",
            })
            .appendTo(nav);
          next = $('<span class="slider-nav-right" />')
            .css({
              display: "block",
            })
            .appendTo(nav);

          slides.wrapAll(sliderWrap);
          sliderWrap = slider.find(".slider-wrap");

          shopInstance.addEvent(
            "img:change:slider:" + slider.attr("id"),
            function () {
              sliderWrap.css("height", "auto");

              slides.each(function () {
                if ($(this).outerHeight() >= _maxHeight) {
                  _maxHeight = $(this).outerHeight();
                  sliderWrap.height(_maxHeight + 6);
                }
              });
            }
          );

          $(window)
            .on("resize", function () {
              _sliderWidth = slider.outerWidth();
              _visibleSlides = Math.floor(_sliderWidth / _initialSlideWidth) || 1;
              _slideWidth =
                (_sliderWidth - 20 * (_visibleSlides - 1)) / _visibleSlides;

              slides.each(function () {
                if ($(this).outerHeight() >= _maxHeight) {
                  _maxHeight = $(this).outerHeight();
                }
              });

              slides.outerWidth(_slideWidth);
              sliderWrap
                .outerWidth((_slideWidth + 20) * slides.length + 3)
                .height(_maxHeight + 6);

              slides.css("left", "0");

              if (slides.length > _visibleSlides) {
                next.show();
                prev.hide();
              } else {
                next.hide();
                prev.hide();
              }
            })
            .trigger("resize");

          next.on("click", function (ev) {
            ev.stopPropagation();
            if (!isAnimated) {
              slides.animate(
                {
                  left: "-=" + (_slideWidth + 20),
                },
                {
                  duration: 400,
                  start: function () {
                    isAnimated = true;
                  },
                  complete: function () {
                    var pos = parseInt($(this).css("left"), 10);

                    if (
                      (slides.length - _visibleSlides) * Math.floor(_slideWidth) <=
                      -pos
                    ) {
                      next.hide();
                    }

                    if (-pos > 0) {
                      prev.show();
                    }

                    isAnimated = false;
                  },
                }
              );
            }
          });

          prev.on("click", function (ev) {
            ev.stopPropagation();
            if (!isAnimated) {
              slides.animate(
                {
                  left: "+=" + (_slideWidth + 20),
                },
                {
                  duration: 400,
                  start: function () {
                    isAnimated = true;
                  },
                  complete: function () {
                    var pos = parseInt($(this).css("left"), 10);

                    if (-pos <= 0) {
                      prev.hide();
                    }

                    if (
                      (slides.length - _visibleSlides) * Math.floor(_slideWidth) >=
                      -pos
                    ) {
                      next.show();
                    }
                    isAnimated = false;
                  },
                }
              );
            }
          });

          slider.on("swipeleft", function () {
            if (next.is(":visible")) {
              next.trigger("click");
            }
          });

          slider.on("swiperight", function () {
            if (prev.is(":visible")) {
              prev.trigger("click");
            }
          });

          if (_autoMove) {
            setInterval(function () {
              if (next.is(":visible")) {
                next.trigger("click");
              } else {
                slides.animate(
                  {
                    left: 0,
                  },
                  600,
                  function () {
                    next.show();
                    prev.hide();
                  }
                );
              }
            }, _autoMoveDuration);
          }
        }
      },
    },
  },
});

$(document).ready(function () {
  var headerNavbarEl = document.querySelector("div > div > nav");
  if (!headerNavbarEl) return;

  headerNavbarEl.id = "fx-sticky";
});


$(document).ready(function () {
  var productsHeaderHomePage = document.querySelector("div.boxhead");
  if (!productsHeaderHomePage) return;

  productsHeaderHomePage.parentElement.removeChild(productsHeaderHomePage);
});

$(document).ready(function () {
  var newsletterIntroductionText = document.querySelector("h5.boxintro")
  var newsletterInput = document.querySelector('#box_newsletter .innerbox .newsletter-input')
  var newsletterBtnText = document.querySelector('.bottom-footer #box_newsletter .innerbox .btn.btn-red span')
 
  if (!newsletterIntroductionText || !newsletterInput || !newsletterBtnText) return

  var newsletterHead =
    newsletterIntroductionText.parentElement.previousElementSibling

  newsletterIntroductionText.parentElement.removeChild(newsletterIntroductionText)
  newsletterHead.appendChild(newsletterIntroductionText)
  
  newsletterInput.placeholder = 'Your email'
  
  newsletterBtnText.textContent = 'Sign up'
});

$(document).ready(function () {
  var topBar = document.createElement("div");
  var optionsBar = document.querySelector("div.bbs-wrap.right");

  var searchIcon = document.querySelector("div.fx-search");
  var userIcon = document.querySelector("div.fx-panel");
  var basketContainer = document.querySelector("div.bbs-wrap.right");

  if (!optionsBar || !searchIcon || !userIcon || !basketContainer) return;

  topBar.id = "top-bar";
  topBar.appendChild(searchIcon);
  topBar.appendChild(userIcon);
  topBar.appendChild(basketContainer);

  document.body.prepend(topBar);
});

$(document).ready(function () {
  var addToCartBtns = document.querySelectorAll('div.buttons button.addtobasket.btn.btn-red span');
  
  if (addToCartBtns.length == 0) return
  
  for (var i = 0; i < addToCartBtns.length; i++) {
    addToCartBtns[i].textContent = 'Add to basket'
  }
})

$(document).ready(function () {
  var colorFilter = document.getElementById('filter_option_8')
  if (!colorFilter) return
  
  colorFilter.firstElementChild.textContent = 'Colors'
})

$(document).ready(function () {
  var colorLabel = document.querySelector('#box_productfull .basket .form-basket .stocks label')
  if (!colorLabel) return
  
  colorLabel.textContent = 'Colors:'
})


function injectSocialMediaModules() {
  var socialHeader = document.getElementById('fx-social')
  var socialFooter = document.getElementById('fx-social-footer')
  
  if (!socialHeader) {
  var socialsHeaderModule = document.createElement('div')
  socialsHeaderModule.style.display = 'none'
  socialsHeaderModule.innerHTML = `<div class="fx-social-wrapper"> <div class="box resetcss box_custom" id="fx-social"> <ul> <li class="facebook"> <a href="https://www.facebook.com/winterwarmersshop/" aria-label="Facebook" target="_blank" rel="noopener nofolow" class="fa fa-facebook" ></a> </li><li class="twitter"> <a href="https://twitter.com/warmers_winter" aria-label="Twitter" target="_blank" rel="noopener nofolow" class="fa fa-twitter" ></a> </li><li class="instagram"> <a href="https://www.instagram.com/winterwarmersshop/" aria-label="Instagram" target="_blank" rel="noopener nofolow" class="fa fa-instagram" ></a> </li><li class="pinterest"> <a href="http://www.pinterest.com/winterwarmersshop" aria-label="Pinterest" target="_blank" rel="noopener nofolow" class="fa fa-pinterest" ></a> </li><li class="youtube"> <a href="https://www.youtube.com/channel/UCkUscNngHpuPJg3V_0Ve4bw?view_as=subscriber" aria-label="YouTube" target="_blank" rel="noopener nofolow" class="fa fa-youtube" ></a> </li></ul> </div></div>`
  
   document.body.prepend(socialsHeaderModule)
  }
  
  if (!socialFooter) {
    var socialsFooterModule = document.createElement('div')
  socialsFooterModule.style.display = 'none'
  socialsFooterModule.innerHTML = `<div class="box resetcss box_custom" id="fx-social-footer"><p>Find us on:</p><ul><li class="facebook"><a href="https://www.facebook.com/winterwarmersshop/" aria-label="Facebook" target="_blank" rel="noopener nofolow" class="fa fa-facebook"></a>
</li><li class="twitter"><a href="https://twitter.com/warmers_winter" aria-label="Twitter" target="_blank" rel="noopener nofolow" class="fa fa-twitter"></a>
</li><li class="instagram"><a href="https://www.instagram.com/winterwarmersshop/" aria-label="Instagram" target="_blank" rel="noopener nofolow" class="fa fa-instagram"></a></li>
<li class="pinterest"><a href="http://www.pinterest.com/winterwarmersshop" aria-label="Pinterest" target="_blank" rel="noopener nofolow" class="fa fa-pinterest"></a>
</li><li class="youtube"><a href="https://www.youtube.com/channel/UCkUscNngHpuPJg3V_0Ve4bw?view_as=subscriber" aria-label="YouTube" target="_blank" rel="noopener nofolow" class="fa fa-youtube"></a></li></ul><p>Copyrights © 2021 WINTER WARMERS SHOP</p></div>`;
  
 document.body.append(socialsFooterModule)
  }
}

$(document).ready(function () {
   // removes newsletter part in certain pages.
  
  var isAboutPage = location.href.endsWith('about')
  var isContactPage = location.href.endsWith('contact')
  var newsletterBox = document.getElementById('box_newsletter')
  
  newsletterBox.parentElement.removeChild(newsletterBox)
})

$(document).ready(function () {
  // this only applies to /about page
  
  var isAboutPage = location.href.endsWith('about')
  var aboutPageBox = document.querySelector('div.innerbox div.resetcss')
  
  if (!isAboutPage || !aboutPageBox) return
  
  // add the heading.to the page
  if (isAboutPage) {
    var heading = document.createElement('h1')
  	heading.textContent = 'About Winter Warmers'
  
  	aboutPageBox.prepend(heading)
  }
})

$(document).ready(function () {
  var isSlashPage = location.href.includes(location.origin + '/')
  var isAboutPage = location.href.endsWith('about')
  var isContactPage = location.href.endsWith('contact')
  var isLookbooksPage = location.href.endsWith('gallery-list')
  var areCategoryPages = location.href.includes('/category') 
  
  var logo = document.querySelector('div.wrap header.row .logo-bar')
  
  
  switch (true) {
    case isContactPage: {
      if (logo) {
   		 logo.style.justifyContent = "normal"
  	  }
      break;
    };
    case isLookbooksPage:  {
      if (logo) {
   		 logo.style.justifyContent = "normal"
  	  }
      break;
    };;
    case isAboutPage:  {
      if (logo) {
   		 logo.style.justifyContent = "normal"
  	  }
      break;
    };;
    case areCategoryPages:  {
      if (logo) {
   		 logo.style.justifyContent = "normal"
  	  }
      break;
    };
    case isSlashPage: break;
    default: {
      return;
    }
  }
 
  // inject socials modules
  injectSocialMediaModules()
})

$(document).ready(function () {
  var socialsList = document.querySelector("div.fx-social-wrapper");
  var menuListDesktop = document.querySelector(
    "div > div > nav > ul.menu-list.large,standard"
  );
  if (!socialsList || !menuListDesktop) return;

  var socialLiEl = document.createElement("li");
  socialLiEl.innerHTML = socialsList.outerHTML;

  menuListDesktop.appendChild(socialLiEl);

  socialsList.parentElement.removeChild(socialsList);
});

$(document).ready(function () {
  var socialsFooter = document.querySelector('.footer .innerfooter ul.overall > li:last-child')
  var socialsList = document.getElementById('fx-social-footer')
  if (!socialsFooter || !socialsList) return
  
  socialsList.parentElement.removeChild(socialsList)
  
  socialsFooter.innerHTML = socialsList.outerHTML
})

$(document).ready(function() {
  var isBlogPage = location.href.endsWith('blog')
  
  var commentBox = document.getElementById('box_articlecomments')
  var newsletterBox = document.getElementById('box_newsletter')
  
  var articleRowToReplace = document.querySelector('article .article-info')
  var articleDate = document.querySelector('span.article-date')
  var articleAuthor = document.querySelector('span.article-author')
  
  
  if (!isBlogPage || !commentBox || !newsletterBox || !articleDate || !articleAuthor || !articleRowToReplace) return
  
  commentBox.parentElement.removeChild(commentBox)
  newsletterBox.parentElement.removeChild(newsletterBox)
  
  var splittedArticleDate = articleDate.textContent.split('-')
  var date = splittedArticleDate[1] + '-' + splittedArticleDate[0] + '-' + splittedArticleDate[2]
  var splittedDate = new Date(date).toDateString().split(' ')
  var newArticleDate = splittedDate[2] + " " + splittedDate[1] + " " + splittedDate[3]
  
  var articleInfo = document.createElement('p')
  articleInfo.textContent = articleAuthor.textContent + ", " + newArticleDate
  articleInfo.id = 'article-info-blog'
  
  articleRowToReplace.innerHTML = articleInfo.outerHTML
})

$(document).ready(function() {
  var filterBrand = document.getElementById('filter_producer')
  if (!filterBrand) return
  
  filterBrand.firstElementChild.textContent = 'Brand:'
})

$(document).ready(function() {
  var colorFilter = document.getElementById('filter_option_8')
  if (!colorFilter) return
  
  var filterHeading = document.createElement('p')
  filterHeading.textContent = 'FILTER'
  
  var clearFilterBtn = document.createElement('button')
  clearFilterBtn.textContent = 'Clear all filters'
  clearFilterBtn.id = 'clear-filter-btn'
  clearFilterBtn.onclick = function() {
    var noFiltersURL = location.href.substring(0, location.href.indexOf('/1/')) || location.href
    location.href = noFiltersURL
  }
  
  var filterHeader = document.createElement('div')
  filterHeader.id = 'filter-header'
  
  filterHeader.appendChild(filterHeading)
  filterHeader.appendChild(clearFilterBtn)
  
  colorFilter.prepend(filterHeader)
  
  
  
  var brandFilter = document.getElementById('filter_producer')
  var materialFilter = document.getElementById('filter_option_9')
  if (!brandFilter || !materialFilter) return
  
  materialFilter.appendChild(brandFilter)
  
  var filterHeaders = document.querySelectorAll('.s-grid-3 #box_filter .innerbox .group-filter')
  var colorHeading = document.getElementById('filter-header')
  if (filterHeaders.length == 0 || !colorHeading) return
  
  
  for (var i = 0; i < filterHeaders.length; i++) {
    filterHeaders[i].firstElementChild.classList.add('filter-heading')
  }
  colorHeading.classList.remove('filter-heading')
  colorHeading.firstElementChild.classList.add('filter-heading')
  colorHeading.nextElementSibling.classList.add('filter-heading')
  
  
  
  var categoryHeader = document.querySelector('#box_mainproducts.box .boxhead>h1')
  if (!categoryHeader) return
  
  var filterBtn = document.createElement('button')
  filterBtn.id = 'filter-button-mobile'
  filterBtn.innerHTML = '<span>Filter</span>'
  filterBtn.onclick = function() {
    var modal = document.getElementById('filter-modal-mobile')
  	var filterBtn = document.getElementById('filter-button-mobile')
  	var filtersContainer = document.getElementById('box_filter')
    
    if (!modal || !filterBtn || !filtersContainer) return
    
    var cloneFilterContainer = filtersContainer.cloneNode(true)
    var cloneFilterBtn = filterBtn.cloneNode(true)
    cloneFilterBtn.textContent = 'Close'
    
    cloneFilterBtn.onclick = function() {
      document.body.style.overflow = ''
      modal.classList.toggle('filter-modal-mobile_active')
 
      modal.innerHTML = ''
      
      return
    }
    
   
    modal.classList.toggle('filter-modal-mobile_active')

    cloneFilterBtn.classList.add('filter-button-mobile_active')
    cloneFilterContainer.classList.add('filter-container-mobile_active')
    
    modal.appendChild(cloneFilterContainer)
    modal.appendChild(cloneFilterBtn)
    
    document.body.style.overflow = 'hidden'
  }
  
  var filterModalMobile = document.createElement('div')
  filterModalMobile.id = 'filter-modal-mobile'
  
  categoryHeader.insertAdjacentElement('afterend', filterBtn)
  document.body.append(filterModalMobile)
})