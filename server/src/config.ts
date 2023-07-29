import { Vec2 } from "planck";
import { MAP_HEIGHT, MAP_WIDTH } from "../../common/src/constants";

export enum SpawnMode { Random, Radius, Fixed }
export enum GasMode { Normal, Debug, Disabled }

export interface ConfigType {
    readonly host: string
    readonly port: number
    readonly regions: Record<string, string>
    readonly defaultRegion: string
    /**
     * The websocket region this server is running.
     * Used for the find game api.
     */
    readonly thisRegion: string
    readonly ssl: {
        readonly keyFile: string
        readonly certFile: string
        readonly enable: boolean
    }
    readonly movementSpeed: number
    /**
     * There are 3 spawn modes: SpawnMode.Random, SpawnMode.Radius, and SpawnMode.Fixed.
     * SpawnMode.Random spawns the player at a random location, ignoring the position and radius.
     * SpawnMode.Radius spawns the player at a random location within the circle with the given position and radius.
     * SpawnMode.Fixed always spawns the player at the exact position given, ignoring the radius.
     */
    readonly spawn: {
        readonly mode: SpawnMode.Random
    } | {
        readonly mode: SpawnMode.Fixed
        readonly position: Vec2
    } | {
        readonly mode: SpawnMode.Radius
        readonly position: Vec2
        readonly radius: number
    }
    /**
     * There are 3 gas modes: GasMode.Normal, GasMode.Debug, and GasMode.Disabled.
     * GasMode.Normal: Default gas behavior. overrideDuration is ignored.
     * GasMode.Debug: The duration of each stage is always the duration specified by overrideDuration.
     * GasMode.Disabled: Gas is disabled.
     */
    readonly gas: {
        readonly mode: GasMode.Disabled
    } | {
        readonly mode: GasMode.Normal
    } | {
        readonly mode: GasMode.Debug
        readonly overrideDuration: number
    }
    /**
     * A basic filter that censors only the most extreme swearing.
     */
    readonly censorUsernames: boolean

    readonly playerLimit: number

    /**
     * The map name, must be a valid value from the server maps definitions
     * Example: "main" for the main map or "debug" for the debug map
     */
    readonly mapName: string

    /**
     * Temporarily bans IPs that attempt to make more than 5 simultaneous connections or attempt to join more than 5 times in 5 seconds.
     */
    readonly botProtection: boolean
    readonly bannedIPs: string[]
    readonly disableLobbyClearing: boolean

    /**
     * Roles. Each role has a different password and can give exclusive skins and cheats.
     * If noPrivileges is set to true for a role, cheats will be disabled for that role.
     * To use roles, add `?password=PASSWORD` on the website url, example: `127.0.0.1:3000/?password=fooBar`.
     */
    readonly roles: Record<string, { password: string, noPrivileges?: boolean }>
}

export const Config = {
    host: "127.0.0.1",
    port: 8000,

    regions: {
        dev: "ws://127.0.0.1:8000",
        na: "wss://suroi.io",
        eu: "wss://eu.suroi.io",
        sa: "wss://sa.suroi.io",
        as: "wss://as.suroi.io"
    },
    defaultRegion: "na",
    thisRegion: "dev",

    ssl: {
        keyFile: "",
        certFile: "",
        enable: false
    },

    movementSpeed: 0.028,

    spawn: { mode: SpawnMode.Fixed, position: Vec2(MAP_WIDTH / 2, MAP_HEIGHT / 2) },

    gas: { mode: GasMode.Disabled },

    censorUsernames: true,

    botProtection: false,
    bannedIPs: [],

    playerLimit: 80,

    mapName: "main",

    disableLobbyClearing: false,

    roles: {
        dev: { password: "dev" },
        artist: { password: "artist", noPrivileges: true },
        hasanger: { password: "hasanger" },
        leia: { password: "leia" },
        katie: { password: "katie" },
        eipi: { password: "eipi" },
        "123op": { password: "123op" }
    }
} satisfies ConfigType as ConfigType;
