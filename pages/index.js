import React, { useState } from 'react';

export default function Home() {
  const [task, setTask] = useState('');
  const [list, setList] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [isEdit, setIsEdit] = useState(null);

  const onSubmit = () => {
    if (task !== '') {
      if (isEdit !== null) {
        list[isEdit] = task;
        setList(list);
        setIsEdit(null);
      } else {
        setList([...list, task]);
      }
      setTask('');
    }
  }

  const onDelete = (k) => {
    delete list[k];
    setList(list.filter(i => i));
  }

  const onEdit = (i, k) => {
    setTask(i);
    setIsEdit(k);
  }

  const onComplete = (k) => {
    setCompleted([...completed, k]);
  }

  return (
    <>
    <div class="w-full max-w-sm" onSubmit={onSubmit}>
      <div class="flex items-center border-b border-teal-500 py-2">
        <input class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="New Task" value={task} onChange={(e) => (setTask(e.target.value))} />
        <button class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 py-1 px-2 rounded" type="button" onClick={onSubmit}>
          {isEdit !== null ? 'Update' : 'Save'}
        </button>
      </div>
    </div>
    <div>
      <ul>
        {list.map( (i, k) => (
          <li key={k} className="flex justify-between m-2 border-solid">
            <div>
              { completed.indexOf(k) === -1 && (
                <button class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 py-1 px-2 rounded" type="button" onClick={() => (onComplete(k))}>Complete</button>
              )}
              <span className={`${completed.indexOf(k) !== -1 ? 'line-through' : ''} `}>{i}</span>
            </div>
            <div>
              <button class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 py-1 px-2 rounded" type="button" onClick={() => (onEdit(i, k))}>Edit</button>
              <button class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 py-1 px-2 rounded" type="button" onClick={() => (onDelete(k))}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
    </>
  )
}
