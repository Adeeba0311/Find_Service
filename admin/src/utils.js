export const getColorCodeForStatus = (status) => {
    switch (status) {
        case "Accepted":
            return "dodgerblue";
        case "Rejected":
            return "#ff0000";
        case "Update Required":
            return "yellow";
        case "Completed":
            return "forestgreen";
        default:
            return "lightgrey";
    }
}


