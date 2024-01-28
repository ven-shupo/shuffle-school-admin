import React, {useState, useEffect} from 'react'
import {useTelegramWeb} from "../lib/telegramWeb";
import styles from '../styles/Home.module.css';


function Preview () {
  const tg = useTelegramWeb();
  tg.MainButton.setParams({text: 'Закрыть', is_visible: true}).onClick(() => {
    tg.close()
  });
  console.log("tg", tg)
  console.log("tg.initDataUnsafe", tg.initDataUnsafe)
  console.log("tg.initDataUnsafe.user", tg.initDataUnsafe.user)
  console.log("tg.initDataUnsafe.user.username", tg.initDataUnsafe.user.username)
 
  const [lessons, setLessons] = useState();

  const requestOptions = {
    method: 'GET',
    headers: { "Authorization": "Bearer pattpUkpI0kiExoi9.e98cfe85447f4a5d49fbd63d0f59baa57121f7578e207036c666c8cb0329eeb9"},
  };
  const tgUserName = tg.initDataUnsafe.user.username;
  var url = new URL("https://api.airtable.com/v0/appXfAFgufLXTHPVr/dancer");
  var params = {filterByFormula: 'tg="' + tgUserName + '"'};
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
  console.log("new url", url);
  fetch(url, requestOptions)
    .then((response) => response.json())
    .then((data) => {
        setLessons(data.records[0].fields.classes_left);
    })
    .catch((err) => {
        console.log(err.message);
  });
  return (
    <div
        className={styles.preview}
        style={{backgroundColor: 'var(--tg-theme-secondary-bg-color)'}}
    >
        <div
            className={styles.card}
            style={{ 
                backgroundImage: 'url(https://ven-shupo.github.io/shuffle-school/card.png)',
                backgroundColor: 'var(--tg-theme-secondary-bg-color)'
            }}
        >
        </div>
        {lessons && 
            <div
                className={styles.infoText}
                style={{
                    color: 'var(--tg-theme-text-color)', 
                    backgroundColor: 'var(--tg-theme-secondary-bg-color)'
                }}
            > 
                Осталось {lessons} занятий
            </div>
        }
    </div>
  )
}

export default Preview
