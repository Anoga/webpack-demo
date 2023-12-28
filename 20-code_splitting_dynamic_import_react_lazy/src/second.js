import React, { useState, lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './second.less';
import favicon from '/public/images/favicon.png'

if(module.hot) {
    module.hot.accept();
}

const LazyLoadedComponent = lazy(() => import(/* webpackChunkName: "lazy-color-chunk" *//* webpackMode: "lazy" */'./components/lazy_color'));

const root = ReactDOM.createRoot(document.getElementById('root'));

const HelloWorld = () => {
    const [lazyComponent, setLazyComponent] = useState(null);

    const loadLazyComponent = async () => {
        setLazyComponent(<LazyLoadedComponent color={'pink'} />);
    };
    return <div className='hello-text'>
        Hello World from second
        <img src={favicon} />
        <br />
        <button onClick={loadLazyComponent}>Load Lazy Component</button>
        <Suspense fallback={<div>Loading...</div>}>
            {lazyComponent}
        </Suspense>
    </div>
}

root.render(<HelloWorld />)