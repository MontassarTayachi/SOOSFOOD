import Card from 'react-bootstrap/Card';

function BgColorExample(props) {
  return (
  
        <Card
        key={props.BgColor}
        text={props.BgColor.toLowerCase() === 'light' ? 'dark' : 'white'}
          bg={props.BgColor.toLowerCase()}
          style={{ width: '15rem' }}
          className="mb-2"
        >
          <Card.Header>{props.header}</Card.Header>
          <Card.Body>
            <Card.Title> {props.title}</Card.Title>
            <Card.Text>
             <p>Poid Total:   {props.text1} kg</p> 
             <p>Nombre Total:   {props.text2} </p> 
              
            </Card.Text>
          </Card.Body>
        </Card>
    
  );
}

export default BgColorExample;