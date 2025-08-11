import { formatDate } from "@/utils/formatting";

interface ICustomInputProps {
    value?: string | number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    type?: string;
    required?: boolean;
    className?: string;
}

export const CustomInput = ({
    value,
    onChange,
    placeholder,
    type = "text",
    required,
    className
}: ICustomInputProps) => {
    const getTypeStyles = () => {
        switch (type) {
            case "text":
            default:
                return {
                    typeInput: "text",
                    style: "text-white text-2xl font-medium px-[20px] py-[21px]"
                };
            case "currency":
                return {
                    typeInput: "number",
                    style: "text-white text-2xl font-medium px-[20px] py-[21px]"
                };
            case "date":
                return {
                    typeInput: "date",
                    style: "text-white text-2xl font-medium px-[20px] py-[21px]",
                    value: formatDate(value as string)
                };
            case "time":
                return {
                    typeInput: "time",
                    style: "text-white text-2xl font-medium px-[20px] py-[21px]"
                };
        }
    };

    return (
        <input
            className={`${className} w-full h-[71px] placeholder:text-[#B9B9B9] rounded-[15px] bg-[#333333] outline-none ${getTypeStyles().style}`}
            placeholder={placeholder}
            required={required}
            type={getTypeStyles().typeInput}
            value={getTypeStyles().value || value}
            onChange={onChange}
        />
    );
};