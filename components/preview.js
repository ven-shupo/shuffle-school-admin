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

    return (
        <form onSubmit={handleSubmit((data) => console.log(data))}>
          <label>telegram username</label>
          <label>classes left</label>
          <br/>
          <input {...register('tg_1', {required: true})} />
          <input {...register('left_1', { pattern: /\d+/, required: true})} />
          <br/>
          <input {...register('tg_2', {required: true})} />
          <input {...register('left_2', { pattern: /\d+/, required: true})} />
          <br/>
          <input {...register('tg_3', {required: true})} />
          <input {...register('left_3', { pattern: /\d+/, required: true})} />
          <br/>
          <input type="submit" />
        </form>
      );
}

export default Preview
