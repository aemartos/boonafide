import React from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import styled from '@emotion/styled';
import moment from 'moment';
import { colors } from '../lib/common/colors';

const StyledCalendar = styled.div`
  height: 100%;
  .DayPicker {
    color: ${colors.darkGrey};
    font-size: .65em;
    height: 100%;
    .DayPicker-wrapper {
      height: 100%;
      padding: 0;
      border: 1px solid ${colors.darkGrey};
      border-radius: .5em;
      .DayPicker-NavBar {
        span {
          width: 1em;
        }
      }
      .DayPicker-Months {
        .DayPicker-Month {
          border-collapse: unset;
          border-spacing: .2em;
          margin: 1em .5em 0;
          .DayPicker-Caption {
            color: ${colors.orange};
          }
          .DayPicker-Weekdays {
            .DayPicker-WeekdaysRow {
              .DayPicker-Weekday {
                color: ${colors.purple};
                opacity: .6em;
              }
            }
          }
          .DayPicker-Body {
            .DayPicker-Week {
              .DayPicker-Day {
                padding: .4em .5em;
                &:hover {
                  background-color: transparent;
                }
                &.DayPicker-Day--today {
                  color: ${colors.purple};
                }
                &.DayPicker-Day--selected {
                  background-color: ${colors.orange};
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.state = {
      selectedDays: [new Date()],
    };
  }

  handleDayClick(day, { selected }) {
    const selectedDays = [...this.state.selectedDays];
    const activeDay = this.props.selectedDay;
    const selectedDay = moment(day).format('DD-MM-YYYY');
    if (selected && activeDay === selectedDay) {
      const selectedIndex = selectedDays.findIndex((sDay) => DateUtils.isSameDay(sDay, day));
      selectedDays.splice(selectedIndex, 1);
      this.props.onSelectDay(day, true);
    } else if (!selected) {
      selectedDays.push(day);
      this.props.onSelectDay(day, false);
    } else {
      this.props.onSelectDay(day, false);
    }
    this.setState({ selectedDays });
  }

  render() {
    return (
      <StyledCalendar>
        <DayPicker
          selectedDays={this.state.selectedDays}
          onDayClick={this.handleDayClick}
        />
      </StyledCalendar>
    );
  }
}
