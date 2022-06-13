import type { Styles } from 'types';

const styles: Styles = {
  root: {
    width: 'auto',
    padding: '0 20px 40px',
    textAlign: 'center'
  },
  title: {
    marginTop: 50,
    textAlign: 'left',
    paddingLeft: 5,
    fontWeight: '600'
  },
  item: {
    '[role="button"]': {
      padding: '2px 5px !important'
    }
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
