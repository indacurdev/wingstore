import {NextResponse} from 'next/server';
import {jwtVerify} from 'jose';

export async function middleware(request) {

    const nexturl  = request.nextUrl;

    if(nexturl.pathname.startsWith("/cuenta")){
        // console.log(nexturl);
        const token = request.cookies.get('wtoken');
        //console.log('RUTA PROTEGIDA, TOKEN:', token.value);

        if(!request.cookies.has('wtoken')){
            return NextResponse.redirect(new URL('/login?msg=tkn', request.url));
        }

        try {
            // si existe el token
            const secret    = new TextEncoder().encode(process.env.JWT_SECRET);
            const {payload} = await jwtVerify(token.value, secret);
            console.log('DATA TOKEN', payload);

            //si es valido
            return NextResponse.next();

        } catch (error) {
            console.log('ERROR AL COMPROBAR EL TOKEN');
            console.error(error); 

            await request.cookies.delete('wtoken');
            await request.cookies.clear('wtoken');

            const response = NextResponse.next();
            const responseCookies = await response.cookies.getAll();

            console.log('res', responseCookies);
            
            return NextResponse.redirect(new URL('/logout?error=exp', request.url));
        }
    }
    
    return NextResponse.next();
}


export const config = {
    matcher: [
        '/cuenta/:path*',
    ],
}