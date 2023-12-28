import React from 'react';
import _ from 'lodash';

const LazyColor = ({ color }) => {
    return <span>
        {_.join(['color', 'is', color], ' ')}
    </span>
}

export default LazyColor;