import { gql } from "./__generated__/gql";

export const GET_LAUNCHES = gql(`
query GetLaunches {
  launchesPast(limit:10){
    id
    mission_name
    launch_date_utc
    launch_success
    launch_site {
      site_name
    }
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
