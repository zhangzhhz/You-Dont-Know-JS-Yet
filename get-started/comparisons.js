"use strict";

const dayStart = "07:30";
const dayEnd = "17:45";

function scheduleMeeting(startTime,durationMinutes) {
    // get start hour and start minute of dayStart
    let [dayStartHour, dayStartMinute] = dayStart.split(":").map((e) => Number(e));
    // get start hour and start minute of dayEnd
    let [dayEndHour, dayEndMinute] = dayEnd.split(":").map((e) => Number(e));

    // get start hour and start minute of startTime
    let [startHour, startMinute] = startTime.split(":").map((e) => Number(e));
    // get endHour and endMinute
    let minutes = startMinute + durationMinutes;
    let durationHour = Math.floor(minutes / 60);
    let endMinute = minutes % 60;
    let endHour = startHour + durationHour;

    console.log(`${startTime} + ${durationMinutes} mins => ${endHour}:${endMinute}`);

    let rc;

    if (startHour < dayStartHour || endHour > dayEndHour) {
      rc = false;
    }
    else if (startHour === dayStartHour) {
      if (startMinute < dayStartMinute) {
        rc = false;
      }
      else {
        rc = true;
      }
    }
    else if (endHour === dayEndHour) {
      if (endMinute > dayEndMinute) {
        rc = false;
      }
      else {
        rc = true;
      }
    }
    else {
      rc = true;
    }

    console.log(rc);
}

scheduleMeeting("7:00",15);     // false
scheduleMeeting("07:15",30);    // false
scheduleMeeting("7:30",30);     // true
scheduleMeeting("11:30",60);    // true
scheduleMeeting("17:00",45);    // true
scheduleMeeting("17:30",30);    // false
scheduleMeeting("18:00",15);    // false