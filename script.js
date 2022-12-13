const track = document.getElementById("image-track");

// clicking and dragging half-way across the screen has to move our image track from one
// end to the other --> this functionality needs to be possible no matter where we click on
// the screen.*
// By tracking the starting point*, and using it to create a virtual slider using math**, we can thereby
// obtain the value we truly need which is the percentage of our slider that has been slid

// *
window.onmousedown = (e) => {
  // we cans store exact x position of mouse here --> created new custom value on
  // our image-track element that will update everytime mouse is pressed dowm
  track.dataset.mouseDownAt = e.clientX;
};

window.onmousemove = (e) => {
  // if value stored in data attribute is 0 (pretty much whenever the mouse isn't pressed down),
  // return immediately, and skip the code that's telling the track to move
  if (track.dataset.mouseDownAt === "0") return;
  // **
  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX;
  maxDelta = window.innerWidth / 2;
  // use this value to set the translateX percentage
  const percentage = (mouseDelta / maxDelta) * -100;
  // Accounts for circumstances when the user will move slider (nth time)
  // next percentage = percentage change = (mouseDelta) + where we are currently
  // traversed on the silder

  let nextPercentage = parseFloat(track.dataset.prevPercentage) + percentage;
  if (nextPercentage > 0 || nextPercentage < -100) return;

  // percentage value stored in a dynamic data-attribute that can be recorded later when mouse is up
  track.dataset.percentage = nextPercentage;

  track.animate(
    { transform: `translate(${nextPercentage}%, -50%)` },
    { duration: 1200, fill: "forwards" }
  );

  for (const image of track.getElementsByClassName("image")) {
    image.animate(
      { objectPosition: `${100 + nextPercentage}% center` },
      { duration: 1200, fill: "forwards" }
    );
  }
};

window.onmouseup = () => {
  // set back to '0' when mouse is no longer pressed down
  track.dataset.mouseDownAt = "0";
  track.dataset.prevPercentage = track.dataset.percentage;
};
