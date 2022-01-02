export type guid = string & { isGuid: true };

export function guid(guid: string) {
    return guid as guid;
}
