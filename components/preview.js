import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {useTelegramWeb} from "../lib/telegramWeb";

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

function makeRecordsToUpdate (data) {
  if (!data) {return null};
  let records = [];
  for (let key in data) {
    if (!key.startsWith("tg_")) {continue};
    if (key == 'tg_new') {continue};

    let id = key.match(/tg_(.*)/)[1];
    records.push({"id": id, "fields": {"classes_left": parseInt(data['left_' + id], 10)}});
  }
  return records
}

function makeRecordsToCreate (data) {
  if (!data) {return null};
  if (!data['tg_new'] || !data['left_new']) {
    return null;
  } 
  
  return [{"fields": {"tg": data['tg_new'], "classes_left": parseInt(data['left_new'], 10)}}];
}

function update(records) {
  return updateOrCreate('PATCH', records);
}

function create(records) {
  return updateOrCreate('POST', records);
}

function updateOrCreate(method, records) {
  if (!records) {
    return;
  }

  fetch('https://api.airtable.com/v0/appXfAFgufLXTHPVr/dancer', {
    method: method,
    headers: {
      'Authorization': 'Bearer pat0dvTizQRN2iUqy.ddbd350795b4154882661016c9a5899cc5c53c9d283db1bbd3bda9c2bd68a031',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({"records": records})
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}


function sendChanges(data) {
  let toUpdate = makeRecordsToUpdate(data);
  for (let i = 0; i < toUpdate.length; i += 10) {
    const chunk = toUpdate.slice(i, i + 10);
    update(chunk);
  };
  let toSave = makeRecordsToCreate(data);
  create(toSave);
}


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

    const rows = makeFormRows(dancers, register);
    return (
      <div>
        {rows ? (
          <div>
            <form onSubmit={handleSubmit(sendChanges)}>
              {rows}
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
