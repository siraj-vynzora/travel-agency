(function ($) {
	"use strict";

	$(document).ready(function () {
		//>> Mobile Menu Js Start <<//
		$("#mobile-menu").meanmenu({
			meanMenuContainer: ".mobile-menu",
			meanScreenWidth: "1199",
			meanExpand: ['<i class="far fa-plus"></i>'],
		});

		//>> Sidebar Toggle Js Start <<//
		$(".offcanvas__close,.offcanvas__overlay").on("click", function () {
			$(".offcanvas__info").removeClass("info-open");
			$(".offcanvas__overlay").removeClass("overlay-open");
		});
		$(".sidebar__toggle").on("click", function () {
			$(".offcanvas__info").addClass("info-open");
			$(".offcanvas__overlay").addClass("overlay-open");
		});

		//>> Body Overlay Js Start <<//
		$(".body-overlay").on("click", function () {
			$(".offcanvas__area").removeClass("offcanvas-opened");
			$(".df-search-area").removeClass("opened");
			$(".body-overlay").removeClass("opened");
		});

		//>> Sticky Header Js Start <<//

		$(window).scroll(function () {
			if ($(this).scrollTop() > 250) {
				$("#header-sticky").addClass("sticky");
			} else {
				$("#header-sticky").removeClass("sticky");
			}
		});

		//>> Nice Select Start <<//
		if ($('.single-select').length) {
            $('.single-select').niceSelect();
        }

		 /* ================================
       Parallaxie Js Start
    ================================ */

        if ($('.parallaxie').length && $(window).width() > 991) {
            if ($(window).width() > 768) {
                $('.parallaxie').parallaxie({
                    speed: 0.55,
                    offset: 0,
                });
            }
        }

		   new WOW().init();

		//>> Counterup Start <<//
		$(".count").counterUp({
			delay: 15,
			time: 4000,
		});

		//>> Video Popup Start <<//
		$(".video-popup").magnificPopup({
			type: "iframe",
			callbacks: {},
		});

		//>> Video Popup Start <<//
		$(".img-popup").magnificPopup({
			type: "image",
			gallery: {
				enabled: true,
			},
		});

		$(".img-popup2").magnificPopup({
			type: "image",
			gallery: {
				enabled: true,
			},
		});

		//>> Brand Slider Start <<//
		if ($(".brand-slider").length > 0) {
			const BrandSlider = new Swiper(".brand-slider", {
				spaceBetween: 30,
				speed: 1300,
				loop: true,
				//centeredSlides: true,
				autoplay: {
					delay: 2000,
					disableOnInteraction: false,
				},

				breakpoints: {
					1199: {
						slidesPerView: 6,
					},
					991: {
						slidesPerView: 4,
					},
					767: {
						slidesPerView: 3,
					},
					575: {
						slidesPerView: 2,
					},
					0: {
						slidesPerView: 1,
					},
				},
			});
		}

		//>> Destination Slider Start <<//
		if ($(".destination-slider").length > 0) {
			const DestinationSlider = new Swiper(".destination-slider", {
				spaceBetween: 30,
				speed: 2000,
				loop: true,
				autoplay: {
					delay: 2000,
					disableOnInteraction: false,
				},
				navigation: {
					prevEl: ".array-next",
					nextEl: ".array-prev",
				},
				pagination: {
					el: ".dot-2",
					clickable: true,
				},
				breakpoints: {
					1199: {
						slidesPerView: 4,
					},
					991: {
						slidesPerView: 3,
					},
					767: {
						slidesPerView: 2,
					},
					575: {
						slidesPerView: 1,
					},
					0: {
						slidesPerView: 1,
					},
				},
			});
		}

		//>> Destination Slider Start <<//
		if ($(".destination-slider-2").length > 0) {
			const DestinationSlider2 = new Swiper(".destination-slider-2", {
				spaceBetween: 30,
				speed: 2000,
				loop: true,
				autoplay: {
					delay: 2000,
					disableOnInteraction: false,
				},
				navigation: {
					prevEl: ".array-next",
					nextEl: ".array-prev",
				},
				pagination: {
					el: ".dot-3",
					clickable: true,
				},
				breakpoints: {
					1199: {
						slidesPerView: 6,
					},
					991: {
						slidesPerView: 3,
					},
					767: {
						slidesPerView: 2,
					},
					575: {
						slidesPerView: 1,
					},
					0: {
						slidesPerView: 1,
					},
				},
			});
		}

		if ($(".destination-slider_popular").length > 0) {
			const DestinationSlider = new Swiper(".destination-slider_popular", {
				spaceBetween: 30,
				speed: 2000,
				loop: true,
				autoplay: {
					delay: 2000,
					disableOnInteraction: false,
				},
				navigation: {
					prevEl: ".array-next",
					nextEl: ".array-prev",
				},
				breakpoints: {
					1399: {
						slidesPerView: 5,
						spaceBetween: 30,
					},
					1199: {
						spaceBetween: 20,
						slidesPerView: 5,
					},
					991: {
						slidesPerView: 3,
						spaceBetween: 20,
					},
					767: {
						slidesPerView: 3,
						spaceBetween: 20,
					},
					480: {
						slidesPerView: 2,
						spaceBetween: 20,
					},
					0: {
						slidesPerView: 1,
						spaceBetween: 20,
					},
				},
			});
		}


		  if($('.banner-active').length > 0) {
            const bannerActive = new Swiper(".banner-active", {
                speed:1500,
                loop: true,
                slidesPerView: 1,
                effect:'fade',
                autoplay: {
                    delay: 3000,         
                    disableOnInteraction: false,
                    pauseOnMouseEnter: false,  
                },
               navigation: {
					prevEl: ".array-next",
					nextEl: ".array-prev",
				},
            });
        }

		//>> Adventure Slider Start <<//
		if ($(".adventure-slider").length > 0) {
			const AdventureSlider = new Swiper(".adventure-slider", {
				spaceBetween: 30,
				speed: 2000,
				loop: true,
				autoplay: {
					delay: 2000,
					disableOnInteraction: false,
				},
				pagination: {
					el: ".dot",
					clickable: true,
				},
				breakpoints: {
					1199: {
						slidesPerView: 5,
					},
					991: {
						slidesPerView: 3,
					},
					767: {
						slidesPerView: 2,
					},
					575: {
						slidesPerView: 1,
					},
					0: {
						slidesPerView: 1,
					},
				},
			});
		}

		//>> Testimonial Slider Start <<//
		if ($(".testimonial-slider").length > 0) {
			const TestimonialSlider = new Swiper(".testimonial-slider", {
				spaceBetween: 30,
				speed: 2000,
				loop: true,
				autoplay: {
					delay: 2000,
					disableOnInteraction: false,
				},
				pagination: {
					el: ".dot-2",
					clickable: true,
				},
				breakpoints: {
					1399: {
						slidesPerView: 3,
					},
					1199: {
						slidesPerView: 2.5,
					},
					991: {
						slidesPerView: 2,
					},
					767: {
						slidesPerView: 1.5,
					},
					575: {
						slidesPerView: 1,
					},
					0: {
						slidesPerView: 1,
					},
				},
			});
		}

		if ($(".testimonial-slider03").length > 0) {
			const TestimonialSlider = new Swiper(".testimonial-slider03", {
				spaceBetween: 30,
				speed: 2000,
				loop: true,
				autoplay: {
					delay: 2000,
					disableOnInteraction: false,
				},
				pagination: {
					el: ".dot-2",
					clickable: true,
				},
				breakpoints: {
					1199: {
						slidesPerView: 1,
					},
					991: {
						slidesPerView: 1,
					},
					767: {
						slidesPerView: 1,
					},
					575: {
						slidesPerView: 1,
					},
					0: {
						slidesPerView: 1,
					},
				},
			});
		}

		if ($(".testimonial-destination-03").length > 0) {
			const testimonialDestination = new Swiper(
				".testimonial-destination-03",
				{
					spaceBetween: 30,
					speed: 2000,
					loop: true,
					autoplay: {
						delay: 2000,
						disableOnInteraction: false,
					},
					pagination: {
						el: ".dot-2",
						clickable: true,
					},
					breakpoints: {
						1199: {
							slidesPerView: 7,
						},
						991: {
							slidesPerView: 6,
						},
						767: {
							slidesPerView: 4,
						},
						575: {
							slidesPerView: 3,
						},
						0: {
							slidesPerView: 2,
						},
					},
				}
			);
		}

		if ($(".testimonial-single-slider").length > 0) {
			const testimonialSingleSlider = new Swiper(".testimonial-single-slider", {
				spaceBetween: 30,
				speed: 2000,
				loop: true,
				autoplay: {
					delay: 2000,
					disableOnInteraction: false,
				},
				navigation: {
					prevEl: ".array-next",
					nextEl: ".array-prev",
				},
			});
		}

		if ($(".common-destination-03").length > 0) {
			const commonDestination = new Swiper(".common-destination-03", {
				spaceBetween: 30,
				speed: 2000,
				loop: true,
				autoplay: {
					delay: 2000,
					disableOnInteraction: false,
				},
				pagination: {
					el: ".dot-2",
					clickable: true,
				},
				breakpoints: {
					1199: {
						slidesPerView: 3,
					},
					991: {
						slidesPerView: 3,
					},
					767: {
						slidesPerView: 2,
					},
					575: {
						slidesPerView: 1,
					},
					0: {
						slidesPerView: 1,
					},
				},
			});
		}
		
		//>> Destination Slider Start <<//
		if ($(".tour-slider-6").length > 0) {
			const TourSlider6 = new Swiper(".tour-slider-6", {
				spaceBetween: 30,
				speed: 2000,
				loop: true,
				autoplay: {
					delay: 2000,
					disableOnInteraction: false,
				},
			
				pagination: {
					el: ".dot-4",
					clickable: true,
				},
				breakpoints: {
					1199: {
						slidesPerView: 3,
					},
					991: {
						slidesPerView: 2,
					},
					767: {
						slidesPerView: 2,
					},
					575: {
						slidesPerView: 1,
					},
					0: {
						slidesPerView: 1,
					},
				},
			});
		}

		 /* ================================
       Instagram Slider Js Start
    ================================ */

    if($('.instagram-slider').length > 0) {
        const InstagramSlider = new Swiper(".instagram-slider", {
            spaceBetween: 30,
            speed: 1300,
            loop: true,
            centeredSlides: true,
            autoplay: {
                delay: 2000,
                disableOnInteraction: false,
            },

            breakpoints: {
                1199: {
                    slidesPerView: 8,
                },
                991: {
                    slidesPerView: 6,
                },
                767: {
                    slidesPerView: 4,
                },
                575: {
                    slidesPerView: 2,
                },
                0: {
                    slidesPerView: 1,
                },
            },
        });
    }

	

	//>> Hero-1 Slider Start <<//
         const sliderActive2 = ".hero-slider";
         const sliderInit2 = new Swiper(sliderActive2, {
             loop: true,
             slidesPerView: 1,
             effect: "fade",
             speed: 3000,
             autoplay: {
                 delay: 3000,
                 disableOnInteraction: false,
             },
             navigation: {
                nextEl: ".array-prev",
                prevEl: ".array-next",
            },
            //  pagination: {
            //      el: ".dot",
            //      clickable: true,
            //  },
			 pagination: {
            el: ".dot-number",
            clickable: true,
            renderBullet: function(index, className) {
                const dotContent = document.querySelectorAll(
                    ".dot-number .dot-num"
                );
                return `
            <span class="${className}">
                ${dotContent[index]?.outerHTML || ""}
            </span>
        `;
            },
        },
         });
 
        function animated_swiper(selector, init) {
            const animated = function animated() {
                $(selector + " [data-animation]").each(function () {
                    let anim = $(this).data("animation");
                    let delay = $(this).data("delay");
                    let duration = $(this).data("duration");
                    $(this)
                        .removeClass("anim" + anim)
                        .addClass(anim + " animated")
                        .css({
                            webkitAnimationDelay: delay,
                            animationDelay: delay,
                            webkitAnimationDuration: duration,
                            animationDuration: duration,
                        })
                        .one("animationend", function () {
                            $(this).removeClass(anim + " animated");
                        });
                });
            };
            animated();
            init.on("slideChange", function () {
                $(sliderActive2 + " [data-animation]").removeClass("animated");
            });
            init.on("slideChange", animated);
        }
        animated_swiper(sliderActive2, sliderInit2);

		//>> Destination Slider Start <<//
		if ($(".testimonial-slider-7").length > 0) {
			const TestimonialSlider7 = new Swiper(".testimonial-slider-7", {
				spaceBetween: 30,
				speed: 2000,
				loop: true,
				autoplay: {
					delay: 2000,
					disableOnInteraction: false,
				},
				navigation: {
					prevEl: ".array-next",
					nextEl: ".array-prev",
				},
				breakpoints: {
					1199: {
						slidesPerView: 1,
					},
					991: {
						slidesPerView: 1,
					},
					767: {
						slidesPerView: 1,
					},
					575: {
						slidesPerView: 1,
					},
					0: {
						slidesPerView: 1,
					},
				},
			});
		}

		
		
		/* ================================
       Mouse Cursor Animation Js Start
    ================================ */

    if ($(".mouseCursor").length > 0) {
        function itCursor() {
            let myCursor = jQuery(".mouseCursor");
            if (myCursor.length) {
                if ($("body")) {
                    const e = document.querySelector(".cursor-inner"),
                        t = document.querySelector(".cursor-outer");
                    let n,
                        i = 0,
                        o = !1;
					window.addEventListener("mousemove", function(s) {
                        o ||
                            (t.style.transform =
                                "translate(" + s.clientX + "px, " + s.clientY + "px)"),
                            (e.style.transform =
                                "translate(" + s.clientX + "px, " + s.clientY + "px)"),
                            (n = s.clientY),
                            (i = s.clientX);
					}),
                    $("body").on(
                            "mouseenter",
                            "button, a, .cursor-pointer",
                            function() {
                                e.classList.add("cursor-hover"),
                                    t.classList.add("cursor-hover");
                            }
                        ),
                        $("body").on(
                            "mouseleave",
                            "button, a, .cursor-pointer",
                            function() {
                                ($(this).is("a", "button") &&
                                    $(this).closest(".cursor-pointer").length) ||
                                (e.classList.remove("cursor-hover"),
                                    t.classList.remove("cursor-hover"));
                            }
                        ),
                        (e.style.visibility = "visible"),
                        (t.style.visibility = "visible");
                }
            }
        }
        itCursor();
      }

	  /* ================================
       Back To Top Button Js Start
    ================================ */
	$(window).on('scroll', function () {
		if ($(this).scrollTop() > 20) {
			$('#back-top').addClass('show');
		} else {
			$('#back-top').removeClass('show');
		}
	});

	// Smooth scroll to top on click
	$(document).on('click', '#back-top', function (e) {
		e.preventDefault();
		scrollToTop();
	});

	function scrollToTop() {
		$('html, body').animate({ scrollTop: 0 }, 800);
	}

		//>> Search Popup Start <<//
        const $searchWrap = $(".search-wrap");
        const $navSearch = $(".nav-search");
        const $searchClose = $("#search-close");

        $(".search-trigger").on("click", function (e) {
            e.preventDefault();
            $searchWrap.animate({ opacity: "toggle" }, 500);
            $navSearch.add($searchClose).addClass("open");
        });

        $(".search-close").on("click", function (e) {
            e.preventDefault();
            $searchWrap.animate({ opacity: "toggle" }, 500);
            $navSearch.add($searchClose).removeClass("open");
        });

        function closeSearch() {
            $searchWrap.fadeOut(200);
            $navSearch.add($searchClose).removeClass("open");
        }

        $(document.body).on("click", function (e) {
            closeSearch();
        });

        $(".search-trigger, .main-search-input").on("click", function (e) {
            e.stopPropagation();
        });

		 // Section Title Animation
		if ($('.char-animation').length > 0) {
		let char_come = gsap.utils.toArray(".char-animation");
		char_come.forEach(splitTextLine => {
			const tl = gsap.timeline({
			scrollTrigger: {
				trigger: splitTextLine,
				start: 'top 90%',
				end: 'bottom 60%',
				scrub: false,
				markers: false,
				toggleActions: 'play none none none'

			}
			});

			const itemSplitted = new SplitText(splitTextLine, { type: "chars, words" });
			gsap.set(splitTextLine, { perspective: 300 });
			itemSplitted.split({ type: "chars, words" })
			tl.from(itemSplitted.chars,
			{
				duration: 1,
				delay: 0.5,
				x: 100,
				autoAlpha: 0,
				stagger: 0.05
			});
		});
		}

		if (window.innerWidth > 768) {
			const items = document.querySelectorAll(".advance-wrap .advance-item");
			if (items.length < 4) return;

			const advanced = gsap.timeline({
				scrollTrigger: {
				trigger: ".advance-wrap",
				start: "top 60%",
				toggleActions: "play none none reverse",
				markers: false,
				},
				defaults: {
				ease: "power1.out", //
				duration: 1,
				},
			});
			advanced
				.from(items[0], { xPercent: 100, rotate: -8 })
				.from(items[1], { xPercent: 30, rotate: 4.13 }, "<")
				.from(items[2], { xPercent: -30, rotate: -6.42 }, "<")
				.from(items[3], { xPercent: -60, rotate: -12.15 }, "<");
		}

		gsap.utils.toArray(" .item_left_1").forEach((el, index) => {
			let tlcta = gsap.timeline({
				scrollTrigger: {
					trigger: el,
					scrub: 2,
					start: "top 90%",
					end: "top 70%",
					toggleActions: "play none none reverse",
					markers: false,
				},
			});

			tlcta
				.set(el, { transformOrigin: "center center" })
				.from(
					el,
					{ opacity: 1, x: "-=365" },
					{ opacity: 1, x: 0, duration: 1, immediateRender: false }
				);
		});

		gsap.utils.toArray(" .item_left_2").forEach((el, index) => {
			let tlcta = gsap.timeline({
				scrollTrigger: {
					trigger: el,
					scrub: 2,
					start: "top 90%",
					end: "top 70%",
					toggleActions: "play none none reverse",
					markers: false,
				},
			});

			tlcta
				.set(el, { transformOrigin: "center center" })
				.from(
					el,
					{ opacity: 1, x: "-=365" },
					{ opacity: 1, x: 0, duration: 1, immediateRender: false }
				);
		});

		gsap.utils.toArray(" .item_right_1").forEach((el, index) => {
			let tlcta = gsap.timeline({
				scrollTrigger: {
					trigger: el,
					scrub: 2,
					start: "top 90%",
					end: "top 70%",
					toggleActions: "play none none reverse",
					markers: false,
				},
			});

			tlcta
				.set(el, { transformOrigin: "center center" })
				.from(
					el,
					{ opacity: 1, x: "+=365" },
					{ opacity: 1, x: 0, duration: 1, immediateRender: false }
				);
		});

		gsap.utils.toArray(" .item_right_2").forEach((el, index) => {
			let tlcta = gsap.timeline({
				scrollTrigger: {
					trigger: el,
					scrub: 2,
					start: "top 90%",
					end: "top 70%",
					toggleActions: "play none none reverse",
					markers: false,
				},
			});

			tlcta
				.set(el, { transformOrigin: "center center" })
				.from(
					el,
					{ opacity: 1, x: "+=365" },
					{ opacity: 1, x: 0, duration: 1, immediateRender: false }
				);
		});

	  	gsap.utils
		.toArray(".zoom-effect-style")
		.forEach((el, index) => {
			let tl1 = gsap.timeline({
				scrollTrigger: {
					trigger: el,
					scrub: 1,
					start: "top 80%",
					end: "buttom 60%",
					toggleActions: "play none none reverse",
					markers: false,
				},
			});

			tl1.set(el, { transformOrigin: "center center" }).from(
				el,
				{ scale: 0.7 },
				{
					background: "inherit",
					scale: 1,
					duration: 1,
					immediateRender: false,
				}
			);
		});

		 
	}); // End Document Ready Function


document.addEventListener("DOMContentLoaded", function () {
  if (document.querySelector(".progress-circle")) {
   if (document.querySelector(".progress-circle")) {
  const pcCircle = document.querySelector(".progress-circle");
	const pcPercent = parseInt(pcCircle.dataset.percent, 10);
  const pcProgress = pcCircle.querySelector(".progress");
  const pcText = pcCircle.querySelector(".percentage");

  const pcRadius = 45;
  const pcCircumference = 2 * Math.PI * pcRadius;

  pcProgress.style.strokeDasharray = pcCircumference;
  pcProgress.style.strokeDashoffset = pcCircumference;

  let pcCurrent = 0;

  const pcInterval = setInterval(() => {
    if (pcCurrent <= pcPercent) {
      const pcOffset = pcCircumference - (pcCurrent / 100) * pcCircumference;
      pcProgress.style.strokeDashoffset = pcOffset;
      pcText.textContent = pcCurrent + "%";
      pcCurrent++;
    } else {
      clearInterval(pcInterval);
    }
  }, 20);
}

  }
});

	/* ================================
         Price Range Slider Js Start
    ================================ */
    document.addEventListener("DOMContentLoaded", function () {
        const minSlider = document.getElementById("min-slider");
        const maxSlider = document.getElementById("max-slider");
        const amount = document.getElementById("amount");

		if (!minSlider || !maxSlider || !amount) {
			return;
		}

        function updateAmount() {
            const minValue = parseInt(minSlider.value, 10);
            const maxValue = parseInt(maxSlider.value, 10);

            // Ensure the minimum value is always lower than the maximum value
            if (minValue > maxValue) {
                minSlider.value = maxValue;
            }

            // Update the displayed price range
            amount.value = "$" + minSlider.value + " - $" + maxSlider.value;

            // Calculate the percentage positions of the sliders
            const minPercent =
                ((minSlider.value - minSlider.min) /
                    (minSlider.max - minSlider.min)) *
                100;
            const maxPercent =
                ((maxSlider.value - maxSlider.min) /
                    (maxSlider.max - maxSlider.min)) *
                100;

            // Update the background gradient to show the active track color
            minSlider.style.background = `linear-gradient(to right, #ddd  ${minPercent}%, #FB5B32 ${minPercent}%, #FB5B32 ${maxPercent}%, #ddd  ${maxPercent}%)`;
            maxSlider.style.background = `linear-gradient(to right, #ddd  ${minPercent}%, #FB5B32 ${minPercent}%, #FB5B32 ${maxPercent}%, #ddd  ${maxPercent}%)`;
        }

        // Initialize the sliders and track with default values
		updateAmount();

        // if (minSlider && maxSlider) {

        // Add event listeners for both sliders
        minSlider.addEventListener("input", updateAmount);
        maxSlider.addEventListener("input", updateAmount);
        // }
    });

	document.addEventListener('DOMContentLoaded', function () {
		const fallbackImagePath = '/assets/img/placeholder.svg';

		document.querySelectorAll('img').forEach(function (img) {
			img.addEventListener('error', function () {
				if (img.dataset.fallbackApplied === '1') {
					return;
				}

				img.dataset.fallbackApplied = '1';
				img.src = fallbackImagePath;
			});
		});
	});

	(function () {
		const second = 1000,
			minute = second * 60,
			hour = minute * 60,
			day = hour * 24;

		// Set today's date
		let today = new Date(),
			dd = String(today.getDate()).padStart(2, "0"),
			mm = String(today.getMonth() + 1).padStart(2, "0"),
			yyyy = today.getFullYear(),
			nextYear = yyyy + 1,
			dayMonth = "09/30/",
			birthday = dayMonth + yyyy;

		today = mm + "/" + dd + "/" + yyyy;
		if (today > birthday) {
			birthday = dayMonth + nextYear;
		}

		const countDown = new Date(birthday).getTime();

		// Only run countdown if #countdown exists
		if (document.getElementById("countdown")) {
			const x = setInterval(function () {
				const now = new Date().getTime(),
					distance = countDown - now;

				// Safely update only if elements exist
				const elDays = document.getElementById("days");
				const elHours = document.getElementById("hours");
				const elMinutes = document.getElementById("minutes");
				const elSeconds = document.getElementById("seconds");

				if (elDays) elDays.innerText = Math.floor(distance / day);
				if (elHours)
					elHours.innerText = Math.floor((distance % day) / hour);
				if (elMinutes)
					elMinutes.innerText = Math.floor((distance % hour) / minute);
				if (elSeconds)
					elSeconds.innerText = Math.floor((distance % minute) / second);

				// On countdown complete
				if (distance < 0) {
					const headline = document.getElementById("headline");
					const countdown = document.getElementById("countdown");
					const content = document.getElementById("content");

					if (headline) headline.innerText = "It's my birthday!";
					if (countdown) countdown.style.display = "none";
					if (content) content.style.display = "block";

					clearInterval(x);
				}
			}, 1000);
		}
	})();

	$(function () {
		const selectors = [
			"#datepicker",
			"#datepicker2",
			"#datepicker3",
			"#datepicker4",
			"#datepicker5",
			"#datepicker6",
			"#datepicker7",
			"#datepicker8",
			"#datepicker9",
			"#datepicker10",
			"#datepicker11",
		];

		const activeSelectors = selectors.filter(
			(selector) => $(selector).length > 0
		);

		if (activeSelectors.length > 0) {
			$(activeSelectors.join(", ")).datepicker({
				autoclose: true,
				todayHighlight: true,
			});
		}
	});

	 // ========================= Preloader Js Start =====================
    let percentage = 0;
      let LoadingCounter = setInterval(function () {
        if (percentage <= 100) {
          // $('#loading-screen ').css('opacity', (100 - percentage));
          $("#loading-screen .loading-counter").text(percentage + "%");
          $("#loading-screen .bar").css("width", (100 - percentage) / 2 + "%");
          $("#loading-screen .progress-line").css("transform", "scale(" + percentage / 100 + ")");
          percentage++;
        } else {
          $("#loading-screen").fadeOut(500);
          setTimeout(() => {
            $("#loading-screen").remove();
          }, 500);
          clearInterval(LoadingCounter);
        }
      }, 10);
    // ========================= Preloader Js End=====================
const sliderContainer = document.getElementById('gallery-container');
const sliderImgAfter = document.getElementById('img-after');
const sliderHandle = document.getElementById('slider');

let sliderIsDown = false;

if (sliderContainer && sliderImgAfter && sliderHandle) {
  sliderHandle.addEventListener('mousedown', () => sliderIsDown = true);

	window.addEventListener('mouseup', () => sliderIsDown = false);

	window.addEventListener('mousemove', (e) => {
		if (!sliderIsDown) return;
		let rect = sliderContainer.getBoundingClientRect();
		let offsetX = e.clientX - rect.left;
		if (offsetX < 0) offsetX = 0;
		if (offsetX > rect.width) offsetX = rect.width;
		let percent = offsetX / rect.width * 100;
		sliderImgAfter.style.width = `${percent}%`;
		sliderHandle.style.left = `calc(${percent}% - 25px)`;
	});
}


})(jQuery); // End jQuery
