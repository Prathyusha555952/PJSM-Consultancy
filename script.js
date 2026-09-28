
/* =========================================
   HEADER SCROLL EFFECT
========================================= */

const header =
    document.getElementById("header") ||
    document.querySelector(".header");

if (header) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    });

}



/* =====================================================
   PJSM MOBILE MENU
   ONE MENU SYSTEM FOR ALL PAGES
   ===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const menuBtn = document.getElementById("menuBtn");
    const navbar = document.getElementById("navbar");

    if (!menuBtn || !navbar) {
        return;
    }

    menuBtn.addEventListener("click", function (event) {

        event.preventDefault();
        event.stopPropagation();

        navbar.classList.toggle("menu-open");

        const isOpen =
            navbar.classList.contains("menu-open");

        menuBtn.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );

    });


    /* Close menu after selecting a page */

    navbar.querySelectorAll("a").forEach(function (link) {

        link.addEventListener("click", function () {

            navbar.classList.remove("menu-open");

            menuBtn.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });

});

  document.addEventListener("DOMContentLoaded", function () {
        const menuBtn = document.getElementById("menuBtn");
        const navbar = document.getElementById("navbar");
        if (!menuBtn || !navbar) return;
        menuBtn.addEventListener("click", function (event) {
            event.preventDefault();
            event.stopPropagation();
            navbar.classList.toggle("menu-open");
            menuBtn.classList.toggle("menu-active");
        });
    });
/* =========================================
   TESTIMONIAL SLIDER
========================================= */


const testimonials =
    document.querySelectorAll(".testimonial");

const nextBtn =
    document.getElementById("nextBtn");

const prevBtn =
    document.getElementById("prevBtn");

let currentSlide = 0;


function showSlide(index) {

    testimonials.forEach(testimonial => {

        testimonial.classList.remove("active");

    });

    if (testimonials[index]) {

        testimonials[index].classList.add("active");

    }

}
if (testimonials.length > 0) {

    if (nextBtn) {

        nextBtn.addEventListener("click", () => {

            currentSlide++;

            if (currentSlide >= testimonials.length) {

                currentSlide = 0;

            }

            showSlide(currentSlide);

        });

    }


    if (prevBtn) {

        prevBtn.addEventListener("click", () => {

            currentSlide--;

            if (currentSlide < 0) {

                currentSlide = testimonials.length - 1;

            }

            showSlide(currentSlide);

        });

    }

}


/* Automatic slider */

if (testimonials.length > 0) {

    setInterval(() => {

        currentSlide++;

        if (currentSlide >= testimonials.length) {

            currentSlide = 0;

        }

        showSlide(currentSlide);

    }, 5000);

}
/* =========================================
   COUNTER ANIMATION
========================================= */

const counters =
    document.querySelectorAll(".counter");

const statsSection =
    document.querySelector(".stats-section");

let counterStarted = false;


function startCounters() {

    if (
        counterStarted ||
        counters.length === 0
    ) {
        return;
    }

    counterStarted = true;

    counters.forEach(counter => {

        const target =
            Number(counter.dataset.target);

        if (!Number.isFinite(target)) {
            return;
        }

        let current = 0;

        const increment =
            target / 100;

        function updateCounter() {

            current += increment;

            if (current < target) {

                counter.textContent =
                    Math.ceil(current)
                    .toLocaleString();

                requestAnimationFrame(
                    updateCounter
                );

            } else {

                counter.textContent =
                    target.toLocaleString();

            }

        }

        updateCounter();

    });

}


/* START ONLY IF STATS SECTION EXISTS */

if (
    statsSection &&
    "IntersectionObserver" in window
) {

    const observer =
        new IntersectionObserver(
            entries => {

                if (
                    entries[0] &&
                    entries[0].isIntersecting
                ) {

                    startCounters();

                    observer.disconnect();

                }

            },
            {
                threshold: 0.3
            }
        );

    observer.observe(statsSection);

}


/* FALLBACK */

else if (counters.length > 0) {

    startCounters();

}




/* =========================================
   CONTACT FORM
========================================= */

const form =
    document.getElementById("contactForm");

if (form) {

    const formMessage =
        document.getElementById("formMessage");


    form.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const nameField =
                document.getElementById("name");

            const emailField =
                document.getElementById("email");

            const phoneField =
                document.getElementById("phone");

            const destinationField =
                document.getElementById("destination");

            const messageField =
                document.getElementById("message");


            const name =
                nameField ?
                nameField.value.trim() :
                "";

            const email =
                emailField ?
                emailField.value.trim() :
                "";

            const phone =
                phoneField ?
                phoneField.value.trim() :
                "";

            const destination =
                destinationField ?
                destinationField.value.trim() :
                "";

            const message =
                messageField ?
                messageField.value.trim() :
                "";


            if (
                !name ||
                !email ||
                !phone ||
                !destination
            ) {

                if (formMessage) {

                    formMessage.textContent =
                        "Please fill in all required fields.";

                }

                return;

            }


            const requestData = {

                name: name,

                email: email,

                phone: phone,

                destination: destination,

                message: message

            };


            if (formMessage) {

                formMessage.textContent =
                    "Submitting your request...";

            }


            try {

                const response =
                    await fetch(
                        "http://localhost:8080/api/counselling",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify(requestData)
                        }
                    );


                if (!response.ok) {

                    throw new Error(
                        "Failed to submit counselling request."
                    );

                }


                const data =
                    await response.json();


                console.log(
                    "Counselling request submitted:",
                    data
                );


                if (formMessage) {

                    formMessage.textContent =
                        "Thank you! Our counsellor will contact you shortly.";

                }


                form.reset();


            } catch (error) {

                console.error(
                    "Error submitting counselling request:",
                    error
                );


                if (formMessage) {

                    formMessage.textContent =
                        "Unable to submit your request. Please try again.";

                }

            }

        }
    );

}

/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements =
    document.querySelectorAll(
        ".destination-card, " +
        ".service-card, " +
        ".course-card, " +
        ".process-step, " +
        ".success-card"
    );


if (
    revealElements.length > 0 &&
    "IntersectionObserver" in window
) {

    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.style.opacity =
                            "1";

                        entry.target.style.transform =
                            "translateY(0)";

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.15
            }
        );


    revealElements.forEach(element => {

        element.style.opacity = "0";

        element.style.transform =
            "translateY(30px)";

        element.style.transition =
            "opacity .6s ease, transform .6s ease";

        revealObserver.observe(element);

    });

}
/* =====================================================
   PJSM HERO SLIDER
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const slides =
        document.querySelectorAll(".hero-slide");

    const dots =
        document.querySelectorAll(".hero-dot");

    const prev =
        document.querySelector(".hero-prev");

    const next =
        document.querySelector(".hero-next");

    /* If this page has no hero slider, stop here */
    if (!slides.length) {
        return;
    }

    let currentHeroSlide = 0;
    let autoSlide = null;


    /* SHOW SLIDE */

    function showHeroSlide(index) {

        slides.forEach(function (slide) {

            slide.classList.remove("active");

        });


        dots.forEach(function (dot) {

            dot.classList.remove("active");

        });


        currentHeroSlide =
            (index + slides.length) %
            slides.length;


        slides[currentHeroSlide]
            .classList.add("active");


        if (dots[currentHeroSlide]) {

            dots[currentHeroSlide]
                .classList.add("active");

        }

    }


    /* NEXT */

    function nextHeroSlide() {

        showHeroSlide(
            currentHeroSlide + 1
        );

    }


    /* PREVIOUS */

    function previousHeroSlide() {

        showHeroSlide(
            currentHeroSlide - 1
        );

    }


    /* NEXT BUTTON */

    if (next) {

        next.addEventListener(
            "click",
            function () {

                nextHeroSlide();

                startAutoSlide();

            }
        );

    }


    /* PREVIOUS BUTTON */

    if (prev) {

        prev.addEventListener(
            "click",
            function () {

                previousHeroSlide();

                startAutoSlide();

            }
        );

    }


    /* DOTS */

    dots.forEach(function (dot, index) {

        dot.addEventListener(
            "click",
            function () {

                showHeroSlide(index);

                startAutoSlide();

            }
        );

    });


    /* AUTO SLIDE */

    function startAutoSlide() {

        clearInterval(autoSlide);

        autoSlide =
            setInterval(
                nextHeroSlide,
                4000
            );

    }


    /* PAUSE ON HOVER */

    const hero =
        document.querySelector(".hero-slider");

    if (hero) {

        hero.addEventListener(
            "mouseenter",
            function () {

                clearInterval(autoSlide);

            }
        );


        hero.addEventListener(
            "mouseleave",
            function () {

                startAutoSlide();

            }
        );

    }


    /* INITIAL SLIDE */

    showHeroSlide(0);

    startAutoSlide();

});
/* =====================================================
   PJSM GLOBAL JOURNEY POPUP
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const popup =
        document.getElementById("pjsmJourneyPopup");

    const close =
        document.getElementById("journeyClose");

    if (!popup) return;


    /* Show popup after 2 seconds */

    setTimeout(function () {

        popup.classList.add("show");

    }, 2000);


    /* Close */

    if (close) {

        close.addEventListener(
            "click",
            function () {

                popup.classList.remove("show");

            }
        );

    }


    /* Close when clicking outside card */

    popup.addEventListener(
        "click",
        function (event) {

            if (event.target === popup) {

                popup.classList.remove("show");

            }

        }
    );

});
/* ==========================================
   PJSM MOBILE MENU
========================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const menuBtn =
            document.getElementById("menuBtn");

        const navbar =
            document.getElementById("navbar");


        if (!menuBtn || !navbar) {
            return;
        }


        menuBtn.addEventListener(
            "click",
            function (event) {

                event.preventDefault();
                event.stopPropagation();

                navbar.classList.toggle(
                    "menu-open"
                );

                menuBtn.classList.toggle(
                    "menu-active"
                );

            }
        );


        /* CLOSE AFTER LINK CLICK */

        navbar.querySelectorAll("a")
            .forEach(function (link) {

                link.addEventListener(
                    "click",
                    function () {

                        navbar.classList.remove(
                            "menu-open"
                        );

                        menuBtn.classList.remove(
                            "menu-active"
                        );

                    }
                );

            });


        /* CLOSE WHEN CLICKING OUTSIDE */

        document.addEventListener(
            "click",
            function (event) {

                if (
                    navbar.classList.contains(
                        "menu-open"
                    ) &&
                    !navbar.contains(event.target) &&
                    !menuBtn.contains(event.target)
                ) {

                    navbar.classList.remove(
                        "menu-open"
                    );

                    menuBtn.classList.remove(
                        "menu-active"
                    );

                }

            }
        );

    }
);
const serviceData = {
    career: {
        kicker: "CAREER COUNSELLING",
        title: "Find the direction that fits you.",
        intro: "A personalised starting point for a confident overseas education decision.",
        description: "We turn your strengths, ambitions and preferences into a practical study plan.",
        icon: "fa-compass",
        steps: [
            ["01", "Understand your profile", "We discuss your academic background, interests, strengths and long-term goals."],
            ["02", "Explore your options", "Our counsellors map suitable courses, countries and career pathways for your profile."],
            ["03", "Build your direction", "You receive a clear shortlist and an action plan for the next stage of your journey."]
        ]
    },
    university: {
        kicker: "UNIVERSITY SELECTION",
        title: "Choose a university with confidence.",
        intro: "The right shortlist balances your ambitions, academic profile and budget.",
        description: "We help you compare your options clearly, so your final choice feels informed and personal.",
        icon: "fa-building-columns",
        steps: [
            ["01", "Review your requirements", "We understand your preferred course, destination, budget and future career plans."],
            ["02", "Shortlist the right universities", "You receive recommendations matched to your eligibility, goals and preferred student experience."],
            ["03", "Compare and decide", "We walk you through the important differences and help you choose your best-fit options."]
        ]
    },
    application: {
        kicker: "APPLICATION ASSISTANCE",
        title: "Submit an application you can feel good about.",
        intro: "From documents to deadlines, we make the application stage simple and organised.",
        description: "Every detail matters. Our team helps you prepare a complete, accurate and compelling application.",
        icon: "fa-file-circle-check",
        steps: [
            ["01", "Prepare your documents", "We share a clear checklist and help you organise academic, identity and supporting documents."],
            ["02", "Strengthen your application", "We guide you through your statement, resume and other required application materials."],
            ["03", "Submit with confidence", "We review the final details and help you submit correctly before the deadline."]
        ]
    },
    visa: {
        kicker: "VISA GUIDANCE",
        title: "Get ready for your next chapter abroad.",
        intro: "Clear preparation for your documentation, application and visa interview.",
        description: "We help you move through visa preparation with the right information and a calm, structured approach.",
        icon: "fa-passport",
        steps: [
            ["01", "Understand the requirements", "We explain the documentation, financial evidence and timelines relevant to your destination."],
            ["02", "Prepare your application", "Our counsellors help you organise your file and check that the important details are complete."],
            ["03", "Prepare for the interview", "You practise likely questions and receive practical guidance to attend with confidence."]
        ]
    }
};

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
        const isOpen = mainNav.classList.toggle("open");
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    });
}

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                currentObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => observer.observe(item));
} else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
}

const processSteps = document.getElementById("processSteps");
if (processSteps) {
    const params = new URLSearchParams(window.location.search);
    const service = serviceData[params.get("service")] || serviceData.career;
    const title = document.getElementById("processTitle");
    const intro = document.getElementById("processIntro");
    const kicker = document.getElementById("processKicker");
    const description = document.getElementById("processDescription");
    const icon = document.getElementById("processIcon");

    document.title = `PJSM | ${service.kicker.toLowerCase().replace(/\b\w/g, (letter) => letter.toUpperCase())}`;
    kicker.textContent = service.kicker;
    title.textContent = service.title;
    intro.textContent = service.intro;
    description.textContent = service.description;
    icon.innerHTML = `<i class="fa-solid ${service.icon}" aria-hidden="true"></i>`;
    processSteps.innerHTML = service.steps.map(([number, stepTitle, stepDescription], index) => `
        <article class="step reveal reveal-delay-${Math.min(index + 1, 3)}">
            <div class="step-marker">${number}</div>
            <div class="step-card">
                <h3>${stepTitle}</h3>
                <p>${stepDescription}</p>
            </div>
        </article>
    `).join("");

    processSteps.querySelectorAll(".reveal").forEach((item) => {
        requestAnimationFrame(() => item.classList.add("is-visible"));
    });
}
