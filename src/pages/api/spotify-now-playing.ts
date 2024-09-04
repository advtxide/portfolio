import type { APIRoute } from "astro";

const SPOTIFY_TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const SPOTIFY_NOW_PLAYING_ENDPOINT =
  "https://api.spotify.com/v1/me/player/currently-playing";

const getAccessToken = async () => {
  const refresh_token = import.meta.env.SPOTIFY_REFRESH_TOKEN;
  const response = await fetch(SPOTIFY_TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${import.meta.env.SPOTIFY_CLIENT_ID}:${
          import.meta.env.SPOTIFY_CLIENT_SECRET
        }`
      ).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token,
    }),
  });

  return response.json();
};

export const GET: APIRoute = async () => {
  try {
    const { access_token } = await getAccessToken();

    const response = await fetch(SPOTIFY_NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (response.status === 204 || response.status > 400) {
      return new Response(JSON.stringify({ isPlaying: false }), {
        status: 200,
      });
    }

    const song = await response.json();

    if (song.item === null) {
      return new Response(JSON.stringify({ isPlaying: false }), {
        status: 200,
      });
    }

    const isPlaying = song.is_playing;
    const title = song.item.name;
    const artist = song.item.artists
      .map((_artist: any) => _artist.name)
      .join(", ");
    const album = song.item.album.name;
    const albumImageUrl = song.item.album.images[0].url;
    const songUrl = song.item.external_urls.spotify;

    return new Response(
      JSON.stringify({
        isPlaying,
        title,
        artist,
        album,
        albumImageUrl,
        songUrl,
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error fetching Spotify data:", error);
    return new Response(
      JSON.stringify({ error: "Error fetching Spotify data" }),
      {
        status: 500,
      }
    );
  }
};
