"use client";
import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import "swagger-ui-react/swagger-ui.css";
import spec from "./openapi-spec.json";

const SwaggerUI = dynamic(() => import("swagger-ui-react"), {
    ssr: false,
    loading: () => (
        <div style={{ padding: "2rem", fontFamily: "sans-serif", textAlign: "center" }}>
            Loading API Documentation Playground...
        </div>
    ),
});

export default function SwaggerUiComponent() {
    useEffect(() => {
        const originalError = console.error;
        console.error = (...args) => {
            if (
                typeof args[0] === "string" &&
                args[0].includes("UNSAFE_componentWillReceiveProps")
            ) {
                return;
            }
            originalError(...args);
        };
        return () => {
            console.error = originalError; // restore on unmount
        };
    }, []);

    return <SwaggerUI spec={spec} />;
}