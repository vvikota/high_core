// width >= 1440
const variables = {
  leftContentPadding: 80,
  asideWidth: 106,
}

$(document).ready(function () {

  // header menu actions
  var lastId,
    topMenu = $(".header-menu"),
    firstSection = $(".home"),
    topMenuHeight = 100,
    firstSectionHeight = firstSection.outerHeight();
    (menuItems = topMenu.find("a.scroll-item-js")),
    (scrollItems = menuItems.map(function () {
      var item = $($(this).attr("href"))
      if (item.length) { return item }
    }))

  menuItems.click(function (e) {
    var href = $(this).attr("href"),
      windowWidth = $(window).width(),
      remains = windowWidth > 620 ? 0 : -50,
      offsetTop = href === "#" ? 0 : $(href).offset().top + remains;

    $("html, body").stop().animate(
      {
        scrollTop: offsetTop,
      },
      300
    )
    e.preventDefault()
  })

  var scrollPrev = 0

  $(window).scroll(function () {
    var fromTop = $(this).scrollTop() + topMenuHeight
    var cur = scrollItems.map(function () {
      if ($(this).offset().top < fromTop) return this
    })

    cur = cur[cur.length - 1]
    var id = cur && cur.length ? cur[0].id : ""

    if (lastId !== id) {
      lastId = id

      history.pushState(null, null, '/#' + lastId);

      menuItems
        .parent()
        .removeClass("active")
        .end()
        .filter("[href='#" + id + "']")
        .parent()
        .addClass("active")
    }

    // hide top menu
    if ($(window).width() > 980) {
      var scrolled = $(window).scrollTop()

      if (scrolled > firstSectionHeight && scrolled > scrollPrev) {
        $(".main-wrapper").addClass("hide-menu")
      } else {
        $(".main-wrapper").removeClass("hide-menu")
      }
      scrollPrev = scrolled
    }
  })

  // metaverse slider
  function changeSliderWidth() {
    const windowWidth = $(window).width()
    const contentWidth = $(".wrapper").width()
    let nextArrowPosition

    if (windowWidth > 820) {
      nextArrowPosition = contentWidth - 370
    } else if (windowWidth < 820 && windowWidth > 620) {
      nextArrowPosition = contentWidth - 270
    } else if (windowWidth < 620) {
      nextArrowPosition = contentWidth - 135
    }

    $(".metaverse-slider").width(windowWidth + 26)

    if (windowWidth > 620) {
      $(".metaverse-slider").css("left", "0px")
    } else {
      $(".metaverse-slider").css("left", "50px")
    }

    $(".metaverse-slider .slick-next").css("left", nextArrowPosition + "px")
    $(".metaverse button.first-slide").css("left", nextArrowPosition + "px")
  }

  changeSliderWidth()

  $(window).on("resize", changeSliderWidth)

  $(".metaverse-slider").on("init", function (event, slick) {
    changeSliderWidth()
  })

  $(".metaverse-slider").slick({
    variableWidth: true,
    infinite: true,
    lazyLoad: "ondemand",
  })

  $(".metaverse-slider").on(
    "afterChange",
    function (event, slick, currentSlide, nextSlide) {
      if (currentSlide > 0) {
        $(".metaverse .metaverse-slider .slick-prev").addClass("show")
      } else if (currentSlide === 0) {
        $(".metaverse .metaverse-slider .slick-prev").removeClass("show")
      }

      $(".slick-slide").removeClass("rotate")
      $(".slick-current").addClass("rotate")
    }
  )

  $("button.first-slide").click(function (e) {
    $(".metaverse-slider").slick("slickGoTo", 0)
  })

  // tanks slider
  $(".tank-slider").slick({
    arrows: false,
    cssEase: "linear",
    autoplay: true,
    autoplaySpeed: 0,
    speed: 3000,
    variableWidth: true,
    swipe: true
  })

  // map animation
  const position = $("#roadmap").offset().top,
    height = $("#roadmap").height()
  $(document).on("scroll", function () {
    var scroll = $(document).scrollTop()
    if (scroll > position && scroll < position + height) {
      $("#roadmap").addClass("showAnimation")
    }
  })

  $(document).on("scroll", function () {
    var videoHeight = $(".video").height(),
        scroll = $(document).scrollTop(),
        windowWidth = $(window).width(),
        remains = windowWidth > 620 ? 0 : -100,
        videoPosition = $(".video").offset().top + remains;

    if (scroll > videoPosition && scroll < videoPosition + videoHeight) {
      $(".video-wrapper video")[0].play()
    }
  })

  function videoResize() {
    const windowWidth = $(window).width()
    const contentWidth = $(".wrapper").width()
    const asideWidth = $(".aside").width()
    const videoSectionHeight = $(".video p").height()
    const videoContentHeight = (windowWidth / 1000) * 568

    const bias = (windowWidth - contentWidth) / 2 + asideWidth
    $(".video-wrapper").width(windowWidth)

    if (windowWidth > 620) {
      $(".video-wrapper").css("left", "-" + bias + "px")
    } else {
      $(".video-wrapper").css("left", "0")
    }

    $(".video").outerHeight(videoSectionHeight + videoContentHeight + 100)
  }

  videoResize()

  $(window).on("resize", videoResize)

  // mobile menu
  $(".burger-button").click(function (e) {
    $("body").addClass("block-scroll")
    $(".burger-menu").addClass("active")
  })

  $(".mobile-menu-closer").click(function (e) {
    $(".burger-menu").removeClass("active")
    $("body").removeClass("block-scroll")
  })

  $(".header-menu li a ").click(function (e) {
    $(".burger-menu").removeClass("active")
    $("body").removeClass("block-scroll")
  })

  // key features slider
  $(window).on("load resize orientationchange", function () {
    if ($(window).width() > 1135) {
      if ($(".key-content").hasClass("slick-initialized")) {
        $(".key-content").slick("unslick")
      }
    } else if (!$(".key-content").hasClass("slick-initialized")) {
      $(".key-content").slick({
        arrows: false,
        autoplay: true,
        autoplaySpeed: 1500,
        speed: 1000,
        variableWidth: true,
        dots: true,
        swipe: true,
        customPaging: function (slick, index) {
          return "<span></span>"
        },
      })
    }
  })

  // main video-background script
  $(window).on("load resize orientationchange", function () {
    const video = `<video src="./media/video/video_background.mp4" autoplay muted loop class="main-background"></video>`;

    const videoContainer = $(".main-background-wrapper");

    if ($(window).width() > 1150) {
      $(videoContainer).append(video)
    }
  })
})