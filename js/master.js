let mainColor = localStorage.getItem("color_option");
if (mainColor !== null) {
  document.documentElement.style.setProperty("--main-color", mainColor);
  document.querySelectorAll(".colors-list li").forEach((element) => {
    element.classList.remove("active");
    if (element.dataset.color === mainColor) {
      element.classList.add("active");
    }
  });
}

let backgroundOption = true;
let backgroundInterval;
let landingPage = document.querySelector(".landing-page");
let imgsArray = ["01.jpg", "02.jpg", "07.jpg", "04.jpg", "05.jpg"];

let backgroundLocalItem = localStorage.getItem("background_option");
if (backgroundLocalItem !== null) {
  document.querySelectorAll(".random-backgrounds span").forEach((element) => {
    element.classList.remove("active");
  });
  if (backgroundLocalItem === "true") {
    backgroundOption = true;
    randomizeImgs();
    document.querySelector(".random-backgrounds .yes").classList.add("active");
  } else {
    backgroundOption = false;
    landingPage.style.backgroundImage = localStorage.getItem("stoppedImage");
    document.querySelector(".random-backgrounds .no").classList.add("active");
  }
} else {
  if (backgroundOption === true) {
    randomizeImgs();
  }
}

document.querySelector(".setting-icon").onclick = function () {
  document.querySelector(".fa-gear").classList.toggle("fa-spin");
  document.querySelector(".setting-box").classList.toggle("open");
};

const colorsLi = document.querySelectorAll(".colors-list li");
colorsLi.forEach((li) => {
  li.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );

    localStorage.setItem("color_option", e.target.dataset.color);
    handleActive(e);
  });
});

const randomBackgroundsElement = document.querySelectorAll(
  ".random-backgrounds span"
);

randomBackgroundsElement.forEach((span) => {
  span.addEventListener("click", (e) => {
    handleActive(e);

    if (e.target.dataset.background === "yes") {
      backgroundOption = true;
      randomizeImgs();
      localStorage.removeItem("stoppedImage");
      localStorage.setItem("background_option", true);
    } else {
      backgroundOption = false;
      localStorage.setItem("stoppedImage", landingPage.style.backgroundImage);
      clearInterval(backgroundInterval);
      localStorage.setItem("background_option", false);
    }
  });
});

function randomizeImgs() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      let randomNumber = Math.floor(Math.random() * imgsArray.length);
      landingPage.style.backgroundImage =
        'url("imgs/' + imgsArray[randomNumber] + '")';
    }, 5000);
  }
}

let ourSkills = document.querySelector(".skills");
window.onscroll = function () {
  let skillsOffsetTop = ourSkills.offsetTop;
  let skillsOuterHeight = ourSkills.offsetHeight;
  let windowHeight = this.innerHeight;
  let windowScrollTop = this.scrollY;

  if (windowScrollTop >= skillsOffsetTop + skillsOuterHeight - windowHeight) {
    let allSkills = document.querySelectorAll(
      ".skill-box .skill-progress span"
    );
    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};

let ourGallery = document.querySelectorAll(".gallery .images-box img");
ourGallery.forEach((image) => {
  image.addEventListener("click", (e) => {
    let overlay = document.createElement("div");
    overlay.className = "popup-overlay";
    document.body.appendChild(overlay);

    let popupBox = document.createElement("div");
    popupBox.className = "popup-box";

    let popupImage = document.createElement("img");
    if (image.alt !== null) {
      let imageHeading = document.createElement("h3");
      let imageText = document.createTextNode(image.alt);
      popupImage.style.cssText = "margin-bottom:30px";
      imageHeading.appendChild(imageText);
      popupBox.appendChild(imageHeading);
    }

    popupImage.src = image.src;
    popupImage.alt = image.alt;
    popupBox.appendChild(popupImage);
    document.body.appendChild(popupBox);

    let closeButton = document.createElement("span");
    let closeButtonText = document.createTextNode("X");
    closeButton.appendChild(closeButtonText);
    closeButton.className = "close-button";
    popupBox.appendChild(closeButton);
  });
});

document.addEventListener("click", function (e) {
  if (e.target.className === "close-button") {
    e.target.parentNode.remove();
    document.querySelector(".popup-overlay").remove();
  }
});

const allBullets = document.querySelectorAll(".nav-bullet .bullet");
allBullets.forEach((bullet) => {
  bullet.addEventListener("click", (e) => {
    scrollingFunction(e);
  });
});

const allNavLinks = document.querySelectorAll(".landing-page .links li");
allNavLinks.forEach((li) => {
  li.addEventListener("click", (e) => {
    scrollingFunction(e);
  });
});

const bulletSpan = document.querySelectorAll(".bullets-options span");
const bulletsContainer = document.querySelector(".nav-bullet");
let bulletLocalItem = localStorage.getItem("bullets_option");

if (bulletLocalItem !== null) {
  bulletSpan.forEach((span) => {
    span.classList.remove("active");
  });

  if (bulletLocalItem === "block") {
    bulletsContainer.style.display = "block";
    document.querySelector(".bullets-options .yes").classList.add("active");
  } else {
    bulletsContainer.style.display = "none";
    document.querySelector(".bullets-options .no").classList.add("active");
  }
}

bulletSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (e.target.dataset.display === "show") {
      bulletsContainer.style.display = "block";
      localStorage.setItem("bullets_option", "block");
    } else {
      bulletsContainer.style.display = "none";
      localStorage.setItem("bullets_option", "none");
    }

    handleActive(e);
  });
});

document.querySelector(".reset-options").onclick = function () {
  localStorage.clear();
  window.location.reload();
};

scrollingFunction = function (e) {
  document.querySelector(e.target.dataset.section).scrollIntoView({
    behavior: "smooth",
  });
};

handleActive = function (e) {
  e.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });
  e.target.classList.add("active");
};

let toggleMenu = document.querySelector(".toggle-menu");
let navbarLinks = document.querySelector(".landing-page .links");
navbarLinks.addEventListener("click", (e) => {
  e.stopPropagation();
});

toggleMenu.addEventListener("click", (e) => {
  e.stopPropagation();
  e.target.classList.toggle("menu-active");
  if (e.target.classList.contains("menu-active")) {
    navbarLinks.classList.add("open");
  } else {
    navbarLinks.classList.remove("open");
  }
});

document.addEventListener("click", (e) => {
  if (e.target !== toggleMenu && e.target !== navbarLinks) {
    if (navbarLinks.classList.contains("open")) {
      navbarLinks.classList.remove("open");
    }
  }
});

let faders = document.querySelectorAll(".fade-in");
let sliders= document.querySelectorAll('.slide-in')
const appearOptions = {
  threshold:0,
  rootMargin:"0px 0px -180px 0px"
};
const appearOnScroll = new IntersectionObserver(function (
  entries,
  appearOnScroll
) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    } else {
      entry.target.classList.add('appear');
      appearOnScroll.unobserve(entry.target)
      console.log(entry.target)
    }
  });
},
appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader)
})

sliders.forEach(slider => {
  appearOnScroll.observe(slider)
})
