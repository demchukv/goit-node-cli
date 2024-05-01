import { listContacts, getContactById, removeContact, addContact } from "./contacts.js";
import { program } from "commander";

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await listContacts();
      return console.table(contacts);
 
    case "get":
      const contact = await getContactById(id);
      return contact ? console.table(contact) : null;

    case "add":
      const newContact = await addContact(name, email, phone);
      return console.table(newContact);

    case "remove":
      const removed = await removeContact(id);
      return removed ? console.log(removed) : null;

    default:
      return console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);