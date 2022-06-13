import type { Styles } from 'types';

const styles: Styles = {
  root: {
    paddingTop: 40,
    textAlign: 'center'
  },
  title: {
    marginBottom: 20
  },
  row: {
    '&:last-child td, &:last-child th': { border: 0 }
  },
  key: {
    fontWeight: 'bold'
  }
};

export default styles;
