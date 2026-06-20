import { NextResponse } from "next/server";

const LEETCODE_GRAPHQL = "https://leetcode.com/graphql/";
const USERNAME = "mohitkumar4";

const QUERY = `
  query getUserProfile($username: String!) {
    matchedUser(username: $username) {
      submitStatsGlobal {
        acSubmissionNum {
          difficulty
          count
        }
      }
    }
  }
`;

export async function GET() {
  try {
    const res = await fetch(LEETCODE_GRAPHQL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
      },
      body: JSON.stringify({
        query: QUERY,
        variables: { username: USERNAME },
      }),
      next: { revalidate: 86400 },
    });

    if (!res.ok) {
      return NextResponse.json({ totalSolved: 240, isFallback: true });
    }

    const json = await res.json();

    const stats = json?.data?.matchedUser?.submitStatsGlobal?.acSubmissionNum;
    if (!Array.isArray(stats)) {
      return NextResponse.json({ totalSolved: 240, isFallback: true });
    }

    const all = stats.find((s: { difficulty: string }) => s.difficulty === "All");
    const totalSolved = all?.count ?? 240;

    return NextResponse.json({ totalSolved, isFallback: false });
  } catch {
    return NextResponse.json({ totalSolved: 240, isFallback: true });
  }
}
