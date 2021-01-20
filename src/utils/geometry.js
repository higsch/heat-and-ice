export const polarToCartesian = (centerX, centerY, radius, angle) => {
  return {
    x: centerX + (radius * Math.cos(angle)),
    y: centerY + (radius * Math.sin(angle))
  };
};
