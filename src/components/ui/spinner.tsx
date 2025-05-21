import { MetroSpinner } from "react-spinners-kit";

export const Spinner = ({
    visibility = true,
    size = 20,
    color = "#0e7706"
}: {
    visibility?: boolean;
    size?: number;
    color?: string;
}) => {
    return <MetroSpinner size={size} color={color} loading={visibility} />;
};
