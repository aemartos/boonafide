import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { setBusy } from '../lib/redux/actions';
import styled from '@emotion/styled';
import { colors } from '../lib/common/colors';
import { TicketsAPI } from '../lib/API/tickets';
import TicketThumb from '../components/TicketThumb';


const ContentBox = styled.div`
  width: 90%;
  margin: 0 auto;
  padding: 1em 0 6em;
  .tickets {
    /* height: 22em; */
    /* overflow-y: auto; */
    .offer, .need {
      .noTickets {
        font-family: "Baloo Bhaina";
        font-size: 1.3em;
        line-height: 1.2em;
        color: ${colors.midPurple};
        padding: 1em;
        text-align: center;
      }
    }
  }
`;

class _TicketsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tickets: [],
      switchFav: "Offer"
    }
  }

  componentWillMount(){
    this.props.dispatch(setBusy(true));
  }

  componentDidMount() {
    TicketsAPI.getAllTickets().then(tickets => {
      this.props.dispatch(setBusy(false));
      this.setState({tickets});
    }).catch(e => this.props.history.push('/not-found'));
  }

  render() {
    const {tickets} = this.state;
    return (
      <div className="contentBox">
        <div className="container">
          <ContentBox>
            <div className="tickets">
                <div className="offer">
                  {tickets.length > 0 ?
                    tickets.map(t => <TicketThumb key={t._id} ticketId={t._id} img={t.favorId.picturesUrls[0]} name={t.favorId.name} location={t.favorId.location.coordinates} date={t.favorId.date} validated={t.validated} />)
                    : <p className="noTickets">You have no tickets, you need to accept others needs to get a ticket</p>
                  }
                </div>
            </div>
          </ContentBox>
      </div>
    </div>
    );
  }
}

export const TicketsPage = withRouter(_TicketsPage);
