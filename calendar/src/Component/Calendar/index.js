import React from "react";
import moment from "moment";
import "./Calendar.css";

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.width = props.width || "500px";
    this.style = props.style || {};
  }

  state = {
    dateContext: moment(),
    today: moment(),
    showMonthPopup: false,
    showYearPopup: false
  };

  weekdays = moment.weekdays(); //["Sunday","Monday",....]
  weekdaysShort = moment.weekdaysShort(); //["Sun","Mon",...]
  months = moment.months();

  year = () => {
    return this.state.dateContext.format("Y");
  };

  month = () => {
    return this.state.dateContext.format("MMM");
  };

  daysInMonth = () => {
    return this.state.dateContext.daysInMonth();
  };

  currentDate = () => {
    return this.state.dateContext.get("date");
  };

  currentDay = () => {
    return this.state.dateContext.format("D");
  };

  firstDayofMonth = () => {
    let dateContext = this.state.dateContext;
    let firstDay = moment(dateContext)
      .startOf("month")
      .format("d"); //Day of week 0,1,..,6
    return firstDay;
  };

  render() {
    let weekdays = this.weekdaysShort.map(day => {
      return (
        <td key={day} className="week-day">
          {day}
        </td>
      );
    });

    let blanks = [];
    for (let i=0;i< this.firstDayofMonth(); i++){
        blanks.push(<td key={"emptySlot"+i} className="emptySlot">
            {""}
        </td>);
    }

    console.log('blanks : ',blanks);
    
    let daysInMonth=[];
    for (let d=1;d<= this.daysInMonth();d++)
    {
        let className = (d=== parseInt(this.currentDay())?"day current-day":"day");
        daysInMonth.push(
            <td key={d} className={className}>
            <span>{d}</span>
            </td>
        );
    }

    let totalSlots=[...blanks, ...daysInMonth];
    let rows=[];
    let cells=[];
    totalSlots.forEach((row,i)=>{
        if((i%7) !== 0){
            cells.push(row);
        }else{
            let newRow=cells.slice();
            rows.push(newRow);
            cells=[];
            cells.push(row);
        }

        if(i === totalSlots.length-1){
            let newRow=cells.slice();
            rows.push(newRow);
        }
    });
    let trDays = rows.map((d,i)=>{
        return (
            <tr key={i*100}>
                {d}
            </tr>
        );
    });

    return (
      <div className="calendar-container">
        <table className="calendar">
          <thead>
            <tr className="calendar-header" />
          </thead>
          <tbody>
            <tr>{weekdays}</tr>
            {trDays}
          </tbody>
        </table>
      </div>
    );
  }
}
