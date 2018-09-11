import React from 'react';
import { Link } from 'react-router-dom'
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
class SingleAppointment extends React.Component {
   constructor(props) {
    super(props);
    this.props = props;
  }
  render() {
    const FEED_QUERY = gql`
      {
          appointment(id: "${this.props.match.params.reservationId}") {
             id
             name
             symptom
             appointmentDate
          
          }
      }
    `;
    return (
       <Query query={FEED_QUERY}>
        {({ loading, error, data,refetch }) => {
          if (loading) return <div>Fetching</div>
          if (error) return <div>Error</div>
    
          refetch();
          return (
            <div style={{'margin':'20px'}} >
              <div style={{'margin':'20px'}}>Patient Name for {data.appointment.name}
                <br/>
                Patient Symptom:{data.appointment.symptom}
                <br/>
                arrival date:{data.appointment.appointmentDate}
                <br/><br/>
                <hr/>
              </div>
            </div>
          )
        }}
      </Query>
    );
  }
}
export default SingleAppointment;