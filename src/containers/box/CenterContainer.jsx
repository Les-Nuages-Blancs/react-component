import React from "react";

const CenterContainer = ({
    // children
    children,
    // style
    style,
    // other props
    ...content
}) => {
    
    return (
        <div
        className="centerContainerWrap"
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                flexGrow: 1
            }}
        >
            <div
                className="centerContainer"
                style={{
                    margin: "auto",
                    textAlign: "center",
                    ...style
                }}
                {...content}
            >
                {children}
            </div>
        </div>
    )
}

export default CenterContainer;