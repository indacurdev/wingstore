export const getCookieFromReq = (req, cookieKey) => {
    const cookie = decodeURIComponent(req.headers.cookie)
      .split(";")
      .find((c) => c.trim().startsWith(`${cookieKey}=`));

    if (!cookie) return undefined;
    return cookie.split("=")[1];
};

export const getTemplate = (template = []) => {
  let items = [];  

  if(template.length > 0){
    template.map(item => {
      items.push(
        <input 
          type="text" 
          name={item.nombre} 
          placeholder={item.nombre} 
          className="form-control" 
        />
      )
    });
  }

  return items;
}