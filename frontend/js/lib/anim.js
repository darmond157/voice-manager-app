
var aaaa= document.querySelector("footer").offsetTop;

$(window).on('scroll', function () {
    // console.log(aaaa,$(this).scrollTop())
    // console.log(aaaa,$(this).scrollTop())
    if ($(this).scrollTop() >260) {

        $('.bbb').removeClass("invisible");
        $('.bbb').addClass("animated2  slideInDown");

    } else {

    }

    var elmt = document.getElementById("footer-animation")
    var rect = elmt.getBoundingClientRect();
    var viewHieght = Math.max(document.documentElement.clientHeight, window.innerHeight)
    // console.log(rect.top,rect.bottom)
    // console.log(viewHieght)
    if (rect.top <= viewHieght){
        $('.footer-anim').removeClass("invisible");
        $('.footer-anim').addClass("animated  fadeInDown ");
    }
    if (rect.top >= 0 && rect.bottom<= viewHieght ){
        $('.footer-anim2').removeClass("invisible");
        $('.footer-anim2').addClass("animated  fadeIn ");
    }
    if (rect.top > viewHieght){
        $('.footer-anim').addClass("invisible");
        $('.footer-anim').removeClass("animated  fadeInDown ");
        $('.footer-anim2').addClass("invisible");
        $('.footer-anim2').removeClass("animated  fadeIn ");
    }


    // if ($(this).scrollTop() >(aaaa - 200)) {
    //
    //     $('.footer-anim').removeClass("invisible");
    //     $('.footer-anim').addClass("animated  fadeInDown ");
    //
    //
    // } else {
    //     $('.footer-anim').addClass("invisible");
    //     $('.footer-anim').removeClass("animated  fadeInDown ");
    // }
    //
    // if ($(this).scrollTop() >(aaaa - 100)) {
    //
    //     $('.footer-anim2').removeClass("invisible");
    //     $('.footer-anim2').addClass("animated  fadeIn ");
    //
    // }else {
    //     $('.footer-anim2').addClass("invisible");
    //     $('.footer-anim2').removeClass("animated  fadeIn ");
    // }


});


