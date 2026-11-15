import React from 'react';

export interface MaterialIconProps {
  name: string;
  className?: string;
  style?: React.CSSProperties;
  filled?: boolean;
}

/**
 * Google Material Symbols / Material Icons component
 * Usage: <MaterialIcon name="content_copy" className="text-amber-500" />
 */
export const MaterialIcon: React.FC<MaterialIconProps> = ({
  name,
  className = '',
  style,
  filled = false,
}) => {
  return (
    <span
      className={`material-symbols-outlined select-none align-middle inline-flex items-center justify-center ${className}`}
      style={{
        fontVariationSettings: filled ? "'FILL' 1, 'wght' 500, 'GRAD' 0, 'opsz' 24" : "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
        ...style,
      }}
      aria-hidden="true"
    >
      {name}
    </span>
  );
};
