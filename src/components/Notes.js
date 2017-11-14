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

    createEntity = () => {
        loadCollection('notes')
            .then((collection) => {
                const entity = collection.insert({
                    body: ''
                })

                db.saveDatabase();
                this.setState((prevState) => {
                    const _entities = prevState.entities;
                    _entities.unshift(entity);
                    return {
                        entities: _entities
                    }
                })
            })
    }
    destoryEntity = (entity) => {

        
        // var _entities = this.state.entities.filter((_entity) => {
        //     return _entity.$loki !== entity.$loki;
        // });

        // this.setState({
        //     entities: _entities
        // });
        

        this.setState((preState) => {
            return {
                entities: preState.entities.filter(_entity => (_entity.$loki !== entity.$loki))
            };
        })

        console.log(this.state.entities);

        loadCollection('notes')
            .then((collection) => {
                collection.remove(entity);
                db.saveDatabase();
            })


    }

    render() {

        const entities = this.state.entities;
        const noteItems = entities.map((entity) => {
                return (
                    <Note key={entity.$loki} entity={entity} destoryEntity={this.destoryEntity}></Note>
                )
            }
        );

        return (
            <div className='ui container notes'>
                <h2 className="ui horizontal divider header">
                    <i className="paw icon"></i>
                    Notes
                </h2>

                <button className="ui right floated basic violet button" onClick={this.createEntity}>
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