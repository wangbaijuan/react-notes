import React, {Component} from 'react';
import Notes from './components/Notes'
import 'semantic-ui-css/semantic.min.css'
import './index.css'

class App extends Component {

    render() {
        return (
            <div>
                <h1>Welcome! Shaonian</h1>
                <Notes/>
            </div>
        )
    }
}

export default App;