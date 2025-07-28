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

    //selected launch items by id
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    console.log(selectedIds);
    function handleClick(id: string) {
        //check if id exists in state
        const idExists = selectedIds?.length
            ? selectedIds.some((i) => i === id)
            : false;

        if (idExists) {
            const removed = selectedIds.filter((i) => i !== id);
            setSelectedIds(removed);
        } else {
            setSelectedIds([...selectedIds, id]);
        }
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading data</p>;

    return (
        <>
            {launches?.length ? (
                <LaunchGrid
                    handleClick={handleClick}
                    selectedIds={selectedIds}
                    launches={launches}
                />
            ) : null}
        </>
    );
}

export default App;
