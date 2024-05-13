document.addEventListener("DOMContentLoaded", () => {
  // Menu start
  if (document.querySelector(".menu-btn")) {
    document
      .querySelector(".menu-icon-box")
      .addEventListener("click", function () {
        document.querySelector(".menu-items").classList.toggle("show");
        document
          .querySelector(".menu-icon")
          .classList.toggle("bi-menu-button-fill");
        document.querySelector(".menu-icon").classList.toggle("bi-menu-button");
      });

    document.addEventListener("click", function (event) {
      const menuItems = document.querySelector(".menu-items");
      const menuBtn = document.querySelector(".menu-btn");

      if (
        menuItems.classList.contains("show") &&
        !menuBtn.contains(event.target) &&
        !menuItems.contains(event.target)
      ) {
        menuItems.classList.remove("show");
        document
          .querySelector(".menu-icon")
          .classList.toggle("bi-menu-button-fill");
        document.querySelector(".menu-icon").classList.toggle("bi-menu-button");
      }
    });
  }

  $(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();
  });
  // Menu end

  // Circuit banner start
  // Circuit banner end

  // Circuit page start
  if (document.querySelector(`#Layer_1`)) {
    var svgns = "http://www.w3.org/2000/svg";
    var demo = document.querySelector("#Layer_1");
    var dynamictext = document.createElementNS(svgns, "text");
    var textpath = document.createElementNS(svgns, "textPath");
    var text = "Circuit De Monaco";

    demo.appendChild(dynamictext);

    textpath.id = "textpath1";
    textpath.setAttributeNS(
      "http://www.w3.org/1999/xlink",
      "xlink:href",
      "#masterpath"
    );
    textpath.setAttribute("startOffset", "100%");
    textpath.setAttribute("fill", "#fff");
    textpath.setAttribute("font-size", 30);
    textpath.textContent = text;

    dynamictext.setAttribute("x", 200);
    dynamictext.appendChild(textpath);

    gsap
      .timeline({ repeat: 0 })
      .to(textpath, { attr: { startOffset: "0%" }, duration: 10 });
  }
  // Circuit page end

  // Login, register start
  if (document.querySelector(".login-modal")) {
    const toggleSwitch = document.querySelector("#switch");
    const loginModal = document.querySelector(".login-modal");
    const registerModal = document.querySelector(".register-modal");

    console.log(toggleSwitch);

    toggleSwitch.addEventListener("change", () => {
      if (toggleSwitch.checked == true) {
        loginModal.classList.toggle("modal-hide");
        registerModal.classList.toggle("modal-hide");
      } else {
        loginModal.classList.toggle("modal-hide");
        registerModal.classList.toggle("modal-hide");
      }
    });

    const loginIdInput = document.querySelector("#loginId");
    const loginPwInput = document.querySelector("#loginPw");
    const checkCircle1 = document.querySelector("#checkCircle1 svg");
    const checkCircle2 = document.querySelector("#checkCircle2 svg");
    const checkCircle3 = document.querySelector("#checkCircle3 svg");

    loginIdInput.addEventListener("input", function () {
      if (loginIdInput.value !== "") {
        checkCircle1.style.fill = "red";
      } else {
        checkCircle1.style.fill = "black";
      }

      updateLoginButton();
    });

    loginPwInput.addEventListener("input", function () {
      if (loginPwInput.value !== "") {
        checkCircle2.style.fill = "red";
      } else {
        checkCircle2.style.fill = "black";
      }

      updateLoginButton();
    });

    function updateLoginButton() {
      if (loginIdInput.value !== "" && loginPwInput.value !== "") {
        checkCircle3.style.fill = "green";
      } else {
        checkCircle3.style.fill = "black";
      }
    }

    const registerEmail = document.querySelector("#registerEmail");
    const registerId = document.querySelector("#registerId");
    const registerPw = document.querySelector("#registerPw");
    const checkCircle4 = document.querySelector("#checkCircle4 svg");
    const checkCircle5 = document.querySelector("#checkCircle5 svg");
    const checkCircle6 = document.querySelector("#checkCircle6 svg");
    const checkCircle7 = document.querySelector("#checkCircle7 svg");

    registerEmail.addEventListener("input", function () {
      if (registerEmail.value !== "") {
        checkCircle4.style.fill = "red";
      } else {
        checkCircle4.style.fill = "black";
      }

      updateRegisterButton();
    });

    registerId.addEventListener("input", function () {
      if (registerId.value !== "") {
        checkCircle5.style.fill = "red";
      } else {
        checkCircle5.style.fill = "black";
      }

      updateRegisterButton();
    });

    registerPw.addEventListener("input", function () {
      if (registerPw.value !== "") {
        checkCircle6.style.fill = "red";
      } else {
        checkCircle6.style.fill = "black";
      }

      updateRegisterButton();
    });

    function updateRegisterButton() {
      if (
        registerEmail.value !== "" &&
        registerId.value !== "" &&
        registerPw.value !== ""
      ) {
        checkCircle7.style.fill = "green"; // ID와 PW가 모두 입력되면 체크 사이클 3을 초록색으로 변경
      } else {
        checkCircle7.style.fill = "black";
      }
    }
  }
  // Login, register end
});
