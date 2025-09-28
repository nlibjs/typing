import { DIGIT_ZERO, FULL_STOP } from "./codePoints.ts";
import { isDigitCodePoint, listCodePoints } from "./codePointUtil.ts";

/**
 * Represents an octet of an IPv4 address.
 */
export interface Ipv4AddressOctet {
	/** The value of the octet. */
	value: number;
	/** The start index of the octet. */
	start: number;
	/** The end index of the octet. */
	end: number;
}

/**
 * Lists the octets of an IPv4 address.
 * @param input - The input string.
 * @param fromIndex - The index to start from.
 * @returns An iterator of IPv4 address octets.
 */
export const listIpv4Octets = function* (
	input: string,
	fromIndex = 0,
): Generator<Ipv4AddressOctet> {
	let start = fromIndex;
	let length = 0;
	let value = 0;
	for (const codePoint of listCodePoints(input, fromIndex)) {
		if (isDigitCodePoint(codePoint)) {
			if (0 < length && value === 0) {
				throw new Error(`InvalidIpv4Octet: ${input.substr(start, length)}`);
			}
			value = value * 10 + codePoint - DIGIT_ZERO;
			length += 1;
			if (255 < value || 3 < length) {
				throw new Error(`InvalidIpv4Octet: ${input.substr(start, length)}`);
			}
		} else {
			if (0 < length) {
				yield { value, start, end: start + length };
			}
			start += length + 1;
			length = value = 0;
			if (codePoint !== FULL_STOP) {
				break;
			}
		}
	}
	if (0 < length) {
		yield { value, start, end: start + length };
	}
};

/**
 * Represents the result of parsing an IPv4 address.
 */
export interface Ipv4AddressParseResult {
	/** The octets of the IPv4 address. */
	octets: [number, number, number, number];
	/** The start index of the IPv4 address. */
	start: number;
	/** The end index of the IPv4 address. */
	end: number;
}

/**
 * Parses an IPv4 address.
 * @param input - The input string.
 * @param start - The index to start from.
 * @returns The result of parsing an IPv4 address.
 */
export const parseIpv4Address = (
	input: string,
	start = 0,
): Ipv4AddressParseResult => {
	const octets: Array<number> = [];
	for (const octet of listIpv4Octets(input, start)) {
		if (octets.push(octet.value) === 4) {
			return {
				octets: octets as [number, number, number, number],
				start,
				end: octet.end,
			};
		}
	}
	throw new Error(`InvalidIpv4Address: ${input.substr(start, 15)}`);
};
