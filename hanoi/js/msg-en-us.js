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
      case "_Done":
        textLine = "All done!";
        break;
      case "_MoveCount":
        if (values && (values.length === 2)) {
          textLine = " This is move " + values[0] + " of " + values [1] + ".";
        }
        break;
      case "_MoveDisplayIntro":
        if (values && (values.length === 1)) {
          textLine += (" Moving one disc at a time, this list of ");
          textLine += (values[0] + " moves reaches the end most rapidly.");
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
        if (values && (values.length === 1)) {
          textLine += (" Moving one disc at a time, this list of ");
          textLine += (values[0] + " moves reaches the end most rapidly.");
          textLine += (" Numbers > 0 means a disc of that size is on that tower. ");
          textLine += (" 0 means no disc. ");
        }
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
      case "_TimeRanOut":
        textLine = "Time is up! During the demo, did you <br/>visit other sites? Change window size?";
        break;
      case "innerHTML_link_en_us":
        textLine = "English";
        break;
      case "innerHTML_link_fr_fr":
        textLine = "Français";
        break;
      case "innerHTML_link_zh_CN":
        textLine = "语, 文, 话";
        break;
      case "innerHTML_page_all":
        textLine += "&lt; All &gt;";
        break;
      case "innerHTML_page_end":
        textLine += "End";
        break;
      case "innerHTML_page_next":
        textLine += "Next &gt;";
        break;
      case "innerHTML_page_prev":
        textLine += "&lt; Previous";
        break;
      case "innerHTML_page_start":
        textLine += "Start";
        break;
      case "innerHTML_prompt_doc":
        textLine += (" Goal: Move the tower of discs from ");
        textLine += (" the first to the last tower in the smallest number of moves. ");
        break;
      case "innerHTML_prompt_label":
        textLine = "Name the 3 towers?";
        break;
      case "innerHTML_prompt_locale":
        textLine = "Change language?";
        break;
      case "innerHTML_prompt_output":
        textLine = "Click to start the demo:";
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
      case "value_button_explain_hide":
        textLine = "Hide Rules";
        break;
      case "value_button_explain_show":
        textLine = "Show Rules";
        break;
      case "value_button_reset":
        textLine = "Stop Demo";
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
