import React from 'react';
import DailyTaskList from './DailyTaskList';

module.exports = React.createClass({
  render: function() {
    //console.log(JSON.stringify(this.props.WeeklyList));
    if((typeof this.props.WeeklyList) != 'undefined'){
      var days = this.props.WeeklyList.map(function (day){
          return(
            <DailyTaskList key={day.id} DailyList={day.DailyList} Day={day.Day} />
          );
        });
      days.sort(function(a,b){return a.key - b.key})
    }
    console.log(days);
    return (
      <div className="WeeklyCalendar">
        {days}
      </div>
    );
  }
});
