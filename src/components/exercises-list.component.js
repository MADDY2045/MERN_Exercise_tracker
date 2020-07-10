import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Exercise = props => (
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0,10)}</td>
    <td>
      <Link to={"/edit/"+props.exercise._id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
    </td>
  </tr>
)

export default class ExercisesList extends Component {
  constructor(props) {
    super(props);

    this.deleteExercise = this.deleteExercise.bind(this)

    this.state = {
      exercises: [],
      time: new Date().toLocaleString()
    };
  }

  componentDidMount() {
    axios.get('http://localhost:5500/exercises/')
      .then(response => {
        this.setState({ exercises: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
      this.intervalID = setInterval(() => this.tick(),1000);
    }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  tick=()=>{
    this.setState({
      time: new Date().toLocaleString()
    });
  }
  deleteExercise(id) {
    axios.delete('http://localhost:5500/exercises/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      exercises: this.state.exercises.filter(el => el._id !== id)
    })
  }

  exerciseList() {
    return this.state.exercises.map(currentexercise => {
      return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>;
    })
  }


  render() {
    return (
      <div>
        <div className='container'>
          <div className='col-12 card ' style={{margin:'15px'}}>
              <div className='row '>
              <h1 className='col-6 justify-content' style={{marginTop:'10px'}}>Logged Exercises</h1>
              <p className='col-6 text text-info text-right ' >{this.state.time}</p>
          </div>
        </div>
      </div>


        <table className="table table-bordered table-striped">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.exerciseList() }
          </tbody>
        </table>
      </div>
    )
  }
}