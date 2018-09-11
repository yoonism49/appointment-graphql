const _ = require('lodash');

const Appointments = require('../data/appointments');

import {
  GraphQLID,
  GraphQLInt,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull
} from 'graphql';
import { GraphQLDateTime } from 'graphql-iso-date';

var uuid = require('uuid');

const AppointmentsType = new GraphQLObjectType({
  name: "Appointment",
  description: "This is a Appointment",
  fields: () => ({
    id: {type: GraphQLString},
    name: {type: GraphQLString},
    symptom: {type: GraphQLString},
    appointmentDate: {type: GraphQLString}
  })
});

// This is the Root Query
const AppointmentsQueryRootType = new GraphQLObjectType({
  name: 'AppointmentsSchema',
  description: "Appointments Schema Query Root",
  fields: () => ({
    appointments: {
      type: new GraphQLList(AppointmentsType),
      description: "List of all Appointments",
      resolve: function() {
        return Appointments
      }
    },
    appointment: {
      type: AppointmentsType,
      args:{
        id:{type:GraphQLString}
      },
      resolve(parentValue, args) {
          for(let i=0; i<Appointments.length; i++) {
              if(Appointments[i].id == args.id) {
                  return Appointments[i];
              }
          }
      }
    }
  })
});

// Mutations
const AppointmentsMutations = new GraphQLObjectType({
  name: 'AppointmentsMutations',
  fields: () => ({
    addAppointment: {
      type: new GraphQLNonNull(AppointmentsType),
      description: "Add a new Appointments",
      args: {
        id:{type: GraphQLString},
        name: {type: GraphQLString},
        symptom: {type: GraphQLString},
        appointmentDate: {type: GraphQLString}
      },
      resolve(parent, {id,name,symptom,appointmentDate}) {
        if(Appointments.length >= 20) {
          Appointments.splice(2, 1);
        }
        const checkDate = obj => obj.appointmentDate === appointmentDate;
        if(!Appointments.some(checkDate)){
          Appointments.push({id,name,symptom,appointmentDate});
        }
        return id;
      }
    }
  })
});

// Schema
const AppointmentsSchema = new GraphQLSchema({
  name: "Appointments",
  query: AppointmentsQueryRootType,
  mutation: AppointmentsMutations
});
export default AppointmentsSchema;