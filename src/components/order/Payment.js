import React from "react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { initPayment } from "../../api/apiOrder";
import { userInfo } from "../../utils/auth";
import { Button, Typography } from "@mui/material";

const Payment = () => {
    const { discount } = useParams();
    const [sessionSuccess, setSessionSuccess] = useState(false);
    const [failed, setFailed] = useState(false);
    const [redirectUrl, setRedirectUrl] = useState("");

    useEffect(() => {
        initPayment(userInfo().token, discount)
            .then((response) => {
                if (response.data.status === "SUCCESS") {
                    setSessionSuccess(true);
                    setRedirectUrl(response.data.GatewayPageURL);
                    setFailed(false);
                }
            })
            .catch((err) => {
                console.log(err);
                setFailed(true);
                setSessionSuccess(false);
            });
    }, []);

    return (
        <div>
            {sessionSuccess
                ? (window.location = redirectUrl)
                : "Payment is processing..."}
            {failed ? (
                <>
                    <Typography variant="h3">
                        Failed to start payment session!!
                    </Typography>
                    <Link to={"/cart"}>
                        <Button variant="contained" color="error">
                            Go to cart
                        </Button>
                    </Link>
                </>
            ) : (
                ""
            )}
        </div>
    );
};

export default Payment;
