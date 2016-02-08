(function () {
  "use strict";

  angular.module("myContacts.contacts", ["ngRoute", "firebase"])
    .config(["$routeProvider", function ($routeProvider) {
      $routeProvider.when("/contacts", {
        templateUrl: "contacts/contacts.html",
        controller: "ContactsController as vm"
      });
    }])
    .controller("ContactsController", ["$firebaseArray", function ($firebaseArray) {
      var vm = this;
      var ref = new Firebase("https://oakra-mycontacts.firebaseio.com/");

      vm.contacts = $firebaseArray(ref);
      vm.addFormShow = false;
      vm.model = {};
      vm.msg = "";

      vm.showEditForm = function (contact) {
      };

      vm.toggleAddForm = function () {
        vm.addFormShow = !vm.addFormShow;
      };

      vm.removeContact = function (contact) {
      };

      vm.addFormSubmit = function () {
        var
          name = vm.model.name || null,
          email = vm.model.email || null,
          company = vm.model.company || null,
          mobile_phone = vm.model.mobile_phone || null,
          home_phone = vm.model.home_phone || null,
          work_phone = vm.model.work_phone || null,
          street_address = vm.model.street_address || null,
          city = vm.model.city || null,
          state = vm.model.state || null,
          zipcode = vm.model.zipcode || null;

        vm.contacts.$add({
          name: name,
          email: email,
          company: company,
          phones: [
            {
              mobile: mobile_phone,
              home: home_phone,
              work: work_phone
            }
          ],
          address: [
            {
              street_address: street_address,
              city: city,
              state: state,
              zipcode: zipcode
            }
          ]
        }).then(function(ref){
          var id = ref.key();
          console.log("Added contact with ID: ", id);
          
          // clear form
          vm.model = {};
          
          // hide form
          vm.addFormShow = false;
          
          // send message
          vm.msg = "Contact Added";
        });
      };
    }]);
})();