/** A lot of functionnalities of Node.Js are not accessible for react-native
 * This file import polyfills for some of them, another implementation
 * or even the original implementation but added to the global object
 * so that it can be used in react-native.
 * 
 * Explanation: React-native does not have access to NodeJS modules, it uses JavaScriptCore
 */

// Polyfill for crypto.getRandomValues
import "react-native-get-random-values";

// Polyfill for Buffer (Original implementation)
import { Buffer } from "buffer";
if (typeof global.Buffer !== 'object') {
    global.Buffer = Buffer
}

// Polyfill for StructuredClone for Anchor IDL
import structuredClone from "@ungap/structured-clone";
  if (typeof global.structuredClone !== 'function') {
    global.structuredClone = structuredClone
}

