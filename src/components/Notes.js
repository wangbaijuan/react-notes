import React, {Component} from 'react';
import Note from './Note'

class Notes extends Component {

    render() {
        return (
            <div>
                <h2>Notes</h2>
                <Note/>
            </div>
        )
    }
}

export default Notes;