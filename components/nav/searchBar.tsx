"use client";

import { GameForDB } from "@/globalTypes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDeferredValue, useEffect, useState } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [completes, setCompletes] = useState<GameForDB[]>([]);

  // router hook for searching if nothing in autocomplete
  const router = useRouter();

  // defer query for performance
  const queryDeferred = useDeferredValue(query);

  useEffect(() => {
    async function fetchAutoCompletes() {
      if (queryDeferred.length >= 3) {
        const response = await fetch(
          `http://localhost:3000/api/autocomplete?query=${queryDeferred}`,
          // { next: { revalidate: 60 } }
          { cache: "no-store" }
        );
        const responseAfterJSON = (await response.json()) as {
          success: boolean;
          completionsWithData: GameForDB[];
        };
        if (responseAfterJSON.success) {
          setCompletes(responseAfterJSON.completionsWithData);
        }
      } else {
        setCompletes([]);
      }
    }
    fetchAutoCompletes();
  }, [queryDeferred]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        router.push(`/search/${query}`);
        setQuery("");
      }}
    >
      <label htmlFor="search">Search</label>
      <input
        type="text"
        id="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <section>
        {completes.slice(0, 3).map((complete) => (
          <div key={complete.gameID}>
            <Link
              href={`/game-details/${complete.gameID}`}
              onClick={() => setQuery("")}
            >
              {complete.title}
            </Link>
          </div>
        ))}
      </section>
    </form>
  );
}
