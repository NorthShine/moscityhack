import type { Styles } from 'types';
import { createGradientStyles } from '../../utils';

const styles: Styles = {
  root: {
    marginTop: 30,
    marginBottom: 30,
    padding: 20
  },
  content: {
    display: 'flex',
    gap: '10%',
    alignItems: 'center',
    flexDirection: 'row',
    '@media (max-width: 500px)': {
      flexDirection: 'column-reverse'
    }
  },
  title: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    marginBottom: 10,
    fontWeight: '600'
  },
  url: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    marginBottom: 10
  },
  link: (theme) => ({
    color: theme.palette.primary.main,
    textDecoration: 'none'
  }),
  text: {
    overflow: 'hidden',
    color: '#555a5f',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: '3',
    WebkitBoxOrient: 'vertical'
  },
  alert: {
    marginTop: 20,
    textAlign: 'left'
  },
  infoContainer: {
    width: '60%',
    padding: '0 !important',
    '@media (max-width: 500px)': {
      width: '100%',
      marginBottom: '20px !important'
    }
  },
  resultContainer: {
    padding: '40px 0 !important',
    width: '30%',
    '@media (max-width: 500px)': {
      width: '100%'
    }
  },
  result: {
    fontWeight: '700'
  },
  error: createGradientStyles('error'),
  success: createGradientStyles('success'),
  warning: createGradientStyles('warning')
};

export default styles;
