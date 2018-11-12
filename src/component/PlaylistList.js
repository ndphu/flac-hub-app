import React from "react";
import Playlist from "./Playlist";


class PlaylistList extends React.Component {
    render = () => {
        const onPlaylistClick = this.props.onPlaylistClick;
        const playlists = this.props.playlists ? this.props.playlists : [];

        return (
            <div>
                {playlists.length === 0 && <div>No Playlist found</div>}
                {playlists.length > 0 && playlists.map((playlist, idx) =>
                    <Playlist playlist={playlist} key={`playlist-${idx}-${playlist._id}`}
                    onClick={onPlaylistClick}/>)}
            </div>
        )
    }
}

export default PlaylistList;