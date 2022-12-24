import React, { useRef } from "react";
import { kofiwidget2 } from "./widget2";

export default function SupportMeButton() {
  kofiwidget2.init("Support Me on Ko-fi", "#29abe0", "mtaku3");

  return React.createElement("div", {
    dangerouslySetInnerHTML: {
      __html: kofiwidget2.getHTML(),
    },
  });
}
