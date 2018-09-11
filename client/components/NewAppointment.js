import React from 'react';
import { Link } from 'react-router-dom'
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import DateTimeField from "react-bootstrap-datetimepicker";
import InputMoment from 'input-moment';
import uuid from 'uuid';
import moment from 'moment';
import '../less/app.less';
import '../less/input-moment.less';
class NewAppointment extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {Name: '', Symptom:'', appointmentDate:moment(),reserved: false};

  }

  handleSubmit(e) {
    e.preventDefault();
    //this.props.onFormSubmit(this.state.name);
    this.setState({name: ''});
         console.log('aDate'+evt.target.name);
    if(evt.target.name==='appointmentDate') {
      let aDate=new Date(evt.target.value);
      console.log('aDate'+aDate);
    }
    React.findDOMNode(this.refs.name).focus();
    return;
  }

  onChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }
  handleArrivalChange(newDate) {
    return this.setState({appointmentDate: newDate});
  }
 
  render() {
    return (

      <Mutation
    mutation={gql`
      mutation addAppointment($id: String!,$name: String!, $symptom: String!, $appointmentDate: String!){

        addAppointment(id: $id, name: $name,symptom: $symptom,appointmentDate: $appointmentDate) 
        {
          id
          name
          symptom
          appointmentDate
        }
      }
    `}
  >
    {(addAppointment, { loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) {console.log(error);return <p>Error :(</p>};
      let name;
      const nid=uuid.v1();
      const {appointmentDate} = this.state;
      return (
        
        <form  onSubmit={e => {
          e.preventDefault();
          if(this.state.appointmentDate.isBefore(moment(new Date()))) {
            alert("Pleaes choose a date after today's date!");
            this.setState({item: '', reserved:false});
            return 'failed';
          }
          addAppointment({ variables: {
            id:nid, name: this.state.Name , symptom:this.state.Symptom, appointmentDate: this.state.appointmentDate.toString()
          }});
          this.setState({item: '', reserved:true});
          return 'true';
        }}>
        <br/>
          <br/>
         <div style={{display:this.state.reserved?'none':'block'}} >  
         <h4>Patient Name</h4>  <input 
          type='text' 
          ref='Name'
          name='Name' 
          onChange={this.onChange.bind(this)} 
          value={this.state.Name}
          />
         <h4>Symptom</h4> <input 
          type='text' 
          ref='Symptom' 
          name='Symptom' 
          onChange={this.onChange.bind(this)} 
          value={this.state.Symptom}
          />
        
         <h4>Arrival Date</h4>
         <input type="text" value={this.state.appointmentDate.format('MM-DD-YYYY HH:mm:ss')} readOnly /><br/>
           <InputMoment
           name='appointmentDate'
           ref='appointmentDate'
          moment={this.state.appointmentDate}
          onChange={this.handleArrivalChange.bind(this)}
          onSave={this.handleSave}
          minStep={1} // default
          hourStep={1} // default
          prevMonthIcon="ion-ios-arrow-left" // default
          nextMonthIcon="ion-ios-arrow-right" // default
        />
        
        </div>
          <br/>
          <br/>
          <input type='submit' value='Reserve'
          style={{display:this.state.reserved?'none':'block'}} />
          <div style={{display:this.state.reserved?'block':'none', marginTop:'20px'}}>
          Your reservation is made!</div>
        </form>
      );
    }}
  </Mutation>
    );
  }
}  
export default NewAppointment;