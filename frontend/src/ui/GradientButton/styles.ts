import type { Styles } from 'types';
import { createGradientStyles } from '../../utils';

const styles: Styles = {
  primary: createGradientStyles('primary'),
  secondary: createGradientStyles('secondary'),
  noShadow: {
    '&:before': {
      content: 'none'
    }
  }
};

export default styles;
