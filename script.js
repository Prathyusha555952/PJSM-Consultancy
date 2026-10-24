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

const plannerCountries = document.getElementById("plannerCountries");
if (plannerCountries) {
    const plannerData = {
        canada: { name:"Canada", fee:"CAD 25,000–55,000 / year", visa:"Study Permit", note:"Fees vary by programme and institution; confirm the latest amount directly with the university.", universities:[["University of Toronto","Toronto, Ontario"],["University of British Columbia","Vancouver, British Columbia"],["McGill University","Montréal, Quebec"]] },
        uk: { name:"United Kingdom", fee:"£15,000–35,000 / year", visa:"Student visa", note:"Fees are indicative and depend on course level, subject and institution.", universities:[["University of Manchester","Manchester"],["University of Birmingham","Birmingham"],["University of Leeds","Leeds"]] },
        australia: { name:"Australia", fee:"AUD 25,000–50,000 / year", visa:"Student visa (Subclass 500)", note:"Tuition varies by provider, course and city. Check the provider’s current offer before applying.", universities:[["University of Melbourne","Melbourne"],["University of Sydney","Sydney"],["Monash University","Melbourne"]] },
        usa: { name:"United States", fee:"USD 25,000–60,000 / year", visa:"F-1 student visa", note:"Annual tuition varies significantly by institution, course and financial aid.", universities:[["Arizona State University","Tempe, Arizona"],["Northeastern University","Boston, Massachusetts"],["University of Illinois Urbana-Champaign","Illinois"]] },
        germany: { name:"Germany", fee:"€0–20,000 / year", visa:"National student visa", note:"Public and private university fees differ; semester contributions and living costs are separate.", universities:[["Technical University of Munich","Munich"],["Heidelberg University","Heidelberg"],["RWTH Aachen University","Aachen"]] }
    };
    const details = document.getElementById("plannerDetails"), form = document.getElementById("destinationBookingForm"), summary = document.getElementById("bookingSummary"), message = document.getElementById("bookingMessage");
    let selectedCountry = "", selectedUniversity = "";
    plannerCountries.innerHTML = Object.keys(plannerData).map(key => `<button type="button" class="planner-country" data-country="${key}">${plannerData[key].name}</button>`).join("");
    function renderCountry(key) {
        selectedCountry = key; selectedUniversity = "";
        const item = plannerData[key];
        plannerCountries.querySelectorAll("button").forEach(button => button.classList.toggle("is-selected", button.dataset.country === key));
        details.innerHTML = `<div class="planner-info"><div><h3>Study in ${item.name}</h3><p><strong>Visa route:</strong> ${item.visa}</p><p>${item.note}</p><div class="planner-fee"><strong>Indicative annual tuition</strong><b>${item.fee}</b><span>Tuition only; accommodation, insurance and living costs are separate.</span></div></div><div><h3>Popular universities</h3><div class="university-options">${item.universities.map(([name,place]) => `<button type="button" class="university-option" data-university="${name}"><span>${name}</span><small>${place}</small></button>`).join("")}</div></div></div>`;
        details.querySelectorAll(".university-option").forEach(button => button.addEventListener("click", () => { selectedUniversity = button.dataset.university; details.querySelectorAll(".university-option").forEach(option => option.classList.toggle("is-selected", option === button)); summary.textContent = `Booking: ${plannerData[selectedCountry].name} · ${selectedUniversity}`; }));
        summary.textContent = "Choose a university to continue.";
    }
    plannerCountries.querySelectorAll("button").forEach(button => button.addEventListener("click", () => renderCountry(button.dataset.country)));
    renderCountry("canada");
    form.addEventListener("submit", async event => {
        event.preventDefault(); message.textContent = "";
        if (!selectedUniversity) { message.textContent = "Please choose a university before confirming your booking."; return; }
        const data = Object.fromEntries(new FormData(form));
        data.country = plannerData[selectedCountry].name; data.university = selectedUniversity;
        const submit = form.querySelector("button[type=submit]"); submit.disabled = true; submit.textContent = "Confirming…";
        try {
            const bookingApi = "http://localhost:8080/api/destination-bookings";
            const response = await fetch(bookingApi, { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(data) });
            const result = await response.json(); if (!response.ok) throw new Error(result.error || "Booking could not be saved.");
            // The dashboard groups countries from /api/track/destination. Save a
            // confirmed booking there as well, so the country chart stays in sync.
            try { await trackDestination(data.country); } catch (e) { console.warn("Destination dashboard tracking failed", e); }
            try { sessionStorage.setItem("counsel_service", data.country + " - " + data.university); } catch (e) {} window.location.href = "thankyou.html";
        } catch (error) { message.textContent = error.message; }
        submit.disabled = false; submit.innerHTML = 'Confirm booking <span aria-hidden="true">→</span>';
    });
}
const PJSM_API = "http://localhost:8080";

(function trackVisit() {
  if (localStorage.getItem("pjsmAdmin")) return;      // admin browser is not counted
  let id = localStorage.getItem("pjsmVisitorId");
  if (!id) {
    id = (crypto.randomUUID ? crypto.randomUUID()
          : Date.now() + "-" + Math.random().toString(16).slice(2));
    localStorage.setItem("pjsmVisitorId", id);
  }
  const key = "pjsmCounted:" + location.pathname;
  if (sessionStorage.getItem(key)) return;            // once per page per session
  sessionStorage.setItem(key, "1");
  fetch(PJSM_API + "/api/track/visit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ visitorId: id, page: location.pathname })
  }).catch(() => {});
})();

function trackDestination(country) {
  if (!country) return;
  return fetch(PJSM_API + "/api/track/destination", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ country: country })
  }).catch(() => {});
}
function setText(id, v) { const e = document.getElementById(id); if (e) e.textContent = v; }

async function loadDashboard() {
  try {
    const res = await fetch("http://localhost:8080/api/dashboard");
    if (!res.ok) throw new Error("HTTP " + res.status);
    const d = await res.json();

    setText("statTotalVisits", d.totalVisits);
    setText("statUnique", d.uniqueVisitors);
    setText("statToday", d.visitsToday);
    setText("statRegistrations", d.registrations);

    const bars = document.getElementById("visitsBars");
    if (bars) {
      const max = Math.max(1, ...d.visitsLast7Days.map(x => x.count));
      bars.style.cssText = "display:flex;align-items:flex-end;height:220px;gap:8px";
      bars.innerHTML = d.visitsLast7Days.map(x => {
        const label = new Date(x.date).toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
        const h = Math.round((x.count / max) * 160) + 4;
        return `<div style="flex:1;text-align:center">
                  <div style="font-size:12px;font-weight:700">${x.count}</div>
                  <div style="height:${h}px;background:#e86f2e;border-radius:6px 6px 0 0;margin-top:4px"></div>
                  <div style="font-size:11px;color:#667085;margin-top:6px">${label}</div>
                </div>`;
      }).join("");
    }

    const list = document.getElementById("destinationList");
    if (list) {
      const total = d.destinations.reduce((s, x) => s + x.count, 0);
      list.innerHTML = total === 0
        ? "<p>No destination chosen yet.</p>"
        : d.destinations.map(x => {
            const pct = Math.round((x.count / total) * 100);
            return `<div style="margin-bottom:12px">
                      <div style="display:flex;justify-content:space-between;font-size:14px">
                        <span>${x.country}</span><span>${x.count} (${pct}%)</span></div>
                      <div style="height:8px;background:#eef1f4;border-radius:5px">
                        <div style="width:${pct}%;height:8px;background:#e86f2e;border-radius:5px"></div></div>
                    </div>`;
          }).join("");
    }
  } catch (err) {
    console.error("Dashboard load failed:", err);
  }
}

loadDashboard();
setInterval(loadDashboard, 30000);   // refresh every 30 seconds
fetch("http://localhost:8080/api/track/visit", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ visitorId: "test-1", page: "/first.html" })
}).then(r => r.json()).then(console.log).catch(console.error)
/* =========================================================
   PJSM services page - video cards (replaces the old inline script)

   - the video, the voice-over and the background music are tied together:
       play    -> all three start
       pause   -> all three pause
       resume  -> all three continue
       stop    -> all three stop (Back button, 10 seconds reached, another card)
   - each video plays its first 10 seconds, then returns to its picture
   - play / pause button + progress bar on the playing video
   - the video file is never changed or reloaded
   ========================================================= */
(function () {
    "use strict";

    var CLIP_SECONDS = 10;    /* how long each video plays */
    var THUMB_TIME   = 0.8;   /* the frame shown as the card picture */
    var VOICE_RATE   = 1.05;  /* voice-over speed */

    /* ---------- styles for the play / pause bar ---------- */
    var css = [
        ".svc-thumb .svc-ctrl{display:none}",
        ".svc-thumb.is-playing .svc-ctrl{position:absolute;z-index:9;left:8px;right:8px;bottom:8px;display:flex;align-items:center;gap:10px;padding:6px 10px;border-radius:999px;background:rgba(10,28,44,.85)}",
        ".svc-ctrl-btn{flex:0 0 auto;width:30px;height:30px;padding:0;border:0;border-radius:50%;background:#f26a1b;display:grid;place-items:center;cursor:pointer}",
        ".svc-ctrl-btn:focus-visible{outline:3px solid #fff;outline-offset:2px}",
        ".svc-ctrl-icon{display:block;width:12px;height:14px;background:linear-gradient(90deg,#fff 0,#fff 36%,transparent 36%,transparent 64%,#fff 64%,#fff 100%)}",
        ".svc-ctrl.is-paused .svc-ctrl-icon{width:0;height:0;margin-left:3px;background:none;border-style:solid;border-width:7px 0 7px 11px;border-color:transparent transparent transparent #fff}",
        ".svc-ctrl-bar{position:relative;flex:1;height:5px;border-radius:5px;background:rgba(255,255,255,.3);cursor:pointer}",
        ".svc-ctrl-bar::before{content:'';position:absolute;left:0;right:0;top:-10px;bottom:-10px}",
        ".svc-ctrl-fill{display:block;width:0;height:100%;border-radius:5px;background:#f26a1b}",
        ".svc-ctrl-time{flex:0 0 auto;color:#fff;font:600 11px/1 'DM Sans',Arial,sans-serif}",
        ".svc-thumb.is-playing{cursor:pointer}",
        "@media (max-width:640px){.svc-thumb.is-playing .svc-ctrl{left:5px;right:5px;bottom:5px;gap:6px;padding:4px 7px}.svc-ctrl-btn{width:26px;height:26px}.svc-ctrl-time{font-size:10px}}"
    ].join("");
    var styleTag = document.createElement("style");
    styleTag.textContent = css;
    document.head.appendChild(styleTag);

    /* ---------- page elements ---------- */
    var cards     = Array.prototype.slice.call(document.querySelectorAll(".svc-video-card"));
    var voiceBtn  = document.getElementById("svcVoiceToggle");
    var musicBtn  = document.getElementById("svcMusicToggle");
    var replayBtn = document.getElementById("svcReplayVoice");
    var statusBox = document.getElementById("svcAudioStatus");

    if (!cards.length) { return; }

    var synth = ("speechSynthesis" in window) ? window.speechSynthesis : null;
    var voiceEnabled = true;
    var musicEnabled = false;
    var active = null;          /* the card that is open right now */
    var speakToken = 0;
    var needsVoiceRestart = false;

    function say(message) { if (statusBox) { statusBox.textContent = message || ""; } }

    function format(seconds) {
        var t = Math.max(0, Math.floor(seconds));
        return "0:" + (t < 10 ? "0" : "") + t;
    }

    /* =====================================================
       VOICE-OVER
       ===================================================== */
    function stopVoice() {
        speakToken++;
        needsVoiceRestart = false;
        if (synth) { synth.cancel(); }
    }

    function speak(text) {
        stopVoice();
        if (!voiceEnabled || !text) { return; }
        if (!synth) { say("Voice-over is not supported by this browser."); return; }

        var token = ++speakToken;
        setTimeout(function () {          /* small delay: Chrome can drop speech right after cancel() */
            if (token !== speakToken) { return; }
            var utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = VOICE_RATE;
            utterance.pitch = 1;
            utterance.volume = 1;
            utterance.lang = "en-US";
            utterance.onstart = function () { if (token === speakToken) { say("Voice-over playing"); } };
            utterance.onend = function () { if (token === speakToken) { say(""); } };
            utterance.onerror = function (event) {
                if (token === speakToken && event.error !== "canceled" && event.error !== "interrupted") {
                    say("Voice-over could not start. Try Replay voice.");
                }
            };
            synth.speak(utterance);
        }, 60);
    }

    function pauseVoice() {
        if (!synth || !synth.speaking) { return; }
        synth.pause();
        /* some phones do not support pause(): then stop the voice instead */
        setTimeout(function () {
            if (active && active.video.paused && synth.speaking && !synth.paused) {
                speakToken++;
                synth.cancel();
                needsVoiceRestart = true;
            }
        }, 150);
    }

    function resumeVoice() {
        if (!voiceEnabled || !synth) { return; }
        if (synth.paused) {
            synth.resume();
        } else if (needsVoiceRestart && active) {
            needsVoiceRestart = false;
            speak(active.narration);
        }
    }

    /* =====================================================
       BACKGROUND MUSIC (only sounds while a video is playing)
       ===================================================== */
    var audioContext = null, oscillators = [], musicGain = null;

    function stopMusic() {
        oscillators.forEach(function (osc) { try { osc.stop(); } catch (e) {} });
        oscillators = [];
        if (musicGain) { try { musicGain.disconnect(); } catch (e) {} musicGain = null; }
    }

    function startMusic() {
        var AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) { say("Background music is not supported by this browser."); return; }
        if (!audioContext) { audioContext = new AudioCtx(); }
        if (audioContext.state === "suspended") { audioContext.resume(); }
        stopMusic();
        musicGain = audioContext.createGain();
        musicGain.gain.value = 0.018;
        musicGain.connect(audioContext.destination);
        [220, 277.18, 329.63].forEach(function (frequency, i) {
            var osc = audioContext.createOscillator();
            var gain = audioContext.createGain();
            osc.type = "sine";
            osc.frequency.value = frequency;
            gain.gain.value = i === 0 ? 0.42 : 0.22;
            osc.connect(gain);
            gain.connect(musicGain);
            osc.start();
            oscillators.push(osc);
        });
    }

    function syncMusic(playing) {
        if (musicEnabled && playing) { startMusic(); } else { stopMusic(); }
    }

    function stopAllAudio() {
        stopVoice();
        stopMusic();
        say("");
    }

    /* =====================================================
       ONE CONTROLLER PER CARD
       ===================================================== */
    var controllers = [];

    cards.forEach(function (card) {
        var thumb = card.querySelector(".svc-thumb");
        var video = thumb && thumb.querySelector("video");
        if (!thumb || !video) { return; }

        var narration = thumb.getAttribute("data-narration") || "";
        var fresh = true;       /* true = next play starts from the beginning */
        var started = false;    /* voice already started for this play */
        var poll = null;

        /* the video file stays exactly as written in the page */
        video.removeAttribute("muted");
        video.removeAttribute("controls");
        video.muted = false;
        video.volume = 1;
        video.controls = false;
        video.loop = false;
        video.playsInline = true;
        video.setAttribute("playsinline", "");
        video.setAttribute("webkit-playsinline", "");
        video.preload = "metadata";

        thumb.setAttribute("role", "button");
        thumb.tabIndex = 0;

        /* back button */
        var back = document.createElement("button");
        back.type = "button";
        back.className = "svc-back-video";
        back.textContent = "\u2190 Back to videos";
        back.hidden = true;
        thumb.appendChild(back);

        /* play / pause bar */
        var ctrl = document.createElement("div");
        ctrl.className = "svc-ctrl";
        ctrl.innerHTML =
            '<button type="button" class="svc-ctrl-btn" aria-label="Pause video"><span class="svc-ctrl-icon"></span></button>' +
            '<div class="svc-ctrl-bar"><span class="svc-ctrl-fill"></span></div>' +
            '<span class="svc-ctrl-time">0:00 / ' + format(CLIP_SECONDS) + '</span>';
        thumb.appendChild(ctrl);

        var btn  = ctrl.querySelector(".svc-ctrl-btn");
        var bar  = ctrl.querySelector(".svc-ctrl-bar");
        var fill = ctrl.querySelector(".svc-ctrl-fill");
        var time = ctrl.querySelector(".svc-ctrl-time");

        var me = { video: video, thumb: thumb, narration: narration };
        me.close = close;
        me.restart = restart;
        controllers.push(me);

        function isOpen() { return thumb.classList.contains("is-playing"); }

        function clipLength() {
            var d = video.duration;
            return (isFinite(d) && d > 0) ? Math.min(CLIP_SECONDS, d) : CLIP_SECONDS;
        }

        function refresh() {
            var len = clipLength();
            var t = Math.min(Math.max(video.currentTime, 0), len);
            fill.style.width = (t / len * 100) + "%";
            time.textContent = format(t) + " / " + format(len);
        }

        function setButton(playing) {
            ctrl.classList.toggle("is-paused", !playing);
            btn.setAttribute("aria-label", playing ? "Pause video" : "Play video");
        }

        function stopPoll() { clearInterval(poll); poll = null; }

        function startPoll() {
            if (poll) { return; }
            poll = setInterval(function () {
                refresh();
                if (video.currentTime >= clipLength() - 0.02) { close(); }
            }, 100);
        }

        /* stop everything for this card and go back to the picture */
        function close() {
            stopPoll();
            thumb.classList.remove("is-playing");   /* first, so the pause event below is ignored */
            back.hidden = true;
            video.pause();
            try { video.currentTime = THUMB_TIME; } catch (e) {}
            fresh = true;
            started = false;
            fill.style.width = "0%";
            time.textContent = "0:00 / " + format(clipLength());
            setButton(false);
            if (active === me) {
                active = null;
                stopAllAudio();
            }
        }

        function play() {
            var attempt = video.play();
            if (attempt && attempt.catch) {
                attempt.catch(function (error) {
                    if (error && error.name === "NotSupportedError") {
                        say("This video cannot be played in your browser.");
                    } else if (error && error.name !== "AbortError") {
                        say("Tap the play button to start the video.");
                    }
                });
            }
        }

        function start() {
            controllers.forEach(function (other) { if (other !== me) { other.close(); } });
            active = me;
            thumb.classList.add("is-playing");
            back.hidden = false;
            if (fresh || video.ended || video.currentTime >= clipLength() - 0.05) {
                try { video.currentTime = 0; } catch (e) {}
            }
            fresh = false;
            play();
        }

        function toggle() {
            if (video.paused) { play(); } else { video.pause(); }
        }

        function restart() {
            try { video.currentTime = 0; } catch (e) {}
            if (video.paused) {
                started = false;      /* the play event below will start the voice */
                play();
            } else {
                started = true;
                speak(narration);
            }
        }

        /* ---------- clicks ---------- */
        thumb.addEventListener("click", function (event) {
            var target = event.target;
            if (target.closest && (target.closest(".svc-ctrl") || target.closest(".svc-back-video"))) { return; }
            if (isOpen()) { toggle(); } else { start(); }
        });

        thumb.addEventListener("keydown", function (event) {
            if (event.target !== thumb) { return; }
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                if (isOpen()) { toggle(); } else { start(); }
            }
        });

        back.addEventListener("click", function (event) {
            event.preventDefault();
            event.stopPropagation();
            close();
        });

        btn.addEventListener("click", function (event) {
            event.stopPropagation();
            if (video.ended || video.currentTime >= clipLength() - 0.05) {
                try { video.currentTime = 0; } catch (e) {}
            }
            toggle();
        });

        bar.addEventListener("click", function (event) {
            event.stopPropagation();
            var rect = bar.getBoundingClientRect();
            var ratio = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
            try { video.currentTime = ratio * clipLength(); } catch (e) {}
            refresh();
        });

        /* ---------- video events: this is what keeps the sound in step ---------- */
        video.addEventListener("play", function () {
            if (!isOpen()) { return; }
            active = me;
            setButton(true);
            startPoll();
            syncMusic(true);
            if (!started) {
                started = true;
                speak(narration);
            } else {
                resumeVoice();
            }
        });

        video.addEventListener("pause", function () {
            if (!isOpen()) { return; }       /* a stop through close() is handled there */
            stopPoll();
            setButton(false);
            pauseVoice();
            syncMusic(false);
        });

        video.addEventListener("ended", close);
        video.addEventListener("timeupdate", function () {
            if (!isOpen()) { return; }
            refresh();
            if (video.currentTime >= clipLength()) { close(); }
        });
        video.addEventListener("loadedmetadata", refresh);
        video.addEventListener("error", function () {
            say("This video could not be loaded.");
            close();
        });
    });

    /* =====================================================
       VOICE / MUSIC / REPLAY BUTTONS
       ===================================================== */
    if (voiceBtn) {
        voiceBtn.addEventListener("click", function () {
            voiceEnabled = !voiceEnabled;
            voiceBtn.textContent = voiceEnabled ? "\uD83D\uDD0A Voice-over: On" : "\uD83D\uDD07 Voice-over: Off";
            voiceBtn.setAttribute("aria-pressed", String(voiceEnabled));
            if (!voiceEnabled) {
                stopVoice();
                say("");
            } else if (active && !active.video.paused) {
                speak(active.narration);
            }
        });
    }

    if (musicBtn) {
        musicBtn.addEventListener("click", function () {
            musicEnabled = !musicEnabled;
            musicBtn.textContent = musicEnabled ? "\u266B Music: On" : "\u266B Music: Off";
            musicBtn.setAttribute("aria-pressed", String(musicEnabled));
            syncMusic(!!(active && !active.video.paused));
        });
    }

    if (replayBtn) {
        replayBtn.addEventListener("click", function () {
            if (active) { active.restart(); } else { say("Play a video first."); }
        });
    }

    /* leaving the tab or the page must never leave sound running */
    document.addEventListener("visibilitychange", function () {
        if (document.hidden && active && !active.video.paused) { active.video.pause(); }
    });
    window.addEventListener("pagehide", function () { stopVoice(); stopMusic(); });
})();
