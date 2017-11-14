import React, {Component} from 'react';
import Note from './Note'
import {loadCollection, db} from '../database/index'

class Notes extends Component {

    constructor(props) {
        super(props);

        this.getInitData();
    }


    state = {
        entities:[]

    }

    getInitData() {
        loadCollection('notes').then((connection) => {
            // connection.insert([
            //     {body:"hello～"},
            //     {body:'hola~'}
            // ]);
            // db.saveDatabase();
            const enties = connection.chain()
                      .find()
                      .simplesort('$loki','isdesc')
                      .data();
            this.setState({
                entities: enties
            });

            console.log(enties);
        })
    }

    render() {

        const entities = this.state.entities;
        const noteItems = entities.map((entity) => {
                return (
                    <Note key={entity.$loki} entity={entity}></Note>
                )
            }
        );

        return (
            <div className='ui container notes'>
                <h2 className="ui horizontal divider header">
                    <i className="paw icon"></i>
                    Notes
                </h2>

                <button className="ui right floated basic violet button">
                    添加笔记
                </button>
                <div className="ui divided items">
                    {noteItems}
                    <span className="ui small disabled header">
                        还没有笔记，请按下‘添加笔记’按钮
                    </span>
                </div>
               
                
            </div>
        )
    }
}

export default Notes;