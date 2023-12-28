import React, { useState, lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.less';
import favicon from '/public/images/favicon.png'
import { pure_cube, esm_cube } from './utils';

if (module.hot) {
    module.hot.accept();
}

const LazyLoadedComponent = lazy(() => import(/* webpackChunkName: "lazy-color-chunk" *//* webpackMode: "lazy" */'./components/lazy_color'));

const root = ReactDOM.createRoot(document.getElementById('root'));

const HelloWorld = () => {
    const [lazyComponent, setLazyComponent] = useState(null);

    const loadLazyComponent = async () => {
        setLazyComponent(<LazyLoadedComponent color={'chocolate'} />);
    };
    return <div className='hello-text'>
        Hello World
        <img src={favicon} />
        <br />
        {`esm_cube: 3^2=${esm_cube(3)}`}
        <br />
        {`pure_cube: 3^2=${pure_cube(3)}`}
        <br />
        <button onClick={loadLazyComponent}>Load Lazy Component</button>
        <br />
        <Suspense fallback={<div>Loading...</div>}>
            {lazyComponent}
        </Suspense>
    </div>
}

root.render(<HelloWorld />)