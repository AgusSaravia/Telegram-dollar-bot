import { format } from "date-fns"





export async function getData() {
    const formattedDate = format(new Date(), "ddMMyyyy");

    const res = await fetch(
        `https://www.indumex.com/Umbraco/api/Pizarra/Cotizaciones?fecha=${formattedDate}`,
        {
            headers: {
                accept: "application/json, text/javascript, */*; q=0.01",
                "accept-language": "en-US,en;q=0.9",
                "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "sec-ch-ua":
                    '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": '"Linux"',
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "x-requested-with": "XMLHttpRequest",
            },
            referrer: "https://www.indumex.com/",
            referrerPolicy: "strict-origin-when-cross-origin",
            body: null,
            method: "GET",
            mode: "cors",
            credentials: "include",
        }
    ).catch((err) => {
        console.error("Error: ", err)
    })

    return res.json();
}