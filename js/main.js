(() => {
    //console.log("IIFE Fired");
    //variables
    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(ScrollToPlugin);
    const navLinks = document.querySelectorAll("#main-header nav ul li a");
    const menu_btn = document.querySelector('.hamburger');
    const mobile_menu = document.querySelector('.mobile-nav');
    const model = document.querySelector("#model");
    const hotspots = document.querySelectorAll(".Hotspot");
    const infoBoxes = [
      {
        title: "Main Microphone",
        text: "Thanks to the integrated noise cancellation technology, the main microphone effectively filters out unwanted ambient noises, such as traffic or background noise, allowing you to enjoy clear conversations even in noisy environments.",
        img: "images/mainmicrophone.png"
      },
      {
        title: "Circular Microphone",
        text: "The circular microphone's ingenious design enables it to capture sound equally from all directions, creating a balanced and immersive audio experience. This makes it suitable for recording meetings, interviews, and group discussions, where multiple sound sources need to be captured simultaneously.",
        img: "images/circularmicrophone.png"
      },
      {
        title: "Comfort Rubber",
        text: "By providing a comfortable and secure fit, Comfort Rubber tips contribute to a better overall listening experience.",
        img: "images/comfortrubber.png"
      },
      {
        title: "Quality Sound (Speaker)",
        text: "A cutting-edge, high-quality speaker that delivers unparalleled audio performance.",
        img: "images/qualitysound.png"
      },
      {
        title: "Logo (Skeleton)",
        text: "This distinctive logo captures the essence of Skeleton, merging elegance and modernity into a visually striking design.",
        img: "images/logo_skeleton.png"
      },
      {
        title: "Fast Charge",
        text: "Experience unparalleled convenience with our advanced fast charging technology for your headphones. Say goodbye to long waiting times and hello to instant power whenever you need it.",
        img: "images/fastcharge.png"
      },
      {
        title: "Touchable Control",
        text: "Revolutionize your audio experience with our touchable control feature. Seamlessly manage your music, calls, and settings with just a touch. The power is literally at your fingertips, allowing you to play or pause tracks, adjust volume, answer calls, and activate voice assistants effortlessly.",
        img: "images/touchablecontrol.png"
      },
      {
        title: "Load notice button",
        text: "With just a tap, this innovative button provides real-time notifications about the charging status and battery levels.",
        img: "images/loadbutton.png"
      },
      {
        title: "Steel Cover - Back",
        text: "Discover the epitome of durability and sophistication with our Steel Cover Back. Crafted from high-quality stainless steel, this sleek cover adds a touch of elegance while providing robust protection to your device.",
        img: "images/steelcoverback.png"
      }
    ];
  
    //functions
    function modelLoaded() {
      //console.log(hotspots);
      hotspots.forEach(hotspot => {
        hotspot.style.display = "block";
      });
    }
  
    function loadInfo() {
  
      infoBoxes.forEach((infoBox,index)=>{
        let selected = document.querySelector(`#hotspot-${index+1}`);
          let title = document.createElement('h2');
          title.textContent = infoBox.title
          let text = document.createElement('p');
          text.textContent = infoBox.text;
          let img = document.createElement('img');
          img.src = infoBox.img;
          img.alt = infoBox.title;
          console.log(img);
  
          console.log(selected);
          console.log(infoBox.title);
          console.log(infoBox.text);
  
          selected.appendChild(title);
          selected.appendChild(text);
          selected.appendChild(img);
      })
    }
  loadInfo();
  
  
    function showInfo() {
      let selected = document.querySelector(`button[slot="${this.slot}"] > div`);
      gsap.to(selected, 1, { autoAlpha: 1 });
    }
  
    function hideInfo() {
      let selected = document.querySelector(`button[slot="${this.slot}"] > div`);
      gsap.to(selected, 1, { autoAlpha: 0 });
    }

    function scrollLink(e) {    
      e.preventDefault(); 
      console.log(e.currentTarget.hash);
      let selectedLink = e.currentTarget.hash;
      mobile_menu.classList.remove('is-active');
      menu_btn.classList.remove('is-active');
      gsap.to(window, {duration: 1, scrollTo:{y:`${selectedLink}`, offsetY:100 }});
    }

    //Event Listener
    menu_btn.addEventListener('click', function () {
      menu_btn.classList.toggle('is-active');
      mobile_menu.classList.toggle('is-active');
  });

    model.addEventListener("load", modelLoaded);
  
    hotspots.forEach(function (hotspot) {
      hotspot.addEventListener("mouseover", showInfo);
      hotspot.addEventListener("mouseout", hideInfo);
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", scrollLink);
    });
  })();
  
  