// Element.getBoundingClientRect() method returns the size of an element and its position relative to the viewport.
// pageYOffset is a read - only window property that returns the number of pixels the document has been scrolled vertically.
// slice extracts a section of a string without modifying original string
//offsetTop - A Number, representing the top position of the element, in pixels

// ********** set date ************
// select span
const date = document.getElementById("date");
date.innerHTML = new Date().getFullYear();

// ********** close links ************

// we are setting up 3 things, the navToggle, the links and the container for the links
const navToggle = document.querySelector(".nav-toggle");
const linksContainer = document.querySelector(".links-container");
const links = document.querySelector(".links");


// we are dynamically setting up a way to toggle the links

navToggle.addEventListener("click", function () {
  // linksContainer.classList.toggle("show-links");
// we are looking for the height of the link and the container and we use the getBoundingClientRect() function to get that.
  
  const linksHeight = links.getBoundingClientRect().height;
  const containerHeight = linksContainer.getBoundingClientRect().height;
  // the moment we get the heights we'll check the parent height which should be 0 by default.
  // if the height is 0 we'll add a height for the children which is linksheight
  if (containerHeight === 0) {
    linksContainer.style.height = `${linksHeight}px`;
  } else { // if we've already toggled and its open then make the height = 0 which basically closes it
    linksContainer.style.height = 0;
  }
  // console.log(linksContainer.getBoundingClientRect());
});

// so basically instead of setting up containerheight for the links in css and having to change it everytime we add a another link, we're setting it up dynamically so it automatically adapts.


const navBar = document.getElementById("nav");
const topLink = document.querySelector(".top-link");

// ********** fixed navbar ************

window.addEventListener("scroll", function () {
  //console.log(window.pageYOffset)
  const scrollHeight = window.pageYOffset;
  const navHeight = navBar.getBoundingClientRect().height;
  
  if(scrollHeight > navHeight) {
    navBar.classList.add("fixed-nav");
  }else{
    navBar.classList.remove("fixed-nav")
  }
  if(scrollHeight > 500){
    topLink.classList.add("show-link");
  }else{
    topLink.classList.remove("show-link")
  }
})

// ********** smooth scroll ************


// select links
const scrollLinks = document.querySelectorAll(".scroll-link");

scrollLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    // prevent default  
    e.preventDefault();
    // navigate to specific spot 
    const id = e.currentTarget.getAttribute("href").slice(1);
    
    // console.log(id); 1 means skipping the hashtag that shows up in the console basically skipping the first index and starting from 1.
    const element = document.getElementById(id);
    // calculate heights  
    const navHeight = navBar.getBoundingClientRect().height;
    const containerHeight = linksContainer.getBoundingClientRect().height;
    const fixedNav = navBar.classList.contains("fixed-nav");
    
    let position = element.offsetTop - navHeight; // let "positon" be the top postiton of the element minus the navs height. the reason we dont want to let position equal just element.offsetTop is because the navbar covers where the section starts 
    // console.log(position)
    if(!fixedNav){ // if the fixednav is static as in we havent scrolled down the height of the navbar then:
      position = position - navHeight;
    }
    if(navHeight > 82){
      position = position + containerHeight
    }
    window.scrollTo({
      left:0,
      top:position,
    });
    linksContainer.style.height = 0;
  });
});

