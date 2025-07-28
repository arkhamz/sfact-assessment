import type { Launch } from "../../__generated__/graphql";
import { getEstimatedRocketEnergyUsage } from "../../utils";
import "./LaunchGrid.css";
import { LaunchItem } from "./LaunchItem";

type LaunchGridProps = {
    launches: Launch[];
    selectedIds: string[];
    handleClick: (id: string) => void;
};

export function LaunchGrid({
    launches,
    selectedIds,
    handleClick,
}: LaunchGridProps) {
    return (
        <section className="launch-grid__outer-wrapper outer-wrapper">
            <div className="launch-grid__inner-wrapper inner-wrapper">
                <div className="launch-grid__launch-items">
                    {launches.length
                        ? launches.map(function (
                              launchItem: Launch,
                              i: number
                          ) {
                              return (
                                  <LaunchItem
                                      key={launchItem.id!}
                                      handleClick={handleClick}
                                      launch={launchItem}
                                      selectedIds={selectedIds}
                                  />
                              );
                          })
                        : null}
                </div>
            </div>
        </section>
    );
}
