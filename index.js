var React = require('react');
var Link = require('./components/Link');

module.exports = ReactStateRenderer;

function ReactStateRenderer(options) {
  return function(router) {

    // dunno where to put this
    router.Link = Link(router);

    function getProps(context) {
      return {foo: 1231231, state: {
        params: context.parameters || {},
        data: context.content
      }};
    }

    return {
      render: function(context, cb) {
        var Elem = React.createElement(context.template, getProps(context));
        // this cb really ought to be the 3rd params of React.render, but it's a hard life
        cb(null, React.render(Elem, context.element));
      },
      reset: function reset(context, cb) {
        context.domApi.replaceProps(getProps(context), cb);
      },
      destroy: function(domApi, cb) {
        React.unmountComponentAtNode(React.findDOMNode(domApi));
        cb();
      },
      getChildElement: function(domApi, cb) {
        // is this very wrong?
        cb(null, React.findDOMNode(domApi).querySelector('ui-view'));
      }
    };
  }
}
