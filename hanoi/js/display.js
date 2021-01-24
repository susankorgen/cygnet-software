// display.js
// General display methods for the application.

// Based on type of display requested, output the visuals to the page.
function outputDisplay(displayId, displayMatrix, displayPost) {
  clearAllTimers();
  this.displayId = "";
  if (!isDisplayDataValid(displayMatrix, displayPost)) {
    return outputElement("p", getMessageText("_NoDisplayData"));
  }
  else {
    switch(displayId) {
      case "output_text":
        this.displayId = displayId;
        return outputChar(displayMatrix, displayPost, 'text');
      case "output_data":
        this.displayId = displayId;
        return outputChar(displayMatrix, displayPost, 'data');
      case "output_svg":
        this.displayId = displayId;
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

  function outputChar(displayMatrix, displayPost, displayType) {
    styleDemoPrompt();
    var displayLength = displayMatrix.length;
    let moveTotal = displayLength - 1;
    let moveString = moveTotal.toString();
    let moveSpace = moveString.length;
    var towerString = this.towerSize.toString();
    var displayCurrent = {};
    var fullText = "";
    var textLine = "";
    let ellipsis = "    .\n    .\n    .\n";
    let pageIntro = self.document.getElementById("page_intro");
    fullText += "<pre>";
    let start, end, displayPageSize;
    if (this.displayPage < 0) {
      start = 0;
      end = displayLength;
    }
    else {
      displayPageSize = getMaxPageSize();
      start = this.displayPage * displayPageSize;
      end = start + displayPageSize;
      end = (end > displayLength) ? displayLength : end;
    }
    if (start > 0) {
      fullText += ellipsis;
    }
    switch (displayType) {
      case "text":
        pageIntro.innerHTML = getMessageText("_MoveDisplayIntro", [moveString])
        for (var i = start; i < end; i++) {
          textLine = "";
          if (i > 0) { // with physical moves, there is no move "0"
            displayCurrent = displayMatrix[i];
            var values = [displayCurrent.disc, displayPost[displayCurrent.from], displayPost[displayCurrent.to]];
            moveString = i.toString();
            for (var m = moveSpace; m > moveString.length; m--) {
              textLine += " ";
            }
            textLine += " " + moveString + ": " + getMessageText("_TextDisplayLine", values);
          }
        fullText += textLine + "\n";
        }
        break;
      case "data":
        pageIntro.innerHTML = getMessageText("_NumberDisplayIntro", [moveString])
        for (var i = start; i < end; i++) {
          displayCurrent = displayMatrix[i];
          moveString = i.toString();
          textLine = "";
          for (var m = moveSpace; m > moveString.length; m--) {
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
        break;
      default:
        break;
    }
    if (end < moveTotal) {
      fullText += ellipsis;
    }
    fullText += "</pre>";
    return fullText;
  };
};

// Return a simple HTML tag with the tagName enclosing the content string.
// Example: outputElement("p", "Hello world") returns "<p>Hello world</p>"
function outputElement(tagName, content, className) {
  // Provided here as history (safely: this method is called infrequently):
  // the array/push/join string building technique that helped old browsers.
  // This is slower than using += with strings, which is the technique used
  // elsewhere in this sample. If interested, see this long-closed question:
  // https://stackoverflow.com/questions/16696632
  // /most-efficient-way-to-concatenate-strings-in-javascript
  htmlString = [];
  htmlString.push("<" + tagName);
  if (className && className.length) {
    htmlString.push(" class=\"" + className + "\"");
  }
  htmlString.push(">");
  if (typeof content !== "undefined") {
    htmlString.push(content);
  }
  htmlString.push("</" + tagName + ">");
  return htmlString.join("");
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

function styleDemoPrompt(strong) {
  strong = (typeof strong === "undefined") ? false : strong;
  var div = self.document.getElementById("prompt_output");
  if (div) {
    div.style.color = strong ? "red" : "rgb(60,60,60)";
  }
};
