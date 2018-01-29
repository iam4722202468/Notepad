'use strict'
import React from 'react'
import style from './style'
import axios from 'axios'
import FileSaver from 'file-saver';

import { Link } from 'react-router'
import { Container, Row, Col, Card, CardTitle, ButtonGroup, Button, CardText } from 'reactstrap';
  
class EditPage extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      notes: []
    }
    this.fetch.call(this)
  }

  downloadFile = (id) => {
    axios({
      method:'get',
      url:`/note/${id}?fileType=PDF`,
      responseType:'blob'
    })
    .then((result) => {
      console.log(result)
      var blob = new Blob([result.data]);
      FileSaver.saveAs(blob, result.headers['content-disposition']);
    });
  }
  async fetch() {
    axios.get('/note')
      .then(({ data: notes }) => {
      this.setState({ notes: notes.notes })
    });
  }
  handleDelete = (id) => {
    axios.delete(`/note/${id}`)
      .then((result) => {
        if (result.data.error = "OK") {
          const index = this.state.notes.findIndex(obj => obj.id === id);
          const newData = [
              ...this.state.notes.slice(0, index),
              ...this.state.notes.slice(index + 1)
          ]
          
          this.setState({ notes: newData })
          this.context.refresh()
        }
      });
  }
  render() {
    let mappedVars = this.state.notes.map((note) => (
      <div key={note.id}>
        <Card body className="text-left">
          <CardTitle>{note.NAME}</CardTitle>
          <p>ID: {note.id}</p>
          <i>Created: {note.CREATED}</i>
          <i>Edited: {note.EDITED}</i>
          <p>{note.LENGTH} characters long</p>
          <ButtonGroup>
            <Link to={`edit/${note.id}`}><Button color="primary">Edit Note</Button></Link>
            <Link to="/view" onClick={() => this.handleDelete(note.id)}><Button color="danger">Delete Note</Button></Link>
            <Button onClick={() => this.downloadFile(note.id)} color="info">Download</Button>
          </ButtonGroup>
        </Card>
        <br/>
      </div>
      )
    )
    
    var d1 = mappedVars.filter((_,i) => i % 3 == 0);
    var d2 = mappedVars.filter((_,i) => i % 3 == 1);
    var d3 = mappedVars.filter((_,i) => i % 3 == 2);
    
    return (
      <div>
        <Row>
          <Col xl="4">{d1}</Col>
          <Col xl="4">{d2}</Col>
          <Col xl="4">{d3}</Col>
        </Row>
      </div>
    )
  }
}

export default EditPage
