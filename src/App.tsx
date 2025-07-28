import "./App.css";
import { useQuery } from "@apollo/client";
import { useState, useEffect, useCallback, useMemo } from "react";
import { LaunchGrid } from "./components/launch-grid/LaunchGrid";
import { GET_LAUNCHES } from "./queries";

function App() {
    const { loading, data: launchesData, error } = useQuery(GET_LAUNCHES);
    const launches = (launchesData?.launchesPast ?? []).filter(
        (l): l is NonNullable<typeof l> => l !== null
    );
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading data</p>;

    return <>{launches?.length ? <LaunchGrid launches={launches} /> : null}</>;
}

export default App;
