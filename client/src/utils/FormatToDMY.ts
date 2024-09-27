// Utility function to format the date
export const FormatDateToYYYYMMDD = (isoDateString: string): string => {
    const date = new Date(isoDateString); // Parse the ISO date string
  
    // Extract year, month, and day
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed, so add 1
    const day = date.getDate().toString().padStart(2, '0'); // Ensure 2-digit day
  
    // Return in the desired format: "YYYY-MM-DD"
    return `${year}-${month}-${day}`;
  };