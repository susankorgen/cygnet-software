// message.js
// Localization and message handling methods for the application.
// Message text is in files called msg-xx-xx.js per language code.
// If there is no msg-xx-xx.js file for the language code, msg-en-us.js is used.

function setLocale(value) {
  if (typeof value === "undefined") {
    if (typeof this.locale === "undefined") {
      this.locale = "en-us";
    }
  }
  else {
    if ((value === "en-us" ) || (value === "fr-fr")) {
      this.locale = value;
    }
  }
}

function getLocale() {
  return this.locale;
};

// Initialize message dictionaries for supported locales. Get current locale.
function initMessages() {
  this.messageText = {
    "en-us": msgEnUs.getMessageText,
    "fr-fr": msgFrFr.getMessageText
  };
  setLocale();
};

// Populate the user-visible app text with messages in the current language.
function getMessages() {
  let attr = "value";
  if (this.displayPost && this.displayPost.length) { // retain user choices
    let i = 0;
    for (let label of ["start", "via", "end"]) {
      let field = self.document.getElementById("input_label_" + label);
      if (field) {
        field.value = this.displayPost[i];
      }
      i++;
    }
  }
  else { // provide the defaults for the current locale
    for (let label of ["start", "via", "end"]) {
      setMessageField("input_label_" + label, attr);
    }
  }
  for (let button of ["text", "data", "svg", "reset"]) {
    setMessageField("button_" + button, attr);
  }
  toggleExplain(true);
  attr = "innerHTML";
  for (let prompt of ["title", "doc", "rules", "size", "label", "output", "locale", "reset"]) {
    setMessageField("prompt_" + prompt, attr);
  }
  for (let link of ["en_us", "fr_fr"]) {
    setMessageField("link_" + link, attr);
  }
  for (let page of ["start", "prev", "all", "next", "end"]) {
    setMessageField("page_" + page, attr);
  }
  let pIntro = self.document.getElementById("page_intro");
  if (pIntro) {
    if (this.displayId === "output_data") {
      pIntro.innerHTML = getMessageText("_NumberDisplayIntro", [this.moveCount[this.towerSize]]);
    }
    else if (this.displayId === "output_text") {
      pIntro.innerHTML = getMessageText("_MoveDisplayIntro", [this.moveCount[this.towerSize]]);
    }
  }
};

function getMessageText(id, values) {
  return this.messageText[getLocale()](id, values);
};

function setMessageField(id, attr, values) {
  let field = self.document.getElementById(id);
  if (field) {
    field[attr] = this.messageText[getLocale()](attr + "_" + id, values);
  }
};
