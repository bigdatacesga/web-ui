'use strict';
/**
 * @ngdoc function
 * @name hadoopApp.sshkeys:SSHKeysCtrl
 * @description 
 * # SSHKeysCtrl
 * Controller of the sshkeys view 
 * Allows to see registered ssh keys and to add new keys
 */
angular.module('hadoopApp.sshkeys', ['ui.router', 'hadoopApp.sshkey'])

.config(['$stateProvider', function ($stateProvider) {
  $stateProvider.state('sshkeys', {
    url:'/sshkeys',
    templateUrl: 'sshkeys/sshkeys.html',
    controller: 'SSHKeysCtrl',
    controllerAs: 'sshkeys'
  });
}])

.controller('SSHKeysCtrl', [function() {
  this.sshKeys = [
      {key:"ssh-dss AAAAB3NzaC1kc3MAAACBAKfmTAYNrwWKJBmnSl0lN8nNVAb6n7i7Ctj7SCg2e8+Je/Y8mvC494nAwH8UZqCStF5UW8XXMiEt9ax5VXjHLAtqlhdCtRaXDctJiCyVgSUWZRI8AQq+d8bVZ+8jG2vQV0c3Tp/jAE177fpskkVTiBF92r1o/5q3Br6Gy0cRBA4BAAAAFQC4n2JCi75HN30Hca5nnE0Dm6oOKwAAAIB6+PCcBNy+hg9BBrSHUnnPmdQj12k5QSo1GOH3yw2430x0oYIaQjTR3KF5ViPRX1IOq5Z/LlHRkQQclP8Zde8dGLKNNEJBd8w3RYMhqfvxBZWSjAfJKCf1AytjVaTWnEiVVKE2Qv3oXArTYKmf5ly0AtON5BiEJZA/hh7NPqc3zwAAAIBDDTi1bebjDcU3GM+qPZvEX6eZX0JPNElZd5PlGaSctfSwhxIzUYH4MsgLCtyOmG6Bc6KR7aV0wGQREupCnr+E8R3lYeeT4jMmDXp/WK4Raxwpth4p+imw8bondUEgUs+aGR4d2s7fWGuzHo1fd7noHGlTNl0okd5mJG88sXs9hA=="},
      {key:"ssh-dss AAAAB3NzaC1kc3MAAACBAPJ1HtI5aYP47iyMJVFgnRvx2uq3ruPlXvvw16jSFT/NsKwX6H9yvBpsU6FW5YBpdm3sLgcv+SBBWa5KWQL2KS32qDRQ3zuwIVuV1uc7vUK0GnVyxBrRVoiL5DOfvsQ1EPeF3J2mkzeSg9kJtvm8s6vm6dTB4rDF3R80lrY68AX1AAAAFQDD7JihDo5syG6LGYqyztEoG0c9nQAAAIAqnp4p3vwSwHtJcyN/9VhG4rfcDWLXMlaRhCWhv1P3exD/5joosKUwY82jjaHXuS7iDJkgKjMbufdunxSwZ+FOSdabb29TejJ6Rso+uk50aYe/rRKxn0opsRwbmF9K84AFZ437fBE4VUZSJmtdN9RE8CJNZhzkgzulwkwH7y0ZFwAAAIEAgbwDQ5WWVuDNoG/tYPQQP29ll8uiKHMeEYrlQNhph1BqhN/0s3bSIvRuMRMYtBxv4M6oVJnnOrAyYnSQxyV23lU+UgLuXo56ZxjNaO8AjwyC7K3uZc8AwrawAKfhB/mQTXi7QtqvDk0MdjMgMreBcq3NyzOkAmQRbu2AKPn20RI="},
      {key:"ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDEdt4zwzrzGOU6Cz/19RDPU5/e9DO8e+/vb67+zJ8QeODDizDFodEMCY5u/f4XRTYEUy+kzE0PgkEjRPBwghv+WlX1wtmyK/7WwtHLtOKjiUdNr8n7OOAw5KaJFZQ9xToPnRVmR0vRhhk1ckpSlLN9FZvEjbRorAID2qTAQvUUqiU3T/S0O5hdoUzQwImWbbAkN7E4xngWjFjLL2CmXLEjWkRUxHFRxr89H8eB3jyJPN0rIwCReIelb7eDMinx+Hk7s5Jxc7x4pVmKo1o2v8Q8E9uhOntVMMKFDfIQ+TO68hsUXWT+H+nBfXpY8GIQWVMRR2LyRt4O7eDdkVzdYyst"},
      {key:"ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCxjG3bewY2Steuz3t1E0dT5qh4KiDl7S7KLV7zbY8/24ST3GJnRiwE0bR8ziPW6JRIMWcsx9aVrQmpDmtvtkIdj6TeLBg6UDxl5NH7QStIjP5N/jHTCt74yuWqI5Y1pTBeSKXuEhe6/yHvoKIuzhM7yw/dR5/hxJnRwmoBsam/BK0DBEQ4ItNWaIiqAmJYoFz46A3flz/w3xZCZlOc3MAYxxvAXuYrGym6VKtxgESo2w5HzKfJPIabbP/Ux32yMFkNw8/4csKZB3n4LmgfvwVuGdJzxeOyvGbDojQquyfd/M9631+DA2uWgvYUSljURrtT9IBcoEowX5wlca7qEyoJ"}
    ];

  this.addKey = function() {
    // Adds the key inside text input
    if(isValidSSHKey(document.getElementById("sshkeys_input_sshkey").value)){
      this.sshKeys.push({
	key: document.getElementById("sshkeys_input_sshkey").value
      });
      // TODO
      alert('TODO\n'+
	'addKey function must Notify API about adding given key @ sshkeys/sshkey.js'
      );
    }
  };

}]);
 
