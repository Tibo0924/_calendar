import * as React from "react";
import { useState, useEffect } from "react";
import styled, { css } from "styled-components";
// timezone support
import moment from "moment";
import "moment-timezone";

// styled components
const Frame = styled.div`
  width: 400px;
  border: 1px solid lightgrey;
  box-shadow: 2px 2px 2px #eee;
  border-radius: 10%;
`;

const Header = styled.div`
  font-size: 18px;
  font-weight: bold;
  padding: 20px 20px 10px 20px;
  display: flex;
  color: white;
  justify-content: space-between;
  background-color: #3798b5;
`;

const Button = styled.div`
  cursor: pointer;
`;

const Body = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const Day = styled.div`
  width: 14.2%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-top: 1%;

  ${(props) =>
    props.isToday &&
    css`
      border: 1px solid red;
      border-radius: 10%;
    `}

  ${(props) =>
    props.isSelected &&
    css`
      background-color: #3798b5;
      border-radius: 10%;
      color: white;
    `}
`;

const WeekDaysWrapper = styled.div`
  display: flex;
  width: 100%;
  border-bottom: 1px solid #0000004a;
  padding-bottom: 10px;
  padding-top: 10px;
`;

const DaysWrapper = styled.div`
  display: flex;

  width: 100%;
  flex-wrap: wrap;
`;

export function Calendar() {
  // initialize state
  const daysOfTheWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const MONTHS = moment.months();

  const today = new Date();
  const [date, setDate] = useState(today);
  const [day, setDay] = useState(date.getDate());
  const [month, setMonth] = useState(date.getMonth());
  const [year, setYear] = useState(moment().year());
  const [startDay, setStartDay] = useState(getStartDayOfMonth(date));
  const [lastDay, setLastDay] = useState(getLastDayOfMonth(year, month));

  // CDM -
  useEffect(() => {
    setDay(date.getDate());
    setMonth(date.getMonth());
    setYear(date.getFullYear());
    setStartDay(getStartDayOfMonth(date));
    setLastDay(getLastDayOfMonth(year, month));
  }, [date, year, month]);

  function getLastDayOfMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
  }
  console.log(
    "==============================================",
    startDay,
    "STARTDAY"
  );
  function getStartDayOfMonth() {
    // will return an integer representing starting day of the week + 1
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  }

  return (
    <Frame>
      <Header>
        <Button onClick={() => setDate(new Date(year, month, day - 7))}>
          Prev
        </Button>
        <div>
          {MONTHS[month]} {year}
        </div>
        <Button onClick={() => setDate(new Date(year, month, day + 7))}>
          Next
        </Button>
      </Header>
      <Body>
        <WeekDaysWrapper>
          {daysOfTheWeek.map((d) => (
            <Day key={d}>
              <strong>{d}</strong>
            </Day>
          ))}
        </WeekDaysWrapper>
        <DaysWrapper>
          {Array(lastDay + startDay)
            .fill(null)
            .map((_, index) => {
              const d = index - (startDay - 1);
              return (
                <Day
                  key={index}
                  isToday={month === today.getMonth() && d === today.getDate()}
                  isSelected={d === day}
                  onClick={() => setDate(new Date(year, month, d))}>
                  {d > 0 ? d : ""}
                </Day>
              );
            })}
        </DaysWrapper>
      </Body>
    </Frame>
  );
}
