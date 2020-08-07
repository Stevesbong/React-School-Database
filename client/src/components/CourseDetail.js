import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class CourseDetail extends Component {

    constructor(props) {
        super(props)
        this.state = {
            title:'',
            description:[],
            estimatedTime:'',
            materialsNeeded:[],
            user:'',
            authenticatedUser:'',
            courseId:'',
        }
    }

    componentDidMount() {
        const { context } = this.props;
        const { id } = this.props.match.params;
        let desc, materials;
        context.data.getCourse(id)
        .then(res => {
            res.description !== null || res.description !==undefined ? desc = res.description.split('\n') 
            : desc = res.description

            res.materialsNeeded !== null ? materials = res.materialsNeeded.split('\n') 
            : materials = res.materialsNeeded

            this.setState({
                title: res.title,
                description: desc,
                estimatedTime: res.estimatedTime,
                materialsNeeded: materials,
                user: res.user,
                authenticatedUser: context.authenticatedUser,
                courseId: id
            })
        })
    }
    render() {
        const { title, courseId, user, description, estimatedTime, materialsNeeded } = this.state;
        return (
            <div>
                <div className="actions--bar">
                    <div className="bounds">
                        <div className="grid-100">
                            <span>
                                <Link className="button" to={`/courses/${courseId}`} >Update Course</Link>
                                <Link className="button" to={`/courses/delete/${courseId}`} >Delete Course</Link>
                            </span>
                            <Link className="button button-secondary" to="/">Return to List</Link>
                        </div>
                    </div>
                </div>
                <div className="bounds course--detail">
                    <div className="grid-66">
                        <div className="course--header">
                            <h4 className="course--label">Course</h4>
                            <h3 className="course--title">{title}</h3>
                            <p>{user.firstName} {user.lastName}</p>
                        </div>
                        <div className="course--description">
                            { description.map( ( desc, index ) => 
                                desc !== '' ? (<p key={index}>{desc}</p>) 
                                : (<p key={index} style={{display:'none'}}>{desc}</p>)
                            ) }
                        </div>
                    </div>
                    <div className="grid-25 grid-right">
                        <div className="course--stats">
                            <ul className="course--stats--list">
                                <li className="course--stats--list--item">
                                    <h4>Estimated Time</h4>
                                    { estimatedTime ? (<h3>{estimatedTime}</h3>) 
                                        : (<h3>None</h3>)
                                    }
                                </li>
                                <li className="course--stats--list--item">
                                    <h4>Materials Needed</h4>
                                    <ul>
                                        { materialsNeeded ?

                                            ( materialsNeeded.map( ( material, index ) => 
                                                material !== '' ? (<li key={ index }>{ material }</li>)
                                                : (<li key={ index } style={{ display:'none' }}>{ material }</li>) 
                                            ) )
                                            : (<li>No Needed</li>)
                                         }
                                        
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
