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
  $(".metaverse-slider").slick({
    variableWidth: true,
    infinite: false,
  })

  // tanks slider
  $(".tank-slider").slick({
    slidesToShow: 6,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
    dots: true,
    customPaging: function (slick, index) {
      return "<span></span>"
    },
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

  // $('.metaverse-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
  //   console.log(nextSlide);
  // });
})
