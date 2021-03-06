var React = require('react');
var cx = require('classnames');

module.exports = function(router) {
  return React.createClass({
    componentWillMount: function() {
      this.stateChangeEndListener = function() {
        var isActive = router.stateIsActive(this.props.sref, this.props.sparams);
        this.setState({isActive: isActive});
      }.bind(this);
      router.on('stateChangeEnd', this.stateChangeEndListener);
    },
    componentWillUnmount: function() {
      router.removeListener('stateChangeEnd', this.stateChangeEndListener);
    },
    getInitialState: function() {
      return {isActive: false};
    },
    render: function() {
      var {...props} = this.props;
      var sref = this.props.sref;
      if (!sref) {
        throw new Error('Link is missing required attribute value: sref');
      }
      var href = router.makePath(sref, this.props.sparams);
      //if (!href) { throw new Error(`State ${sref} does not exist`); } // asr does this already
      props.href = href;
      props.className = cx({
        active: this.state.isActive
      }, this.props.className);
      return React.createElement('a', props);
    }
  });
};
