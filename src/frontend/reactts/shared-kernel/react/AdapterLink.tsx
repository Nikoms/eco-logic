// @ts-ignore
import { LinkProps, NavLink } from 'react-router-dom';
// The usage of React.forwardRef will no longer be required for react-router-dom v6.
// see https://github.com/ReactTraining/react-router/issues/6056
import * as React from 'react';

const AdapterLink = React.forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => (
  <NavLink innerRef={ref as any} {...props} />
));


export { AdapterLink };
