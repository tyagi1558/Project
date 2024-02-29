import { useRef, useState } from "react";
import Helmet from "../components/Helmet";
import { useSelector } from "react-redux";

const Contact = () => {
  const form = useRef();
  const [message, setMessage] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    phone: "",
    message: "",
  });

  const validatePhoneNumber = (number) => {
    // Check if the phone number is exactly 10 digits
    return /^\d{10}$/.test(number);
  };

  const sendForm = async (formData) => {
    try {
      if (!currentUser || !currentUser._id) {
        console.error("User information not available.");
        setMessage("An error occurred, message not sent");
        return;
      }

      console.log("Sending form data:", formData);

      const apiResponse = await fetch("/api/contact/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });

      if (apiResponse.ok) {
        console.log("Message sent successfully");
        setMessage("Message sent successfully");
      } else {
        console.log("Error in API response:", apiResponse.status);
        setMessage("An error occurred, message not sent");
      }
    } catch (error) {
      console.error("Error calling API:", error);
      setMessage("An error occurred, message not sent");
    }
  };

  const setData = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const phoneNumber = formData.phone;

    if (!validatePhoneNumber(phoneNumber)) {
      setMessage("Please enter a valid 10-digit phone number.");
      return;
    }

    // Assuming all validations pass, send the form
    sendForm(formData);

    // Optionally reset the form
    e.target.reset();
  };

  return (
    <Helmet title={"Contact"}>
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 xl:max-w-full lg:flex lg:items-center lg:gap-4">
          <div className="mx-auto lg:w-6/12 lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-myblue">
              Contact
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Contact us
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600 lg:mx-auto lg:max-w-[50ch]">
              We're here to help! If you have any questions or need assistance,
              feel free to reach out to us. Our team is always ready to assist
              you.
            </p>
          </div>
          <div className="mx-auto mt-4 lg:w-6/12 lg:flex-1 lg:mt-0">
            <form
              ref={form}
              onSubmit={handleSubmit}
              className="bg-gray-50 p-4 rounded-lg space-y-2"
            >
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Your name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setData("name", e.target.value)}
                  className="block w-full rounded-md border-0 outline-0 py-2.5 px-4 text-gray-900 appearance-none shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setData("email", e.target.value)}
                  className="block w-full rounded-md border-0 outline-0 py-2.5 px-4 text-gray-900 appearance-none shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="1234567890"
                  pattern="[0-9]{10}"
                  title="Please enter a valid 10-digit phone number."
                  value={formData.phone}
                  onChange={(e) => setData("phone", e.target.value)}
                  className="block w-full rounded-md border-0 outline-0 py-2.5 px-4 text-gray-900 appearance-none shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Your message
                </label>
                <textarea
                  name="message"
                  rows="6"
                  required
                  value={formData.message}
                  onChange={(e) => setData("message", e.target.value)}
                  className="block w-full rounded-md border-0 outline-0 py-2.5 px-4 text-gray-900 appearance-none shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Leave a comment..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="flex justify-center items-center gap-2 rounded-md bg-myblue px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Send message
              </button>
            </form>
            <p
              className={
                message === "Message sent successfully"
                  ? "text-green-500 mt-4"
                  : "text-red-500 mt-4"
              }
            >
              {message}
            </p>
          </div>
        </div>
      </section>
    </Helmet>
  );
};

export default Contact;
