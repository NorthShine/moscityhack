import { Button, ButtonProps } from '@mui/material';
import { useStyles } from 'hooks/useStyles';
import styles from './styles';

interface GradientButtonProps extends ButtonProps {
  shadowed?: boolean
}

export const GradientButton = (props: GradientButtonProps) => {
  const { children, color, shadowed, ...rest } = props;
  const css = useStyles(styles, 'GradientButton');

  const composedStyles = [
    css[color || 'inherit']
  ];

  if (!shadowed) {
    composedStyles.push(css.noShadow);
  }

  return (
    <Button
      css={composedStyles}
      {...rest}
    >
      {children}
    </Button>
  );
};
