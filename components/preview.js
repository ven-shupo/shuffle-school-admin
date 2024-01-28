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
          <label>First Name</label>
          <input {...register('firstName')} />
          <br/>
          <label>Lasr Name</label>
          <input {...register('lastName', { required: true })} />
          {errors.lastName && <p>Last name is required.</p>}
          <br/>
          <label>Age</label>
          <input {...register('age', { pattern: /\d+/ })} />
          {errors.age && <p>Please enter number for age.</p>}
          <input type="submit" />
        </form>
      );
}

export default Preview
