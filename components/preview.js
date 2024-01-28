import React, {useState} from 'react'
import {useTelegramWeb} from "../lib/telegramWeb";
import styles from '../styles/Home.module.css';


function Preview () {
  const tg = useTelegramWeb();
  tg.MainButton.setParams({text: 'Закрыть', is_visible: true}).onClick(() => {
    tg.close()
  });
  
  const username = tg.initDataUnsafe.user.username;
  const isAdmin = (username == "venshupo" || username == "danetuzh")
  return (
    <div>
    {isAdmin && 
        <div
        className={styles.preview}
        style={{backgroundColor: 'var(--tg-theme-secondary-bg-color)'}}
        >
          <div
            className={styles.card}
            style={{ 
                backgroundImage: 'url(https://ven-shupo.github.io/shuffle-school-admin/card.png)',
                backgroundColor: 'var(--tg-theme-secondary-bg-color)'
            }}
          >
          </div>
        </div>
    }
    </div>
  )
}

export default Preview
