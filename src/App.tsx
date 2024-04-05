import { useState } from 'react';
import { createPortal } from 'react-dom';
import Notification from './components/Notification/Notification';
import { simulateServer } from './utils/simulateServer';
import styles from './App.module.css';

type NotificationStatus = 'success' | 'error';

interface Notification {
  status: NotificationStatus;
  label: string;
  text: string;
}

const App = () => {
  const [buttonClicked, setButtonClicked] = useState(false);
  const [notification, setNotification] = useState<Notification>({
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
    <div className={styles.wrapper}>
      {createPortal(
        <Notification 
          status={notification.status}
          label={notification.label}
          text={notification.text}
          buttonClicked={buttonClicked}
        />,
        document.body
      )}
      <button
        className={styles.btnStart} onClick={handlerClick}>Сохранить изменения</button>
    </div>
  );
}

export default App;
