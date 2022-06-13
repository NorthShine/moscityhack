import type { Styles } from 'types';

const styles: Styles = {
  trustbadge: {
    padding: '10px 100px !important',
    '@media (max-width: 600px)': {
      paddingRight: 'inherit !important',
      paddingLeft: 'inherit !important'
    }
  },
  image: {
    width: '100%'
  }
};

export default styles;
