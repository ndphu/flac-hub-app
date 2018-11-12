import React from 'react';

import Playlist from "../component/Playlist"
import api from '../api/Api';
import playlistService from '../service/PlaylistService';
import PlaylistExpansion from "./PlaylistExpansion";

class PlaylistPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            playlists: []
        }
    };

    componentDidMount = () => {
        this.loadPlaylist();
    };

    loadPlaylist = () => {
        playlistService.getPlaylists().then((playlists) => {
            this.setState({playlists: playlists})
        })
    };

    render = () => {
        return (
            <div>
                <h1>Your Playlist</h1>
                <div>
                    {this.state.playlists && this.state.playlists.map((playlist, i) => {
                        return (
                            <PlaylistExpansion playlist={playlist}
                                               key={`${playlist._id}`}>
                            </PlaylistExpansion>)
                    })}
                </div>
            </div>
        )
    }
}

export default PlaylistPage;