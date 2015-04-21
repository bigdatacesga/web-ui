function helpTextHelp(){
  return "<p><h3>Welcome to CESGA Big-Data Portal</h3></p>\n"+
    "You are into the Documentation section of this portal.<br/><br/>\n"+
    "Here you can find information about how to use this portal.<br/>\n";
}

function helpTextClusters(){
  return "<p><h3>Clusters Help</h3></p>\n"+
    'Into the <b><a href="#/clusters">Clusters</a></b> section of this portal you will be able to:<br/>\n'+
    '<ul>\n'+
    '<li>See your active clusters</li>\n'+
    '<li>Query detailed information about your active clusters</li>\n'+
    '<li>Destroy any of your active clusters</li>\n'+
    '<li>Launch a new cluster using our wizard</li>\n'+
    '</ul>\n';
}

function helpTextSSHKeys(){
  return "<p><h3>SSH Keys</h3></p>\n"+
    'Into the <b><a href="#/sshkeys">SSH Keys</a></b> section of this portal you will be able to:<br/>\n'+
    '<ul>\n'+
    '<li>Check any registered SSH Key</li>'+
    '<li>Add new SSH Keys so they are allowed to access to your cluster</li>'+
    '<li>Remove current registered SSH Keys so they STOP having access to your cluster</li>'+
    '</ul>\n';
}

function helpTextFirewall(){
   return "<p><h3>Firewall</h3></p>\n"+
    'Into the <b><a href="#/firewall">Firewall</a></b> section of this portal you will be able to:<br/>\n'+
    '<ul>\n'+
    '<li>Check allowed IPs/Subnets</li>'+
    '<li>Enabled or Disable IPs/Subnets, so they become active or not</li>'+
    '<li>Add new IPs/Subnets to your firewall</li>'+
    '<li>Remove those IPs/Subnets you no longer want</li>'+ 
    '</ul>\n';
}