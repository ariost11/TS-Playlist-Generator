import * as React from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import moment from 'moment';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

import SongSearch from './SongSeach';

export default class Results extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: false,
      CLIENT_ID: encodeURIComponent('6c230b0852aa48c7985f8a2e7377248c'),
      REDIRECT_URI: encodeURIComponent('http:tsplaylistgenerator.com'),
      AUTH_ENDPOINT: 'https://accounts.spotify.com/authorize',
      SCOPE: 'playlist-modify-public',
      RESPONSE_TYPE: 'token',
      URI_MAP: {
        'Tim McGraw' : 'spotify:track:2Fn01AIMyHbha2ceNQeOqw',
        'Picture to Burn' : 'spotify:track:4BYejINgfZF0qKDMEH2cim',
        'Teardrops on My Guitar' : 'spotify:track:2TF4UtYreqNbQ6Z9AccldU',
        'A Place in This World' : 'spotify:track:1oR4MUBpyNrAViC8wPNpfm',
        'Cold as You' : 'spotify:track:569sXXQ7t0jSdqHooi2yqs',
        'The Outside' : 'spotify:track:5Tj2MqcFMf60CaGsKbM1aq',
        'Tied Together with a Smile' : 'spotify:track:2zzxwmoOBnXDT0KnJsoIWk',
        'Stay Beautiful' : 'spotify:track:41sjzdjScVwnxnxADElts6',
        'Should’ve Said No' : 'spotify:track:6CdaXOq1MWe2JHDalTG01d',
        'Mary’s Song (Oh My My My)' : 'spotify:track:2O8sogKJCfVZ4rotBv1vVF',
        'Our Song' : 'spotify:track:1j6gmK6u4WNI33lMZ8dC1s',
        'I’m Only Me When I’m with You' : 'spotify:track:7CzxXgQXurKZCyHz9ufbo1',
        'Invisible' : 'spotify:track:1k3PzDNjg38cWqOvL4M9vq',
        'A Perfectly Good Heart' : 'spotify:track:0YgHuReCSPwTXYny7isLja',
        'Fearless (Taylor’s Version)' : 'spotify:track:77sMIMlNaSURUAXq5coCxE',
        'Fifteen (Taylor’s Version)' : 'spotify:track:2nqio0SfWg6gh2eCtfuMa5',
        'Love Story (Taylor’s Version)' : 'spotify:track:3CeCwYWvdfXbZLXFhBrbnf',
        'Hey Stephen (Taylor’s Version)' : 'spotify:track:550erGcdD9n6PnwxrvYqZT',
        'White Horse (Taylor’s Version)' : 'spotify:track:5YL553x8sHderRBDlm3NM3',
        'You Belong with Me (Taylor’s Version)' : 'spotify:track:1qrpoAMXodY6895hGKoUpA',
        'Breathe (Ft. Colbie Caillat) (Taylor’s Version)' : 'spotify:track:7HC7R2D8WjXVcUHJyEGjRs',
        'Tell Me Why (Taylor’s Version)' : 'spotify:track:0k0vFacOHNuArLWMiH60p7',
        'You’re Not Sorry (Taylor’s Version)' : 'spotify:track:6iiAfo4wTA2CVC3Uwx9uh8',
        'The Way I Loved You (Taylor’s Version)' : 'spotify:track:22bPsP2jCgbLUvh82U0Z3M',
        'Forever & Always (Taylor’s Version)' : 'spotify:track:1msEuwSBneBKpVCZQcFTsU',
        'The Best Day (Taylor’s Version)' : 'spotify:track:6ON9UuIq49xXY9GPmHIYRp',
        'Change (Taylor’s Version)' : 'spotify:track:3ExweHKZF9B752DPQByRVT',
        'Jump Then Fall (Taylor’s Version)' : 'spotify:track:2m3ObD945KvpE5y9A1eUWm',
        'Untouchable (Taylor’s Version)' : 'spotify:track:0tQ9vBYpldCuikPsbgOVKA',
        'Forever & Always (Piano Version) (Taylor’s Version)' : 'spotify:track:01QdEx6kFr78ZejhQtWR5m',
        'Come In With the Rain (Taylor’s Version)' : 'spotify:track:1n2wszmJyVkw6FHqyLnQsY',
        'SuperStar (Taylor’s Version)' : 'spotify:track:51A8eKvvZz9uydvIZ7xRSV',
        'The Other Side of the Door (Taylor’s Version)' : 'spotify:track:1cSFlSBdpT4F5vb1frQ231',
        'Today Was a Fairytale (Taylor’s Version)' : 'spotify:track:2JoJrsEV15OzbijS47lids',
        'You All Over Me (From The Vault) Ft. Maren Morris' : 'spotify:track:5pcjystBtalYeqaiXCcgEY',
        'Mr. Perfectly Fine (From The Vault)' : 'spotify:track:7l2tmgUhV7Y2aJHjiszifg',
        'We Were Happy (From The Vault)' : 'spotify:track:34V9RiEPe8MNdU32qJsJa1',
        'That’s When (From The Vault) Ft. Keith Urban' : 'spotify:track:7eResoqEJJAVTkQYSqvO3P',
        'Don’t You (From The Vault)' : 'spotify:track:4uuEGH5SVuzkkSFjo2DEiY',
        'Bye Bye Baby (From The Vault)' : 'spotify:track:4qUijfYU8EoIWiY6oSyrgT',
        'If This Was a Movie' : 'spotify:track:0kAZ3H6G9Zac4PMpmobMkj',
        'Mine' : 'spotify:track:67Io3gxHwfbUreBf114c0u',
        'Sparks Fly' : 'spotify:track:09cM9BjyNFizKUOXh6j9rT',
        'Back to December' : 'spotify:track:5aNkiOMxQXkpoEY5bTYoCh',
        'Speak Now' : 'spotify:track:2PBghI9zJkQEWBzMSMo2Ki',
        'Dear John' : 'spotify:track:3K2es3gElMRJ3qvmPW442g',
        'Mean' : 'spotify:track:6yM6QsnTCTVOkKEvg3hGlo',
        'The Story of Us' : 'spotify:track:2jt90bYlYDg1lXYWES34LJ',
        'Never Grow Up' : 'spotify:track:57w0Uyk2jJAkO2hMJ36xJZ',
        'Enchanted' : 'spotify:track:3sqrvkNC6IPTIXvvbx9Arw',
        'Better than Revenge' : 'spotify:track:55mh9j2aB7xZ1Oh463gK8k',
        'Innocent' : 'spotify:track:4LraIz87diVQdDK0rhi0S4',
        'Haunted' : 'spotify:track:72idZxdEHLbi2YI486c3sE',
        'Last Kiss' : 'spotify:track:1VCJ7vk3Y2DoJIAEOXe3V8',
        'Long Live' : 'spotify:track:7BFc7ffruhZ4Hecnqf5xju',
        'Ours' : 'spotify:track:0hK93KD6Y0j9giUGh4Valj',
        'Superman' : 'spotify:track:6aJ0ipi4EPmu1aTbFeXZnw',
        'State of Grace (Taylor’s Version)' : 'spotify:track:6lzc0Al0zfZOIFsFvBS1ki',
        'Red (Taylor’s Version)' : 'spotify:track:4OAuvHryIVv4kMDNSLuPt6',
        'Treacherous (Taylor’s Version)' : 'spotify:track:3S7HNKPakdwNEBFIVTL6dZ',
        'I Knew You Were Trouble (Taylor’s Version)' : 'spotify:track:6AtZLIzUINvExIUy4QhdjP',
        'All Too Well (Taylor’s Version)' : 'spotify:track:3nsfB1vus2qaloUdcBZvDu',
        '22 (Taylor’s Version)' : 'spotify:track:3yII7UwgLF6K5zW3xad3MP',
        'I Almost Do (Taylor’s Version)' : 'spotify:track:2r9CbjYgFhtAmcFv1cSquB',
        'We Are Never Ever Getting Back Together (Taylor’s Version)' : 'spotify:track:5YqltLsjdqFtvqE7Nrysvs',
        'Stay Stay Stay (Taylor’s Version)' : 'spotify:track:7eQj6r5PIdYKEIZjucBMcq',
        'The Last Time (Taylor’s Version) (featuring Gary Lightbody)' : 'spotify:track:0y6kdSRCVQhSsHSpWvTUm7',
        'Holy Ground (Taylor’s Version)' : 'spotify:track:7J4b3LVCIGO4CMBDFLPoP6',
        'Sad Beautiful Tragic (Taylor’s Version)' : 'spotify:track:73qMN9bXy7MSPwwGfH3wQr',
        'The Lucky One (Taylor’s Version)' : 'spotify:track:4e5ayHsOLJNLTGfjau2mEw',
        'Everything Has Changed (Taylor’s Version) (featuring Ed Sheeran)' : 'spotify:track:7qEUFOVcxRI19tbT68JcYK',
        'Starlight (Taylor’s Version)' : 'spotify:track:7A2cNLRT0YJc1yjxHlKihs',
        'Begin Again (Taylor’s Version)' : 'spotify:track:05GsNucq8Bngd9fnd4fRa0',
        'The Moment I Knew (Taylor’s Version)' : 'spotify:track:0NRHj8hDwwmSPaA41o379r',
        'Come Back… Be Here (Taylor’s Version)' : 'spotify:track:4pNApnaUWAL2J4KO2eqokq',
        'Girl at Home (Taylor’s Version)' : 'spotify:track:0DMVrlMUn01M0IcpDbwgu7',
        'Ronan (Taylor’s Version)' : 'spotify:track:7nWui6jiMM2m9qFmET1Mtj',
        'Better Man (Taylor’s Version) (From the Vault)' : 'spotify:track:4OmFmE0fzcMG6g0Y8p4eSD',
        'Nothing New Ft. Phoebe Bridges (Taylor’s Version) (From the Vault)' : 'spotify:track:01K4zKU104LyJ8gMb7227B',
        'Babe (Taylor’s Version) (From the Vault)' : 'spotify:track:0v4z1tuZvn6LGknom9Qx7d',
        'Message in a Bottle (Taylor’s Version) (From the Vault)' : 'spotify:track:3z6XUommYDWPHeFhmhhT6j',
        'I Bet You Think About Me Ft. Chris Stapleton (Taylor’s Version) (From' : 'spotify:track:4CkgMiMqZ5JzW9iYXSTMTL',
        'Forever Winter (Taylor’s Version) (From the Vault)' : 'spotify:track:3oGVx9RBmiYGv5ZCecWLkx',
        'Run Ft. Ed Sheeran (Taylor’s Version) (From the Vault)' : 'spotify:track:4IQkfUsrwXol38VV3U7t7T',
        'The Very First Night (Taylor’s Version) (From the Vault)' : 'spotify:track:6pYNq0ZwpPVazKzsqpf0G8',
        'All Too Well (10-minute version) (Taylor’s Version) (From the Vault)' : 'spotify:track:5enxwA8aAbwZbf5qCHORXi',
        'Welcome to New York' : 'spotify:track:3nRmDz7qGCvsMS30rGGY0x',
        'Blank Space' : 'spotify:track:1u8c2t2Cy7UBoG4ArRcF5g',
        'Style' : 'spotify:track:0ug5NqcwcFR2xrfTkc7k8e',
        'Out of the Woods' : 'spotify:track:0qUnBLZ8bJqUNEeQgayL9t',
        'All You Had to Do Was Stay' : 'spotify:track:6aLOekfwbytwWvQftxTEF0',
        'Shake It Off' : 'spotify:track:0cqRj7pUJDkTCEsJkx8snD',
        'I Wish You Would' : 'spotify:track:5gRYrtvyVyaCRvLt56OfuV',
        'Bad Blood' : 'spotify:track:2NlmmAjGYrrjAp0MED5rGx',
        'Wildest Dreams (Taylor’s Version)' : 'spotify:track:1Ov37jtRQ2YNAe8HzfczkL',
        'How You Get the Girl' : 'spotify:track:0fM9dEhUFV4MHDuJgrcfOv',
        'This Love (Taylor’s Version)' : 'spotify:track:4d1CG5ei1E2vGbvmgf5KKv',
        'I Know Places' : 'spotify:track:6EwNJz8CuVsrsLvXprJ20Q',
        'Clean' : 'spotify:track:1NmVZsG18CzCAtw7rnV3yA',
        'Wonderland' : 'spotify:track:6RvRzl1YJTDnUvdOtV21IK',
        'You Are in Love' : 'spotify:track:2KrOAg6FftbjgSKdd2a4rS',
        'New Romantics' : 'spotify:track:0qAIiGFKLdV1xpNlEhjpq8',
        '…Ready for It?' : 'spotify:track:2yLa0QULdQr0qAIvVwN6B5',
        'End Game (featuring Ed Sheeran and Future)' : 'spotify:track:2x0WlnmfG39ZuDmstl9xfX',
        'I Did Something Bad' : 'spotify:track:4svZDCRz4cJoneBpjpx8DJ',
        'Don’t Blame Me' : 'spotify:track:1R0a2iXumgCiFb7HEZ7gUE',
        'Delicate' : 'spotify:track:6NFyWDv5CjfwuzoCkw47Xf',
        'Look What You Made Me Do' : 'spotify:track:1P17dC1amhFzptugyAO7Il',
        'So It Goes…' : 'spotify:track:5PxFv9yJEg9dxvbZggykro',
        'Gorgeous' : 'spotify:track:1ZY1PqizIl78geGM4xWlEA',
        'Getaway Car' : 'spotify:track:0VE4kBnHJUgtMf0dy6DRmW',
        'King of My Heart' : 'spotify:track:7HuBDWi18s4aJM8UFnNheH',
        'Dancing with Our Hands Tied' : 'spotify:track:7I7JbDv63ZJJsSi24DyJrz',
        'Dress' : 'spotify:track:6oVxXO5oQ4pTpO8RSnkzvv',
        'This Is Why We Can’t Have Nice Things' : 'spotify:track:07NxDD1iKCHbAldceD7QLP',
        'Call It What You Want' : 'spotify:track:1GwMQaZz6Au3QLDbjbMdme',
        'New Year’s Day' : 'spotify:track:7F5oktn5YOsR9eR5YsFtqb',
        'I Forgot That You Existed' : 'spotify:track:43rA71bccXFGD4C8GOpIlN',
        'Cruel Summer' : 'spotify:track:1BxfuPKGuaTgP7aM0Bbdwr',
        'Lover' : 'spotify:track:1dGr1c8CrMLDpV6mPbImSI',
        'The Man' : 'spotify:track:3RauEVgRgj1IuWdJ9fDs70',
        'The Archer' : 'spotify:track:3pHkh7d0lzM2AldUtz2x37',
        'I Think He Knows' : 'spotify:track:2YWtcWi3a83pdEg3Gif4Pd',
        'Miss Americana & The Heartbreak Prince' : 'spotify:track:214nt20w5wOxJnY462klLw',
        'Paper Rings' : 'spotify:track:4y5bvROuBDPr5fuwXbIBZR',
        'Cornelia Street' : 'spotify:track:12M5uqx0ZuwkpLp5rJim1a',
        'Death By A Thousand Cuts' : 'spotify:track:2dgFqt3w9xIQRjhPtwNk3D',
        'London Boy' : 'spotify:track:1LLXZFeAHK9R4xUramtUKw',
        'Soon You’ll Get Better Ft. Dixie Chicks' : 'spotify:track:4AYtqFyFbX0Xkc2wtcygTr',
        'False God' : 'spotify:track:5hQSXkFgbxjZo9uCwd11so',
        'You Need to Calm Down' : 'spotify:track:6RRNNciQGZEXnqk8SQ9yv5',
        'Afterglow' : 'spotify:track:1SymEzIT3H8UZfibCs3TYi',
        'ME! Ft. Brendon Urie' : 'spotify:track:2Rk4JlNc2TPmZe2af99d45',
        'It’s Nice to Have a Friend' : 'spotify:track:1SmiQ65iSAbPto6gPFlBYm',
        'Daylight' : 'spotify:track:1fzAuUVbzlhZ1lJAx9PtY6',
        'All Of The Girls You Loved Before' : 'spotify:track:4P9Q0GojKVXpRTJCaL3kyy',
        'the 1' : 'spotify:track:0Jlcvv8IykzHaSmj49uNW8',
        'cardigan' : 'spotify:track:4R2kfaDFhslZEMJqAFNpdd',
        'the last great american dynasty' : 'spotify:track:2Eeur20xVqfUoM3Q7EFPFt',
        'exile Ft. Bon Iver' : 'spotify:track:4pvb0WLRcMtbPGmtejJJ6y',
        'my tears ricochet' : 'spotify:track:1MgV7FIyNxIG7WzMRJV5HC',
        'mirrorball' : 'spotify:track:0ZNU020wNYvgW84iljPkPP',
        'seven' : 'spotify:track:6KJqZcs9XDgVck7Lg9QOTC',
        'august' : 'spotify:track:3hUxzQpSfdDqwM3ZTFQY0K',
        'this is me trying' : 'spotify:track:7kt9e9LFSpN1zQtYEl19o1',
        'illicit affairs' : 'spotify:track:2NmsngXHeC1GQ9wWrzhOMf',
        'invisible string' : 'spotify:track:6VsvKPJ4xjVNKpI8VVZ3SV',
        'mad woman' : 'spotify:track:2QDyYdZyhlP2fp79KZX8Bi',
        'epiphany' : 'spotify:track:08fa9LFcFBTcilB3iq2e2A',
        'betty' : 'spotify:track:5kI4eCXXzyuIUXjQra0Cxi',
        'peace' : 'spotify:track:7MbT4I8qGntX4fMdqMQgke',
        'hoax' : 'spotify:track:6MWoRt97mnSTXZhu3ggi9C',
        'the lakes' : 'spotify:track:0eFQWVz0qIxDOvhLpZ40P7',
        'willow' : 'spotify:track:0lx2cLdOt3piJbcaXIV74f',
        'champagne problems' : 'spotify:track:0sY6ZUTh4yoctD8VIXz339',
        'gold rush' : 'spotify:track:5BK0uqwY9DNfZ630STAEaq',
        '’tis the damn season' : 'spotify:track:7dW84mWkdWE5a6lFWxJCBG',
        'tolerate it' : 'spotify:track:0PurA4JVJ8YQgSVopY8fn6',
        'no body, no crime feat. HAIM' : 'spotify:track:3RaT22zZsxVYxxKR7TAaYF',
        'happiness' : 'spotify:track:73YUReisjb3A9ActdLLjJQ',
        '​dorothea' : 'spotify:track:670fUmXf4KQekzbEgaXyPA',
        'coney island feat. The National' : 'spotify:track:3k7ne7VmH43ZPWxPdvPUgR',
        '​ivy' : 'spotify:track:19CSr8rwW05VJL2F91KFNK',
        'cowboy like me' : 'spotify:track:1XjHRolIXL2M1EEOUsGGR4',
        '​l​ong story short' : 'spotify:track:2o2sgVJIgFXk8GQjWTgI6U',
        'marjorie' : 'spotify:track:12ntTeqEeTg7GAVpe8Mhpl',
        'closure' : 'spotify:track:35rdVq36LMHQX0Suw9a6tK',
        'evermore feat. Bon Iver' : 'spotify:track:3O5osWf1rSoKMwe6E9ZaXP',
        'right where you left me' : 'spotify:track:3zwMVvkBe2qIKDObWgXw4N',
        'it’s time to go' : 'spotify:track:1kdWw77ZpYOkhxeuhzU1j6',
        'Lavender Haze' : 'spotify:track:5jQI2r1RdgtuT8S3iG8zFC',
        'Maroon' : 'spotify:track:3eX0NZfLtGzoLUxPNvRfqm',
        'Anti-Hero' : 'spotify:track:0V3wPSX9ygBnCm8psDIegu',
        'Snow On The Beach' : 'spotify:track:1wtOxkiel43cVs0Yux5Q4h',
        'You’re On Your Own, Kid' : 'spotify:track:4D7BCuvgdJlYvlX5WlN54t',
        'Midnight Rain' : 'spotify:track:3rWDp9tBPQR9z6U5YyRSK4',
        'Question...?' : 'spotify:track:0heeNYlwOGuUSe7TgUD27B',
        'Vigilante Shit' : 'spotify:track:1xwAWUI6Dj0WGC3KiUPN0O',
        'Bejeweled' : 'spotify:track:3qoftcUZaUOncvIYjFSPdE',
        'Labyrinth' : 'spotify:track:0A1JLUlkZkp2EFrosoNQi0',
        'Karma' : 'spotify:track:7KokYm8cMIXCsGVmUvKtqf',
        'Sweet Nothing' : 'spotify:track:0wavGRldH0AWyu2zvTz8zb',
        'Mastermind' : 'spotify:track:7FmYn9e7KHMXcxqGSj9LjH',
        'The Great War' : 'spotify:track:3UMrglJeju5yWyYIW6o99b',
        'Bigger Than The Whole Sky' : 'spotify:track:0BiqmkasE5FdrChwKfVp8X',
        'Paris' : 'spotify:track:7712gjoih4QoDbXpljEk21',
        'High Infidelity' : 'spotify:track:5kiZGSxgqPdv6rbqL9THdd',
        'Glitch' : 'spotify:track:6wAFvJPpTZVirBKGZ4EnMW',
        'Would’ve, Should’ve, Could’ve' : 'spotify:track:0aV5uARAknQgYhBaK944FP',
        'Dear Reader' : 'spotify:track:3QF5RsWzK1lCvf2o2cY65P',
        'Hits Different' : 'spotify:track:3xYJScVfxByb61dYHTwiby',
        'Snow On The Beach (feat. More Lana Del Rey)' : 'spotify:track:4zmKGsrXjLmljb5fTaBTot',
        'Karma (feat. Ice Spice)' : 'spotify:track:4i6cwNY6oIUU2XZxPIw82Y',
      },
      token: "",
    };

    this.logout = this.logout.bind(this);
    this.getID = this.getID.bind(this);
    this.addPlaylist = this.addPlaylist.bind(this);
    this.getSongURI = this.getSongURI.bind(this);
    this.addSongToPlaylist = this.addSongToPlaylist.bind(this);
    this.getListOfSongURI = this.getListOfSongURI.bind(this);
    
  }

  componentDidMount() {
    const hash = window.location.hash
    let token = sessionStorage.getItem("token")

    if (!token && hash) {
        token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

        window.location.hash = ""
        sessionStorage.setItem("token", token)
    }
    
    this.setState({
      token: token,
    });
  }

  logout() {
    this.setState({
      token: "",
    });
    sessionStorage.removeItem("token");
  }

  async getID() {
    const response = await axios.get(
      'https://api.spotify.com/v1/me', {
        headers: {
          Authorization: `Bearer ${this.state.token}`,
        }
      }
    );
    return JSON.parse(JSON.stringify(response))['data']['id'];
  }

  async createPlaylist(userID) {
    const today = moment().format('MMM Do YYYY');

    const response = await axios({
      method: 'post',
      url: `https://api.spotify.com/v1/users/${userID}/playlists`,
      data: {
        "name": `Taylor Swift for my Mood`,
        "description": `Curated on ${today}`,
      },
      headers: {
        Authorization: `Bearer ${this.state.token}`,
        'Content-Type' : 'application/json'
      },
    });
    return JSON.parse(JSON.stringify(response))['data']['id'];
  }

  async getSongURI(songName) {
    const response = await axios.get(
      `https://api.spotify.com/v1/search?q=${songName}+Taylor+Swift&type=track`, {
        headers: {
          Authorization: `Bearer ${this.state.token}`,
          'Content-Type': 'application/json',
        }
      }
    )
    return JSON.parse(JSON.stringify(response))['data']['tracks']['items'][0]['uri'];
  }

  getListOfSongURI() {
    const list = [];
    this.props.songList.forEach((a) => {
      list.push(this.state.URI_MAP[a]);
    });

    return list;
  }

  async addSongToPlaylist(playlistID, songURIArray) {
    await axios({
      method: 'post',
      url: `https://api.spotify.com/v1/playlists/${playlistID}/tracks`,
      data: {
        "uris": songURIArray,
        "position": 0,
      },
      headers: {
        Authorization: `Bearer ${this.state.token}`,
        'Content-Type' : 'application/json'
      },
    });
  }

  async addPlaylist() {
    const playlistID = [];
    var uriList = [];
    this.getID()
    .then((v) => this.createPlaylist(v))
    .then((v1) => playlistID.push(v1))
    .then(() => this.getListOfSongURI())
    .then((v2) => uriList = v2)
    .then(() => this.addSongToPlaylist(playlistID[0], uriList))
    .catch(() => this.setState({ error: true }));
  }

  render() {
    const addedPlaylistPopup = (
      <Popover id="overlay" title="Added Playlsit">
        Added Playlist!
      </Popover>
    );

    const loginPopup = (
      <Popover id="overlay" title="Need to Login">
        Login to Spotify First!
      </Popover>
    );

    return(
      <div>
        <SongSearch answers={this.props.answers} duration={this.props.duration} songList={this.props.songList} setSongList={this.props.setSongList}/>
        <Row className="justify-content-md-center" id='row-buttons'>
          <Col xs='3' sm='3' md='3' lg='3'>
            {!this.state.token ? 
              <Button id='generic-button' href={`${this.state.AUTH_ENDPOINT}?client_id=${this.state.CLIENT_ID}&response_type=${this.state.RESPONSE_TYPE}&scope=${this.state.SCOPE}&redirect_uri=${this.state.REDIRECT_URI}`}>Login to Spotify</Button>
                :
              <Button id='generic-button' onClick={() => this.logout()}>Logout</Button>}
          </Col>
          <Col xs='6' sm='6' md='6' lg='6' id='center'>
            {this.state.token ?
              <OverlayTrigger 
                rootClose
                trigger='click'
                placement='right'
                overlay={addedPlaylistPopup}
              >
                <Button id='generic-button' onClick={() => this.addPlaylist()}>Add Playlist To Spotify</Button>
              </OverlayTrigger>
              :
                <OverlayTrigger 
                  trigger='hover'
                  placement='right'
                  overlay={loginPopup}
                >
                  <div id='div-border'><Button id='generic-button' disabled>Add Playlist To Spotify</Button></div>
                </OverlayTrigger>
            }
          </Col>
          <Col xs='3' sm='3' md='3' lg='3'></Col>
        </Row>
        <Row className="justify-content-md-center" id='row-buttons'>
          <Col xs='12' sm='12' md='12' lg='12' id='center'>
            <Button id='generic-button' onClick={() => this.props.reset()}>Restart</Button>
          </Col>
        </Row>
      </div>
    )
  };
}