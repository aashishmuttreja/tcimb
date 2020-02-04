/* handle IE9 console problem */
if (!window.console) { 
  window.console = {
    log: function () {},
    debug: function () {},
    info: function () {},
    warn: function () {},
    error: function () {}
  }; 
}

// Gumby is ready to go
Gumby.ready(function() {
    Gumby.log('Gumby is ready to go...', Gumby.dump());

    // placeholder polyfil
    if (Gumby.isOldie || Gumby.$dom.find('html').hasClass('ie9')) {
        $('input, textarea').placeholder();
    }

    // skip link and toggle on one element
    // when the skip link completes, trigger the switch
    $('#skip-switch').on('gumby.onComplete', function() {
        $(this).trigger('gumby.trigger');
    });

    // Oldie document loaded
}).oldie(function() {
    Gumby.warn("This is an oldie browser...");

    // Touch devices loaded
}).touch(function() {
    Gumby.log("This is a touch enabled device...");
});

$(function() {
    $(".m-nav-back-btn").click(function(e) {
        e.preventDefault();
    })
    $(".title-w-hyperlinks .inline-dropdown .cur-title").html($(".title-dropdown li.selected a").html());

    //external links    
    $(".external-links .switch").click(function() {
        $("#external-site").find(".more-link").prop("href", $(this).attr("external-link"));
    });
    $("#external-site .more-link").click(function() {
        $('#external-site .close').trigger('gumby.trigger');
    });

    $(".external, .manualswitch").click(function() {
        $("body").find("#external-site .more-link").prop("href", $(this).attr("external-link"));
    });

    $(".switch").click(function() {
        var obj = $(this)
        if (obj.attr("data-subject")) {
            $(".form-main-subject").html(obj.attr("data-subject")),
                $(".hidden-subject").val(obj.attr("data-subject"));
        }
    });

    //Grab data-category detail
    // $(".switch").click(function() {
    //     var category = $(this).data("category");
    // });

    //Refresh page after close LUCY popup

    $('#submit_success_popup a').click(function(e) {
        location.reload(true);
    });

    // Show/Hide Content
    $(".see-less-details-btn a").click(function() {
        var obj = $(this)
        var objContent = obj.parents(".show-hide-content").find(".hide-content")
        objContent.slideToggle(200, function() {
            obj.toggleClass("active");
        })

    })

    // Jill @ XM Asia
    // Adding responsiveness to the table
    $(".two-columns-answer table, .faq-listing-answer table, .text table, .loan-repayment-table-container table, .calc-mortgage-table table").wrap("<div class='table-respond'></div>");

    // Jill @ XM Asia
    // FAQ Listing Controls
    $(".faq-listing-control a").click(function() {
        $(this).parents(".faq-listing").find(".faq-listing-hide").slideToggle();
        $(this).toggleClass("active");
    });

    // Jill @ XM Asia
    // Mobile Navigation for Two Columns (FAQ & Rates & Charges)
    // $(".m-hassub i, .two-columns-mobile-nav .title-dropdown li:first-child a:first-child").click(function(){

    //     var obj = $(this)
    //     var objNext = obj.next()
    //     if(objNext.hasClass("m-sublist"))
    //     {
    //         obj.toggleClass("icon-roundl_bottom2")   
    //         .toggleClass("icon-roundl_top2")
    //     }
    //     obj.parents("li").find(".m-sublist").slideToggle()
    // })

    //modified by Shen Li for easier usability/tapping on mobile

    $(".title-dropdown li a").click(function() {
        var obj = $(this)
        var objIcon = $(this).parent().find('.m-hassub i')

        {
            objIcon.toggleClass("icon-roundl_bottom2")
                .toggleClass("icon-roundl_top2")
        }
        obj.parents("li").find(".m-sublist").slideToggle()
    })

    // Jill @ XM Asia
    // Adding a class .selected to the last-child breadcrumb
    $(".breadcrumbs-item:last-child a").addClass("selected");
    // Addon
    $(".breadcrumbs-item:last-child a.selected").parent().addClass("removearrow");

})

// For Promo Listing
$(document).ready(function() {
    setAllToMaxHeight($(".promo-item"));
})

$(window).resize(function() {

    setAllToMaxHeight($(".promo-item"))
})

function hasHorizontalScrollBar(ele) {

    if (ele[0].scrollWidth > ele.width())
        return true;
    else
        return false;
}


function setAllToMaxHeight(ele) {

    ele.css("height", "auto")
        // console.log($.map( ele , function(e){ return $(e).height() }));
    return ele.height(Math.max.apply(ele, $.map(ele, function(e) {
        return $(e).height()
    })));
}

function setAllToMaxHeightWithHiddenElements(ele) {

    ele.css("height", "auto")
        // console.log($.map( ele , function(e){ if($(e).is(':visible')) return $(e).height(); else return 0; }) );
    return ele.height(Math.max.apply(ele, $.map(ele, function(e) {
        if ($(e).is(':visible')) return $(e).height();
        else return 0;
    })));
}


function bannerResize() {
    var totalBanner = $(".banner-brief-items li").length;
    var windowWidth = $(window).width();

    if (windowWidth >= 1006)
        windowWidth = 270;

    var item_width = windowWidth;

    $(".banner-brief-panel").css("width", windowWidth)
    $(".banner-brief-items").css("width", (windowWidth * (totalBanner + 1)));
    $(".banner-brief-items li").css("width", (windowWidth - 40));
    $(".banner-brief-viewport").css("width", windowWidth);
    //$(".banner-all-promotions-link").css("width",(windowWidth - 40))
    $('.banner-brief-items').css({
        'margin-left': -(item_width)
    });

}

function resizeBannerContent() {
    // Disabled because it's cropping promotion tiles where $(".full-width-img") appears
    // $('.promotion-banner-mask-2-col').css({
    //     width: $(".full-width-img").width() + "px",
    //     height: $(".full-width-img").height() + "px"
    // })
}

function resizeMobileSecuredDropdown(windowHeight) {
    var primaryLogo = $(".header-primary-cimb-logo").height()
    var mobileSecuredNavHeight = $(".mobile-secured-nav").height()
    if (windowHeight > mobileSecuredNavHeight)
        $(".mobile-secured-nav").css("height", windowHeight + 50)
        //$(".mobile-secured-nav").css("height",windowHeight)
    else
        $(".mobile-secured-nav").css("height", ($(window).height() - primaryLogo))



}

function resizeSearch(windowHeight) {

    var obj = $(".search-container")

    var searchWrapperHeight = obj.height()


    var aHeight = $(".t-most-header").height()
    var bHeight = $(".header-primary").height()


    /*
    cHeight = parseInt(cHeight) 
    cHeight = cHeight - 40
    */

    if ($(".t-most-header").css("display") == "block")
        obj.css("height", (windowHeight - (aHeight + bHeight)))
    else
        obj.css("height", (windowHeight - (bHeight)))


    if ($(".search-popup").css("display") == "block") {
        offHTMLBodyScroll()
    }



}



function resizeMobileMainDropdown() {
    var a = $(".mobile-main-segment").height()
    var b = $(".mobile-cimb-logo").height() + parseInt($(".mobile-cimb-logo").css("padding-top")) + parseInt($(".mobile-cimb-logo").css("padding-bottom"))




    var viewportHeight = $(window).height() - (a + b)

    //lilsizzo$(".mobile-mega-sitemap-nav").css("height",viewportHeight)
    $(".mobile-mega-dropdown").css("height", $(window).height())


    //$(".mobile-mega-dropdown").css("height",($(window).height() +20))
    //$(".mobile-mega-sitemap-second-tier-menu").css("height",viewportHeight)

}

function mobileSecureSlideUp(obj, windowHeight) {
    $(".mobile-secured-dropdown").slideUp("normal", function() {
        obj.addClass("mobile-secured-opened")

        onHTMLBodyScroll()
        resizeMobileSecuredDropdown(windowHeight)
        $(".header-login-panel .icon").removeClass("bg-gray6")
    })
}

function doSearch(type) {

    $('.search-wrapper').show()

}

function openURL(url) {
    // do URL tracking AJAX here before forwarding
    window.location = url;
}

$(function() {

    $('audio,video').mediaelementplayer({
        plugins: ['flash', 'silverlight']
    });

    $(window).on("resize scroll", scrollingForSectionWithHyperLink).trigger("scroll")

    // $(".specifiy-investment-enq-input").click(function(){
    //     $(".specifiy-investment-enq").toggle()
    // })


    $(".title-right-hyperlink-nav").click(function() {

        $(this).next().slideToggle()
    })

    $('a.jumpto[href*="#"]:not([href="#"])').click(function() {

        // alert('woohoo');

        var topOffset = $(this).attr("topOffset")
        topOffset = 135


        if ($(window).width() < 1000) {
            $(".hyperlink-listing").slideUp();
            // topOffset = 45
        }

        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name="' + this.hash.slice(1) + '"]');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top - topOffset
                }, 700);

            }
        }
    });

    $(".top-btn").click(function() {
        $("html, body").animate({
            scrollTop: 0
        }, "10");
    })

    var windowHeight = $(window).height();
    $(".in-page-siderbar-placeholder").click(function() {
        $(".in-page-siderbar-nav").slideToggle()
    })


    //header global site drop down
    $(".global-site-dropdown a").click(function(e) {
        $(".global-sites-nav").slideToggle();
        e.preventDefault()
    })

    //external links    
    $(".external-links.switch").click(function() {
        //console.log($(this).attr("external-link"))
        $("#external-site").find(".go-external-site").prop("href", $(this).attr("external-link"));
    });
    $("#external-site .go-external-site").click(function() {
        $('#external-site .close').trigger('gumby.trigger');
    });


    //responsive for the long list to a drop down
    $(".title-right-hyperlink-nav").click(function() {
        var obj = $(this)
        obj.next().slideToggle()

        $(".icon-class", obj).toggleClass("icon-minus4")
        $(".icon-class", obj).toggleClass("icon-plus4")

    })



    $('.two-columns-mobile-nav .dropdown-btn,.title-w-hyperlinks .dropdown-btn,.title-all .dropdown-btn').click(function(e) {

        var obj = $(this)
            //$(".hyperlink-listing").hide()
        obj.next().next().slideToggle(200);

        $(".icon-class", obj).toggleClass("icon-roundl_bottom2")
        $(".icon-class", obj).toggleClass("icon-roundl_top2")
    });



    //responsive for the pills long list to drop down
    $(".pill.tab.cur-title").html($(".tab-nav li.active a").html())
    $(".dropdown-btn2").click(function() {
        var obj = $(this)
        var obj2 = $(this).parent().next()

        obj2.slideToggle(200)

        $(".icon-class", obj).toggleClass("icon-roundl_bottom2")
        $(".icon-class", obj).toggleClass("icon-roundl_top2")
    })

    $(".dropdown-btn3").click(function() {
        var obj = $(this)
        var obj2 = $(this).parent().next().children('.tab-nav-listing')

        obj2.slideToggle(200)

        $(".icon-class", obj).toggleClass("icon-roundl_bottom2")
        $(".icon-class", obj).toggleClass("icon-roundl_top2")
    })

    var windowWidth = $(window).width();
    if (windowWidth <= 768) {
        $('.tab-nav-listing').hide();
    }

    $(window).resize(function() {
        if ($(window).width() > 1020) {
            $(".shared-nav .tab-nav").css("display", "table");
        } else {
            $(".shared-nav .tab-nav").css("display", "none");
        }
    })

    // $(window).resize(function(){
    //     if($(window).width() > 768) {
    //         $(".shared-nav-list .tab-nav-listing").css("display","block");

    //     } else {
    //         $(".shared-nav-list .tab-nav-listing").css("display","none");
    //     }
    // })



    //faq
    // Jill @ XM Asia
    // Commented out because this is intefering with the Show/Hide Content Component
    // $(".see-less-details-btn").click(function(){
    //     var obj = $(this)
    //     var iconObj = $(".icon",obj)
    //     var objContent = obj.parent().parent().prev() 
    //     objContent.slideToggle(200,function(){

    //         if(iconObj.hasClass("icon-core_solid_arrow_down"))
    //         {
    //             iconObj.removeClass("icon-core_solid_arrow_down")
    //                 .addClass("icon-core_solid_arrow_up")
    //             $(".less-more-text",obj).text("less")
    //         }
    //         else
    //         {
    //             iconObj.removeClass("icon-core_solid_arrow_up")
    //                 .addClass("icon-core_solid_arrow_down")

    //             $(".less-more-text",obj).text("more")
    //         }
    //     })


    // })


    //promo listing page and all.php
    $(".nav-hyperlink .cur-title").html($(".nav-hyperlink li.selected-nav a").html())
    $('.nav-hyperlink .dropdown-btn').click(function(e) {
        var obj = $(this)
        obj.next().next().children().slideToggle(200);

        $(".icon-class", obj).toggleClass("icon-roundl_bottom2")
        $(".icon-class", obj).toggleClass("icon-roundl_top2")


    });

    $(".nav-hyperlink-list li").click(function() {
            var obj = $(this)
            var mainObj = obj.parent().parent().parent().parent().parent()

            //promotion listing page vs all.php
            if (!obj.hasClass("nav-selected") && !obj.hasClass("non-mobile")) {
                $(".nav-hyperlink-list li", mainObj).removeClass("selected-nav")
                obj.addClass("selected-nav")
                if (!mainObj.hasClass("ajax-nav-hyperlink")) {

                    $(".nav-hyperlink-tab-content", mainObj).hide()
                    $(".nav-hyperlink-tab-content[for=" + this.id + "]", mainObj).show()

                    $(".cur-title", mainObj).html($(".nav-hyperlink-list ul li.selected-nav a", mainObj).html())
                    $(".dropdown-btn .icon-class", mainObj).toggleClass("icon-roundl_bottom2")
                        .toggleClass("icon-roundl_top2")

                    if (!$('.nav-hyperlink .dropdown-btn').is(":hidden"))
                        $(".nav-hyperlink-list ul", mainObj).slideUp()



                }
                // Disabled by Shen Li, 20140722  
                // else
                // {
                //     $(".nav-hyperlink-ajax-content",mainObj).html("ajax")

                // }                            
            }

        })
        //$(".nav-hyperlink-tab-content[for="++]")

    $(window).resize(function() {


        if ($(window).width() > 1000) {
            $(".nav-hyperlink ul").css("display", "table")
            $('.nav-hyperlink .dropdown-btn .icon-class').addClass("icon-arrow-down")
                .removeClass("icon-arrow-up")
        } else {
            $(".nav-hyperlink ul").css("display", "none")

        }

    })


    $(window).resize(function() {
        var objWin = $(window)


        var windowHeight = objWin.height();
        //console.log($(window).width())
        resizeBannerContent()
        resizeMobileSecuredDropdown(windowHeight)
        resizeMobileMainDropdown()

        mobileSecureSlideUp($(".mobile-secured-nav-close-btn"), windowHeight)
        offListDropDown()
        resizeSearch(windowHeight)
        $(".search-overlay").css("height", $("body").height())

        if (objWin.width() > 1000) {
            $(".mobile-mega-dropdown").hide()
            secondTierDefault()



        }

        $(".title-right-hyperlink-nav").next().hide()
        var objDDBtn = $(".mobile-only.dropdown-btn").parent()
        if ($(".mobile-only.dropdown-btn").css("display") == "block") {
            objDDBtn.find(".hyperlink-listing").hide()

        } else
            objDDBtn.find(".hyperlink-listing").show()



    })

    $(window).load(function() {

        var windowHeight = $(window).height();
        var windowWidth = $(window).width();
        resizeBannerContent()
        resizeMobileSecuredDropdown(windowHeight)
        resizeMobileMainDropdown()


        $(".search-overlay").css("height", $("body").height())
        $(".mobile-mega-nav-close-btn").click(function() {
            offListDropDown()
        })

        $(".list-more-btn").click(function(e) {
            hideSearchOverlay()
            if ($(".mobile-secured-dropdown").css("display") != "none") {
                //check if the login is down already, pull it back up   
                mobileSecureSlideUp($(".mobile-secured-dropdown"), windowHeight)
            }



            $(".mobile-mega-dropdown").slideDown("normal", function() {
                offHTMLBodyScroll()
            })

            mobileSecureSlideUp($(".mobile-secured-nav-close-btn"), windowHeight)
            e.preventDefault()
        })
        $(".login-btn").click(function() {

            hideSearchOverlay()

            var obj = $(window)
            var obj2 = $(".mobile-secured-dropdown")

            if (obj.width() < 1000) {
                if (obj2.css("display") == "none") {
                    // $(".header-login-panel .icon").addClass("bg-gray6")    
                    $(".mobile-secured-dropdown").slideDown("normal", function() {
                        $(".mobile-secured-nav-close-btn").addClass("mobile-secured-opened")


                        offHTMLBodyScroll()

                        resizeMobileSecuredDropdown(windowHeight)
                    })
                }
            }
        })
        $(".mobile-secured-nav-close-btn").click(function() {
            hideMobileLogin($(this), windowHeight)
        })


        $(".search-btn").click(function(e) {


            $("html, body").animate({
                scrollTop: 0
            }, "10", function() {

                $(".search-popup").show()
                $(".search-field").focus()
                $(".search-icon-bottom-blackbar").addClass("active")

                $("i.icon-core_search", this).removeClass("bg-red2")
                $("i.icon-core_search", this).addClass("active")
                    // offHTMLBodyScroll()
                    // resizeSearch(windowHeight)


            });

            var windowHeight = $(window).height();
            $("html,body").height(windowHeight).addClass("overY")
            resizeSearch(windowHeight)

            hideMobileLogin($(".mobile-secured-nav-close-btn"), windowHeight)

            e.preventDefault()

        })

        $(".search-close-btn").click(function(e) {
            //$(".search-container").css("height","auto")

            $("html,body").height(windowHeight).removeClass("overY")

            hideSearchOverlay()

            e.preventDefault();

        })


        $(".search-filter-item").click(function() {
            $(".search-filter-item").removeClass("active-filter")
            $(this).addClass("active-filter")
        })



        $(".header-secondary-nav-mega-dropdown").mouseover(function() {
                var obj = $(this)
                obj.prev().addClass("hover-active")
            })
            .mouseleave(function() {
                var obj = $(this)
                obj.prev().removeClass("hover-active")
            })


        $(".home-notices.flexslider").flexslider({
            controlsContainer: ".home-notices-nav-control",
            //manualControls: ".home-flex-control-nav li a",
            animation: "slide",
            touch: false,
            controlNav: true,
            start: function() {
                $(".search-overlay").css("height", $("body").height())
            }
        })


        $(".home-main-banner-desc.flexslider").flexslider({
            slideshowSpeed: 6000,
            animation: "slide",
            controlNav: false,
            touch: false,
            after: function() {

            },
            before: function(slider) {
                
            }
        })


        $('.home-main-banner.flexslider').flexslider({
            controlsContainer: ".banner-rounded-nav-control",
            slideshowSpeed: 6000,
            //manualControls: ".flex-control-nav li a",
            animation: "slide",
            controlNav: true,
            touch: false,
            start: function() {
                $(".search-overlay").css("height", $("body").height())
                $(".home-main-banner-desc-wrapper").show()
            },
            before: function(slider) {
                var buttonClicked = slider.animatingTo
                var currentSlide = slider.currentSlide
                $('.home-main-banner-desc.flexslider').flexslider(buttonClicked)
            }
        });


        $(".banner-arrow-nav-control .flex-buttons").click(function() {
            var obj = $(this)
            var direction = obj.attr("direction")
            $('.home-main-banner-desc.flexslider').flexslider(direction)
            $('.home-main-banner.flexslider').flexslider(direction)
        })





        $(".mmsn-main").each (function (index, item) {
                $(item).click(function(e) {

                var obj = $(this)
                var li = $(this).parents ('li');

                var tier2div = $(li).find ('.mobile-mega-sitemap-second-tier-menu');
                var tier2ul = $(tier2div).find ('.mobile-second-tier-list');
                var isempty = true;
                $(tier2ul).find ('li').each (function (lix, li) {
                    if (!$(li).is (':empty'))
                    {
                        isempty = false;
                    }
                });
                if (isempty === true) {
                    // do nothing
                }
                else
                {
                    obj.next().slideToggle();
                    e.preventDefault();
                }

                
            })

            $(document).ready(function(){
                // Hide h-m-d if no sub items
                $(".h-m-d-bottom").each (function(index, item){
                    var hmditems = $(item).find('.h-m-d-services-items');
                    if (hmditems.length == 0) {
                        $(item).hide();
                    }
                });
            })

        });




    })


    // $(".sticky-nav-dd-title").click(function(){
    //     $(".sticky-nav-dd").slideToggle()
    // })
    // $(".sticky-nav-dd li a").click(function(){
    //     $(".sticky-nav-dd-title").html($(this).html());
    //     $(".sticky-nav-dd").slideToggle()
    // })

    $(".sticky-nav-dropdown").click(function() {
        var obj = $(this);

        $("i.icon", obj).toggleClass("icon-plus3")
            .toggleClass("icon-minus3")
        $(".sticky-nav-dd", obj).slideToggle()
    })
    $(".sticky-nav-dd li a").click(function() {
        $(".sticky-nav-dd-title").html($(this).html());

    })

    $(document).click(function(e) {
        var obj = $(".sticky-nav-dd")
        if ($(e.target).closest('.sticky-nav-dropdown').length === 0 && !obj.is(":hidden") && !obj.is(":animated")) {
            obj.slideToggle()
        }
    });


})


function secondTierDefault() {
    /*
    $(".mobile-mega-sitemap-second-tier-menu").animate({
        left : "1000px"
    })
    */
    //$(".mobile-mega-sitemap-second-tier-menu").slideToggle()
}


function hideSearchOverlay() {

    $(".search-popup").hide();


    $(".search-icon-bottom-blackbar").removeClass("active")
    $('.search-wrapper').hide()
    $(".search-btn i.icon-core_search").addClass("bg-red2")
    $(".search-btn i.icon-core_search").removeClass("active")
    onHTMLBodyScroll()

}


function hideMobileLogin(obj, windowHeight) {

    var openBool = obj.hasClass("mobile-secured-opened")

    if (openBool) {
        mobileSecureSlideUp(obj, windowHeight)
    }
}

function offHTMLBodyScroll() {
    $("body,html").css("height", $(window).height())
        .css("overflow-y", "hidden")
}

function onHTMLBodyScroll() {
    $("body,html").css("height", "auto")
        .css("overflow-y", "")
}

function offListDropDown() {
    $(".mobile-mega-dropdown").slideUp("normal", function() {

        onHTMLBodyScroll()
        secondTierDefault()
    })
}

//faq
// Jill @ XM Asia
// Commented this out because we don't need this anymore
// $(document).ready(function(){
//     setAllToMaxHeight($(".faq-column"))
// })
// $(window).resize(function(){
//     setAllToMaxHeight($(".faq-column"))
// })

///investment tables
$(document).ready(function() {
    setAllToMaxHeight($(".conversion-columns"))
})
$(window).resize(function() {
    setAllToMaxHeight($(".conversion-columns"))
})

///investment tables

$(document).ready(function() {
    setAllToMaxHeight($(".share-trade-content"))
})
$(window).resize(function() {
    setAllToMaxHeight($(".share-trade-content"))
})

// Jill @ XM Asia
// Commented this out because we don't need this anymore
// $(document).ready(function(){
//     setAllToMaxHeight($(".rates-column"))
// })
// $(window).resize(function(){
//     setAllToMaxHeight($(".rates-column"))
// })


///tools
$(document).ready(function() {
    setAllToMaxHeightWithHiddenElements($(".compare-filtered-item"))
    $(window).afterResize(function() {
        setAllToMaxHeightWithHiddenElements($(".compare-filtered-item"));
    }, true, 100);
    // $(window).resize(function(){
    //     setAllToMaxHeight($(".compare-filtered-item"))
    // })
})

if ($(".two-columns-mobile-nav .sticky-nav-comp").length > 0) {
    var objCardsList = $(".two-columns-mobile-nav")

    $(".cur-title", objCardsList).html($(".title-dropdown li.selected a").html())
}

$(".two-columns-sidebar li a").click(function() {
    var obj = $(this)

    if ($("i", obj).hasClass("icon-roundl_bottom2")) {
        $(".two-columns-sidebar .leftside-comp-nav>ul>li").removeClass("selected")
        $(".two-columns-sidebar .leftside-comp-nav ul li i").removeClass("icon-roundl_top2")
            .addClass("icon-roundl_bottom2")
        $("i", obj).toggleClass("icon-roundl_top2")
        $("i", obj).toggleClass("icon-roundl_bottom2")

        $(".two-columns-sidebar .leftside-comp-nav>ul>li>ul").hide()
        obj.parent().toggleClass("selected")
        obj.next().slideToggle()
    }
})


//addedHack for first child to have icon round top
$(".two-columns-nav li.selected i").removeClass("icon-roundl_bottom2").addClass("icon-roundl_top2");


function scrollingForSectionWithHyperLink() {

    $('.section-header-small').each(function() {
        var itemOffset = Math.abs($(this).offset().top);
        var windowTop = $(window).scrollTop();
        //console.log(itemOffset + " and " +   windowTop)
        if (itemOffset > 0 && itemOffset < windowTop) {

            $(".section-header").show()
                // $(".sticky-nav-container").show()
                // edited to hide sticky nav from appearing on desktop view
            var width = $(window).width();
            if (width >= 1020) {
                $(".sticky-nav-container").hide()
            } else {
                $(".sticky-nav-container").show()
            }

        } else {

            $(".section-header").hide()
            $(".sticky-nav-container").hide()
        }
    });



}

/* SLIDER COMPONENT CONTROLLER --------------------------------------- */
var activeslider = null;
var activeSliderMin = 0;
var activeSliderMax = 0;
var activeSliderPrefix = '';
var activeSliderSufix = '';

function sliderSetvalue(sliderdiv, val) {

    if ($(sliderdiv).length) {

        var swrapper = $(sliderdiv).parent()
        var maxval = parseInt(swrapper.attr('maxval'));
        var minval = parseInt(swrapper.attr('minval'));
        var ww = parseInt(swrapper.find('.slider-bar').css('width')) - 20;
        // var ww = parseInt(swrapper.find('.slider-bar').css('width'));

        var perc = (val - minval) / (maxval - minval)
        var wpos = perc * ww

        if (wpos > ww) {
            wpos = ww
        }

        wpos -= 10;

        // label display
        var _prefix = (swrapper.attr('labelprefix') == undefined ? "" : swrapper.attr('labelprefix'));
        var _suffix = (swrapper.attr('labelsuffix') == undefined ? "" : swrapper.attr('labelsuffix'));
        var _maxvallabel = (swrapper.attr('labelmax') == undefined ? "" : swrapper.attr('labelmax'));
        var _stepval = (swrapper.attr('stepval') == undefined ? 1 : parseInt(swrapper.attr('stepval')));


        if (val < maxval) {
            _maxvallabel = '';
        }

        val = Math.round(val / _stepval) * _stepval

        swrapper.find('.slider-bar-elapsed').css('width', wpos + 'px')
        $(sliderdiv).css('margin-left', wpos + 'px')
            // Added
        $('.slider-value-move').css('margin-left', wpos + 'px')


        var labeldiv = $(sliderdiv).parent().attr('labeldiv');
        var labeldivabs = $(sliderdiv).parent().attr('labeldivabs');
        //
        if (labeldivabs != '' && labeldivabs != null) {
            $('.' + labeldivabs).html(_prefix + val + _maxvallabel + _suffix);
        } else if (labeldiv != '' && labeldiv != null) {
            $(sliderdiv).siblings('.' + labeldiv).children('span').html(_prefix + val + _maxvallabel + _suffix)
        } else {
            if ($('.find-right-card').length > 0) {
                //For Credit Card v02
                $(sliderdiv).siblings('.filter-label').children('.slider-value-disp').html(val + _maxvallabel + _suffix);
                $('.input-income').val(val + _maxvallabel + _suffix);
            } else {
                $(sliderdiv).siblings('.filter-label').children('.slider-value-disp').html(_prefix + " " + val + _maxvallabel + _suffix)
            }
        }

        // progress for red dot
        swrapper.find('.slider-bar .slider-marker').each(function() {
            if (parseInt($(this).data('perpos')) < (perc * 100)) {
                $(this).find('.slider-dot-grey').addClass('slider-dot-red')
            } else {
                $(this).find('.slider-dot-grey').removeClass('slider-dot-red')
            }
        })
    }
}



$(document).ready(function(e) {

    if ($('.slider-dot-handle').length) {

        $(document).mousemove(function(e) {
            if (activeslider != null) {
                var parentOffset = activeslider.siblings('.slider-bar').offset();
                var ww = parseInt(activeslider.siblings('.slider-bar').css('width')) - 20;
                var xx = (e.pageX - parentOffset.left);

                xx -= 5;
                if (xx > ww) {
                    xx = ww;
                } else if (xx < -5) {
                    xx = -5;
                }
                var perc = (xx + 5) / ww
                if (perc > 1) {
                    perc = 1;
                }


                var disp = Math.floor(perc * (activeSliderMax - activeSliderMin)) + activeSliderMin;
                sliderSetvalue(activeslider, disp)

                // further update related data

                activeslider.parent().attr('currentperc', perc);

                refreshForeignCurrencyFDRate()
                refreshFDrates();
                updateHomeLoanAffordability()
                updateCarLoanAffordability();
            }
        });


        $('.slider-dot-handle').mousedown(function(e) {
            activeslider = $(this);
            activeSliderMin = parseInt($(this).parent().attr('minval'));
            activeSliderMax = parseInt($(this).parent().attr('maxval'));
            activeSliderPrefix = $(this).parent().attr('labelprefix');
            activeSliderSufix = $(this).parent().attr('labelsufix');

        });

        $(document).mouseup(function(e) {
            activeslider = null
        });
    }


});

/* SLIDER COMPONENT CONTROLLER --------------------------------------- END */


var foreignfdrate_month
var foreignfdrate_currency = 0;

function refreshForeignCurrencyFDRate() {

    var obj = $('.foreigncurrency-fd-valueslider')

    if (obj.length > 0) {
        var i
        var perc = parseFloat(obj.attr('currentperc'));
        var ddata = RATES_FD_FOREIGNC[foreignfdrate_currency];

        var showdata, showtenure
        var showlabel = ddata.code

        if (perc < 0.02) {
            // day
            showdata = ddata.day
            showtenure = "1 " + durationLabelDay;
        } else if (perc < 0.07) {
            // week
            showdata = ddata.week
            showtenure = "1 " + durationLabelWeek;
        } else {
            //months
            var minperc = 0.07
            var maxperc = 1.01
            var inc = (maxperc - minperc) / 12

            for (i = ddata.month.length - 1; i >= 0; i--) {
                if (((i * inc) + minperc) < perc) {
                    showdata = ddata.month[i]
                    showtenure = (i + 1) + ' ' + durationLabelMonths;

                    if (i == 0) {
                        showtenure = "1 " + durationLabelMonth;
                    }
                    break;
                }
            }
        }

        //console.log('sss '+showdata+' | '+ddata.month[i] + ' | '+perc)

        // showing
        $('.foreign-currency-fd-label-code').html(showlabel);
        $('.foreign-currency-fd-label-tenure').html(showtenure);
        $('.foreign-currency-fd-label-data').html((showdata).toFixed(2) + '% p.a.');

    }

}
$(document).ready(function(e) {
    var i
    var output = '';

    if (!("RATES_FD_FOREIGNC" in window)) {
        RATES_FD_FOREIGNC = [];
    }
    // populate dropdown
    for (i = 0; i < RATES_FD_FOREIGNC.length; i++) {
        output += '<option class="dropdown2-opt" value="' + i + '">' + RATES_FD_FOREIGNC[i].label + '</option>';
    }
    $('.dropdown-foreigncurrency-fd').html(output);
    $('.dropdown-foreigncurrency-fd').change(function(e) {
        //console.log($(this).val());
        foreignfdrate_currency = parseInt($(this).val());
        refreshForeignCurrencyFDRate()
    });
    $('.dropdown-foreigncurrency-fd').trigger('change');

});

function refreshFDrates() {
    //console.log($('.dropdown-rates-fd').val());

    if ($('.tool-slider-fdinterestrate-val').length) {
        var themonth = parseInt($('.tool-slider-fdinterestrate').html()) - 1
        var theval = DROPDOWN_FD_RATES[parseInt($('.dropdown-rates-fd').val())].data[themonth]
            //console.log('ttt: '+themonth+' | '+theval)
        $('.tool-slider-fdinterestrate-val').html(theval);
    }
}

$(document).ready(function(e) {
    if ($('.tool-slider-fdinterestrate-val').length) {
        $('.dropdown-rates-fd').on('change', function() {
            refreshFDrates()
        })
        refreshFDrates();
    }
});



function insertComma(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function updateHomeLoanAffordability() {

    if ($('.homeloan-affordability-rate').length) {

        // $('input.homeloan-affordability-rate').autoNumeric('init', {
        //     vMax: 100
        // });

        var obj1 = $('.homeloan-affordability-netincome');
        var obj2 = $('.homeloan-affordability-monthlyinstallment');
        var obj3 = $('.homeloan-affordability-tenure');
        var obj4 = $('.homeloan-affordability-rate');
        
        if (obj1.length > 0 && obj2.length > 0 && obj3.length > 0 && obj4.length > 0) {

            var netincome = parseFloat(obj1.val().replace(/,/g, ''));
            var monthpay = parseFloat(obj2.text().replace('MYR', ''));
            var tenure = parseFloat(obj3.text());
            var rate = parseFloat(obj4.val());
            var dsr = 0;

            if (netincome > 0 && netincome < 2745) {
                dsr = 0.6;
            }
            else if (netincome >= 2745 && netincome < 3000) {
                dsr = 0.65;
            }
            else if (netincome >= 3000 && netincome < 5001) {
                dsr = 0.75;
            }
            else if (netincome >= 5001 && netincome < 7001) {
                dsr = 0.8;
            }
            else if (netincome >= 7001 && netincome < 9001) {
                dsr = 0.85;
            }
            else if (netincome >= 9001) {
                dsr = 0.9;
            }

            if (monthpay > netincome ) {
                $('.affordability-calculator-msg-error').show().text('Please enter the amount that is affordable in your monthly net income.');

                
                toolsSetCalculatedValue('.tool-affordability-result-homeloan', insertComma('0'));
                toolsSetCalculatedValue('.tool-affordability-result-max-indicative-loan-amount', insertComma('0'));
                toolsSetCalculatedValue('.tool-affordability-result-monthly-instalment-amount', insertComma('0'));
            }
            else {
                $('.affordability-calculator-msg-error').hide().text('');

                var loanTenure = tenure*12;
                var monthlyLoanInterestRate = (rate/12)/100;
                var elg = netincome * dsr;

                var RP = parseFloat(netincome*dsr).toFixed(2);
                var monthlyInstalment = parseFloat(RP-monthpay).toFixed(2);

                var pmt = monthlyInstalment / monthlyLoanInterestRate * (1 - Math.pow(1 + monthlyLoanInterestRate, -loanTenure));

                var maxIndicative = pmt.toFixed(2);

                // console.log(monthlyLoanInterestRate, loanTenure, monthlyInstalment, maxIndicative, 'monthlyInstalment: ' + monthlyInstalment);

                
                toolsSetCalculatedValue('.tool-affordability-result-homeloan', insertComma(RP));
                toolsSetCalculatedValue('.tool-affordability-result-max-indicative-loan-amount', insertComma(maxIndicative));
                toolsSetCalculatedValue('.tool-affordability-result-monthly-instalment-amount', insertComma(monthlyInstalment));

            }
        }
    }
}

$(document).ready(function(e) {

    $('.homeloan-affordability-netincome').mask("#,##0", {reverse: true});
    $('.homeloan-affordability-netincome').keyup(function(e) {
        updateHomeLoanAffordability();
    });

    // $('.homeloan-affordability-rate').mask("00.00%", {reverse: true});
    $(".homeloan-affordability-rate").inputmask("decimal", {
        radixPoint: ".",
        groupSeparator: ",",
        autoGroup: true,
        suffix: " %",
        clearMaskOnLostFocus: false
    });
    $('.homeloan-affordability-rate').keyup(function(e) {
        updateHomeLoanAffordability();
    });

    // $('.homeloan-affordability-rate').keyup(function(e) {
    //     updateHomeLoanAffordability();
    // });

    updateHomeLoanAffordability();
});


// ------------------- CAR LOAN AFFORDABILITY

function updateCarLoanAffordability() {
    if ($('.tool-affordability-result-carloan').length) {

        var obj = $('.carloan-affordability-rate-slider')
        var obj2 = $('.carloan-affordability-monthlyinstallment')
        var obj3 = $('.carloan-affordability-tenure')
        if (obj.length > 0 && obj2.length > 0 && obj3.length > 0)

        {
            var rate = parseFloat(obj.html());
            var monthpay = obj2.html();
            var tenure = parseFloat(obj3.html());
            if (rate > 10) {
                rate = rate / 100;
                $('.carloan-affordability-rate-slider').html(rate);
            }


            monthpay = parseInt(monthpay.substr(4));

            var a = (rate / 100) / 12;
            var b = 1. + a;
            b = Math.pow(b, (tenure * 12)) - 1.;
            var FC = a / b + a;
            var RP = monthpay / FC

            RP *= 100;
            RP = Math.floor(RP);
            RP /= 100;

            RP = RP.toFixed(2);

            var asnwerVal = monthpay * (tenure * 12) / (1 + ((rate / 100) * tenure));
            asnwerVal = asnwerVal.toFixed(2)


            //console.log(monthpay);
            $('.tool-affordability-result-carloan').html('MYR ' + insertComma(asnwerVal))
        }
    }
}

$(document).ready(function(e) {
    if ($('.tool-affordability-result-carloan').length) {
        updateCarLoanAffordability();
    }
});



//tools card compare select
var cc_min_income_input;
var tickedFeatures = [];
var compareSelection = [];
var urlhashstring = window.location.hash

function getURLParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

//Added new function 20141204

function refreshProductFiltered() {
    if (refreshFilterViewAllowed) {
        // loop all selected features
        var viewlist = [];
        var i, j, k, div
        var added, output, matchedfeatures, cardcheckcleared, itemtype
            // 
        var minincome = cc_min_income_input
        if ($('.slider-value-disp').html() != null) {
            minincome = parseInt($('.slider-value-disp').html().substr(4));

            // $('.redtick').css('opacity','0.1')
            $('.redtick').css('display', 'none')

            // resetCardFeatures();
            // alert('dasdsa');

        }

        var filteredtotal = 0;


        // Filter card
        $('.compare-filtered-item').each(function() {
            div = $(this)
            cardcheckcleared = false

            switch (parseInt(div.data('product-type'))) {
                case 1:
                    itemtype = 'personal';
                    break;
                case 2:
                    itemtype = 'business';
                    break;
            }

            // check item type
            if (cc_cardtype_input == 'both' || cc_cardtype_input == itemtype) {
                // check income
                if (parseInt(div.data('incomerequire')) <= minincome || div.data('incomerequire') == null) {
                    cardcheckcleared = true;

                    // check features
                    // for(i=0;i<tickedFeatures.length;i++){
                    //     if(parseInt(div.data('featureid-'+tickedFeatures[i]))!=1){
                    //         cardcheckcleared = false
                    //         break;
                    //     }
                    // }

                }

            }

            if (cardcheckcleared) {
                div.css('display', 'block')
                filteredtotal++;

                // Added

                var checkAttr1 = div.attr('data-featureid-1')
                var checkAttr2 = div.attr('data-featureid-2')
                var checkAttr3 = div.attr('data-featureid-3')
                var checkAttr4 = div.attr('data-featureid-4')
                var checkAttr5 = div.attr('data-featureid-5')
                var checkAttr6 = div.attr('data-featureid-6')
                var checkAttr7 = div.attr('data-featureid-7')
                var checkAttr8 = div.attr('data-featureid-8')
                var checkAttr9 = div.attr('data-featureid-9')
                var checkAttr10 = div.attr('data-featureid-10')

                if (checkAttr1) {
                    $('.redtick[data-tickid="1"]').css('display', 'block')
                }
                if (checkAttr2) {
                    $('.redtick[data-tickid="2"]').css('display', 'block')
                }
                if (checkAttr3) {
                    $('.redtick[data-tickid="3"]').css('display', 'block')
                }
                if (checkAttr4) {
                    $('.redtick[data-tickid="4"]').css('display', 'block')
                }
                if (checkAttr5) {
                    $('.redtick[data-tickid="5"]').css('display', 'block')
                }
                if (checkAttr6) {
                    $('.redtick[data-tickid="6"]').css('display', 'block')
                }
                if (checkAttr7) {
                    $('.redtick[data-tickid="7"]').css('display', 'block')
                }
                if (checkAttr8) {
                    $('.redtick[data-tickid="8"]').css('display', 'block')
                }
                if (checkAttr9) {
                    $('.redtick[data-tickid="9"]').css('display', 'block')
                }
                if (checkAttr10) {
                    $('.redtick[data-tickid="10"]').css('display', 'block')
                }

            } else {
                div.css('display', 'none')

            }
        })

        //
        //console.log('viewlist: '+viewlist)
        if (filteredtotal < 2) {
            $('.cc-recommendation-results-number').html(filteredtotal + ' ' + item_label)
        } else {
            $('.cc-recommendation-results-number').html(filteredtotal + ' ' + items_label)
        }

        //lilsizzonowsetAllToMaxHeight($(".cc-compare-select-item"));

        // set hash
        //updateURLhash()

    }

}

function refreshProductFiltered2() {
    if (refreshFilterViewAllowed) {
        // loop all selected features
        var viewlist = [];
        var i, j, k, div
        var added, output, matchedfeatures, cardcheckcleared, itemtype
            // 
        var minincome = cc_min_income_input
        if ($('.slider-value-disp').html() != null) {
            minincome = parseInt($('.slider-value-disp').html().substr(4));

            // $('.redtick').css('opacity','0.1')

        }

        var filteredtotal = 0;


        // Filter card
        $('.compare-filtered-item').each(function() {
            div = $(this)
            cardcheckcleared = false

            switch (parseInt(div.data('product-type'))) {
                case 1:
                    itemtype = 'personal';
                    break;
                case 2:
                    itemtype = 'business';
                    break;
            }

            // check item type
            if (cc_cardtype_input == 'both' || cc_cardtype_input == itemtype) {
                // check income
                if (parseInt(div.data('incomerequire')) <= minincome || div.data('incomerequire') == null) {
                    cardcheckcleared = true;

                    // check features
                    for (i = 0; i < tickedFeatures.length; i++) {
                        if (parseInt(div.data('featureid-' + tickedFeatures[i])) != 1) {
                            cardcheckcleared = false
                            break;
                        }
                    }

                }


            }



            if (cardcheckcleared) {
                div.css('display', 'block')
                filteredtotal++;

            } else {
                div.css('display', 'none')

            }
        })

        //
        //console.log('viewlist: '+viewlist)
        if (filteredtotal < 2) {
            $('.cc-recommendation-results-number').html(filteredtotal + ' ' + item_label)
        } else {
            $('.cc-recommendation-results-number').html(filteredtotal + ' ' + items_label)
        }

    }

}


// function updateURLhash(){
//     urlhashstring = '#';
//     urlhashstring += '/'+compareSelection.join(',');
//     urlhashstring += '/'+tickedFeatures.join(',');
//     urlhashstring += '/'+cc_min_income_input;
//     urlhashstring += '/'+cc_cardtype_input;
//     //window.location.hash = urlhashstring
// }


function selectCardType(type) {
    var obj = $('.cylinder-button-' + type)
    if (type != 'both') {

        //
        $(".cylinder-button").removeClass("cylinder-button-selected");

        $(".cylinder-button-for-both").removeClass("cylinder-button-for-both-selected")
        $(".cylinder-trigger-options").removeClass("cylinder-trigger-red")

        obj.addClass("cylinder-button-selected")
        cc_cardtype_input = obj.attr('optionval');

    } else {

        var obj2 = $(".cylinder-button")
        if (!obj.hasClass("cylinder-button-for-both-selected"))

        {
            obj2.addClass("cylinder-button-selected")
            obj.addClass("cylinder-button-for-both-selected")
            $(".cylinder-trigger-options").addClass("cylinder-trigger-red")
            cc_cardtype_input = 'both';
        }

    }

    // resetCardFeatures();
    refreshProductFiltered();
    // refreshProductFiltered2();
}

$(function() {

    //Reset Card Features when clicked
    $('.comparison-types a').click(function() {
        // alert('click');
        resetCardFeatures();
    })

})

$(function() {

    if ($(".cc-feature-tools-items").length) {


        $(".cc-feature-tools-items li div").click(function() {
            var obj = $(this)
            obj.toggleClass("selected-item")
        })



    }

})



/* TICK COMPONENT CONTROLLER --------------------------------------- */

var resetFeatureAllowed = true;
var refreshFilterViewAllowed = true;

function resetCardFeatures() {
    if (resetFeatureAllowed) {
        var out = '';
        var i
        var defaultAllSelected = false;
        tickedFeatures = [];

        if (defaultAllSelected) {
            $('.redtick').removeClass('redtick-off');
            $('.redtick').addClass('redtick-on');
            $('.redtick').data('ticked', '0')
        } else {
            $('.redtick').removeClass('redtick-on');
            $('.redtick').addClass('redtick-off');
            $('.redtick').data('ticked', '1')
        }

        refreshProductFiltered();
    }
}

$(document).ready(function(e) {
    // init for redtick items 
    if ($('.redtick').length) {
        $('.redtick').click(function(e) {
            e.preventDefault()
            var tick = $(this);
            var tgroup = parseInt(tick.data('tickgroup'))
            var tid = parseInt(tick.data('tickid'))
            var i

            //Set command to self remove class when others is clicked



            if (tick.data('ticked') == '1') {

                resetCardFeatures();

                tick.data('ticked', '0')
                tick.removeClass('redtick-off');
                tick.addClass('redtick-on');
                tickedFeatures.push(tid)

            } else {
                tick.data('ticked', '1')
                tick.removeClass('redtick-on');
                tick.addClass('redtick-off');
                for (i = 0; i < tickedFeatures.length; i++) {
                    if (tickedFeatures[i] == tid) {
                        tickedFeatures.splice(i, 1);
                        break;
                    }
                }
            }
            // refreshProductFiltered();
            refreshProductFiltered2();
        })

    }
});

function resetCardSelection__() {
    $(".cc-recommended-add-compare").each(function() {
        var obj = $(this)
        if (obj.data('itemadded') == 1) {
            obj.trigger('click');
        }
    })
    compareSelection = [];
}

$(document).ready(function(e) {
                
    $(".cc-added-list").on("click", "i.icon", function() {
        var obj = $(this).parent()
        obj.fadeOut()

        // deselecting compared item        
        $(".cc-recommended-add-compare").each(function() {
            if (obj.data('itemid') == $(this).data('itemid')) {
                $(this).trigger('click');
            }
        });


    })



    // built all products

    // assigning click for add to compare button -----------------------------------------------------------

    if ($(".cc-recommended-add-compare").length) {
        compareSelection = []


        $(".cc-recommended-add-compare").click(function() {

            var obj = $(this)
            var parentObj = obj.parents(".cc-compare-select-item") //need the class .cc-compare-select-item

            var i
            var status = parseInt(obj.data('itemadded'))

            $(this).find('.whiteround').stop();

            if (status == 1) {
                obj.data('itemadded', 0);
                $(".cc-added-list .ccal-" + obj.attr("data-itemid")).fadeOut()
                    //$(this).html('Compare')
                obj.find('.compare-circle').animate({
                    marginLeft: '5px'
                }, 300);
                // $(this).find('.compare-text').css('color', '#666666');
                obj.find('.compare-text').css('margin-left', '35px');
                obj.find('.compare-text').removeClass('active disabled');
                obj.find('.compare-circle').removeClass("active");

                for (i = 0; i < compareSelection.length; i++) {
                    if (compareSelection[i] == obj.data('itemid')) {
                        compareSelection.splice(i, 1);
                        break;
                    }
                }
                obj.toggleClass("selected-item")

                $(".cc-recommended-add-compare").each(function(index, element) {
                    var obj2 = $(this)
                    if (obj2.data('itemadded') != 1) {
                        //$(this).html('Compare')
                        obj2.find('.compare-text').removeClass('active disabled')
                        obj2.find('.compare-circle').css('margin-left', '5px')
                        obj2.find('.compare-circle').removeClass("active");
                        // $(this).find('.compare-circle').css('background', '#FFFFFF')
                        // $(this).find('.compare-circle i').css('visibility', 'hidden')
                    }
                });

            } else {
                if (compareSelection.length < 4) {

                    obj.data('itemadded', 1);
                    //$(this).html('Compare-R')
                    // $(this).find('.compare-text').css('color', '#FFFFFF');
                    obj.find('.compare-text').addClass('active')
                    obj.find('.compare-text').css('margin-left', '25px');
                    obj.find('.compare-circle').animate({
                        marginLeft: '105px'
                    }, 300);
                    obj.find('.compare-circle').removeClass("active");
                    obj.toggleClass("selected-item")
                    compareSelection.push(obj.data('itemid'));

                    $(".cc-added-list").append("<div class='cc-added-item ccal-" + obj.attr("data-itemid") + "' data-itemid='" + obj.attr("data-itemid") + "'><i class='icon icon-rounds_close'></i>" + $(".compare-thumb-small", parentObj).html() + "</div>")
                    console.log();

                }

                if (compareSelection.length >= 4) {
                    $(".cc-recommended-add-compare").each(function(index, element) {
                        var obj2 = $(this)
                        if (obj2.data('itemadded') != 1) {
                            //$(this).html('Max. selection reached.')
                            // $(this).find('.compare-text').css('color', '#666666');
                            obj2.find('.compare-text').addClass('disabled')
                            obj2.find('.compare-text').css('margin-left', '35px');
                            obj2.find('.compare-circle').css('margin-left', '5px')
                            obj2.find('.compare-circle').addClass("active");
                            // $(this).find('.compare-circle i').css('visibility', 'visible')


                        }
                    });
                }
            }
            // compare button

            $('.cc-recommended-compare-btn').css('cursor', 'pointer');

            if (compareSelection.length > 0) {
                switch (compareSelection.length) {
                    case 1:
                        $('.cc-recommended-selected').html(single_item_selected);
                        $('.compare-button button').html(init_cprbutton);
                        $('.cc-recommended-compare-btn').css('cursor', 'auto').attr('href', 'javascript:;');
                        break;
                    case 4:
                        $('.cc-recommended-selected').html(max_item_selected);
                        $('.compare-button button').html(cprbutton).attr('href', 'javascript:;');
                        break;
                    default:
                        $('.cc-recommended-selected').html(compareSelection.length + no_item_selected);
                        $('.compare-button button').html(cprbutton).attr('href', 'javascript:gotoCompareResult()');
                        // $('.compare-button button').html(cprbutton);
                        break;
                }
                $('.tool-compare-post-select').slideDown(500)

            } else {

                $('.tool-compare-post-select').slideUp(500)

            }

            // updateURLhash()
            //llilsizzonow setAllToMaxHeight($(".cc-compare-select-item"))
        })
    }

});


function gotoCompareResult() {

    if (compareSelection.length >= 2) {
        /*
        var urlstring = 'tools-card-compare.php';
        urlstring += urlhashstring
        */
        var selectionstring = compareSelection.join(',')
        var urlstring = resultsURL;
        urlstring += '?item=' + selectionstring;
        // urlstring += '&features='+tickedFeatures.join(',');
        // urlstring += '&minincome='+cc_min_income_input;
        // urlstring += '&type='+cc_cardtype_input;

        window.location.href = urlstring;
    }
    return false;

}


function gotoCompareResult2() {

    if (compareSelection.length >= 2) {
        /*
        var urlstring = 'tools-card-compare.php';
        urlstring += urlhashstring
        */
        var selectionstring = compareSelection.join(',')
        var urlstring = resultsURL;
        urlstring += '?item=' + selectionstring;
        urlstring += '&features=' + tickedFeatures.join(',');
        urlstring += '&minincome=' + cc_min_income_input;
        urlstring += '&type=' + cc_cardtype_input;

        window.location.href = urlstring;
    }
    return false;

}

function gotoCompareSelect() {
    /*
    var urlstring = 'tools-card-compare-select.php';
    urlstring += urlhashstring
    */
    var urlstring = 'template.extended-compare.php';
    urlstring += '?item=' + getURLParameterByName('item');
    urlstring += '&features=' + getURLParameterByName('features');
    urlstring += '&minincome=' + getURLParameterByName('minincome');
    urlstring += '&type=' + getURLParameterByName('type');
    window.location.href = urlstring;
}


/* TICK COMPONENT CONTROLLER ---------------------------------------  END */

/* SLIDER COMPONENT CONTROLLER --------------------------------------- */
var activeslider2 = null;
var activeslider2Min = 0;
var activeslider2Max = 0;
var activeslider2Prefix = '';
var activeslider2Sufix = '';

function prepareSliderMeta() {
    activeslider2Min = parseInt(activeslider2.parent().attr('minval'));
    activeslider2Max = parseInt(activeslider2.parent().attr('maxval'));
    activeslider2Prefix = activeslider2.parent().attr('labelprefix');
    activeslider2Sufix = activeslider2.parent().attr('labelsufix');
}

function sliderControllerMove(e) {
    if (activeslider2 != null) {
        var parentOffset = activeslider2.siblings('.slider-bar').offset();
        var ww = parseInt(activeslider2.siblings('.slider-bar').css('width')) - 20;
        var xx = ww / 2

        if (e.pageX != null) {
            xx = (e.pageX - parentOffset.left);
        }

        xx -= 5;
        if (xx > ww) {
            xx = ww;
        } else if (xx < -5) {
            xx = -5;
        }
        var perc = (xx + 5) / ww
        if (perc > 1) {
            perc = 1;
        }

        var val = Math.floor(perc * (activeslider2Max - activeslider2Min)) + activeslider2Min;
        var toround = Math.round(val / 100) * 100
        sliderSetvalue(activeslider2, toround)

        // spesific further action for individual slider
        switch (activeslider2.parent().attr('sliderid')) {
            case 'compareproductincomeslider':
                cc_min_income_input = val;
                refreshProductFiltered();
                break;
        }
    }
}


//Check for mobile browsers before running touch event script to avoid conflict in ie8

if (/iPhone/i.test(navigator.userAgent)) {

    $(document).ready(function() {
        $('.mejs-overlay-button').css('visibility', 'hidden');
        $('.promo-item').removeAttr("style");
    })

}

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {

    function touchHandler(event) {
        var touch = event.changedTouches[0];

        var simulatedEvent = document.createEvent("MouseEvent");
        simulatedEvent.initMouseEvent({
                touchstart: "mousedown",
                touchmove: "mousemove",
                touchend: "mouseup"
            }[event.type], true, true, window, 1,
            touch.screenX, touch.screenY,
            touch.clientX, touch.clientY, false,
            false, false, false, 0, null);


        if (touch.target.classList.contains('slider-dot-handle')) {
            touch.target.dispatchEvent(simulatedEvent);
            event.preventDefault();
        }
    }

    function toucheventinit() {
        var target = document
        document.addEventListener("touchstart", touchHandler, true);
        target.addEventListener("touchmove", touchHandler, true);
        target.addEventListener("touchend", touchHandler, true);
        target.addEventListener("touchcancel", touchHandler, true);
    }

    $(document).ready(function(e) {
        if ($('.slider-dot-handle').length) {
            toucheventinit();
        }
    })

}



/* SLIDER COMPONENT CONTROLLER --------------------------------------- END */

$(document).ready(function(e) {

    if ($('.comparison-tool').length && $('.comparison-filters').length) {
        $('.slider-dot-handle-monthlyincome').mousedown(function(e) {
            activeslider2 = $(this);
            prepareSliderMeta()
            resetCardFeatures()
                // refreshCardSelection()
        });

        $(document).mouseup(function(e) {
            activeslider2 = null
        });

        $('.slider-dot-handle').bind("mousedown touchstart", function(e) {

            activeslider2 = $(this);
            prepareSliderMeta()
        }, false);

        $(document).bind("mouseup", function(e) {
            activeslider2 = null
        }, false);
        $('.slider-dot-handle').bind("touchmove", function(e) {
            sliderControllerMove(e)
        }, false);

        $(document).mousemove(function(e) {
            sliderControllerMove(e)
        });


        $('.tool-btn-clearfilter').click(function(e) {
            refreshFilterViewAllowed = false;
            activeslider2 = $('.slider-dot-handle-monthlyincome')
            prepareSliderMeta()
            $(document).trigger('mousemove');
            $(document).trigger('mouseup');


            // slider position/minimum income
            cc_min_income_input = cc_min_income_input_default;
            sliderSetvalue('.slider-dot-handle-monthlyincome', cc_min_income_input)

            selectCardType('personal')
            resetCardFeatures();

            // feature
            // Jill @ XM Asia
            // Disabled because it should not be selected initially.
            // $('.comparison-filter li:first-child .redtick').trigger('click');

            refreshFilterViewAllowed = true;
            refreshProductFiltered();
            //lilsizzonowsetAllToMaxHeight($(".cc-compare-select-item"));

        });


        // compare selection spesific init ---------------------------------------------------------

        refreshFilterViewAllowed = false;

        var i, citems
        var urlhashitem = urlhashstring.split('/')

        // compare item(s) passed by URL
        citems = getURLParameterByName('item')
            //citems=urlhashitem[1]

        if (citems != '' && citems != null) {

            citems = citems.split(',')

            // $('.compare-filtered-item').each(function(){
            //     div = $(this)
            //     for(i=0; i<citems.length;i++){
            //         if(parseInt(div.data('product-cid'))==parseInt(citems[i])){ 
            //             div.find('.cc-recommended-add-compare').trigger('click'); 
            //         }
            //     }

            // });

            //Jill @ XM Asia
            // Simplified the top function to the below
            div = $(this)
            for (j = 0; j < citems.length; j++) {
                $('.compare-filtered-item[data-product-cid=' + citems[j] + ']').find('.cc-recommended-add-compare').trigger('click');
            }

        }

        // features passed by URL        
        var storedfeatures = getURLParameterByName('features')
            //var storedfeatures = urlhashitem[2]
        if (storedfeatures == '' || storedfeatures == null) {
            if (getURLParameterByName('minincome') == null || getURLParameterByName('minincome') == '') {
                // storedfeatures = '1';
            } else {
                storedfeatures = '';
            }
        }
        tickedFeatures = []
        var inputtickedFeatures = storedfeatures.split(',');
        $('.redtick').each(function() {
            var tick = $(this)
            for (i = 0; i < inputtickedFeatures.length; i++) {
                if (parseInt(tick.data('tickid')) == parseInt(inputtickedFeatures[i])) {
                    tick.trigger('click');
                    break;
                }
            }
        });

        // minimum income
        cc_min_income_input = getURLParameterByName('minincome')
            //cc_min_income_input = urlhashitem[3]
        if (cc_min_income_input == '' || cc_min_income_input == null) {
            cc_min_income_input = cc_min_income_input_default
        }
        sliderSetvalue('.slider-dot-handle-monthlyincome', cc_min_income_input)


        // cardtype
        cc_cardtype_input = getURLParameterByName('type')
            //cc_cardtype_input = urlhashitem[4]
        if (cc_cardtype_input == '' || cc_cardtype_input == null) {
            cc_cardtype_input = 'personal';
        }
        selectCardType(cc_cardtype_input)

        // run search
        refreshFilterViewAllowed = true;
        refreshProductFiltered();
        //$('.tool-btn-clearfilter').trigger('click');
        // Jill @ XM Asia
        // Added ?item=variable functionality from the URL for normal compares
    } else if ($('.comparison-tool').length && $('.comparison-filters').length == 0) {

        var j, citems2

        citems2 = getURLParameterByName('item')

        if (citems2 != '' && citems2 != null) {
            citemsArray = citems2.split(',')
            div = $(this)
            for (j = 0; j < citemsArray.length; j++) {
                $('.compare-filtered-item[data-product-cid=' + citemsArray[j] + ']').find('.cc-recommended-add-compare').trigger('click');
            }

        }
    }
});



//tool card compare


var swipeEnabled = true;
var dataProviderObj = $(".tool-compare-selectedlist-slidable-item")
if (dataProviderObj.length < 3)
    swipeEnabled = false;


var compareToolPage = 0;
var compareToolTotalItem = 0
var compareToolSelectedOffset
var compareToolAnimationFlag = false

function compareToolDisplayReset() {
    compareToolPage = 0;
    $('.tool-compare-selectedlist-slidable').css('margin-left', '0px');
    $('.tool-compare-selectedlist-dotnav').css('display', 'none');
}


function compareToolChangeView() {
    var i
    for (i = 0; i < 4; i++) {
        $('.tool-compare-selectedlist-dotnav-dot' + i).css('background-color', '#cccccc')
    }

    compareToolSelectedOffset = -$(window).width() * compareToolPage;

    $('.tool-compare-selectedlist-dotnav-dot' + compareToolPage).css('background-color', '#ec1d23')

    compareToolAnimationFlag = true;
}

function compareToolAnimate() {

    if (compareToolAnimationFlag) {
        var xx = $('.tool-compare-selectedlist-slidable-panel0').css('margin-left');
        if (xx == null || xx == '') {
            xx = 0;
        }

        xx = parseInt(xx)

        xx += (compareToolSelectedOffset - xx) * 0.4;
        $('.tool-compare-selectedlist-slidable').css('margin-left', xx + 'px');

        if (Math.abs(compareToolSelectedOffset - xx) < 0.2) {
            compareToolAnimationFlag = false;
            $('.tool-compare-selectedlist-slidable').css('margin-left', compareToolSelectedOffset + 'px');
        }
    }

}

$.fn.outputCalcValue = function (value, options)
{
  var span = this;

  var settings = $.extend ({'roundVal' : true }, options);

  var prefix = $(span).attr ('data-prefix');
  if (prefix == undefined) prefix = "";

  var suffix = $(span).attr ('data-suffix');
  if (suffix == undefined) suffix = "";
  
  if (settings.roundVal == true)
  {
    value = Math.round (value);
  }
  
  var valstring = value.toLocaleString ();
  $(span).text (prefix + valstring + suffix);
};

$.fn.calcFormDisableButtonFirst = function (options)
{
  var element = this;
  var settings = $.extend ({}, options);
  var btn_calculate = $(element).find ('.calculator-calculate-button');
  $(btn_calculate).prop ({ 'disabled': true });
};

function refreshCompoundInterestCalculatorRdepo(yearsyntax) {
    var a = parseFloat($('.calc-compoundinterest-rdepo .principal-amount').val());
    var a2 = parseFloat($('.calc-compoundinterest-rdepo .monthly-amount').val());
    var b = parseFloat($('.calc-compoundinterest-rdepo .interest-rate').val()) / 100;
    var c = parseFloat($('.calc-compoundinterest-rdepo .loan-tenure').val());

    var totalsum = a
    var intpaid = 0
    var intpaid_total = 0;
    var month = 1;
    var totalmonth = c * 12

    var contentdiv = $('.generated-contents')
    var output = '';
    var currency = 'RM';
    var year = 0;

    while (month <= totalmonth) {
        intpaid = (b / 12) * (totalsum + a2)
        intpaid_total += intpaid;
        totalsum += intpaid + a2;
        year = Math.ceil(month / 12);
        monthVal = (month - (year - 1) * 12);

        //Generate output based on syntax by user
        var syntaxOutput = "";
        syntaxOutput = yearsyntax.replace("${year}", year);
        syntaxOutput = syntaxOutput.replace("${month}", monthVal)

        output += '<div class="row tabdata">'
        output += '    <div class="tabcol">' + syntaxOutput + '</div>'
        output += '    <div class="tabcol">' + currency + intpaid.toFixed(2) + '</div>'
        output += '    <div class="tabcol">' + currency + intpaid_total.toFixed(2) + '</div>'
        output += '    <div class="tabcol">' + currency + totalsum.toFixed(2) + '</div>'
        output += '</div>';

        month++;
    }

    $('.calc-compoundinterest-rdepo .calculated-result .generated-contents').html(output);
    $('.calc-compoundinterest-rdepo .calculated-result').slideDown()
    $('.calc-compoundinterest-rdepo .calculated-result-label').slideDown()
    $('.calc-compoundinterest-rdepo .calculator-item').slideUp();
    //alert(output)

    //toolsSetCalculatedValue('.calc-compoundinterest-rdepo .calc-result-totalinterest', parseFloat(intpaid_total).toFixed(2))
    //toolsSetCalculatedValue('.calc-compoundinterest-rdepo .calc-result-grandtotal', parseFloat(totalsum).toFixed(2))

}

function toolsSetCalculatedValue(ele, val) {
    if (val != "NaN")
        $(ele).html($(ele).data('prefix') + val + $(ele).data('suffix'))
}

function backtoCalculator(ele) {

    if (ele != undefined) {
        $(ele + ' .calculated-result-label').slideUp()
        $(ele + ' .calculated-result').slideUp()
        $(ele + ' .calculator-item').slideDown()
        $('html, body').animate({
            scrollTop: $(ele).offset().top
        }, 1000);
    }
}


/* scroll page to vertical offset */
$.fn.scrollPageToThis = function (scrollduration)
{
  function scrollPageTo (vpos, scrollduration)
  {
    if (scrollduration == undefined) { scrollduration = 999; }
    $('html, body').stop ();
    $('html, body').animate ({ scrollTop: vpos }, scrollduration);
  }

  var this_element = this;
  var vpos = $(this_element).offset ().top;
  if (scrollduration == undefined) { scrollduration = 999; }

  scrollPageTo (vpos, scrollduration);
}


$(document).ready(function(e) {

    if ($('.tool-compare-selectedlist-slidable').length) {
        setInterval('compareToolAnimate()', 30);

        var citem = getURLParameterByName('item');
        if (citem == '' || citem == undefined) {
            compareToolTotalItem = 0;
        } else {
            citem = citem.split(',');
            compareToolTotalItem = citem.length
        }

        $(window).resize(function(e) {
            var i
            compareToolDisplayReset()


            if (swipeEnabled) {
                var ww = $(window).width();
                compareToolChangeView()
                if (ww < 786) {

                    $('.tool-compare-selectedlist-slidable').css('margin-left', (-compareToolPage * ww) + 'px');
                    $('.tool-compare-selectedlist-dotnav').css('display', 'block');

                    for (i = 0; i < 4; i++) {
                        $('.tool-compare-selectedlist-dotnav-dot' + i).css('display', 'none')


                        if (ww < 400 && i < compareToolTotalItem) {
                            $('.tool-compare-selectedlist-dotnav-dot' + i).css('display', 'inline-block')
                        } else if (ww >= 400 && compareToolTotalItem > 2 && i < Math.ceil(compareToolTotalItem / 2)) {
                            //console.log('jj '+Math.ceil(compareToolTotalItem/2))
                            $('.tool-compare-selectedlist-dotnav-dot' + i).css('display', 'inline-block')
                        } else {

                        }

                    }
                }
            }


        });
        $(window).trigger('resize');

        // selected list swipe event
        var i
        for (i = 0; i < 4; i++) {
            $('.tool-compare-selectedlist-dotnav-dot' + i).attr('pageno', i)
            $('.tool-compare-selectedlist-dotnav-dot' + i).click(function() {
                compareToolPage = $(this).attr('pageno');
                compareToolChangeView();
            })
        }


        $("div.tool-compare-selectedlist-holder, .compare-tool-info").swipe({
            allowPageScroll: 'vertical',
            swipe: function(event, direction, distance, duration, fingerCount) {
                //console.log("You swiped " + direction +' | '+$(window).width());
                var ww = $(window).width()
                if (ww < 786 && swipeEnabled) {

                    if (direction == 'left') {
                        if (ww > 400 && compareToolPage < 1) {
                            compareToolPage++;
                        } else if (ww <= 400 && compareToolPage < compareToolTotalItem - 1) {
                            compareToolPage++;
                        }

                    } else {
                        if (compareToolPage > 0) {
                            compareToolPage--;
                        }
                    }

                    compareToolChangeView()

                }
            }
        });
    }

    /* INPUT CALCULATOR (CREDIT CARD INTEREST) ---------------------------- */

    function refreshCCInterestRateCalculator() {
        if ($('.interest-rate-calc-1').length) {

            // ------------------------------------------------
            var floatTotalInterest = 0.00;
            var floatTenure = 0.00;
            var floatMinPayment = 0.00;
            var floatInterestRate = $('.interest-rate-calc-1 .interest-rate').val()
            var floatCurrentBalance = $('.interest-rate-calc-1 .current-balance').val()

            // adjust interest rate to monthly
            var floatInterestRateMonthly = (floatInterestRate / 100) / 12;

            // calc the total interest payed and months if only paying minimums
            var floatTotalOutstanding = floatCurrentBalance * 1;


            while (floatTotalOutstanding > 0) {
                //strDebug += 'Month ' + floatTenure + ': ' + "<br>";

                // calc interest
                var floatThisMonthInterest = floatTotalOutstanding * floatInterestRateMonthly;
                //strDebug += 'Interest: ' + floatThisMonthInterest +  "<br>";

                // recalc min interest first
                var floatThisMonthMin = floatTotalOutstanding * 0.05;
                if (floatThisMonthMin < 50) {
                    if (floatTotalOutstanding <= 50) //last payment
                    {
                        floatThisMonthMin = floatTotalOutstanding + floatThisMonthInterest;
                    } else {
                        floatThisMonthMin = 50.00;
                    }
                }
                //strDebug += 'MinPay: ' + floatThisMonthMin +  "<br>";

                // add interest to principle
                floatTotalOutstanding = floatTotalOutstanding + floatThisMonthInterest;
                // strDebug += 'TotalOut: ' + floatTotalOutstanding +  "<br>";
                floatTotalInterest += floatThisMonthInterest
                    //strDebug += 'TotalInt: ' + floatTotalInterest +  "<br>";

                // pay minimum
                floatTotalOutstanding -= floatThisMonthMin;
                //strDebug += 'Overall: ' + floatTotalOutstanding +  "<br>";
                //strDebug += "<br>";

                // 1 more month
                floatTenure++;

            }

            // calc min payment
            floatMinPayment = floatCurrentBalance * 0.05;

            if (floatMinPayment < 50) {
                if (floatCurrentBalance <= 50) {
                    floatMinPayment = floatCurrentBalance;
                } else {
                    floatMinPayment = 50.00;
                }
            }

            // output formatting
            floatMinPayment = parseFloat(floatMinPayment).toFixed(2);
            floatTotalInterest = parseFloat(floatTotalInterest).toFixed(2);

            // update fields
            //floatTotalInterest = floatTotalInterest.toFixed(2);
            //eTotalInterest.innerHTML = 'RM ' + floatTotalInterest;
            $('.calc-result-totalinterest').html($('.calc-result-totalinterest').data('prefix') + floatTotalInterest + $('.calc-result-totalinterest').data('suffix'))
                //    eTotalInterest.innerHTML = strDebug;
                // eTenure.innerHTML = floatTenure;
            $('.calc-result-monthinterest').html($('.calc-result-monthinterest').data('prefix') + floatTenure + $('.calc-result-monthinterest').data('suffix'))
                //eMinPayment.innerHTML = 'RM ' + floatMinPayment;// + '<br>' + strDebug;
            $('.calc-result-minpayment').html($('.calc-result-minpayment').data('prefix') + floatMinPayment + $('.calc-result-minpayment').data('suffix'))
                // ------------------------------------------------
        }
    }

    if ($('.interest-rate-calc-1').length) {

        // $('.interest-rate-calc-1 .numeric-only').bind('blur', function() {
        //     refreshCCInterestRateCalculator()
        // })
        $('.interest-rate-calc-1 .numeric-only').keyup(refreshCCInterestRateCalculator);


        //init
        $('.interest-rate-calc-1 .interest-rate').val('1.8');
        $('.interest-rate-calc-1 .current-balance').val('5000');
        refreshCCInterestRateCalculator()
    }


    /* INPUT CALCULATOR (CAR LOAN) ---------------------------- */

    function refreshCarLoanCalculator() {
        var a = $('.calc-carloan .principal-amount').val();
        var b = $('.calc-carloan .interest-rate').val() / 100;
        var c = $('.calc-carloan .loan-tenure').val();

        var d = a * b * c; // total hiring charges
        var e = parseFloat(d) + parseFloat(a); // total amount payable
        var installment = e / (c * 12);

        toolsSetCalculatedValue('.calc-result-thiring', parseFloat(d).toFixed(2))
        toolsSetCalculatedValue('.calc-result-installment', parseFloat(installment).toFixed(2))
        toolsSetCalculatedValue('.calc-result-totalpayable', parseFloat(e).toFixed(2))

    }

    if ($('.calc-carloan').length) {
        // $('.calc-carloan .numeric-only').bind('blur', function() {
        //     refreshCarLoanCalculator()
        // })
        $('.calc-carloan .numeric-only').keyup(refreshCarLoanCalculator);

        // init
        $('.calc-carloan .principal-amount').val('100000');
        $('.calc-carloan .interest-rate').val('2.5');
        $('.calc-carloan .loan-tenure').val('5');
        refreshCarLoanCalculator()
    }

    /* INPUT CALCULATOR (HOME LOAN) ---------------------------- */

    function round_number(numbers, decimal) {
        return Math.round(numbers * Math.pow(10, decimal)) / Math.pow(10, decimal);
    }


    function refreshHomeLoanCalculator() {
        // var a = $('.calc-homeloan .principal-amount').val();
        // var b = $('.calc-homeloan .interest-rate').val()/100;
        // var c = $('.calc-homeloan .loan-tenure').val();

        // var d = a*b*c; // total hiring charges
        // var e = parseFloat(d)+parseFloat(a); // total amount payable
        // var installment = e/(c*12);

        var amt = $('.calc-homeloan .principal-amount').val();
        var rate = $('.calc-homeloan .interest-rate').val();
        var tenure = $('.calc-homeloan .loan-tenure').val();

        var a = rate / 100. / 12.;
        var b = 1. + a;
        b = Math.pow(b, (tenure * 12)) - 1.;
        var FC = a / b + a;
        FC = FC.toFixed(10);
        var RP = amt * FC;



        var asnwerVal = (round_number(RP, 2)).toFixed(2);
        //asnwerVal = addCommas(asnwerVal);
        //doc.txtMntPay.value = asnwerVal;


        //toolsSetCalculatedValue('.calc-homeloan .calc-result-thiring', parseFloat(d).toFixed(2))
        toolsSetCalculatedValue('.calc-homeloan .calc-result-installment', parseFloat(asnwerVal).toFixed(2))
            //toolsSetCalculatedValue('.calc-homeloan .calc-result-totalpayable', parseFloat(e).toFixed(2))
            //console.log(Math.random())
    }

    if ($('.calc-homeloan').length) {
        //$('.calc-homeloan .numeric-only').bind('blur', refreshHomeLoanCalculator)
        $('.calc-homeloan .numeric-only').keyup(refreshHomeLoanCalculator);

        // init
        $('.calc-homeloan .principal-amount').val('200000');
        $('.calc-homeloan .interest-rate').val('3.0');
        $('.calc-homeloan .loan-tenure').val('30');
        refreshHomeLoanCalculator()
    }



    /* INPUT CALCULATOR (COMPOUND INTEREST) ---------------------------- */


    if ($('.calc-compoundinterest').length) {
        // init
        $('.calc-compoundinterest .principal-amount').val('100');
        $('.calc-compoundinterest .interest-rate').val('0.50');
        $('.calc-compoundinterest .loan-tenure').val('10');
    }



    /* INPUT CALCULATOR (COMPOUND INTEREST) ---------------------------- */

    if ($('.calc-compoundinterest-rdepo').length) {
        // init
        $('.calc-compoundinterest-rdepo .principal-amount').val('100');
        $('.calc-compoundinterest-rdepo .monthly-amount').val('100');
        $('.calc-compoundinterest-rdepo .interest-rate').val('0.50');
        $('.calc-compoundinterest-rdepo .loan-tenure').val('5');

    }

    /* INPUT CALCULATOR (FOREIGN EXCHANGE) ---------------------------- */

    function refreshForeignExchangeCalculatorTHB() {
        var a = parseFloat($('.calc-exchangerate.calc-exchangerate-to-THB .principal-amount').val());
        var dto = $('.calc-exchangerate.calc-exchangerate-to-THB .dropdown-convertto').val()
        var dtype = $('.calc-exchangerate.calc-exchangerate-to-THB .dropdown-currencytype').val()

        var thb1arr = ['USD', 'USD520', 'USD501', 'EUR', 'GBP', 'JPY', 'HKD', 'SGD', 'CHF', 'CAD’, ’AUD', 'DKK', 'SEK', 'NZD', 'MYR', 'IDR', 'NOK', 'CNY', 'KRW', 'INR', 'RUB'];
        var thb1arrstr = thb1arr.join('-');

        var singlehundred = '100'
        if (thb1arrstr.indexOf(dto) != -1) {
            singlehundred = '1'
        }

        var darray = eval('thb' + singlehundred + '_' + dtype);
        var rate = parseFloat(singlehundred) / darray[dto];
        var ratetoTHB = parseFloat(darray[dto]);

        if ($('.calc-exchangerate.calc-exchangerate-to-THB .principal-amount').val() == '') {
            a = 0;
        }

        if (rate == undefined) {
            toolsSetCalculatedValue('.calc-exchangerate.calc-exchangerate-to-THB .calc-result-unitrate', 'Unavailable')
            toolsSetCalculatedValue('.calc-exchangerate.calc-exchangerate-to-THB .calc-result-totalsum', 'Unavailable')
        } else {
            //For RM to Foreign 
            toolsSetCalculatedValue('.calc-exchangerate.calc-exchangerate-to-THB .calc-result-unitrate', dto + ' ' + rate.toFixed(5))
            toolsSetCalculatedValue('.calc-exchangerate.calc-exchangerate-to-THB .calc-result-totalsum', 'THB ' + a + ' = ' + dto + ' ' + (a * rate).toFixed(5))

            //For Foreign to RM 
            toolsSetCalculatedValue('.calc-exchangerate.calc-exchangerate-to-THB .calc-result-unitrate2', dto + ' ' + singlehundred)
            toolsSetCalculatedValue('.calc-exchangerate.calc-exchangerate-to-THB .calc-result-exchangerate2', 'THB' + ' ' + ratetoTHB.toFixed(5))
            toolsSetCalculatedValue('.calc-exchangerate.calc-exchangerate-to-THB .calc-result-totalsum2', dto + ' ' + a + ' = ' + 'THB ' + ((a / singlehundred) * ratetoTHB).toFixed(5))
        }

    }

    function refreshForeignExchangeCalculatorMY() {
        var a = parseFloat($('.calc-exchangerate.calc-exchangerate-to-RM .principal-amount').val());
        var dto = $('.calc-exchangerate.calc-exchangerate-to-RM .dropdown-convertto').val()
        var dtype = $('.calc-exchangerate.calc-exchangerate-to-RM .dropdown-currencytype').val()

        var rm1arr = ['AUD', 'BND', 'CAD', 'CHF', 'GBP', 'EUR', 'NZD', 'SGD', 'USD'];
        var rm1arrstr = rm1arr.join('-');

        var singlehundred = '100'
        if (rm1arrstr.indexOf(dto) != -1) {
            singlehundred = '1'
        }

        var darray = eval('rm' + singlehundred + '_' + dtype);
        var rate = parseFloat(singlehundred) / darray[dto];
        var ratetoRM = parseFloat(darray[dto]);

        if ($('.calc-exchangerate.calc-exchangerate-to-RM .principal-amount').val() == '') {
            a = 0;
        }

        if (rate == undefined) {
            toolsSetCalculatedValue('.calc-exchangerate.calc-exchangerate-to-RM .calc-result-unitrate', 'Unavailable')
            toolsSetCalculatedValue('.calc-exchangerate.calc-exchangerate-to-RM .calc-result-totalsum', 'Unavailable')
        } else {
            //For RM to Foreign 
            toolsSetCalculatedValue('.calc-exchangerate.calc-exchangerate-to-RM .calc-result-unitrate', dto + ' ' + rate.toFixed(5))
            toolsSetCalculatedValue('.calc-exchangerate.calc-exchangerate-to-RM .calc-result-totalsum', 'RM ' + a + ' = ' + dto + ' ' + (a * rate).toFixed(5))

            //For Foreign to RM 
            toolsSetCalculatedValue('.calc-exchangerate.calc-exchangerate-to-RM .calc-result-unitrate2', dto + ' ' + singlehundred)
            toolsSetCalculatedValue('.calc-exchangerate.calc-exchangerate-to-RM .calc-result-exchangerate2', 'RM' + ' ' + ratetoRM.toFixed(5))
            toolsSetCalculatedValue('.calc-exchangerate.calc-exchangerate-to-RM .calc-result-totalsum2', dto + ' ' + a + ' = ' + 'RM ' + ((a / singlehundred) * ratetoRM).toFixed(5))
        }

    }


    if ($('.calc-exchangerate.calc-exchangerate-to-RM').length) {
        $('.calc-exchangerate.calc-exchangerate-to-RM select').bind('blur change', function() {
            refreshForeignExchangeCalculatorMY();
        })

        $('.calc-exchangerate.calc-exchangerate-to-RM .numeric-only').keyup(refreshForeignExchangeCalculatorMY);

        // init
        $('.calc-exchangerate.calc-exchangerate-to-RM .principal-amount').attr('value', '100');
        refreshForeignExchangeCalculatorMY();
    }


    if ($('.calc-exchangerate.calc-exchangerate-to-THB').length) {
        $('.calc-exchangerate.calc-exchangerate-to-THB select').bind('blur change', function() {
            refreshForeignExchangeCalculatorTHB();
        })

        $('.calc-exchangerate.calc-exchangerate-to-THB .numeric-only').keyup(refreshForeignExchangeCalculatorTHB);

        // init
        $('.calc-exchangerate.calc-exchangerate-to-THB .principal-amount').attr('value', '1');
        refreshForeignExchangeCalculatorTHB();
    }

    // if($('.numeric-only')){
    //     $('.numeric-only').bind('paste propertychange change input', function() {
    //        var val = $(this).val();
    //         if(isNaN(val)){
    //              val = val.replace(/[^0-9\.]/g,'');
    //              if(val.split('.').length>2) 
    //                  val =val.replace(/\.+$/,"");
    //         }
    //         $(this).val(val); 
    //     })
    // }

    $('.numeric-only, .numeric-only2').jStepper({
        decimalSeparator: "",
        maxDecimals: 4,
        disableAutocomplete: true
    });

    $(".strictly-numbers").bind("keyup paste", function(){
    setTimeout(jQuery.proxy(function() {
        this.val(this.val().replace(/[^0-9]/g, ''));
    }, $(this)), 0);
});
  
      $(".strictly-numbersdot").bind("keyup paste", function(){
    setTimeout(jQuery.proxy(function() {
        this.val(this.val().replace(/[^0-9\.]/g, ''));
    }, $(this)), 0);
});
  

    // Disallow decimals in calculators
    $(".nodecimal").keypress(function(e) {
        if (e.which < 48 || e.which > 57) {
            return (false);
        }
    });

    // $(".nodecimal").keypress(function(e) {
    //     if (e.which < 7 || e.which > 9) {
    //         return (false);
    //     }
    // });    

    // $(".nodecimal").keyup(function(e) {
    //     if (e.keyCode == 8) {
    //         alert('ohYeah');
    //     }
    // });



    // Adding comma to value inputs 
    $('.nodecimal, .calc-financial .numeric-only').keyup(function(event) {
        // skip for arrow keys
        if (event.which >= 37 && event.which <= 40) {
            event.preventDefault();
        }

        $(this).val(function(index, value) {
            value = value.replace(/,/g, '');
            return numberWithCommas(value);
        });
    });

    function numberWithCommas(x) {
        var parts = x.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
    }

    // Inputmask with data-inputmask
    $(":input[data-inputmask]").inputmask();



    /* INPUT CALCULATOR (Education) ---------------------------- */
    function refreshEduLoanCalculator() {

        var amt = parseInt($('.calc-eduloan .principal-amount').val().replace(/,/g, ''), 10)
        var rate = $('.calc-eduloan .loan-rate').val();
        var tenure = $('.calc-eduloan .loan-tenure').val();

        var a = rate / 100. / 12.;
        var b = 1. + a;
        b = Math.pow(b, (tenure * 12)) - 1.;
        var FC = a / b + a;
        FC = FC.toFixed(10);
        var RP = amt * FC;

        toolsSetCalculatedValue('.calc-eduloan .calc-result-installment', Math.ceil(RP).toLocaleString().split('.')[0])
        $('.calc-eduloan .results-container').slideDown();

    }

    if ($('.calc-eduloan').length) {

        var calcSlideUpEdu = function() {
            $('.calc-eduloan .results-container').slideUp();
        }
        $('.calc-eduloan .numeric-only').keyup(function() {
            var principalAmt = parseInt($('.calc-eduloan .principal-amount').val().replace(/,/g, ''), 10)
            var minAmt = $('.calc-eduloan .min-loanamt').val();
            var maxAmt = $('.calc-eduloan .max-loanamt').val();
            var minAmtEdu = parseFloat(minAmt)
            var maxAmtEdu = parseFloat(maxAmt)

            if (principalAmt < minAmtEdu || principalAmt == "") {
                $('.calc-eduloan .error-loanamt-min').show()
            } else {
                $('.calc-eduloan .error-loanamt-min').hide()
            }
            if (principalAmt > maxAmtEdu) {
                $('.calc-eduloan .error-loanamt-max').show()
            } else {
                $('.calc-eduloan .error-loanamt-max').hide()
            }

            calcSlideUpEdu()

        });
        $('.calc-eduloan select').bind('blur change', function() {
            calcSlideUpEdu()
        })

        // Run check on loan amount to see if it fits within the min/max value
        $('.calc-eduloan .btn-calculate').click(function() {

            var errorLoanAmtMin = $('.calc-eduloan .error-loanamt-min').css('display');
            var errorLoanAmtMax = $('.calc-eduloan .error-loanamt-max').css('display');

            if (errorLoanAmtMin == 'block' || errorLoanAmtMax == 'block') {

            } else {
                refreshEduLoanCalculator()
            }
        })

        // init
        $('.calc-eduloan .principal-amount').val('10,000');

    }

    /* INPUT CALCULATOR (Renovation) ---------------------------- */

     function tenure_rates() {
        $('input.loan-rate').val( parseFloat($('.dropdown2-opt:selected').attr('data-tenure')));
      }
      $('.dropdown2.loan-tenure').on("change.tenurechange", function(){
        tenure_rates();
      });

    function refreshRenoLoanCalculator() {

        var amt = parseInt($('.calc-renoloan .principal-amount').val().replace(/,/g, ''), 10)
        console.log(amt);
        var rate = $('.calc-renoloan .loan-rate').val();
        console.log(rate);
        var tenure = $('.calc-renoloan .loan-tenure').val();
        console.log(tenure);

        var interest = rate / 12; // and here
        var foo = Math.ceil(amt * interest / (1 - (Math.pow(1 / (1 + interest), tenure * 12))));




        toolsSetCalculatedValue('.calc-renoloan .calc-result-installment', foo)
        $('.calc-renoloan .results-container').slideDown();

    }

    if ($('.calc-renoloan').length) {

        var calcSlideUpEdu = function() {
            $('.calc-renoloan .results-container').slideUp();
        }
        $('.calc-renoloan .numeric-only').keyup(function() {
            var principalAmt = parseInt($('.calc-renoloan .principal-amount').val().replace(/,/g, ''), 10)
            var minAmt = $('.calc-renoloan .min-loanamt').val();
            var maxAmt = $('.calc-renoloan .max-loanamt').val();
            var minAmtEdu = parseFloat(minAmt)
            var maxAmtEdu = parseFloat(maxAmt)

            if (principalAmt < minAmtEdu || principalAmt == "") {
                $('.calc-renoloan .error-loanamt-min').show()
            } else {
                $('.calc-renoloan .error-loanamt-min').hide()
            }
            if (principalAmt > maxAmtEdu) {
                $('.calc-renoloan .error-loanamt-max').show()
            } else {
                $('.calc-renoloan .error-loanamt-max').hide()
            }
            calcSlideUpEdu()

        });
        $('.calc-renoloan select').bind('blur change', function() {
            calcSlideUpEdu()
        })

        // Run check on loan amount to see if it fits within the min/max value
        $('.calc-renoloan .btn-calculate').click(function() {

            var errorLoanAmtMin = $('.calc-renoloan .error-loanamt-min').css('display');
            var errorLoanAmtMax = $('.calc-renoloan .error-loanamt-max').css('display');

            if (errorLoanAmtMin == 'block' || errorLoanAmtMax == 'block') {

            } else {
                refreshRenoLoanCalculator()
            }
        })

        // init
        $('.calc-renoloan .principal-amount').val('10,000');

    }

    /* INPUT CALCULATOR (Home Loan Affordability - Singapore ver) ---------------------------- */
    function refreshPropertyLoanSG() {

        var tenureString = $('.calc-homeloan-affordsg .loan-tenure').val();
        var tenure = parseInt($('.calc-homeloan-affordsg .loan-tenure').val());
        var minTenure = $('.calc-homeloan-affordsg .min-tenure').val()
        var maxTenure = $('.calc-homeloan-affordsg .max-tenure').val()

        if (tenure < minTenure || tenureString == "") {
            $('.error-tenure-min').show();
        } else {
            $('.error-tenure-min').hide();
        }

        if (tenure > maxTenure) {
            $('.error-tenure-max').show();
        } else {
            $('.error-tenure-max').hide();
        }

        // Monthly Expenses
        var carLoan = parseInt($('.calc-homeloan-affordsg .car-loan').val().replace(/,/g, ''), 10)
        var credit = parseInt($('.calc-homeloan-affordsg .credit-expense').val().replace(/,/g, ''), 10)
        var otherLoan = parseInt($('.calc-homeloan-affordsg .other-loan').val().replace(/,/g, ''), 10)


        if (isNaN(carLoan)) {
            var carLoan = 0;
        }

        if (isNaN(credit)) {
            var credit = 0;
        }

        if (isNaN(otherLoan)) {
            var otherLoan = 0;
        }

        var monthlyExpense = carLoan + credit + otherLoan;

        toolsSetCalculatedValue('.calc-homeloan-affordsg .calc-result-monthly-expense', parseFloat(monthlyExpense))

        // Recommended Monthly Instalment
        var incomeRatio = $('.recommended-ratio').val() / 100;
        var monthlyIncome = parseInt($('.calc-homeloan-affordsg .monthly-income').val().replace(/,/g, ''), 10)
        var recommendedMonthlyInstalment = (incomeRatio * monthlyIncome) - monthlyExpense

        toolsSetCalculatedValue('.calc-homeloan-affordsg .calc-result-installment', parseFloat(recommendedMonthlyInstalment).toLocaleString().split('.')[0])

        // Projected Loan Amount
        var propertyRate = $('.property-type').val() / 100
        var rate = propertyRate / 12
        var nper = tenure * 12
        var pmt = recommendedMonthlyInstalment
        var pmt = parseInt($('.calc-homeloan-affordsg .preferred-instalment').val().replace(/,/g, ''), 10)
        var recommendedAmt = $('.calc-homeloan-affordsg .recommended-amt').val();

        // Check if Total Monthly Expenses is more that Recommended Amt
        if (recommendedMonthlyInstalment < recommendedAmt || $('.calc-homeloan-affordsg .monthly-income').val() == "") {
            $('.error-expenses').show();
        } else {
            $('.error-expenses').hide();
        }


        // Check amount entered in Preferred Monthly Instalment
        if (pmt < recommendedAmt) {
            $('.instalment-error-less').show();
            $('.instalment-error-more').hide();
            var pmt = recommendedMonthlyInstalment
            var projectedLoanAmt = pmt / rate * (1 - Math.pow(1 + rate, -nper));
            // toolsSetCalculatedValue('.calc-homeloan-affordsg .calc-result-projected-loanamt', parseFloat(projectedLoanAmt).toFixed(0)) 
            $('.calc-homeloan-affordsg .calc-result-projected-loanamt').text('N/A')
        } else if (pmt > recommendedMonthlyInstalment) {
            $('.instalment-error-more').show();
            $('.instalment-error-less').hide();
            var pmt = recommendedMonthlyInstalment
            var projectedLoanAmt = pmt / rate * (1 - Math.pow(1 + rate, -nper));
            // toolsSetCalculatedValue('.calc-homeloan-affordsg .calc-result-projected-loanamt', parseFloat(projectedLoanAmt).toFixed(0))
            $('.calc-homeloan-affordsg .calc-result-projected-loanamt').text('N/A')
        } else {
            $('.instalment-error-less').hide();
            $('.instalment-error-more').hide();
            // If recommendedMonthlyInstalment is not a number
            if (isNaN(pmt)) {
                var pmt = recommendedMonthlyInstalment
            }
            var projectedLoanAmt = Math.round(pmt / rate * (1 - Math.pow(1 + rate, -nper)))

            toolsSetCalculatedValue('.calc-homeloan-affordsg .calc-result-projected-loanamt', parseFloat(projectedLoanAmt).toLocaleString().split('.')[0])
        }

    }

    if ($('.calc-homeloan-affordsg').length) {

        $('.calc-homeloan-affordsg .numeric-only').keyup(function() {
            refreshPropertyLoanSG()
            $('.calc-homeloan-affordsg .preferred-instalment').val('')
            $('.calc-homeloan-affordsg .calc-result-row1').slideUp()
            $('.calc-homeloan-affordsg .calc-result-row2').slideUp()
        });
        $('.calc-homeloan-affordsg select').bind('blur change', function() {
            refreshPropertyLoanSG()
            $('.calc-homeloan-affordsg .preferred-instalment').val('')
            $('.calc-homeloan-affordsg .calc-result-row1').slideUp()
            $('.calc-homeloan-affordsg .calc-result-row2').slideUp()
        })
        $('.calc-homeloan-affordsg .numeric-only2').keyup(function() {
            refreshPropertyLoanSG()
        });

        $('.calc-homeloan-affordsg .btn-calculate').click(function() {

            // Check Fields (Loan Tenure and Expenditure)
            var monthlyIncome = $('.calc-homeloan-affordsg .monthly-income').val()
            var tenure = parseInt($('.calc-homeloan-affordsg .loan-tenure').val())
            var minTenure = $('.calc-homeloan-affordsg .min-tenure').val()
            var maxTenure = $('.calc-homeloan-affordsg .max-tenure').val()
            var recommendedMonthlyInstalment = parseInt($('.calc-homeloan-affordsg .calc-result-installment').text().replace(/[^-\d\.]/g, ''))
            var recommendedAmt = $('.recommended-amt').val();

            if (tenure < minTenure || tenure > maxTenure || recommendedMonthlyInstalment < recommendedAmt || monthlyIncome == "") {

            } else {
                refreshPropertyLoanSG()
                $('.calc-result-row1').slideDown()
                $('.calc-result-row2').slideDown()
            }

        })

        // init
        $('.calc-homeloan-affordsg .monthly-income').val('10,000');
        $('.calc-homeloan-affordsg .loan-tenure').val('25');
        refreshPropertyLoanSG()
    }

    /* INPUT CALCULATOR (Niaga-Personal Loan) ---------------------------- */
    function refreshPersonalLoanCalculator() {
        var outstandingPrincipal = parseInt($('.calc-niaga-personal .principal-amount').val());
        var minPrincipal = parseInt($('.calc-niaga-personal .min-principal-amt').val());
        var loanTenure = parseInt($('.calc-niaga-personal .loan-tenure').val());
        var insurance = $('.calc-niaga-personal .include-insurance').val();
        var rate = $('.calc-niaga-personal .interest-year' + loanTenure).val();
        var insurancerate = $('.calc-niaga-personal .insurance-rate-year' + loanTenure).val();

        if ($('.calc-niaga-personal .include-insurance').val() == 'yes') {
            var insuranceFee = outstandingPrincipal * (insurancerate / 100);
        } else {
            insuranceFee = 0;
        }

        var adminFeeRate = $('.calc-niaga-personal .admin-fee').val()
        var adminFee = (adminFeeRate / 100) * outstandingPrincipal;
        var monthlyInstalment = Math.round(generateMonthlyInstalment(outstandingPrincipal, rate, 0, loanTenure));

        // Write results
        toolsSetCalculatedValue('.calc-niaga-personal .calc-result-proposed-limit', outstandingPrincipal.toLocaleString());
        toolsSetCalculatedValue('.calc-niaga-personal .calc-result-monthly-instalment', monthlyInstalment.toLocaleString());
        toolsSetCalculatedValue('.calc-niaga-personal .calc-result-insurance-fee', insuranceFee.toLocaleString());
        toolsSetCalculatedValue('.calc-niaga-personal .calc-result-admin-fee', adminFee.toLocaleString());

        // Error handling
        if (outstandingPrincipal < minPrincipal) {
            $('.calc-niaga-personal .min-amt-error').show();
            $('.calc-niaga-auto .calc-result-installment, .calc-niaga-personal .calc-result-monthly-instalment, .calc-niaga-personal .calc-result-insurance-fee, .calc-niaga-personal .calc-result-admin-fee').text('');
        } else {
            $('.calc-niaga-personal .min-amt-error').hide();
        }
    }

    if ($('.calc-niaga-personal').length) {

        $('.calc-niaga-personal .numeric-only').keyup(refreshPersonalLoanCalculator);
        $('.calc-niaga-personal select').bind('blur change', function() {
            refreshPersonalLoanCalculator();
        });

        // init
        $('.calc-niaga-personal .principal-amount').val('50000000');
        refreshPersonalLoanCalculator()

    }

    /* INPUT CALCULATOR (Niaga-Auto Loan) ---------------------------- */
    function refreshAutolLoanCalculator() {
        var vehiclePrice = $('.calc-niaga-auto .vehicle-price').val()
        var minVehiclePrice = $('.calc-niaga-auto .vehicle-min-amt').val()
        var vehicleDownpayment = $('.calc-niaga-auto .vehicle-downpayment-per').val()
        var vehicleDownpaymentAmt = $('.calc-niaga-auto .vehicle-downpayment').val()
        var vehicleDownpaymentAmtMin = (vehicleDownpayment / 100) * vehiclePrice
        var nominalPlafond = vehiclePrice - vehicleDownpaymentAmt
        var loanTenure = $('.calc-niaga-auto .vehicle-tenure').val()
        var loanInterest = ($('.calc-niaga-auto .interest-year' + loanTenure).val()) / 100
        var calculatedResult = (1 + (loanInterest * loanTenure)) * nominalPlafond / (loanTenure * 12)
        var result = Math.round(calculatedResult)

        // Write results
        toolsSetCalculatedValue('.calc-niaga-auto .calc-result-installment', result.toLocaleString());

        // Error handling
        if (vehicleDownpaymentAmt < vehicleDownpaymentAmtMin) {
            $('.calc-niaga-auto .vehicle-downpayment-error').show();
            $('.calc-niaga-auto .calc-result-installment').text('')
        } else {
            $('.calc-niaga-auto .vehicle-downpayment-error').hide();
        }

        if (parseInt(vehiclePrice) < parseInt(minVehiclePrice)) {
            $('.calc-niaga-auto .vehicle-min-error').show();
            $('.calc-niaga-auto .calc-result-installment').text('')
        } else {
            $('.calc-niaga-auto .vehicle-min-error').hide();
        }

    }

    if ($('.calc-niaga-auto').length) {

        $('.calc-niaga-auto .numeric-only').keyup(refreshAutolLoanCalculator);
        $('.calc-niaga-auto select').bind('blur change', function() {
            refreshAutolLoanCalculator();
        });

        // init
        $('.calc-niaga-auto .vehicle-price').val(500000000);
        $('.calc-niaga-auto .vehicle-downpayment').val(150000000);
        refreshAutolLoanCalculator();

    }

    /* INPUT CALCULATOR (Niaga-Mortgage Loan) ---------------------------- */
    function refreshMortgageCalculator() {

        // Destroy existing table
        $('.calc-mortgage-table').slideUp();
        $('.mortgage-loan-data').empty();

        // Calculation
        var principalAmt = $('.calc-niaga-mortgage .principal-amount').val();
        var downpayment = $('.calc-niaga-mortgage .mortgage-downpayment').val();
        var rate = $('.calc-niaga-mortgage .interest-rate').val();
        var tenure = $('.calc-niaga-mortgage .loan-tenure').val();
        var minDownpaymentPer = $('.calc-niaga-mortgage .mortgage-downpayment-per').val();
        var minDownpayment = (minDownpaymentPer / 100) * principalAmt
        var minPrincipalAmt = $('.calc-niaga-mortgage .min-property-price').val();

        var amt = principalAmt - downpayment

        var a = rate / 100. / 12.;
        var b = 1. + a;
        b = Math.pow(b, (tenure * 12)) - 1.;
        var FC = a / b + a;
        FC = FC.toFixed(10);
        var RP = amt * FC;
        var answerVal = Math.round(RP);

        // Write Results
        toolsSetCalculatedValue('.calc-niaga-mortgage .calc-result-installment', answerVal.toLocaleString());
        toolsSetCalculatedValue('.calc-niaga-mortgage .calc-result-proposed-limit', amt.toLocaleString());

        // Error handling

        var errorResult = function() {
            $('.calc-niaga-mortgage .calc-result-installment, .calc-niaga-mortgage .calc-result-proposed-limit').text('');
            $('.btn-calculate-mortgage-holder').slideUp();
        }

        if (downpayment < minDownpayment) {
            $('.calc-niaga-mortgage .mortgage-downpayment-error').show();
            errorResult();
        } else {
            $('.calc-niaga-mortgage .mortgage-downpayment-error').hide();
        }

        if (parseInt(principalAmt) < parseInt(minPrincipalAmt)) {
            $('.calc-niaga-mortgage .mortgage-amt-error').show();
            errorResult();
        } else {
            $('.calc-niaga-mortgage .mortgage-amt-error').hide();
        }

        var rateFixed = $('.calc-niaga-mortgage .interest-rate option:selected').attr('data-fixed');
        $('.min-tenure-txt').text(rateFixed);

        if (tenure < parseInt(rateFixed)) {
            $('.calc-niaga-mortgage .mortgage-tenure-error').show();
            errorResult();
        } else {
            $('.calc-niaga-mortgage .mortgage-tenure-error').hide();
        }

        if ($('.mortgage-downpayment-error').css('display') == "block" || $('.mortgage-amt-error').css('display') == "block" || $('.mortgage-tenure-error').css('display') == "block") {
            console.log('theres an error')
        } else {
            $('.btn-calculate-mortgage-holder').slideDown();
            toggleMortgageArrow();
        }

    }

    if ($('.calc-niaga-mortgage').length) {
        $('.calc-niaga-mortgage .numeric-only').keyup(refreshMortgageCalculator);
        $('.calc-niaga-mortgage select').bind('blur change', function() {
            refreshMortgageCalculator();
        });

        // init
        $('.calc-niaga-mortgage .principal-amount').val('300000000');
        $('.calc-niaga-mortgage .mortgage-downpayment').val('90000000');
        refreshMortgageCalculator()

        // prepare table upon click
        $('.btn-calculate-mortgage').click(function() {
            createMortgageTable();
            $('.calc-mortgage-table').slideToggle();
            toggleMortgageArrow();

        })
    }

    /* INPUT CALCULATOR (Niaga-Financial Loan) ---------------------------- */
    function refreshFinancialCalc() {

        var age = $('.calc-financial .age').val();
        var ageobj = $('.calc-financial .ageobj').val();
        var fundamt = $('.calc-financial .fundamt').val();
        // var goalyear = ageobj - age;
        var goalyear = parseInt(ageobj.replace(/,/g, ''), 10) - parseInt(age.replace(/,/g, ''), 10)
        $('.calc-financial .goalyear').val(goalyear.toLocaleString().split('.')[0]);

        var inflationrate = $('.calc-financial .inflationrate').val();
        var annualinflationrate = parseInt(fundamt.replace(/,/g, ''), 10) * (Math.pow((1 + (inflationrate / 100)), goalyear))

        $('.calc-financial .annualinflationrate').val(Math.round(annualinflationrate).toLocaleString().split('.')[0]);

        var preparationfund = $('.calc-financial .preparationfund').val();
        var preparationrate = $('.calc-financial .preparationrate').val();
        var havetoberate = parseInt(preparationfund.replace(/,/g, ''), 10) * (Math.pow((1 + (preparationrate / 100)), goalyear))

        $('.calc-financial .havetoberate').val(Math.round(havetoberate).toLocaleString().split('.')[0]);

        var lackExcess = Math.round(havetoberate - annualinflationrate)
        var lackExcessSuffix = $('.calc-financial .calc-result-lackexcess').attr('data-prefix') + lackExcess.toLocaleString().split('.')[0];

        // NaN Handling
        if (isNaN(annualinflationrate)) {
            $('.annualinflationrate').val('')
        }

        if (isNaN(havetoberate)) {
            $('.havetoberate').val('')
        }

        if (isNaN(goalyear)) {
            $('.goalyear').val('')
        }

        if (isNaN(lackExcess)) {

        } else {
            $('.calc-financial .calc-result-lackexcess').text(lackExcessSuffix);
        }

        // Error Handling

        var parseageobj = parseInt(ageobj.replace(/,/g, ''), 10)
        var parseage = parseInt(age.replace(/,/g, ''), 10)

        if (parseageobj <= parseage) {
            $('.age-error').show();
        } else {
            $('.age-error').hide();
        }

        if (parseage == '' || parseageobj == '') {
            $('.age-error').hide();
        }

    }

    if ($('.calc-financial').length) {
        $('.calc-financial .numeric-only').keyup(refreshFinancialCalc);

        // init
        refreshFinancialCalc()
    }

    /* INPUT CALCULATOR (Credit Card Repayment SG) ---------------------------- */

    function refreshCreditCalculator() {

        var balanceAmt = []
        var finalMonth = []

        // Calculate Months, Balance Amount, Interest Amount, Monthly Repayment and Final Instalment (Per Month)
        var rate = $('.card-type').val() / 100;
        var current = parseInt($('.current-balance').val().replace(/,/g, ''), 10)
        var mrepay = parseInt($('.monthly-repayment').val().replace(/,/g, ''), 10)
        var tenure = 0;

        if (mrepay / current > rate) {

            i = 1;

            interestAmt = current * rate;
            balanceAmt = (current - mrepay + interestAmt);
            monthlyRepayment = 0;

            if (interestAmt > 0) {
                monthlyRepayment = mrepay;
            } else {
                monthlyRepayment = 0;
            }

            finalInstall = 0;

            if (interestAmt > 0 && balanceAmt <= mrepay) {
                interestAmt2 = balanceAmt * rate;
                finalInstall = balanceAmt + interestAmt2;
            } else {
                finalInstall = 0;
            }

            monthlyData = [];
            monthlyData.push(i, balanceAmt, interestAmt, monthlyRepayment, finalInstall);

            monthlyRepaymentArray = [];
            monthlyRepaymentArray.push(monthlyData[3], monthlyData[4])
            monthlyData[0] = monthlyData[0] + 1 // to make up for missing row

            // template = '<tr><td>'+i+'</td><td>'+balanceAmt+'</td><td>'+interestAmt+'</td><td>'+mrepay+'</td><td>'+finalInstall+'</td></tr>'
            // $('#result').append(template)

            for (i = 2; interestAmt > 0; i++) {

                balanceAmt2 = balanceAmt - mrepay + interestAmt;
                interestAmt = balanceAmt * rate;
                balanceAmt = (balanceAmt - mrepay + interestAmt);

                if (interestAmt > 0 && balanceAmt <= mrepay) {
                    interestAmt2 = balanceAmt * rate;
                    finalInstall = balanceAmt + interestAmt2;
                } else {
                    finalInstall = 0;
                }

                if (balanceAmt < 0) {
                    break;
                }

                monthlyData = [];
                // i = i + 1 // to make up for the missing row
                monthlyData.push(i, balanceAmt, interestAmt, monthlyRepayment, finalInstall);

                monthlyRepaymentArray.push(monthlyData[3], monthlyData[4])

                monthlyData[0] = monthlyData[0] + 1 // to make up for missing row

                // template = '<tr><td>'+i+'</td><td>'+balanceAmt+'</td><td>'+interestAmt+'</td><td>'+mrepay+'</td><td>'+finalInstall+'</td></tr>'
                // $('#result').append(template)
            }
        } else {
            alert('Infinite');
        }



        // Calculate Total of Monthly Repayment + Final Instalment
        var n = monthlyRepaymentArray.length;
        var totalPaid = 0;
        while (n--)
            totalPaid += parseFloat(monthlyRepaymentArray[n]) || 0;

        toolsSetCalculatedValue('.total-paid', Math.ceil(totalPaid))
        $('.total-paid').digits();
        $('.tenure').html(monthlyData[0] + ' Month(s)');

    }

    function cardSetInterestRate() {
        var interestRate = $('.card-type').val();
        $('.interest').val(interestRate);
    }

    if ($('.calc-card-repayment').length) {

        cardSetInterestRate();

        $('.btn-calculate').click(function() {

            $('.calc-error')
                .removeClass('error-exist')
                .filter(function() {
                    // Filter
                    return $(this).css('display') === "block";
                })
                .addClass('error-exist');


            if ($('.error-exist').length === 0) {
                refreshCreditCalculator();
                $('.results-container').slideDown();
            }

        })

        $(this).find('.numeric-only').keyup(function() {
            $('.results-container').slideUp();

            // Error handling
            // var currentBalance = $('.current-balance').val();
            var currentBalance = parseFloat($('.current-balance').val());
            var monthlyRepayment = parseFloat($('.monthly-repayment').val());

            var minMonthlyPayment = $('.min-monthly-payment').val();
            var minPercentageBalance = $('.min-percent-balance').val();

            var currentBalanceInt = parseInt($('.current-balance').val().replace(/,/g, ''), 10)
            var monthlyRepaymentInt = parseInt($('.monthly-repayment').val().replace(/,/g, ''), 10)

            if (currentBalance == 0 || currentBalance == "") {
                $('.error-balance-min').show();
            } else {
                $('.error-balance-min').hide();
            }

            if (monthlyRepayment == 0 || monthlyRepayment == "") {
                $('.error-repayment-min').show();
            } else {
                $('.error-repayment-min').hide();
            }

            // If Current Credit Card Balance < Monthly Repayment
            if (currentBalanceInt < monthlyRepaymentInt) {
                $('.error-credit-scenario1').show();
                $('.error-credit-scenario1 span').html(monthlyRepayment);
            } else {
                $('.error-credit-scenario1').hide();
            }

            // Current Credit Card Balance >  Monthly Repayment AND Current Credit Card Balance < $50 
            if (currentBalanceInt > monthlyRepaymentInt && currentBalanceInt < minMonthlyPayment) {
                $('.error-credit-scenario2').show();
                $('.error-credit-scenario2 span').html(currentBalance);
            } else {
                $('.error-credit-scenario2').hide();
            }

            var newMinPayment = (minPercentageBalance / 100) * currentBalanceInt

            if (currentBalanceInt > monthlyRepaymentInt && currentBalanceInt >= minMonthlyPayment && newMinPayment < minMonthlyPayment && monthlyRepaymentInt < minMonthlyPayment) {
                $('.error-credit-scenario3').show();
                $('.error-credit-scenario3 span').html(minMonthlyPayment);
            } else {
                $('.error-credit-scenario3').hide();
            }

            // Current Credit Card Balance >  Monthly Repayment AND Current Credit Card Balance >= S$1667 AND Monthly Repayment < 3% Of Credit Card Balance
            var minUserBalance = $('.min-user-balance').val();
            // if (currentBalanceInt > monthlyRepaymentInt && newMinPayment >= minMonthlyPayment && monthlyRepaymentInt < ((minPercentageBalance / 100) * currentBalanceInt)) {
            if (currentBalanceInt > monthlyRepaymentInt && newMinPayment >= minMonthlyPayment && monthlyRepaymentInt < ((minPercentageBalance / 100) * currentBalanceInt)) {
                var mintoPay = (minPercentageBalance / 100) * currentBalanceInt;
                mintoPay = mintoPay.toFixed(2);
                $('.error-credit-scenario4').show();
                $('.error-credit-scenario4 .amt').html(mintoPay);
                $('.error-credit-scenario4 .percentage').html(minPercentageBalance);
            } else {
                $('.error-credit-scenario4').hide()
            }

        })

        $(this).find('select').change(function() {
            $('.results-container').slideUp();
        })

        // Show Interest Card based on selected cards
        $('.card-type').change(function() {
            cardSetInterestRate();
        })

    }

});

function toggleMortgageArrow() {
    if ($('.btn-calculate-mortgage-holder .icon').hasClass('icon-core_solid_arrow_down') && $('.calc-mortgage-table').css('display') == 'block') {
        $('.btn-calculate-mortgage-holder .icon').removeClass('icon-core_solid_arrow_down');
        $('.btn-calculate-mortgage-holder .icon').addClass('icon-core_solid_arrow_up');
    } else {
        $('.btn-calculate-mortgage-holder .icon').removeClass('icon-core_solid_arrow_up');
        $('.btn-calculate-mortgage-holder .icon').addClass('icon-core_solid_arrow_down');
    }
}

function createMortgageTable() {
    // Start
    var principalAmt = $('.calc-niaga-mortgage .principal-amount').val();
    var downpayment = $('.calc-niaga-mortgage .mortgage-downpayment').val();
    var rate = $('.calc-niaga-mortgage .interest-rate').val();
    var tenure = $('.calc-niaga-mortgage .loan-tenure').val();
    var minDownpaymentPer = $('.calc-niaga-mortgage .mortgage-downpayment-per').val();
    var minDownpayment = (minDownpaymentPer / 100) * principalAmt
    var minPrincipalAmt = $('.calc-niaga-mortgage .min-property-price').val();
    var amt = principalAmt - downpayment
    var defaultrate = $('.calc-niaga-mortgage .loan-tenure').val();
    var rateFixed = $('.calc-niaga-mortgage .interest-rate option:selected').attr('data-fixed');
    var defaultRate = $('.calc-niaga-mortgage .mortgage-rate-int').val();

    var a = rate / 100. / 12.;
    var b = 1. + a;
    b = Math.pow(b, (tenure * 12)) - 1.;
    var FC = a / b + a;
    FC = FC.toFixed(10);
    var RP = amt * FC;
    var answerVal = Math.round(RP);

    var month = 1
    var installmentinterest = amt * ((rate / 100) / 12);
    var principalinstall = RP - installmentinterest;
    var loanprincipal = amt - principalinstall

    var monthlyInstallment = amt * (rate / 1200) * Math.pow(1 + (rate / 1200), tenure * 12) / (Math.pow(1 + (rate / 1200), tenure * 12) - 1)

    var rowData = "<tr><td>" + month + "</td><td>" + rate + "</td><td>" + monthlyInstallment + "</td><td>" + installmentinterest + "</td><td>" + principalinstall + "</td><td>" + loanprincipal + "</td></tr>"

    $(".mortgage-loan-data").append(rowData);


    // Second row onwards
    for (i = 2; i <= tenure * 12; i++) {

        var installmentinterest = loanprincipal * ((rate / 100) / 12);
        var principalinstall = monthlyInstallment - installmentinterest;
        var loanprincipal = loanprincipal - principalinstall;
        var rowData = "<tr><td>" + i + "</td><td>" + rate + "</td><td>" + monthlyInstallment + "</td><td>" + installmentinterest + "</td><td>" + principalinstall + "</td><td>" + loanprincipal + "</td></tr>"

        if (i == rateFixed * 12) {

            rate = defaultRate;
            remainingYr = tenure - rateFixed;
            var monthlyInstallment = loanprincipal * (rate / 1200) * Math.pow(1 + (rate / 1200), remainingYr * 12) / (Math.pow(1 + (rate / 1200), remainingYr * 12) - 1)
            var installmentinterest = loanprincipal * ((rate / 100) / 12);
            var principalinstall = monthlyInstallment - installmentinterest;
        }

        // Write data
        $(".mortgage-loan-data").append(rowData);
    }

    // Aesthetic purpose
    var currencyPrefix = $('.calc-niaga-mortgage .calc-result-installment').attr('data-prefix')

    $('.mortgage-loan-data td:nth-child(3), .mortgage-loan-data td:nth-child(4), .mortgage-loan-data td:nth-child(5), .mortgage-loan-data td:nth-child(6)').each(function() {
        var value = $(this).text();
        if ($.isNumeric(value)) {
            // var final = Math.floor(value);
            var final = Math.round(value);
            $(this).text(currencyPrefix + " " + final.toLocaleString().split('.')[0])
        }
    });
}

function generateMonthlyInstalment(pOutstandingPrincipal, pInterestRate, pMonthsPassed, loanTenure) {
    var monthlyInstalmentResult = ((pInterestRate / 1200) + ((pInterestRate / 1200) / (Math.pow(1 + (pInterestRate / 1200), (loanTenure * 12) - pMonthsPassed) - 1))) * pOutstandingPrincipal;
    return (monthlyInstalmentResult);
}

function refreshCompoundInterestCalculator() {
    var a = parseFloat($('.calc-compoundinterest .principal-amount').val());
    var b = parseFloat($('.calc-compoundinterest .interest-rate').val()) / 100;
    var c = parseFloat($('.calc-compoundinterest .loan-tenure').val());

    var d = 0,
        grandTotal;

    var totalsum = a
    var intpaid = 0
    var intpaid_total = 0;
    var year = 1;

    var output = '';
    var currency = 'RM';

    while (year <= c) {

        intpaid = (totalsum * (Math.pow(1 + (b / 12), 12))) - totalsum
        intpaid_total += intpaid;
        totalsum += intpaid;

        output += '<div class="row tabdata">'
        output += '    <div class="tabcol">' + year + '</div>'
        output += '    <div class="tabcol">' + currency + intpaid.toFixed(2) + '</div>'
        output += '    <div class="tabcol">' + currency + intpaid_total.toFixed(2) + '</div>'
        output += '    <div class="tabcol">' + currency + totalsum.toFixed(2) + '</div>'
        output += '</div>';

        year++;
    }

    $('.calc-compoundinterest .calculated-result .generated-contents').html(output);
    $('.calc-compoundinterest .calculated-result').slideDown()
    $('.calc-compoundinterest .calculated-result-label').slideDown()
    $('.calc-compoundinterest .calculator-item').slideUp();

}

// Footer, auto add class

$(document).ready(function() {
    $('.f-sitemap-nav > .five:first-child  nav').addClass('first');
});

//Reset button to forcecully clear radio and checkboxes

$('#reset-btn').click(function() {
    $('i.icon-check, i.icon-dot').remove();
});

//Custom border for Merchant Listing

var executeBorderforListing = function() {
    $('.merchant-contact-container').addClass('merchant-contact-border-btm');
    var width = $(window).width();
    if (width <= 768) {
        $('.visit-us-container .merchant-row:last-child .merchant-contact-container').addClass('merchant-contact-border-btm');
        $('.visit-us-container .merchant-row:last-child .merchant-contact-container:last-child').removeClass('merchant-contact-border-btm');
    } else {
        $('.visit-us-container .merchant-row:last-child .merchant-contact-container').removeClass('merchant-contact-border-btm');
        //Set same height for merchant listing
        $('.merchant-row').each(function() {
            var highestBox = 0;
            $('.merchant-contact-container', this).each(function() {

                if ($(this).height() > highestBox)
                    highestBox = $(this).height();
            });
            $('.merchant-contact-container', this).height(highestBox);
        });
    }
};

$(document).ready(executeBorderforListing);
$(window).resize(executeBorderforListing);


// Auto calculate width of hyperlink listing for Title Component (Desktop View) 

var executeWidthFixing = function() {
    var width = $(window).width();
    if (width >= 1020) {
        $('.row').each(function() {
            var totalWidth = $(this).find('.title-all').width()
            var titleWidth = $(this).find('.title-listing').outerWidth()
            var newTitleWidth = totalWidth - titleWidth - 40

            $(this).find('.hyperlink-listing').css('width', newTitleWidth)
        });
    }
    // else{
    //     $('.row').each(function(){
    //         var defaultTitleWidth = "100%";

    //         $(this).find('.hyperlink-listing').css('width',defaultTitleWidth)
    //     });
    // }
};

$(document).ready(executeWidthFixing);
$(window).resize(executeWidthFixing);


//Forces nav to be same height as container in two column template

$(window).load(function() {
    // var twocolnavheight = $('.two-columns').height();
    // var twocolnavheight = $('.two-columns').outerHeight();
    // //$('.two-columns-nav').css('height',twocolnavheight);

    // // For Unit Trust
    // // $('.two-columns-sidebar').css('height',twocolnavheight);
    // // If inside length is longer, recalculate


    // var sidebarheight = $('.two-columns-sidebar').outerHeight();

    // console.log('twocolnavheight ' + twocolnavheight);
    // console.log('sidebarheight ' + sidebarheight);

    // if( sidebarheight < twocolnavheight ){
    //     $('.two-columns-sidebar').css('height',twocolnavheight);
    //     console.log('nav is shorter');
    // }
    // else{
    //     // $('.two-columns-sidebar').removeAttr('style');
    //     console.log('nav is longer');
    // }
    recalculateLeftHeight();

    $('.two-columns-sidebar a').click(function() {
        // $('.two-columns-sidebar').css('height','auto');
        var timer = null;
        clearTimeout(timer);
        timer = setTimeout(recalculateLeftHeight, 500);
    });

});

function recalculateLeftHeight() {

    var twocolnavheight = $('.two-columns').outerHeight();
    var leftcompnav = $('.leftside-comp-nav').outerHeight();
    var sidebarheight = $('.two-columns-sidebar').outerHeight();

    if (leftcompnav <= twocolnavheight) {
        $('.two-columns-sidebar').css('height', twocolnavheight);
    } else {
        $('.two-columns-sidebar').css('height', 'auto');
    }
}

var initialTwoColNavHeight = $('.two-columns-nav').height()

// Load more promo tile same height as the column before
var myContentHeight = $('.myContent').outerHeight();
$('.myLoadMore>.home-see-all-promotions').height(myContentHeight);
$('.myLoadMore>.home-see-all-promotions>.home-load-more-news-promotions-btn2').height(myContentHeight).css({
    'padding-top': '120px'
});

var promoItemHeight = $('.promo-item').outerHeight();
var promoItemBtn = $('.promo-item').outerHeight() - 50;
$('.nav-hyperlink-ajax-content .home-see-all-promotions a').css({
    'padding-top': promoItemBtn / 2,
    'padding-bottom': promoItemBtn / 2
});
$('.nav-hyperlink-ajax-content .home-see-all-promotions').height(promoItemHeight);


// See Details
$('.acctdetailtrigger').click(function() {
    $('.welcome').hide();
    $('#acctdetail-info').fadeIn();
});
$('.custotrigger').click(function() {
    $('.welcome').hide();
    $('#custo-info').fadeIn();
});
$('.accttrigger').click(function() {
    $('.welcome').hide();
    $('#acct-info').fadeIn();
});
$('.qttrigger').click(function() {
    $('.welcome').hide();
    $('#qt-info').fadeIn();
});
$('.fasterTtrigger').click(function() {
    $('.welcome').hide();
    $('#fasterT-info').fadeIn();
});


//Return from Details
$('.democontent .goback').click(function() {
    $(this).parents('.democontent').hide();
    $('.welcome').fadeIn();
});

// Launch popupvid
$('#acctdetail-info .launchpop').click(function() {
    $('#acctdetail').fadeIn().addClass('active');
});

$('#custo-info .launchpop').click(function() {
    $('#custo').fadeIn().addClass('active');
});

$('#acct-info .launchpop').click(function() {
    $('#acct').fadeIn().addClass('active');
});

$('#qt-info .launchpop').click(function() {
    $('#qt').fadeIn().addClass('active');
});

$('#fasterT-info .launchpop').click(function() {
    $('#fasterT').fadeIn().addClass('active');
});

// Close popupvideo
$('.popup .closepop').click(function() {
    $(this).parents('.popup').hide();
    $(this).parents('.popup').removeClass('active');
    $('video').each(function() {
        this.player.pause()
    })
});

// Visual 
$(function() {
    $(".demo1").hover(function() {
            $("#demo1-hover").fadeIn("fast");
        },
        function() {
            $("#demo1-hover").fadeOut("fast");
        });
    $(".demo1").click(function() {
        $("#demo1-hover").fadeOut("fast");
        $('.welcome,.democontent').hide();
        $('#acctdetail-info').fadeIn();
    });
    $(".demo2").hover(function() {
            $("#demo2-hover").fadeIn("fast");
        },
        function() {
            $("#demo2-hover").fadeOut("fast");
        });
    $(".demo2").click(function() {
        $("#demo2-hover").fadeOut("fast");
        $('.welcome,.democontent').hide();
        $('#qt-info').fadeIn();
    });
    $(".demo3").hover(function() {
            $("#demo3-hover").fadeIn("fast");
        },
        function() {
            $("#demo3-hover").fadeOut("fast");
        });
    $(".demo3").click(function() {
        $("#demo3-hover").fadeOut("fast");
        $('.welcome, .democontent').hide();
        $('#acct-info').fadeIn();
    });
    $(".demo4").hover(function() {
            $("#demo4-hover").fadeIn("fast");
        },
        function() {
            $("#demo4-hover").fadeOut("fast");
        });
    $(".demo4").click(function() {
        $("#demo4-hover").fadeOut("fast");
        $('.welcome,.democontent').hide();
        $('#fasterT-info').fadeIn();
    });
    $(".demo5").hover(function() {
            $("#demo5-hover").fadeIn("fast");
        },
        function() {
            $("#demo5-hover").fadeOut("fast");
        });
    $(".demo5").click(function() {
        $("#demo5-hover").fadeOut("fast");
        $('.welcome,.democontent').hide();
        $('#custo-info').fadeIn();
    });
})

// Arrange card listing based on minimum income

$(".all-item-listing>li").sort(sort_li).appendTo('.all-item-listing');

function sort_li(a, b) {
    return ($(b).find('div').data('incomerequire')) < ($(a).find('div').data('incomerequire')) ? 1 : -1;
}

// Dynamic Input for MinIncome slider

function setDynamicPositioning() {

    //Start Auto Calculate Function
    $('.dynamic-slider-marker').each(function() {

        var getMinVal = $('.tool-slider-mainwrapper').attr('minval');
        var getMaxVal = $('.tool-slider-mainwrapper').attr('maxval');
        var getStepVal = $('.tool-slider-mainwrapper').attr('stepval');

        var getLabelValue = $(this).find('.slider-marker-label').html().replace(/[^0-9]/g, '');
        var getNewValue = ((getLabelValue - getMinVal) / (getMaxVal - getMinVal)) * 100

        var newPositionLeft = Math.round(getNewValue) + '%';
        var newPerPos = Math.round(getNewValue);

        $(this).css('left', newPositionLeft).attr('data-perpos', newPerPos)

    })
}

setDynamicPositioning()

// For Unit Trust Tables (Maximizes amount of row to 5, hides the rest)
$('.expandable-table').each(function() {
    var numShown = 5; // Initial rows shown & index
    var numMore = 5; // Increment

    var $table = $(this).find('tbody'); // tbody containing all the rows
    var numRows = $table.find('tr').length; // Total # rows

    // Hide rows id more than 5
    if (numRows >= numShown) {
        // Hide rows and add clickable div
        $table.find('tr:gt(' + (numShown) + ')').hide().end()
            .after('<tbody class="more"><tr><td colspan="' +
                $table.find('tr:first th').length + '"><div>Show <span>' +
                numMore + '</span> More <i class="icon-core_solid_arrow_down"></i></div></tbody></td></tr>');

    }

    $(this).find('.more').click(function() {
        numShown = numShown + numMore;
        // no more "show more" if done
        if (numShown >= numRows) {
            $(this).remove();
        }
        // change rows remaining if less than increment
        if (numRows - numShown < numMore) {
            $(this).find('span').html(numRows - numShown);
        }
        $table.find('tr:lt(' + numShown + ')').show();
    });
})

// Disclaimer for Calculators

if ($('.calc-disclaimer').length) {
    $('.calc-disclaimer:first').fadeIn();
}

function setCalcDisclaimer() {
    var containerHeight = $('.calc-disclaimer').outerHeight();
    var titleHeight = $('.calc-disclaimer-content>h3').outerHeight();
    var buttonHeight = $('.calc-disclaimer-content .static-content').outerHeight();
    var contentheight = $('.calc-disclaimer-content').outerHeight();
    var newContentHeight = contentheight - titleHeight - buttonHeight - 60
    var newMarginTop = (containerHeight - contentheight) / 2

    $('.calc-disclaimer-content>.scrollable-content').height(newContentHeight);
    $('.calc-disclaimer-content').css('margin-top', newMarginTop)
}

$(document).ready(setCalcDisclaimer)
$(window).resize(setCalcDisclaimer)

$('.calc-agree').each(function() {
    $(this).click(function() {
        $(this).parent().parent().parent().parent().fadeOut(150);
    })
})

// Warning

function setWarningPopup(classContainer) {
    var warningContainerHeight = $('.calc-value-warning').height()
    var warningContentHeight = $('.calc-warning-content').height()
    var newMarginTop2 = (warningContainerHeight - warningContentHeight) / 2
    $(classContainer).find('.calc-warning-content').css('margin-top', newMarginTop2)
}

// Home Loan Calculator (SG Version)

function prepareLoanRepaymentTable() {

    var amt = parseInt($('.calc-homeloan-repayment .principal-amount').val().replace(/,/g, ''), 10)
    var loanTenure = $('.calc-homeloan-repayment .loan-tenure').val()
    var rate = $('.calc-homeloan-repayment .interest-yr1').val()
    var month = 1

    // Write Data
    var amtSeparated = amt.toLocaleString().split('.')[0]
        // toolsSetCalculatedValue('.calc-homeloan-repayment .loan-amt', parseFloat(amtSeparated).toFixed(0))

    toolsSetCalculatedValue('.calc-homeloan-repayment .loan-amt', (amtSeparated).toLocaleString().split('.')[0])

    // .toLocaleString().split('.')[0]

    // For every month, generate a row of data
    // First row
    var outstandingPrincipal = amt
    var monthlyInstallment = (getMonthlyInstallment(outstandingPrincipal, rate, 0))
    var paymentInterest = (amt * rate / 100 / 12)
        // var paymentInterest = (round_number((amt*rate/100/12), 2)).toFixed(2);
    var paymentPrincipal = (monthlyInstallment - paymentInterest)
    var endPrincipal = (outstandingPrincipal - paymentPrincipal)

    var rowData = "<tr><td>" + month + "</td><td>" + rate + "</td><td>" + outstandingPrincipal + "</td><td>" + monthlyInstallment + "</td><td>" + paymentInterest + "</td><td>" + paymentPrincipal + "</td><td>" + endPrincipal + "</td><td></td><td></td><td></td></tr>"

    $(".loandata").append(rowData);

    // Second Row onwards
    for (i = 2; i <= loanTenure * 12; i++) {
        var outstandingPrincipal = endPrincipal
        var paymentInterest = (outstandingPrincipal * rate / 100 / 12)
            // var paymentInterestRound = (round_number(paymentInterest, 2)).toFixed(2);
        var paymentPrincipal = (monthlyInstallment - paymentInterest)
        var endPrincipal = (outstandingPrincipal - paymentPrincipal)
            // var endPrincipalRound = (round_number(endPrincipal, 2)).toFixed(2);
        var rowData = "<tr><td>" + i + "</td><td>" + rate + "</td><td>" + outstandingPrincipal + "</td><td>" + monthlyInstallment + "</td><td>" + paymentInterest + "</td><td>" + paymentPrincipal + "</td><td>" + endPrincipal + "</td><td></td><td></td><td></td></tr>"

        if (i == 12) {
            // var rate = 3.5;
            var rate = $('.calc-homeloan-repayment .interest-yr2').val()
            var outstandingPrincipal = endPrincipal
            var monthlyInstallment = (getMonthlyInstallment(outstandingPrincipal, rate, i))
            var paymentInterest = (amt * rate / 100 / 12)
            var paymentPrincipal = (monthlyInstallment - paymentInterest)
        } else if (i == 24) {
            // var rate = 3.75;
            var rate = $('.calc-homeloan-repayment .interest-yr3').val()
            var outstandingPrincipal = endPrincipal
            var monthlyInstallment = (getMonthlyInstallment(outstandingPrincipal, rate, i))
        } else if (i == 36) {
            // var rate = 3.75;
            var rate = $('.calc-homeloan-repayment .interest-yr4').val()
            var outstandingPrincipal = endPrincipal
            var monthlyInstallment = (getMonthlyInstallment(outstandingPrincipal, rate, i))
        } else if (i == 48) {
            // var rate = 3.75;
            var rate = $('.calc-homeloan-repayment .interest-yr5').val()
            var outstandingPrincipal = endPrincipal
            var monthlyInstallment = (getMonthlyInstallment(outstandingPrincipal, rate, i))
        }
        $(".loandata").append(rowData);
    }

}


// Get Total Interest Payment Per Year

function getTotalInterestPaymentPerYear() {
    $('.loandata tr:nth-child(12n)').each(function() {
        var arr = []
        var interest12 = $(this).find('td:nth-child(5)').text()
        var interest11 = $(this).prev().find('td:nth-child(5)').text()
        var interest10 = $(this).prev().prev().find('td:nth-child(5)').text()
        var interest9 = $(this).prev().prev().prev().find('td:nth-child(5)').text()
        var interest8 = $(this).prev().prev().prev().prev().find('td:nth-child(5)').text()
        var interest7 = $(this).prev().prev().prev().prev().prev().find('td:nth-child(5)').text()
        var interest6 = $(this).prev().prev().prev().prev().prev().prev().find('td:nth-child(5)').text()
        var interest5 = $(this).prev().prev().prev().prev().prev().prev().prev().find('td:nth-child(5)').text()
        var interest4 = $(this).prev().prev().prev().prev().prev().prev().prev().prev().find('td:nth-child(5)').text()
        var interest3 = $(this).prev().prev().prev().prev().prev().prev().prev().prev().prev().find('td:nth-child(5)').text()
        var interest2 = $(this).prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().find('td:nth-child(5)').text()
        var interest = $(this).prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().find('td:nth-child(5)').text()
        arr.push(interest12, interest11, interest10, interest9, interest8, interest7, interest6, interest5, interest4, interest3, interest2, interest);
        var n = arr.length;
        var sum = 0;
        while (n--)
            sum += parseFloat(arr[n]) || 0;
        // sum = (round_number(sum, 2)).toFixed(2);
        $(this).find('td:nth-child(8)').html(sum)
    })
}

// Get TotalPrincipalPaymentPrYear

function getTotalPrincipalPaymentPerYear() {
    $('.loandata tr:nth-child(12n)').each(function() {
        var arrPrincipal = []
        var principal12 = $(this).find('td:nth-child(6)').text()
        var principal11 = $(this).prev().find('td:nth-child(6)').text()
        var principal10 = $(this).prev().prev().find('td:nth-child(6)').text()
        var principal9 = $(this).prev().prev().prev().find('td:nth-child(6)').text()
        var principal8 = $(this).prev().prev().prev().prev().find('td:nth-child(6)').text()
        var principal7 = $(this).prev().prev().prev().prev().prev().find('td:nth-child(6)').text()
        var principal6 = $(this).prev().prev().prev().prev().prev().prev().find('td:nth-child(6)').text()
        var principal5 = $(this).prev().prev().prev().prev().prev().prev().prev().find('td:nth-child(6)').text()
        var principal4 = $(this).prev().prev().prev().prev().prev().prev().prev().prev().find('td:nth-child(6)').text()
        var principal3 = $(this).prev().prev().prev().prev().prev().prev().prev().prev().prev().find('td:nth-child(6)').text()
        var principal2 = $(this).prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().find('td:nth-child(6)').text()
        var principal = $(this).prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().find('td:nth-child(6)').text()
        arrPrincipal.push(principal12, principal11, principal10, principal9, principal8, principal7, principal6, principal5, principal4, principal3, principal2, principal);
        var n = arrPrincipal.length;
        var sum = 0;
        while (n--)
            sum += parseFloat(arrPrincipal[n]) || 0;
        // sum = (round_number(sum, 2)).toFixed(2);
        $(this).find('td:nth-child(9)').html(sum)
    })
}

// Get RemainingPrincipalPaymentPrYear
function getRemainingPrincipalPaymentPerYear() {
    $('.loandata tr:nth-child(12n)').each(function() {
        var remainingPrincipal = $(this).find('td:nth-child(7)').text()
        $(this).find('td:nth-child(10)').html(remainingPrincipal)
    })
}

// Total Interest Payable
function getTotalInterestPayable() {
    var rowAmt = $('.loandata tr').length
    var arrTotalInterest = []
    for (i = 1; i <= rowAmt; i++) {
        var getInterest = $(".loandata").find('tr:nth-child(' + i + ')').find('td:nth-child(5)').text()
        arrTotalInterest.push(getInterest);

    }
    var n = arrTotalInterest.length;
    var sumInterest = 0;
    while (n--)
        sumInterest += parseFloat(arrTotalInterest[n]) || 0;

    // toolsSetCalculatedValue('.calc-homeloan-repayment .total-interest-payable', Math.floor(sumInterest).toLocaleString().split('.')[0])
    toolsSetCalculatedValue('.calc-homeloan-repayment .total-interest-payable', Math.round(sumInterest).toLocaleString().split('.')[0]);

    sumInterestNo = sumInterest

}

// Excel functions. 
// IMPORTANT: rate is percentage in decimal (x/100);
  function FV (rate, nper, pmt, pv, type) 
  {
    if (!type) type = 0;
    var pow = Math.pow(1 + rate, nper);
    var fv = 0;

    if (rate) {
      fv = (pmt * (1 + rate * type) * (1 - pow) / rate) - pv * pow;
    } 
    else 
    {
      fv = -1 * (pv + pmt * nper);
    }

    // return fv.toFixed (2);
    return fv;
  }

  function PV (rate, periods, payment, future, type) 
  {
    // Initialize type
    var type = (typeof type === 'undefined') ? 0 : type;
    var future = (typeof future === 'undefined') ? 0 : future;

    // Return present value
    if (rate === 0) 
    {
      return - payment * periods - future;
    } 
    else 
    {
      return (((1 - Math.pow(1 + rate, periods)) / rate) * payment * (1 +rate * type) - future) / Math.pow(1 + rate, periods);
    }
  }

  function PMT (rate, nper, pv, fv, type) 
  {
    if (!fv) fv = 0;
    if (!type) type = 0;

    if (rate == 0) return -(pv + fv)/nper;
    
    var pvif = Math.pow(1 + rate, nper);
    var pmt = rate / (pvif - 1) * -(pv * pvif + fv);

    if (type == 1) {
      pmt /= (1 + rate);
    };

    return pmt;
  }


// Effective Interest Rate
function rateExcel(nper, pmt, pv, fv, type, estimate) {
    fv = fv || 0;
    type = type || 0;
    estimate = estimate || 0.1;

    var rate = estimate,
        y = 0,
        f = 0,
        FINANCIAL_MAX_ITERATIONS = 128,
        FINANCIAL_PRECISION = 1.0e-08,
        result;

    // if (Math.abs(rate) < FINANCIAL_PRECISION) {
    //     y = pv * (1 + nper * rate) + pmt * (1 + rate * type) * nper + fv;
    // } else {
    //     f = Math.exp(nper * Math.log(1 + rate));
    //     y = pv * f + pmt * (1 / rate + type) * (f - 1) + fv;
    // }
    y = pv * (1 + nper * rate) + pmt * (1 + rate * type) * nper + fv;

    var y0 = pv + pmt * nper + fv,
        y1 = pv * f + pmt * (1 / rate + type) * (f - 1) + fv;

    // find root by secant method
    var i = 0,
        x0 = 0,
        x1 = rate;
    while ((Math.abs(y0 - y1) >
            FINANCIAL_PRECISION) && (i < FINANCIAL_MAX_ITERATIONS)) {
        rate = (y1 * x0 - y0 * x1) / (y1 - y0);
        x0 = x1;
        x1 = rate;

        if (Math.abs(rate) < FINANCIAL_PRECISION) {
            y = pv * (1 + nper * rate) + pmt * (1 + rate * type) * nper + fv;
        } else {
            f = Math.exp(nper * Math.log(1 + rate));
            y = pv * f + pmt * (1 / rate + type) * (f - 1) + fv;
        }

        y0 = y1;
        y1 = y;
        ++i;
    }

    result = new Number(rate);
    // result.html = Globalize.format(rate, "p");
    return result;
}

// Total Amount Payable
function getTotalAmtPayable() {
    var amt = parseInt($('.calc-homeloan-repayment .principal-amount').val().replace(/,/g, ''), 10)
    var totalInterestPayableOri = $('.calc-homeloan-repayment .total-interest-payable').text();
    var totalInterestPayable = totalInterestPayableOri.replace(/\D/g, '');
    var totalAmtPayable = parseFloat(totalInterestPayable) + parseFloat(amt)
    toolsSetCalculatedValue('.calc-homeloan-repayment .total-amt-payable', parseFloat(totalAmtPayable).toLocaleString().split('.')[0])
    totalAmtPayableNo = amt + sumInterestNo;
}

// Calculation Function
function getMonthlyInstallment(pOutstandingPrincipal, pInterestRate, pMonthsPassed) {
    var loanTenure = $('.calc-homeloan-repayment .loan-tenure').val()
    var monthlyInstallmentResult = ((pInterestRate / 1200) + ((pInterestRate / 1200) / (Math.pow(1 + (pInterestRate / 1200), (loanTenure * 12) - pMonthsPassed) - 1))) * pOutstandingPrincipal;
    return (monthlyInstallmentResult);
}

function calculationTableLayout() {

    // Setting each results to be closest number, and adding dollar symbol
    var currencyPrefix = $('.calc-homeloan-repayment .loan-amt').attr('data-prefix')

    $('.loandata td:nth-child(4), .loandata td:nth-child(8), .loandata td:nth-child(9), .loandata td:nth-child(10)').each(function() {
        var value = $(this).text();
        if ($.isNumeric(value)) {
            // var final = Math.floor(value);
            var final = Math.round(value);
            $(this).text(currencyPrefix + " " + final.toLocaleString().split('.')[0])
        }
    });

    // Change month to year
    $('.loandata td:nth-child(1)').each(function() {
        var value = $(this).text();
        if ($.isNumeric(value)) {
            var final = value / 12
            $(this).text(final)
        }
    });

    // Add percentage to Montly Instalment
    $('.loandata td:nth-child(2)').each(function() {
        var value = $(this).text();
        if ($.isNumeric(value)) {
            var final = value + "%"
            $(this).text(final)
        }
    });

    // Hide irrelevant columns
    $('.loan-repayment-table th:nth-child(3)').hide()
    $('.loan-repayment-table td:nth-child(3)').hide()
    $('.loan-repayment-table th:nth-child(5)').hide()
    $('.loan-repayment-table td:nth-child(5)').hide()
    $('.loan-repayment-table th:nth-child(6)').hide()
    $('.loan-repayment-table td:nth-child(6)').hide()
    $('.loan-repayment-table th:nth-child(7)').hide()
    $('.loan-repayment-table td:nth-child(7)').hide()

    $('.loandata tr').hide()
    $('.loandata tr:nth-child(12n)').show()

    //Ensure Last Value is always 0
    var currencyPrefix = $('.calc-homeloan-repayment .loan-amt').attr('data-prefix')
    $('.loandata:last-child tr:last-child td:last-child').html(currencyPrefix + ' 0');

}

function getEffectiveInterestRate() {
    // Effective Interest Rate
    var amt = parseFloat($('.calc-homeloan-repayment .principal-amount').val().replace(/,/g, ''), 10)
    var loanTenure = $('.calc-homeloan-repayment .loan-tenure').val()
    var rate = $('.calc-homeloan-repayment .interest-yr1').val()
    var loanTenureMonths = loanTenure * 12

    // var pmt = -(totalPrincipalInterest / (loanTenureMonths))
    var pmt = -(totalAmtPayableNo / (loanTenureMonths))

    pmt = parseFloat(pmt);

    var fv = 0
    var type = 0
    var estimate = 0.1

    var effectiveInterestRate = (rateExcel(loanTenureMonths, pmt, amt, fv, type, estimate) * 12) * 100
    var effectiveInterestRateFinal = Math.round(effectiveInterestRate * 100) / 100

    $('.eff-rate').html(effectiveInterestRateFinal + '%');
}

// Set Interest rate to enable decimal
$(function($) {
    $('.interest-yr1, .interest-yr2, .interest-yr3, .interest-yr4, .interest-yr5').autoNumeric('init', {
        vMax: 99.99
    });;
});

if ($('.calc-homeloan-repayment').length) {
    // init
    $('.calc-homeloan-repayment .principal-amount').val('500,000');
    $('.calc-homeloan-repayment .loan-tenure').val('25');
    $('.calc-homeloan-repayment .interest-yr1').val('3.25');
    $('.calc-homeloan-repayment .interest-yr2').val('3.50');
    $('.calc-homeloan-repayment .interest-yr3').val('3.75');
    $('.calc-homeloan-repayment .interest-yr4').val('3.75');
    $('.calc-homeloan-repayment .interest-yr5').val('3.75');

    // $(".interest-yr1, .interest-yr2, .interest-yr3, .interest-yr4, .interest-yr5").keypress(function (event) {
    //     if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
    //         event.preventDefault();
    //     }

    //     var text = $(this).val();

    //     if ((text.indexOf('.') != -1) && (text.substring(text.indexOf('.')).length > 2)) {
    //         event.preventDefault();
    //     }
    // });

    $('.calc-homeloan-repayment .btn-calculate').click(function() {

        var errorLoanAmtMin = $('.error-loanamtmin').css('display');
        var errorLoanAmtMax = $('.error-loanamtmax').css('display');
        var errorLoanTenureMin = $('.error-loantenuremin').css('display');
        var errorLoanTenureMax = $('.error-loantenuremax').css('display');
        var errorInterest = $('.error-interestrateempty').css('display');

        if (errorLoanAmtMin == 'block' || errorLoanAmtMax == 'block' || errorLoanTenureMin == 'block' || errorLoanTenureMax == 'block' || errorInterest == 'block') {} else {
            $('.loandata').empty();
            $('.more').remove();
            $('.calc-homeloan-repayment .results-container').slideDown(500)
            prepareLoanRepaymentTable()
            getTotalInterestPaymentPerYear()
            getTotalPrincipalPaymentPerYear()
            getRemainingPrincipalPaymentPerYear()
            getTotalInterestPayable()
            getTotalAmtPayable()
            getEffectiveInterestRate()
            calculationTableLayout()
            expandTable()
                // console.log(sumInterestNumber);

        }

    })

    $('.calc-homeloan-repayment .numeric-only').keyup(function() {
        if ($('.results-container').css('display') == 'block') {
            $('.calc-homeloan-repayment .btn-calculate').html('Recalculate');
            $('.calc-homeloan-repayment .results-container').fadeOut(500);
        }
        calcItemChecking()
    });
}

function calcItemChecking() {
    var calcPrincipal = $('.calc-homeloan-repayment .principal-amount').val();
    var calcLoanTenure = $('.calc-homeloan-repayment .loan-tenure').val();

    var calcPrincipalMin = $('.calc-homeloan-repayment .principal-amount-min').val();
    var calcPrincipalMax = $('.calc-homeloan-repayment .principal-amount-max').val();
    var loanTenureMin = $('.calc-homeloan-repayment .loan-tenure-min').val();
    var loanTenureMax = $('.calc-homeloan-repayment .loan-tenure-max').val();

    var interestRate1 = $('.calc-homeloan-repayment .interest-yr1').val();
    var interestRate2 = $('.calc-homeloan-repayment .interest-yr2').val();
    var interestRate3 = $('.calc-homeloan-repayment .interest-yr3').val();
    var interestRate4 = $('.calc-homeloan-repayment .interest-yr4').val();
    var interestRate5 = $('.calc-homeloan-repayment .interest-yr5').val();

    // Set Checking
    if (calcPrincipal < parseInt(calcPrincipalMin)) {
        $('.calc-homeloan-repayment .error-loanamtmin').show()
    } else {
        $('.calc-homeloan-repayment .error-loanamtmin').hide()
    }
    if (calcPrincipal > parseInt(calcPrincipalMax)) {
        $('.calc-homeloan-repayment .error-loanamtmax').show()
    } else {
        $('.calc-homeloan-repayment .error-loanamtmax').hide()
    }
    if (calcLoanTenure < parseInt(loanTenureMin)) {
        $('.calc-homeloan-repayment .error-loantenuremin').show()
    } else {
        $('.calc-homeloan-repayment .error-loantenuremin').hide()
    }
    if (calcLoanTenure > parseInt(loanTenureMax)) {
        $('.calc-homeloan-repayment .error-loantenuremax').show()
    } else {
        $('.calc-homeloan-repayment .error-loantenuremax').hide()
    }
    if (interestRate1 != '') {
        $('.calc-homeloan-repayment .error-interestrateempty').hide()
    }
    emptyInterestRate($('.calc-homeloan-repayment .interest-yr1'));
    emptyInterestRate($('.calc-homeloan-repayment .interest-yr2'));
    emptyInterestRate($('.calc-homeloan-repayment .interest-yr3'));
    emptyInterestRate($('.calc-homeloan-repayment .interest-yr4'));
    emptyInterestRate($('.calc-homeloan-repayment .interest-yr5'));

    function emptyInterestRate(element) {
        if (element.val() == '') {
            $('.calc-homeloan-repayment .error-interestrateempty').show()
        }
    }
}

function expandTable() {
    $('.expandable-table').each(function() {
        var numShown = 5; // Initial rows shown & index
        var numMore = 5; // Increment
        var $table = $(this).find('tbody'); // tbody containing all the rows
        var numRows = $table.find('tr:nth-child(12n)').length; // Total # rows

        if (numRows >= numShown) {
            // Hide rows and add clickable div
            $table.find('tr:gt(' + (numShown * 12) + ')').hide().end()
                .after('<tbody class="more"><tr><td colspan="' +
                    $table.find('tr:first td').length + '"><div>Show More <i class="icon-core_solid_arrow_down"></i></div></tbody></td></tr>');
        }


        $(this).find('.more').click(function() {
            numShown = numShown + numMore;
            // no more "show more" if done
            if (numShown >= numRows) {
                $(this).remove();
            }
            // change rows remaining if less than increment
            if (numRows - numShown < numMore) {
                $(this).find('span').html(numRows - numShown);
            }
            $table.find('tr:nth-child(12n):lt(' + (numShown) + ')').show();
        });
    })
}

$(window).load(function() {
    $(".calc-disclaimer-content .scrollable-content").mCustomScrollbar();
});

// ON CLICK (FOR ANCHOR LINK SAME PAGE)
$(document).ready(function() {
    anchorLinkScroll();
})

function anchorLinkScroll() {
    $("a[href*='#']").click(function() {
        var topOffset = $(this).attr("topOffset")
        topOffset = 135
        if ($(window).width() < 1000) {
            $(".hyperlink-listing").slideUp();
            // topOffset = 45
        }
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name="' + this.hash.slice(1) + '"]');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top - topOffset
                }, 700);
            }
        }
    });
}

//slidedown button menu biz123
$( ".slidedown-btn" ).click(function() {
  $( ".hyperlink-listing-dropdown" ).slideToggle( "slow" );
});

// Check if current page has a #, if yes, scroll appropriately (desktop)
$(window).load(function() {
    if (window.location.hash) {
        var anchorName = window.location.hash.substring(1);
        var anchorEle = $('[name="' + anchorName + '"]');
        var anchorPosition;
        if (anchorEle.length) {
            anchorPosition = anchorEle.offset().top;
        }
        else {
            anchorPosition = 0;
        }
        var newTop = anchorPosition - 90

        $('html,body').animate({
            scrollTop: newTop
        }, 700);

    }
})

// For third party website popup trigger
$('.manualswitch').attr("href", "javascript:void(0)")

// Fix for faulty tiles adjustment (Singapore Site)
// NOTE: FAULTY IF ROTATING TILE IS POSITIONED IN FIRST TEN (extra parent column seem to be generated)
function readjustHalfBreakTiles() {
    var windowWidth = $(window).width();
    if (windowWidth > 480 && windowWidth < 800) {
        $('.firstten .rotatingtile').parent().parent().css("cssText", "width: 100% !important;");
        $('.lastten .rotatingtile').width(windowWidth);
    } else {
        $('.firstten .rotatingtile').parent().parent().removeAttr('style');
        $('.lastten .rotatingtile').removeAttr('style');
    }

    $('.tilecontainer').each(function() {
        if ($(this).find('.five.columns').length > 0 && $(this).find('.ten.columns').length > 0) {
            if (windowWidth > 480 && windowWidth < 800) {
                $(this).find('.ten.columns').css("cssText", "width: 100% !important;")
            } else {
                $(this).find('.ten.columns').removeAttr('style');
            }
        }
    })
}

$(document).ready(readjustHalfBreakTiles);
$(window).resize(readjustHalfBreakTiles);

// Subscribe e-Newsletter script

$(document).ready(function() {
    if ($('#popup-signup-enews').length > 0) {
        subscribeEnews()
    }
})

// Privilege.
// $(document).ready(function() {
//     setAllToMaxHeight($(".privilege-item"));
// })

// Alphabet only
var getKeyCode = function (str) {
    return str.charCodeAt(str.length - 1);
}

function alphaOnly(event) {
  // var key = event.keyCode;
  // return ((key >= 65 && key <= 90) || key == 8 || key == 8 || key == 229);

  var key = event.keyCode || event.which;
    if (key == 0 || key == 229) { //for android chrome keycode fix
        key = getKeyCode(this.value);
    }
    return ((key >= 65 && key <= 90) || key == 8 || key == 32 || key == 9);

};

function applicantName(event) {
  // var key = event.keyCode;
  // return ((key >= 65 && key <= 90) || key == 8 || key == 8 || key == 229);

  var key = event.keyCode || event.which;
  var shiftKey = event.shiftKey || event.which;
    if (key == 0 || key == 229) { //for android chrome keycode fix
        key = getKeyCode(this.value);
    }
    if (shiftKey == true){
        return (key == 50 || key >= 65 && key <= 90 );
    }
    return ((key >= 65 && key <= 90) || key == 8 || key == 32 || key == 9 || key == 191 || key == 189 || key == 37 || key == 39) ;

};

function alphaOnlyTwo(event) {
  // var key = event.keyCode;
  // return ((key >= 65 && key <= 90) || key == 8 || key == 8 || key == 229);

  var key = event.keyCode || event.which;
    if (key == 0 || key == 229) { //for android chrome keycode fix
        key = getKeyCode(this.value);
    }
    return ((key >= 65 && key <= 90) || key == 8 || key == 32 || key == 9 || key == 39 || key == 190);

};

function alphaPunct(event) {

  var key = event.keyCode || event.which;
  console.log (key);
    if (key == 0 || key == 229) { //for android chrome keycode fix
        key = getKeyCode(this.value);
    }
    return ((key >= 65 && key <= 90) || key == 8 || key == 32 || key == 9 || key == 16 || key == 50 || key == 188 || key == 191 || key == 220 || key == 189 || key == 187 || key == 222 || key == 37 || key == 39 || key == 190);

};

// Rotating banner (Cards version)
$(document).ready(function() {
    $('.cards-banner-slider').flexslider({
        controlsContainer: ".card-rounded-nav-control",
        animation: "slide",
        slideshow: true
    });

    $(".card-arrow-nav-control .flex-buttons").click(function() {
        var obj = $(this)
        var direction = obj.attr("direction")
        $('.cards-banner-slider').flexslider(direction)
    })
});

// Rotating in Property Detail page

$(document).ready(function() {
    if ($('.property-thumb-carousel').length > 0) {
        // Gallery
        $(".property-thumb-carousel").owlCarousel({
            navigation: false, // Show next and prev buttons
            pagination: true,
            slideSpeed: 300,
            paginationSpeed: 400,
            singleItem: true
        });
    }
});

// Title Image Gallery Text Component (copied over by naresh)

$(document).ready(function() {

    if ($('.titleimagegalleryandtext-container').length > 0) {
        $('.popup-gallery').magnificPopup({
            delegate: 'a',
            type: 'image',
            tLoading: 'Loading image #%curr%...',
            mainClass: 'mfp-img-mobile',
            gallery: {
                enabled: true,
                navigateByImgClick: true,
                preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
            },
            image: {
                tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
            }
        });

        $('.meeting-row .btn-gallery, .meeting-row .thumb-img').click(function() {
            $(this).closest('.meeting-row').find('.popup-gallery a:nth-child(1)').click();
        });

        $('.popup-gallery-carousel').owlCarousel({
            navigation: false, // Show next and prev buttons
            pagination: true,
            slideSpeed: 300,
            paginationSpeed: 400,
            itemsCustom: [
                [0, 2],
                [480, 3],
                [768, 4]
            ]
        });

        // Close Video Popup
        $('.video-popup .btn-close').click(function() {
            $('.video-popup').fadeOut(200);
            $('video').each(function() {
                this.player.pause()
            })
        });

        $('.meeting-row .btn-video, .meeting-row .thumb-video').click(function() {
            $(this).closest('.meeting-row').find('.video-popup').fadeIn(200);
            resizeVideoContainer();
        });

        $(window).afterResize(function() {
            resizeVideoContainer();
        })

        function resizeVideoContainer() {
            $('video').each(function() {
                containerHeight = $(this).closest('.video-container').height() * 0.8;
                containerWidth = $(this).closest('.video-container').width();
                $('.mejs-container, .mejs-overlay-play').height(containerHeight).width(containerWidth);
            });

        }
    }

    

});





// Digit add commas function

(function( $ ) {
    $.fn.numberAddCommas = function() {

        /* remove all commas from string */
        function stripcommas (string) {
            return string.replace (/\,+/g, "");
        }

        /* add commas to string */
        function addcommas (string) {
            return string.replace (/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
        }

        var field = this;
        /* get field max attribute value or set to -1 */
        var fieldmaxvalue = $(field).attr ('max');
        if (fieldmaxvalue == undefined || fieldmaxvalue == "") { fieldmaxvalue = -1; }

        /* hold existing field value */
        $(field).attr ({ 'current-value': $(field).val () });

        /* start placing the commas into the string */
        $(field).on ("keyup.checkLengthForCommas", function () {
            setTimeout (function () {
                var fieldval = $(field).val ();

                /* perform the comma only if the value is different from existing value */
                if (fieldval != $(field).attr ('current-value'))
                {
                    fieldval = stripcommas (fieldval);
                    
                    /* enforce max */
                    if (fieldmaxvalue != -1 && parseInt (fieldval) > parseInt (fieldmaxvalue))
                    { 
                        fieldval = fieldmaxvalue; 
                    }

                    /* add commas */
                    $(field).val (addcommas (fieldval));

                    /* update existing value holder */
                    $(field).attr ({ 'current-value': $(field).val () });
                }
            }, 99);
        });
        $(field).addClass ('-numberAddCommas-wired-');
    }
})( jQuery );

$(document).ready (function () {
    $('.numberAddCommas').filter (':not(.-numberAddCommas-wired-)').each (function (index, item) { 
        $(item).numberAddCommas(); 
    });
});


// Input calculator for Mortgage Utilisation Loan


var reflecTimer = undefined;
    
function mortgageUtilisationCalc (waitforit)
  {
    if (reflecTimer != undefined)
    {
      clearTimeout (reflecTimer);
    }

    reflecTimer = setTimeout (function () {


        $('.ave-daily-accbalance').on('blur', function() {        
            var num = parseFloat($(this).val()) || 0;
            var cleanNum = num.toLocaleString('en');
            var splitNum = cleanNum.split('.');
            if (splitNum.length < 2) {
              // Need to append .00 if num was an integer
              cleanNum = cleanNum + '.00';
            } else {
              // Append 0 if there was only 1 decimal, otherwise trim
              // to 2 decimals
              var decimals = splitNum[1];
              decimals = decimals.length < 2 ? decimals + '0' : decimals.slice(0, 2);
              cleanNum = splitNum[0] + '.' + decimals;
            }
            $(this).val(cleanNum);
     
        });

        $('.facilitylimit').on('blur', function() {  
            var num = parseFloat($(this).val()) || 0;
            var cleanNum = num.toLocaleString('en');
            var splitNum = cleanNum.split('.');
            if (splitNum.length < 2) {
              // Need to append .00 if num was an integer
              cleanNum = cleanNum + '.00';
            }
            else {
              // Append 0 if there was only 1 decimal, otherwise trim
              // to 2 decimals
              var decimals = splitNum[1];
              decimals = decimals.length < 2 ? decimals + '0' : decimals.slice(0, 2);
              cleanNum = splitNum[0] + '.' + decimals;
            }
            $(this).val(cleanNum);
           
        });

        $('.month-end-balance').on('blur', function() {  
            var num = parseFloat($(this).val()) || 0;
            var cleanNum = num.toLocaleString('en');
            var splitNum = cleanNum.split('.');
            if (splitNum.length < 2) {
              // Need to append .00 if num was an integer
              cleanNum = cleanNum + '.00';
            }
            else {
              // Append 0 if there was only 1 decimal, otherwise trim
              // to 2 decimals
              var decimals = splitNum[1];
              decimals = decimals.length < 2 ? decimals + '0' : decimals.slice(0, 2);
              cleanNum = splitNum[0] + '.' + decimals;
            }
            $(this).val(cleanNum);
       
        });

        $(".ave-daily-accbalance").on('keyup',
            function() {
                $('.calc-mortg-util .results-container').slideUp();
                var numDaysMonth = parseInt($(".numdays-month").val(), 10);
                var dailyFlexi = parseInt($(".ave-daily-accbalance").val(), 10);
                var resultDaysFlexi = numDaysMonth * dailyFlexi;
                var roundResult = Math.round(resultDaysFlexi/100)*100;

                toolsSetCalculatedValue('.calc-result-sumflexiacc', parseFloat(roundResult).toFixed(2));
              
            }
        );

        $(".ave-daily-accbalance").on('keyup',
            function() {
                $('.calc-mortg-util .results-container').slideUp();
                var dailyFlexi = parseInt($(".ave-daily-accbalance").val(), 10);
                var monthlyEndLimit = parseInt($(".facilitylimit").val(), 10);
                var targetutil = 0.7;

                var bank = dailyFlexi / targetutil;
                var roundBank = Math.round(bank);
                roundBank = roundBank.toLocaleString ('en');

                 var splitNum = roundBank.split('.');
                if (splitNum.length < 2) {
                  // Need to append .00 if num was an integer
                  roundBank = roundBank + '.00';
                } else {
                  // Append 0 if there was only 1 decimal, otherwise trim
                  // to 2 decimals
                  var decimals = splitNum[1];
                  decimals = decimals.length < 2 ? decimals + '0' : decimals.slice(0, 2);
                  roundBank = splitNum[0] + '.' + decimals;
                }    
                toolsSetCalculatedValue('.calc-result-bank', roundBank);
            }
        );
        
        $(".facilitylimit").on('keyup',
            function() {
                $('.calc-mortg-util .results-container').slideUp();
                var dailyFlexi = parseInt($(".ave-daily-accbalance").val(), 10);
                var monthlyEndLimit = parseInt($(".facilitylimit").val(), 10);
                var targetutil = 0.7;

                var bank = dailyFlexi / targetutil;
                var roundBank = Math.round(bank);    
                var result = monthlyEndLimit - roundBank;
                result = result.toLocaleString ('en');

                 var splitNum = result.split('.');
                if (splitNum.length < 2) {
                  // Need to append .00 if num was an integer
                  result = result + '.00';
                } else {
                  // Append 0 if there was only 1 decimal, otherwise trim
                  // to 2 decimals
                  var decimals = splitNum[1];
                  decimals = decimals.length < 2 ? decimals + '0' : decimals.slice(0, 2);
                  result = splitNum[0] + '.' + decimals;
                }    

                toolsSetCalculatedValue('.calc-result-prinreduc', result);
                
            }
        );

        $(".month-end-balance").on('keyup',
            function() {
                //$('.calc-mortg-util .results-container').slideUp();
                //var dailyFlexi = parseInt($(".ave-daily-accbalance").val(), 10);
                var facilityLimit = parseInt($(".facilitylimit").val().replace(",",""), 10);
                var monthendbalance = parseInt($(".month-end-balance").val().replace(",",""), 10);
                console.log(monthendbalance + "monthendbalance");
                var targetutil = 0.7;
                //var rate =parseFloat(dailyFlexi/facilityLimit).toFixed(2)*100;
                var withdrawalAMT = (facilityLimit * targetutil) - monthendbalance;
                withdrawalAMT = withdrawalAMT.toLocaleString ('en');

                 var splitNum = withdrawalAMT.split('.');
                if (splitNum.length < 2) {
                  // Need to append .00 if num was an integer
                  withdrawalAMT = withdrawalAMT + '.00';
                } else {
                  // Append 0 if there was only 1 decimal, otherwise trim
                  // to 2 decimals
                  var decimals = splitNum[1];
                  decimals = decimals.length < 2 ? decimals + '0' : decimals.slice(0, 2);
                  withdrawalAMT = splitNum[0] + '.' + decimals;
                }
                //var roundwithdrawalAMT = Math.round(withdrawalAMT);    
                //var result = roundwithdrawalAMT - dailyFlexi
                
                if (withdrawalAMT < 0){
                    toolsSetCalculatedValue('.calc-result-withdrawal', 0);

                }
                else {
                    toolsSetCalculatedValue('.calc-result-withdrawal', withdrawalAMT);

                }

                
            }
        );


        $(".facilitylimit").on('keyup',
            function() {
                $('.calc-mortg-util .results-container').slideUp();
                var dailyFlexi = parseInt($(".ave-daily-accbalance").val().replace(",",""), 10);
                var monthlyEndLimit = parseInt($(".facilitylimit").val().replace(",",""), 10);
                //console.log(dailyFlexi +"dailyflexi");
                //console.log(monthlyEndLimit+"monthlylimit");
                var excessPayment = monthlyEndLimit - dailyFlexi;
                excessPayment = excessPayment.toLocaleString ('en');

                var splitNum = excessPayment.split('.');
                if (splitNum.length < 2) {
                  // Need to append .00 if num was an integer
                  excessPayment = excessPayment + '.00';
                } else {
                  // Append 0 if there was only 1 decimal, otherwise trim
                  // to 2 decimals
                  var decimals = splitNum[1];
                  decimals = decimals.length < 2 ? decimals + '0' : decimals.slice(0, 2);
                  excessPayment = splitNum[0] + '.' + decimals;
                }
                toolsSetCalculatedValue('.calc-result-excesspayment', excessPayment);
            }
        );


        //calculation for monthly utilisation rate
        $(".ave-daily-accbalance").on('keyup',
            function() {
                $('.calc-mortg-util .results-container').slideUp();
                 var monthlyEndLimit = parseInt($(".facilitylimit").val().replace(",",""), 10);
                 var dailyFlexi = parseInt($(".ave-daily-accbalance").val().replace(",",""), 10);
                 var monthlyutilrate = Math.round((dailyFlexi/monthlyEndLimit)*100);
                 toolsSetCalculatedValue('.calc-result-mthly-utilisationrate', parseFloat(monthlyutilrate).toFixed());
                if(monthlyutilrate>=70){
                    $("#lessthan70util").hide();
                    $("#applicable").hide();
                    $("#notapplicable").show();


                }
                else{
                    $("#lessthan70util").show();
                     $("#notapplicable").hide();
                    $("#applicable").show();


                }
            }
        );
        
        $(".facilitylimit").on('keyup',
            function() {
                $('.calc-mortg-util .results-container').slideUp();
                 var monthlyEndLimit = parseInt($(".facilitylimit").val().replace(",",""), 10); 
                 var dailyFlexi = parseInt($(".ave-daily-accbalance").val().replace(",",""), 10);
                 var monthlyutilrate = Math.round((dailyFlexi/monthlyEndLimit)*100);
                 toolsSetCalculatedValue('.calc-result-mthly-utilisationrate', parseFloat(monthlyutilrate).toFixed());
                if(monthlyutilrate>=70){
                    $("#lessthan70util").hide();
                    $("#applicable").hide();
                    $("#notapplicable").show();


                }
                else{
                    $("#lessthan70util").show();
                     $("#notapplicable").hide();
                    $("#applicable").show();


                }
            }
        );

    }, waitforit);


}


Date.prototype.parseISO8601 = function(date){
    console.log (date);
    var matches = date.match (/^\s*(\d{4})-(\d{1,2})-(\d{1,2})\s*$/);
    if(matches){
        this.setFullYear(parseInt(matches[1]));
        this.setMonth(parseInt(matches[2]) - 1);
        this.setDate(parseInt(matches[3]));
    }
    return this;
};

$(function() {

    $('.monthYear').datepicker({
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,
        dateFormat: 'MM yy'
    }).focus(function() {
        var thisCalendar = $(this);
        $('.ui-datepicker-calendar').detach();
        $('.ui-datepicker-close').click(function() {
            var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
            month = parseInt (month) + 1;
            console.log(month);
            if (month < 10) month = "0" + month;
            var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
            console.log(year);
            var selectedate = (new Date ()).parseISO8601 (year + "-" + month + "-01");
            thisCalendar.datepicker('setDate', selectedate);
        });
    });

    $(document).on('click', '.js-print-th[data-print]', function(e) {
        e.preventDefault();
        var prinArea = $(this).attr('data-print');
        // var printTitle = $(this).attr('data-title');
        // var printHeader = $('.header-primary').clone();
        // printHeader.css('border-bottom', '3px solid #ec1d23').css('padding-bottom', '10px').css('margin-bottom', '20px');
        // printHeader.find('.main-logo-wrapper').css('position', 'static');
        // printHeader.find('.header-primary-user-nav, .mobile-only, .m-language-select, .mobile-secured-dropdown').remove();
        $(prinArea).print({
            globalStyles: true,
            mediaPrint: false,
            stylesheet: null,
            noPrintSelector: ".no-print",
            iframe: true,
            append: null,
            // prepend: printHeader,
            manuallyCopyFormValues: true,
            deferred: $.Deferred(),
            timeout: 750,
            // title: printTitle,
            doctype: '<!doctype html>'
        });
    });

    $('.selectedTime').change(function() {
            $('.selectedTime option[value="' + $(this).val() + '"]').attr("selected","selected").siblings().removeAttr("selected");
    });

});   



$(document).ready(function(){
    if ($('.calc-mortg-util').length) {

        // mortgageUtilisationCalc(500);

        $('.calc-mortg-util .btn-calculate').click(function() {

            var averageDailyBalanceAmount = $.trim($('.average-daily-balance').val());
            var currentFacilityLimitAmount = $.trim($('.current-facility-limit').val());

            if(averageDailyBalanceAmount == '' || currentFacilityLimitAmount == '') {
                alert("Please fill in all the fields");
                return;
            }

            var monthlyEndLimit = parseInt($(".current-facility-limit").val().replace(",",""), 10); 
            var dailyFlexi = parseInt($(".average-daily-balance").val().replace(",",""), 10);
            var monthlyutilrate = Math.round((dailyFlexi/monthlyEndLimit)*100);

            toolsSetCalculatedValue('.calc-result-mthly-utilisationrate', parseFloat(monthlyutilrate).toFixed());

            if (monthlyutilrate > 70) {
                $('.scene-1').show();
                $('.scene-2').hide();
                $('.results-container').slideDown();
            }
            else {
                $('.scene-1').hide();
                $('.scene-2').show();
                $('.results-container').slideDown();
            }

        });

        $('.calc-mortg-util .btn-calculate2').click(function() {

            var monthlyEndLimit = parseInt($(".current-facility-limit").val().replace(",",""), 10); 
            var dailyFlexi = parseInt($(".average-daily-balance").val().replace(",",""), 10);
            var monthlyutilrate = Math.round((dailyFlexi/monthlyEndLimit)*100);

            var dayEndBalanceAmount = parseInt($('.day-end-balance').val().replace(",",""), 10);
            var currentFacilityLimit2Amount = parseInt($('.current-facility-limit-2').val().replace(",",""), 10);

            if(dayEndBalanceAmount == '' || currentFacilityLimit2Amount == '') {
                alert("Please fill in all the fields");
                return;
            }

            var withdrawalAmount = Math.round((currentFacilityLimit2Amount*(70/100))-dayEndBalanceAmount);

            if(withdrawalAmount < 1) { withdrawalAmount = 0; }

            var val = withdrawalAmount.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");

            $('.calc-result-withdrawal-amount').html($('.calc-result-withdrawal-amount').data('prefix') + val + $('.calc-result-withdrawal-amount').data('suffix'));
            

        });

        $('.money-format').mask("#,##0.00", {reverse: true});

        $('.money-format').blur(function() {
            if ($.trim($(this).val()) == '' || $.trim($(this).val()) == '0') {
                $(this).val('0.00');
            }
        });

    }
});

$.fn.digits = function(){ 
    return this.each(function(){ 
        $(this).text( $(this).text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") ); 
    })
};


// For find the right cards 
function hideShowBtn() {
    var windowWidth = $(window).width();
    var btnRedCardlisting = $('.card-listing>ul>li .card-details-container .button-red');
    var btnRed = $('.button-red.hide-mobile');
    var btnRed2 = $('.button-red2.hide-mobile');
    var btnRedShowMobile = $('.card-listing>ul>li .card-details-container .button-red.show-mobile');
    var btnRed2ShowMobile = $('.button-red2.show-mobile');

    $(btnRedShowMobile).hide();
    $(btnRed2ShowMobile).hide();

    if (windowWidth < 1025) {
        $(btnRedCardlisting).css('display','inline-block');
        $(btnRed).css('display','inline-block');
        $(btnRed2).hide();
        $(btnRedShowMobile).css('display','inline-block');
        $(btnRed2ShowMobile).css('display','inline-block');
    } else {
        $(btnRedCardlisting).show();
        $(btnRed).show();
        $(btnRed2).show();
        $(btnRedShowMobile).hide();
        $(btnRed2ShowMobile).hide();
    }
    
}

$(document).ready(function(){
    hideShowBtn();
});

 $(window).resize(function() {
    hideShowBtn();
});

/// detect IE version ///
var incompatibleTmpl = '<div class="incompatible-overlay-support"><p>It looks like you&rsquo;re using an insecure version of Internet Explorer. Using an outdated browser makes your computer unsafe. For the best experience on the web, please update your browser.</p><p><a href="http://browsehappy.com/?locale=en" class="button-cta">Upgrade now!</a></p></div>';
$(document).ready(function(){
    if (Modernizr) {
        $('html').addClass('modernizr');
      }
      if (cssua.ua.ie > 10.0) {
        $('html').addClass('gt-ie10');
      }
      if (cssua.ua.ie > 9.0) {
        $('html').addClass('gt-ie9 oldie');
      }
      if (cssua.ua.ie > 8.0) {
        $('html').addClass('gt-ie8');
      }
      if (cssua.ua.ie > 7.0) {
        $('html').addClass('gt-ie7');
      }
      if (cssua.ua.ie < 10.0) {
        $('html').addClass('lt-ie10');
      }
      if (cssua.ua.ie < 9.0) {
        $('html').addClass('lt-ie9');
        //$('body').prepend(incompatibleTmpl);
      }
      if (cssua.ua.ie < 8.0) {
        $('html').addClass('lt-ie8');
      }
      if (cssua.ua.ie < 7.0) {
        $('html').addClass('lt-ie7');
      }
      if (cssua.ua.ie == 10.0) {
        $('html').addClass('ie10');
      }
      if (cssua.ua.ie == 9.0) {
        $('html').addClass('ie9');
      }
      if (cssua.ua.ie == 8.0) {
        $('html').addClass('ie8');
      }
      if (cssua.ua.ie == 7.0) {
        $('html').addClass('ie7');
      }
});




$(function() {
    if ($('[data-inputautocomplete]').length > 0) {
        $('[data-inputautocomplete]').each(function (e) {
            var input = $(this),
                endpoint = input.data('inputautocomplete'),
                minchars = input.data('minchars');
                
                // console.log(endpoint);

            input.autoComplete({
                minChars: minchars,
                source: function(term, suggest){
                    term = term.toLowerCase();
                    var choices = endpoint;
                    var matches = [];
                    for (i=0; i<choices.length; i++)
                        if (~choices[i].toLowerCase().indexOf(term)) matches.push(choices[i]);
                    suggest(matches);
                }
            });
        });
    }
	$('html.gumby-touch .external').on(Gumby.click, function(e) {
        var target = $(this).attr('external-link');
        if(target) {
            $('#external-site .more-link').attr('href', target);
        }
    });
});
