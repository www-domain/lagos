import { RotatingLines } from "react-loader-spinner";
type props = {
    visible?: boolean;
    size?: string;
    color?: string;
}

const BtnLoader = ({ visible = true, size = "18", color = "#ffffff" }: props) => (
    <RotatingLines
        strokeColor={color}
        strokeWidth="5"
        animationDuration="0.75"
        width={size}
        visible={visible}
    />
)

export default BtnLoader