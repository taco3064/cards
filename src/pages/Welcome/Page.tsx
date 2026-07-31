import Markdown, { type Components } from 'react-markdown';

import README from 'README.md?raw';
import Container from '~app/styles/Container';
import Typography from '~app/styles/Typography';

// react-markdown hands every custom component a `node` prop. styled-components
// does not recognise it and forwards it to the DOM, so strip it here — defined
// outside the render so the component identities stay stable.
const COMPONENTS: Components = {
  h1: ({ node: _node, ...props }) => <Typography.H1 {...props} />,
  strong: ({ node: _node, ...props }) => <Typography.Strong {...props} />,
};

export default function WelcomePage() {
  return (
    <Container.Base
      $direction="column"
      $alignItems="flex-start"
      $lineHeight={2}
      $width="sm"
    >
      <title>Cards | Welcome</title>

      <Markdown components={COMPONENTS}>
        {README.substring(
          README.indexOf('# About Cards'),
          README.indexOf('<!-- About Cards End -->'),
        )}
      </Markdown>
    </Container.Base>
  );
}
