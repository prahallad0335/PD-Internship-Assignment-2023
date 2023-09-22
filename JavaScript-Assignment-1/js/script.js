const clientId = '4d54f3d60d754c0cb05554a1bdb2f1fb';
const clientSecret = '9cb26cec044e47c6bd8b4ce0ed7e71be';

const artistIds = [
    '4IKVDbCSBTxBeAsMKjAuTs',
    '4YRxDV8wJFPHPTeXepOstw',
    '4Ai0pGz6GhQavjzaRhPTvz',
    '7uIbLdzzSEqnX0Pkrb56cR',
    '70B80Lwx2sxti0M1Ng9e8K',
    '0y59o4v8uw5crbN9M3JiL1',
    '3cy473zaKsJ7eo6l3t8SKd',
    '4K6blSRoklNdpw4mzLxwfn',
    '1tqysapcCh1lWEAc9dIFpa',
    '008PpLcKUtVXle6JSwkq3I'
  ];


const getAccessToken = async () => {
    
    const basicAuth = btoa(`${clientId}:${clientSecret}`);

    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${basicAuth}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials'
    });

    const data = await response.json();
    if(response.status == 200) {
        console.log("Success : ", data)
   } else {
      console.log('Server Error : ', data.error.message)
       }
    return data.access_token;
};


async function fetchArtistData(artistId, accessToken) {
    const artistUrl = `https://api.spotify.com/v1/artists/${artistId}`;
    const headers = {
        'Authorization': `Bearer ${accessToken}`
    };

    try {
        const response = await fetch(artistUrl, { headers });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching artist data:", error);
        return null;
    }
}
// Render artists on the webpage
const renderArtists = (artists) => {
    const dataContainer = document.getElementById('data-container');
    artists.forEach((artist) => {
        const artistCard = document.createElement('div');
        artistCard.classList.add('artist-card');

        const artistName = document.createElement('h2');
        artistName.textContent = artist.name;

        const artistImage = document.createElement('img');
        artistImage.classList.add('artist-image');
        artistImage.src = artist.images[1] ? artist.images[1].url : 'default-image.jpg';
        artistImage.alt = artist.name;

        const listItem = document.createElement("p");
        listItem.textContent = `Popularity: ${artist.popularity},Followers:${artist.followers.total}`;


        artistCard.appendChild(artistImage);
        artistCard.appendChild(artistName);
        artistCard.appendChild(listItem);
        dataContainer.appendChild(artistCard);
    });
};

const main = async () => {
    try {
        const accessToken = await getAccessToken();
        const artistDataPromises = artistIds.map((artistId) => fetchArtistData(artistId, accessToken));
        const topArtists = await Promise.all(artistDataPromises);
        renderArtists(topArtists);
        console.log(accessToken);
    } catch (error) {
        console.error('An error occurred:', error);
    }
    console.log('Main function called.');
};

main();