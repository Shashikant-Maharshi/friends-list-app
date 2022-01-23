import Icons from "../Icons/Icons";
import Button from "../Button/Button";

import './text-input.scss';

const TextInput = ({
  className,
  onChange,
  onClear,
  onSubmit,
  placeholder,
  value,
  hint,
  ...props
}) => {
  const handleEvent = (event) => {
    if (event.key === 'Enter' || event.key === 'NumpadEnter') {
      onSubmit();
    } else if (event.key === 'Escape') {
      onClear();
    } else {
      onChange(event.target.value);
    }
  };

  return (
    <div className='flex flex-col'>
      <div className="flex flex-row flex-y-center">
        <input
          className={className}
          type="text"
          placeholder={placeholder}
          onKeyDown={handleEvent}
          onChange={handleEvent}
          autoComplete="off"
          value={value}
          {...props}
        />
        {value && (
          <Button
            className='clear-button'
            onClick={onClear}
            label='Clear'
            icon={<Icons type='cross' />}
            hasText={false}
          />
        )}
      </div>
      {hint.message && (
        <span className={`input-hint is-${hint.type}`}>
          {hint.message}
        </span>
      )}
    </div>
  );
};

export default TextInput;
