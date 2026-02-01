/**
 * API service for backend communication
 */

// Use relative URL for Vercel deployment (same domain)
// Falls back to environment variable for local development
const API_URL = import.meta.env.VITE_BACKEND_URL || '';

/**
 * Fetch all cars from the backend
 */
export const getCars = async () => {
  try {
    const response = await fetch(`${API_URL}/api/cars`);

    if (!response.ok) {
      throw new Error(`Failed to fetch cars: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching cars:', error);
    throw error;
  }
};

/**
 * Fetch a single car by ID
 */
export const getCarById = async (carId) => {
  try {
    const response = await fetch(`${API_URL}/api/cars/${carId}`);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Car not found');
      }
      throw new Error(`Failed to fetch car: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching car ${carId}:`, error);
    throw error;
  }
};

/**
 * Create a new booking
 */
export const createBooking = async (bookingData) => {
  try {
    const response = await fetch(`${API_URL}/api/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || `Failed to create booking: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
};

/**
 * Fetch all bookings (admin use)
 */
export const getBookings = async () => {
  try {
    const response = await fetch(`${API_URL}/api/bookings`);

    if (!response.ok) {
      throw new Error(`Failed to fetch bookings: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching bookings:', error);
    throw error;
  }
};

/**
 * Fetch a single booking by ID
 */
export const getBookingById = async (bookingId) => {
  try {
    const response = await fetch(`${API_URL}/api/bookings/${bookingId}`);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Booking not found');
      }
      throw new Error(`Failed to fetch booking: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching booking ${bookingId}:`, error);
    throw error;
  }
};
