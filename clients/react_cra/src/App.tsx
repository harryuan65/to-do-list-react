import React, { useState } from 'react';
import classes from './App.module.css';
// Local test
import { ToDoItems } from './constants';
import { ToDoItemData, ToDoItemStatus } from './types';
import { ReactComponent as Checkbox } from './assets/Checkbox__unchecked.svg';
import { ReactComponent as CheckboxChecked } from './assets/Checkbox__checked.svg';
import { ReactComponent as TrashBin } from './assets/TrashBin.svg';

const CheckBox = ({
  checked,
  onClick,
}: {
  checked: boolean;
  onClick: React.MouseEventHandler;
}) => {
  let props = {
    onClick,
    className: [classes.Action, classes.Checkbox].join(' '),
  };
  if (checked) {
    return <CheckboxChecked {...props} />;
  } else {
    return <Checkbox {...props} />;
  }
};

interface ToDoItemProps {
  handleClick: (id: number) => void;
  item: ToDoItemData;
}

const ToDoItem = ({ handleClick, item }: ToDoItemProps) => (
  <div
    className={[
      classes.Item,
      item.status === ToDoItemStatus.DONE && classes.Done,
    ].join(' ')}
    onClick={() => handleClick(item.id)}
  >
    <CheckBox
      onClick={(event) => {
        handleClick(item.id);
        event.stopPropagation();
      }}
      checked={item.status === ToDoItemStatus.DONE}
    />
    <p className={classes.Title}>{item.title}</p>
    <TrashBin className={[classes.Action, classes.Delete].join(' ')} />
  </div>
);
function App() {
  const [newTitle, setNewTitle] = useState<string>('');
  const [items, setItems] = useState<ToDoItemData[]>(ToDoItems);

  const addTodo = () => {
    setItems([
      ...items,
      { id: items.length + 1, title: newTitle, status: ToDoItemStatus.ACTIVE },
    ]);
    setNewTitle('');
  };

  const handleClick = (id: number) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          if (item.status === ToDoItemStatus.ACTIVE) {
            item.status = ToDoItemStatus.DONE;
          } else {
            item.status = ToDoItemStatus.ACTIVE;
          }
        }
        return item;
      })
    );
  };
  return (
    <div className={classes.Container}>
      <div className={classes.filterBar}>
        <input type="text" className={classes.Search} />
        <div className={classes.statuses}>
          <span className={classes.All}>All</span>
          <span className={classes.Active}>Active</span>
          <span className={classes.Done}>Done</span>
        </div>
      </div>
      <div className={classes.Items}>
        {items.map((item) => (
          <ToDoItem key={item.id} handleClick={handleClick} item={item} />
        ))}
      </div>
      <div className={classes.additionBar}>
        <input
          type="text"
          onChange={({ target }) => {
            setNewTitle(target.value);
          }}
          placeholder="Something on your mind?"
          value={newTitle}
        />
        <button onClick={addTodo}>ADD</button>
      </div>
    </div>
  );
}

export default App;
