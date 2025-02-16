import { getData } from "./ExternalServices.mjs";
import { fetchQuote } from "./RandomQuoteHome.js";
//Fetch data fro the endpoint
getData("quote")

// Fetch a quote when the page loads in the home page
window.onload = fetchQuote;