import { useState } from "react";
import type { Launch } from "../../__generated__/graphql";
import { getEstimatedRocketEnergyUsage } from "../../utils";
import {
    Card,
    CardContent,
    CardHeader,
    Checkbox,
    Typography,
    Box,
} from "@mui/material";

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
    } = launch;
    const rocketMass = rocket?.rocket?.mass?.kg;
    const rocketName = rocket?.rocket_name;

    const cleanDate = new Date(launch_date_utc).toDateString();

    const isSelected = selectedIds.includes(id!);
    const estimatedEnergyUsage = getEstimatedRocketEnergyUsage(launch);

    return (
        <Card
            sx={{
                cursor: "pointer",
                backgroundColor: isSelected ? "#e3f2fd" : "white",
                border: isSelected ? "2px solid orange" : "1px solid white",
            }}
        >
            <CardHeader
                title={
                    <Typography
                        sx={{
                            color: "black",
                        }}
                        variant="h6"
                    >
                        Mission: {mission_name}
                    </Typography>
                }
                action={
                    <Checkbox
                        checked={isSelected}
                        onClick={(e) => e.stopPropagation()}
                        onChange={() => handleCheck(id!)}
                        name="tracking"
                        color="primary"
                    />
                }
            />
            {showDetails && (
                <CardContent>
                    <Typography>
                        <strong>Rocket:</strong> {rocketName}
                    </Typography>
                    {launch_year && (
                        <Typography>
                            <strong>Date:</strong> {cleanDate}
                        </Typography>
                    )}
                    <Typography>
                        <strong>Status:</strong>{" "}
                        {launch_success ? "Success" : "Failure"}
                    </Typography>
                    {rocketMass && (
                        <Typography>
                            <strong>Mass:</strong> {rocketMass} kg
                        </Typography>
                    )}
                    <Typography>
                        <strong>Consumption:</strong>{" "}
                        {(estimatedEnergyUsage / 1_000_000_000).toFixed(0)} GJ
                    </Typography>
                </CardContent>
            )}
        </Card>
    );

    // return (
    //     <div
    //         className={`launch-grid__launch-item ${
    //             isSelected ? "--selected" : ""
    //         }`}
    //         onClick={(e) => {
    //             setShowDetails(!showDetails);
    //         }}
    //     >
    //         <div className="launch-name">
    //             <span>
    //                 <strong>Mission:</strong> {mission_name}
    //             </span>
    //             <div className="tracking-input">
    //                 <input
    //                     type="checkbox"
    //                     onClick={(e) => e.stopPropagation()}
    //                     name="tracking"
    //                     onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
    //                         e.stopPropagation();
    //                         handleCheck(id!);
    //                     }}
    //                 />
    //             </div>
    //         </div>

    //         <div
    //             className={`additional-launch-data ${
    //                 showDetails ? "show-data" : ""
    //             }`}
    //         >
    //             <span>
    //                 <strong>Rocket: </strong>
    //                 {rocketName}
    //             </span>
    //             {launch_year ? (
    //                 <span>
    //                     <strong>Date:</strong> {cleanDate}
    //                 </span>
    //             ) : null}
    //             <span>
    //                 <strong>Status:</strong>
    //                 {launch_success ? "Success" : "Failure"}
    //             </span>
    //             {rocketMass ? (
    //                 <span>
    //                     <strong>Mass:</strong> {rocketMass} kg
    //                 </span>
    //             ) : null}

    //             <span>
    //                 <strong>Consumption:</strong>
    //                 {estimatedEnergyUsage} GJ
    //             </span>
    //         </div>
    //     </div>
    // );
}
