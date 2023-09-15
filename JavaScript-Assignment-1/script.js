const url="https://api.spotify.com/v1/artists?ids=4IKVDbCSBTxBeAsMKjAuTs%2C4YRxDV8wJFPHPTeXepOstw%2C4Ai0pGz6GhQavjzaRhPTvz%2C7uIbLdzzSEqnX0Pkrb56cR%2C70B80Lwx2sxti0M1Ng9e8K%2C0y59o4v8uw5crbN9M3JiL1%2C3cy473zaKsJ7eo6l3t8SKd%2C4K6blSRoklNdpw4mzLxwfn%2C1tqysapcCh1lWEAc9dIFpa%2C008PpLcKUtVXle6JSwkq3I"
const token = 'BQAZaoBQbX46loXMWYZIF7zsLzWDzaYe3p4uIYioo5Cyb_WcMcHgmzX7XvvyS2WbEnq9ObkWmbAmAJiQbiTA51QM37Lb73DXsvRVESMpUyjJE26B5vGgkN2jYrtkGXervh2OUgJaD8NjdV0JtWvSSwpykTtYf_1VxBzyFFl1EcgMKH0MAySa7JfC0bo9ScdTVFcCf3-V4JMOSi6PxzMNfC3fVeX6_o_BX0k_zNkh4BwX0ARJxNWBp7yB0Tu5dVdiR19fRIvbm76E7zAKxbVsvrNH';
const request = new Request(
    url,{
        headers:{
            'Authorization': `Bearer ${token}`
        },
    })


    async function getData() {
        try {
            const response = await fetch(request);
            const data = await response.json();
            console.log(data);
            
            // Get the data-container element
            const dataContainer = document.getElementById("data-container");

            // Create an HTML structure to display the data (modify as needed)
            const artistList = document.createElement("ol");

            // Loop through the data and create list items for each artist
            data.artists.forEach(artist => {
                const listItem = document.createElement("li");
                listItem.textContent = `Artist Name: ${artist.name}, Popularity: ${artist.popularity}`;
                artistList.appendChild(listItem);
            });

            // Append the artistList to the data-container
            dataContainer.appendChild(artistList);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }


getData()