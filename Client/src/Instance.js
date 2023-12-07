const dev = "http://localhost:5000/api/"
const prod = "https://odd-teal-snapper-tux.cyclic.app/api/"
 
export const BASE_URI = window.location.hostname.split(":")[0] === "localhost" ? dev : prod; 
export const CLIENT_ID = "565903132155-oqb17r12or14kr3bgadsvakehqsobvtd.apps.googleusercontent.com";