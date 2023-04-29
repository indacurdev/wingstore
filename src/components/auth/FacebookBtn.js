import React from 'react'
import {LoginSocialFacebook} from 'reactjs-social-login';

function FacebookBtn(props) {
  return (
    <div>
        <LoginSocialFacebook
            appId={`${process.env.NEXT_PUBLIC_FACEBOOK_APP_ID}`}
            fieldsProfile={
                'id'
            }
            // onLoginStart={onLoginStart}
            onResolve={({ provider, data }) => {
                const token = data.accessToken;
                // console.log(token);
                props.handleLogin(token);
            }}
            onReject={err => {
                console.log(err);
            }}
            >
            <button type='button' className='btn btn-lg btn-fcb w-100'>
                <i className="fa-brands fa-facebook-f me-sm-3 me-2"></i>
                Facebook
            </button>
        </LoginSocialFacebook>
    </div>
  )
}

export default FacebookBtn