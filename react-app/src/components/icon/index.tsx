import type { CSSProperties, FC } from 'react'

interface IconProps {
  name: string
  size?: number | string
  color?: string
  className?: string
  style?: CSSProperties
}

export const Icon: FC<IconProps> = ({
  name,
  size = 24,
  color = 'currentColor',
  className = '',
  style,
}) => {
  const iconSrc = `/icons/icon_${name}.svg`

  const iconStyle: CSSProperties = {
    width: size,
    height: size,
    color,
    ...style,
  }

  return (
    <img
      src={iconSrc}
      alt={name}
      className={`icon ${className}`}
      style={iconStyle}
      draggable={false}
    />
  )
}
