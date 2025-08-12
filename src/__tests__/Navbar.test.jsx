import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../redux/slices/themeSlice';
import Navbar from '../components/navbar/Navbar';

// Create a mock store
const mockStore = configureStore({
  reducer: {
    theme: themeReducer
  }
});

describe('Navbar Component', () => {
  test('renders desktop navbar correctly', () => {
    render(
      <Provider store={mockStore}>
        <Navbar isMobile={false} />
      </Provider>
    );
    
    // Check if logo is rendered
    expect(screen.getByText('LD')).toBeInTheDocument();
    
    // Check if nav items are rendered
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Skills')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Experience')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });
  
  test('renders mobile navbar correctly', () => {
    render(
      <Provider store={mockStore}>
        <Navbar isMobile={true} />
      </Provider>
    );
    
    // Check if logo is rendered
    expect(screen.getByText('LD')).toBeInTheDocument();
    
    // Check if menu toggle button is rendered (it has 3 div elements)
    const menuToggleButton = screen.getByRole('button');
    expect(menuToggleButton).toBeInTheDocument();
    
    // Nav items should not be visible initially in mobile view
    expect(screen.queryByText('Home')).not.toBeVisible();
    
    // Click menu toggle to open mobile menu
    fireEvent.click(menuToggleButton);
    
    // Now nav items should be visible
    expect(screen.getByText('Home')).toBeVisible();
    expect(screen.getByText('About')).toBeVisible();
    expect(screen.getByText('Skills')).toBeVisible();
    expect(screen.getByText('Projects')).toBeVisible();
    expect(screen.getByText('Experience')).toBeVisible();
    expect(screen.getByText('Contact')).toBeVisible();
  });
});
