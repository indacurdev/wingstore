import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setCountries } from '@/store/slices/app';

function AppPageRenderer(props) {
    const dispatch = useDispatch();
    const appState = useSelector(state => state.app);

    // console.log('-----');
    // console.log(props);
    // console.log(appState);

    const setInitialConfig = async () => {
        if(appState.countries.length <= 0){
            await dispatch(setCountries(props.data.countriesList));
        }
    }

    useEffect(() => {
        setInitialConfig();
    }, []);
    
    return (
        <div>
            {props.children}
        </div>
    );
}

export default AppPageRenderer