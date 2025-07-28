/*  
The estimated energy can be calculated using some simple assumptions:
-   The consumed energy depends only on the mass of the rocket that was used for
    the launch + the mass of the fuel
-   It costs about 15 kg of fuel bring 1 kg of mass to the Lower Earth Orbit
-   The fuel has an energetic value of 1.35\*10^7 Joules / kg

*/

export function getEstimatedRocketEnergyUsage(rocketMassInKilograms: number) {
    //It costs about 15 kg of fuel bring 1 kg of mass to the Lower Earth Orbit
    const fuelPerKilogram = 15;
    //The fuel has an energetic value of 1.35\*10^7 Joules / kg of fuel
    const energyValuePerKilogram = 1.35e7;

    const totalFuelAmount = rocketMassInKilograms * fuelPerKilogram;
    return totalFuelAmount * energyValuePerKilogram;
}
