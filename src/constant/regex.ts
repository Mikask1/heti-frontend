export const REG_EMAIL =
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

export const REG_PHONE = /^8[1-9]{1}\d{1}[\s-]?\d{4}[\s-]?\d{2,5}$/;

export const REG_URL =
  /^(http(s)?:\/\/.)[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/;

export const REG_NRP = /^(50|20)\d{8}$/;