exports.circuitNameAnimation = () => {
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
  textpath.textContent = text;

  dynamictext.appendChild(textpath);

  gsap
    .timeline({ repeat: 0 })
    .to(textpath, { attr: { startOffset: "0%" }, duration: 10 });
}