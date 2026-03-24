/* =============== MOBILE MENU =============== */
const navToggle = document.getElementById('nav-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const mobileClose = document.getElementById('mobile-close');
const mobileLinks = document.querySelectorAll('.mobile__link');

if(navToggle){
    navToggle.addEventListener('click', () =>{
        mobileMenu.classList.add('show-menu');
    });
}

if(mobileClose){
    mobileClose.addEventListener('click', () =>{
        mobileMenu.classList.remove('show-menu');
    });
}

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('show-menu');
    });
});

/* =============== SCROLL SECTIONS ACTIVE LINK =============== */
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 100,
              sectionId = current.getAttribute('id')

        const navPillLink = document.querySelector('.nav__pill a[href*=' + sectionId + ']');
        if(navPillLink) {
            if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
                navPillLink.classList.add('active-link')
            }else{
                navPillLink.classList.remove('active-link')
            }
        }
    })
}
window.addEventListener('scroll', scrollActive)

/* =============== HEADER EFFECTS ON SCROLL =============== */
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if(window.scrollY >= 50) {
        header.style.top = "0.5rem"; // slight shift on scroll
    } else {
        header.style.top = "1rem";
    }
});

/* =============== SCROLL REVEAL ANIMATION =============== */
function reveal() {
  var reveals = document.querySelectorAll(".reveal");

  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 100;

    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    }
  }
}

window.addEventListener("scroll", reveal);
// Trigger reveal on load
reveal();

/* =============== PORTFOLIO MODALS =============== */
const modalViews = document.querySelectorAll('.portfolio-modal'),
      modalBtns = document.querySelectorAll('.open-modal-btn'),
      modalCloses = document.querySelectorAll('.modal__close')

let modal = function(modalClick){
    modalViews[modalClick].classList.add('active-modal')
    document.body.style.overflow = 'hidden' // Prevent bg scroll
}

modalBtns.forEach((modalBtn, i) => {
    modalBtn.addEventListener('click', (e) => {
        e.preventDefault() // prevent standard anchor behavior
        modal(i)
    })
})

modalCloses.forEach((modalClose) => {
    modalClose.addEventListener('click', () => {
        modalViews.forEach((modalView) =>{
            modalView.classList.remove('active-modal')
        })
        document.body.style.overflow = '' // Restore scroll
    })
})

// Close on outside click
modalViews.forEach((modalView) => {
    modalView.addEventListener('click', (e) => {
        if(e.target === modalView) {
            modalView.classList.remove('active-modal')
            document.body.style.overflow = '' // Restore scroll
        }
    })
})

/* =============== 3D TILT ENGINE =============== */
function initTilt(elementSelector, tiltIntensity = 7) {
    const cards = document.querySelectorAll(elementSelector);
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -tiltIntensity;
            const rotateY = ((x - centerX) / centerX) * tiltIntensity;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        });
    });
}

// Initialize tilt for all interactive components
document.addEventListener('DOMContentLoaded', () => {
    initTilt('.skills__box', 7);
    initTilt('.cert__card', 12);
    initTilt('.timeline__content', 5); // Subtle tilt for long timeline cards
    initTilt('.contact__card', 5);
});
