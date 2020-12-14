import { Fragment } from 'react';

import Code from '../components/code';

// Default mapping of code fences is a `pre` in which `code` is nested.
// Mute `pre` with a fragemnt and hand over formatting to `Prism`.
const components = {
  pre: Fragment,
  code: Code,
};
export default components;
