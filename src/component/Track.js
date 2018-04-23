import React from 'react';
import {Paper} from 'material-ui';
import navigationService from '../service/NavigationService';

function getDurationString(sec) {
  const minutes = Math.floor(sec / 60);
  const seconds = sec - (minutes * 60);
  let str = '';
  
  if (minutes > 0) {
    str += minutes + 'm';
  }
  str += seconds + 's';
  
  return str;
}

class Track extends React.Component {
  render = () => {
    const item = this.props.item;
    const onItemClick = this.props.onItemClick;
    return (
      <Paper className={'c-track-container'}>
        <span onClick={() => {
          onItemClick(item)
        }}
              className={'c-track-title'}>
          {item.title}
        </span>
        <span className={'c-track-artist-container'}>
          {item.artist.split(';').map((e, i ,arr) =>
              <span className={'c-track-artist'}
                    onClick={() => navigationService.goToArtistSearch(e)}>{e}
                {i < arr.length - 1 && <span>{', '}</span>}</span>
          )}
        </span>
        <span className={'c-track-quality'}>{item.quality}</span>
        <span> - </span>
        <span className={'c-track-duration'}>{getDurationString(item.duration)}</span>
        {item.sources && item.sources.length &&
        <div className={'c-track-download-container'}>
          {item.sources.map(source => {
            return (
              <a className={'c-track-download-link'}
                 href={source.source}
                 target="_blank">{source.quality}</a>
            )
          })}
        </div>}
      </Paper>
    )
  }
}

export default Track;