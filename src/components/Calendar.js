import React from 'react';
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from 'moment/moment';
import "react-big-calendar/lib/css/react-big-calendar.css";
import { API_URL } from '../constants';

function CalendarScreen() {

    const localizer = momentLocalizer(moment);
    const [trainingList, setTrainingList] = React.useState([]);


    const fetchData = () => {
        fetch(API_URL + '/gettrainings')
        .then(response => {
                if (response.ok)
                    return response.json();
                else
                    alert ('Something went wrong in fetch!');
         })
        .then(responseData => setTrainingList(responseData))
        .catch(err => console.error(err))
    }

    React.useEffect(() => {
        fetchData();
    }, []);


    return (
        <div>
            <Calendar
                localizer={localizer}
                events={trainingList}
                style={{height: "450px", margin: "100px 40px"}}
                views={{
                    month: true,
                    week: true,
                    agenda: true,}}
                    drilldownView="agenda"
                step={20}
                showMultiDayTimes
                defaultDate={new Date()}
                titleAccessor={(event) => {
                    return moment(event.date).toDate().getHours() + ":" + moment(event.date).toDate().getMinutes() + " - "
                        +  moment(event.date).add(event.duration, "minutes").toDate().getHours() + ":" + moment(event.date).toDate().getMinutes()
                        + " \n" + event.activity + " / " + event.customer.firstname + " " + event.customer.lastname;
                }}
                startAccessor={startTime => moment(startTime.date).toDate()}
                endAccessor={endTime => moment(endTime.date).add(endTime.duration, "minutes").toDate()}
                           
            />
        </div>
    );
}

export default CalendarScreen;

// idea was looked at https://github.com/linneamyl. Modified and edited to my styling 