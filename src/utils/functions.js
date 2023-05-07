export const getCookieFromReq = (req, cookieKey) => {
    const cookie = decodeURIComponent(req.headers.cookie)
      .split(";")
      .find((c) => c.trim().startsWith(`${cookieKey}=`));

    if (!cookie) return undefined;
    return cookie.split("=")[1];
};

export const getTemplate = (item, onchange, defaultvalue = "") => {
  if(item){
    return (
      <input 
        defaultValue={defaultvalue}
        type="text" 
        id={item.id}
        name={item.name} 
        placeholder={item.placeholder} 
        className="form-control" 
        onChange={(e) => onchange(e.target.value)}
      />
    );
  }
}

export const validateEmail = (email = "") => {
  var validRegexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if(email.match(validRegexEmail)){
    return true;
  }

  return false;
}

export const slugify = str =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');