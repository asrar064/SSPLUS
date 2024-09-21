const FormatIntoKs = (num: number): string => {
  if (isNaN(num)) {
    throw new Error("Input must be a number");
  }

  // Check if the number is large enough to format
  if (num >= 1000) {
    const formattedNumber = (num / 1000).toFixed(1); // Divide by 1000 for 'k' formatting
    return `${formattedNumber}k`; // Append 'k' to indicate thousands
  }

  return num.toString(); // Return the number as a string if less than 1000
};

export default FormatIntoKs;
