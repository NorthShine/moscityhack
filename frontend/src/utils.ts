import { CSSObject } from '@emotion/react';
import { Palette, PaletteColor, Theme } from '@mui/material';
import { WhitelistParams } from 'types';

export const createGradientStyles = (variant: keyof Palette) => (theme: Theme): CSSObject => {
  const color = theme.palette[variant] as PaletteColor;
  return {
    background: `linear-gradient(
        to bottom right, 
        ${color.dark},
        ${color.main} 
      )`,
    position: 'relative',
    boxShadow: 'none',
    '&:hover': {
      boxShadow: 'none'
    },
    '&:hover::before': {
      opacity: 0
    },
    '&:before': {
      transition: 'all 200ms ease-in-out',
      opacity: 1,
      content: '""',
      position: 'absolute',
      inset: 0,
      background: `linear-gradient(
          to right, 
          ${color.main}, 
          ${color.dark}
        )`,
      zIndex: '-1',
      transform: 'translateY(15%) scale(.80)',
      filter: 'blur(15px)'
    }
  };
};

export const createSearchURLParams = (data: WhitelistParams): string => {
  const params = new URLSearchParams();
  Object.entries(data).forEach(([key, value]) => {
    params.append(key, value);
  });
  return params.toString();
};
