'use strict'
import React from 'react'
import style from './style'
import axios from 'axios'

import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class EditPage extends React.Component {
  constructor() {
    super();
    this.state = {
      noteName: '',
      noteValue: '',
      id:0,
      message: '',
      isHidden: true,
      hideInvalid: {display: "block"}
    };
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
    const { noteName, noteValue, message, hideInvalid } = this.state;
    return (
    
    <Form onSubmit={this.onSubmit}>
    <FormGroup>
      <h4 type="text" name="noteName">{noteName}{!this.state.isHidden && <Message>{message}</Message>}</h4>
    </FormGroup>
  
  <FormGroup style={hideInvalid}>
    <textarea placeholder="Enter a note" autoComplete="off" role="textbox" type="text" name="noteValue" value={noteValue} onChange={this.onChange}></textarea>
  </FormGroup>
  
  <Button style={hideInvalid} type="submit">Update</Button>
  </Form>
    );
  }
}

const Message = (props) => <p className={style.notification}>{props.children}</p>


export default EditPage
