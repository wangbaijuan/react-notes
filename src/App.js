import React, {Component} from 'react';
import Notes from './components/Notes'
import 'semantic-ui-css/semantic.min.css'
import './index.css'

class App extends Component {

    render() {
        return (
            <article>
                <Notes/>
            </article>
        )
    }
}

export default App;