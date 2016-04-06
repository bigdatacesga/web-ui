// *** FIREWALL UTILS *** //
// ********************** //

/*
 * This function should parse a string with format: a.b.c.d / z
 * Return true: Means parsed string was a valid ip / mask (maybe only ip was given, it is considered valid too)
 * Return false: Means parsed string was NOT a valid ip / mask 
 */ 
function isValidIP(str){
  // TODO
  return true;
}

function parseIPFrom(str){
  var index = str.indexOf("/");
  if(index>=0)
    return str.substring(0,index)
  return str;
}

function parseMaskFrom(str){
  var index = str.indexOf("/");
  if(index>=0)
    return str.substring(index+1);
  return getCorrespondingDefaultMask();
}

function getCorrespondingDefaultMask(ip){
  // TODO
  return "24";
}


// *** SSHKEYS UTILS *** //
// ********************* //
/*
 * This function should parse a string and determine if it is a valid sshkey.
 * Criteria about what is considered a valid key isnt specified yet
 */
function isValidSSHKey(str){
  // TODO
  return true;
}