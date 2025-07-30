import type { Launch } from "../../__generated__/graphql";
import { getEstimatedRocketEnergyUsageInGj } from "../../utils";
import "./DataViewer.css";
import ReactApexChart from "react-apexcharts";
import { Modal, Box, Button } from "@mui/material";

type SelectedLaunchesProps = {
    selectedLaunches: Launch[];
};

export function DataViewer({ selectedLaunches }: SelectedLaunchesProps) {
    const missionNames = selectedLaunches.map((l) => l?.mission_name);
    const energyUsageInGj = selectedLaunches.map((l) => {
        const energyUsageGj = getEstimatedRocketEnergyUsageInGj(l);
        return Number.parseInt(energyUsageGj.toFixed());
    });

    return (
        <section
            className={`data-viewer__outer-wrapper outer-wrapper ${
                selectedLaunches ? "show-data" : ""
            }`}
        >
            <div className="data-viewer__inner-wrapper inner-wrapper">
                <div className="data-viewer__chart-container">
                    <ReactApexChart
                        type="bar"
                        series={[
                            {
                                name: " (GJ)",
                                data: [...energyUsageInGj],
                            },
                        ]}
                        options={{
                            xaxis: {
                                categories: [...missionNames],
                                title: { text: "Mission" },
                            },
                            yaxis: {
                                title: { text: "Energy usage(Gj)" },
                            },
                            chart: { id: "energy-consumption-bar" },
                        }}
                        height="100%"
                        width="100%"
                    />
                </div>
            </div>
        </section>
    );
}
