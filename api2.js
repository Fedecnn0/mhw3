function onJson(json) {

  console.log('JSON ricevuto');
  console.log(json);


  const library = document.querySelector('#video-view');
  library.innerHTML = '';


  const video = json.videos.items;
  let num_video = video.length;

  if(num_video > 10)
    num_video = 10;


  for(let i=0; i<num_video; i++)
  {

    const videos_data = video[i]

    const title = videos_data.name;
    const selected_image = videos_data.images[0].url;

    const album = document.createElement('div');
    video.classList.add('video');

    const img = document.createElement('img');
    img.src = selected_image;

    const caption = document.createElement('span');
    caption.textContent = title;

    video.appendChild(img);
    video.appendChild(caption);

    library.appendChild(video);
  }
}

function onResponse(response) {
  console.log('Risposta ricevuta');
  return response.json();
}

function search(event)
{
  event.preventDefault();
  const album_input = document.querySelector('#album');
  const album_value = encodeURIComponent(album_input.value);
  console.log('Eseguo ricerca: ' + album_value);
  fetch("http://www.googleapis.com/youtube/v3/search?" + VIDEO_ID,
    {
      headers:
      {
        'Authorization': 'Bearer ' + token
      }
    }
  ).then(onResponse).then(onJson);
}

function onTokenJson(json)
{
  console.log(json)
  token = json.access_token;
}

function onTokenResponse(response)
{
  return response.json();
}

const client_id = '397903241201-gs5tud8mv7sioh06dqkir2d6j34s7f87.apps.googleusercontent.com';
const client_secret = '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';

let token;
fetch("https://oauth2.googleapis.com/token",
	{
   method: "post",
   body: 'grant_type=client_credentials',
   headers:
   {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
   }
  }
).then(onTokenResponse).then(onTokenJson);

const form = document.querySelector('form');
form.addEventListener('submit', search)
