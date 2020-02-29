/* Based on https://github.com/pwapraxis/beispiele/blob/master/kapitel05/db.js (access: 14.01.2019) */

self.myDB = new Dexie('MyDB');
self.myDB.version(1).stores({ student: '++id, firstName, lastName, studNumber' });
self.myDB.on('populate', () => {
    myDB.student.add({ firstName: 'Max', lastName: 'Mustermann', studNumber: 757733 });
});