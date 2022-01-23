import Button from "../../shared/components/Button/Button";
import ACTION_TYPES from "../constants/action-types";

import Icons from "../../shared/components/Icons/Icons";

import "./friend-card.scss";

const FriendCard = ({ friend, onAction }) => (
  <div className="friend-card">
    <div className="friend-card__info">
      <span className="friend-card__info--text">{ friend.name }</span>
      <span className="friend-card__info--subtext">is your friend</span>
    </div>
    <div className="friend-card__actions">
      <Button
        onClick={() => onAction(ACTION_TYPES.TOGGLE_FAVOURITE, friend)}
        label='Favourite'
        icon={<Icons type='star' isSolid={friend.favourite} />}
        hasText={false}
      />
      <Button
        onClick={() => onAction(ACTION_TYPES.DELETE, friend)}
        label='Delete'
        icon={<Icons type='trash' />}
        hasText={false}
      />
    </div>
  </div>
);

export default FriendCard;
