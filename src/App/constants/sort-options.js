export const SORT_OPTION_TYPES = {
  NAME: 'name',
  FAVOURITE: 'favourite',
};

export const SORT_OPTIONS_MAP = {
  [SORT_OPTION_TYPES.NAME]: {
    id: SORT_OPTION_TYPES.NAME,
    label: 'Name',
  },
  [SORT_OPTION_TYPES.FAVOURITE]: {
    id: SORT_OPTION_TYPES.FAVOURITE,
    label: 'favourite',
  }
};

export const SORT_OPTIONS = Object.values(SORT_OPTIONS_MAP);
