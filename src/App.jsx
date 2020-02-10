import React, { Component } from 'react';
import IsIP from 'is-ip';

import ApiService from './services/api-service';
import Spinner from './spinner';
import ErrorIndicator from './error-indicator';
import ResultView from './result-view';

import './css/app.css';
import './css/bootstrap.min.css';

class App extends Component {
    apiService = new ApiService();

    state = {
        ip: '',
        result: null,
        isLoading: false,
        error: null,
    };

    handleSubmit = async e => {
        e.preventDefault();

        this.setState({
            isLoading: true,
            result: null,
            error: null,
        });

        const { ip } = this.state;

        try {
            const result = await this.apiService.checkConnectivity(ip);

            if (result) {
                this.setState({
                    isLoading: false,
                    result: result,
                });
            }
        } catch (e) {
            this.setState({
                isLoading: false,
                error: e.message,
            });
        }
    };

    handleChange = e => {
        this.setState({ ip: e.target.value });
    };

    render() {
        const { ip, result, isLoading, error } = this.state;

        return (
            <React.Fragment>
                <div className='container-fluid h-100'>
                    <div className='row h-50 align-items-end'>
                        <div className='col-12'>
                            <div className='row justify-content-center'>
                                <div className='col-3 text-center p-3 border border-secondary rounded-lg'>
                                    <form onSubmit={this.handleSubmit}>
                                        <div className='form-group text-left'>
                                            <label className=''>
                                                Check NPM connectivity
                                            </label>
                                            <div className='input-group'>
                                                <input
                                                    type='text'
                                                    className='form-control'
                                                    name='ip'
                                                    value={this.state.ip}
                                                    onChange={this.handleChange}
                                                    placeholder='Enter Host IP'
                                                />
                                                <div className='input-group-append'>
                                                    <input
                                                        className='btn btn-secondary'
                                                        type='submit'
                                                        value='Check'
                                                        disabled={
                                                            isLoading ||
                                                            !IsIP(ip)
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='row h-50 align-items-start'>
                        <div className='col-12'>
                            <div className='row justify-content-center'>
                                <div className='col-3 text-center pt-4'>
                                    {isLoading ? (
                                        <Spinner />
                                    ) : (
                                        result && <ResultView result={result} />
                                    )}
                                    {error && <ErrorIndicator errMsg={error} />}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default App;
