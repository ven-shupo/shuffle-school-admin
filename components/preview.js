import React, {useState} from 'react';
import DataGrid from 'react-data-grid';
import { useForm } from 'react-hook-form';
import {useTelegramWeb} from "../lib/telegramWeb";
import styles from '../styles/Home.module.css';


function Preview () {
    const tg = useTelegramWeb();
    tg.MainButton.setParams({text: 'Закрыть', is_visible: true}).onClick(() => {
      tg.close()
    });
    
    // const tgUserName = tg.initDataUnsafe.user.username;
    const requestOptions = {
      method: 'GET',
      headers: { "Authorization": "Bearer pattpUkpI0kiExoi9.e98cfe85447f4a5d49fbd63d0f59baa57121f7578e207036c666c8cb0329eeb9"},
    };
    var url = new URL("https://api.airtable.com/v0/appXfAFgufLXTHPVr/dancer");
    var params = {maxRecords: 30};
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    const {rows, setRows} = useState([]);
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        const newRows = [];
        for (const dancer of data.records) {
          newRows.push(
            <input defaultValue={dancer.fields.tg} {...register('tg_' + dancer.id, {required: true})}/>
          );
          newRows.push(
            <input defaultValue={dancer.fields.classes_left} {...register('left_' + dancer.id, { pattern: /\d+/, required: true})} />
          );
          newRows.push(<br/>)
        }
        newRows.push(
          <input {...register('tg_new')}/>
        );
        newRows.push(
          <input {...register('left_new', { pattern: /\d+/})} />
        );
        newRows.push(<br/>);
        setRows(newRows);
      })
      .catch((err) => {
          console.log(err.message);
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    return (
        <form onSubmit={handleSubmit((data) => console.log(data))}>
          <label>Telegram username    | Classes left</label>
          <br/>
          {rows}
          <input type="submit" />
        </form>
      );
}

export default Preview
