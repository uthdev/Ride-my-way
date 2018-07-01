const app = {};

app.loadSideBar = () => {
  let btns = Array.from(document.getElementsByClassName('js__navbar__toggler'));
  let navBarCollaspe = document.querySelector('.navbar__collapse');

  btns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      if(navBarCollaspe.style.display === 'none') {
        navBarCollaspe.style.display = 'block';
      }
      else {
        navBarCollaspe.style.display = 'none';
      }
    } );
  });

};


// Get the navbar
var navbar = document.querySelector("nav");


// Get the offset position of the navbar
var sticky = 50;
console.log(sticky)

// When the user scrolls the page, execute myFunction 
window.onscroll = () => ((window.pageYOffset >= sticky) ? navbar.classList.add("sticky") :  navbar.classList.remove("sticky"));
