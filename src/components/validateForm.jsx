
export function validateForm(fname, lname, addrs, city, pin, statename, phone) {
  if (fname.length > 0 && lname.length > 0 && addrs.length > 0 && city.length > 0 && pin.length > 0, statename.length > 0, phone.length > 0) {
    return true
  } else {
    return false
  }
}