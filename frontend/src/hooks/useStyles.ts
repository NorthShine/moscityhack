import { css, SerializedStyles } from '@emotion/react';
import type { Styles } from 'types';
import { theme } from '../theme';

interface CSSStyles {
  [key: string]: SerializedStyles
}

export const useStyles = (styles: Styles, name?: string) => {
  const styling = Object.entries(styles)
    .reduce((acc: CSSStyles, [key, value]) => {
      const style = typeof value === 'function'
        ? value(theme)
        : value;
      const label = name ? `${name}-${key}` : key;
      acc[key] = css(style, { label });
      return acc;
    }, {});
  return styling;
};
