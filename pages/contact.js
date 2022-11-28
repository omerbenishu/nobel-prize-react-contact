import { useState } from "react";
import { CONTACT_FORM_ENDPOINT } from "../config";

async function postContactForm(data) {
  const response = await fetch(CONTACT_FORM_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response;
}

export default function ContactPage() {
  const [formData, setFormData] = useState({});
  const [formResponseStatus, setFormResponseStatus] = useState();

  async function handleSubmit(event) {
    event.preventDefault();
    const response = await postContactForm(formData);
    setFormResponseStatus(response.status);
  }

  function handleChange(event) {
    if (event.target.id === "form-name") {
      const name = event.target.value;
      setFormData(Object.assign(formData, { name }));
    }
    if (event.target.id === "form-category") {
      const category = event.target.value;
      setFormData(Object.assign(formData, { category }));
    }
    if (event.target.id === "form-reason") {
      const reason = event.target.value;
      setFormData(Object.assign(formData, { reason }));
    }
  }

  return (
    <div>
      <div>
        <h2>
          Suggest any new category that should be part of the Nobel prizes
        </h2>
        <div className="content">
          {formResponseStatus ? (
            <div>
              {formResponseStatus === 200
                ? "Thank you."
                : "Something went wrong."}
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <input
                className="formInput"
                id="form-name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                className="formInput"
                id="form-category"
                placeholder="New Category"
                value={formData.category}
                onChange={handleChange}
                required
              />
              <input
                className="formInput"
                id="form-reason"
                placeholder="Short explanation"
                value={formData.reason}
                onChange={handleChange}
              ></input>
              <button type="submit">Send</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
