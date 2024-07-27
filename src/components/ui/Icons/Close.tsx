import { SVGProps } from 'react'

const Close = ({
  width = '24',
  color = 'currentColor',
  ...props
}: SVGProps<SVGSVGElement> & { color?: string }) => {
  const height = ((Number(width) * 24) / 24).toString()

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', borderRadius: '4px' }}
    >
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5" />
      <path
        d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default Close
