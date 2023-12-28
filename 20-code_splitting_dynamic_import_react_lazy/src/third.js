import React, { lazy } from 'react';
import ReactDOM from 'react-dom/client';
import './third.less';
import favicon from '/public/images/favicon.png'
import LazyLoadSuspense from './components/lazy_load_suspense';

if(module.hot) {
    module.hot.accept();
}

const LazyLoadedComponent = lazy(() => import(/* webpackChunkName: "lazy-color-chunk" *//* webpackMode: "lazy" */'./components/lazy_color'));

const root = ReactDOM.createRoot(document.getElementById('root'));

const HelloWorld = () => {
    return <div className='hello-text'>
        Hello World from third
        <img src={favicon} />
        <br />
        <button onClick={() => { window.scrollTo(0, document.body.scrollHeight) }}>monitor network, scroll to bottom</button>
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <LazyLoadSuspense fallback={<div>Loading...</div>}>
            <LazyLoadedComponent color={'red'} />
        </LazyLoadSuspense>
        <br /><br />
    </div>
}

root.render(<HelloWorld />)