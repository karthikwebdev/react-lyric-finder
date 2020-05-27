import React, { Component } from 'react'
import Spinner from '../layout/Spinner'
import { Link } from 'react-router-dom'


class Lyrics extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             track:{},
             lyrics:{},
             isLoaded:false
        }
    }
    
    componentDidMount(){
        fetch(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${this.props.match.params.id}&apikey=${process.env.REACT_APP_KEY}`,{
            method:'GET'
        })
        .then(res => res.json())
        .then(data => {
            this.setState({lyrics:data.message.body.lyrics})
            return fetch(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?track_id=${this.props.match.params.id}&apikey=${process.env.REACT_APP_KEY}`,{
                method:'GET'
            })
            .then(res => res.json())
            .then(resdata => {
                this.setState({track:resdata.message.body.track},()=>{
                    this.setState({isLoaded:true})
                })
            })
        })
        .catch(err => console.log(err))
    }

    render() {
        const {track, lyrics,isLoaded} = this.state;
        if(isLoaded && lyrics !== undefined && track !== undefined ){
            return(
                <>
                <Link to="/" className="btn btn-dark">Go back</Link>
                <div className="card">
                    <h5 className="card-header">
                        {track.track_name} by <span className="text-secondary">{ track.artist_name }</span>
                    </h5>
                    <div className="card-body">
                        <p className="card-text"> {lyrics.lyrics_body} </p>
                    </div>
                </div>
                <ul className="list-group">
                    <li className="list-group-item">
                        <strong>Album Id</strong>: {track.album_id}
                    </li>
                   { track.primary_genres.music_genre_list[0] && (<li className="list-group-item">
                        <strong>Song Genre</strong>: {track.primary_genres.music_genre_list[0].music_genre.music_genre_name}
                    </li>)}
                    <li className="list-group-item">
                        <strong> explicit Words </strong>: {track.explicit === 0 ? 'No' : 'Yes'}
                    </li>
                </ul>
                </>
            )  
        }else{
            return <Spinner/>
        }
    }
}

export default Lyrics
