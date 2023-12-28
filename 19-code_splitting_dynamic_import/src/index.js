import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.less';
import favicon from '/public/images/favicon.png'

if(module.hot) {
    module.hot.accept();
}

const root = ReactDOM.createRoot(document.getElementById('root'));

class HelloWorld extends React.Component {
    constructor() {
        super();
        this.state = {
            lazyComponent: null,
        }
    }
    loadLazyComponent = async () => {
        try {
            const module = await import(
            /* webpackChunkName: "lazy-color-chunk" */
            /* webpackMode: "lazy" */
            './components/lazy_color');
            const LazyLoadedColor = module.default;
            this.setState({
                lazyComponent: <LazyLoadedColor color={"chocolate"} />,
            });
        } catch (error) {
            console.error('Error loading LazyLoadedComponent:', error);
        }
    };

    render() {
        return <div className='hello-text'>
            Hello World from index
            <img src={favicon} />
            <br/>
            <button onClick={this.loadLazyComponent}>Load Lazy Color</button>
            {this.state.lazyComponent}
        </div>
    }
}

root.render(<HelloWorld />)