import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import { Component } from 'react';
import { fetchMap, updateMap } from '../api/mapService';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { getAuth } from '../util/Utils';

class MapComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: 0,
            lng: 0,
            lat_: '',
            lng_: '',
            open: false,
            role: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        fetchMap()
            .then(res => {
                if (res && res.data) {
                    const { lat, lng } = res.data;
                    const auth = getAuth();
                    this.setState({ lat: parseFloat(lat), lng: parseFloat(lng), role: auth.role })
                }
            })

    }

    handleChange(event) {
        event.preventDefault();
        const { name, value } = event.target;
        switch (name) {
            case 'lat': {
                this.setState((prevState) => ({ ...prevState, lat_: value }));
                break;
            }
            case 'lng': {
                this.setState((prevState) => ({ ...prevState, lng_: value }));
                break;
            }
            default: { }
        }
    }

    onSubmit() {
        updateMap({
            lat: parseFloat(this.state.lat_),
            lng: parseFloat(this.state.lng_),
        }).then(() => {
            this.setState((prevState) => ({ ...prevState, lng: parseFloat(this.state.lng_), lat: parseFloat(this.state.lat_), open: false }));

        })
    }

    render() {
        const containerStyle = {
            width: '500px',
            height: '500px'
        }
        return (
            <>
                {this.state.lat !== 0 &&
                    <Map google={this.props.google}
                        initialCenter={{
                            lat: this.state.lat,
                            lng: this.state.lng
                        }}
                        zoom={14}
                        containerStyle={containerStyle}
                    >
                        <Marker title="Hotel Location"
                            onClick={() => this.setState(prevState => ({ ...prevState, open: true }))}
                            position={{ lat: this.state.lat, lng: this.state.lng }} />
                        <InfoWindow >
                            <div>
                                <h1>Hotel Location</h1>
                            </div>
                        </InfoWindow>
                        <button>vat</button>
                    </Map>
                }

                {this.state.role === 'SystemAdmin' &&
                    <Dialog open={this.state.open} onClose={() => this.setState(prevState => ({ ...prevState, open: false }))}>
                        <DialogTitle>Change Hotel Location</DialogTitle>
                        <DialogContent>
                            <TextField
                                autoFocus
                                margin="dense"
                                name="lat"
                                onChange={this.handleChange}
                                label="Latitude"
                                fullWidth
                                variant="standard"
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                name="lng"
                                label="Longitude"
                                onChange={this.handleChange}
                                fullWidth
                                variant="standard"
                            />
                            <br />
                            <br />
                        </DialogContent>
                        <DialogActions>
                            <Button type='submit' onClick={this.onSubmit}>Edit</Button>
                        </DialogActions>
                    </Dialog>
                }
            </>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: ("AIzaSyBOCLRFP3l888pLl3Qzneyvk4Q47jk169s")
})(MapComponent)