import { detect, EOL, bold } from './deps.ts'

/**
 * Looks for a security flag inside the security_flags array 
 * 
 * @param flag<string> The flag to look for
 * @returns<string|boolean> Either the flag found on the file or false if there is no match 
 */
export function findFlag(flag: string): string | boolean {

    let security_flags:string[] = [
        "--allow-all", 
        "--allow-env", 
        "--allow-hrtime", 
        "--allow-plugin", 
        "--allow-read", 
        "--allow-run", 
        "--allow-write", 
    ];
    
    let originalFlag = flag
    let foundFlag = security_flags.find( flag_data => {
        if(flag.indexOf("=") != -1) {
            flag = flag.split("=")[0]
        }
        if(flag_data.toLowerCase() === flag.toLowerCase()) return true
        return false
    })
    if(foundFlag) return originalFlag
    return false
}

/**
 * Executes de script in question with the recognized flags 
 * 
 * @param flags<string[]> A list of the recognized flags
 * @param scriptFile<string>  The name of the script to execute
 */
export function runScript(flags:string[], scriptFile:string) {
    flags.forEach( f => {
        console.log("Using flag", bold(f))
    })
    let cmd = ["deno", "run", ...flags, scriptFile]
    const sp = Deno.run({
        cmd 
    })
    sp.status()
}

/**
 * Takes the content of the .flags file and calls findFlag for each line
 * 
 * @param flags<string> The content of the .flags file
 * @returns<string[]> A list of valid flags, leaving out the ones that aren't recognized by the script
 */
export function parseValidFlags(flags:string):string[] {
    const fileEOL:EOL|string = <string>detect(flags)
    
    if(flags.trim().length == 0) return []

    return <string[]>flags.split(fileEOL).map( flag => {
        flag = flag.trim()
        let flagData = findFlag(flag)
        if(flagData) {
            return flagData
        } else {
            console.log(":: Invalid Flag (ignored): ", bold(flag))
        }
    }).filter( f => typeof f != "undefined")
}

