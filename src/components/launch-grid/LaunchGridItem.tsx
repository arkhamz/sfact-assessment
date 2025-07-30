import { useState } from "react";
import type { Launch } from "../../__generated__/graphql";
import { getEstimatedRocketEnergyUsageInGj } from "../../utils";
import {
    Card,
    CardContent,
    CardHeader,
    Checkbox,
    Typography,
} from "@mui/material";

type LaunchItemProps = {
    launch: Launch;
    selectedIds: string[];
    handleCheck: (id: string) => void;
};

export function LaunchGridItem({
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
    const estimatedEnergyUsage = getEstimatedRocketEnergyUsageInGj(launch);

    return (
        <Card
            sx={{
                cursor: "pointer",
                backgroundColor: isSelected ? "#e3f2fd" : "white",
                border: isSelected ? "2px solid orange" : "1px solid white",
            }}
            onClick={() => setShowDetails(!showDetails)}
        >
            <CardHeader
                title={
                    <Typography color="text.primary" variant="h6">
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
                    <Typography color="text.primary">
                        <strong>Rocket:</strong> {rocketName}
                    </Typography>
                    {launch_year && (
                        <Typography color="text.primary">
                            <strong>Date:</strong> {cleanDate}
                        </Typography>
                    )}
                    <Typography color="text.primary">
                        <strong>Status:</strong>{" "}
                        {launch_success ? "Success" : "Failure"}
                    </Typography>
                    {rocketMass && (
                        <Typography color="text.primary">
                            <strong>Mass:</strong> {rocketMass} kg
                        </Typography>
                    )}
                    <Typography color="text.primary">
                        <strong>Consumption:</strong> {estimatedEnergyUsage} GJ
                    </Typography>
                </CardContent>
            )}
        </Card>
    );
}
