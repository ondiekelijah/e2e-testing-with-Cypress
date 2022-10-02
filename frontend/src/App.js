import "./App.css";
import { useState } from "react";

const API_URL = "http://localhost:5000/api/contact";

const saveMessage = async (name, email, message) => {
  const MessageBodyParameters = {
    name: name,
    email: email,
    message: message,
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(MessageBodyParameters),
  };

  const response = await fetch(API_URL, options);
  const jsonResponse = await response.json();
  console.log(JSON.stringify(jsonResponse));
  return jsonResponse;
};

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Validate the form
    if (!name || !email || !message) {
      setError("Please fill out all the fields");
      setLoading(false);
      return;
    }
    // Send the message to the backend
    const response = await saveMessage(name, email, message);
    console.log(response);

    if (response.success === "Message sent successfully") {
      setSuccess("Message sent successfully");
      setName("");
      setEmail("");
      setMessage("");
    } else {
      setError("Something went wrong");
    }

    setLoading(false);
  };

  const HandleNameChange = (e) => {
    setName(e.target.value);
  };

  const HandleEmailChange = (e) => {
    setEmail(e.target.value);
  };


  const HandleMessageChange = (e) => {
    setMessage(e.target.value);
  };


  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 mx-auto">
            <div className="text-center mt-5">
              <h1>Say hi ✋ </h1>
              <p>
                Hello! If you have any questions or feedback for us, please fill
                out the form below and we'll get back to you as soon as
                possible.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              method="post"
              className="contact-form"
            >
              <div className="row">
                <div className="col form-group">
                  <input
                    type="name"
                    data-test="name"
                    className="form-control"
                    id="name"
                    placeholder="Your Name"
                    required
                    value={name}
                    onChange={HandleNameChange}
                  />
                </div>
                <div className="col form-group">
                  <input
                    type="email"
                    data-test="email"
                    className="form-control"
                    id="email"
                    placeholder="Your Email"
                    required
                    value={email}
                    onChange={HandleEmailChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <textarea
                  className="form-control"
                  data-test="message"
                  rows="5"
                  placeholder="Message"
                  required
                  value={message}
                  onChange={HandleMessageChange}
                ></textarea>
              </div>
              <div className="my-3">
                {loading && <div className="spinner-border"></div>}
                {error && <div className="alert alert-danger">{error}</div>}
                {success && (
                  <div className="alert alert-success"
                  data-test="success-message"
                  >{success}</div>
                )}
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="btn btn-primary"
                  data-test="submit"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
