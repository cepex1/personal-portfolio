import { useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import contactImg from "../assets/img/contact-img.svg";

const useContactForm = () => {
  const initialDetails = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  };

  const [formDetails, setFormDetails] = useState(initialDetails);
  const [buttonText, setButtonText] = useState("Send");
  const [status, setStatus] = useState({});

  const onFormUpdate = (field, value) => {
    setFormDetails(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => { // Prevent default form submission
    e.preventDefault();
    setButtonText("Sending...");

    try {
      let response = await fetch("https://formspree.io/f/xrbqzlol", { // Reemplaza con tu ID real
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDetails),
      });

      if (response.ok) {
        setStatus({ success: true, message: "Message sent successfully!" });
        setFormDetails(initialDetails);
      } else {
        const errorText = await response.text();
        console.error("Formspree error:", errorText);
        setStatus({ success: false, message: "Message failed to send." });
      }
    } catch (error) {
      console.error("Network error:", error);
      setStatus({ success: false, message: "Network error, please try again." });
    }

    setButtonText("Send");
  };

  return { formDetails, buttonText, status, onFormUpdate, handleSubmit };
};

const ContactFormInput = ({ type, value, placeholder, onChange, className }) => (
  <input
    type={type}
    value={value}
    placeholder={placeholder}
    onChange={onChange}
    className={className}
  />
);

export const Contact = () => {
  const { formDetails, buttonText, status, onFormUpdate, handleSubmit } = useContactForm();

  return (
    <section className="contact" id="connect">
      <Container>
        <Row className="align-items-center">
          <Col md={6}>
            <img src={contactImg} alt="Contact Us" />
          </Col>
          <Col md={6}>
            <h2>Get In Touch</h2>
            <form onSubmit={handleSubmit}>
              <Row>
                {[ 
                  { field: "firstName", type: "text", placeholder: "First Name", size: 6 },
                  { field: "lastName", type: "text", placeholder: "Last Name", size: 6 },
                  { field: "email", type: "email", placeholder: "Email Address", size: 6 },
                  { field: "phone", type: "tel", placeholder: "Phone No.", size: 6 },
                ].map(({ field, type, placeholder, size }) => (
                  <Col sm={size} className="px-1" key={field}>
                    <ContactFormInput
                      type={type}
                      value={formDetails[field]}
                      placeholder={placeholder}
                      onChange={(e) => onFormUpdate(field, e.target.value)}
                    />
                  </Col>
                ))}
                
                <Col sm={12} className="px-1">
                  <textarea
                    rows="6"
                    value={formDetails.message}
                    placeholder="Message"
                    onChange={(e) => onFormUpdate("message", e.target.value)}
                    className="w-100"
                  />
                  <button type="submit" className="mt-3">
                    <span>{buttonText}</span>
                  </button>
                </Col>
                
                {status.message && (
                  <Col>
                    <p className={status.success ? "success" : "danger"}>
                      {status.message}
                    </p>
                  </Col>
                )}
              </Row>
            </form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
