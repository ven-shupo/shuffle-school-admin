import React, {useState} from 'react';
import DataGrid from 'react-data-grid';
import { useForm } from 'react-hook-form';
// import {useTelegramWeb} from "../lib/telegramWeb";
import styles from '../styles/Home.module.css';

const columns = [
    { key: 'id', name: 'ID' },
    { key: 'title', name: 'Title' }
  ];

const rows = [
{ id: 0, title: 'Example' },
{ id: 1, title: 'Demo' }
];

function Preview () {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    return (
        <form onSubmit={handleSubmit((data) => console.log(data))}>
          <input {...register('firstName')} />
          <input {...register('lastName', { required: true })} />
          {errors.lastName && <p>Last name is required.</p>}
          <input {...register('age', { pattern: /\d+/ })} />
          {errors.age && <p>Please enter number for age.</p>}
          <input type="submit" />
        </form>
      );
}

export default Preview
