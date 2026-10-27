import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import ApiData from './ApiData';

jest.mock('../api', () => ({ productsUrl: 'https://api.example/index.php' }));
const originalFetch = global.fetch;
afterEach(() => { global.fetch = originalFetch; });

test('affiche les produits du tableau JSON', async () => {
  global.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => [
    { id: '1', nom: 'Produit test', description: 'Description test', prix: '12.00', image: '/test.png' }
  ] });
  render(<ApiData />);
  expect(screen.getByRole('status')).toBeInTheDocument();
  expect(await screen.findByText('Produit test')).toBeInTheDocument();
  expect(screen.getByText('Prix : 12.00')).toBeInTheDocument();
});

test('verifie le statut HTTP avant de lire le JSON', async () => {
  const json = jest.fn();
  global.fetch = jest.fn().mockResolvedValue({ ok: false, status: 504, json });
  render(<ApiData />);
  expect(await screen.findByRole('alert')).toHaveTextContent('504');
  expect(json).not.toHaveBeenCalled();
});

test('signale une structure JSON inattendue', async () => {
  global.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => ({ error: 'Erreur' }) });
  render(<ApiData />);
  expect(await screen.findByRole('alert')).toHaveTextContent('tableau de produits');
});

test('annule la requete au demontage', async () => {
  global.fetch = jest.fn().mockImplementation(() => new Promise(() => {}));
  const { unmount } = render(<ApiData />);
  await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
  const signal = global.fetch.mock.calls[0][1].signal;
  expect(signal.aborted).toBe(false);
  unmount();
  expect(signal.aborted).toBe(true);
});