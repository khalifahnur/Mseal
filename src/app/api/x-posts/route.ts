import { NextResponse } from "next/server";

export async function GET() {
  try {
    const BEARER_TOKEN = process.env.X_BEARER_TOKEN;
    const USERNAME = "kh_lif_h"

    const userResponse = await fetch(
      `https://api.twitter.com/2/users/by/username/${USERNAME}`,
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      }
    );

    const userData = await userResponse.json();
    if (!userResponse.ok) {
      return NextResponse.json({ error: userData }, { status: 500 });
    }

    const userId = userData.data.id;
    
    const tweetsResponse = await fetch(
      `https://api.twitter.com/2/users/${userId}/tweets?tweet.fields=created_at`,
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      }
    );

    const tweetsData = await tweetsResponse.json();
    if (!tweetsResponse.ok) {
      return NextResponse.json({ error: tweetsData }, { status: 500 });
    }

    return NextResponse.json(tweetsData);
  } 
  /*eslint-disable-next-line @typescript-eslint/no-explicit-any*/ 
  catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
