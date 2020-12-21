// valid.js
// Validation methods and get/set methods for the app's value limits.

function getTowerMaxSize() {
  return 13;
};

function getLeftPanelWidth() {
  return 220; // match doc.css div-LeftPanel style
};

function validSizeRange(fieldId) {
  let validated = 0;
  let field = self.document.getElementById(fieldId);
  if (field) {
    let valueInt = parseInt(field.value);
    if ((valueInt < 5) || (valueInt > getTowerMaxSize())) {
      toggleValid(fieldId, false);
    }
    else {
      toggleValid(fieldId, true);
      validated = field.value;
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
