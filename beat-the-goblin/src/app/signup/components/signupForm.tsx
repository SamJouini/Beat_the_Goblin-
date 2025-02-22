'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './signupForm.module.css'

/**
 * SignupForm Component
 * 
 * This component renders a form for user registration in the "Beat the Goblin" application.
 * It handles form state management, submission, and error display.
 * 
 * Key Features:
 * - Manages form state for username, email, and password inputs.
 * - Performs client-side form validation.
 * - Sends signup requests to the server and handles responses.
 * - Displays error messages for failed signup attempts.
 * - Uses Next.js router for navigation after successful signup.
 * 
 * Futur implementation: 
 * - Improve the form rendition to be less clunky.
 * 
 */


// Manager form for input values
const SignupForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  // Manager for error messages
  const [error, setError] = useState('');

  // Call for Next.js router
  const router = useRouter();

// Field writting handler
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
const { name, value } = e.target;
  setFormData(prevState => ({
    ...prevState,
    [name]: value
  }));
};

  // form submission handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Send POST request to signup API
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      // Redirect to login page after successful signup -> login page or main page ?
      if (data.success) {
        router.push('/login');
        // Set error message if signup fails
      } else {
        setError(data.message);
      }
      // Set generic error message for any other errors
      } catch (err) {
        setError('An error occurred. Please try again.');
      }
  };

  // Render the sign up form UI
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
    <div className={styles.formGrid}>
      <div className={styles.formField}>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          required
        />
      </div>
      <div className={styles.formField}>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
      </div>
      <div className={styles.formField}>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
      </div>
    </div>
    {error && <p className={styles.error}>{error}</p>}
    <button type="submit" className={styles.submitButton}>Sign Up</button>
  </form>
  );
};

export default SignupForm;

