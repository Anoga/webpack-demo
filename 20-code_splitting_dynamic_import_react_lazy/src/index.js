import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.less';
import favicon from '/public/images/favicon.png'

if(module.hot) {
    module.hot.accept();
}

const LazyLoadedComponent = lazy(() => import(/* webpackChunkName: "lazy-color-chunk" *//* webpackMode: "lazy" */'./components/lazy_color'));

const root = ReactDOM.createRoot(document.getElementById('root'));
class HelloWorld extends React.Component {
    constructor() {
        super();
        this.state = {
            lazyComponent: null,
        }
    }

    loadLazyComponent = () => {
        this.setState({
            lazyComponent: <LazyLoadedComponent color="chocolate" />,
        });
    };

    render() {
        return <div className='hello-text'>
            Hello World from index
            <img src={favicon} />
            <br />
            <button onClick={this.loadLazyComponent}>Load Lazy Color</button>
            <Suspense fallback={<div>Loading...</div>}>
                {this.state.lazyComponent}
            </Suspense>
        </div>
    }
}

root.render(<HelloWorld />)