import type { Launch } from "../../__generated__/graphql";
import "./LaunchGrid.css";

type LaunchGridProps = {
    launches: Launch[];
};

export function LaunchGrid({ launches }: LaunchGridProps) {
    console.log(launches);
    return (
        <section className="launch-grid__outer-wrapper outer-wrapper">
            <div className="launch-grid__inner-wrapper inner-wrapper">
                <div className="launch-grid__launch-items">
                    {launches.length
                        ? launches.map(function (
                              launchItem: Launch,
                              i: number
                          ) {
                              const {
                                  rocket,
                                  launch_date_utc,
                                  mission_name,
                                  launch_success,
                                  launch_site,
                              } = launchItem;
                              const rocketMass =
                                  launchItem?.rocket?.rocket?.mass?.kg;
                              const rocketName = rocket?.rocket_name;
                              const cleanDate = new Date(
                                  launch_date_utc
                              ).toDateString();
                              const launchSite = launch_site?.site_name;

                              return (
                                  <div
                                      key={i}
                                      className="launch-grid__launch-item"
                                  >
                                      <span>
                                          <strong>Mission:</strong>{" "}
                                          {mission_name}
                                      </span>
                                      <span>
                                          <strong>Rocket: </strong>
                                          {rocketName}
                                      </span>
                                      <span>
                                          <strong>Date:</strong> {cleanDate}
                                      </span>
                                      <span>
                                          <strong>Status:</strong>
                                          {launch_success
                                              ? "Success"
                                              : "Failure"}
                                      </span>

                                      {launchSite ? (
                                          <span>
                                              <strong>Location:</strong>{" "}
                                              {launchSite}
                                          </span>
                                      ) : null}
                                      {rocketMass ? (
                                          <span>
                                              <strong>Mass:</strong>{" "}
                                              {rocketMass} kg
                                          </span>
                                      ) : null}
                                  </div>
                              );
                          })
                        : null}
                </div>
            </div>
        </section>
    );
}
