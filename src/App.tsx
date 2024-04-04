import { useState } from 'react';
import Notification from './components/Notification/Notification';
import { simulateServer } from './utils/simulateServer';
import styles from './App.module.css';

const App = () => {
  const [buttonClicked, setButtonClicked] = useState(false);
  const [notification, setNotification] = useState({
    status: 'success',
    label: 'Успешно',
    text: 'Изменения успешно сохранены',
  });

  const handlerClick = async () => {
    try {
      await simulateServer();
      setButtonClicked(!buttonClicked);
      setNotification({
        status: 'success',
        label: 'Успешно',
        text: 'Изменения успешно сохранены',
      });
    } catch (error) {
      setButtonClicked(!buttonClicked);
      setNotification({
        status: 'error',
        label: 'Изменения не сохранены',
        text: 'Потеря интернет соединения',
      });
    }
  };

  return (
    <div className="App">
      <button className={styles.btnStart} onClick={handlerClick} >Нажми на меня</button>
      <Notification status={notification.status} label={notification.label} text={notification.text} buttonClicked={buttonClicked}/>
    </div>
  );
}

export default App;
