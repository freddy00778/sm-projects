export const randomChars = count => {
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    return Array.from({ length: count }, () => possible[Math.floor(Math.random() * possible.length)]).join('');
};

export const generateVerificationCode = () => {
    const numbers = Math.floor(1000 + Math.random() * 9000);
    const fourLetterString = randomChars(4)
    return `${fourLetterString}-${numbers}`
}

export const  parseJwt = (token) => {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}

export const humanReadableDate = (dateString) => {
    // let dateStr = '2023-05-30T00:00:00.000Z';
    let date = new Date(dateString);

    //@ts-ignore
    let options = { day: '2-digit', month: 'short', year: 'numeric' };
    //@ts-ignore
    let humanReadableDate = new Intl.DateTimeFormat('en-GB', options).format(date);

    console.log(humanReadableDate); // Outputs: "30 May 2023"

}

export const unslugify = (slug) => {
    return slug
        ?.split(/[-_]/)           // split string on hyphens or underscores
        .map(word =>             // map over each word
            word.charAt(0).toUpperCase() + word.slice(1)  // capitalize the first letter of each word
        )
        .join(' ');              // join the words back together with spaces
}