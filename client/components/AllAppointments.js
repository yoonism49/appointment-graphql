import React from 'react';
import { Link } from 'react-router-dom'
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
class AllAppointments extends React.Component {
  render() {
    const FEED_QUERY = gql`
      {
        appointments{
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
    
          const appointmentsToRender = data.appointments
          refetch();
          return (
            <div style={{'margin':'20px'}} >
              {appointmentsToRender.map(this.createItem)}
            </div>
          )
        }}
      </Query>
    );
  }
  createItem(itemText, index) {
    return (
      <div key={index} style={{'margin':'20px'}}>{index+1}. Appointment for {itemText.name}
      <br/>
      <Link to={`/single/${itemText.id}`}>Click for Detail</Link>
      <br/><br/>
      <hr/>
      </div>
    );
  }
}
export default AllAppointments;