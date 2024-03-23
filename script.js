function toggleMenu() {
    var navbar = document.getElementById("navbar");
    if (navbar.style.display === "block") {
      navbar.style.display = "none";
    } else {
      navbar.style.display = "block";
    }
  }
  
  function hideMenu() {
    var navbar = document.getElementById("navbar");
    navbar.style.display = "none";
  }
  function typeWriter(text, i, isRemoving, callback) {
    const typingElement = document.getElementById("typing");
    if (!isRemoving) {
      if (i < text.length) {
        typingElement.innerHTML = text.substring(0, i + 1) + '<span aria-hidden="true"></span>';
        setTimeout(() => {
          typeWriter(text, i + 1, isRemoving, callback)
        }, 100);
      } else if (typeof callback == 'function') {
        setTimeout(() => callback(true), 1000); // Wait for a second before starting to remove
      }
    } else {
      if (i >= 0) {
        typingElement.innerHTML = text.substring(0, i) + '<span aria-hidden="true"></span>';
        setTimeout(() => {
          typeWriter(text, i - 1, isRemoving, callback)
        }, 50); // Remove at a faster speed
      } else if (typeof callback == 'function') {
        setTimeout(() => callback(false), 250); // Shorter delay before typing the next text
      }
    }
  }
  
  function cursorBlink() {
    const cursor = document.querySelector('#typing span');
    setInterval(() => {
      cursor.style.visibility = cursor.style.visibility === 'hidden' ? '' : 'hidden';
    }, 500);
  }
  
  function startTypingEffect() {
    typeWriter('Hey there!', 0, false, (isRemoving) => {
      if (isRemoving) {
        typeWriter('Hey there!', 'Hey there!'.length, true, (isRemoving) => {
          if (!isRemoving) {
            document.getElementById("typing").classList.add('typing');
            typeWriter('Welcome to my small world!', 0, false, cursorBlink);
          }
        });
      }
    });
  }
  
  // Start the typing effect on window load
  window.onload = startTypingEffect;
  
  const swiper = new Swiper('.mySwiper', {
    loop: false, // Disable looping, so we have a definite first and last slide
    watchOverflow: true, // Disable navigation buttons if there aren't enough slides to scroll
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    on: {
      init: function () {
        checkNav(this);
      },
      slideChange: function () {
        checkNav(this);
      }
    }
  });
  
  function checkNav(swiper) {
    let index = swiper.activeIndex;
    let prevButton = swiper.prevEl;
    let nextButton = swiper.nextEl;
    
    if (swiper.isBeginning) {
      prevButton.style.display = 'none'; // Hide 'prev' button on first slide
    } else {
      prevButton.style.display = 'flex'; // Show 'prev' button when not on first slide
    }
    
    if (swiper.isEnd) {
      nextButton.style.display = 'none'; // Hide 'next' button on last slide
    } else {
      nextButton.style.display = 'flex'; // Show 'next' button when not on last slide
    }
  }
  
