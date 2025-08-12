import { css } from 'styled-components';

// Breakpoints for responsive design
export const breakpoints = {
  xs: '480px',
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
  xxl: '1400px'
};

// Media query mixins
export const media = {
  xs: (...args) => css`
    @media (max-width: ${breakpoints.xs}) {
      ${css(...args)}
    }
  `,
  sm: (...args) => css`
    @media (min-width: ${breakpoints.xs}) and (max-width: ${breakpoints.sm}) {
      ${css(...args)}
    }
  `,
  md: (...args) => css`
    @media (min-width: ${breakpoints.sm}) and (max-width: ${breakpoints.md}) {
      ${css(...args)}
    }
  `,
  lg: (...args) => css`
    @media (min-width: ${breakpoints.md}) and (max-width: ${breakpoints.lg}) {
      ${css(...args)}
    }
  `,
  xl: (...args) => css`
    @media (min-width: ${breakpoints.lg}) and (max-width: ${breakpoints.xl}) {
      ${css(...args)}
    }
  `,
  xxl: (...args) => css`
    @media (min-width: ${breakpoints.xl}) {
      ${css(...args)}
    }
  `,
  mobile: (...args) => css`
    @media (max-width: ${breakpoints.md}) {
      ${css(...args)}
    }
  `,
  tablet: (...args) => css`
    @media (min-width: ${breakpoints.md}) and (max-width: ${breakpoints.lg}) {
      ${css(...args)}
    }
  `,
  desktop: (...args) => css`
    @media (min-width: ${breakpoints.lg}) {
      ${css(...args)}
    }
  `
};
