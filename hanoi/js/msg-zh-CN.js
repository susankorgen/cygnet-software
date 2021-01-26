// msg-zh-CN.js
// Application message text for the zh-CN locale (Chinese - Simplified).
// Translations by Google Translate at
// https://translate.google.com/?langpair=en%7Czh-CN&sl=en&tl=zh-CN&text=%0A&op=translate

var msgZhCN = {
  "getMessageText" : (function(id, values) {
    let textLine = "";
    switch(id) {
      case "_BadDiscSize":
        textLine = "错误：发现意外的光盘大小";
        break;
      case "_DiscAtRest":
        textLine = "静止盘";
        break;
      case "_DiscInMotion":
        textLine = "光盘运动";
        break;
      case "_DiscTower":
        textLine = "塔, 塔楼";
        break;
      case "_Done":
        textLine = "全部做完！";
        break;
      case "_MoveCount":
        if (values && (values.length === 2)) {
          textLine = "这是第" + values[0] + "步，共" + values [1] + "步。";
        }
        break;
      case "_MoveDisplayIntro":
        if (values && (values.length === 1)) {
          textLine += ("一次移动一张光盘，此");
          textLine += (values[0] + "步移动列表以最快的速度到达末尾。");
        }
        break;
      case "_MoveExplained":
        if (values && (values.length === 2)) {
          textLine += ("<em>n</em> 张光盘需要");
          textLine += ("((2<sup><em>n</em></sup>) - 1)步，所以");
          textLine += (values[0] + "张光盘需要" + values[1] + " 步。");
        }
        break;
      case "_NoDisplayData":
        textLine = "错误：找不到显示数据。";
        break;
      case "_NumberDisplayIntro":
        if (values && (values.length === 1)) {
          textLine += (" 一次移动一张光盘，此");
          textLine += (values[0] + "步移动列表以最快的速度到达末尾。 ");
          textLine += ("数字> 0表示该塔上有该大小的光盘。 ");
          textLine += ("0表示没有光盘。 ");
        }
        break;
      case "_SmallDiscSize":
        textLine = "错误：下方的光盘太小";
        break;
      case "_TextDisplayLine":
        if (values && (values.length === 3)) {
          textLine += "将光盘" + values[0];
          textLine += "从塔架" + values [1];
          textLine += "移到" + values[2] + "。";
        }
        break;
      case "_TimeRanOut":
        textLine = "时间到了！ 在演示期间，您是否访问过其他站点？ 更改窗口大小？";
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
        textLine += "&lt; 所有 &gt;";
        break;
      case "innerHTML_page_end":
        textLine += "末尾";
        break;
      case "innerHTML_page_next":
        textLine += "下面, 下边 &gt;";
        break;
      case "innerHTML_page_prev":
        textLine += "&lt; 以前";
        break;
      case "innerHTML_page_start":
        textLine += "开端";
        break;
      case "innerHTML_prompt_doc":
        textLine += ("目标：以最少的移动次数将光盘塔从第一塔移动到最后一个塔。");
        break;
      case "innerHTML_prompt_label":
        textLine = "为这三座塔命名？";
        break;
      case "innerHTML_prompt_locale":
        textLine = "改变语言？";
        break;
      case "innerHTML_prompt_output":
        textLine = "单击以开始演示：";
        break;
      case "innerHTML_prompt_reset":
        textLine = "还有其他选择吗？";
        break;
      case "innerHTML_prompt_rules":
        textLine = " 一次移动1张光盘。 光盘只能放在较大的光盘上。 ";
        break;
      case "innerHTML_prompt_size":
        textLine = "几张光盘？";
        break;
      case "innerHTML_prompt_title":
        textLine = "佛的塔";
        break;
      case "value_button_data":
        textLine = "数字";
        break;
      case "value_button_explain_hide":
        textLine = "隐藏规则";
        break;
      case "value_button_explain_show":
        textLine = "显示规则";
        break;
      case "value_button_reset":
        textLine = "停止演示";
        break;
      case "value_button_svg":
        textLine = "动画（SVG图形）";
        break;
      case "value_button_text":
        textLine = "动作清单";
        break;
      case "value_input_label_end":
        textLine = "末尾";
        break;
      case "value_input_label_start":
        textLine = "开端";
        break;
      case "value_input_label_via":
        textLine = "中间";
        break;
      default:
        break;
    }
    return textLine;
  })
}
