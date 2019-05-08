import React, {Component} from 'react';
import '../App.css';
import TextField from "@material-ui/core/TextField/TextField";
import api from "../api/Api";
import Typography from "@material-ui/core/Typography/Typography";
import LinearProgress from "@material-ui/core/LinearProgress/LinearProgress";
import TrackList from "../component/TrackList";
import * as queryString from "query-string";
import navigationService from "../service/NavigationService";

class SearchPage extends Component {

    state = {};

    onQueryChanged = (e) => {
        this.setState({
            query: e.target.value,
        });
    };

    monitorKeyUp = (e) => {
        if (e.key === 'Enter') {
            const query = this.state.query;
            let type = this.state.searchType;
            if (!type) {
                type = "all";
            }
            navigationService.goToSearch(query, type);
        }
    };

    componentDidMount = () => {
        const currentProps = queryString.parse(this.props.location.search);
        const currentQuery = currentProps.q;
        const currentType = currentProps.t;
        if (currentQuery && currentQuery.trim() !== "") {
            this.search(currentQuery, currentType);
        }
    };

    componentWillReceiveProps = (nextProps) => {
        const currentProps = queryString.parse(this.props.location.search);
        const currentQuery = currentProps.q;
        const currentType = currentProps.t;

        let nextValues = queryString.parse(nextProps.location.search);
        const nextQuery = nextValues.q;
        const nextType = nextValues.t;
        if (nextQuery && nextQuery !== currentQuery) {
            this.search(nextQuery, nextType);
        }
    };

    search = (query, type) => {
        const _this = this;
        this.setState({
            query: query,
            searchType: type,
        }, function () {
            _this.performSearch();
        });
    };

    performSearch = () => {
        const _this = this;
        this.setState({loading: true}, function () {
            api.post(`/search`, {
                searchType: _this.state.searchType,
                query: _this.state.query,
            }).then(resp => {
                this.setState({
                    resultQuery: resp.request.query,
                    result: resp.result,
                    loading: false,
                });
            }).catch(err => {
                console.error(err);
                _this.setState({loading: false});
            })
        });

    };

    render() {
        const {resultQuery, result, loading} = this.state;
        return (
            <div>
                <TextField value={this.state.query}
                           fullWidth
                           // variant={"outlined"}
                           placeholder={"Song name, Artists..."}
                           autoFocus
                           onKeyUp={this.monitorKeyUp}
                           onChange={this.onQueryChanged}>
                </TextField>
                {loading &&
                <LinearProgress variant={"indeterminate"} color={"primary"} style={{marginTop: 8, marginBottom: 8}}/>}
                {resultQuery &&
                <Typography gutterBottom
                            style={{marginTop: 8}}
                            color={"primary"}
                            variant={"caption"}
                >
                    Search result for "{resultQuery}"
                </Typography>}
                {result && result.length === 0 &&
                <Typography gutterBottom
                            color={"textPrimary"}
                            variant={"h4"}
                >
                    No result
                </Typography>}
                {result && result.length > 0 && <TrackList tracks={result}/>}
            </div>
        );
    }
}

export default SearchPage;
