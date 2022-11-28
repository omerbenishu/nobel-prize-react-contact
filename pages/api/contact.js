import { CONTACT_FORM_TABLE_NAME } from "../../config";
import { client } from "../../datastore";

export default async function handler(req, res) {

  // Don't allow methods we don't support
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Unsupported request method' })
    return
  }

  // explicitly getting the fields we support for safety and consistency
  const { name, category, reason } = req.body;

  // write our data to the database
  try {
    await client.from(CONTACT_FORM_TABLE_NAME).insert({ name, category, reason });
    res.status(200).json({message: "Success"})
  } catch (error) {
    res.status(400).json({ message: "Something went wrong" })
  }
}