import React from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { Home, List, Recommend, Assessment } from '@mui/icons-material';
import { useHistory } from 'react-router-dom';

const Navigator = () => {
    const history = useHistory();

    return (
        <BottomNavigation className="navigator">
            <BottomNavigationAction label="홈" icon={<Home />} onClick={() => history.push('/main')} />
            <BottomNavigationAction label="썹" icon={<List />} />
            <BottomNavigationAction label="추천" icon={<Recommend />} onClick={() => history.push('/recommendations')} />
            <BottomNavigationAction label="현황" icon={<Assessment />} />
        </BottomNavigation>
    );
};

export default Navigator;