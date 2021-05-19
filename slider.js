let currentSlide = 0;
let autoSwitch = false;
let images;
let navElements;
let switchInterval;

initialize();

function initialize() {
    initSliderImages();
    changeAutoSwitch(localStorage.getItem("autoSwitch") == "true");
    initActions();
    setCurrentSlide(!Number.isNaN(localStorage.getItem("currentSlide") + 1)
        ? localStorage.getItem("currentSlide") % images.length : 0);
}

document.onkeydown = (event) => {
    console.log(event.key);
    switch(event.key) {
        case "Escape":
            window.close();
        break;
        case "ArrowRight":
            setNextImg();
        break;
        case "ArrowLeft":
            setPrevImg();
        break;
    }
};

function initActions() {
    let changeModeButton = document.getElementById("mode");
    let prevImageButton = document.getElementById("prevImage");
    let nextImageButton = document.getElementById("nextImage");
    let navButton = document.getElementById("navigationList");

    changeModeButton.onclick = changeMode;
    prevImageButton.onclick = setPrevImg;
    nextImageButton.onclick = setNextImg;
    navButton.onclick = navOnClick;
}

function changeMode() {
    changeAutoSwitch(!autoSwitch);
}

function setCurrentSlide(index) {
    updateSlider(index);
    currentSlide = index;
}

function navOnClick() {
    for (let i = 0; i < navElements.length; i++) {
        if (navElements[i] == event.target) {
            setCurrentSlide(i)
            break;
        }
    }
}

function initSliderImages() {
    var slidesAmount = 3;
    var dirPattern = 'images/sliderImg/';
    images = new Array(slidesAmount);

    let navList = document.getElementById("navigationList");
    
    for (var i = 1; i <= slidesAmount; i++) {
        images[i - 1] = dirPattern + i + ".jpg";
        navList.appendChild(document.createElement("li"));
    }

    navElements = document.querySelectorAll("#navigationList li");
}

function updateSlider(newIndex) {
    document.getElementById("sliderImage").setAttribute("src", images[newIndex]);

    localStorage.setItem("currentSlide", newIndex);

    navElements[currentSlide].classList.remove("selected");
    navElements[newIndex].classList.add("selected");
}

function setNextImg() {
    setCurrentSlide((currentSlide + 1) % images.length);
}

function setPrevImg() {
    setCurrentSlide((currentSlide - 1 + images.length) % images.length);
}

function changeAutoSwitch(newValue) {
    autoSwitch = newValue;
    localStorage.setItem("autoSwitch", autoSwitch);

    document.getElementById("mode").setAttribute('value', autoSwitch ? "Stop" : "Start");

    var intervalTime = 2000;

    if (autoSwitch) {
        switchInterval = setInterval(() => {
            setNextImg()
        }, intervalTime);
    } else {
        clearInterval(switchInterval);
    }
}