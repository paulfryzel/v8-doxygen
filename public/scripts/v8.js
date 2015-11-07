function getIterator(filterMethod) {
  return document.createNodeIterator(
    document.body,
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
  var nodeIterator = getIterator(filterMethod);
  var node;

  while ((node = nodeIterator.nextNode())) {
    var closest = jQuery(node).closest(ancestorSelector);
    closest.addClass(className);
    if (closest[0].nodeName === 'TR') {
      var separator = closest.prev('tr[class^="separator"]');
      separator.addClass(className);
    }
  }
}

function filter(node) {
  return node.data.indexOf('V8_DEPRECATE_SOON') > -1 &&
         node.data.indexOf('V8_DEPRECATED');
}

function hideDeprecated() {
  jQuery('body').toggleClass('hide-deprecated');
}

function init() {
  jQuery('#hide-deprecated').change(function(e) {
    hideDeprecated();
  });
}

jQuery(document).ready(function() {
  init();
  tagDeprecated(document.body, filter, 'deprecated', 'div.memitem,tr[class^="memitem"]')
  hideDeprecated();
});
