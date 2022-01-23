import Button from "../Button/Button";

import './sortable-menu.scss';

const SortableMenu = ({
  onSelect,
  onSort,
  options,
  selected,
  sortDirection,
}) => (
  <div className="sortable-menu | flex flex-row">
    <label htmlFor="sortable-menu">Sort By: </label>
    <select id="sortable-menu" value={selected} onChange={onSelect}>
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.label}
        </option>
      ))}
    </select>
    <Button
      onClick={onSort}
      label={sortDirection ? 'Asc' : 'Desc'}
      hasText
    />
  </div>
);

export default SortableMenu;
