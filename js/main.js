(() => {
    //console.log("IIFE Fired");
    //variables
    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(ScrollToPlugin);
    // Canvas Variables
    const canvas = document.querySelector("#explode-view");
    const context = canvas.getContext("2d");
    canvas.width = 1920;
    canvas.height = 1080;
    const frameCount = 300;
    const images = [];
    const buds = {
        frame: 0
    }

    for(let i=0; i<frameCount; i++) {
      //console.log(i);
    const img = new Image();
      // string I am trying to create: images/explode_13.webp
    img.src = `images/1_seq/frame${(i+1).toString().padStart(4, '0')}.jpg`;
    images.push(img);
    }
    // Xray Functionality
    let imageCon = document.querySelector('#imageCon'),
        drag = document.querySelector('.image-drag'),
        left = document.querySelector('.image-left'),
        dragging = false,
        min = 0,
        max = imageCon.offsetWidth;
    // Scrolling Functionality Variables
    const navLinks = document.querySelectorAll("#main-header nav ul li a");
    const menu_btn = document.querySelector('.hamburger');
    const mobile_menu = document.querySelector('.mobile-nav');
    // Model Viewer Variables
    const model = document.querySelector("#model");
    const hotspots = document.querySelectorAll(".Hotspot");
    const infoBoxes = [
      {
        title: "Circular noise cancellation microphone",
        text: "The circular microphone's ingenious design enables it to capture sound equally from all directions, creating a balanced and immersive audio experience. This makes it suitable for recording meetings, interviews, and group discussions, where multiple sound sources need to be captured simultaneously.",
        img: "images/circularmicrophone.png"
      },
      {
        title: "Rectangular noise cancellation microphone",
        text: "Thanks to the integrated noise cancellation technology, the main microphone effectively filters out unwanted ambient noises, such as traffic or background noise, allowing you to enjoy clear conversations even in noisy environments.",
        img: "images/mainmicrophone.png"
      },
      {
        title: "Comfort rubber",
        text: "By providing a comfortable and secure fit, Comfort Rubber tips contribute to a better overall listening experience.",
        img: "images/comfortrubber.png"
      },
      {
        title: "Quality sound (Speaker)",
        text: "A cutting-edge, high-quality speaker that delivers unparalleled audio performance.",
        img: "images/qualitysound.png"
      },
      {
        title: "Logo SKELETON",
        text: "This distinctive logo captures the essence of Skeleton, merging elegance and modernity into a visually striking design.",
        img: "images/logo_skeleton.png"
      },
      {
        title: "Steel cover - Back",
        text: "Discover the epitome of durability and sophistication with our Steel Cover Back. Crafted from high-quality stainless steel, this sleek cover adds a touch of elegance while providing robust protection to your device.",
        img: "images/steelcoverback.png"
      },
      {
        title: "Load notice button",
        text: "With just a tap, this innovative button provides real-time notifications about the charging status and battery levels.",
        img: "images/loadbutton.png"
      },
      {
        title: "Touchable control",
        text: "Revolutionize your audio experience with our touchable control feature. Seamlessly manage your music, calls, and settings with just a touch. The power is literally at your fingertips, allowing you to play or pause tracks, adjust volume, answer calls, and activate voice assistants effortlessly.",
        img: "images/touchablecontrol.png"
      },
      {
        title: "Magnet - Fast charging",
        text: "Experience unparalleled convenience with our advanced fast charging technology for your headphones. Say goodbye to long waiting times and hello to instant power whenever you need it.",
        img: "images/fastcharge.png"
      }
    ];
  
    //functions
    // MODEL VIEWER
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

    // Scrolling Functionality
    function scrollLink(e) {    
      e.preventDefault(); 
      console.log(e.currentTarget.hash);
      let selectedLink = e.currentTarget.hash;
      mobile_menu.classList.remove('is-active');
      menu_btn.classList.remove('is-active');
      gsap.to(window, {duration: 1, scrollTo:{y:`${selectedLink}`, offsetY:100 }});
    }
// Xray Functionality
    function onDown() {
      dragging = true;
      console.log("Set to true");
  }
  function onUp() {
      dragging = false;
      console.log("Set to false");
  }

  function onMove(event) {
      // console.log("on move called");
      if (dragging===true) {
          // console.log("dragging");
          let x = event.clientX - imageCon.getBoundingClientRect().left;
          console.log(x);

          if (x < min) {
              x = min;
          } else if (x > max) {
              x = max-10;
          }

          drag.style.left = x + 'px';
          left.style.width = x + 'px';
      }
  }

    //CANVAS FUNCTIONALITY
    gsap.to(buds, {
      frame: 299,
      snap: "frame",
      scrollTrigger: {
          trigger: "#explode-view",
          pin: true,
          scrub: 1,
          markers: true,
          start: "top top"
      },
      onUpdate: render
  })

  images[0].addEventListener("onload", render);

  function render() {
      console.log(buds.frame);
      console.log(images[buds.frame]);
      context.clearRect(0,0, canvas.width, canvas.height);
      context.drawImage(images[buds.frame],0,0);
  }

    //Event Listener
    // Hamburger Menu Event Listener
    menu_btn.addEventListener('click', function () {
      menu_btn.classList.toggle('is-active');
      mobile_menu.classList.toggle('is-active');
  });
    // Model Viewer Event Listener
    model.addEventListener("load", modelLoaded);
  
    hotspots.forEach(function (hotspot) {
      hotspot.addEventListener("mouseover", showInfo);
      hotspot.addEventListener("mouseout", hideInfo);
    });
    // Scrolling Event Listener
    navLinks.forEach((link) => {
      link.addEventListener("click", scrollLink);
    });
    // Xray Event Listener
    drag.addEventListener('mousedown', onDown);
        document.body.addEventListener('mouseup', onUp);
        document.body.addEventListener('mousemove', onMove);
  })();
  
  