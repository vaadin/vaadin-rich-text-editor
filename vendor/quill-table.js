/* eslint-disable camelcase, prefer-const */
const Quill = window.Quill;

const Container = Quill.import('blots/container');
const Block = Quill.import('blots/block');
const BlockEmbed = Quill.import('blots/block/embed');
const Parchment = Quill.import('parchment');
const Scroll = Quill.import('blots/scroll');

class ContainBlot extends Container {
  static create(value) {
    return super.create(value);
  }

  formats(domNode) {
    if (domNode) {
      return domNode.tagName;
    }
    return this.domNode.tagName;
  }
}

ContainBlot.blotName = 'contain';
ContainBlot.tagName = 'contain';
ContainBlot.scope = Parchment.Scope.BLOCK_BLOT;
ContainBlot.defaultChild = 'block';
ContainBlot.allowedChildren = [Block, BlockEmbed, Container];

class TableTrick {
  static random_id() {
    return Math.random().toString(36).slice(2);
  }

  static find_td(quill) {
    let leaf = quill.getLeaf(quill.getSelection()['index']);
    let blot = leaf[0];
    for (; blot != null && blot.statics.blotName != 'td';) {
      blot = blot.parent;
    }
    return blot; // return TD or NULL
  }

  static table_handler(value, quill) {
    console.log(value);
    if (value.includes('newtable_')) {
      let node = null;
      let sizes = value.split('_');
      let row_count = Number.parseInt(sizes[1]);
      let col_count = Number.parseInt(sizes[2]);
      let table_id = TableTrick.random_id();
      let table = Parchment.create('table', table_id);
      for (var ri = 0; ri < row_count; ri++) {
        let row_id = TableTrick.random_id();
        let tr = Parchment.create('tr', row_id);
        table.appendChild(tr);
        for (var ci = 0; ci < col_count; ci++) {
          let cell_id = TableTrick.random_id();
          value = table_id + '|' + row_id + '|' + cell_id;
          let td = Parchment.create('td', value);
          tr.appendChild(td);
          let p = Parchment.create('block');
          td.appendChild(p);
          let br = Parchment.create('break');
          p.appendChild(br);
          node = p;
        }
      }
      let leaf = quill.getLeaf(quill.getSelection()['index']);
      let blot = leaf[0];
      let top_branch = null;
      for (; blot != null && !(blot instanceof Container || blot instanceof Scroll);) {
        top_branch = blot;
        blot = blot.parent;
      }
      blot.insertBefore(table, top_branch);
      return node;
    } else if (value === 'append-col') {
      let td = TableTrick.find_td(quill);
      if (td) {
        let table = td.parent.parent;
        let table_id = table.domNode.getAttribute('table_id');
        table.children.forEach(function(tr) {
          let row_id = tr.domNode.getAttribute('row_id');
          let cell_id = TableTrick.random_id();
          let td = Parchment.create('td', table_id + '|' + row_id + '|' + cell_id);
          tr.appendChild(td);
        });
      }
    } else if (value === 'append-row') {
      let td = TableTrick.find_td(quill);
      if (td) {
        let col_count = td.parent.children.length;
        let table = td.parent.parent;
        let new_row = td.parent.clone();
        let table_id = table.domNode.getAttribute('table_id');
        let row_id = TableTrick.random_id();
        new_row.domNode.setAttribute('row_id', row_id);
        for (let i = col_count - 1; i >= 0; i--) {
          let cell_id = TableTrick.random_id();
          let td = Parchment.create('td', table_id + '|' + row_id + '|' + cell_id);
          new_row.appendChild(td);
          let p = Parchment.create('block');
          td.appendChild(p);
          let br = Parchment.create('break');
          p.appendChild(br);
        }
        table.appendChild(new_row);
        // console.log(new_row);
      }
    } else {
      let table_id = TableTrick.random_id();
      let table = Parchment.create('table', table_id);

      let leaf = quill.getLeaf(quill.getSelection()['index']);
      let blot = leaf[0];
      let top_branch = null;
      for (; blot != null && !(blot instanceof Container || blot instanceof Scroll);) {
        top_branch = blot;
        blot = blot.parent;
      }
      blot.insertBefore(table, top_branch);
      return table;
    }
  }
}


class TableCell extends ContainBlot {

  static create(value) {
    let tagName = 'td';
    let node = super.create(tagName);
    let ids = value.split('|');
    node.setAttribute('table_id', ids[0]);
    node.setAttribute('row_id', ids[1]);
    node.setAttribute('cell_id', ids[2]);
    node.setAttribute('width', ids[3]);
    return node;
  }

  format() {
    return this.getAttribute('id');
  }

  formats() {
    // We don't inherit from FormatBlot
    return {
      [this.statics.blotName]:
      this.domNode.getAttribute('table_id') + '|' +
      this.domNode.getAttribute('row_id') + '|' +
      this.domNode.getAttribute('cell_id') + '|' +
      this.domNode.getAttribute('width')
    };
  }

  optimize(context) {
    super.optimize(context);

    let parent = this.parent;
    if (parent != null) {
      if (parent.statics.blotName === 'td') {
        this.moveChildren(parent, this);
        this.remove();
        return;
      } else if (parent.statics.blotName != 'tr') {
        // we will mark td position, put in table and replace mark
        let mark = Parchment.create('block');
        this.parent.insertBefore(mark, this.next);
        let table = Parchment.create('table', this.domNode.getAttribute('table_id'));
        let tr = Parchment.create('tr', this.domNode.getAttribute('row_id'));
        table.appendChild(tr);
        tr.appendChild(this);
        table.replace(mark);
      }
    }

    // merge same TD id
    let next = this.next;
    if (
      next != null && next.prev === this &&
      next.statics.blotName === this.statics.blotName &&
      next.domNode.tagName === this.domNode.tagName &&
      next.domNode.getAttribute('cell_id') === this.domNode.getAttribute('cell_id')) {
      next.moveChildren(this);
      next.remove();
    }
  }

  insertBefore(childBlot, refBlot) {
    if (this.statics.allowedChildren != null && !this.statics.allowedChildren.some(function (child) {
      return childBlot instanceof child;
    })) {
      let newChild = Parchment.create(this.statics.defaultChild);
      newChild.appendChild(childBlot);
      childBlot = newChild;
    }
    super.insertBefore(childBlot, refBlot)
  }

  replace(target) {
    if (target.statics.blotName !== this.statics.blotName) {
      let item = Parchment.create(this.statics.defaultChild);
      target.moveChildren(item);
      this.appendChild(item);
    }
    if (target.parent == null) {
      return;
    }
    super.replace(target);
  }

  moveChildren(targetParent, refNode) {
    this.children.forEach(function (child) {
      targetParent.insertBefore(child, refNode);
    });
  }
}

TableCell.blotName = 'td';
TableCell.tagName = 'td';
TableCell.scope = Parchment.Scope.BLOCK_BLOT;
TableCell.defaultChild = 'block';
TableCell.allowedChildren = [Block, BlockEmbed, Container];


class TableRow extends ContainBlot {
  static create(value) {
    let tagName = 'tr';
    let node = super.create(tagName);
    node.setAttribute('row_id', value ? value : TableTrick.random_id());
    return node;
  }

  format() {
    return this.getAttribute('row_id');
  }

  optimize(context) {
    if (this.children.length === 0) {
      if (this.statics.defaultChild != null) {
        var child = this.createDefaultChild();
        this.appendChild(child);
        child.optimize(context);
      }
      else {
        this.remove();
      }
    }
    let next = this.next;
    if (next != null && next.prev === this &&
      next.statics.blotName === this.statics.blotName &&
      next.domNode.tagName === this.domNode.tagName &&
      next.domNode.getAttribute('row_id') === this.domNode.getAttribute('row_id')) {
      next.moveChildren(this);
      next.remove();
    }
  }

  insertBefore(childBlot, refBlot) {
    if (this.statics.allowedChildren != null && !this.statics.allowedChildren.some(function(child) {
      return childBlot instanceof child;
    })) {
      let newChild = this.createDefaultChild(refBlot);
      newChild.appendChild(childBlot);
      childBlot = newChild;
    }
    super.insertBefore(childBlot, refBlot);
  }

  replace(target) {
    if (target.statics.blotName !== this.statics.blotName) {
      let item = this.createDefaultChild();
      target.moveChildren(item, this);
      this.appendChild(item);
    }
    super.replace(target);
  }

  createDefaultChild(refBlot) {
    let table_id = null;
    if (refBlot) {
      table_id = refBlot.domNode.getAttribute('table_id');
    } else if (this.parent) {
      table_id = this.parent.domNode.getAttribute('table_id');
    } else {
      table_id = this.domNode.parent.getAttribute('table_id');
    }
    return Parchment.create(this.statics.defaultChild, [table_id, this.domNode.getAttribute('row_id'), TableTrick.random_id()].join('|'));
  }
}

TableRow.blotName = 'tr';
TableRow.tagName = 'tr';
TableRow.scope = Parchment.Scope.BLOCK_BLOT;
TableRow.defaultChild = 'td';
TableRow.allowedChildren = [TableCell];


class Table extends ContainBlot {
  static create(value) {
    let tagName = 'table';
    let node = super.create(tagName);
    node.setAttribute('table_id', value);

    return node;
  }

  format() {
    return this.getAttribute('table_id');
  }

  optimize(context) {
    super.optimize(context);
    let next = this.next;
    if (next != null && next.prev === this &&
      next.statics.blotName === this.statics.blotName &&
      next.domNode.tagName === this.domNode.tagName &&
      next.domNode.getAttribute('table_id') === this.domNode.getAttribute('table_id')) {
      next.moveChildren(this);
      next.remove();
    }
  }

  insertBefore(childBlot, refBlot) {
    if (this.statics.allowedChildren != null && !this.statics.allowedChildren.some(function(child) {
      return childBlot instanceof child;
    })) {
      let newChild = Parchment.create(this.statics.defaultChild, TableTrick.random_id());
      newChild.appendChild(childBlot);
      childBlot = newChild;
    }
    super.insertBefore(childBlot, refBlot)
  }

}

Table.blotName = 'table';
Table.tagName = 'table';
Table.scope = Parchment.Scope.BLOCK_BLOT;
Table.defaultChild = 'tr';
Table.allowedChildren = [TableRow];

Container.order = [
  'list', 'contain',
  'td', 'tr', 'table'
];

class TableModule {
  constructor(quill, options) {
    let toolbar = quill.getModule('toolbar');
    toolbar.addHandler('table', function(value) {
      return TableTrick.table_handler(value, quill);
    });
    let clipboard = quill.getModule('clipboard');
    clipboard.addMatcher('TABLE', function(node, delta) {
      return delta;
    });
    clipboard.addMatcher('TR', function(node, delta) {
      return delta;
    });
    clipboard.addMatcher('TD', function(node, delta) {
      return delta.compose(new Delta().retain(delta.length(), {
        td: node.getAttribute('table_id') + '|' +
          node.getAttribute('row_id') + '|' +
          node.getAttribute('cell_id') + '|' +
          node.getAttribute('width')
      }));
    });
  }
}

Quill.register(TableCell);
Quill.register(TableRow);
Quill.register(Table);
Quill.register(ContainBlot);
Quill.register('modules/table', TableModule);
