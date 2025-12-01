import Markdown from 'react-markdown';

import README from 'README.md?raw';
import Container from '~app/styles/Container';
import Typography from '~app/styles/Typography';

export default function WelcomePage() {
  return (
    <Container.Base
      $direction="column"
      $alignItems="flex-start"
      $lineHeight={2}
      $width="sm"
    >
      <title>Cards | Welcome</title>

      <Markdown components={{ h1: Typography.H1, strong: Typography.Strong }}>
        {README.substring(README.indexOf('# About Cards'), README.indexOf('---'))}
      </Markdown>
    </Container.Base>
  );
}
