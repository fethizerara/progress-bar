
import React from "react";
import { render } from "react-dom";
import jQuery from "jquery";

class ProgressBar extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            progress: this.props.initialValue || 0
        };
    }

    componentDidMount() {

        function downloadFile(fileName) {

            var deferred = jQuery.Deferred();

            var progress = 0;

            var notifyIntervalId = setInterval(
                () => {
                    console.log('notify called');

                    if (progress < 100) {
                        progress++;
                    }

                    deferred.notify(progress);
                },
                100
            );

            setTimeout(
                () => {
                    console.log('final notify and resolve called');
                    deferred.notify(100);
                    deferred.resolve('File downloaded')
                    clearInterval(notifyIntervalId);
                },
                10000
            );

            setTimeout(
                () => {
                    console.log('reject called');
                    deferred.reject('Oups ! File download failed !');
                    clearInterval(notifyIntervalId);
                },
                15000
            );

            return deferred.promise();
        }

        var showProgress = (percentage) => {
            console.log('Progress: ' + percentage + ' % ');

            this.setState(state => Object.assign({}, state, { progress: percentage }));
        }

        downloadFile()
            // onSuccess, onError, onProgress
            .then(console.log, console.error, showProgress)
    }

    render() {
        // return <ProgressBar progress={50} />

        return (
            <div className="progress-bar-container">
                <div className="progress-bar" style={{ width: this.state.progress + '%' }}></div>
            </div>
        );
    }

}

render(<ProgressBar />, document.getElementById("app"));

