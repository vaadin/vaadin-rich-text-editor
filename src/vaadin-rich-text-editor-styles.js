import { registerStyles, css } from '@vaadin/vaadin-themable-mixin/register-styles.js';
import { contentStyles } from './vaadin-rich-text-editor-content-styles.js';
import { toolbarStyles } from './vaadin-rich-text-editor-toolbar-styles.js';

registerStyles(
  '',
  css`
    ${contentStyles}
    ${toolbarStyles}

    :host([readonly]) [part='toolbar'] {
      display: none;
    }

    :host([disabled]) {
      pointer-events: none;
      opacity: 0.5;
      -webkit-user-select: none;
      -moz-user-select: none;
      user-select: none;
    }

    :host([disabled]) [part~='toolbar-button'] {
      background-color: transparent;
    }
  `,
  { moduleId: 'vaadin-rich-text-editor-styles' }
);
