import './vaadin-rich-text-editor-content-styles.js';
import './vaadin-rich-text-editor-toolbar-styles.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="vaadin-rich-text-editor-styles">
  <template>
    <style include="vaadin-rich-text-editor-content-styles vaadin-rich-text-editor-toolbar-styles">
      :host([readonly]) [part="toolbar"] {
        display: none;
      }

      :host([disabled]) {
        pointer-events: none;
        opacity: 0.5;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
      }

      :host([disabled]) [part~="toolbar-button"] {
        background-color: transparent;
      }
    </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
