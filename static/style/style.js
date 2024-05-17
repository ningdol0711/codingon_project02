document.addEventListener("DOMContentLoaded", () => {
  // Menu start
  if (document.querySelector(".menu-icon-box")) {
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

    $(document).ready(function () {
      $('[data-toggle="tooltip"]').tooltip();
    });
  }
  // Menu end

  // Circuit banner start
  if (document.querySelector("#circuitSelect")) {
    var map = L.map("map").setView([0, 0], 2);
    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
      {
        attribution: '&copy; <a href="https://carto.com/attribution">Carto</a>',
        maxZoom: 18,
      }
    ).addTo(map);

    var circuits = {
      Monaco: {
        "Monaco Grand Prix": [43.7347, 7.4206],
      },
      "United Kingdom": {
        "Silverstone Circuit": [52.0786, -1.0169],
      },
      Belgium: {
        "Circuit de Spa-Francorchamps": [50.4372, 5.9715],
      },
      Italy: {
        "Autodromo Nazionale Monza": [45.6156, 9.2811],
      },
      "United States": {
        "Circuit of the Americas": [30.1328, -97.6412],
      },
      Japan: {
        "Suzuka Circuit": [34.8431, 136.5403],
      },
      Australia: {
        "Albert Park Circuit": [-37.8497, 144.968],
      },
      Hungary: {
        Hungaroring: [47.5789, 19.2489],
      },
      Brazil: {
        "Interlagos Circuit": [-23.7036, -46.6997],
      },
      Bahrain: {
        "Bahrain International Circuit": [26.0325, 50.5106],
      },
    };

    var circuitSelect = document.getElementById("circuitSelect");
    for (var country in circuits) {
      var optgroup = document.createElement("optgroup");
      optgroup.label = country;
      circuitSelect.appendChild(optgroup);

      for (var circuitName in circuits[country]) {
        var option = document.createElement("option");
        option.value = circuitName;
        option.text = circuitName;
        optgroup.appendChild(option);
      }
    }

    var markers = [];

    function addMarkers() {
      clearMarkers();
      for (var country in circuits) {
        for (var circuitName in circuits[country]) {
          var circuitLocation = circuits[country][circuitName];
          var marker = L.marker(circuitLocation, { icon: myIcon })
            .addTo(map)
            .bindPopup(
              `<a href="https://127.0.0.1:8000/circuit${JSON.stringify({circuit: circuitName})}">${circuitName}</a>`
            );
          markers.push(marker);
        }
      }
    }

    function clearMarkers() {
      markers.forEach(function (marker) {
        map.removeLayer(marker);
      });
      markers = [];
    }

    circuitSelect.addEventListener("change", function () {
      var selectedCircuit = circuitSelect.value;
      if (selectedCircuit === "all") {
        map.setView([0, 0], 2);
        clearMarkers();
        addMarkers();
      } else {
        for (var country in circuits) {
          if (circuits[country][selectedCircuit]) {
            var circuitLocation = circuits[country][selectedCircuit];
            map.setView(circuitLocation, 13);
            clearMarkers();
            var marker = L.marker(circuitLocation, { icon: myIcon })
              .addTo(map)
              .bindPopup(
                `<a href="https://127.0.0.1:8000/circuit${JSON.stringify({circuit: selectedCircuit})}">${selectedCircuit}</a>`
              )
              .openPopup();
            markers.push(marker);
            break;
          }
        }
      }
    });

    var myIcon = L.icon({
      iconUrl: "./img/circuits/checkered-flag.svg",
      iconSize: [45, 60],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
    });

    addMarkers();

    var circuitSelect = document.getElementById("circuitSelect");

    circuitSelect.addEventListener("click", function () {
      this.classList.toggle("active");
    });

    circuitSelect.addEventListener("blur", function () {
      this.classList.remove("active");
    });
  }
  // Circuit banner end

  // Circuit page start
  if (document.querySelector("#Layer_1")) {
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

    dynamictext.setAttribute("x", 230);
    dynamictext.appendChild(textpath);

    gsap
      .timeline({ repeat: 0 })
      .to(textpath, { attr: { startOffset: "0%" }, duration: 9 });
  }
  // Circuit page end

  // Login, register start
  if (document.querySelector("#switch")) {
    const toggleSwitch = document.querySelector("#switch");
    const loginModal = document.querySelector(".login-modal");
    const registerModal = document.querySelector(".register-modal");

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

  // Driver info count start
  $(".num").each(function () {
    var $this = $(this),
      countTo = $this.attr("data-count");
    $({ countNum: $this.text() }).animate(
      {
        countNum: countTo,
      },
      {
        duration: 3000,
        easing: "linear",
        step: function () {
          $this.text(Math.floor(this.countNum));
        },
        complete: function () {
          $this.text(this.countNum);
          //alert('finished');
        },
      }
    );
  });
  // Driver info count end

  // Circuit card start
  if (document.querySelector(".circuit-card-container")) {
    function adjustSquareSize() {
      var element = document.querySelector(".card");
      var width = element.clientWidth;
      element.style.height = width + "px";
    }

    adjustSquareSize();

    window.addEventListener("resize", adjustSquareSize);

    var containers = document.querySelectorAll(".circuit-card-container");

    containers.forEach(function (container) {
      container.addEventListener("wheel", function (event) {
        event.preventDefault();

        var delta = event.deltaY || event.detail || event.wheelDelta;

        if (container.scrollLeft === 0 && delta < 0) {
          window.scrollBy({ top: delta, left: 0 });
        } else if (
          container.scrollLeft >=
            container.scrollWidth - container.clientWidth - 1 &&
          delta > 0
        ) {
          window.scrollBy({ top: delta, left: 0 });
        } else {
          container.scrollLeft += (delta > 0 ? 1 : -1) * 40;
        }
      });
    });
  }
  // Circuit card end
});
