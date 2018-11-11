import React from 'react';
import navigationService from '../service/NavigationService';
import Checkbox from '@material-ui/core/Checkbox/Checkbox';
import Card from '@material-ui/core/Card/Card';

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

  state = {checked: false};

  componentWillReceiveProps = (nextProps) => {
    this.setState({checked: nextProps.item.selected})
  };

  render = () => {
    const item = this.props.item;
    const onItemClick = this.props.onItemClick;
    const onItemSelected = this.props.onItemSelected;
    return (
      <Card className={'c-track-container'}>
        <div className={'c-track-playlist-checkbox'}>
          <Checkbox
            checked={this.state.checked}
            onChange={() => {onItemSelected(item)}}
          />
        </div>
        <div className={'c-track-details-container'}>
          <span onClick={() => {
            onItemClick(item)
          }}
                className={'c-track-title'}>
          {item.title}
          </span>
          {item.artist &&
          <span className={'c-track-artist-container'}>
          {item.artist.split(';').map((e, i, arr) =>
            <span className={'c-track-artist'}
                  key={'track-artist-' + e}
                  onClick={() => navigationService.goToArtistSearch(e)}>{e}
              {i < arr.length - 1 && <span>{', '}</span>}</span>
          )}
          </span>}
          <span className={'c-track-quality'}>{item.quality}</span>
          <span> - </span>
          <span className={'c-track-duration'}>{getDurationString(item.duration)}</span>
          {item.sources && item.sources.length &&
          <div className={'c-track-download-container'}>
            {item.sources.map((source,i) => {
              return (
                <a className={'c-track-download-link'}
                   href={source.source}
                   key={`track-download-link-${source.source}-${i}`}
                   target="_blank">{source.quality}</a>
              )
            })}
          </div>}
        </div>
      </Card>
    )
  }
}

export default Track;