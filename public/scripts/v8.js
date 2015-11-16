function getIterator(root, filterMethod) {
  return document.createNodeIterator(
    root,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode: function(node) {
        if (filterMethod(node)) {
          return NodeFilter.FILTER_ACCEPT;
        }
      }
    },
    false
  );
}

function tagDeprecated(root, filterMethod, className, ancestorSelector) {
  var nodeIterator = getIterator(root, filterMethod);
  var node;

  while ((node = nodeIterator.nextNode())) {
    var closest = jQuery(node).closest(ancestorSelector);
    closest.addClass(className);

    var nodeName = closest[0].nodeName;
    var container = null;

    switch (nodeName) {
      default:
        break;
      case 'TR':
        container = closest.prev('tr[class^="separator"]');
        container.addClass(className);
        break;
      case 'A':
        container = closest.closest('li');
        container.addClass(className);
        break;
    }
  }
}

function filter(node) {
  return node.data.indexOf('V8_DEPRECATE') > -1;
}

function hideDeprecated() {
  jQuery('body').toggleClass('hide-deprecated');
}

function init() {
  jQuery('#hide-deprecated').change(function(e) {
    hideDeprecated();
  });
  jQuery('#nav-tree').click(function(e) {
    tag(e.currentTarget, 'a[class^="classv8"]');
  });
}

// Redefine dynsections::toggleInherit for hidden deprecated method support
/*eslint no-unused-vars:0 */
function toggleInherit(id) {
  var rows = $('tr.inherit.'+id);
  var img = $('tr.inherit_header.'+id+' img');
  var src = $(img).attr('src');
  if ($(img).attr('src').indexOf('open') > -1) {
    rows.css('display', 'none');
    $(img).attr('src', src.substring(0, src.length-8)+'closed.png');
  } else {
    rows.css('display', 'table-row'); // using show() causes jump in firefox
    $(img).attr('src', src.substring(0, src.length-10)+'open.png');
  }
}

function tag(root, selector) {
  tagDeprecated(root, filter, 'deprecated', selector);
}

jQuery(document).ready(function() {
  init();
  tag(document.body, 'div.memitem,tr[class^="memitem"]');
  hideDeprecated();
});
