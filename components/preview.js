import React, {useState, useEffect} from 'react'
import {useTelegramWeb} from "../lib/telegramWeb";
import styles from '../styles/Home.module.css';


function Preview () {
  const tg = useTelegramWeb();
  tg.MainButton.setParams({text: 'Закрыть', is_visible: true}).onClick(() => {
    tg.close()
  });
 
  const [isAdmin, setIsAdmin] = useState();
  const username = tg.initDataUnsafe.user.username;
  if (username == "venshupo" || username == "") {
    setIsAdmin(true)
  }
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
