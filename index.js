var React = require('react');
var Link = require('./components/Link');

module.exports = ReactStateRenderer;

function ReactStateRenderer(options) {
  return function(router) {

    // dunno where to put this
    router.Link = Link(router);

    return {
      render: function(context, cb) {
        var elem = React.createElement(context.template);

        // data from resolve
        elem.props.stateContent = context.content;

        React.render(elem, context.element, function() {
          cb(null, context.element);
        });
      },
      reset: function reset(context, cb) {
        // WUT
        console.log(context);
        cb();
      },
      destroy: function(domApi, cb) {
        React.unmountComponentAtNode(domApi);
        cb();
      },
      getChildElement: function(domApi, cb) {
        // is this very wrong?
        cb(null, domApi.querySelector('ui-view'));
      }
    };
  }
}
