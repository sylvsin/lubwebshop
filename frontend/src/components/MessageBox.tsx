import Alert from 'react-bootstrap/Alert';

export default function MessageBox(props: any) {
  return <Alert variant={props.variant || 'info'}>{props.children}</Alert>;
}
