import { gql } from "./__generated__/gql";

export const GET_LAUNCHES = gql(`
query GetLaunches {
  launchesPast(limit:10){
    mission_name
    launch_date_utc
    rocket{
        rocket_name
        rocket{
            mass {
              kg
            }
        }
    }
  }
}
    `);
