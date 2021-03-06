// main.js
// This demo is pure, raw JavaScript/HTML/CSS/SVG. No images, libraries, or plug-ins.
// It shows you can fulfill professional-grade best practices for app development
// reasonably well, by writing every scrap of code yourself: including animation.
//
// NOTE: this file presents the current wish list of TO DO: items at end of file.

// displayDemo() is the main method for the application, invoked by either:
// (1) the body onload event (displayId is undefined in this case), or
// (2) user choosing a type of demo (graphics, etc.) indicated by displayId.
function displayDemo(displayId, displayPage) {
  clearAllTimers();
  displayPage = (typeof displayPage === "undefined") ? 0 : displayPage;
  this.displayPage = displayPage;
  if (!displayId) { // prepare displays with correct message text
    if (typeof this.displaySet === "undefined") {
      this.displaySet = {}; // display data for the animation of all disc moves
      this.displayPost = []; // display data for the 3 towers during animation
      this.moveCount = []; // how many moves to move a tower of n discs 1 time
    }
    initDemo();
    return;
  }
  // now do the appropriate work for the displayId

  // validate user input
  var towerString = validSizeRange("input_size");
  if (!towerString.length) {
    return;
  }
  var towerSize = parseInt(towerString);
  var posts = ["start", "via", "end"];
  var post = [];
  var i = -1;
  for (let label of posts) {
    let labelString = validLabelRange("input_label_" + label);
    if (labelString.length) {
      post[++i] = labelString;
    }
    else {
      return;
    }
  }
  this.towerSize = towerSize;
  this.displayPost = [].concat(post);

  // highlight the user selected button before taking time for data
  var displays = ["text", "data", "svg", "reset"];
  for (let display of displays) {
    toggleDisplayButton("button_" + display);
  }

  // get or build the data for this towerSize
  if (this.displaySet[towerString]) { // get data from storage
    displayMatrix = this.displaySet[towerString];
    displayPost = this.displayPost;
  }
  else  { // build data and store it
    var displayMatrix = [];
    displayMatrix.push(initData(towerSize));
    hanoi(towerSize, "0", "1", "2"); // the posts are in alphanumeric order
    this.displaySet[towerString] = JSON.parse(JSON.stringify(displayMatrix));
  }

  // display the data for this towerSize using the selected display type
  for (let display of displays) {
    toggleDisplay("output_" + display, displayMatrix, displayPost);
  }

  // initializes the HTML elements with correct size, message text, etc.
  function initDemo() {
    initFieldValues();
    initProgressValues();
    initMessages();
    getMessages();
    styleDemoPrompt(true);
  };

  // Provide a first member of the display Set for a towerSize for displayDemo()
  function initData(disc) {
    var displaySize = disc + 1;
    var postStart = Array(displaySize).fill(0);
    var postVia = JSON.parse(JSON.stringify(postStart));
    var postEnd = JSON.parse(JSON.stringify(postStart));
    for (var i = 1; i < displaySize; i++) {
      postStart[i] = i;
    }

    // set up the first state entry for display methods
    var displayCurrent = {};
    displayCurrent["0"] = postStart;
    displayCurrent["1"] = postVia;
    displayCurrent["2"] = postEnd;
    displayCurrent["disc"] = 0;
    displayCurrent["from"] = "";
    displayCurrent["to"] = "";
    return displayCurrent;
  };

  // Code for this recursive function began with 3 lines by Douglas Crockford
  // (DC) in "JavaScript: The Good Parts, Chapter 4". Commented, modified, extended
  // to create/store data to drive demo and exercise more JavaScript features.
  function hanoi(disc, start, via, end) {
    if (disc > 0) {
      // Recursion step 1: Move the next smaller stack OFF the start post.
      hanoi(disc - 1, start, end, via); // (DC)

      // Capture the display data for the moves that accomplish the above step.
      storeDisplayData(disc, start, via, end); // this replaces DC's second line

      // Recursion step 2: Now move that stack ONTO the end post.
      hanoi(disc - 1, via, start, end); // (DC)
    }
  };

  // Build data to drive reactive displays. Stores 1 move from hanoi().
  // hanoi() calls this method at each iteration, to build up all moves.
  function storeDisplayData(disc, start, via, end) {
    try {
      // Clone the previous displayCurrent object; update it for this move
      var displayLast = displayMatrix.length - 1;
      var displayCurrent = JSON.parse(JSON.stringify(displayMatrix[displayLast]));
      displayCurrent["disc"] = disc;
      displayCurrent["from"] = start;
      displayCurrent["to"] = end;

      // Build an array to drive displays for the 3 posts and their discs
      var displaySize = displayCurrent[start].length;
      var nextDisc = 0;
      var i = 0;
      for (i = 1; i < displaySize; i++) {
        nextDisc = displayCurrent[start][i];
        if (nextDisc > 0) {
          if (nextDisc === disc) {
            displayCurrent[start][i] = 0; // move disc off post
          }
          else {
            throw(getMessageText("_BadDiscSize"));
          }
          break;
        }
      }
      if (i === displaySize) { // last disc is off the post
        displayCurrent[start][i] = 0; // move disk off post
      }
      var j = displaySize;
      for (j = 2; j < displaySize; j++) {
        var nextUnder = displayCurrent[end][j];
        if (nextUnder > 0) {
          if (nextUnder > nextDisc) {
            displayCurrent[end][j - 1] = nextDisc;
          }
          else {
            getMessageText("_SmallDiscSize");
          }
          break;
        }
      }
      if (j === displaySize) { // the post is empty
        displayCurrent[end][displaySize - 1] = nextDisc;
      }

      // Store the display data for this move
      displayMatrix.push(displayCurrent);

    } catch (e) {
      console.error(e);
    }
  };

  // Decide which button appears to be selected.
  function toggleDisplayButton(chosenId) {
    var button = self.document.getElementById(chosenId);
    if (button) {
      if (displayId === chosenId.replace("button_", "output_")) {
        button.style.background = "#FAF5AF";
      }
      else {
        button.style.background = "";
      }
    }
  };

  // Decide which content should display on the page after a button is selected.
  function toggleDisplay(chosenId, displayMatrix, displayPost) {
    var div = self.document.getElementById(chosenId);
    var divPro = self.document.getElementById("output_pro");
    var divPager = self.document.getElementById("output_pager");
    if (div && divPro && divPager && displayMatrix) {
      if (chosenId === "output_svg") {
        div.innerHTML = ""
        divPro.innerHTML = ""
        if (displayId === chosenId) {
            outputDisplay(chosenId, displayMatrix, displayPost);
            div.style.display = "block";
            divPro.style.display = "block";
            divPager.style.display = "none";
        }
        else {
          div.style.display = "none";
          divPro.style.display = "none";
        }
      }
      else {
        if (displayId === chosenId) {
          div.innerHTML = outputDisplay(chosenId, displayMatrix, displayPost);
          div.style.display = "block";
          divPager.style.display = "block";
        }
        else {
          div.innerHTML = ""
          div.style.display = "none";
        }
      }
    }
  };
};

// Stop animation (if running) and clear the display.
// If resumed, it will be from the start (first move).
function resetDemo() {
  displayDemo("output_reset");
  styleDemoPrompt(true);
};

// Change the human language. Do not reset. If animation is underway, continue it.
function resetLocale(value) {
  if (getLocale() !== value) {
    setLocale(value);
    getMessages();
    toggleExplain(true);
  }
};

// Advance (or move back) by one page, in one of the character displays:
// text descriptions for outputText() or integer array lists for outputData().
// Number of lines on a page is determined by getMaxPageSize().
// direction has these possible values:
// "next" is forward one page, "prev" is back one page.
// "start" shows the first page, "end" shows the last page.
// "all" shows all available lines at the same time (no paging).
function pageDemo(direction) {
  var displayPage = this.displayPage;
  let pageSize = getMaxPageSize();
  let lastMove = this.moveCount[this.towerSize];
  let currentLast = ((displayPage + 1) * pageSize) - 1;
  let currentFirst = currentLast - pageSize + 1;
  switch (direction) {
    case "next":
      if (currentLast < lastMove) {
        displayPage++;
      }
      break;
    case "prev":
      if (currentFirst > 0) {
        displayPage--;
      }
      break;
    case "all":
      displayPage = -99;
      break;
    case "start":
      displayPage = 0;
      break;
    case "end":
      displayPage = parseInt(Math.floor(lastMove / pageSize));
      break;
    default:
      break;
  }
  displayDemo(this.displayId, displayPage);
};

// TO DO: pause/resume animation in addition to reset (which stops cold)
// TO DO: stop animation (if displaying) if the user starts modifying inputs
// TO DO: style input field/buttons visually; currently using browser defaults.
// TO DO: research and apply best practices for let vs. var
// TO DO: provide a regex example, such as when testing text input values
// TO DO: text inputs too short for cross-site scripting; escape them anyway
// TO DO: provide a simple range bar widget for choosing the tower height
// TO DO: support change of theme (daytime vs. nighttime) to exercise CSS skills
// TO DO: document the specific UI best practice skills here
// TO DO: document the specific JavaScript language skills here
// TO DO: mobile form factor (but is actually pretty good already on iPhone11)
// TO DO: document "startup" [re]learning/choices (IDE, source control, etc.)
// TO DO: right to left text (Hebrew or Arabic messages)
