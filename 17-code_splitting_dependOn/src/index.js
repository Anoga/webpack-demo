import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.less';
import favicon from '/public/images/favicon.png'
import _ from 'lodash';

if(module.hot) {
    module.hot.accept();
}

const root = ReactDOM.createRoot(document.getElementById('root'));

class HelloWorld extends React.Component {
    render() {
        return <div className='hello-text'>
            Hello World from index, {_.join(['color', 'is', 'chocolate'], ' ')}
            <img src={favicon} />
        </div>
    }
}

root.render(<HelloWorld />)