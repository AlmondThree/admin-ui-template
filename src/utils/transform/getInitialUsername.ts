export function getInitialUsername(username: string) {
    if (username) {
        const splitUsername: string[] = username.split(".");

        const initial = (splitUsername.length > 1) ? splitUsername[0].charAt(0)+splitUsername[splitUsername.length-1].charAt(0) : splitUsername[0];

        return(
            initial.toUpperCase()
        )
    } else {
        return("")
    }
}