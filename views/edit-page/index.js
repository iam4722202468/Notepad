'use strict'
import React from 'react'
import style from './style'
import axios from 'axios'

import Remarkable from 'remarkable';
var md = new Remarkable();

import { Button, Form, FormGroup, Label, Input, FormText, InputGroup, Collapse, Col, Row} from 'reactstrap';

class EditPage extends React.Component {
  constructor() {
    super();
    this.toggle = this.toggle.bind(this);
    this.onExited = this.onExited.bind(this);
    
    this.state = {
      noteName: '',
      noteValue: '',
      id:0,
      message: '',
      isHidden: true,
      leftSide: '12',
      rightSide: '0',
      hideInvalid: {display: "block"}
    };
  }
  
  onExited() {
    this.setState({leftSide: '12', rightSide: '0'});
  }
  
  toggle() {
    this.setState({ collapse: !this.state.collapse });
    if (!this.state.collapse)
      this.setState({leftSide: '6', rightSide: '6'});
  }
  
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }
  onSubmit = (e) => {
    e.preventDefault();
    const { noteName, noteValue, id } = this.state;
    
    axios.put(`/note/${this.state.id}`, { id, noteName, noteValue })
      .then((result) => {
        this.setState({
          isHidden: !this.state.isHidden,
          message: "Updated"
        })
        
        this.timer = setTimeout(_ => {
          this.setState({isHidden: !this.state.isHidden});
        }, 2000); // animation timing offset
      });
  }
  componentDidMount() {
    let params = this.props.params;
    
    axios.get(`/note/${params.id}`)
    .then(({ data: data }) => {
      if (data.notes.length == 1) {
        let note = data.notes[0]
        this.setState({ id: note.id, noteName: note.NAME, noteValue: note.VALUE });
      } else {
        this.setState({hideInvalid: {display: "none"}, noteName: "Error: Note ID not found"});
      }
    });
  }
  
  render() {
    const { noteName, noteValue, message, hideInvalid, leftSide, rightSide } = this.state;
    return (
    <div>
      <h4 type="text" name="noteName">{noteName}
        <Button className={style.notification} color="primary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>
          Toggle Markdown
        </Button>
        {!this.state.isHidden && <Message>{message}</Message>}
      </h4>
      
      <Form onSubmit={this.onSubmit}>
        <Row className={style.increaseWidth}>
          <Col xs={leftSide}>
            <FormGroup style={hideInvalid}>
              <textarea placeholder="Enter a note" autoComplete="off" role="textbox" type="text" name="noteValue" value={noteValue} onChange={this.onChange}></textarea>
            </FormGroup>
          </Col>
        
          <Col xs={rightSide}>
            <Collapse onExited={this.onExited} isOpen={this.state.collapse}>
              <div className={style.markdown}>
                <MarkdownViewer source={noteValue}/>
              </div>
            </Collapse>
          </Col>
        </Row>
        
        <div>
        <Button style={hideInvalid} type="submit">Update</Button>
        
        </div>
      </Form>
    </div>
    );
  }
}

var MarkdownViewer = React.createClass({
    render: function() {
        var markdown = md.render(this.props.source);
        return <div className={style.markdownInner} dangerouslySetInnerHTML={{__html:markdown}} />;
    }
});

const Message = (props) => <p className={style.notification}>{props.children}</p>


export default EditPage
