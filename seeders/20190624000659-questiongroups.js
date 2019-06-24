'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('questiongroups', 
      [
        {
          "id": 1,
          "name": "Home",
          "description": "Home",
          "createdAt": "2019-06-20 22:01:43.395318",
          "updatedAt": "2019-06-20 22:01:43.427120"
        },
        {
          "id": 2,
          "name": "Building",
          "description": "Building",
          "createdAt": "2019-06-20 22:01:43.395318",
          "updatedAt": "2019-06-20 22:01:43.427120"
        },
        {
          "id": 3,
          "name": "Fire",
          "description": "Fire",
          "createdAt": "2019-06-20 22:01:43.395318",
          "updatedAt": "2019-06-20 22:01:43.427120"
        },
        {
          "id": 4,
          "name": "Theft",
          "description": "Theft",
          "createdAt": "2019-06-20 22:01:43.395318",
          "updatedAt": "2019-06-20 22:01:43.427120"
        },
        {
          "id": 5,
          "name": "Vehicle",
          "description": "Behicle",
          "createdAt": "2019-06-20 22:01:43.395318",
          "updatedAt": "2019-06-20 22:01:43.427120"
        },
        {
          "id": 6,
          "name": "Earthquake",
          "description": "Earthquake",
          "createdAt": "2019-06-20 22:01:43.395318",
          "updatedAt": "2019-06-20 22:01:43.427120"
        },
        {
          "id": 7,
          "name": "Medical Single",
          "description": "Medical Single",
          "createdAt": "2019-06-20 22:01:43.395318",
          "updatedAt": "2019-06-20 22:01:43.427120"
        },
        {
          "id": 8,
          "name": "Medical Family",
          "description": "Medical Family",
          "createdAt": "2019-06-20 22:01:43.395318",
          "updatedAt": "2019-06-20 22:01:43.427120"
        },
        {
          "id": 9,
          "name": "Medical Suplimental",
          "description": "Medical Suplimental",
          "createdAt": "2019-06-20 22:01:43.395318",
          "updatedAt": "2019-06-20 22:01:43.427120"
        },
        {
          "id": 10,
          "name": "Medical Life",
          "description": "Medical Life",
          "createdAt": "2019-06-20 22:01:43.395318",
          "updatedAt": "2019-06-20 22:01:43.427120"
        },
        {
          "id": 11,
          "name": "Under Construction",
          "description": "Under Construction",
          "createdAt": "2019-06-20 22:01:43.395318",
          "updatedAt": "2019-06-20 22:01:43.427120"
        },
        {
          "id": 12,
          "name": "Liability",
          "description": "Liability",
          "createdAt": "2019-06-20 22:01:43.395318",
          "updatedAt": "2019-06-20 22:01:43.427120"
        }
      ]
      , {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('questiongroups', null, {});
    
  }
};
