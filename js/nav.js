// nav.js
// Document navigation features, such as:
//
// (1)
// Table rows: Accordion expand/collapse of lengthy content.
// The convention for table rows is that all content is in some element
// (no raw text in any <td>, put text inside <p> or other). Then,
// when a row is collapsed, in each <td class="td_expand"> in a <tr>,
// only the first <p> that has class="p_summary"
// will be displayed, while any other content in the <td> is hidden.
// Later, when expanded, all elements in the <td> are displayed.
// Show/Hide clickable links in the uI are enabled/disabled to match this.

function toggleExpand(row, show) {
  show = (typeof show === "undefined") ? true : show;
  let tr;
  if (row === "*") {
    let trList = self.document.getElementsByClassName("tr_expand");
    if (trList) {
      for (let i = 0; i < trList.length; i++) {
        tr = trList[i];
        toggleExpandRow(tr, show);
        let rowName = tr.id.slice(4); // after row_
        updateExpandLink(rowName, show);
      }
    }
  }
  else {
    if (row.slice(0,4) === "row_") {
      tr = self.document.getElementById(row);
      toggleExpandRow(tr, show);
      let rowName = tr.id.slice(4); // after row_
      updateExpandLink(rowName, show);
    }
  }

  function toggleExpandRow(tr, show) {
    let tdList = tr.getElementsByClassName("td_expand");
    if (tdList) {
      let tdNode, tdNodes, aEnable, aDisable;
      for (let j = 0; j < tdList.length; j++) {
        tdNodes = tdList[j].getElementsByTagName("p");
        for (let k = 0; k < tdNodes.length; k++) {
          tdNode = tdNodes[k];
          if (tdNode) {
            if (show) {
              tdNode.style.display = "block";
            }
            else {
              if ((tdNode.className === "p_detail") || (tdNode.className === "p_intro")) {
                tdNode.style.display = "none";
              }
            }
          }
        }
      }
    }
  };

  function updateExpandLink(rowName, show) {
    if (show) {
      aEnable = self.document.getElementById("less_" + rowName);
      aDisable = self.document.getElementById("more_" + rowName);
    }
    else {
      aEnable = self.document.getElementById("more_" + rowName);
      aDisable = self.document.getElementById("less_" + rowName);
    }
    aEnable.style.display = "block";
    aDisable.style.display = "none";
  }
};
