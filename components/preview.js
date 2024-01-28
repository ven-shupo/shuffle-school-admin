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
  if (username == "vanshupo" || username == "") {
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
    } 
    </div>
  )
}

export default Preview
