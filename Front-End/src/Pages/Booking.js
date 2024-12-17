import React, { useRef, useEffect } from 'react';
import Swal from 'sweetalert2';
import '../Styles/Booking.css';

const Booking = () => {
    const formRef = useRef(null);

    const scrollToForm = () => {
        if (formRef.current) {
            formRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        const handleSubmit = async (event) => {
            event.preventDefault();

            const formData = new FormData(event.target);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });

           
            data.eventDate = data.eventDate;
            data.eventTime = data.eventTime;

            try {
                const response = await fetch('http://localhost:4000/api/bookings', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    const responseData = await response.json();
                    Swal.fire({
                        icon: 'success',
                        title: 'Booking successful!',
                        text: 'Your booking has been confirmed.',
                    });
                    event.target.reset();
                } else {
                    const errorData = await response.json();
                    Swal.fire({
                        icon: 'error',
                        title: 'Booking failed',
                        text: `Booking failed: ${errorData.message}`,
                    });
                }
            } catch (error) {
                console.error('Error booking event:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Booking failed',
                    text: 'Booking failed. Please try again.',
                });
            }
        };

        const form = document.getElementById('bookingForm');
        form.addEventListener('submit', handleSubmit);

        return () => {
            form.removeEventListener('submit', handleSubmit);
        };
    }, []);

    return (
        <div className='main-book'>
            <div className="homepage" id='book'>
                <div className="content">
                    <h1 className="title">Book Us For<br /> Your Events.</h1>
                    <p className="description">
                        Lorem ipsum dolor sit amet, consectetur <br />adipiscing elit, sed do eiusmod tempor incididunt<br /> 
                        ut labore et dolore magna aliqua. <br />Ut enim ad minim veniam.
                    </p>
                    <button className="cta-button" onClick={scrollToForm}>Book Now</button>
                </div>
            </div>

            <div className="booking-container" ref={formRef}>
                <form className="booking-form" id="bookingForm">
                    <div>
                        <label>Your Name</label>
                        <input type="text" id="customerName" name="customerName" placeholder='Enter full name' required />
                    </div>
                    <div>
                        <label>Your Phone Number</label>
                        <input type="text" id="contact1" name="contact1" placeholder='Input phone number' required />
                    </div>
                    <div>
                        <label>Email Address (Optional)</label>
                        <input type="email" id="email" name="email" placeholder='Enter Email' />
                    </div>
                    <div>
                        <label>Event Location</label>
                        <input type="text" id="eventLocation" name="eventLocation" placeholder='Enter specific Location' required />
                    </div>
                    <div>
                        <label>Event Date</label>
                        <input type="date" id="eventDate" name="eventDate" required />
                    </div>
                    <div>
                        <label>Event Time</label>
                        <input type="time" id="eventTime" name="eventTime" required />
                    </div>
                    <div>
                        <label>Event Details</label>
                        <textarea rows="4" id="eventDetails" name="eventDetails" placeholder='Add more information about the event'></textarea>
                    </div>
                    <button type="submit">Book Us</button>
                </form>
            </div>
        </div>
    );
}

export default Booking;
