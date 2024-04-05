import { useState } from 'react';
import Notification from './components/Notification/Notification';
import { simulateServer } from './utils/simulateServer';
import styles from './App.module.css';

export type NotificationStatus = 'success' | 'error';

export interface NotificationProps {
  status: NotificationStatus;
  label: string;
  text: string;
}

const App = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [notificationKey, setNotificationKey] = useState(0);
  const [notification, setNotification] = useState<NotificationProps>({
    status: 'success',
    label: 'Успешно',
    text: 'Изменения успешно сохранены',
  });

  const handlerClick = async () => {
    await simulateServer()
      .then(() => {
        setIsVisible(true);
        setNotification({
          status: 'success',
          label: 'Успешно',
          text: 'Изменения успешно сохранены',
        });
        setNotificationKey((prevKey) => prevKey + 1);
      })
      .catch(() => {
        setIsVisible(true);
        setNotification({
          status: 'error',
          label: 'Изменения не сохранены',
          text: 'Потеря интернет соединения',
        });
        setNotificationKey((prevKey) => prevKey + 1);
      });
  };

  return (
    <div className={styles.wrapper}>
      {isVisible && (
        <Notification
          key={notificationKey}
          status={notification.status}
          label={notification.label}
          text={notification.text}
        />
      )}
      <button className={styles.btnStart} onClick={handlerClick}>
        Сохранить изменения
      </button>
    </div>
  );
};

export default App;