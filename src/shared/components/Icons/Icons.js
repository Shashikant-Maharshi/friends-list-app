import Cross from "./Cross";
import Star from "./Star";
import Trash from "./Trash";

const iconMapping = {
  cross: <Cross />,
  star: <Star />,
  trash: <Trash />,
};

const Icons = ({ type, isSolid }) => {
  const svgSettings = {
    fill: "none",
    stroke: "currentColor",
  }

  if (isSolid) {
    svgSettings.fill = 'currentColor';
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      viewBox="0 0 24 24"
      width={16}
      height={16}
      {...svgSettings}
    >
      {iconMapping[type]}
    </svg>
  );
};

export default Icons;
