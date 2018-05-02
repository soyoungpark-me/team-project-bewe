import React, { Component } from 'react';
import Footer from 'components/layout/footer/Footer';
import BodyComponent from 'components/layout/body/BodyComponent';
import VideoPlayer from 'components/layout/body/VideoPlayer';

class Home extends Component {
    render() {
        return (
            <div>
                <VideoPlayer />
                <p/>
                <BodyComponent />
                <hr/>
                
                <Footer />
            </div>
        );
    }
}

export default Home;