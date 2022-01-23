import './list.scss';

const List = ({
  children,
  items
}) => items.length ? (
  <ul>
    {items.map((item) => (
      <li key={item.id}>
        {children(item)}
      </li>
    ))}
  </ul>
) : (
  <div className='empty-list | flex flex-row flex-x-center flex-y-center'>
    No items to show      
  </div>
);

export default List;
