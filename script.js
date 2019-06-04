var load = localStorage.getItem("id");
document.querySelector("body").style.background = "url(" + load + ")";
document.querySelector("body").style.backgroundRepeat = "no-repeat";
document.querySelector("body").style.backgroundSize = "cover";

// Close tab
var close = document.querySelector(".fa-times");
close.addEventListener("click", function() {
  var target = this.parentNode.parentNode.parentNode;
  target.style.display = "none";
});

// Maximize tab
var restore = document.querySelector(".fa-window-restore");
restore.addEventListener("click", function() {
  var target = this.parentNode.parentNode.parentNode;
  target.style.width = "98vw";
  target.style.height = "95vh";
  target.style.margin = "0";
  this.style.display = "none";
  document.querySelector(".fa-window-maximize").style.display = "inline";
});

// Minimize tab
function minimizebtns() {
  var minimize = document.querySelectorAll(".fa-window-minimize");
  minimize.forEach(function(minimizebtn) {
    minimizebtn.addEventListener("click", function() {
      var target = this.parentNode.parentNode.parentNode;
      target.style.width = "125px";
      target.style.height = "45px";
      target.style.bottom = "0";
    });
  });
}

var ogheight = getComputedStyle(document.querySelector(".container")).height;
var ogwidth = getComputedStyle(document.querySelector(".container")).width;

// Restoring tab
function maximizebtns() {
  var maximize = document.querySelectorAll(".fa-window-maximize");
  maximize.forEach(function(maximizebtn) {
    maximizebtn.addEventListener("click", function() {
      var target = this.parentNode.parentNode.parentNode;
      target.style.height = ogheight;
      target.style.width = ogwidth;
      this.style.display = "none";
      document.querySelector(".fa-window-restore").style.display = "inline";
    });
  });
}

// Draggable
dragElement(document.getElementById("container"));

function dragElement(elmnt) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;

  elmnt.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

var menuDisplayed = false;
var menuBox = null;
window.addEventListener(
  "contextmenu",
  function() {
    console.log(arguments[0]);
    var left = arguments[0].clientX;
    var top = arguments[0].clientY;
    menuBox = document.querySelector(".menu");
    menuBox.style.left = left + "px";
    menuBox.style.top = top + "px";
    menuBox.style.display = "block";
    arguments[0].preventDefault();
    menuDisplayed = true;
  },
  false
);
window.addEventListener(
  "click",
  function() {
    if (menuDisplayed == true) {
      menuBox.style.display = "none";
    }
  },
  true
);

// Setting desktop wallpaper
var wallpaper = document.querySelector(".menu");
wallpaper.addEventListener("click", function() {
  document.querySelector("#file").click();
});

function uploadFile() {
  var file = document.querySelector("#file").files[0];
  var fileReader = new FileReader();
  if (file) {
    fileReader.readAsDataURL(file);
  } else {
    alert("No file chosen");
  }

  fileReader.onloadend = function() {
    console.log(fileReader.result);
    var image = document.querySelector("body");
    image.style.background = "url(" + fileReader.result + ")";
    image.style.backgroundRepeat = "no-repeat";
    image.style.backgroundSize = "cover";
    localStorage.setItem("id", fileReader.result);
  };
}

var offleft = 1;
var tabrepeat = document.querySelector(".fa-folder-plus ");
tabrepeat.addEventListener("click", function() {
  var target = document.querySelector(".container");
  var cln = target.cloneNode(true);
  cln.style.top = "10px";
  cln.style.left = ++offleft + "rem";
  console.log(cln);
  document.querySelector("body").appendChild(cln);
});
maximizebtns();
minimizebtns();

function bringFront(box) {
  var all = document.querySelectorAll(".container");
  console.log(all);
  for (i = 0; i < all.length; i++) {
    all[i].style.zIndex = 0;
  }
  box.style.zIndex = 1;
}
