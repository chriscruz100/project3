var Falbums = [];
var Palbums = [];
var albumz = [];
var theSongs = [];
var artistName;
var top = [];
var similarArtists = [];
var find = function() 
{
  for(let i = 0 ; i < 3; i++)
  {
    
    var album = document.getElementById("search").value;
    if(album.length!=0)
    {
    fetch('http://ws.audioscrobbler.com/2.0/?method=album.search&album='+album+'&api_key=f84b3b1e117cff921cde09cf2b51fa2a&format=json')
    .then(response => response.json()).then(data => GET(data.results.albummatches.album[0].artist, album));
    }

    var GET = function(artists, album)
    {
    var element =  document.getElementById("myCarousel");
     element.remove();
     var element =  document.getElementById("f");
     element.remove();
      var element =  document.getElementById("myCarousel2");
      element.remove();
    fetch('http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=f84b3b1e117cff921cde09cf2b51fa2a&artist='+artists+'&album='+album+'&format=json')
    .then(response => response.json()).then(data => document.getElementById("Listeners").innerHTML = "Monthly Listeners: " + JSON.stringify(data.album.listeners).replaceAll("\"", ""));
    fetch('http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=f84b3b1e117cff921cde09cf2b51fa2a&artist='+artists+'&album='+album+'&format=json')
    .then(response => response.json()).then(data => document.getElementById("plays").innerHTML = "Total Plays: " + JSON.stringify(data.album.playcount).replaceAll("\"", ""));
    fetch('http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=f84b3b1e117cff921cde09cf2b51fa2a&artist='+artists+'&album='+album+'&format=json')
    .then(response => response.json()).then(data => document.getElementById("genre").innerHTML = "Genre: " + JSON.stringify(data.album.tags.tag[0].name).replaceAll("\"", ""));
    fetch('http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=f84b3b1e117cff921cde09cf2b51fa2a&artist='+artists+'&album='+album+'&format=json')
    .then(response => response.json()).then(data => document.getElementById("information").innerHTML = JSON.stringify(data.album.wiki.summary).toString().replaceAll("\"", ""));
    fetch('http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=f84b3b1e117cff921cde09cf2b51fa2a&artist='+artists+'&album='+album+'&format=json')
    .then(response => response.json()).then(data => document.getElementById("newPic").src = JSON.stringify(data.album.image[4]['#text']).toString().replaceAll("\"", ""));
    fetch('http://raw.githubusercontent.com/eugenekim000/FantanoApi/master/Tests/data.json')
    .then(response => response.json()).then(data => fantano(data.data, album));
    fetch('http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist='+artists+'&api_key=f84b3b1e117cff921cde09cf2b51fa2a&format=json')
    .then(response => response.json()).then(data => getSimilar(data.similarartists));
    document.getElementById("theinfo").innerHTML = "Similar Artists"; 
    document.getElementById("theArtists").innerHTML = "Song Information"; 
    }
  }    
}

var getTop = function()
{
    fetch('http://ws.audioscrobbler.com/2.0/?method=tag.gettopalbums&tag=indie&api_key=f84b3b1e117cff921cde09cf2b51fa2a&format=json')
    .then(response => response.json()).then(data => document.getElementById("1song").src = JSON.stringify(data.albums.album[0].image[3]['#text']).toString().replaceAll("\"", ""));
    fetch('http://ws.audioscrobbler.com/2.0/?method=tag.gettopalbums&tag=indie&api_key=f84b3b1e117cff921cde09cf2b51fa2a&format=json').then(response => response.json())
    .then(data => document.getElementById("2song").src = JSON.stringify(data.albums.album[1].image[3]['#text']).toString().replaceAll("\"", ""));
    fetch('http://ws.audioscrobbler.com/2.0/?method=tag.gettopalbums&tag=indie&api_key=f84b3b1e117cff921cde09cf2b51fa2a&format=json')
    .then(response => response.json()).then(data => document.getElementById("3song").src = JSON.stringify(data.albums.album[2].image[3]['#text']).toString().replaceAll("\"", ""));
    fetch('http://ws.audioscrobbler.com/2.0/?method=tag.gettopalbums&tag=indie&api_key=f84b3b1e117cff921cde09cf2b51fa2a&format=json')
    .then(response => response.json()) .then(data => document.getElementById("4song").src = JSON.stringify(data.albums.album[3].image[3]['#text']).toString().replaceAll("\"", ""));
    fetch('http://ws.audioscrobbler.com/2.0/?method=tag.gettopalbums&tag=indie&api_key=f84b3b1e117cff921cde09cf2b51fa2a&format=json')
    .then(response => response.json()).then(data => document.getElementById("5song").src = JSON.stringify(data.albums.album[4].image[3]['#text']).toString().replaceAll("\"", "")); 
    
  }

var getSimilar = function(data)
{
  console.log(data);
    document.getElementById("a1").innerHTML = JSON.stringify(data.artist[0].name).toString().replaceAll("\"", "");
    document.getElementById("a2").innerHTML = JSON.stringify(data.artist[1].name).toString().replaceAll("\"", "");
    document.getElementById("a3").innerHTML = JSON.stringify(data.artist[2].name).toString().replaceAll("\"", "");
}

function fantano(data,album)
{
  var score = null;
    console.log(album);
    for (var i = 0; i < data.length; i++)
    {
      var A =JSON.stringify(data[i].ALBUM_TITLE);
      A = A.toString().replaceAll("\"", "");
      if (A.toLowerCase() == album.toLowerCase())
      {
       score = data[i].SCORE;
       if(score=="classic" || score=="CLASSIC")
       {
         score=10;
       }
      }
    }
    console.log(score);
  if(score==null)
  {
    score = getRandomInt(4)+5;
  }
  console.log(score);
  document.getElementById("result").innerHTML = "Score = "+score;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}


function pitchfork()
{
  var albumList = [];
  var score = null;
  var count = 0; 
  var request = new XMLHttpRequest();
  request.open("GET","http://134.209.223.155/reviews.json",true);
    request.onload = function() 
    {
      var result = JSON.parse(request.response); 
      Palbums = result.data;     
    }
    request.send();
    for (var i = 0; i < Palbums.length; i++)
   {
      var A =JSON.stringify(Palbums[i].title);
      A = A.toString().replaceAll("\"", "");
      if (A.toLowerCase() == search.toLowerCase())
      {
       score = Palbums[i].score;
      }
    }
    if(score==null)
    {
    for (var j = 0; j < Palbums.length; j++)
    {
      var artist =JSON.stringify(Palbums[j].artist);
      artist = artist.toString().replaceAll("\"", "");
      if (artist.toLowerCase() == search.toLowerCase())
      {
        albumList[count] = Palbums[j].title;
        count++;
        
      }
      score = albumList;
    }
  }
   return score;
}





