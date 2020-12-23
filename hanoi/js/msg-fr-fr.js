// msg-fr-fr.js
// Application message text for the fr-fr locale (French - France).
// Translations by Google Translate at
// https://translate.google.com/?sl=en&tl=fr&op=translate

var msgFrFr = {
  "getMessageText" : (function(id, values) {
    let textLine = "";
    switch(id) {
      case "_BadDiscSize":
        textLine = "Erreur: taille de disque inattendue trouvée";
        break;
      case "_DiscAtRest":
        textLine = "Disque au repos";
        break;
      case "_DiscInMotion":
        textLine = "Disque en mouvement";
        break;
      case "_DiscTower":
        textLine = "La tour";
        break;
      case "_MoveCount":
        if (values && (values.length === 2)) {
          textLine = " C&rsquo;est le mouvement " + values[0] + " de " + values [1] + ".";
        }
        break;
      case "_MoveExplained":
        if (values && (values.length === 2)) {
          textLine += (" <em>n</em> disques nécessitent ");
          textLine += ("((2<sup><em>n</em></sup>) - 1) mouvements, <br/>donc ");
          textLine += (values[0] + " disques nécessitent " + values[1] + " mouvements.");
        }
        break;
      case "_NoDisplayData":
        textLine = "Erreur: aucune donnée d'affichage trouvée.";
        break;
      case "_NumberDisplayIntro":
        textLine += (" De gauche à droite, de haut en bas. ");
        textLine += (" Les nombres > 0 signifie qu&rsquo;un disque de cette taille est sur cette tour. ");
        textLine += (" 0 signifie pas de disque. ");
        break;
      case "_SmallDiscSize":
        textLine = "Erreur: disque trop petit en dessous";
        break;
      case "_TextDisplayLine":
        if (values && (values.length === 3)) {
          textLine += " Déplacer le disque " + values[0];
          textLine += " de la tour " + values [1];
          textLine += " vers " + values[2] + ".";
        }
        break;
      case "innerHTML_link_en_us":
        textLine = "English";
        break;
      case "innerHTML_link_fr_fr":
        textLine = "Français";
        break;
      case "innerHTML_prompt_doc":
      textLine += (" Objectif: déplacer tous les disques de ");
      textLine += (" la première pile vers la dernière pile dans le plus petit nombre de coups. ");
        break;
      case "innerHTML_prompt_label":
        textLine = "Nommez les 3 tours?";
        break;
      case "innerHTML_prompt_locale":
        textLine = "Changer de langue?";
        break;
      case "innerHTML_prompt_output":
        textLine = "Cliquez pour démarrer la démo:";
        break;
      case "innerHTML_prompt_reset":
        textLine = "Autres options?";
        break;
      case "innerHTML_prompt_rules":
        textLine = " Déplacez 1 disque à la fois. Un disque ne peut reposer que sur un disque plus grand. ";
        break;
      case "innerHTML_prompt_size":
        textLine = "Combien de disques?";
        break;
      case "innerHTML_prompt_title":
        textLine = "Tours de Hanoi";
        break;
      case "value_button_data":
        textLine = "Les nombres";
        break;
      case "value_button_explain_hide":
        textLine = "Masquer les règles";
        break;
      case "value_button_explain_show":
        textLine = "Afficher les règles";
        break;
      case "value_button_reset":
        textLine = "Arrêter la démo";
        break;
      case "value_button_svg":
        textLine = "Animation (graphiques SVG)";
        break;
      case "value_button_text":
        textLine = "Liste des mouvements";
        break;
      case "value_input_label_end":
        textLine = "Fin";
        break;
      case "value_input_label_start":
        textLine = "Début";
        break;
      case "value_input_label_via":
        textLine = "Milieu";
        break;
      default:
        break;
    }
    return textLine;
  })
}
