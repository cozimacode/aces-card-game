import { App } from '../App';
import { customRenderer, cleanup, fireEvent, act, waitFor } from './utils';

let counters;
let helpers;

beforeEach(() => {
  helpers = customRenderer(<App />);
  counters = helpers.queryAllByTestId('counter');
});

afterEach(cleanup);

describe('App component', () => {
  test('whether it renders without crashing and initializes properly', () => {
    expect(counters).toHaveLength(2);
    expect(counters[0].querySelector('p:nth-child(1)').textContent).toBe('52');
    expect(counters[1].querySelector('p:nth-child(1)').textContent).toBe('4');
  });

  test('whether reset works', async () => {
    await act(async () => {
      const { queryByTestId, getAllByTestId } = helpers;
      const resetButton = queryByTestId('reset-button');
      const winBanner = queryByTestId('winBanner');
      fireEvent.click(resetButton);

      expect(winBanner).toBeFalsy();
      expect(counters[0].querySelector('p:nth-child(1)').textContent).toBe('52');
      expect(counters[1].querySelector('p:nth-child(1)').textContent).toBe('4');

      await waitFor(() => expect(getAllByTestId('single-card')).toHaveLength(5), {
        timeout: 4000,
        interval: 1500,
      });
    });
  });

  test('whether new cards are drawn', async () => {
    await act(async () => {
      const { queryByTestId, getAllByTestId } = helpers;
      const drawButton = queryByTestId('draw-button');
      const loadingSpinner = queryByTestId('loading-spinner');
      fireEvent.click(drawButton);

      await waitFor(() => expect(getAllByTestId('single-card')).toHaveLength(5), {
        timeout: 4000,
        interval: 1500,
      });

      expect(loadingSpinner).toBeFalsy();
      expect(counters[0].querySelector('p:nth-child(1)').textContent).toBe('47');
    });
  });
});
