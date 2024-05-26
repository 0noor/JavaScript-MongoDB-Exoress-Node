function getSelectedText() {
  const selObj = window.getSelection().toString();
  if (selObj.length !== 0) {
    document.getElementById("here").style.display = "inline";
    document.getElementById("here2").style.display = "inline";
    document.getElementById("here3").style.display = "inline";
    document.getElementById("here4").style.display = "inline";
  }
}
window.addEventListener("mousemove", function (e) { console.log(e.x, e.y) });