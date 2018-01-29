'use strict'
import React from 'react'

import style from './style'

class MainPage extends React.Component {
  render() {
    return (
      <div>
        <h1>Notepad SPA</h1>
        <hr/>
        <h5>This is a notepad single page application written in node using babel, expressjs, react, webpack, bootstrap, and sqlite3.</h5>
        <h5>The source code can be found <a href="https://github.com/iam4722202468/Notepad">on my github</a></h5>
        <br/>
        <h3>Features</h3>
        <hr/>
        <div className={style.moveRight}>
          <h5>Viewing Notes</h5>
          <p>Notes can be viewed in the View a note tab. Each note has a name, ID, date created/edited and character length field, as well as buttons to edit, delete and download the note.</p>
          <p>Notes can be downloaded in PDF format. This PDF contains the note name, time created/edited, and the note value (using a monospace font so ascii art looks cool). Clicking on the note name in the pdf will bring the user to a page which allows them to edit the note.</p>
          <hr/>
          <h5>Creating and Editing Notes</h5>
          <p>Notes can be created in the create a note tab. Once a note has been created the name of it can't be edited, but the value of it can be. Every edit will result in an updated edit time on the note.</p>
          <p>When editing notes, the note can be viewed using markdown formatting.</p>
          <h5>Other Features</h5>
          <p>This site uses SASS for CSS. It also looks nice on mobile devices</p>
          <hr/>
        </div>
        <i>Created by Alexander Parent for Focus21</i>
      </div>
    )
  }
}

export default MainPage
