import { useState } from "react";
import type { Launch } from "../../__generated__/graphql";
import { getEstimatedRocketEnergyUsage } from "../../utils";

type LaunchItemProps = {
    launch: Launch;
    selectedIds: string[];
    handleCheck: (id: string) => void;
};

export function LaunchItem({
    launch,
    selectedIds,
    handleCheck,
}: LaunchItemProps) {
    const [showDetails, setShowDetails] = useState(false);
    const {
        rocket,
        id,
        launch_date_utc,
        mission_name,
        launch_success,
        launch_year,
        launch_site,
    } = launch;
    const rocketMass = launch?.rocket?.rocket?.mass?.kg;
    const rocketName = rocket?.rocket_name;
    const cleanDate = new Date(launch_date_utc).toDateString();
    const launchSite = launch_site?.site_name;

    const isSelected = selectedIds.includes(id!);
    const estimatedEnergyUsage = getEstimatedRocketEnergyUsage(rocketMass!);

    //click checkbox to track stats
    // click item to show more data

    return (
        <div
            className={`launch-grid__launch-item ${
                isSelected ? "--selected" : ""
            }`}
            onClick={(e) => {
                setShowDetails(!showDetails);
            }}
        >
            <div className="launch-name">
                <span>
                    <strong>Mission:</strong> {mission_name}
                </span>
                <div className="tracking-input">
                    <input
                        type="checkbox"
                        onClick={(e) => e.stopPropagation()}
                        name="tracking"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            e.stopPropagation();
                            handleCheck(id!);
                        }}
                    />
                </div>
            </div>

            <div
                className={`additional-launch-data ${
                    showDetails ? "show-data" : ""
                }`}
            >
                <span>
                    <strong>Rocket: </strong>
                    {rocketName}
                </span>
                {launch_year ? (
                    <span>
                        <strong>Date:</strong> {cleanDate}
                    </span>
                ) : null}
                <span>
                    <strong>Status:</strong>
                    {launch_success ? "Success" : "Failure"}
                </span>

                {launchSite ? (
                    <span>
                        <strong>Location:</strong> {launchSite}
                    </span>
                ) : null}
                {rocketMass ? (
                    <span>
                        <strong>Mass:</strong> {rocketMass} kg
                    </span>
                ) : null}

                <span>
                    <strong>Consumption:</strong>
                    {(estimatedEnergyUsage / 1000000000).toFixed(0)} GJ
                </span>
            </div>
        </div>
    );
}
