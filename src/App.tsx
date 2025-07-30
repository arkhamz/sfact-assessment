import { useQuery } from "@apollo/client";
import { useState } from "react";
import { LaunchGrid } from "./components/launch-grid/LaunchGrid";
import { GET_LAUNCHES } from "./queries";
import { EnergyModal } from "./components/data-viewer/EnergyModal";

function App() {
    const { loading, data: launchesData, error } = useQuery(GET_LAUNCHES);
    const launches = (launchesData?.launchesPast ?? []).filter(
        (l): l is NonNullable<typeof l> => l !== null
    );

    const [selectedIds, setSelectedIds] = useState<string[]>([]); //selected launch item ids

    const selectedLaunches = launches?.length
        ? launches.filter((l) => selectedIds?.includes(l.id!))
        : [];

    function handleCheck(id: string) {
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
        <div className="app-wrapper">
            {launches?.length ? (
                <>
                    <LaunchGrid
                        handleCheck={handleCheck}
                        selectedIds={selectedIds}
                        launches={launches}
                    />
                    {selectedIds?.length ? (
                        <EnergyModal launches={selectedLaunches} />
                    ) : null}
                </>
            ) : null}
        </div>
    );
}

export default App;
