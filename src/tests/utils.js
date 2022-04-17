import { render } from '@testing-library/react';

/**
 * returns a custom renderer with some options passed
 * @param {ReactElement} component  Any React element
 */
export const customRenderer = (component) => render(component, { legacyRoot: true });

export * from '@testing-library/react';
