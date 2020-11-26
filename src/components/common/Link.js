import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';

export default function Link(props) {
  return <ReactRouterLink {...props} style={{ color: '#475ac6' }} />;
}
