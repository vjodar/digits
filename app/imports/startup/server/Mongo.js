import { Meteor } from 'meteor/meteor';
import { Contacts } from '../../api/contact/Contacts';

/* eslint-disable no-console */

/** Initialize the database with a default data document. */
function addContacts(data) {
  console.log(`  Adding: ${data.lastName} (${data.owner})`);
  Contacts.insert(data);
}

/** Initialize the collection if empty. */
if (Contacts.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating contact data.');
    Meteor.settings.defaultContacts.map(data => addContacts(data));
  }
}
