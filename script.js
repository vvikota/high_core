$(document).ready(function () {
  // header menu actions
  var lastId,
    topMenu = $(".header-menu"),
    topMenuHeight = topMenu.outerHeight() + 15,
    menuItems = topMenu.find("a"),
    scrollItems = menuItems.map(function () {
      var item = $($(this).attr("href"))
      if (item.length) {
        return item
      }
    })

  menuItems.click(function (e) {
    var href = $(this).attr("href"),
      offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight + 1
    $("html, body").stop().animate(
      {
        scrollTop: offsetTop,
      },
      300
    )
    e.preventDefault()
  })

  $(window).scroll(function () {
    var fromTop = $(this).scrollTop() + topMenuHeight
    var cur = scrollItems.map(function () {
      if ($(this).offset().top < fromTop) return this
    })

    cur = cur[cur.length - 1]
    var id = cur && cur.length ? cur[0].id : ""

    if (lastId !== id) {
      lastId = id

      menuItems
        .parent()
        .removeClass("active")
        .end()
        .filter("[href='#" + id + "']")
        .parent()
        .addClass("active")
    }
  })

  // metaverse slider
  function setMaxHeight() {
    let els = document.querySelectorAll(".metaverse .metaverse-slider .slide"),
      arr = []
    for (let i = 0; i < els.length; i++) {
      arr.push({ height: els[i].clientHeight })
    }
    let elsMaxHeight = Math.max(...arr.map((o) => o.height))
    for (let i = 0; i < els.length; i++) {
      els[i].style.height = elsMaxHeight + "px"
    }
  };
  
  $('.metaverse-slider').on('init', function(event, slick){
    console.log("initialized")
    setMaxHeight();
  });

  $(".metaverse-slider").slick({
    variableWidth: true,
    infinite: false,
    infinite: true,
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

  // tanks slider
  $(".tank-slider").slick({
    slidesToShow: 6,
    arrows: false,
    cssEase: "linear",
    autoplay: true,
    autoplaySpeed: 0,
    speed: 3000,
  })

  // partners slider
  $(".partners-slider").slick({
    slidesToShow: 3,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 1500,
    dots: true,
    customPaging: function (slick, index) {
      return "<span></span>"
    },
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

  // video action
  const videoPosition = $(".video").offset().top,
    videoHeight = $(".video").height()
  $(document).on("scroll", function () {
    var scroll = $(document).scrollTop()
    if (scroll > videoPosition && scroll < videoPosition + videoHeight) {
      $(".video-wrapper video")[0].play()
    }
  })
})
