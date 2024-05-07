document.addEventListener("DOMContentLoaded", function() {
  // 메뉴 버튼을 클릭하면 메뉴 아이템이 나타나거나 숨겨지도록 합니다.
  document.querySelector('.menu-btn').addEventListener('click', function() {
    document.querySelector('.menu-items').classList.toggle('show');
    document.querySelector('.menu-icon').classList.toggle('bi-menu-button-fill');
    document.querySelector('.menu-icon').classList.toggle('bi-menu-button');
  });
  
  // 다른 곳을 클릭하면 메뉴 아이템이 숨겨지도록 합니다.
  document.addEventListener('click', function(event) {
    const menuItems = document.querySelector('.menu-items');
    const menuBtn = document.querySelector('.menu-btn');
    
    // 메뉴 아이템이 보이는 상태에서 다른 곳을 클릭하면 메뉴 아이템이 숨겨집니다.
    if (menuItems.classList.contains('show') && !menuBtn.contains(event.target) && !menuItems.contains(event.target)) {
      menuItems.classList.remove('show');
      document.querySelector('.menu-icon').classList.toggle('bi-menu-button-fill');
      document.querySelector('.menu-icon').classList.toggle('bi-menu-button');
    }
  });
});

$(document).ready(function(){
  $('[data-toggle="tooltip"]').tooltip();   
});