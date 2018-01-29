'use strict'
import React from 'react'
import style from './style'
import axios from 'axios'

import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class AddPage extends React.Component {
  
constructor() {
        super();
        this.state = {
          noteName: '',
          noteValue: ''
        };
      }
      
      onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
      }

      onSubmit = (e) => {
        e.preventDefault();
        const { noteName, noteValue } = this.state;

        axios.post('/note/add', { noteName, noteValue })
          .then((result) => {
            if (result.data.error = "OK")
              this.props.history.push('/edit/'+result.data.lastID)
          });
      }
      
      render() {
        const { noteName, noteValue } = this.state;
        return (
        <Form onSubmit={this.onSubmit}>
          
          <FormGroup>
          <Label for="noteName">Note Name</Label>
          <Input type="text" name="noteName" autoComplete="off" value={noteName} onChange={this.onChange} placeholder="New Note Name" />
          </FormGroup>
          
          <FormGroup>
            <textarea placeholder="Enter a note" autoComplete="off" role="textbox" type="text" name="noteValue" value={noteValue} onChange={this.onChange}></textarea>
          </FormGroup>
          
        <Button type="submit">Create</Button>
        </Form>
        );
      }

}

export default AddPage
