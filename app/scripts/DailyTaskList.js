import React from 'react';
import Task from './Task';

import '../css/base.css';

module.exports = React.createClass({
  render: function() {
    var tasks = this.props.DailyList.map(function (task){
        return(
          <Task id={task.id} key={task.Title} Title={task.Title} />
        );
      });
    return (
      <div className="DailyTaskList">
        <h2>{this.props.Day}</h2>
        {tasks}
      </div>
    );
  }
});
