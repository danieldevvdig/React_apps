import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { DarkModeProvider } from './context/darkmode';

test('renders navigation links', () => {
  render(
    <MemoryRouter initialEntries={['/home']}>
      <DarkModeProvider>
        <App />
      </DarkModeProvider>
    </MemoryRouter>
  );

  expect(screen.getAllByRole('link', { name: /home/i }).length).toBeGreaterThan(0);
  expect(screen.getAllByRole('link', { name: /products/i }).length).toBeGreaterThan(0);
  expect(screen.getAllByRole('link', { name: /about/i }).length).toBeGreaterThan(0);
});
