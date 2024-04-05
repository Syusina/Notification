import { FC, useEffect, useState } from 'react';
import styles from './ProgressBar.module.css';

interface Props {
  value: number;
}

export const ProgressBar: FC<Props> = ({ value }) => {
  const [width, setWidth] = useState(value);

  useEffect(() => {
    setWidth(value);
  }, [value]);

  return (
    <div className={styles.progressBar}>
      <div className={styles.progressValue} style={{ width: `${width}%` }}></div>
    </div>
  )
};