import React, {useEffect} from 'react'
import { useRouter } from 'next/router'
import Loader from '@/components/Loader'
import { useAuth } from '@/context/auth';

function logout() {
    const auth = useAuth();
    const router = useRouter();

    const redirectToLogin = async (code) => {
        await auth.handleLogout();
        if(!code){
            router.push('/login');
        }else{
            router.push(`/login?msg=${code}`);
        }
    }

    useEffect(() => {
        const {error} = router.query;
        redirectToLogin(error);
    }, []);
    
    return (
        <Loader />
    );
}

export default logout