import type { Launch } from "../../__generated__/graphql";
import "./LaunchGrid.css";
import { LaunchGridItem } from "./LaunchGridItem";

type LaunchGridProps = {
    launches: Launch[];
    selectedIds: string[];
    handleCheck: (id: string) => void;
};

export function LaunchGrid({
    launches,
    selectedIds,
    handleCheck,
}: LaunchGridProps) {
    return (
        <section className="launch-grid__outer-wrapper outer-wrapper">
            <div className="launch-grid__inner-wrapper inner-wrapper">
                <div className="launch-grid__launch-items">
                    {launches.length
                        ? launches.map(function (launchItem: Launch) {
                              return (
                                  <LaunchGridItem
                                      key={launchItem.id!}
                                      handleCheck={handleCheck}
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
