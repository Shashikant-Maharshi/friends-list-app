import {
  useCallback,
  useState,
  useMemo,
} from "react";

import ACTION_TYPES from "../constants/action-types";
import { SORT_OPTION_TYPES, SORT_OPTIONS_MAP } from "../constants/sort-options";

const defaultText = {
  trimmed: '',
  value: '',
};

const useApp = () => {
  const [text, setText] = useState(defaultText);
  const [friends, setFriends] = useState({});
  const [deleteResource, setDeleteResource] = useState(null);
  const [paginationSlice, setPaginationSlice] = useState(null);
  const [sortBy, setSortBy] = useState(SORT_OPTIONS_MAP[SORT_OPTION_TYPES.NAME].id);
  const [sortDirection, setSortDirection] = useState(true);

  const visibleFriends = useMemo(() => {
    const filteredFriends = (
      Object
      .values(friends)
      .filter((friend) => {
        const friendName = friend.name.toLowerCase();
        const inputText = text.trimmed.toLowerCase();
        
        return friendName.includes(inputText);
      })
    );
    let favouriteFriends = [];
    let casualFriends = [...filteredFriends];
    let orderedFriendsList = [];

    if (sortBy === SORT_OPTION_TYPES.FAVOURITE) {
      favouriteFriends = filteredFriends.filter((friend) => friend.favourite);
      casualFriends = filteredFriends.filter((friend) => !friend.favourite);
    }

    favouriteFriends = sortByName(favouriteFriends, sortDirection);
    casualFriends = sortByName(casualFriends, sortDirection);

    if (sortDirection) {
      orderedFriendsList = favouriteFriends.concat(casualFriends);
    } else {
      orderedFriendsList = casualFriends.concat(favouriteFriends);
    }

    return orderedFriendsList;
  }, [friends, sortBy, sortDirection, text]);

  const inputHint = useMemo(() => {
    const HINT_TYPES = {
      INFO: 'info',
      ERROR: 'error',
    }
    const friendsCount = Object.values(friends).length;
    const visibleFriendsCount = visibleFriends.length;
    let hint = {
      message: null,
      type: null,
    };

    if (!text.trimmed && text.value) {
      hint.message = 'Only spaces are not allowed';
      hint.type = HINT_TYPES.ERROR;
    } else if (text.value && !hasValidName(text)) {
      hint.message = 'Only alphabets & spaces are allowed.';
      hint.type = HINT_TYPES.ERROR;
    } else if (friendsCount !== visibleFriendsCount) {
      hint.message = `${visibleFriendsCount} total matches found`;
      hint.type = HINT_TYPES.INFO;
    }

    return hint;
  }, [friends, text, visibleFriends]);

  const onAction = useCallback((actionType, ...args) => {
    const actions = {
      [ACTION_TYPES.DELETE]: () => {
        const [selectedFriend] = args;
        setDeleteResource(selectedFriend);
      },
      [ACTION_TYPES.EVENT_CONFIRM]: () => {
        if (deleteResource) {
          const tempFriends = { ...friends };
  
          delete tempFriends[deleteResource.id];
          setFriends(tempFriends);
        }
      },
      [ACTION_TYPES.EVENT_CANCEL]: () => {
        setDeleteResource(null);
      },
      [ACTION_TYPES.TOGGLE_FAVOURITE]: () => {
        const [selectedFriend] = args;

        setFriends({
          ...friends,
          [selectedFriend.id]: {
            ...selectedFriend,
            favourite: !selectedFriend.favourite,
          }
        });
      },
      [ACTION_TYPES.UPDATE_INPUT_TEXT]: () => {
        const [value] = args;

        setText({
          trimmed: value.toString().trim(),
          value
        });
      },
      [ACTION_TYPES.CREATE_NEW]: () => {
        const id = (new Date()).getTime();

        setFriends({
          ...friends,
          [id]: {
            id,
            name: text.trimmed,
            favourite: false,
          }
        });

        onAction(ACTION_TYPES.UPDATE_INPUT_TEXT, defaultText.value);
      },
      [ACTION_TYPES.UPDATE_PAGINATION_SLICE]: () => {
        const [startIndex, endIndex] = args;

        setPaginationSlice({
          startIndex,
          endIndex
        });
      },
      [ACTION_TYPES.CHANGE_SORT_DIRECTION]: () => {
        setSortDirection(!sortDirection);
      },
      [ACTION_TYPES.CHANGE_SORT]: () => {
        const [sortBySelection] = args;
        setSortBy(sortBySelection);
      }
    };

    if (actions[actionType]) {
      actions[actionType]();
    }
  }, [deleteResource, friends, sortDirection, text]);

  return {
    deleteResource,
    friends,
    inputHint,
    onAction,
    paginationSlice,
    sortBy,
    sortDirection,
    text,
    visibleFriends,
  };
};

const hasValidName = (name) => {
  const regex = /^[a-zA-Z ]+$/;
  
  return regex.test(name.value);
}

const sortByName = (list, sortDirection) => list.sort(
  (curr, next) => {
    const currName = curr.name.toLowerCase();
    const nextName = next.name.toLowerCase();
    const multiplier = sortDirection ? 1 : -1;
    let direction = 0;

    if (currName < nextName) {
      direction = -1 * multiplier;
    } else if (currName > nextName) {
      direction = 1 * multiplier;
    }
    
    return direction;
  }
);

export default useApp;
