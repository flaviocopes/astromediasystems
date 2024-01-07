import type {
  TypedPocketBase,
  ContactsResponse,
  ContactsRecord,
} from '@lib/pocketbase-types'

import PocketBase from 'pocketbase'

export const pb = new PocketBase(process.env.POCKETBASE_URL) as TypedPocketBase

// globally disable auto cancellation
pb.autoCancellation(false)

export async function getContacts({ q = null }): Promise<ContactsResponse[]> {
  const options = {
    filter: '',
  }

  if (q) {
    options.filter = `first ~ "${q}" || last ~ "${q}" || email ~ "${q}" || phone ~ "${q}"`
  }

  let contacts: ContactsResponse[]
  try {
    contacts = await pb.collection('contacts').getFullList(options)
    console.log(contacts)
  } catch (e) {
    console.log(e.response)
  }
  return contacts
}

export async function getContact(id: string) {
  let contact: ContactsResponse
  try {
    const options = {}
    contact = await pb.collection('contacts').getOne(id, options)
  } catch (e) {
    console.log(e.response)
  }

  return contact
}

//add contact to pocketbase
export async function addContact({ first, last, phone, email }) {
  let newContact: ContactsResponse

  try {
    newContact = await pb.collection('contacts').create({
      first,
      last,
      phone,
      email,
    })
  } catch (e) {
    console.log(e.response)
  }

  return newContact
}

export async function deleteContact(id: string) {
  try {
    await pb.collection('contacts').delete(id)
  } catch (e) {
    console.log(e.response)
  }
}

export async function updateContact(id: string, data: ContactsRecord) {
  try {
    await pb.collection('contacts').update(id, data)
  } catch (e) {
    console.log(e.response)
  }
}
