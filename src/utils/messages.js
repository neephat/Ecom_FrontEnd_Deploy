import { Alert } from "@mui/material";

export const showError = (error, msg) => {
    if (error)
        return (
            <div className="">
                <Alert severity="error">{msg}</Alert>
            </div>
        );
};

export const showSuccess = (success, msg) => {
    if (success)
        return (
            <div className="">
                {" "}
                <Alert severity="success">{msg}</Alert>
            </div>
        );
};

export const showLoading = (loading) => {
    if (loading)
        return (
            <div>
                <Alert severity="info">Loading....</Alert>
            </div>
        );
};
