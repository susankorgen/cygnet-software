// valid.js
// Validation methods and get/set methods for the app's value limits.

function getTowerMaxSize() {
  return 13;
};

function getTowerDefaultSize() {
  return 7;
};

function getLeftPanelWidth() {
  return 220; // match doc.css div-LeftPanel style
};

function getFontSize() {
  return 12;
};

function getFontHorizontalFactor() {
  return getFontSize() * 0.75; 
};

function initFieldValues() {
  let field = self.document.getElementById("input_size");
  if (field) {
    field.value = getTowerDefaultSize();
  }
};

function initProgressValues() {
  let postSize = getTowerMaxSize() + 1;
  this.moveCount = [];
  for (let i = 0; i < postSize; i++) {
    this.moveCount.push(Math.pow(2, i) - 1);
  }
};

function validSizeRange(fieldId) {
  let validated = 0;
  let field = self.document.getElementById(fieldId);
  if (field) {
    let valueString = field.value;
    if (isNaN(valueString)) {
      toggleValid(fieldId, false);
    }
    else {
      let valueInt = parseInt(field.value);
      if ((valueInt < 5) || (valueInt > getTowerMaxSize())) {
        toggleValid(fieldId, false);
      }
      else {
        toggleValid(fieldId, true);
        validated = field.value;
      }
    }
  }
  return validated;
};

function validLabelRange(fieldId) {
  let validated = "";
  let field = self.document.getElementById(fieldId);
  if (field) {
    if ((field.value.length < 1) || (field.value.length > 7)) {
      toggleValid(fieldId, false);
    }
    else {
      toggleValid(fieldId, true);
      validated = field.value;
    }
  }
  return validated;
};

function toggleValid(fieldId, isValid) {
  var field = self.document.getElementById(fieldId);
  if (field) {
    if (isValid) {
      field.style.color = "black";
    }
    else {
      field.style.color = "red";
    }
  }
};
