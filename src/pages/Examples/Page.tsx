import Button from '~app/styles/Button';
import Container from '~app/styles/Container';
import List from '~app/styles/List';
import Typography from '~app/styles/Typography';

export default function ExamplesPage() {
  return (
    <Container.Base $width="xs" $direction="column" $alignItems="center">
      <title>Cards | Examples</title>
      <Typography.H1>Examples</Typography.H1>

      <List.Base $variant="outlined">
        <List.Item>
          <Button.NavLink
            to="/examples/draw"
            $colors={{ text: '#fff' }}
            $fontSize={18}
            style={{ width: '100%' }}
          >
            Draw
          </Button.NavLink>
        </List.Item>
      </List.Base>
    </Container.Base>
  );
}
