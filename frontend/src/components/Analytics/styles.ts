import type { Styles } from 'types';

const styles: Styles = {
  root: {
    width: 'auto',
    padding: '0 20px 40px',
    textAlign: 'center'
  },
  title: {
    marginTop: 20
  },
  row: {
    '&:last-child td, &:last-child th': { border: 0 }
  },
  key: {
    fontWeight: 'bold'
  },
  link: (theme) => ({
    color: theme.palette.primary.main,
    textDecoration: 'none'
  })
};

export default styles;
