import type { Styles } from 'types';

const styles: Styles = {
  root: {
    position: 'fixed',
    width: '100%',
    left: '0',
    right: '0',
    top: '0',
    bottom: '0',
    backgroundColor: 'rgba(255,255,255,0.7)',
    zIndex: 1
  },
  loader: {
    position: 'absolute',
    top: '50%',
    left: '50%'
  }
};

export default styles;
