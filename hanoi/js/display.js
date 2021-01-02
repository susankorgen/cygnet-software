// display.js
// Display methods for the application.

// Based on type of display requested, output the visuals to the page.
function outputDisplay(displayId, displayMatrix, displayPost) {
  clearAllTimers();
  if (!isDisplayDataValid(displayMatrix, displayPost)) {
    return outputElement("p", getMessageText("_NoDisplayData"));
  }
  else {
    switch(displayId) {
      case "output_text":
        return outputText(displayMatrix, displayPost);
      case "output_data":
        return outputData(displayMatrix, displayPost);
      case "output_svg":
        outputSVG(displayId, displayMatrix, displayPost);
        return "";
      default:
        return "";
    }
  };

  function isDisplayDataValid(displayMatrix, displayPost) {
    let isValid = false;
    if (displayMatrix && (displayMatrix.length >= 2) && (displayMatrix[0]["0"])) {
      if (displayPost && (displayPost.length === 3)) {
        isValid = true;
      }
    }
    return isValid;
  };

  function outputText(displayMatrix, displayPost) {
    styleDemoPrompt();
    var displayLength = displayMatrix.length;
    var towerSize = displayMatrix[0]["0"].length - 1;
    var towerString = towerSize.toString();
    var displaySpace = displayLength.toString().length;
    var displayCurrent = {};
    var textLine = "";
    var fullText = "";
    fullText += "<pre>";
    for (var i = 1; i < displayLength; i++) {
      displayCurrent = displayMatrix[i];
      var values = [displayCurrent.disc, displayPost[displayCurrent.from], displayPost[displayCurrent.to]];
      var moveString = i.toString();
      textLine = "";
      for (var m = displaySpace; m > moveString.length; m--) {
        textLine += " ";
      }
      textLine += " " + moveString + ": " + getMessageText("_TextDisplayLine", values);
      fullText += textLine + "\n";
    }
    fullText += "</pre>";
    return fullText;
  };

  function outputData(displayMatrix, displayPost) {
    styleDemoPrompt();
    var displayLength = displayMatrix.length;
    var towerSize = displayMatrix[0]["0"].length - 1;
    var towerString = towerSize.toString();
    var moveString = (displayLength - 1).toString();
    var displaySpace = moveString.length;
    var displayCurrent = {};
    var fullText = "";
    var textLine = "";

    fullText += outputElement("p", getMessageText("_NumberDisplayIntro"));
    fullText += "<pre>";
    for (var i = 0; i < displayLength; i++) {
      displayCurrent = displayMatrix[i];
      moveString = i.toString();
      textLine = "";
      for (var m = displaySpace; m > moveString.length; m--) {
        textLine += " ";
      }
      textLine += " " + (i > 0) ? (moveString + ":") : "  ";
      textLine += "  ";
      for (let prop in displayCurrent) {
        if (displayCurrent.hasOwnProperty(prop) &&
            (typeof displayCurrent[prop] === "object")) { // display posts only
            textLine += (displayPost[prop] + ":" + JSON.stringify(displayCurrent[prop]) + "  ");
        }
      }
      fullText += textLine + "\n";
    }
    fullText += "</pre>";
    return fullText;
  };

  // setInterval is adapted from https://javascript.info/js-animation
  // - additions and improvements are:
  // (1) calling clearInterval at start, in case button is clicked during animation
  // (2) multiple independent timers: each updates at different time interval
  // (3) purpose of a faster progress bar timer is to give smooth motion, but:
  // (4) if total moves is huge, avoid exhaustive updates on progress; scale down
  function outputSVG(displayId, displayMatrix, displayPost) {
    let divTowers = self.document.getElementById(displayId);
    let divProgress = self.document.getElementById("output_pro");
    if (!divTowers || !divProgress) {
     return;
    }
    styleDemoPrompt();

    // dimensions
    var postSize = displayMatrix[0]["0"].length;
    var towerSize = postSize - 1;
    var moveCount = this.moveCount[towerSize];
    var displayLength = moveCount + 1;

    // time
    var factorProgress = (towerSize > 12) ? 1 : (towerSize > 10) ? 2 : (towerSize > 8) ? 3 : (towerSize > 6) ? 4 : 6;
    var moveFactor = moveCount * factorProgress;
    var intervalTowers = ((getTowerMaxSize() - towerSize + 1) * 60);
    var intervalProgress = intervalTowers / factorProgress;
    var totalTimeLimit = 2 * intervalTowers * displayLength; // tons of extra
    var startTime = Date.now();
    var done = false;

    // start
    var snapshot = 0;
    drawSnapshot(divTowers, displayMatrix, displayPost, snapshot, postSize);
    var factor = -1;
    drawProgress(divProgress, snapshot, towerSize, factorProgress, factor);

    // towers and discs (run slower for fewer discs, faster for more discs)
    this.timerTowers = setInterval(function() {
      let timePassed = Date.now() - startTime;
      if ((snapshot >= moveCount) || (timePassed > totalTimeLimit)) {
        clearInterval(this.timerTowers);
        done = true;
        return;
      }
      drawSnapshot(divTowers, displayMatrix, displayPost, ++snapshot, postSize);
    }, intervalTowers);

    // progress bar (may run 2 or more times as fast as drawSnapshot, or same interval)
    this.timerProgress = setInterval(function() {
      let timePassed = Date.now() - startTime;
      if (done || (snapshot >= moveCount) || (factor >= moveFactor) || (timePassed > totalTimeLimit)) {
        clearInterval(this.timerProgress);
        if (timePassed > totalTimeLimit) {
          divProgress.innerHTML += outputElement("p", getMessageText("_TimeRanOut"));
        }
        else {
          drawProgress(divProgress, snapshot, towerSize, factorProgress, moveFactor);
          divProgress.innerHTML += outputElement("p", getMessageText("_Done"));
        }
        return;
      }
      drawProgress(divProgress, snapshot, towerSize, factorProgress, ++factor);
    }, intervalProgress);
  };

  function drawSnapshot(div, displayMatrix, displayPost, snapshot, postSize) {
    var displayCurrent = displayMatrix[snapshot];
    var x, y, w, h, top, left;
    var heightFactorTower = 1.7;
    var towerSize = postSize - 1;
    var moveCount = this.moveCount[towerSize];
    var displayLength = moveCount + 1;
    let svgW = window.innerWidth - getLeftPanelWidth();
    let unit = parseInt(svgW / (7 * (postSize + 1)));
    var row = parseInt(unit * heightFactorTower);
    var nudge = parseInt(unit / 2);
    var towerSize = postSize - 1;
    var maxWidth = parseInt(((2 * towerSize) + 1) * unit);
    var heightFactorBase = parseInt(towerSize / 2.5);
    var spacer = 2 * unit;
    var left = 0;
    var cx = {};
    cx["0"] = left + spacer + towerSize * unit;
    cx["1"] = cx["0"] + spacer + (((2 * towerSize) + 1) * unit);
    cx["2"] = cx["1"] + spacer + (((2 * towerSize) + 1) * unit);

    // SVG Towers start
    var fullText = "";
    let svgH = parseInt((towerSize + 2) * row * 2); // drawing + legend
    fullText += svgStart("svg_output_svg", svgW, svgH);

    // towers and discs
    let inMotion = "#D9534F";
    let atRest = "#00AFE4";
    var postColor = "darkgray";
    var discColor = atRest;
    for (let tower in cx) { // all towers
      if (cx.hasOwnProperty(tower)) {
        for (let j = 0; j < postSize; j++) { // all discs
          let disc = displayCurrent[tower][j];
          x = cx[tower] - (disc * unit);
          y = 20 + parseInt(j * row);
          w = ((2 * disc) + 1) * unit;
          discColor = (disc === j) ? atRest : inMotion;
          if (disc === 0) {
            fullText += svgRect(x, y, w, parseInt(row * 1.7), postColor, "2", "2");
          }
          else {
            fullText += svgRect(x, y, w, row, discColor, "5", "5");
          }
        }
        // post bases
        top = y + row;
        left = cx[tower] - (towerSize * unit);
        x = left;
        y = top;
        w = maxWidth;
        hBase = heightFactorBase * row;
        fullText += svgRect(x, y, w, hBase, postColor);
        x = left - nudge;
        y = top + nudge;
        h = hBase - unit;
        w = unit;
        fullText += svgRect(x, y, w, h, "white", "8", "8");
        x += maxWidth;
        fullText += svgRect(x, y, w, h, "white", "8", "8");
      }
    }
    // post base labels
    y = top + (hBase / 2) + nudge;
    x = cx["0"] + nudge;
    fullText += svgLabel(x, y, "black", "2", displayPost["0"], "middle");
    x += (maxWidth + spacer);
    fullText += svgLabel(x, y, "black", "2", displayPost["1"], "middle");
    x += (maxWidth + spacer);
    fullText += svgLabel(x, y, "black", "2", displayPost["2"], "middle");
    // legend
    y = top + hBase + (2 * unit);
    x = unit;
    let rIn = unit / 2;
    let rOut = (towerSize < 8) ? 2 * unit : 3 * unit;
    x += rOut;
    y += rOut;
    fullText += svgCircle(x, y, rOut, atRest);
    fullText += svgCircle(x, y, rIn, postColor);
    x += rOut + nudge;
    let message = getMessageText("_DiscAtRest");
    fullText += svgLabel(x, y, "#090909", "1", message, "left");
    x += parseInt(message.length * getFontHorizontalFactor()) + rOut + unit;
    fullText += svgCircle(x, y, rOut, inMotion);
    fullText += svgCircle(x, y, rIn, postColor);
    x += rOut + nudge;
    message = getMessageText("_DiscInMotion");
    fullText += svgLabel(x, y, "#090909", "1", message, "left");

    // SVG Towers end
    fullText += '</svg>';

    let lengthString = this.moveCount[towerSize].toString();
    fullText += outputElement("p", getMessageText("_MoveExplained", [towerSize, lengthString]));
    if (snapshot === 0) {
      fullText += outputElement("p", "&nbsp;");
    }
    else {
      fullText += outputElement("p", getMessageText("_MoveCount", [snapshot, lengthString]));
    }
    div.innerHTML = fullText;
    return;
  };

  function drawProgress(div, snapshot, towerSize, factorProgress, factor) {
    let moveCount = this.moveCount[towerSize];
    let svg, id;
    let lighted = "green";
    let dimmed = "whitesmoke";
    let fullText = "";

    // SVG Progress start
    let barHeight = 10;
    let svgW = window.innerWidth - getLeftPanelWidth();
    let unit = (svgW - 80) / (moveCount * factorProgress);
    let svgH = parseInt(barHeight * 3);
    fullText += svgStart("svg_output_pro", svgW, svgH);

    let x = 0;
    let y = 0;
    let f = dimmed;
    let w = unit * moveCount * factorProgress;
    let h = barHeight;
    id = "bg_" + snapshot.toString() + "_" + factor.toString();
    fullText += svgProgress(id, x, y, w, h, f);
    if (factor > 0) {
      f = lighted;
      w = factor * unit;
      id = "id_" + snapshot.toString() + "_" + factor.toString();
      fullText += svgProgress(id, x, y, w, h, f);
    }

    // SVG Progress end
    fullText += '</svg>';

    div.innerHTML = fullText;
    return;
  };

  function svgStart(id, w, h) {
    let svgLine = '<svg id="' + id + '"';
    svgLine += ' width="' + w + '" height="' + h + '"';
    svgLine += ' viewBox="0 0 ' + w + ' ' + h + '"';
    svgLine += ' style="background-color:white;border-bottom:1px solid lightgray;"';
    svgLine += '>';
    return svgLine;
  };

  function svgRect(x, y, w, h, f, rx, ry) {
    let svgLine = '<rect';
    svgLine += ' x="' + x + '" y="' + y + '"';
    svgLine += ' width="' + w + '" height="' + h + '"';
    svgLine += ' style="fill:' + f + ';stroke:' + f + ';stroke-width:2;"';
    if (rx && rx.length) {
      svgLine += ' rx="' + rx + '"';
    }
    if (ry && rx.length) {
      svgLine += ' ry="' + ry + '"';
    }
    svgLine += '/>';
    return svgLine;
  };

  function svgLabel(x, y, color, stroke, text, align) {
    let svgLine = '<text';
    svgLine += ' x="' + x + '" y="' + y;
    svgLine += '" style="font-size:' + getFontSize().toString();
    svgLine += 'pt;font-family:Arial;text-anchor:' + align + ';';
    svgLine += 'stroke:' + stroke + ';fill:' + color + ';"';
    svgLine += '>' + text + '</text>';
    return svgLine;
  };

  function svgCircle(cx, cy, r, color) {
    let svgLine = '<circle';
    svgLine += ' cx="' + cx + '" cy="' + cy + '" r="' + r + '"';
    svgLine += ' style="stroke:' + color + ';fill:' + color + ';"';
    svgLine += '/>';
    return svgLine;
  };

  function svgProgress(id, x, y, w, h, f, rx, ry) {
    let svgLine = '<rect id="' + id + '"';
    svgLine += ' x="' + x + '" y="' + y + '"';
    svgLine += ' width="' + w + '" height="' + h + '"';
    svgLine += ' style="fill:' + f + ';stroke:' + f + ';stroke-width:2;"';
    if (rx && rx.length) {
      svgLine += ' rx="' + rx + '"';
    }
    if (ry && rx.length) {
      svgLine += ' ry="' + ry + '"';
    }
    svgLine += '/>';
    return svgLine;
  };

  // Return a simple HTML tag with the tagName enclosing the content string.
  // Example: outputElement("p", "Hello world") returns "<p>Hello world</p>"
  function outputElement(tagName, content) {
    // Provided here as history (safely: this method is called infrequently):
    // the array/push/join string building technique that helped old browsers.
    // This is slower than using += with strings, which is the technique used
    // elsewhere in this sample. If interested, see this long-closed question:
    // https://stackoverflow.com/questions/16696632
    // /most-efficient-way-to-concatenate-strings-in-javascript
    htmlString = [];
    htmlString.push("<" + tagName + ">");
    if (typeof content !== "undefined") {
      htmlString.push(content);
    }
    htmlString.push("</" + tagName + ">");
    return htmlString.join("");
  };
};

// With no arguments, the method toggles the Show/Hide display status of
// the puzzle explanation and the Show/Hide text of the related button.
// If you call the method with localeOnly === true,
// the method leaves the Show/Hide display status unchanged and
// instead, updates the locale language of the rules and button text.
function toggleExplain(localeOnly) {
  localeOnly = (typeof localeOnly === "undefined") ? false : localeOnly;
  let field = self.document.getElementById("explain");
  let button = self.document.getElementById("button_explain");
  if (field && button) {
    let showText = getMessageText("value_button_explain_show");
    let hideText = getMessageText("value_button_explain_hide");
    let hidden = (field.style.display === "none");
    if (localeOnly) {
      button.value = hidden ? showText : hideText;
    }
    else {
      button.value = hidden ? hideText : showText;
      field.style.display = hidden ? "block" : "none";
    }
  }
};

function clearAllTimers() {
  if (this.timerTowers) {
    clearInterval(this.timerTowers);
  }
  if (this.timerProgress) {
    clearInterval(this.timerProgress);
  }
};

function styleDemoPrompt(strong) {
  strong = (typeof strong === "undefined") ? false : strong;
  var div = self.document.getElementById("prompt_output");
  if (div) {
    div.style.color = strong ? "red" : "rgb(60,60,60)";
  }
};

// TO DO: Call upon resize and when first displaying the page.
function adjustSizes() {
  // TO DO: implement
};
