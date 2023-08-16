import React, { ReactNode, useState } from "react";

type TooltipProps = {
  text: string;
  position?: "top" | "bottom" | "left" | "right";
  children: ReactNode;
};

const Tooltip: React.FC<TooltipProps> = ({
  text,
  position = "top",
  children,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const tooltipStyles = "bg-gray-100 text-primary-500 p-2 rounded ";

  const getTooltipPositionStyles = () => {
    switch (position) {
      case "top":
        return "bottom-full left-full transform -translate-x-1/2";
      case "bottom":
        return "top-full left-1/2 transform -translate-x-1/2";
      case "left":
        return "top-1/2 right-full transform translate-y-1/2";
      case "right":
        return "top-1/2 left-full transform -translate-y-1/2";
      default:
        return "bottom-full left-1/2 transform -translate-x-1/2";
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="relative inline-block">
      <div
        className="inline-flex items-center justify-center cursor-pointer z-50"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </div>
      {isHovered && (
        <div
          className={`absolute z-50 ${getTooltipPositionStyles()} ${tooltipStyles} `}
        >
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
