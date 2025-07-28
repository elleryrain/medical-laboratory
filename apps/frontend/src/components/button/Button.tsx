import Plus from "@svg/plus.svg?react";
import React from "react";

interface IButtonProps {
    title: string;
    theme?: string;
    onClick?: () => void;
    className?: string;
    children?: React.ReactNode;
}

export const Button = (props: IButtonProps) => {
    const getThemeStyles = () => {
        const baseStyles = {
            showIcon: true,
            text: {
                color: "#000000",
                fontWeight: "500",
            },
            button: {
                backgroundColor: "#FFFFFF",
                padding: "13px 30px",
                gap: "20px",
            },
            icon: {
                plusBackground: "#DCDCDC",
                plusFill: "#000000",
                plusStroke: "#000000",
            },
        };

        switch (props.theme) {
            case "salaryNotPaid":
                return {
                    ...baseStyles,
                    showIcon: false,
                    text: {
                        color: "black",
                        fontWeight: "500",
                    },
                    button: {
                        backgroundColor: "#BDFF67",
                        padding: "13px 30px",
                    },
                };
            case "salaryPaid":
                return {
                    ...baseStyles,
                    showIcon: false,
                    text: {
                        color: "#BDFF67",
                        fontWeight: "400",
                    },
                    button: {
                        backgroundColor: "transparent",
                        border: "2px solid #BDFF67",
                        padding: "13px 30px",
                    },
                };
            case "addButton":
                return {
                    ...baseStyles,
                    showIcon: true,
                    text: {
                        color: "#000000",
                        fontSize: "24px",
                        fontWeight: "500",
                    },
                    button: {
                        backgroundColor: "#FFFFFF",
                        gap: "20px",
                        padding: "10px 20px 10px 10px",
                    },
                    icon: {
                        plusBackground: "#DCDCDC",
                        plusFill: "#000000",
                        plusStroke: "#000000",
                    },
                };
            case "lineButton":
                return {
                    ...baseStyles,
                    showIcon: true,
                    text: {
                        color: "#FFFFFF",
                        fontWeight: "500",
                    },
                    button: {
                        backgroundColor: "transparent",
                        border: "2px dashed #d2d2d2",
                        padding: "0",
                    },
                    icon: {
                        plusFill: "white",
                        plusStroke: "white",
                    }
                };
            case "default":
            default:
                return baseStyles;
        }
    };

    const themeStyles = getThemeStyles();

    return (
        <div
            className={`flex items-center justify-center cursor-pointer w-fit ${props.className || ""}`}
            style={{
                ...themeStyles.button,
                transition: "all 0.3s ease",
            }}
            onClick={props.onClick}
        >
            {themeStyles.showIcon && (
                <div
                    className="flex items-center justify-center p-[9px] rounded-full"
                    style={{
                        backgroundColor: themeStyles.icon?.plusBackground,
                        transition: "all 0.3s ease",
                    }}
                >
                    <Plus
                        className="w-[32px] h-[32px] bg-transparent"
                        style={{
                            fill: themeStyles.icon?.plusFill,
                            stroke: themeStyles.icon?.plusStroke,
                            transition: "all 0.3s ease",
                        }}
                    />
                </div>
            )}
            <div className="flex items-center gap-2">
                {props.children && <div>{props.children}</div>}
                <h1
                    className="text-2xl"
                    style={{
                        ...themeStyles.text,
                        transition: "all 0.3s ease",
                    }}
                >
                    {props.title}
                </h1>
            </div>
        </div>
    );
};