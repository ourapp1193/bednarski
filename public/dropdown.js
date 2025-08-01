// Attach hover event handler for #aboutMe
// $('#aboutMe').hover(
//     function(){
//       $('.submenu').css('background-color', '#555');
//     }, 
//     function(){
//       $('.submenu').css('background-color', ''); // Revert to original background color
//     }
//   );

function changeAllTexts() {
  const paragraphs = document.querySelectorAll('.description');


  paragraphs.forEach((p, i) => {
    p.classList.add('fade-out');

    // Wait for fade out
    setTimeout(() => {
      p.textContent = projectTxt[i][eng ? 0 : 1];
      p.classList.remove('fade-out');
    }, 180); // should match CSS transition duration
  });
}
$(document).ready(function () {

  console.log("drop");
  document.getElementById("apps").innerHTML = "<i class='icon-laptop'></i> Applications";
  document.getElementById("mech").innerHTML = "<i class='icon-wrench'></i> Mechanics";
  document.getElementById("games").innerHTML = "<i class='icon-gamepad'></i> Games";
  document.getElementById("ai").innerHTML = "<i class='fas fa-brain'></i> AI/ML";
  const elementToHide = document.querySelector(".dropdown-content");
  const services = document.querySelector("#projects");
  const service = document.querySelector(".service");
  const dropdownContent = document.querySelector(".dropdown-content");
  let viewed = false;
  let chosen = false;
  dropdownContent.classList.add("hidden");
  $(".dropdown-content").css("display", "block");
  //elementToHide.classList.add("hidden");
  // Add an event listener for the 'transitionend' event
  dropdownContent.addEventListener("transitionend", (event) => {
    const computedStyle = window.getComputedStyle(dropdownContent);
    const maxHeight = computedStyle.getPropertyValue("max-height");

    // if (event.propertyName === "max-height" && maxHeight !== "0px") {
    //   viewed = true;
    //   console.log("Dropdown content is viewed");
    // } else {
    //   viewed = false;
    //   console.log("Dropdown content is hidden");
    // }
  });

  let isDropdownVisible = false;

  // Event listener for clicking the "Services" link

  document.addEventListener("touchstart", function (event) {
    console.log("Touch event detected.");
    event.stopPropagation(); // Prevents propagation of the touch event.

    if (isDropdownVisible) {
      // Check if the URL matches.
      if (window.location.href === "https://artur-bednarski.onrender.com/") {
        services.style.backgroundColor = "rgb(128, 128, 128)"; // Set to grey.
      } else {
        services.style.backgroundColor = "white"; // Set to white for other URLs.
      }

      // Hide the dropdown.
      dropdownContent.classList.add("hidden");
      $(".dropdown-content").css({
        "max-height": "0px",
        "transition": "max-height 0.7s ease"
      });

      isDropdownVisible = false; // Update the dropdown visibility status.
      console.log("Dropdown is now hidden.", isDropdownVisible);
    }
    // else {
    //     // Show the dropdown.
    //     services.style.backgroundColor = "#555"; // Set background color.
    //     dropdownContent.classList.remove("hidden");
    //     $(".dropdown-content").css({
    //         "max-height": "300px",
    //         "transition": "max-height 0.7s ease"
    //     });

    //     isDropdownVisible = true; // Update the dropdown visibility status.
    //     console.log("Dropdown is now visible.", isDropdownVisible);
    // }
  });

  const serviceElements = document.querySelectorAll(".service");

  // Add event listeners to all "service" elements
  serviceElements.forEach(function (service) {
    service.addEventListener("touchstart", function (event) {
      service.style.backgroundColor = "#555";
    });
  });
  // Event listener to hide the dropdown when clicking anywhere on the document
  window.addEventListener("touchstart", function () {
    //document.getElementById("projects").style.backgroundColor = "rgb(128, 128, 128)";
    if (isDropdownVisible) {
      // dropdownContent.classList.add("hidden");
      $(".dropdown-content").css("max-height", "0px");
      if (window.location.href === "https://kindhearted-hollow-cactus.glitch.me/") document.getElementById("projects").style.backgroundColor = "rgb(128, 128, 128)";
      else document.getElementById("projects").style.backgroundColor = "white";
      //services.style.backgroundColor = "#333";
      isDropdownVisible = false;
      console.log(isDropdownVisible);
    }
  });
  const viewer = document.getElementById("image-viewer");
  const displayedImageNumber = document.getElementById("displayed-image-number");
  let currentImage = null;
  // grab everything only once
  const images = document.querySelectorAll('.image');
  const displayedImage = document.getElementById('displayed-image');

  // turn the NodeList into a real array so we can get the index easily
  const thumbs = Array.from(images);

  thumbs.forEach((thumb, i) => {
    thumb.addEventListener('click', () => {
      // 1. show the large image
      displayedImage.src = thumb.querySelector('img').src;

      // 2. clear previous selection
      thumbs.forEach(t => t.classList.remove('selected'));

      // 3. add the effect to the clicked thumb and its nearest siblings
      thumb.classList.add('selected');              // clicked
      if (i > 0) thumbs[i - 1].classList.add('selected'); // previous
      if (i < thumbs.length - 1) thumbs[i + 1].classList.add('selected'); // next

      // 4. optional flag on the big image
      displayedImage.classList.toggle(
        'oring',
        displayedImage.src.includes('oring.jpg')
      );
    });
  });


});
function hidemenu() {
  $(".dropdown-content").css("display", "none");
}

window.onpopstate = function (event) {
  // Check if the dropdown should be hidden based on your logic
  console.log("pop");
};

const pageviewsCount = document.getElementById('pageviews-count');
const visitsCount = document.getElementById('visits-count');
let eng = true;
function toggleElements() {
  eng = !eng;
  const element1 = $('.toggle-element', '.visible');
  const element2 = $('.toggle-element');
  if (eng) {
    $('.down').removeClass('Pol').addClass('Eng');
    document.querySelector('#prompt')?.setAttribute('placeholder', 'Ask about my skills and projects...');

  }
  else {
    $('.down').removeClass('Eng').addClass('Pol');
    document.querySelector('#prompt')?.setAttribute('placeholder', 'Zapytaj o moje umięjętności i projekty...');

  }
  // Toggle the visibility of both elements
  element1.toggleClass('visible');
  element2.toggleClass('visible');
  document.getElementById("apps").innerHTML = eng ? "<i class='icon-laptop'></i> Applications" : "<i class='icon-laptop'></i> Aplikacje";
  document.getElementById("mech").innerHTML = eng ? "<i class='icon-wrench'></i> Mechanics" : "<i class='icon-wrench'></i> Mechanika";
  document.getElementById("games").innerHTML = eng ? "<i class='icon-gamepad'></i> Games" : "<i class='icon-gamepad'></i> Gry";
}

// 'visit' item persists in storage for the remainder of the user session
function display() {
  $("#viewer").css("display", "flex")
  $("#homeContentPojects").css("display", "none")





}

function back() {
  $("#viewer").css("display", "none")
  $("#homeContentPojects").css("display", "block")
}
// Function to check if the device supports touch input
function isTouchDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

// Only run the hover effect if the device is not a touch device
// if (!isTouchDevice()) {
//   const hoverableElements = document.querySelectorAll('.service');

//   hoverableElements.forEach((element) => {
//     // Add event listener for mouse entering (hover starts)
//     element.addEventListener('mouseover', () => {
//       document.getElementById("projects").style.backgroundColor = "#555";
//       $('.submenu1').css('background-color', '#555');
//     });

//     // Add event listener for mouse leaving (hover ends)
//     element.addEventListener('mouseout', () => {
//       document.getElementById("projects").style.backgroundColor = '';
//       $('.submenu1').css('background-color', '');
//     });
//   });
// }


//   window.addEventListener('load', function() {
//     const hoverTexts = document.querySelectorAll('.projectImg');
//   const tooltipPol = document.querySelector('.tooltip-textPol');
//   const tooltipEng = document.querySelector('.tooltip-textEng');

//   hoverTexts.forEach((hoverText) => {
//     hoverText.addEventListener('mouseover', (e) => {
//       if (eng) {
//         tooltipEng.textContent = `Click to enlarge`;
//         tooltipEng.style.display = 'block';
//       } else {
//         tooltipPol.textContent = `Kliknij, aby powiększyć`;
//         tooltipPol.style.display = 'block';
//       }
//     });

//     hoverText.addEventListener('mouseout', (e) => {
//       if (eng) {
//         tooltipEng.style.display = 'none';
//       } else {
//         tooltipPol.style.display = 'none';
//       }
//     });

//     hoverText.addEventListener('mousemove', (e) => {
//       const x = e.clientX;
//       const y = e.clientY;
//       if (eng) {
//         tooltipEng.style.left = x + 10 + 'px';
//         tooltipEng.style.top = y + 10 +  'px';
//       } else {
//         tooltipPol.style.left = x + 10 + 'px';
//         tooltipPol.style.top = y + 10 + 'px';
//       }
//     });
//   });

//   const hoverTextsZoomed = document.getElementById('displayed-image');

//   hoverTextsZoomed.addEventListener('mouseover', (e) => {
//     if (eng) {
//       tooltipEng.textContent = `Click to back to site`;
//       tooltipEng.style.display = 'block';
//     } else {
//       tooltipPol.textContent = `Kliknij, aby powrócić`;
//       tooltipPol.style.display = 'block';
//     }
//   });

//   hoverTextsZoomed.addEventListener('mouseout', (e) => {
//     if (eng) {
//       tooltipEng.style.display = 'none';
//     } else {
//       tooltipPol.style.display = 'none';
//     }
//   });

//   hoverTextsZoomed.addEventListener('mousemove', (e) => {
//     const x = e.clientX;
//     const y = e.clientY;
//     if (eng) {
//       tooltipEng.style.left = x + 10 + 'px';
//       tooltipEng.style.top = y + 10 + 'px';
//     } else {
//       tooltipPol.style.left = x + 10 + 'px';
//       tooltipPol.style.top = y + 10 + 'px';
//     }
//   });
// });
// function adjustDivWidth() {
//   const divs = document.getElementsByClassName('filler');
//   for (const div of divs) {
//     if (window.innerHeight > window.innerWidth) {
//       div.style.width = '10%'; // Portrait mode
//     } else {
//       div.style.width = '100%'; // Landscape mode
//     }
//   }
// }

// adjustDivWidth(); // Initial adjustment
// window.addEventListener('resize', adjustDivWidth); // Adjust on resize