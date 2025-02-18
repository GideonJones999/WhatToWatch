import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import "./about.css";

export default function About() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    body: "",
  });
  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_q8ceiit",
        "template_9b1pusp",
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.body,
        },
        "zYLNZtGtXp2VIEEZ4"
      )
      .then(
        () => {
          setStatusMessage("Message sent successfully!");
          setFormData({ name: "", email: "", subject: "", body: "" });
        },
        (error) => {
          setStatusMessage("Failed to send message. Please try again.");
          console.error(error);
        }
      );
  };

  return (
    <main>
      <h1>About</h1>
      <div className="about-container">
        <p>
          My name is Gideon, and I love movies! However, there are so many
          options nowadays that make it hard to decide on what to watch. That's
          why I made
          <a href="https://moviepick.click/">moviepick.click</a>! It is designed
          to help you and your friends decide what movie to watch, taking into
          consideration the streaming services available and your preferences!
          :)
        </p>
        <p>
          I made this webiste for my CS 260 class at BYU during my Winter 2025
          Semester. It uses HTML, SCSS, React, WebSocket (eventually),
          JavaScript, AWS, and more!
        </p>
      </div>

      <h1>Contact</h1>
      <div className="contact-container">
        <p>
          If you need any assistance or have questions, feel free to contact me!
        </p>
        <div id="contact-form-container">
          <form onSubmit={handleSubmit} id="contact-form">
            <h3>Contact Gideon</h3>
            <span>
              <label>Name: </label>
              <input
                type="text"
                name="name"
                placeholder="James Bond"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </span>
            <span>
              <label>Email: </label>
              <input
                type="email"
                name="email"
                placeholder="agent007@sis.gov.uk"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </span>
            <span>
              <label>Subject: </label>
              <input
                type="text"
                name="subject"
                placeholder="I Need New Gadgets, Q."
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </span>
            <span>
              <label>Message: </label>
              <textarea
                name="body"
                placeholder="Q, I need gadgets ASAP..."
                value={formData.body}
                onChange={handleChange}
                required
                id="contact-form-body"
              />
            </span>
            <span>
              <button className="button-link" type="submit">
                Send Message
              </button>
            </span>
          </form>
          {statusMessage && <p>{statusMessage}</p>}
        </div>
      </div>
    </main>
  );
}
