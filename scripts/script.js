var theWheel = new Winwheel({
    'outerRadius'     : 212,        // Set outer radius so wheel fits inside the background.
    'innerRadius'     : 75,         // Make wheel hollow so segments don't go all way to center.
    'textFontSize'    : 24,         // Set default font size for the segments.
    'textOrientation' : 'vertical', // Make text vertial so goes down from the outside of wheel.
    'textAlignment'   : 'outer',    // Align text to outside of wheel.
    'numSegments'     : 8,         // Specify number of segments.
    'segments'        :             // Define segments including colour and text.
    [                               // font size and test colour overridden on backrupt segments.
        {'fillStyle' : '#ee1c24', 'text' : 'name1'},
        {'fillStyle' : '#ee1c24', 'text' : 'name2'},
        {'fillStyle' : '#3cb878', 'text' : 'name3'},
        {'fillStyle' : '#f6989d', 'text' : 'name4'},
        {'fillStyle' : '#00aef0', 'text' : 'name5'},
        {'fillStyle' : '#f26522', 'text' : 'name6'},
        {'fillStyle' : '#000000', 'text' : 'name7'},
        {'fillStyle' : '#e70697', 'text' : 'name8'},

    ],
    'animation' :           // Specify the animation to use.
    {
        'type'     : 'spinToStop',
        'duration' : 8,     // Duration in seconds.
        'spins'    : 3,     // Default number of complete spins.
        'callbackFinished' : 'alertPrize()'
    }
});



// Create new wheel object specifying the parameters at creation time.
var theWheel = new Winwheel({
    'outerRadius'     : 212,        // Set outer radius so wheel fits inside the background.
    'innerRadius'     : 0,         // Make wheel hollow so segments don't go all way to center.
    'textFontSize'    : 24,         // Set default font size for the segments.
    'textOrientation' : 'vertical', // Make text vertial so goes down from the outside of wheel.
    'textAlignment'   : 'outer',    // Align text to outside of wheel.
    'numSegments'     : 8,         // Specify number of segments.
    'segments'        :             // Define segments including colour and text.
    [                               // font size and test colour overridden on backrupt segments.
        {'fillStyle' : '#ee1c24', 'text' : 'name1'},
        {'fillStyle' : '#ee1c24', 'text' : 'name2'},
        {'fillStyle' : '#3cb878', 'text' : 'name3'},
        {'fillStyle' : '#f6989d', 'text' : 'name4'},
        {'fillStyle' : '#00aef0', 'text' : 'name5'},
        {'fillStyle' : '#f26522', 'text' : 'name6'},
        {'fillStyle' : '#999999', 'text' : 'name7'},
        {'fillStyle' : '#e70697', 'text' : 'name8'},

    ],
    'animation' :           // Specify the animation to use.
    {
        'type'     : 'spinToStop',
        'duration' : 8,     // Duration in seconds.
        'spins'    : 3,     // Default number of complete spins.
        'callbackFinished' : 'alertPrize()'
    }
});

// Vars used by the code in this page to do power controls.
var wheelPower    = 0;
var wheelSpinning = false;




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
function alertPrize()
{
    // Get the segment indicated by the pointer on the wheel background which is at 0 degrees.
    var winningSegment = theWheel.getIndicatedSegment();

    // Just alert to the user what happened.
    // In a real project probably want to do something more interesting than this with the result.
    if (winningSegment.text == 'LOOSE TURN')
    {
        alert('Sorry but you loose a turn.');
    }
    else if (winningSegment.text == 'BANKRUPT')
    {
        alert('Oh no, you have gone BANKRUPT!');
    }
    else
    {
        alert("You have won " + winningSegment.text);
    }
}

// Chaning the options, I couldn't find a better solution with my current knowledge of JavaScript.
function newOptions(){
    if( theWheel.segments[1].text === 'name1' ){
        theWheel.segments[1].text = 'Example 1';
        theWheel.segments[2].text = 'Example 2';
        theWheel.segments[3].text = 'Example 3';
        theWheel.segments[4].text = 'Example 4';
        theWheel.segments[5].text = 'Example 5';
        theWheel.segments[6].text = 'Example 6';
        theWheel.segments[7].text = 'Example 7';
        theWheel.segments[8].text = 'Example 8';
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

