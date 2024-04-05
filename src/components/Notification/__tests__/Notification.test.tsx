import { render, screen } from '@testing-library/react';
import { createPortal } from 'react-dom';
import Notification from '../Notification';

describe('Тестирование Notification success', () => {
  let portalContainer: HTMLElement | null;

  beforeEach(() => {
    portalContainer = document.createElement('div');
    portalContainer.setAttribute('id', 'notification');
    document.body.appendChild(portalContainer);

    if (portalContainer) {
      render(
        <Notification
          status='success'
          label='Успешно'
          text='Изменения сохранены'
        />,
        { container: portalContainer }
      );
    }
  });

  afterEach(() => {
    if (portalContainer) {
      document.body.removeChild(portalContainer);
    }
  });

  test('Надписи', () => {
    expect(screen.getByText('Успешно')).toBeInTheDocument();
    expect(screen.getByText('Изменения сохранены')).toBeInTheDocument();
  });

  test('Иконка', () => {
    expect(screen.getByRole('img')).toBeInTheDocument();
  });
});


describe('Тестирование Notification error', () => {
  let portalContainer: HTMLElement | null;

  beforeEach(() => {
    portalContainer = document.createElement('div');
    portalContainer.setAttribute('id', 'notification');
    document.body.appendChild(portalContainer);

    if (portalContainer) {
      render(
        <Notification
          status='error'
          label='Ошибка'
          text='Изменения не сохранены'
        />,
        { container: portalContainer }
      );
    }
  });

  afterEach(() => {
    if (portalContainer) {
      document.body.removeChild(portalContainer);
    }
  });

  test('Надписи', () => {
    expect(screen.getByText('Ошибка')).toBeInTheDocument();
    expect(screen.getByText('Изменения не сохранены')).toBeInTheDocument();
  });

  test('Иконка', () => {
    expect(screen.getByRole('img')).toBeInTheDocument();
  });
});
