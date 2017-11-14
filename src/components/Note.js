import React, {Component} from 'react';
import Editor from './Editor';
import moment from 'moment';
import 'moment/locale/zh-cn'; // 格式化日期
import _ from 'lodash'; // 截取字符
import {loadCollection, db} from '../database/index'

moment.locale('zh-CN')

class Note extends Component {

    state = {
        entity : this.props.entity,
        body: this.props.entity.body,
        updated: this.props.entity.meta.updated || this.props.entity.meta.created,
        open: false,
        destoryEntity: this.props.destoryEntity
    }

    updated() {
        return moment(this.state.updated).fromNow();
    }

    header() {
        return _.truncate(this.state.body, {
            length:30
        }) || "新建笔记";
    }

    words() {
        return this.state.body.length;
    }
    toggle = () => {
        this.setState((prevState) => {
            console.log(prevState);
            return {
                open: !prevState.open
            }
        });
    }

    toggleFu() {
        this.setState((prevState) => {
            console.log(prevState);
            return {
                open: !prevState.open
            }
        });
    }

    updateEntity = (event) => {
        const _body = event.target.value;
        this.setState({
            body: _body
        });

        loadCollection('notes')
            .then((collection) => {
                const entity = this.state.entity;
                entity.body = _body;
            collection.update(entity);
            db.saveDatabase();
        })
    }

    componentDidUpdate() {
        console.log("note did update", this.state.body)
    }


    render() {
        return (
            <div className="item">
                <div className="meta">
                    {this.updated()}
                </div>
                <div className="content">
                    <div className="header" onClick={this.toggle}>
                        {this.header()}
                    </div>
                    {/* <div className="header" onClick={this.toggleFu.bind(this)}>
                        {this.header()}
                    </div> */}
                    <div className="extra">
                        {this.state.open && 
                        
                        <Editor entity={this.state.entity} 
                            updateEntity={this.updateEntity}/>
                        
                        }
                        {this.words()} 字
                        {this.state.open && 
                            <i className="right floated trash outline icon" onClick={() => this.state.destoryEntity(this.state.entity)}>
                            
                            </i>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default Note;