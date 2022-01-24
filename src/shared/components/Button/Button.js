import './button.scss';

const Button = ({
  className,
  label,
  onClick,
  icon,
  hasText = true,
  hasBorder = false,
  ...props
}) => (
  <button
    className={className}
    data-has-boarder={hasBorder}
    name={label}
    aria-label={label}
    onClick={onClick}
    type="button"
    {...props}
  >
    {icon}
    {hasText && label}
  </button>
);

export default Button;
