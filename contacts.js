const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

const updatecontacts = async (contacts) => {
  try {
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
  } catch (error) {
    console.log(error.message);
  };
}


async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    
    return JSON.parse(data);
  } catch (error) {
    console.log(error.message)
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const result = contacts.find(item => item.id === contactId);

    return result || null;
  } catch (error) {
    console.log(error.message)
  }
}

async function addContact({ name, email, phone }) {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    }

    contacts.push(newContact);
    await updatecontacts(contacts);

    return newContact;
  } catch (error) {
    console.log(error.message);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === contactId);
    if (index === -1) {
      return null;
    }

    const [result] = contacts.splice(index, 1);
    await updatecontacts(contacts);
    return result;
  } catch (error) {
    console.log(error.message);
  }
}


module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact
}