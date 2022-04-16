$(document).ready(function(){
  // header scroll
  $("body").on("click", '[href*="#"]', function (e) {
    var fixed_offset = 100
    $("html,body")
      .stop()
      .animate({ scrollTop: $(this.hash).offset().top + fixed_offset }, {
        duration: 1000,
        easing: "swing"
     })
    e.preventDefault()
  })

  // metaverse slider
  $('.metaverse-slider').slick({
    variableWidth: true,
    infinite: false,
  });

  // tanks slider
  $('.tank-slider').slick({
    slidesToShow: 6,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
  });

  // $('.metaverse-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
  //   console.log(nextSlide);
  // });
});
