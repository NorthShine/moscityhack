import type { Styles } from 'types';

const styles: Styles = {
  root: {
    paddingTop: 40,
    textAlign: 'center'
  },
  title: {
    marginBottom: 20
  },
  subtitle: {
    marginBottom: 40
  },
  tab: (theme) => ({
    backgroundColor: theme.palette.primary.light
  }),
  tabs: {
    marginBottom: 10
  },
  input: {
    marginBottom: 20,
    '&:last-of-type': {
      marginBottom: 30
    }
  }
};

export default styles;
