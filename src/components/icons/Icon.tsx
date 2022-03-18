import iconMap from "assets/icons/icon-map";
import { hexToCSSFilter } from "hex-to-css-filter";
import { memo } from "react";

export interface IconProps {
  name: string;
  width?: string | number;
  height?: string | number;
  color?: string;
  primary?: boolean;
}

export const Icon: React.FC<IconProps> = memo((props) => {
  const { name, width = 32, height = width, color, primary, ...rest } = props;

  const iconColor = color ?? primary ? "#8E2DE2" : "#ffffff";
  const cssFilter = hexToCSSFilter(iconColor, {
    acceptanceLossPercentage: 1,
    maxChecks: 10,
  });

  const cssFilterValue = cssFilter.filter.replace(";", "");

  // @ts-expect-error: Use name to index icon array
  const IconG = iconMap[name];
  return <IconG style={{ width, height, filter: cssFilterValue }} {...rest} />;
});
