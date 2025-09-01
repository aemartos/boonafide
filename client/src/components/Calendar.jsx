import React from 'react';
import { DayPicker } from 'react-day-picker';
import styled from '@emotion/styled';
import { colors } from '../lib/common/colors';

const StyledCalendar = styled.div`
  height: 100%;
  
  .rdp {
    color: ${colors.darkGrey};
    font-size: 0.7rem;
    height: 100%;
    
    .rdp-nav {
      position: relative;
      top: -1.2em;
      display: flex;
      justify-content: space-between;
      align-items: center;
      
      .rdp-nav_button {
        border: none;
        background: transparent;
        cursor: pointer;
        color: ${colors.purple};
        svg {
          width: 10px;
          height: 10px;
        }
        
        &:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      }
    }
    
    .rdp-months {
      .rdp-month {
        .rdp-caption {
          color: ${colors.orange};
          font-weight: bold;
          text-align: center;
          height: 1.6em;
          font-size: .9rem;
        }
        
        .rdp-table {
          border-collapse: separate;
          border-spacing: 0;
          margin: 0 auto;
          
          .rdp-head {
            .rdp-head_row {
              .rdp-head_cell {
                color: ${colors.purple};
                opacity: 0.7;
                font-weight: 600;
                padding: 0.5rem;
                text-align: center;
              }
            }
          }
          
          .rdp-tbody {
            .rdp-row {
              .rdp-cell {
                padding: 0;
                
                .rdp-button {
                  width: 1.6rem;
                  height: 1.6rem;
                  padding: 0;
                  border: none;
                  background: transparent;
                  border-radius: 50%;
                  cursor: pointer;
                  color: ${colors.darkGrey};
                  font-size: 0.875rem;
                  transition: all 0.2s ease;
                  
                  &:hover {
                    background-color: rgba(79, 83, 115, 0.2);
                    color: ${colors.purple};
                  }
                  
                  &:focus {
                    outline: 2px solid ${colors.orange};
                    outline-offset: 2px;
                  }
                  
                  &.rdp-day_today {
                    color: ${colors.purple};
                    font-weight: bold;
                    background-color: rgba(79, 83, 115, 0.1);
                  }
                  
                  &.rdp-day_selected {
                    background-color: ${colors.orange};
                    color: white;
                    font-weight: bold;
                    
                    &:hover {
                      background-color: ${colors.orange};
                      color: white;
                    }
                  }
                  
                  &.rdp-day_outside {
                    opacity: 0.3;
                  }
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
  static isSameDay(date1, date2) {
    if (!date1 || !date2) return false;
    return date1.getDate() === date2.getDate()
      && date1.getMonth() === date2.getMonth()
      && date1.getFullYear() === date2.getFullYear();
  }

  static parseDate(dateString) {
    if (!dateString) return null;
    if (typeof dateString === 'string' && dateString.includes('-')) {
      const parts = dateString.split('-');
      if (parts.length === 3) {
        return new Date(parts[2], parts[1] - 1, parts[0]);
      }
    }
    const date = new Date(dateString);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.state = {
      selectedDay: Calendar.parseDate(props.selectedDay),
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedDay !== this.props.selectedDay) {
      this.setState({
        selectedDay: Calendar.parseDate(this.props.selectedDay),
      });
    }
  }

  handleDayClick(day) {
    const { selectedDay } = this.state;
    const { onSelectDay } = this.props;
    const isSameDay = Calendar.isSameDay(selectedDay, day);
    if (isSameDay) {
      this.setState({ selectedDay: null });
      if (onSelectDay) {
        onSelectDay(day, true);
      }
    } else {
      this.setState({ selectedDay: day });
      if (onSelectDay) {
        onSelectDay(day, false);
      }
    }
  }

  render() {
    const { selectedDay } = this.state;
    return (
      <StyledCalendar>
        <DayPicker
          selected={selectedDay ? [selectedDay] : []}
          onSelect={this.handleDayClick}
          mode="single"
          showOutsideDays
          weekStartsOn={1} // Monday
        />
      </StyledCalendar>
    );
  }
}
