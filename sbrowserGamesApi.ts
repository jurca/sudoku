declare global {
    interface Window {
        sbrowser?: {[key: string]: unknown}
        webkit?: {[key: string]: unknown}
    }

    var sbrowser: unknown
    var webkit: unknown
}

interface ApiBindings {
    [key: string]: unknown
}

const sbrowserAndroidApiBindings: ApiBindings = typeof sbrowser === 'object' && sbrowser ? sbrowser as ApiBindings : {}
const sbrowserIOSApiBindings: ApiBindings = (typeof webkit === 'object' && webkit && (webkit as any).messageHandlers ?
    (webkit as any).messageHandlers
:
    {}
)

export function isTablet(): boolean {
    if (typeof navigator === 'object' && navigator && typeof navigator.userAgent === 'string') {
        if (/\(iPad;/.test(navigator.userAgent)) {
            return true
        }
    }

    if (typeof sbrowserAndroidApiBindings.isTablet === 'function') {
        try {
            return sbrowserAndroidApiBindings.isTablet()
        } catch (sbrowserApiError) {
            console.error('SBrowser API.isTablet: failed to execute the isTabled method', sbrowserApiError)
            return false
        }
    }

    console.warn('SBrowser API.isTablet: no supported SBrowser native API is available, defaulting to false')
    return false
}

export function terminateApp(): boolean {
    if (typeof sbrowserAndroidApiBindings.terminateApp === 'function') {
        try {
            sbrowserAndroidApiBindings.terminateApp()
            return true
        } catch (sbrowserApiError) {
            console.error('SBrowser API.terminateApp: Failed to execute the terminateApp method', sbrowserApiError)
        }
    }

    if (
        sbrowserIOSApiBindings.terminate &&
        typeof (sbrowserIOSApiBindings.terminate as any).postMessage === 'function'
    ) {
        try {
            (sbrowserIOSApiBindings.terminate as any).postMessage('terminate')
            return true
        } catch (sbrowserApiError) {
            console.error(`SBrowser API.terminateApp: Failed to execute the terminate method`, sbrowserApiError)
        }
    }

    return false
}

export function gamesPlay(gameId: string): void {
    callNativeVoidReturningMethod('gamesPlay', [gameId])
}

export function gamesExit(gameId: string, gamesPlayed: number, gamesWon: number): void {
    callNativeVoidReturningMethod('gamesExit', [gameId, gamesPlayed, gamesWon], [JSON.stringify({
        game: gameId,
        "games-played": gamesPlayed,
        "games-won": gamesWon,
    })])
}

export function openLoginForm(): boolean {
    return callNativeVoidReturningMethod('openLoginForm')
}

export function isSignedIn(): Promise<boolean> {
    return new Promise((resolve, reject) => {
        if (typeof sbrowserAndroidApiBindings.isSignedIn === 'function') {
            try {
                const result = sbrowserAndroidApiBindings.isSignedIn()
                resolve(result)
                return
            } catch (sbrowserApiError) {
                console.error('SBrowser API.isSignedIn: Failed to execute the isSignedIn method', sbrowserApiError)
                reject(sbrowserApiError)
                return
            }
        } else if (
            sbrowserIOSApiBindings.isSignedIn &&
            typeof (sbrowserIOSApiBindings.isSignedIn as any).postMessage === 'function'
        ) {
            try {
                window.sbrowser = window.sbrowser || {}
                window.sbrowser.isSignedIn = (isUserSignedIn: boolean) => {
                    resolve(!!isUserSignedIn)
                    if (window.sbrowser && window.sbrowser.isSignedIn) {
                        delete window.sbrowser.isSignedIn
                    }
                }
                ;(sbrowserIOSApiBindings.isSignedIn as any).postMessage()
                return
            } catch (sbrowserApiError) {
                console.error('SBrowser API.isSignedIn: Failed to execute the isSignedIn method', sbrowserApiError)
                reject(sbrowserApiError)
                return
            }
        } else {
            reject(new Error('No supported native SBrowser API is available'))
        }
    })
}

function callNativeVoidReturningMethod(
    methodName: string,
    androidArguments: readonly unknown[] = [],
    iosArguments: readonly unknown[] = androidArguments,
): boolean {
    if (typeof sbrowserAndroidApiBindings[methodName] === 'function') {
        try {
            (sbrowserAndroidApiBindings[methodName] as Function)(...androidArguments)
            return true
        } catch (sbrowserApiError) {
            console.error(`SBrowser API.${methodName}: Failed to execute the ${methodName} method`, sbrowserApiError)
        }
    }

    if (
        sbrowserIOSApiBindings[methodName] &&
        typeof (sbrowserIOSApiBindings[methodName] as any).postMessage === 'function'
    ) {
        try {
            (sbrowserIOSApiBindings[methodName] as any).postMessage(...iosArguments)
            return true
        } catch (sbrowserApiError) {
            console.error(`SBrowser API.${methodName}: Failed to execute the ${methodName} method`, sbrowserApiError)
        }
    }

    return false
}
