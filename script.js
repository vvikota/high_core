$(document).ready(function () {
  // header scroll
  $("body").on("click", '[href*="#"]', function (e) {
    const fixed_offset = 100
    $("html,body")
      .stop()
      .animate(
        { scrollTop: $(this.hash).offset().top + fixed_offset },
        {
          duration: 1000,
          easing: "swing",
        }
      )
    e.preventDefault()
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
