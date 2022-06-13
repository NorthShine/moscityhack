import type { Styles } from 'types';

const styles: Styles = {
  root: { width: '100%', bgcolor: 'background.paper' },
  form: {
    display: 'flex',
    gap: 10,
    padding: '10px 0'
  },
  text: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden'
  },
  listItem: {
    paddingRight: '120px !important'
  }
};

export default styles;
