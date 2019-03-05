import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import truncate from 'lodash/truncate';
import { colors } from '../lib/common/colors';
import { getTime } from '../lib/common/helpers';

const StyledThumb = styled.div`
  margin: 1em 0;
  padding-bottom: 1em;
  border-bottom: 1px solid ${colors.darkGrey};
  &:last-child {
    border-bottom: 0;
    margin-bottom: 0;
    padding-bottom: 0;
  }
  a {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    img {
      width: 3.5em;
      height: 3.5em;
      border-radius: 50%;
      border: 1px solid ${colors.darkGrey};
      object-fit: cover;
    }
    .info {
      width: 78%;
      color: ${colors.purple};
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: flex-start;
      .text {
        .name {
          font-family: "Baloo Bhaina";
          line-height: 1em;
          text-transform: capitalize;
        }
        .content {
          font-weight: 100;
          font-size: .8em;
          margin-bottom: 0;
        }
      }
      .hour {
        font-weight: 100;
        font-size: .7em;
        opacity: .5;
      }
    }
  }
`;

export const ConverThumb = (props) => {
  const { link, img, name, content, hour } = props;
  return (
    <StyledThumb>
      <Link to={link}>
        <img src={img} alt={name} />
        <div className="info">
          <div className="text">
            <p className="name">{name}</p>
            <p className="content">{truncate(content, { length: 75 })}</p>
          </div>
          <p className="hour">{getTime(new Date(hour))}</p>
        </div>
      </Link>
    </StyledThumb>
  );
};
