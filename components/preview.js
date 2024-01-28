import React, {useState} from 'react';
import DataGrid from 'react-data-grid';
import { useForm } from 'react-hook-form';
// import {useTelegramWeb} from "../lib/telegramWeb";
import styles from '../styles/Home.module.css';


function Preview () {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const rows = [];
    for (let i = 1; i <= 5; i++) {
      rows.push(
        <input defaultValue={i} {...register('tg_' + i, {required: true})}/>
      );
      rows.push(
        <input defaultValue={i} {...register('left_' + i, { pattern: /\d+/, required: true})} />
      );
      rows.push(<br/>)
    }

    rows.push(
      <input {...register('tg_new')}/>
    );
    rows.push(
      <input {...register('left_new', { pattern: /\d+/})} />
    );
    rows.push(<br/>)

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
