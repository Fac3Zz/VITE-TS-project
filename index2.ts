import {UserData} from "./interfaces";
import {RandomDataApi} from "./interfaces";

const randomDataApi: RandomDataApi = {
    defaultURL: 'https://random-data-api.com/api/v2/',
    getUserList: async function (size = 40) {
        try {
            const response = await fetch(`${this.defaultURL}users?size=${size}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                }
            });
            return response.json() as Promise<UserData[]>;
        } catch (e) {
            console.log(e);
            throw e;
        }
    }
};


(async () => {
    try {
        const userList = await randomDataApi.getUserList(40);
        const searchInput = document.querySelector('#header__search') as HTMLInputElement;

        const createElementList = (userList: UserData[]) => {
        const generatedHTML = userList.map(({ avatar, first_name, last_name, date_of_birth, email, phone_number, employment: { title, key_skill },
            address: { city, street_name, street_address, zip_code, state, country, coordinates: { lat, lng } }, subscription: { plan, status, payment_method, term } }) =>
            `<article class="page-container__item">
            <section class="photo">
                <img class="photo__image" src="${avatar}" alt="image">
            </section>
            <section class="personal">
                <h5 class="personal__info">Firstname: <span>${first_name}</span></h5>
                <h5 class="personal__info">Lastname: <span>${last_name}</span></h5>
                <h5 class="personal__info">Date of birth: <span>${date_of_birth}</span></h5>
                <h5 class="personal__info">Email: <span>${email}n</span></h5>
                <h5 class="personal__info">Phone number: <span>${phone_number}</span></h5>
            </section>
            <section id="extra__info">
                <select name="" id="info__selector">
                    <option value="address">Address</option>
                    <option value="employment" selected>Employment</option>
                    <option value="subscription">Subcription</option>
                </select>
                <div id="employment__info">
                    <h5 class="personal__info" id="employment">Title: <span>${title}</span></h5>
                    <h5 class="personal__info" id="employment">Key Skill: <span>${key_skill}</span></h5>
                </div>
                <div id="address__info" hidden>
                    <h5 class="personal__info" id="address">City: <span>${city}</span></h5>
                    <h5 class="personal__info" id="address">Street Name: <span>${street_name}</span></h5>
                    <h5 class="personal__info" id="address">Street Address: <span>${street_address}</span></h5>
                    <h5 class="personal__info" id="address">Zip Code: <span>${zip_code}</span></h5>
                    <h5 class="personal__info" id="address">State: <span>${state}</span></h5>
                    <h5 class="personal__info" id="address">Country: <span>${country}</span></h5>
                    <h5 class="personal__info" id="address">Coordinates: <span>${lat}; ${lng}</span></h5>
                </div>
                <div id="subscription__info" hidden>
                    <h5 class="personal__info" id="subscription">Plan: <span>${plan}</span></h5>
                    <h5 class="personal__info" id="subscription">Status: <span>${status}</span></h5>
                    <h5 class="personal__info" id="subscription">Payment Method: <span>${payment_method}</span></h5>
                    <h5 class="personal__info" id="subscription">Term: <span>${term}</span></h5>
                </div>
            </section>
        </article>`);
        const pageContainer = document.querySelector('.page-container') as HTMLElement ;
        pageContainer.innerHTML = generatedHTML.join('')
    }
    createElementList(userList);

    searchInput.addEventListener('input', (e) => {
        const filteredUserList = userList.filter(({first_name, last_name}:
             {first_name: string, last_name: string}) => `${first_name} ${last_name}`.toLowerCase().includes((e.target as HTMLInputElement).value.toLowerCase()));
        createElementList(filteredUserList)
    })

    for (let element of document.querySelectorAll('#info__selector')) {
     element.addEventListener('click', (e) => {
            let children = (element.parentElement as HTMLElement).children;
            if ((e.target as HTMLInputElement).value === "employment") {
                children[1].removeAttribute('hidden')
                children[2].setAttribute('hidden', "true")
                children[3].setAttribute('hidden', "true")
            } else if ((e.target as HTMLInputElement).value === "address") {
                children[1].setAttribute('hidden', "true")
                children[2].removeAttribute('hidden')
                children[3].setAttribute('hidden', "true")
            } else {
                children[1].setAttribute('hidden', "true")
                children[2].setAttribute('hidden', "true")
                children[3].removeAttribute('hidden')
            }
        })
    }

    let ordering = document.querySelector('#order__select');
    (ordering as HTMLInputElement).addEventListener('click', (e) => {
        let orderedUsers: Array<UserData> = [];
        if ((ordering as HTMLInputElement).value === "alphabetical") {
            orderedUsers = [...userList].sort((a, b) => `${a.first_name} ${a.last_name}` <= `${b.first_name} ${b.last_name}` ? -1 : 1)
        } else if ((ordering as HTMLInputElement).value === "date__ascending") {
            orderedUsers = [...userList].sort((a, b) => a.date_of_birth <= b.date_of_birth ? -1 : 1)
        } else {
            orderedUsers = [...userList].sort((a, b) => a.date_of_birth >= b.date_of_birth ? -1 : 1)
        }
        createElementList(orderedUsers);
    })
} catch (error) {
    console.error(error);
}
})();



  // let extra__info = document.querySelectorAll('#extra__info');
    // let addressInfo = document.querySelector('#address__info');
    // let employmentInfo = document.querySelector('#employment__info');
    // let paymentInfo = document.querySelector('#subscription__info');
    // let selectedOption = document.querySelector('#info__selector');
    // selectedOption.addEventListener('click', (e) => {
    //     console.log(selectedOption.value)
    //     console.log(addressInfo)
    //     console.log(addressInfo.attributes)
    //     if (selectedOption.value === "employment") {
    //         employmentInfo.removeAttribute("hidden");
    //         addressInfo.setAttribute("hidden", true)
    //         paymentInfo.setAttribute("hidden", true)
    //     } else if (selectedOption.value === "address") {
    //         employmentInfo.setAttribute("hidden", true);
    //         addressInfo.removeAttribute("hidden")
    //         paymentInfo.setAttribute("hidden", true)
    //     } else {
    //         employmentInfo.setAttribute("hidden", true);
    //         addressInfo.setAttribute("hidden", true)
    //         paymentInfo.removeAttribute("hidden")
    //     }
    // })
