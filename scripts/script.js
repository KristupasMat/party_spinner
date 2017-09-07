
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
        {'fillStyle' : '#FFE272', 'text' : 'name1', 'task' : 'Your task is to burn'},
        {'fillStyle' : '#379E9B', 'text' : 'name2', 'task' : 'Your task is to burn'},
        {'fillStyle' : '#CAD2E0', 'text' : 'name3', 'task' : 'Your task is to burn'},
        {'fillStyle' : '#246664', 'text' : 'name4', 'task' : 'Your task is to burn'},
        {'fillStyle' : '#FFE272', 'text' : 'name5', 'task' : 'Your task is to burn'},
        {'fillStyle' : '#379E9B', 'text' : 'name6', 'task' : 'Your task is to burn'},
        {'fillStyle' : '#CAD2E0', 'text' : 'name7', 'task' : 'Your task is to burn'},
        {'fillStyle' : '#246664', 'text' : 'name8', 'task' : 'Your task is to burn'},


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
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

// shadow for the canvas //
context.shadowColor = '#000';
context.shadowBlur = 10;
context.shadowOffsetX = 0;
context.shadowOffsetY = 0;
context.fill();
theWheel.draw();
// Get the segment indicated by the pointer on the wheel background which is at 0 degrees.
var winningSegment = theWheel.getIndicatedSegment();
// -------------------------------------------------------
// Click handler for spin button.
// -------------------------------------------------------
function startSpin()
{
    // Ensure that spinning can't be clicked again while already running.
    if (wheelSpinning == false)
    {
        //Reset the spinning for the wheel to be fully animated again. Without it, it only moves small degrees.
        theWheel.rotationAngle = 0;
        theWheel.draw(false);
        // Begin the spin animation by calling startAnimation on the wheel object.
        theWheel.startAnimation();

    }
    // Starting a song when startSpin is fired.
    var audioPlay = document.createElement('audio');
    audioPlay.src = 'audio/song.mp3';
    audioPlay.play();
}

// Function for reset button.
// -------------------------------------------------------
function resetWheel()
{
    theWheel.stopAnimation(false);  // Stop the animation, false as param so does not call callback function.
    theWheel.rotationAngle = 0;     // Re-set the wheel angle to 0 degrees.
    theWheel.draw();                // Call draw to render changes to the wheel.
    wheelSpinning = false;          // Reset to false to power buttons and spin can be clicked again.
}

// -------------------------------------------------------
// Called when the spin animation has finished by the callback feature of the wheel because I specified callback in the parameters.
// -------------------------------------------------------
function showPrize()
{
    if(winningSegment.text){
        var pHtml = document.querySelector('div#popUp p');
        displayDiv.style.display = 'block';
        displayDiv.className = 'animated zoomIn';
        pHtml.innerHTML = winningSegment.task;
    }
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
    displayDiv.style.display = 'none';
}
function animateIntro() {
    introSec.className = 'fadingIn';
}
function loadContent() {
    bodyLoad.className = 'loaded';
}
setTimeout(loadContent, 2000);
setTimeout(animateIntro, 2200);

closePop.addEventListener('click', closePopUp, false);