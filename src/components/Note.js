import React, {Component} from 'react';
import Editor from './Editor'

class Note extends Component {

    render() {
        return (
            <div>
                <h3>Note</h3>
                <Editor />
            </div>
        )
    }
}

export default Note;