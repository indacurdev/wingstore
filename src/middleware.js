import {NextResponse} from 'next/server';
import {jwtVerify} from 'jose';

export async function middleware(request) {

    const nexturl = request.nextUrl;

    if(nexturl.pathname.includes("/cuenta")){
        // console.log(nexturl);
        const token = request.cookies.get('wtoken');
        //console.log('RUTA PROTEGIDA, TOKEN:', token.value);

        if(!request.cookies.has('wtoken')){
            return NextResponse.redirect(new URL('/login?msg=tkn', request.url));
        }

        try {

            const secret    = new TextEncoder().encode(process.env.JWT_SECRET);
            const {payload} = await jwtVerify(token.value, secret);
            console.log('DATA TOKEN', payload);
            return NextResponse.next();

        } catch (error) {
            console.error(error);
            //   urlLogout = `${nexturl.origin}/logout?error=exp`;
            // const newUrlLogout = new URL("", urlLogout);
            await request.cookies.delete('wtoken');
            return NextResponse.redirect(new URL('/login?msg=exp', request.url));
        }
    }
    
    return NextResponse.next();
}

export const config = {
    matcher: '/cuenta/:path*',
}