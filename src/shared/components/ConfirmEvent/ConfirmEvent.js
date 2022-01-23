import Button from "../Button/Button";

import "./confirm-event.scss";

const ConfirmEvent = ({
  children,
  show = false,
  title,
  onConfirm,
  onCancel,
}) => {
  const renderConfirmBox = () => (
    <div className="confirm-box | flex flex-row flex-x-spread flex-y-center">
      <h4 className="confirm-box--title">
        {`Are you sure you want to delete "${title}"?`}
      </h4>
      <div>
        <Button
          hasBorder
          onClick={onConfirm}
          label='Confirm'
        />
        <Button
          hasBorder
          onClick={onCancel}
          label='Cancel'
        />
      </div>
    </div>
  );

  return show ? renderConfirmBox() : children;
};

export default ConfirmEvent;
