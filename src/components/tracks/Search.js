import React, { Component } from 'react'
import { Consumer } from '../../context'
 
class Search extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             tracktitle:""
        }
       
    }
    render() {
        const findTrack = (dispatch,e) => {
            e.preventDefault();
            fetch(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?q_track=${this.state.tracktitle}&page_size=10&page=1&s_track_rating=desc&apikey=${process.env.REACT_APP_KEY}`,{
                method:'GET'
            })
            .then(res => res.json())
            .then(data => {
                // console.log(data.message.body.track_list)
                dispatch({
                    type:"SEARCH_TRACKS",
                    payload:data.message.body.track_list
                })
                this.setState({tracktitle:""})
            })
            .catch(err => console.log(err))
        }
        return (
            <Consumer>
                {
                    value => {
                        return (
                            <div className="card card-body mb-4 p-4">
                                    <h1 className="display-4 text-center">Search for a Song</h1>
                                    <p className="lead text-center">Get lyrics of any song</p>
                                    <form onSubmit={findTrack.bind(this,value.dispatch)}>
                                        <div className="form-group">
                                            <input type="text" className="form-control form-control-lg" onChange={(e) => { this.setState({[e.target.name]:e.target.value}) }} placeholder="Song Title...." name="tracktitle" value={this.state.tracktitle} />
                                            <button type="submit" className="btn btn-dark btn-block my-3"> Search </button>
                                        </div> 
                                    </form>
                            </div>
                        )
                    }
                }
            </Consumer>
        )
    }
}

export default Search
