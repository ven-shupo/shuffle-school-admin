import React, {useState} from 'react'
// import {useTelegramWeb} from "../lib/telegramWeb";
import styles from '../styles/Home.module.css';
import { CompactTable } from '@table-library/react-table-library/compact';

const nodes = [
  {
    id: '0',
    name: 'Shopping List',
    deadline: new Date(2020, 1, 15),
    type: 'TASK',
    isComplete: true,
    nodes: 3,
  },
];

const COLUMNS = [
  { label: 'Task', renderCell: (item) => item.name },
  {
    label: 'Deadline',
    renderCell: (item) =>
      item.deadline.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }),
  },
  { label: 'Type', renderCell: (item) => item.type },
  {
    label: 'Complete',
    renderCell: (item) => item.isComplete.toString(),
  },
  { label: 'Tasks', renderCell: (item) => item.nodes },
];


function Preview () {
//   const tg = useTelegramWeb();
//   tg.MainButton.setParams({text: 'Закрыть', is_visible: true}).onClick(() => {
//     tg.close()
//   });
  
//   const username = tg.initDataUnsafe.user.username;
//   const isAdmin = true //(username == "venshupo" || username == "danetuzh")
  const data = { nodes };
  return <CompactTable columns={COLUMNS} data={data} />;
//   return (
//     <div>
//     {isAdmin && 
//         <div
//         className={styles.preview}
//         style={{backgroundColor: 'var(--tg-theme-secondary-bg-color)'}}
//         >
//           <div className="App">
//            <CompactTable columns={COLUMNS} data={data} />
//           </div>
//         </div>
//     }
//     </div>
//   )
}

export default Preview
