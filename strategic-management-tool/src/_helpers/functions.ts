import {toast} from "react-toastify";

export const  isValidEmail = (email) => {
  return /\S+@\S+\.\S+/.test(email);
}

export const formatDate = (dateString) => {
  // const dateString = '2023-03-10T23:06:47.325Z';
  const date = new Date(dateString);
  const formattedDate = date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true
  });

  return formattedDate
}

// export const unslugify = (slug) => {
//   return slug
//       .split('-')              // split string on hyphens
//       .map(word =>             // map over each word
//           word.charAt(0).toUpperCase() + word.slice(1)  // capitalize the first letter of each word
//       )
//       .join(' ');              // join the words back together with spaces
// }


export const unslugify = (slug) => {
  return slug
      ?.split(/[-_]/)           // split string on hyphens or underscores
      .map(word =>             // map over each word
          word.charAt(0).toUpperCase() + word.slice(1)  // capitalize the first letter of each word
      )
      .join(' ');              // join the words back together with spaces
}


export const handleSuccessToast = (message) => {
  toast.success(message, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 3000, // Auto-close the toast after 3 seconds
  });
};

export const ellipsis = (str, maxLength) => {
  if (typeof str !== 'string' || str.length <= maxLength) return str;
  return `${str.substr(0, maxLength - 3)}...`;
}

