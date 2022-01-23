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
    type="button"
    onClick={onClick}
    data-has-boarder={hasBorder}
    {...props}
  >
    {icon}
    {hasText && label}
  </button>
);

export default Button;
