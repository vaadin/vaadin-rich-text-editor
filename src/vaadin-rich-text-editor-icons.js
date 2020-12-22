import '@polymer/polymer/lib/elements/custom-style.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<custom-style>
  <style>
    @font-face {
      font-family: 'vaadin-rte-icons';
      src: url(data:application/font-woff;charset=utf-8;base64,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) format('woff');
      font-weight: normal;
      font-style: normal;
    }

    html {
      --vaadin-rte-icons-align-center: "\\ea01";
      --vaadin-rte-icons-align-left: "\\ea02";
      --vaadin-rte-icons-align-right: "\\ea03";
      --vaadin-rte-icons-clean: "\\ea04";
      --vaadin-rte-icons-image: "\\ea05";
      --vaadin-rte-icons-link: "\\ea06";
      --vaadin-rte-icons-list-bullet: "\\ea07";
      --vaadin-rte-icons-list-ordered: "\\ea08";
      --vaadin-rte-icons-redo: "\\ea09";
      --vaadin-rte-icons-undo: "\\ea0a";
    }
  </style>
</custom-style><dom-module id="vaadin-rich-text-editor-icons">
  <template>
    <style>
      [part~="toolbar-button-align-center"]::before {
        content: var(--vaadin-rte-icons-align-center);
      }

      [part~="toolbar-button-align-left"]::before {
        content: var(--vaadin-rte-icons-align-left);
      }

      [part~="toolbar-button-align-right"]::before {
        content: var(--vaadin-rte-icons-align-right);
      }

      [part~="toolbar-button-clean"]::before {
        content: var(--vaadin-rte-icons-clean);
      }

      [part~="toolbar-button-image"]::before {
        content: var(--vaadin-rte-icons-image);
      }

      [part~="toolbar-button-link"]::before {
        content: var(--vaadin-rte-icons-link);
      }

      [part~="toolbar-button-list-bullet"]::before {
        content: var(--vaadin-rte-icons-list-bullet);
      }

      [part~="toolbar-button-list-ordered"]::before {
        content: var(--vaadin-rte-icons-list-ordered);
      }

      [part~="toolbar-button-redo"]::before {
        content: var(--vaadin-rte-icons-redo);
      }

      [part~="toolbar-button-undo"]::before {
        content: var(--vaadin-rte-icons-undo);
      }

      /* RTL specific styles */

      :host([dir="rtl"]) [part~="toolbar-button-redo"]::before {
        content: var(--vaadin-rte-icons-undo);
      }

      :host([dir="rtl"]) [part~="toolbar-button-undo"]::before {
        content: var(--vaadin-rte-icons-redo);
      }
    </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);

/* NOTE: Auto generated with 'gulp icons', do not edit */
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
;
