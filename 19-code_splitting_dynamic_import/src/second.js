import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './second.less';
import favicon from '/public/images/favicon.png'

if(module.hot) {
    module.hot.accept();
}

const root = ReactDOM.createRoot(document.getElementById('root'));

const HelloWorld = () => {
    const [lazyComponent, setLazyComponent] = useState(null);

    const loadLazyComponent = async () => {
        const module = await import('./components/lazy_color');
        const LazyLoadedColor = module.default;
        setLazyComponent(<LazyLoadedColor color={'pink'} />);
    };
    return <div className='hello-text'>
        Hello World from second
        <img src={favicon} />
        <br />
        <button onClick={loadLazyComponent}>Load Lazy Component</button>
        {lazyComponent}
    </div>
}

root.render(<HelloWorld />)