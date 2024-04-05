import { FC, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './Notification.module.css';
import successIcon from './images/success.png';
import errorIcon from './images/error.png';
import { ProgressBar } from './ProgressBar/ProgressBar';
import { NotificationProps, NotificationStatus } from '../../App';

const Notification: FC<NotificationProps> = ({ status, label, text }) => {
  const notification = document.getElementById('notification') as HTMLElement;

  const [value, setValue] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [count, setCount] = useState<NodeJS.Timeout | null>(null);

  const duration = 3000;
  const interval = 30;
  const maxValue = 100;
  const step = (maxValue / (duration / interval));
  let currentValue = 0;

  useEffect(() => {
    const count = setInterval(() => {
      if (currentValue <= maxValue) {
        setValue(currentValue);
        setIsVisible(true);
      } else {
        clearInterval(count);
        setIsVisible(false);
      }
      currentValue += step;
    }, interval);

    setCount(count);

    return () => {
      if (count) {
        clearInterval(count);
      }
    };
  }, [status, label, text]);

  const handelMouseFocus = () => {
    setValue(value);
    if (count) {
      clearInterval(count);
    }
  };

  const handleMouseDown = () => {
    currentValue = value;
    const count = setInterval(() => {
      if (currentValue <= maxValue) {
        setValue(currentValue);
      } else {
        clearInterval(count);
        setIsVisible(false);
      }
      currentValue += step;
    }, interval);
    setCount(count);
  };

  const getIconByStatus = (status: NotificationStatus) => {
    if (status === 'success') {
      return successIcon;
    }
    return errorIcon;
  };

  return createPortal(
    <>
      {isVisible && (
        <div className={styles.wrapper} onMouseEnter={handelMouseFocus} onMouseLeave={handleMouseDown}>
          <div className={styles.notification}>
            <img 
              src={getIconByStatus(status)}
              alt='statusIcon'
              className={styles.icon}
            />
            <div className={styles.info}>
              <label className={styles.label}>{label}</label>
              <p className={styles.text}>{text}</p>
              <ProgressBar value={value}/>
            </div>
          </div>
        </div>
      )}
    </>, notification)
};

export default Notification;