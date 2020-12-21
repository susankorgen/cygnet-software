// msg-en-us.js
// Application message text for the en-us locale (English - United States).
// This is where original messages are developed for translation to other locales.
// Locale handling methods are in messages.js.

var msgEnUs = {
  "getMessageText" : (function(id, values) {
    let textLine = "";
    switch(id) {
      case "_BadDiscSize":
        textLine = "Error: unexpected disc size found";
        break;
      case "_MoveCount":
        if (values && (values.length === 2)) {
          textLine = " This is move " + values[0] + " of " + values [1] + ".";
        }
        break;
      case "_MoveExplained":
        if (values && (values.length === 2)) {
          textLine += (" <em>n</em> discs require ");
          textLine += ("((2<sup><em>n</em></sup>) - 1) moves, so ");
          textLine += (values[0] + " discs require " + values[1] + " moves.");
        }
        break;
      case "_NoDisplayData":
        textLine = "Error: No display data found.";
        break;
      case "_NumberDisplayIntro":
        textLine += (" Left to right is top to bottom. ");
        textLine += (" Numbers > 0 means a disc of that size is on that post. ");
        textLine += (" 0 means no disc. ");
        break;
      case "_SmallDiscSize":
        textLine = "Error: Too small disc underneath";
        break;
      case "_TextDisplayLine":
        if (values && (values.length === 3)) {
          textLine += " Move disc " + values[0];
          textLine += " from post " + values [1];
          textLine += " to " + values[2] + ".";
        }
        break;
      case "button_data":
        textLine = "Numbers";
        break;
      case "button_reset":
        textLine = "Reset";
        break;
      case "button_svg":
        textLine = "Animation (SVG Graphics)";
        break;
      case "button_text":
        textLine = "List of Moves";
        break;
      case "input_label_end":
        textLine = "C";
        break;
      case "input_label_start":
        textLine = "A";
        break;
      case "input_label_via":
        textLine = "B";
        break;
      case "input_size":
        textLine = "7";
        break;
      case "link_en_us":
        textLine = "English";
        break;
      case "link_fr_fr":
        textLine = "Fran\u00E7ais";
        break;
      case "prompt_doc":
        textLine += (" Goal: Move the tower of discs from ");
        textLine += (" the first to the last post in the smallest number of moves. ");
        break;
      case "prompt_label":
        textLine = "Name the 3 posts?";
        break;
      case "prompt_output":
        textLine = "Choose a demo style?";
        break;
      case "prompt_reset":
        textLine = "Other options?";
        break;
      case "prompt_rules":
        textLine = " Move 1 disc at a time. A disc may rest on a larger disc only. ";
        break;
      case "prompt_size":
        textLine = "How many discs for the tower?";
        break;
        case "prompt_title":
          textLine = "Towers of Hanoi";
          break;
      default:
        break;
    }
    return textLine;
  })
}
