
// Create new wheel object specifying the parameters at creation time.
var theWheel = new Winwheel({
    'outerRadius'     : 150,        // Set outer radius so wheel fits inside the background.
    'innerRadius'     : 0,         // Make wheel hollow so segments don't go all way to center.
    'textFontSize'    : 24,         // Set default font size for the segments.
    'textOrientation' : 'vertical', // Make text vertial so goes down from the outside of wheel.
    'textAlignment'   : 'outer',    // Align text to outside of wheel.
    'numSegments'     : 8,         // Specify number of segments.
    'segments'        :             // Define segments including colour and text.
    [                               // font size and test colour overridden on backrupt segments.
        {'fillStyle' : '#FFE272', 'text' : 'TRUTH', 'task' : 'Have you ever had sex in your parent\'s\ bed?'},
        {'fillStyle' : '#379E9B', 'text' : 'DARE', 'task' : 'Take a shot'},
        {'fillStyle' : '#CAD2E0', 'text' : 'TRUTH', 'task' : 'Where you ever drunk?'},
        {'fillStyle' : '#246664', 'text' : 'DARE', 'task' : 'Do 100 push-ups'},
        {'fillStyle' : '#FFE272', 'text' : 'TRUTH', 'task' : 'Worst childhood memory?'},
        {'fillStyle' : '#379E9B', 'text' : 'DARE', 'task' : 'Make a prank call'},
        {'fillStyle' : '#CAD2E0', 'text' : 'TRUTH', 'task' : 'Biggest life regrets?'},
        {'fillStyle' : '#246664', 'text' : 'DARE', 'task' : 'Mix every alcohol into drink'},
    ],
    'animation' :           // Specify the animation to use.
    {
        'type'     : 'spinToStop',
        'duration' : 8,     // Duration in seconds.
        'spins'    : 3,     // Default number of complete spins.
        'callbackFinished' : 'showPrize()'
    }
});

var wheelPower    = 0;
var wheelSpinning = false;
var closePop = document.querySelector('div#popUp img');
var bodyLoad = document.querySelector('body');
var introSec = document.querySelector('section#intro');
var displayDiv = document.querySelector('div#popUp');
var overlay = document.querySelector('div#cover');
var spinBut = document.querySelector('button.spin');
var newOpt = document.querySelector('button.newOptions');

// Click handler for spin button.
// -------------------------------------------------------
function startSpin() {
    // Ensure that spinning can't be clicked again while already running.
    if (wheelSpinning == false)
    {
        //Reset the spinning for the wheel to be fully animated again. Without it, it only moves small degrees.
        theWheel.stopAnimation(false);
        theWheel.rotationAngle = 0;
        theWheel.draw();
        theWheel.rotationAngle = 0;
        theWheel.draw(false);
        // Begin the spin animation by calling startAnimation on the wheel object.
        theWheel.startAnimation();

    }
    // Starting a song when startSpin is fired.;
    var songPlaying = document.querySelector('playing');

    if(songPlaying){

    } else {
        var audioPlay = document.createElement('audio');
        document.body.appendChild(audioPlay);
        audioPlay.id = 'playing';
        audioPlay.src = 'audio/song.mp3';
        audioPlay.play();
        audioPlay.addEventListener('ended', function(){
            audioPlay.parentNode.removeChild(audioPlay);
        }, false);
    } 
    // Reset to false to power buttons and spin can be clicked again.
    // Removing the event listener and activating it again, when the pop up is closed, so while spinning it would not be possible to interfer. It solves the sound problem as well.
    spinBut.removeEventListener('click', startSpin, false);
    newOpt.removeEventListener('click', newOptions, false);
    // Changing the cursor and chaning spin to spinning, slightly improves UX.
    spinBut.style.cursor = 'not-allowed';
    newOpt.style.cursor = 'not-allowed';
    spinBut.innerHTML = 'SPINNING!';
}
// -------------------------------------------------------
// Called when the spin animation has finished by the callback feature of the wheel because I specified callback in the parameters.
// -------------------------------------------------------
function showPrize()
{
    // Get the segment indicated by the pointer on the wheel background which is at 0 degrees.
    var winningSegment = theWheel.getIndicatedSegment();
    var pHtml = document.querySelector('div#popUp p');
    overlay.style.display = 'block';
    displayDiv.style.display = 'block';
    displayDiv.className = 'animated zoomIn';
    pHtml.innerHTML = winningSegment.task;
    wheelSpinning = false;
}

// Chaning the options, I couldn't find a better solution with my current knowledge of JavaScript.
function newOptions(){

    if( theWheel.segments[1].text === 'name1' ){
        theWheel.segments[1].text = 'test1';
        theWheel.segments[2].text = 'test2';
        theWheel.segments[3].text = 'test3';
        theWheel.segments[4].text = 'test4';
        theWheel.segments[5].text = 'test5';
        theWheel.segments[6].text = 'test6';
        theWheel.segments[7].text = 'test7';
        theWheel.segments[8].text = 'test8';
    } else {
        theWheel.segments[1].text = 'name1';
        theWheel.segments[2].text = 'name2';
        theWheel.segments[3].text = 'name3';
        theWheel.segments[4].text = 'name4';
        theWheel.segments[5].text = 'name5';
        theWheel.segments[6].text = 'name6';
        theWheel.segments[7].text = 'name7';
        theWheel.segments[8].text = 'name8';
    }
    theWheel.draw();               // Call draw to render changes to the wheel..
}
function closePopUp(){
    // putting back the styles and event listeners.
    displayDiv.style.display = 'none';
    overlay.style.display = 'none';
    spinBut.addEventListener('click', startSpin, false);
    newOpt.addEventListener('click', newOptions, false);
    spinBut.style.cursor = 'pointer';
    newOpt.style.cursor = 'pointer';
    spinBut.innerHTML = 'SPIN';
}
function animateIntro() {
    introSec.className = 'fadingIn';
}
function loadContent() {
    bodyLoad.className = 'loaded';
}
setTimeout(loadContent, 2000);
setTimeout(animateIntro, 2200);

spinBut.addEventListener('click', startSpin, false);
newOpt.addEventListener('click', newOptions, false);
closePop.addEventListener('click', closePopUp, false);

//Page transitions//
window.addEventListener("beforeunload", function () {
    document.body.classList.add("animate-out");
});
