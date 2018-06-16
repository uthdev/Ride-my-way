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