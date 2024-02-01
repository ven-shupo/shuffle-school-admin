import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {useTelegramWeb} from "../lib/telegramWeb";
// import styles from '../styles/Home.module.css';

function makeFormRows (data, register) {
  if (!data) { return null };

  const rows = [];
  for (const dancer of data.records) {
    rows.push(
      <input defaultValue={dancer.fields.tg} {...register('tg_' + dancer.id, {required: true})}/>
    );
    rows.push(
      <input defaultValue={dancer.fields.classes_left} {...register('left_' + dancer.id, { pattern: /\d+/, required: true})} />
    );
    rows.push(<br/>)
  };
  rows.push(
    <input {...register('tg_new')}/>
  );
  rows.push(
    <input {...register('left_new', { pattern: /\d+/})} />
  );
  rows.push(<br/>);
  return rows
};

function Preview () {
    const tg = useTelegramWeb();
    tg.MainButton.setParams({text: 'Закрыть', is_visible: true}).onClick(() => {
      tg.close()
    });

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();
    
    const [dancers, setDancers] = useState(null);
    useEffect(() => {
      fetch("https://api.airtable.com/v0/appXfAFgufLXTHPVr/dancer?maxRecords=30&sort%5B0%5D%5Bfield%5D=updated&sort%5B0%5D%5Bdirection%5D=desc", {
        method: 'GET',
        headers: { "Authorization": "Bearer pattpUkpI0kiExoi9.e98cfe85447f4a5d49fbd63d0f59baa57121f7578e207036c666c8cb0329eeb9"},
      })
      .then(response => response.json())
      .then(data => setDancers(data))
      .catch(error => console.error('Error fetching data:', error));
    }, []);

    const r = makeFormRows(dancers, register);
    return (
      <div>
        {r ? (
          <div>
            <form onSubmit={handleSubmit((data) => console.log(data))}>
              {r}
              <input type="submit" />
            </form>
          </div>
        ) : (
          <p>Loading data...</p>
          )
        }
      </div>
    );
};

export default Preview
