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
      case "_DiscAtRest":
        textLine = "Disc at rest";
        break;
      case "_DiscInMotion":
        textLine = "Disc in motion";
        break;
      case "_DiscTower":
        textLine = "Tower";
        break;
      case "_MoveCount":
        if (values && (values.length === 2)) {
          textLine = " This is move " + values[0] + " of " + values [1] + ".";
        }
        break;
      case "_MoveExplained":
        if (values && (values.length === 2)) {
          textLine += (" <em>n</em> discs require ");
          textLine += ("((2<sup><em>n</em></sup>) - 1) moves, <br/>so ");
          textLine += (values[0] + " discs require " + values[1] + " moves.");
        }
        break;
      case "_NoDisplayData":
        textLine = "Error: No display data found.";
        break;
      case "_NumberDisplayIntro":
        textLine += (" Left to right is top to bottom. ");
        textLine += (" Numbers > 0 means a disc of that size is on that tower. ");
        textLine += (" 0 means no disc. ");
        break;
      case "_SmallDiscSize":
        textLine = "Error: Too small disc underneath";
        break;
      case "_TextDisplayLine":
        if (values && (values.length === 3)) {
          textLine += " Move disc " + values[0];
          textLine += " from tower " + values [1];
          textLine += " to " + values[2] + ".";
        }
        break;
      case "innerHTML_link_en_us":
        textLine = "English";
        break;
      case "innerHTML_link_fr_fr":
        textLine = "Français";
        break;
      case "innerHTML_prompt_doc":
        textLine += (" Goal: Move the tower of discs from ");
        textLine += (" the first to the last tower in the smallest number of moves. ");
        break;
      case "innerHTML_prompt_label":
        textLine = "Name the 3 towers?";
        break;
      case "innerHTML_prompt_output":
        textLine = "Start the demo in which style?";
        break;
      case "innerHTML_prompt_reset":
        textLine = "Other options?";
        break;
      case "innerHTML_prompt_rules":
        textLine = " Move 1 disc at a time. A disc may rest on a larger disc only. ";
        break;
      case "innerHTML_prompt_size":
        textLine = "How many discs?";
        break;
      case "innerHTML_prompt_title":
        textLine = "Towers of Hanoi";
        break;
      case "value_button_data":
        textLine = "Numbers";
        break;
      case "value_button_reset":
        textLine = "Reset";
        break;
      case "value_button_svg":
        textLine = "Animation (SVG Graphics)";
        break;
      case "value_button_text":
        textLine = "List of Moves";
        break;
      case "value_input_label_end":
        textLine = "End";
        break;
      case "value_input_label_start":
        textLine = "Start";
        break;
      case "value_input_label_via":
        textLine = "Middle";
        break;
      default:
        break;
    }
    return textLine;
  })
}
