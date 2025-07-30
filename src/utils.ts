/*  
The estimated energy can be calculated using some simple assumptions:
-   The consumed energy depends only on the mass of the rocket that was used for
    the launch + the mass of the fuel
-   It costs about 15 kg of fuel bring 1 kg of mass to the Lower Earth Orbit
-   The fuel has an energetic value of 1.35\*10^7 Joules / kg

*/

import type { Launch } from "./__generated__/graphql";

export function getEstimatedRocketEnergyUsage(launch: Launch) {
    //It costs about 15 kg of fuel bring 1 kg of mass to the Lower Earth Orbit
    const fuelPerKilogram = 15;
    //The fuel has an energetic value of 1.35\*10^7 Joules / kg of fuel
    const energyValuePerKilogram = 1.35e7;

    const rocketMass = launch?.rocket?.rocket?.mass?.kg;
    const payloadWeights: number[] =
        launch?.rocket?.rocket?.payload_weights
            ?.map((i) => i?.kg)
            ?.filter((i): i is number => typeof i === "number") ?? [];

    const totalPayloadMass = payloadWeights.reduce(
        (sum, value) => sum + value,
        0
    );

    if (!rocketMass || !totalPayloadMass) {
        return 0;
    }

    const totalMass = rocketMass + totalPayloadMass;
    const totalFuelAmount = totalMass * fuelPerKilogram;
    const totalEnergyUsage = totalFuelAmount * energyValuePerKilogram;
    return Number.parseInt((totalEnergyUsage / 1000000000).toFixed(2));
}
