import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../redux/store';
import App from '../App';

// Mock the components to avoid rendering the entire app
jest.mock('../components/layout/Layout', () => {
  return function MockLayout({ children }) {
    return <div data-testid="mock-layout">{children}</div>;
  };
});

jest.mock('../components/theme/ThemeCustomizer', () => {
  return function MockThemeCustomizer() {
    return <div data-testid="mock-theme-customizer"></div>;
  };
});

jest.mock('../sections/Hero', () => {
  return function MockHero() {
    return <div data-testid="mock-hero"></div>;
  };
});

describe('App Component', () => {
  test('renders without crashing', () => {
    render(
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    );
    
    expect(screen.getByTestId('mock-layout')).toBeInTheDocument();
    expect(screen.getByTestId('mock-theme-customizer')).toBeInTheDocument();
    expect(screen.getByTestId('mock-hero')).toBeInTheDocument();
  });
});
