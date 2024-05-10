
/** sorting structure
 * @param {string} a - The priority of the first item.
 * @param {string} b - The priority of the second item.
 * @param {string} orderDirection - 'asc' for ascending, 'desc' for descending.
 * @returns {number} - Negative if a < b, positive if a > b, zero if equal.
 */
export const prioritize = (a, b, orderDirection) => {
  const priorityMap = {
    high: 4,
    medium: 3,
    normal: 2,
    low: 1
  };

  const valueA = priorityMap[a] || 0;
  const valueB = priorityMap[b] || 0;

  if (orderDirection === 'asc') {
    return valueA - valueB;
  } else {
    return valueB - valueA;
  }
};

export const currentProgress = (a, b, orderDirection) => {
  const progressMap = {
    completed: 3,
    "in progress": 2,
    todo: 1,
  };

  const valueA = progressMap[a.toLowerCase()] || 0;  // Handle case sensitivity
  const valueB = progressMap[b.toLowerCase()] || 0;

  if (orderDirection === 'asc') {
    return valueA - valueB;
  } else {
    return valueB - valueA;
  }
};


export const formatDate = (date) => {
    // Get the month, day, and year
    const month = date.toLocaleString("en-US", { month: "short" });
    const day = date.getDate();
    const year = date.getFullYear();
  
    const formattedDate = `${day}-${month}-${year}`;
  
    return formattedDate;
  };
  
  export function dateFormatter(dateString) {
    const inputDate = new Date(dateString);
  
    if (isNaN(inputDate)) {
      return "Invalid Date";
    }
  
    const year = inputDate.getFullYear();
    const month = String(inputDate.getMonth() + 1).padStart(2, "0");
    const day = String(inputDate.getDate()).padStart(2, "0");
  
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }
  
  export function getInitials(fullName) {
    const names = fullName.split(" ");
  
    const initials = names.slice(0, 2).map((name) => name[0].toUpperCase());
  
    const initialsStr = initials.join("");
  
    return initialsStr;
  }
  
  export const PRIOTITYSTYELS = {
    high: "text-black bg-red-100 ",
    medium: "text-yellow-600",
    low: "text-blue-600",
  };
  
  export const TASK_TYPE = {
    todo: "bg-blue-600",
    "in progress": "bg-yellow-600",
    completed: "bg-green-600",
  };
  
  export const BGS = [
    "bg-blue-600",
    "bg-yellow-600",
    "bg-red-600",
    "bg-green-600",
  ];