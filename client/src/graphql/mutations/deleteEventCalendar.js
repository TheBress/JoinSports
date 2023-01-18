import {gql} from "@apollo/client"


export const DELETE_EVENT_CALENDAR=gql`
mutation deleteEventCalendar($id:ID!) {
    deleteEventsCalendar(input:{ where:{id:$id}}) {
           eventsCalendar{
               title
           }
    }
}
`