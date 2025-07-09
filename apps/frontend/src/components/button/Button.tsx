import Plus from "@img/plus.svg?react";

interface IButtonProps {
    title: string;
    theme?: string;
    onClick?: () => void;
    leftIcon?: string;
    rightIcon?: string;
    className?: string;
}

export const Button = (props: IButtonProps) => {
    const getThemeStyles = () => {
        const baseStyles = {
            showIcon: true,
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
                        padding: "13px 30px 13px 30px",
                    },
                    icon: {},
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
                        padding: "13px 30px 13px 30px",
                    },
                    icon: {},
                };
            case "addButton":
                return {
                    ...baseStyles,
                    text: {
                        color: "#000000",
                        fontSize: "24px",
                        fontWeight: "500",
                    },
                    button: {
                        backgroundColor: "#FFFFFF",
                        gap: "20px",
                        padding: "10px 20px 10px 10px"
                    },
                    icon: {
                        plusBackground: "#DCDCDC",
                        plusFill: "#000000",
                        plusStroke: "#000000",
                    },
                };
            case "default":
            default:
                return {
                    ...baseStyles,
                    text: {
                        color: "#000000",
                    },
                    button: {
                        backgroundColor: "#FFFFFF",
                    },
                    icon: {
                        plusBackground: "#DCDCDC",
                        plusFill: "#000000",
                        plusStroke: "#000000",
                    },
                };
        }
    };

    const themeStyles = getThemeStyles();
    const hasCustomIcon = props.leftIcon || props.rightIcon;
    const showDefaultIcon = themeStyles.showIcon && !hasCustomIcon;

    return (
        <div
            className={`flex items-center justify-center rounded-full cursor-pointer h-full w-fit ${props.className || ""}`}
            style={{
                ...themeStyles.button,
                transition: "all 0.3s ease",
            }}
            onClick={props.onClick}
        >
            {props.leftIcon && (
                <img
                    src={props.leftIcon}
                    alt="Left icon"
                    className="w-[32px] h-[32px] rounded-full"
                    style={{ transition: "all 0.3s ease" }}
                />
            )}
            {showDefaultIcon && (
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
            <h1
                className="text-2xl"
                style={{
                    ...themeStyles.text,
                    transition: "all 0.3s ease",
                }}
            >
                {props.title}
            </h1>
            {props.rightIcon && (
                <img
                    src={props.rightIcon}
                    alt="Right icon"
                    className="w-[32px] h-[32px] rounded-full"
                    style={{ transition: "all 0.3s ease" }}
                />
            )}
        </div>
    );
};