import { render, screen } from '@testing-library/react';
import Notification from '../Notification';


describe('Тестирование Notification success', () => {
  beforeEach(() => {
    render(<Notification status='success' label='Успешно' text='Изменения сохранены' buttonClicked={true}/>);
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
    beforeEach(() => {
      render(<Notification status='error' label='Ошибка' text='Изменения не сохранены' buttonClicked={true}/>);
    });
  
    test('Надписи', () => {
      expect(screen.getByText('Ошибка')).toBeInTheDocument();
      expect(screen.getByText('Изменения не сохранены')).toBeInTheDocument();
    });
  
    test('Иконка', () => {
      expect(screen.getByRole('img')).toBeInTheDocument();
    });
  });