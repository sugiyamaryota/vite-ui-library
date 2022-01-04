import {forwardRef, ReactNode} from 'react';
import {btn} from '@/components/Button/button.module.css';

interface Props {
  children: ReactNode;
}

const Button = forwardRef<HTMLDivElement, Props>(
  ({children}, ref): JSX.Element => {
    return (
      <div className={`${btn}`} ref={ref}>
        {children}
      </div>
    );
  }
);
Button.displayName = "Button"

export default Button;
