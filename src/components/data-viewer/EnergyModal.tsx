import { useState } from "react";
import { Modal, Box, Button } from "@mui/material";
import { DataViewer } from "./DataViewer";
import type { Launch } from "../../__generated__/graphql";

export function EnergyModal({ launches }: { launches: Launch[] }) {
    const modalBoxStyle = {
        position: "absolute" as const,
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "80%",
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 4,
        borderRadius: "8px",
        maxHeight: "90vh",
        overflowY: "auto",
    };

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <Button
                className="energy-modal-button"
                onClick={handleOpen}
                sx={{
                    position: "fixed",
                    top: "16px",
                    backgroundColor: "orange",
                    color: "text.primary",
                    zIndex: 1300,
                }}
            >
                View energy usage
            </Button>
            <Modal open={open} onClose={handleClose}>
                <Box sx={modalBoxStyle}>
                    <DataViewer selectedLaunches={launches} />
                </Box>
            </Modal>
        </>
    );
}
