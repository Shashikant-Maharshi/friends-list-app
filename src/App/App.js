import TextInput from "../shared/components/TextInput/TextInput";
import List from "../shared/components/List/List";
import ConfirmEvent from "../shared/components/ConfirmEvent/ConfirmEvent";
import Pagination from "../shared/components/Pagination/Pagination";
import SortableMenu from "../shared/components/SortableMenu/SortableMenu";
import AppHeader from "./AppHeader";
import FriendCard from "./FriendCard/FriendCard";
import ACTION_TYPES from "./constants/action-types";
import { SORT_OPTIONS } from "./constants/sort-options";
import useApp from "./hooks/app.hook.js";

import './app.scss';

const DATA_LIMIT = 4;

const App = () => {
  const {
    deleteResource,
    inputHint,
    onAction,
    paginationSlice,
    sortBy,
    sortDirection,
    text,
    visibleFriends,
  } = useApp();

  return (
    <div className="app">
      <AppHeader className="app--header" />
      <div className='app--content'>
        <div className='sticky'>
          <TextInput
            value={text.value}
            placeholder='Enter your friends name'
            onSubmit={() => onAction(ACTION_TYPES.CREATE_NEW)}
            onChange={(val) => onAction(ACTION_TYPES.UPDATE_INPUT_TEXT, val)}
            onClear={() => onAction(ACTION_TYPES.UPDATE_INPUT_TEXT, '')}
            hint={inputHint}
            maxLength={50}
          />
          {!!(visibleFriends.length > 1) && (
            <SortableMenu
              options={SORT_OPTIONS}
              onSelect={(event) => onAction(ACTION_TYPES.CHANGE_SORT, event.target.value)}
              onSort={() => onAction(ACTION_TYPES.CHANGE_SORT_DIRECTION)}
              selected={sortBy}
              sortDirection={sortDirection}
            />
          )}
        </div>
        <List
          items={
            visibleFriends.length > DATA_LIMIT && paginationSlice
              ? visibleFriends.slice(paginationSlice.startIndex, paginationSlice.endIndex)
              : visibleFriends
          }
        >
          {(friend) => (
            <ConfirmEvent
              show={!!(deleteResource && deleteResource.id === friend.id)}
              title={deleteResource && deleteResource.name}
              onConfirm={() => onAction(ACTION_TYPES.EVENT_CONFIRM)}
              onCancel={() => onAction(ACTION_TYPES.EVENT_CANCEL)}
            >
              <FriendCard
                friend={friend}
                onAction={onAction}
              />
            </ConfirmEvent>
          )}
        </List>
      </div>
      <div className="app--footer | flex flex-row flex-x-center">
        {visibleFriends.length > DATA_LIMIT && (
          <Pagination
            data={visibleFriends}
            dataLimit={DATA_LIMIT}
            pageLimit={5}
            onAction={(startIndex, endIndex) => (
              onAction(ACTION_TYPES.UPDATE_PAGINATION_SLICE, startIndex, endIndex)
            )}
          />
        )}
      </div>
    </div>
  );
}

export default App;
