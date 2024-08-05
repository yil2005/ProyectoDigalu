document.getElementById('menu-button').addEventListener('click', function() {
  var menu = document.getElementById('menu');
  if (menu.style.display === 'block') {
      menu.style.display = 'none';
      menu.classList.remove('animate__fadeIn');
  } else {
      menu.style.display = 'block';
      menu.classList.add('animate__fadeIn');
  }
});

document.getElementById('menu-button').addEventListener('mouseover', function() {
  this.classList.add('animate__animated', 'animate__pulse');
});

document.getElementById('menu-button').addEventListener('mouseout', function() {
  this.classList.remove('animate__animated', 'animate__pulse');
});