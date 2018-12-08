import React from 'react';
import {Link} from 'react-router';


import '../css/base.css';



module.exports = React.createClass({
  render: function() {
    console.log("props id " + this.props.id);
    return (

      <div className="Task">
          <Link to={'/' + this.props.id}>{this.props.Title}</Link>
      </div>

    );
  }
});
