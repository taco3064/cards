import Markdown from 'react-markdown';

import README from 'README.md?raw';
import Container from '~app/styles/Container';

export default function HomePage() {
  return (
    <Container.Base $direction="column" $alignItems="flex-start" $width="sm">
      <Markdown>
        {README.substring(README.indexOf('# Cards'), README.indexOf('---'))}
      </Markdown>
    </Container.Base>
  );
}
