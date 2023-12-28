import React from 'react';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('root'));

class HelloWorld extends React.Component {
    render() {
        return <div>Hello World</div>
    }
}

root.render(<HelloWorld />)