import { assertEquals } from "../deps.ts"
import { findFlag, parseValidFlags } from '../utils.ts'


Deno.test("findFlag #1: Find a valid flag by full name", () => {
    const fname = "--allow-net"
    const flag = findFlag(fname)
    assertEquals(flag, fname)
})

Deno.test("findFlag #2: It should not find a valid flag by partial name", () => {
    const fname = "allow-net"
    const flag = findFlag(fname)
    assertEquals(flag, false)
})

Deno.test("findFlag #3: Return false if flag can't be found", () => {
    const fname = "invalid"
    const flag = findFlag(fname)
    assertEquals(flag, false)
})

Deno.test("findFlag #4: It should find a match with a whitelist on the flag", () => {
    const fname = "--allow-read=/etc"
    const flag = findFlag(fname)
    assertEquals(flag, fname)
})

Deno.test("parseValidFlag #1: Should return aan empty array if there are no matches", () => {
    let flags = parseValidFlags("")
    assertEquals(flags, [])
})

Deno.test("parseValidFlag #2: Should remove unrecognized flags from the list", () => {
    let string = ["--allow-net",
                  "--allow-jokes"].join("\n")
    let flags = parseValidFlags(string)
    assertEquals(flags, ["--allow-net"])
})