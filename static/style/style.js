// Menu start
document.addEventListener("DOMContentLoaded", function() {
  // 메뉴 버튼을 클릭하면 메뉴 아이템이 나타나거나 숨겨지도록 합니다.
  document.querySelector('.menu-icon-box').addEventListener('click', function() {
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
// Menu end

// Circuit banner start
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement); // 렌더러를 body에 추가

// STLLoader를 사용하여 STL 파일을 불러옵니다.
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
var loader = new STLLoader();
loader.load('../../src/3D/CircuitDeMonaco.stl', function (geometry) {
    var material = new THREE.MeshNormalMaterial();
    var mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
});

camera.position.z = 5;

// 렌더링 함수 정의
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate(); // 렌더링 시작
// Circuit banner end